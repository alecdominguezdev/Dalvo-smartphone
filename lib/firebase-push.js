const crypto = require('crypto');
const fs = require('fs');
const https = require('https');

function jsonRequest(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const request = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        ...headers
      },
      timeout: 15000
    }, (response) => {
      let raw = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { raw += chunk; });
      response.on('end', () => {
        let data = {};
        try { data = raw ? JSON.parse(raw) : {}; } catch (_) { data = { raw }; }
        if (response.statusCode >= 200 && response.statusCode < 300) return resolve(data);
        const error = new Error(data?.error?.message || `Firebase respondió HTTP ${response.statusCode}.`);
        error.statusCode = response.statusCode;
        error.firebaseError = data?.error || data;
        reject(error);
      });
    });
    request.on('timeout', () => request.destroy(new Error('Tiempo de espera agotado al enviar Firebase.')));
    request.on('error', reject);
    request.write(payload);
    request.end();
  });
}

function formRequest(url, values) {
  return new Promise((resolve, reject) => {
    const payload = new URLSearchParams(values).toString();
    const request = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 15000
    }, (response) => {
      let raw = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { raw += chunk; });
      response.on('end', () => {
        let data = {};
        try { data = raw ? JSON.parse(raw) : {}; } catch (_) { data = { raw }; }
        if (response.statusCode >= 200 && response.statusCode < 300) return resolve(data);
        const error = new Error(data?.error_description || data?.error || `Google OAuth respondió HTTP ${response.statusCode}.`);
        error.statusCode = response.statusCode;
        error.firebaseError = data;
        reject(error);
      });
    });
    request.on('timeout', () => request.destroy(new Error('Tiempo de espera agotado al autorizar Firebase.')));
    request.on('error', reject);
    request.write(payload);
    request.end();
  });
}

function base64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function readServiceAccount(environment = process.env) {
  const fromJson = String(environment.FIREBASE_SERVICE_ACCOUNT_JSON || '').trim();
  const fromBase64 = String(environment.FIREBASE_SERVICE_ACCOUNT_BASE64 || '').trim();
  const fromFile = String(environment.FIREBASE_SERVICE_ACCOUNT_FILE || '').trim();
  let raw = fromJson;
  if (!raw && fromBase64) raw = Buffer.from(fromBase64, 'base64').toString('utf8');
  if (!raw && fromFile) raw = fs.readFileSync(fromFile, 'utf8');
  if (!raw) return null;
  const account = JSON.parse(raw);
  if (!account.client_email || !account.private_key || !account.project_id) {
    throw new Error('La cuenta de servicio de Firebase no contiene client_email, private_key y project_id.');
  }
  return account;
}

function createFirebasePushSender({ environment = process.env } = {}) {
  let accessToken = null;
  let accessTokenExpiresAt = 0;
  let pendingAccessToken = null;

  async function getAccessToken(account) {
    if (accessToken && Date.now() < accessTokenExpiresAt - 60 * 1000) return accessToken;
    if (pendingAccessToken) return pendingAccessToken;
    pendingAccessToken = (async () => {
      const now = Math.floor(Date.now() / 1000);
      const assertionHeader = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
      const assertionPayload = base64Url(JSON.stringify({
        iss: account.client_email,
        sub: account.client_email,
        scope: 'https://www.googleapis.com/auth/firebase.messaging',
        aud: account.token_uri || 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600
      }));
      const unsigned = `${assertionHeader}.${assertionPayload}`;
      const signer = crypto.createSign('RSA-SHA256');
      signer.update(unsigned);
      signer.end();
      const signature = signer.sign(account.private_key, 'base64url');
      const tokenResponse = await formRequest(account.token_uri || 'https://oauth2.googleapis.com/token', {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: `${unsigned}.${signature}`
      });
      accessToken = String(tokenResponse.access_token || '');
      if (!accessToken) throw new Error('Firebase no devolvió un token de acceso.');
      accessTokenExpiresAt = Date.now() + Number(tokenResponse.expires_in || 3600) * 1000;
      return accessToken;
    })();
    try {
      return await pendingAccessToken;
    } finally {
      pendingAccessToken = null;
    }
  }

  async function send({ token, title, body, data = {}, badge = 1 }) {
    const account = readServiceAccount(environment);
    if (!account) return { ok: false, skipped: true, reason: 'not-configured' };
    const normalizedToken = String(token || '').trim();
    if (!normalizedToken) return { ok: false, skipped: true, reason: 'missing-token' };
    const normalizedBadge = Math.max(0, Math.min(999, Number(badge || 0)));
    try {
      const bearer = await getAccessToken(account);
      await jsonRequest(
        `https://fcm.googleapis.com/v1/projects/${encodeURIComponent(account.project_id)}/messages:send`,
        {
          message: {
            token: normalizedToken,
            // Android receives a high-priority data message. The native service
            // creates the notification even when Flutter is not running.
            // iOS receives its alert through the APNs payload below.
            data: Object.fromEntries(Object.entries({
              ...data,
              notificationTitle: title,
              notificationBody: body
            }).map(([key, value]) => [key, String(value ?? '')])),
            android: {
              priority: 'HIGH'
            },
            apns: {
              headers: { 'apns-priority': '10', 'apns-push-type': 'alert' },
              payload: {
                aps: {
                  alert: { title, body },
                  badge: normalizedBadge,
                  sound: 'default'
                }
              }
            }
          }
        },
        { Authorization: `Bearer ${bearer}` }
      );
      return { ok: true };
    } catch (error) {
      const details = JSON.stringify(error.firebaseError || {});
      return {
        ok: false,
        invalidToken: /UNREGISTERED|registration token is not a valid/i.test(details) || error.statusCode === 404,
        error
      };
    }
  }

  return { send };
}

module.exports = { createFirebasePushSender };
