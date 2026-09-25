$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

function New-RandomSecret([int]$bytes = 32) {
    $buffer = New-Object byte[] $bytes
    $generator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $generator.GetBytes($buffer)
    }
    finally {
        $generator.Dispose()
    }

    return ([Convert]::ToBase64String($buffer).TrimEnd("=") -replace "\+", "-" -replace "/", "_")
}

$createdEnvironment = $false
$adminPassword = $null

if (-not (Test-Path ".env")) {
    $databasePassword = New-RandomSecret 24
    $rootPassword = New-RandomSecret 24
    $sessionSecret = New-RandomSecret 48
    $adminPassword = "Dalvo-$(New-RandomSecret 18)!"

    $environment = @"
NODE_ENV=development
HOST=0.0.0.0
PORT=3000
APP_PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_FORWARD_PORT=3306
DB_USER=dalvo
DB_PASSWORD=$databasePassword
DB_NAME=dalvosystem
MYSQL_ROOT_PASSWORD=$rootPassword
SESSION_SECRET=$sessionSecret
SESSION_MAX_AGE_MS=86400000
SUPERADMIN_USER=superadmin
SUPERADMIN_PASSWORD=$adminPassword
"@

    [System.IO.File]::WriteAllText((Join-Path $projectRoot ".env"), $environment)
    $createdEnvironment = $true
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw "Docker Desktop no está instalado o el comando docker no está disponible."
}

docker compose version | Out-Null
docker compose up --build -d --wait --wait-timeout 300

Write-Host ""
Write-Host "Dalvo System está listo en http://localhost:3000" -ForegroundColor Green
Write-Host "Usuario: superadmin"
if ($createdEnvironment) {
    Write-Host "Contraseña local inicial: $adminPassword" -ForegroundColor Yellow
    Write-Host "La contraseña también quedó guardada en .env; no compartas ese archivo."
}
else {
    Write-Host "La contraseña es SUPERADMIN_PASSWORD del archivo .env."
}
