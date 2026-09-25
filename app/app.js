function prepareAccountsPayableSplitTable(originalTableId, originalRowsId, cashTableId, cashRowsId, cashLabel = "Contado", creditLabel = "Crédito") {
  const originalTable = document.querySelector(`#${originalTableId}`);
  const originalRows = document.querySelector(`#${originalRowsId}`);
  if (!originalTable || !originalRows || document.querySelector(`#${cashTableId}`)) return;
  const originalShell = originalTable.closest(".budgets-table-shell");
  if (!originalShell) return;
  const cashShell = originalShell.cloneNode(true);
  const cashTable = cashShell.querySelector(`#${originalTableId}`);
  const cashRows = cashShell.querySelector(`#${originalRowsId}`);
  if (!cashTable || !cashRows) return;
  cashTable.id = cashTableId;
  cashRows.id = cashRowsId;
  cashRows.innerHTML = "";
  const cashHeading = document.createElement("h3");
  cashHeading.className = "accounts-payable-split-title";
  cashHeading.textContent = cashLabel;
  const creditHeading = document.createElement("h3");
  creditHeading.className = "accounts-payable-split-title";
  creditHeading.textContent = creditLabel;
  originalShell.parentNode.insertBefore(cashHeading, originalShell);
  originalShell.parentNode.insertBefore(cashShell, originalShell);
  originalShell.parentNode.insertBefore(creditHeading, originalShell);
}

prepareAccountsPayableSplitTable("accountsPayablePendingTable", "accountsPayablePendingRows", "accountsPayablePendingCashTable", "accountsPayablePendingCashRows");
prepareAccountsPayableSplitTable("accountsPayableOcgfPendingTable", "accountsPayableOcgfPendingRows", "accountsPayableOcgfPendingCashTable", "accountsPayableOcgfPendingCashRows");

const loginView = document.querySelector("#loginView");
const appView = document.querySelector("#appView");
const loginForm = document.querySelector("#loginForm");
const loginButton = document.querySelector("#loginButton");
const loginMessage = document.querySelector("#loginMessage");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#passwordToggle");
const logoutButton = document.querySelector("#logoutButton");
const sessionName = document.querySelector("#sessionName");
const sessionRole = document.querySelector("#sessionRole");
const sidebarToggleButton = document.querySelector("#sidebarToggleButton");
const launcherButton = document.querySelector("#launcherButton");
const quickCreateButton = document.querySelector("#quickCreateButton");
const mainNav = document.querySelector("#mainNav");
const sidebarScrim = document.querySelector("#sidebarScrim");
const sidebarOpenButtons = document.querySelectorAll("[data-open-sidebar]");
const globalSearchForm = document.querySelector("#globalSearchForm");
const globalSearchInput = document.querySelector("#globalSearchInput");
const globalSearchResults = document.querySelector("#globalSearchResults");
const themeToggleButton = document.querySelector("#themeToggleButton");
const topbarLogo = document.querySelector(".sidebar-brand img");
const quickCreateOverlay = document.querySelector("#quickCreateOverlay");
const quickCreateSearch = document.querySelector("#quickCreateSearch");
const quickCreateList = document.querySelector("#quickCreateList");
const assistantButton = document.querySelector("#assistantButton");
const assistantOverlay = document.querySelector("#assistantOverlay");
const assistantCloseButton = document.querySelector("#assistantCloseButton");
const assistantForm = document.querySelector("#assistantForm");
const assistantQuestion = document.querySelector("#assistantQuestion");
const assistantResponse = document.querySelector("#assistantResponse");
const assistantVoiceButton = document.querySelector("#assistantVoiceButton");
const moduleLauncher = document.querySelector("#moduleLauncher");
const launcherCloseButton = document.querySelector("#launcherCloseButton");
const moduleLauncherSearch = document.querySelector("#moduleLauncherSearch");
const launcherCards = document.querySelectorAll(".launcher-card");
const navItems = document.querySelectorAll(".nav-item");
const inicioModule = document.querySelector("#inicioModule");
const usuariosModule = document.querySelector("#usuariosModule");
const prestamosModule = document.querySelector("#prestamosModule");
const sucursalesModule = document.querySelector("#sucursalesModule");
const empresasModule = document.querySelector("#empresasModule");
const clientesModule = document.querySelector("#clientesModule");
const proveedoresModule = document.querySelector("#proveedoresModule");
const listaPreciosModule = document.querySelector("#listaPreciosModule");
const gastosFijosModule = document.querySelector("#gastosFijosModule");
const presupuestoModule = document.querySelector("#presupuestoModule");
const comprasModule = document.querySelector("#comprasModule");
const cuentasCobrarModule = document.querySelector("#cuentasCobrarModule");
const cuentasPagarModule = document.querySelector("#cuentasPagarModule");
const comisionesModule = document.querySelector("#comisionesModule");
const tareasModule = document.querySelector("#tareasModule");
const reportesModule = document.querySelector("#reportesModule");
const reportsContent = document.querySelector("#reportsContent");
const exportacionesModule = document.querySelector("#exportacionesModule");
const exportacionesContent = document.querySelector("#exportacionesContent");
const recuperacionDocumentalModule = document.querySelector("#recuperacionDocumentalModule");
const recuperacionDocumentalContent = document.querySelector("#recuperacionDocumentalContent");
const placeholderModule = document.querySelector("#placeholderModule");
const moduleTitle = document.querySelector("#moduleTitle");
const LOGO_LIGHT_SRC = "img/Logo dalvo system.png";
const LOGO_DARK_SRC = "img/logo letra blancas.png";
const THEME_DESIGN_VERSION = "graphite-v1";
const moduleDescription = document.querySelector("#moduleDescription");
const tasksSearch = document.querySelector("#tasksSearch");
const taskStats = document.querySelector("#taskStats");
const taskForm = document.querySelector("#taskForm");
const taskFormTitle = document.querySelector("#taskFormTitle");
const taskFormStatus = document.querySelector("#taskFormStatus");
const taskAssignedTo = document.querySelector("#taskAssignedTo");
const taskCancelEditButton = document.querySelector("#taskCancelEditButton");
const openTaskFormButton = document.querySelector("#openTaskFormButton");
const tasksList = document.querySelector("#tasksList");
const userForm = document.querySelector("#userForm");
const createUserButton = document.querySelector("#createUserButton");
const userFormStatus = document.querySelector("#userFormStatus");
const roleSelect = document.querySelector("#roleSelect");
const specialPermissions = document.querySelector("#specialPermissions");
const operationPermissions = document.querySelector("#operationPermissions");
const temporaryRoles = document.querySelector("#temporaryRoles");
const branchAccessScopes = document.querySelector("#branchAccessScopes");
const usersSearch = document.querySelector("#usersSearch");
const usersCardList = document.querySelector("#usersCardList");
const openUserModalButton = document.querySelector("#openUserModalButton");
const toggleProjectOwnerAuditButton = document.querySelector("#toggleProjectOwnerAuditButton");
const projectOwnerAuditPanel = document.querySelector("#projectOwnerAuditPanel");
const projectOwnerAuditStatus = document.querySelector("#projectOwnerAuditStatus");
const projectOwnerSourceSelect = document.querySelector("#projectOwnerSourceSelect");
const projectOwnerTargetSelect = document.querySelector("#projectOwnerTargetSelect");
const projectOwnerNormalizeLegacy = document.querySelector("#projectOwnerNormalizeLegacy");
const projectOwnerDeactivateSourceField = document.querySelector("#projectOwnerDeactivateSourceField");
const projectOwnerDeactivateSource = document.querySelector("#projectOwnerDeactivateSource");
const projectOwnerProjectList = document.querySelector("#projectOwnerProjectList");
const applyProjectOwnerAuditButton = document.querySelector("#applyProjectOwnerAuditButton");
const userModal = document.querySelector("#userModal");
const userModalTitle = document.querySelector("#userModalTitle");
const userModalClose = document.querySelector("#userModalClose");
const cancelUserButton = document.querySelector("#cancelUserButton");
const userCreditsListView = document.querySelector("#userCreditsListView");
const userCreditDetailView = document.querySelector("#userCreditDetailView");
const userCreditDetailContent = document.querySelector("#userCreditDetailContent");
const backToUserCreditsButton = document.querySelector("#backToUserCreditsButton");
const userCreditsSummary = document.querySelector("#userCreditsSummary");
const userCreditsSearch = document.querySelector("#userCreditsSearch");
const userCreditsStatusFilter = document.querySelector("#userCreditsStatusFilter");
const userCreditsList = document.querySelector("#userCreditsList");
const openUserCreditModalButton = document.querySelector("#openUserCreditModalButton");
const userCreditModal = document.querySelector("#userCreditModal");
const userCreditForm = document.querySelector("#userCreditForm");
const userCreditFormStatus = document.querySelector("#userCreditFormStatus");
const userCreditUserSelect = document.querySelector("#userCreditUserSelect");
const userCreditModalClose = document.querySelector("#userCreditModalClose");
const cancelUserCreditButton = document.querySelector("#cancelUserCreditButton");
const saveUserCreditButton = document.querySelector("#saveUserCreditButton");
const userCreditPaymentModal = document.querySelector("#userCreditPaymentModal");
const userCreditPaymentForm = document.querySelector("#userCreditPaymentForm");
const userCreditPaymentStatus = document.querySelector("#userCreditPaymentStatus");
const userCreditPaymentBalance = document.querySelector("#userCreditPaymentBalance");
const userCreditPaymentModalClose = document.querySelector("#userCreditPaymentModalClose");
const cancelUserCreditPaymentButton = document.querySelector("#cancelUserCreditPaymentButton");
const saveUserCreditPaymentButton = document.querySelector("#saveUserCreditPaymentButton");
const clientModal = document.querySelector("#clientModal");
const clientForm = document.querySelector("#clientForm");
const clientModalTitle = document.querySelector("#clientModalTitle");
const clientModalClose = document.querySelector("#clientModalClose");
const cancelClientButton = document.querySelector("#cancelClientButton");
const saveClientButton = document.querySelector("#saveClientButton");
const clientFormStatus = document.querySelector("#clientFormStatus");
const clientCompanyInput = document.querySelector("#clientCompanyInput");
const clientBranchSelect = document.querySelector("#clientBranchSelect");
const clientBranchLocationsList = document.querySelector("#clientBranchLocationsList");
const openClientBranchModalButton = document.querySelector("#openClientBranchModalButton");
const clientBranchModal = document.querySelector("#clientBranchModal");
const clientBranchForm = document.querySelector("#clientBranchForm");
const clientBranchModalTitle = document.querySelector("#clientBranchModalTitle");
const clientBranchFormStatus = document.querySelector("#clientBranchFormStatus");
const clientBranchCompanyInput = document.querySelector("#clientBranchCompanyInput");
const clientBranchNewCompanyField = document.querySelector("#clientBranchNewCompanyField");
const clientBranchNewCompanyInput = document.querySelector("#clientBranchNewCompanyInput");
const clientBranchLocationCatalogSelect = document.querySelector("#clientBranchLocationCatalogSelect");
const clientCompanyCreditDaysField = document.querySelector("#clientCompanyCreditDaysField");
const clientBranchModalClose = document.querySelector("#clientBranchModalClose");
const locationCatalogList = document.querySelector("#locationCatalogList");
const openLocationCatalogModalButton = document.querySelector("#openLocationCatalogModalButton");
const locationCatalogModal = document.querySelector("#locationCatalogModal");
const locationCatalogForm = document.querySelector("#locationCatalogForm");
const locationCatalogModalTitle = document.querySelector("#locationCatalogModalTitle");
const locationCatalogFormStatus = document.querySelector("#locationCatalogFormStatus");
const locationCatalogNameInput = document.querySelector("#locationCatalogNameInput");
const locationCatalogModalClose = document.querySelector("#locationCatalogModalClose");
const cancelLocationCatalogButton = document.querySelector("#cancelLocationCatalogButton");
const saveLocationCatalogButton = document.querySelector("#saveLocationCatalogButton");
const cancelClientBranchButton = document.querySelector("#cancelClientBranchButton");
const saveClientBranchButton = document.querySelector("#saveClientBranchButton");
const clientsSearch = document.querySelector("#clientsSearch");
const clientsCardList = document.querySelector("#clientsCardList");
const openClientModalButton = document.querySelector("#openClientModalButton");
const clientDocsModal = document.querySelector("#clientDocsModal");
const clientDocsTitle = document.querySelector("#clientDocsTitle");
const clientDocsClose = document.querySelector("#clientDocsClose");
const clientDocumentForm = document.querySelector("#clientDocumentForm");
const clientDocumentsList = document.querySelector("#clientDocumentsList");
const uploadClientDocButton = document.querySelector("#uploadClientDocButton");
const providerModal = document.querySelector("#providerModal");
const providerForm = document.querySelector("#providerForm");
const providerModalTitle = document.querySelector("#providerModalTitle");
const providerModalClose = document.querySelector("#providerModalClose");
const cancelProviderButton = document.querySelector("#cancelProviderButton");
const saveProviderButton = document.querySelector("#saveProviderButton");
const providerFormStatus = document.querySelector("#providerFormStatus");
const providerCreditDaysField = document.querySelector("#providerCreditDaysField");
const providersSearch = document.querySelector("#providersSearch");
const providersCardList = document.querySelector("#providersCardList");
const openProviderModalButton = document.querySelector("#openProviderModalButton");
const providerDocsModal = document.querySelector("#providerDocsModal");
const providerDocsTitle = document.querySelector("#providerDocsTitle");
const providerDocsClose = document.querySelector("#providerDocsClose");
const providerDocumentForm = document.querySelector("#providerDocumentForm");
const providerDocumentsList = document.querySelector("#providerDocumentsList");
const uploadProviderDocButton = document.querySelector("#uploadProviderDocButton");
const priceForm = document.querySelector("#priceForm");
const priceCost = document.querySelector("#priceCost");
const priceFormStatus = document.querySelector("#priceFormStatus");
const addPriceButton = document.querySelector("#addPriceButton");
const pricesSearch = document.querySelector("#pricesSearch");
const priceList = document.querySelector("#priceList");
const priceEquipmentList = document.querySelector("#priceEquipmentList");
const priceLaborList = document.querySelector("#priceLaborList");
const fixedExpenseModal = document.querySelector("#fixedExpenseModal");
const fixedExpenseForm = document.querySelector("#fixedExpenseForm");
const fixedExpenseModalTitle = document.querySelector("#fixedExpenseModalTitle");
const fixedExpenseModalClose = document.querySelector("#fixedExpenseModalClose");
const cancelFixedExpenseButton = document.querySelector("#cancelFixedExpenseButton");
const saveFixedExpenseButton = document.querySelector("#saveFixedExpenseButton");
const fixedExpenseFormStatus = document.querySelector("#fixedExpenseFormStatus");
const fixedExpenseProviderSelect = document.querySelector("#fixedExpenseProviderSelect");
const fixedExpenseBranchSelect = document.querySelector("#fixedExpenseBranchSelect");
const fixedExpenseAutomaticToggle = document.querySelector("#fixedExpenseAutomaticToggle");
const generateFixedExpensesButton = document.querySelector("#generateFixedExpensesButton");
const fixedExpenseBudget = document.querySelector("#fixedExpenseBudget");
const fixedExpenseAdditionalBudget = document.querySelector("#fixedExpenseAdditionalBudget");
const fixedExpenseAvailableBudget = document.querySelector("#fixedExpenseAvailableBudget");
const fixedExpenseAssignedSummary = document.querySelector("#fixedExpenseAssignedSummary");
const fixedExpenseAdditionalSummary = document.querySelector("#fixedExpenseAdditionalSummary");
const fixedExpenseAvailableSummary = document.querySelector("#fixedExpenseAvailableSummary");
const fixedExpensesSearch = document.querySelector("#fixedExpensesSearch");
const fixedExpensesList = document.querySelector("#fixedExpensesList");
const fixedExpensesTable = document.querySelector("#fixedExpensesTable");
const openFixedExpenseModalButton = document.querySelector("#openFixedExpenseModalButton");
const createManualCommissionButton = document.querySelector("#createManualCommissionButton");
const budgetModal = document.querySelector("#budgetModal");
const budgetForm = document.querySelector("#budgetForm");
const budgetFormOriginalParent = budgetForm?.parentElement || null;
const budgetModalTitle = document.querySelector("#budgetModalTitle");
const budgetModalClose = document.querySelector("#budgetModalClose");
const cancelBudgetButton = document.querySelector("#cancelBudgetButton");
const saveBudgetButton = document.querySelector("#saveBudgetButton");
const budgetFormStatus = document.querySelector("#budgetFormStatus");
const budgetCompanySelect = document.querySelector("#budgetCompanySelect");
const budgetClientUserInput = document.querySelector("#budgetClientUserInput");
const budgetClientUserOptions = document.querySelector("#budgetClientUserOptions");
const budgetBranchInput = document.querySelector("#budgetBranchInput");
const budgetOwnerSelect = document.querySelector("#budgetOwnerSelect");
const budgetFolioPreview = document.querySelector("#budgetFolioPreview");
const budgetManualFolioToggle = document.querySelector("#budgetManualFolioToggle");
const budgetSinWarrantyToggle = document.querySelector("#budgetSinWarrantyToggle");
const toggleBudgetCostsButton = document.querySelector("#toggleBudgetCostsButton");
const budgetCostsPanel = document.querySelector("#budgetCostsPanel");
const addBudgetEquipmentRowButton = document.querySelector("#addBudgetEquipmentRowButton");
const budgetEquipmentTable = document.querySelector("#budgetEquipmentTable");
const budgetEquipmentRows = document.querySelector("#budgetEquipmentRows");
const budgetEquipmentTotal = document.querySelector("#budgetEquipmentTotal");
const addBudgetContractorRowButton = document.querySelector("#addBudgetContractorRowButton");
const budgetContractorTable = document.querySelector("#budgetContractorTable");
const budgetContractorRows = document.querySelector("#budgetContractorRows");
const budgetContractorTotal = document.querySelector("#budgetContractorTotal");
const addBudgetLaborRowButton = document.querySelector("#addBudgetLaborRowButton");
const budgetLaborTable = document.querySelector("#budgetLaborTable");
const budgetLaborRows = document.querySelector("#budgetLaborRows");
const budgetLaborTotal = document.querySelector("#budgetLaborTotal");
const addBudgetMaterialRowButton = document.querySelector("#addBudgetMaterialRowButton");
const budgetMaterialsTable = document.querySelector("#budgetMaterialsTable");
const budgetMaterialsRows = document.querySelector("#budgetMaterialsRows");
const budgetMaterialsTotal = document.querySelector("#budgetMaterialsTotal");
const downloadMaterialsTemplateButton = document.querySelector("#downloadMaterialsTemplateButton");
const uploadMaterialsExcelButton = document.querySelector("#uploadMaterialsExcelButton");
const materialsExcelInput = document.querySelector("#materialsExcelInput");
const supplierQuoteInput = document.querySelector("#supplierQuoteInput");
const supplierQuoteRows = document.querySelector("#supplierQuoteRows");
const budgetsSearch = document.querySelector("#budgetsSearch");
const budgetsExportExcelButton = document.querySelector("#budgetsExportExcelButton");
const budgetsExportPdfButton = document.querySelector("#budgetsExportPdfButton");
const budgetsCardList = document.querySelector("#budgetsCardList");
const budgetsTable = document.querySelector("#budgetsTable");
const budgetApprovalQueue = document.querySelector("#budgetApprovalQueue");
const budgetApprovalRows = document.querySelector("#budgetApprovalRows");
const budgetApprovalTable = document.querySelector("#budgetApprovalTable");
const openBudgetModalButton = document.querySelector("#openBudgetModalButton");
const openSharedClientPoButton = document.querySelector("#openSharedClientPoButton");
const sharedClientPoModal = document.querySelector("#sharedClientPoModal");
const sharedClientPoForm = document.querySelector("#sharedClientPoForm");
const sharedClientPoModalClose = document.querySelector("#sharedClientPoModalClose");
const cancelSharedClientPoButton = document.querySelector("#cancelSharedClientPoButton");
const saveSharedClientPoButton = document.querySelector("#saveSharedClientPoButton");
const sharedClientPoProjects = document.querySelector("#sharedClientPoProjects");
const sharedClientPoCalculatedTotal = document.querySelector("#sharedClientPoCalculatedTotal");
const sharedClientPoStatus = document.querySelector("#sharedClientPoStatus");
const sharedClientPoCompanyFilter = document.querySelector("#sharedClientPoCompanyFilter");
const sharedClientPoProjectFilter = document.querySelector("#sharedClientPoProjectFilter");
const sharedClientPoSelectVisibleButton = document.querySelector("#sharedClientPoSelectVisibleButton");
const sharedClientPoClearButton = document.querySelector("#sharedClientPoClearButton");
const budgetsListView = document.querySelector("#budgetsListView");
const budgetDetailView = document.querySelector("#budgetDetailView");
const budgetDetailContent = document.querySelector("#budgetDetailContent");
const budgetDetailActions = document.querySelector("#budgetDetailActions");
const backToBudgetsButton = document.querySelector("#backToBudgetsButton");
const deleteBudgetDetailButton = document.querySelector("#deleteBudgetDetailButton");
const purchasesListView = document.querySelector("#purchasesListView");
const purchaseDetailView = document.querySelector("#purchaseDetailView");
const purchaseDetailContent = document.querySelector("#purchaseDetailContent");
const backToPurchasesButton = document.querySelector("#backToPurchasesButton");
const purchasePendingRows = document.querySelector("#purchasePendingRows");
const purchaseCreatedRows = document.querySelector("#purchaseCreatedRows");
const purchasePendingTable = document.querySelector("#purchasePendingTable");
const purchaseCreatedTable = document.querySelector("#purchaseCreatedTable");
const purchaseSearch = document.querySelector("#purchaseSearch");
const purchaseCreateOcpButton = document.querySelector("#purchaseCreateOcpButton");
const purchaseExportExcelButton = document.querySelector("#purchaseExportExcelButton");
const purchaseExportPdfButton = document.querySelector("#purchaseExportPdfButton");
const purchaseFilterType = document.querySelector("#purchaseFilterType");
const purchaseFilterCompany = document.querySelector("#purchaseFilterCompany");
const purchaseFilterProvider = document.querySelector("#purchaseFilterProvider");
const purchaseFilterStatus = document.querySelector("#purchaseFilterStatus");
const purchaseFilterDateFrom = document.querySelector("#purchaseFilterDateFrom");
const purchaseFilterDateTo = document.querySelector("#purchaseFilterDateTo");
const purchaseClearFiltersButton = document.querySelector("#purchaseClearFiltersButton");
const purchaseFilterSummary = document.querySelector("#purchaseFilterSummary");
const purchaseFixedExpenseSearch = document.querySelector("#purchaseFixedExpenseSearch");
const openPurchaseFixedExpenseButton = document.querySelector("#openPurchaseFixedExpenseButton");
const purchaseFixedExpenseRows = document.querySelector("#purchaseFixedExpenseRows");
const purchaseFixedExpenseTable = document.querySelector("#purchaseFixedExpenseTable");
const purchaseFixedExpenseDetailView = document.querySelector("#purchaseFixedExpenseDetailView");
const purchaseFixedExpenseDetailContent = document.querySelector("#purchaseFixedExpenseDetailContent");
const backToPurchaseFixedExpensesButton = document.querySelector("#backToPurchaseFixedExpensesButton");
const accountsReceivableListView = document.querySelector("#accountsReceivableListView");
const accountsReceivableDetailView = document.querySelector("#accountsReceivableDetailView");
const accountsReceivableDetailContent = document.querySelector("#accountsReceivableDetailContent");
const backToAccountsReceivableButton = document.querySelector("#backToAccountsReceivableButton");
const accountsReceivableRows = document.querySelector("#accountsReceivableRows");
const accountsReceivableTable = document.querySelector("#accountsReceivableTable");
const accountsReceivableSearch = document.querySelector("#accountsReceivableSearch");
const accountsReceivableExportExcelButton = document.querySelector("#accountsReceivableExportExcelButton");
const accountsReceivableExportPdfButton = document.querySelector("#accountsReceivableExportPdfButton");
const accountsReceivableFilterCompany = document.querySelector("#accountsReceivableFilterCompany");
const accountsReceivableFilterStatus = document.querySelector("#accountsReceivableFilterStatus");
const accountsReceivableFilterCollection = document.querySelector("#accountsReceivableFilterCollection");
const accountsReceivableFilterBalance = document.querySelector("#accountsReceivableFilterBalance");
const accountsReceivableFilterDateFrom = document.querySelector("#accountsReceivableFilterDateFrom");
const accountsReceivableFilterDateTo = document.querySelector("#accountsReceivableFilterDateTo");
const accountsReceivableClearFiltersButton = document.querySelector("#accountsReceivableClearFiltersButton");
const accountsReceivableFilterSummary = document.querySelector("#accountsReceivableFilterSummary");
const openReceivableBatchSelectorButton = document.querySelector("#openReceivableBatchSelectorButton");
const accountsReceivablePendingBatchesPanel = document.querySelector("#accountsReceivablePendingBatchesPanel");
const accountsReceivablePendingBatchesRows = document.querySelector("#accountsReceivablePendingBatchesRows");
const accountsReceivablePendingBatchesCount = document.querySelector("#accountsReceivablePendingBatchesCount");
const accountsReceivableBatchSelectView = document.querySelector("#accountsReceivableBatchSelectView");
const accountsReceivableBatchReviewView = document.querySelector("#accountsReceivableBatchReviewView");
const backFromReceivableBatchSelectButton = document.querySelector("#backFromReceivableBatchSelectButton");
const backFromReceivableBatchReviewButton = document.querySelector("#backFromReceivableBatchReviewButton");
const receivableBatchCompanyFilter = document.querySelector("#receivableBatchCompanyFilter");
const receivableBatchCompanyOptions = document.querySelector("#receivableBatchCompanyOptions");
const receivableBatchPoFilter = document.querySelector("#receivableBatchPoFilter");
const receivableBatchPoOptions = document.querySelector("#receivableBatchPoOptions");
const receivableBatchProjectFilter = document.querySelector("#receivableBatchProjectFilter");
const receivableBatchAvailabilityFilter = document.querySelector("#receivableBatchAvailabilityFilter");
const receivableBatchFilterSummary = document.querySelector("#receivableBatchFilterSummary");
const receivableBatchClearFiltersButton = document.querySelector("#receivableBatchClearFiltersButton");
const receivableBatchIntermediary = document.querySelector("#receivableBatchIntermediary");
const receivableBatchReference = document.querySelector("#receivableBatchReference");
const receivableBatchDiscount = document.querySelector("#receivableBatchDiscount");
const receivableBatchAuthorizedTotal = document.querySelector("#receivableBatchAuthorizedTotal");
const receivableBatchSelectVisibleButton = document.querySelector("#receivableBatchSelectVisibleButton");
const receivableBatchClearButton = document.querySelector("#receivableBatchClearButton");
const receivableBatchExistingPanel = document.querySelector("#receivableBatchExistingPanel");
const receivableBatchExistingRows = document.querySelector("#receivableBatchExistingRows");
const receivableBatchExistingCount = document.querySelector("#receivableBatchExistingCount");
const receivableBatchCandidateRows = document.querySelector("#receivableBatchCandidateRows");
const receivableBatchSelectionSummary = document.querySelector("#receivableBatchSelectionSummary");
const receivableBatchSelectionHint = document.querySelector("#receivableBatchSelectionHint");
const receivableBatchContinueButton = document.querySelector("#receivableBatchContinueButton");
const receivableBatchReviewContent = document.querySelector("#receivableBatchReviewContent");
const receivableBatchReviewSummary = document.querySelector("#receivableBatchReviewSummary");
const receivableBatchReviewEyebrow = document.querySelector("#receivableBatchReviewEyebrow");
const receivableBatchReviewTitle = document.querySelector("#receivableBatchReviewTitle");
const receivableBatchReviewDescription = document.querySelector("#receivableBatchReviewDescription");
const receivableBatchProofPanel = document.querySelector("#receivableBatchProofPanel");
const receivableBatchGeneralFileType = document.querySelector("#receivableBatchGeneralFileType");
const receivableBatchGeneralProofInput = document.querySelector("#receivableBatchGeneralProofInput");
const receivableBatchUploadProofButton = document.querySelector("#receivableBatchUploadProofButton");
const receivableBatchDoneButton = document.querySelector("#receivableBatchDoneButton");
const accountsPayableListView = document.querySelector("#accountsPayableListView");
const accountsPayablePendingBatchesPanel = document.querySelector("#accountsPayablePendingBatchesPanel");
const accountsPayablePendingBatchesRows = document.querySelector("#accountsPayablePendingBatchesRows");
const accountsPayablePendingBatchesCount = document.querySelector("#accountsPayablePendingBatchesCount");
const accountsPayableDetailView = document.querySelector("#accountsPayableDetailView");
const accountsPayableDetailContent = document.querySelector("#accountsPayableDetailContent");
const backToAccountsPayableButton = document.querySelector("#backToAccountsPayableButton");
const accountsPayablePendingCashRows = document.querySelector("#accountsPayablePendingCashRows");
const accountsPayablePendingRows = document.querySelector("#accountsPayablePendingRows");
const accountsPayablePaidCashRows = document.querySelector("#accountsPayablePaidCashRows");
const accountsPayablePaidRows = document.querySelector("#accountsPayablePaidRows");
const accountsPayablePendingCashTable = document.querySelector("#accountsPayablePendingCashTable");
const accountsPayablePendingTable = document.querySelector("#accountsPayablePendingTable");
const accountsPayablePaidCashTable = document.querySelector("#accountsPayablePaidCashTable");
const accountsPayablePaidTable = document.querySelector("#accountsPayablePaidTable");
const accountsPayableOcgfPendingCashRows = document.querySelector("#accountsPayableOcgfPendingCashRows");
const accountsPayableOcgfPendingRows = document.querySelector("#accountsPayableOcgfPendingRows");
const accountsPayableOcgfPaidCashRows = document.querySelector("#accountsPayableOcgfPaidCashRows");
const accountsPayableOcgfPaidRows = document.querySelector("#accountsPayableOcgfPaidRows");
const accountsPayableOcgfPendingCashTable = document.querySelector("#accountsPayableOcgfPendingCashTable");
const accountsPayableOcgfPendingTable = document.querySelector("#accountsPayableOcgfPendingTable");
const accountsPayableOcgfPaidCashTable = document.querySelector("#accountsPayableOcgfPaidCashTable");
const accountsPayableOcgfPaidTable = document.querySelector("#accountsPayableOcgfPaidTable");
const accountsPayableCommissionPendingRows = document.querySelector("#accountsPayableCommissionPendingRows");
const accountsPayableCommissionPaidRows = document.querySelector("#accountsPayableCommissionPaidRows");
const accountsPayableCommissionPendingTable = document.querySelector("#accountsPayableCommissionPendingTable");
const accountsPayableCommissionPaidTable = document.querySelector("#accountsPayableCommissionPaidTable");
const openCommissionBatchSelectorButton = document.querySelector("#openCommissionBatchSelectorButton");
const accountsPayableCommissionBatchSelectView = document.querySelector("#accountsPayableCommissionBatchSelectView");
const accountsPayableCommissionBatchReviewView = document.querySelector("#accountsPayableCommissionBatchReviewView");
const backFromCommissionBatchSelectButton = document.querySelector("#backFromCommissionBatchSelectButton");
const backFromCommissionBatchReviewButton = document.querySelector("#backFromCommissionBatchReviewButton");
const commissionBatchMonthFilter = document.querySelector("#commissionBatchMonthFilter");
const commissionBatchPersonFilter = document.querySelector("#commissionBatchPersonFilter");
const commissionBatchPersonOptions = document.querySelector("#commissionBatchPersonOptions");
const commissionBatchProjectFilter = document.querySelector("#commissionBatchProjectFilter");
const commissionBatchSelectVisibleButton = document.querySelector("#commissionBatchSelectVisibleButton");
const commissionBatchClearButton = document.querySelector("#commissionBatchClearButton");
const commissionBatchExistingPanel = document.querySelector("#commissionBatchExistingPanel");
const commissionBatchExistingRows = document.querySelector("#commissionBatchExistingRows");
const commissionBatchExistingCount = document.querySelector("#commissionBatchExistingCount");
const commissionBatchCandidateRows = document.querySelector("#commissionBatchCandidateRows");
const commissionBatchSelectionSummary = document.querySelector("#commissionBatchSelectionSummary");
const commissionBatchSelectionHint = document.querySelector("#commissionBatchSelectionHint");
const commissionBatchContinueButton = document.querySelector("#commissionBatchContinueButton");
const commissionBatchGroupMode = document.querySelector("#commissionBatchGroupMode");
const commissionBatchReviewContent = document.querySelector("#commissionBatchReviewContent");
const commissionBatchGeneralProofInput = document.querySelector("#commissionBatchGeneralProofInput");
const commissionBatchProofPanel = document.querySelector("#commissionBatchProofPanel");
const commissionBatchUploadProofButton = document.querySelector("#commissionBatchUploadProofButton");
const commissionBatchReviewSummary = document.querySelector("#commissionBatchReviewSummary");
const commissionBatchReviewEyebrow = document.querySelector("#commissionBatchReviewEyebrow");
const commissionBatchReviewTitle = document.querySelector("#commissionBatchReviewTitle");
const commissionBatchReviewDescription = document.querySelector("#commissionBatchReviewDescription");
const commissionBatchConfirmButton = document.querySelector("#commissionBatchConfirmButton");
const accountsPayableSearch = document.querySelector("#accountsPayableSearch");
const accountsPayableExportExcelButton = document.querySelector("#accountsPayableExportExcelButton");
const accountsPayableExportPdfButton = document.querySelector("#accountsPayableExportPdfButton");
const accountsPayableFilterSource = document.querySelector("#accountsPayableFilterSource");
const accountsPayableFilterProvider = document.querySelector("#accountsPayableFilterProvider");
const accountsPayableFilterBranch = document.querySelector("#accountsPayableFilterBranch");
const accountsPayableFilterTerms = document.querySelector("#accountsPayableFilterTerms");
const accountsPayableFilterPayment = document.querySelector("#accountsPayableFilterPayment");
const accountsPayableFilterDateFrom = document.querySelector("#accountsPayableFilterDateFrom");
const accountsPayableFilterDateTo = document.querySelector("#accountsPayableFilterDateTo");
const accountsPayableClearFiltersButton = document.querySelector("#accountsPayableClearFiltersButton");
const accountsPayableFilterSummary = document.querySelector("#accountsPayableFilterSummary");
const accountsPayableCommissionMonth = document.querySelector("#accountsPayableCommissionMonth");
const commissionsSearch = document.querySelector("#commissionsSearch");
const commissionsPeriodFilter = document.querySelector("#commissionsPeriodFilter");
const commissionsDateFromFilter = document.querySelector("#commissionsDateFromFilter");
const commissionsDateToFilter = document.querySelector("#commissionsDateToFilter");
const commissionsCollectionFilter = document.querySelector("#commissionsCollectionFilter");
const commissionsSupervisorFilter = document.querySelector("#commissionsSupervisorFilter");
const commissionsListView = document.querySelector("#commissionsListView");
const commissionsDetailView = document.querySelector("#commissionsDetailView");
const commissionsDetailContent = document.querySelector("#commissionsDetailContent");
const backToCommissionsButton = document.querySelector("#backToCommissionsButton");
const commissionsPendingRows = document.querySelector("#commissionsPendingRows");
const commissionsCreatedRows = document.querySelector("#commissionsCreatedRows");
const commissionsPendingTable = document.querySelector("#commissionsPendingTable");
const commissionsCreatedTable = document.querySelector("#commissionsCreatedTable");

let catalogsLoaded = false;
let usersSearchTimer = null;
let clientsSearchTimer = null;
let providersSearchTimer = null;
let providersSearchRequestId = 0;
let pricesSearchTimer = null;
let fixedExpensesSearchTimer = null;
let budgetsSearchTimer = null;
let globalSearchTimer = null;
let currentUser = null;
let pendingActionButton = null;
const lockedActionButtons = new WeakMap();
let lastGlobalSearchTerm = "";
let usersCache = [];
let projectOwnerAuditCache = { users: [], sources: [], projects: [] };
let editingUserId = null;
let tasksCache = [];
let tasksUsersCache = [];
let editingTaskId = null;
let tasksSearchTimer = null;
let clientsCache = [];
let clientDirectoryCatalogCache = [];
let clientBranchLocationsCache = [];
let locationCatalogCache = [];
let editingClientBranchId = null;
let editingLocationCatalogId = null;
let editingClientId = null;
let activeDocsClientId = null;
let providersCache = [];
let editingProviderId = null;
let activeDocsProviderId = null;
let priceItemsCache = [];
let fixedExpensesCache = [];
let fixedExpenseProvidersCache = [];
let fixedExpenseBranchesCache = [];
let editingFixedExpenseId = null;
let fixedExpensesSort = { key: "", direction: "asc" };
let budgetsCache = [];
let sharedClientPoCandidates = [];
let sharedClientPoSelectedBudgetIds = new Set();
let budgetsSort = { key: "", direction: "asc" };
let budgetClientsCache = [];
let budgetProjectOwnersCache = [];
let budgetEquipmentPriceItems = [];
let budgetLaborPriceItems = [];
let budgetEquipmentDraftRows = [];
let budgetContractorDraftRows = [];
let budgetLaborDraftRows = [];
let budgetMaterialDraftRows = [];
let budgetSupplierQuoteFiles = [];
let activeBudgetDetailId = null;
let editingBudgetId = null;
let isBudgetSaving = false;
let clientQuoteData = null;
let clientQuoteRows = [];
let clientQuoteSelectedCostParts = new Set();
let clientQuoteVisibleBlock = "";
let editingClientQuoteDraftId = null;
let editingClientQuoteVersionId = null;
let clientQuoteDiscountAmount = 0;
let clientQuoteDiscountPercent = 0;
let clientQuoteDiscountVisible = false;
let purchaseFlowData = null;
let supplierOrderRows = [];
let supplierOrderSelectedCostParts = new Set();
let supplierOrderVisibleBlock = "";
let editingSupplierOrderVersionId = null;
let activeSupplierOrderContextId = null;
let purchasesCache = { pending: [], created: [] };
let purchaseFixedExpensesCache = [];
let purchasePendingSort = { key: "", direction: "asc" };
let purchaseCreatedSort = { key: "", direction: "asc" };
let purchaseFixedExpenseSort = { key: "", direction: "asc" };
let purchaseFixedExpenseCatalogs = { fixedExpenses: [], providers: [] };
let activePurchaseFixedExpenseId = null;
let activePurchaseFixedExpenseData = null;
let purchaseFixedExpenseOrderRows = [];
let editingFixedExpenseOrderVersionId = null;
let purchaseSearchTimer = null;
let purchaseFixedExpenseSearchTimer = null;
let accountsReceivableCache = [];
let activeAccountsReceivableQuoteId = null;
let accountsReceivableSort = { key: "", direction: "asc" };
let accountsReceivableSearchTimer = null;
let accountsReceivablePendingBatches = [];
let receivableBatchCandidates = [];
let receivableBatchExistingBatches = [];
let receivableBatchSelectedIds = new Set();
let receivableBatchActive = null;
let receivableBatchOpenedFromMain = false;
let receivableBatchGeneralProofFiles = [];
let receivableBatchProofFilesByItem = new Map();
let budgetInlineEditorOpen = false;
let userPermissionCatalog = { roleDefaults: {}, permissionByName: {} };
let accountsPayableCache = [];
let accountsPayableOcgfCache = [];
let accountsPayableCommissionCache = [];
let accountsPayablePendingBatches = [];
let accountsPayableCanCancelBatches = false;
let activeAccountsPayableOrderId = null;
let activeAccountsPayableSource = "ocp";
let accountsPayablePendingSort = { key: "", direction: "asc" };
let accountsPayablePaidSort = { key: "", direction: "asc" };
let accountsPayableOcgfPendingSort = { key: "", direction: "asc" };
let accountsPayableOcgfPaidSort = { key: "", direction: "asc" };
let accountsPayableCommissionPendingSort = { key: "", direction: "asc" };
let accountsPayableCommissionPaidSort = { key: "", direction: "asc" };
let accountsPayableSearchTimer = null;
let commissionBatchCandidates = [];
let commissionBatchExistingBatches = [];
let commissionBatchSelectedIds = new Set();
let commissionBatchGeneralProofFiles = [];
let commissionBatchProofFilesByKey = new Map();
let commissionBatchDraftBatch = null;
let commissionBatchPaidBatch = null;
let commissionBatchOpenedExisting = false;
let commissionBatchOpenedFromMain = false;
let commissionBatchUploadedGeneralNames = [];
let commissionBatchUploadedProofNamesByKey = new Map();
let reportExportCache = null;
let reportExportSuggestionRows = [];
let reportsPaidMonth = "";
let activeReportExport = { title: "", columns: [], rows: [], filters: [], filename: "reporte-dalvo" };
let reportExportSort = { key: "", direction: "asc" };
let commissionsCache = { budgets: [], commissions: [], supervisors: [], canManage: false };
let commissionsPendingSort = { key: "", direction: "asc" };
let commissionsCreatedSort = { key: "", direction: "asc" };
let commissionsSearchTimer = null;
let pendingCommissionBudgetId = null;
let pendingCommissionFolio = "";
let activeCommissionDetail = null;
let budgetEquipmentSort = { key: "", direction: "asc" };
let budgetContractorSort = { key: "", direction: "asc" };
let budgetLaborSort = { key: "", direction: "asc" };
let budgetMaterialSort = { key: "", direction: "asc" };
let currentModuleName = "inicio";
let userCreditsCache = [];
let userCreditUsersCatalog = [];
let activeUserCreditId = null;
let activeUserCreditDetailId = null;
let activeUserCreditDetailData = null;
let userCreditsSearchTimer = null;
let autoRefreshInFlight = false;
const AUTO_REFRESH_MS = 10000;
const PAGE_SIZE = 10;
const paginationState = {};

const moduleCopy = {
  usuarios: "Administra accesos, roles y permisos internos.",
  prestamos: "Control de préstamos, adeudos, abonos e historial por persona.",
  sucursales: "Catálogo maestro de sucursales para todo el sistema.",
  empresas: "Alta, edición y asignación de empresas a una sucursal existente.",
  clientes: "Alta, edición y control de clientes / usuarios por empresa.",
  proveedores: "Directorio y condiciones de proveedores.",
  "lista-precios": "Catálogo base para partidas, materiales y servicios.",
  "gastos-fijos": "Control de gastos recurrentes y órdenes asociadas.",
  presupuesto: "Creación y seguimiento de presupuestos de proyecto.",
  compras: "Órdenes de compra para proveedores y aprobaciones.",
  "cuentas-cobrar": "Seguimiento de facturación y cobranza a clientes.",
  "cuentas-pagar": "Control de pagos pendientes y realizados a proveedores.",
  comisiones: "Generación y seguimiento de OCCOM para supervisores.",
  tareas: "Notas, seguimientos, recordatorios y alertas internas.",
  inventario: "Existencias, entradas, salidas y movimientos internos.",
  nomina: "Gestión de nómina y registros del personal.",
  reportes: "Vistas ejecutivas e indicadores del sistema.",
  exportaciones: "Reportes filtrados y descargas profesionales en Excel y PDF.",
  "recuperacion-documental": "Conciliación de respaldos, documentos faltantes y archivos por proyecto."
};

const budgetBlockOptions = [
  { value: "equipos", label: "Equipos" },
  { value: "manoObra", label: "Mano de obra" },
  { value: "materiales", label: "Materiales" }
];
const APP_LOCATION_KEY = "dalvo:app-location";
const SIDEBAR_STATE_KEY = "dalvo:hybrid-sidebar-collapsed-v1";
const ROW_FLAGS_STORAGE_KEY = "dalvo:row-flags";
const MODULE_NAMES = new Set([
  "inicio",
  "usuarios",
  "prestamos",
  "sucursales",
  "empresas",
  "clientes",
  "proveedores",
  "lista-precios",
  "gastos-fijos",
  "presupuesto",
  "compras",
  "cuentas-cobrar",
  "cuentas-pagar",
  "comisiones",
  "tareas",
  "inventario",
  "nomina",
  "reportes",
  "exportaciones",
  "recuperacion-documental"
]);
const ALL_MODULES = [...MODULE_NAMES];
let isApplyingHistoryState = false;
const ROLE_MODULES = {
  superadmin: ALL_MODULES,
  administracion: ALL_MODULES,
  supervisor: ["presupuesto", "tareas", "reportes", "exportaciones"],
  compras: ["proveedores", "gastos-fijos", "compras", "cuentas-cobrar", "cuentas-pagar", "tareas", "reportes", "exportaciones"]
};

const BUDGET_WARRANTY_RATE = 0.05;

function normalizeBudgetBlock(value) {
  const compact = String(value || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const blocks = {
    equipo: "equipos",
    equipos: "equipos",
    equiposdeelevacioneizaje: "equipos",
    manodeobra: "manoObra",
    manoobra: "manoObra",
    mano: "manoObra",
    contratistas: "manoObra",
    contratista: "manoObra",
    material: "materiales",
    materiales: "materiales"
  };
  return blocks[compact] || String(value || "").trim();
}

function getBudgetBlockLabel(value) {
  const normalized = normalizeBudgetBlock(value);
  return budgetBlockOptions.find((block) => block.value === normalized)?.label || value || "";
}

function setMessage(message, type = "error") {
  loginMessage.textContent = message || "";
  loginMessage.dataset.type = type;
}

function setLoading(isLoading) {
  loginButton.disabled = isLoading;
  loginButton.textContent = isLoading ? "Validando..." : "Iniciar sesion";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getFileViewUrl(file = {}) {
  const rawUrl = typeof file === "string" ? file : file.url || file.ruta || file.path || "";
  const cleanUrl = String(rawUrl || "").trim().replace(/\\/g, "/");
  if (!cleanUrl || cleanUrl === "#" || cleanUrl === "/") return "";
  if (/^(https?:|blob:|data:)/i.test(cleanUrl)) return cleanUrl;
  if (cleanUrl.startsWith("/")) return cleanUrl;
  return `/${cleanUrl.replace(/^\.?\//, "").replace(/^\/+/, "")}`;
}

function renderFileNameLink(file = {}, fallbackName = "Archivo") {
  const fileUrl = getFileViewUrl(file);
  const fileName = escapeHtml(file.nombre || fallbackName);
  return fileUrl
    ? `<a href="${escapeHtml(fileUrl)}" target="_blank" rel="noreferrer">${fileName}</a>`
    : `<span>${fileName}</span>`;
}

function renderFileViewButton(file = {}) {
  const fileUrl = getFileViewUrl(file);
  return fileUrl
    ? `<a class="small-button view-file-button" href="${escapeHtml(fileUrl)}" target="_blank" rel="noreferrer">Ver</a>`
    : `<button class="small-button view-file-button" type="button" disabled>Ver</button>`;
}

function renderDocumentCardLink(file = {}) {
  const fileUrl = getFileViewUrl(file);
  const content = `<strong>${escapeHtml(file.nombre || "Archivo")}</strong><span>${escapeHtml(
    file.tipo || "documento"
  )}</span>`;
  return fileUrl
    ? `<a href="${escapeHtml(fileUrl)}" target="_blank" rel="noreferrer">${content}</a>`
    : `<span class="document-link-placeholder">${content}</span>`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value || 0));
}

function formatInteger(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(Math.round(Number(value || 0)));
}

function formatCounterValue(value, format = "integer") {
  if (format === "currency") return formatCurrency(value);
  if (format === "percent") return `${Number(value || 0).toFixed(1)}%`;
  return formatInteger(value);
}

function animateCounter(element, targetValue, { format = "integer", duration = 850 } = {}) {
  if (!element) return;
  const target = Number(targetValue || 0);
  const previous = Number(element.dataset.counterCurrent || 0);

  if (Number(element.dataset.counterCurrent) === target) {
    element.textContent = formatCounterValue(target, format);
    return;
  }

  element.dataset.counterCurrent = String(target);
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || duration <= 0) {
    element.textContent = formatCounterValue(target, format);
    return;
  }

  const start = performance.now();
  const delta = target - previous;
  const easeOut = (progress) => 1 - Math.pow(1 - progress, 3);

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = formatCounterValue(previous + delta * easeOut(progress), format);
    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }
    element.textContent = formatCounterValue(target, format);
  }

  requestAnimationFrame(tick);
}

function animateCounters(root = document) {
  root.querySelectorAll("[data-counter-value]").forEach((element) => {
    animateCounter(element, Number(element.dataset.counterValue || 0), {
      format: element.dataset.counterFormat || "integer"
    });
  });
}

function formatDate(value) {
  if (!value) return "";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date(year, month - 1, day));
  }
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

function getCurrentMonthValue() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthDateRange(monthValue = getCurrentMonthValue()) {
  const match = String(monthValue || "").match(/^(\d{4})-(\d{2})$/);
  if (!match) return { from: "", to: "" };
  const year = Number(match[1]);
  const month = Number(match[2]);
  const lastDay = new Date(year, month, 0).getDate();
  return {
    from: `${match[1]}-${match[2]}-01`,
    to: `${match[1]}-${match[2]}-${String(lastDay).padStart(2, "0")}`
  };
}

function renderModificationStamp(updatedAt, updatedBy) {
  const date = formatDate(updatedAt) || "Sin fecha";
  const user = String(updatedBy || "").trim();
  return `
    <span class="table-stacked-cell">
      <strong>${escapeHtml(date)}</strong>
      <small>${escapeHtml(user || "Sin usuario")}</small>
    </span>
  `;
}

function isCurrentUserSuperAdmin() {
  const username = String(currentUser?.username || "").toLowerCase();
  const role = getCurrentRoleKey();
  return username === "superadmin" || role === "superadmin";
}

function isCanonicalSuperAdminUser() {
  return normalizeRoleKey(currentUser?.username || "") === "superadmin";
}

function isEngineerOscarUser() {
  return normalizeRoleKey(currentUser?.username || "") === "oscar";
}

function canUseExports() {
  return isCurrentUserSuperAdmin() || isEngineerOscarUser();
}

function normalizeRoleKey(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function normalizeSearchValue(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/(?<=\d),(?=\d)/g, "")
    .trim();
}

function normalizeBranchUiKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

function resolveOfficialBranchUiAlias(value) {
  const key = normalizeBranchUiKey(value);
  if (["SLP", "SANLUISPOTOSI"].includes(key)) return "SLP";
  if (["QRO", "QUERETARO"].includes(key)) return "QRO";
  if (["GTO", "GUANAJUATO", "CEL", "CELAYA"].includes(key)) return "GTO";
  return "";
}

function branchLabelsMatch(left, right) {
  const leftOfficial = resolveOfficialBranchUiAlias(left);
  const rightOfficial = resolveOfficialBranchUiAlias(right);
  if (leftOfficial || rightOfficial) return Boolean(leftOfficial && rightOfficial && leftOfficial === rightOfficial);
  return normalizeBranchUiKey(left) === normalizeBranchUiKey(right);
}


function getSearchTerms(value) {
  return normalizeSearchValue(value)
    .replace(/[^a-z0-9ñ]+/gi, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);
}

function matchesAllSearchTerms(value, query) {
  const terms = getSearchTerms(query);
  if (!terms.length) return true;
  const haystack = normalizeSearchValue(value);
  return terms.every((term) => haystack.includes(term));
}

function smartMatchScore(value, query) {
  const haystack = normalizeSearchValue(value);
  const normalizedQuery = normalizeSearchValue(query);
  const terms = getSearchTerms(query);
  let score = 0;
  if (!normalizedQuery) return score;
  if (haystack === normalizedQuery) score += 1000;
  if (haystack.startsWith(normalizedQuery)) score += 500;
  if (haystack.includes(normalizedQuery)) score += 250;
  terms.forEach((term, index) => {
    const position = haystack.indexOf(term);
    if (position === 0) score += 80 - index;
    else if (position > 0) score += Math.max(10, 50 - position);
  });
  return score;
}

const smartAutocompleteControllers = new WeakMap();
const smartSelectControllers = new WeakMap();

function normalizeSmartAutocompleteItems(items = []) {
  return (items || [])
    .filter(Boolean)
    .map((item, index) => {
      if (typeof item === "string" || typeof item === "number") {
        const label = String(item);
        return { value: label, label, inputLabel: label, searchText: label, index };
      }
      const label = String(item.label ?? item.name ?? item.value ?? "");
      const inputLabel = String(item.inputLabel ?? label);
      const searchText = String(item.searchText ?? `${label} ${item.meta || ""}`);
      return { ...item, value: String(item.value ?? inputLabel), label, inputLabel, searchText, index };
    })
    .filter((item) => item.label);
}

function attachSmartAutocomplete(input, config = {}) {
  if (!input) return null;
  const existing = smartAutocompleteControllers.get(input);
  if (existing) {
    existing.updateConfig(config);
    return existing;
  }

  input.removeAttribute("list");
  let wrapper = input.parentElement?.classList.contains("smart-autocomplete")
    ? input.parentElement
    : null;
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "smart-autocomplete";
    input.parentNode?.insertBefore(wrapper, input);
    wrapper.appendChild(input);
  }

  const menu = document.createElement("div");
  menu.className = "smart-autocomplete-menu hidden";
  menu.setAttribute("role", "listbox");
  wrapper.appendChild(menu);

  let currentConfig = { maxResults: 9, requireSelection: false, ...config };
  let renderedItems = [];
  let activeIndex = -1;
  let selectedItem = null;

  const getItems = () => {
    const source = typeof currentConfig.getItems === "function"
      ? currentConfig.getItems()
      : currentConfig.items || [];
    return normalizeSmartAutocompleteItems(source);
  };

  const close = () => {
    menu.classList.add("hidden");
    menu.innerHTML = "";
    renderedItems = [];
    activeIndex = -1;
  };

  const updateActive = () => {
    menu.querySelectorAll("[data-smart-option]").forEach((button, index) => {
      button.classList.toggle("is-active", index === activeIndex);
      if (index === activeIndex) button.scrollIntoView({ block: "nearest" });
    });
  };

  const setSelection = (item, { notify = false } = {}) => {
    selectedItem = item || null;
    if (item) {
      input.value = item.inputLabel || item.label || "";
      input.dataset.smartValue = String(item.value ?? "");
      input.setCustomValidity("");
    } else {
      delete input.dataset.smartValue;
    }
    if (notify && item && typeof currentConfig.onSelect === "function") currentConfig.onSelect(item, input);
  };

  const render = () => {
    if (input.disabled || input.readOnly) return close();
    // Los refrescos de datos pueden actualizar las opciones en segundo plano,
    // pero nunca deben abrir el desplegable si el usuario no está usando el campo.
    if (document.activeElement !== input) return close();
    const query = input.value.trim();
    if (currentConfig.openOnFocus === false && !query) return close();
    const items = getItems()
      .filter((item) => !query || matchesAllSearchTerms(item.searchText || item.label, query))
      .sort((a, b) => {
        const score = smartMatchScore(b.searchText || b.label, query) - smartMatchScore(a.searchText || a.label, query);
        return score || a.label.localeCompare(b.label, "es", { sensitivity: "base", numeric: true });
      })
      .slice(0, Number(currentConfig.maxResults || 9));

    renderedItems = items;
    activeIndex = items.length ? 0 : -1;
    if (!items.length) {
      menu.innerHTML = `<div class="smart-autocomplete-empty">${escapeHtml(currentConfig.emptyText || "Sin coincidencias")}</div>`;
      menu.classList.remove("hidden");
      return;
    }
    menu.innerHTML = items
      .map(
        (item, index) => `
          <button class="smart-autocomplete-option ${index === activeIndex ? "is-active" : ""}" type="button" data-smart-option="${index}" role="option">
            <strong>${escapeHtml(item.label)}</strong>
            ${item.meta ? `<small>${escapeHtml(item.meta)}</small>` : ""}
          </button>
        `
      )
      .join("");
    menu.classList.remove("hidden");
  };

  input.addEventListener("focus", render);
  input.addEventListener("input", () => {
    const selectedLabel = selectedItem?.inputLabel || selectedItem?.label || "";
    if (!selectedItem || normalizeSearchValue(input.value) !== normalizeSearchValue(selectedLabel)) {
      setSelection(null);
      if (currentConfig.requireSelection && input.value.trim()) {
        input.setCustomValidity(currentConfig.validationMessage || "Selecciona una opción de la lista.");
      } else {
        input.setCustomValidity("");
      }
    }
    if (typeof currentConfig.onInput === "function") currentConfig.onInput(input.value, input);
    render();
  });
  input.addEventListener("keydown", (event) => {
    if (menu.classList.contains("hidden") && ["ArrowDown", "ArrowUp"].includes(event.key)) render();
    if (!renderedItems.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % renderedItems.length;
      updateActive();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = (activeIndex - 1 + renderedItems.length) % renderedItems.length;
      updateActive();
    } else if (event.key === "Enter" && !menu.classList.contains("hidden")) {
      event.preventDefault();
      const item = renderedItems[Math.max(0, activeIndex)];
      if (item) {
        setSelection(item, { notify: true });
        close();
      }
    } else if (event.key === "Escape") {
      close();
    }
  });
  menu.addEventListener("mousedown", (event) => event.preventDefault());
  menu.addEventListener("click", (event) => {
    const button = event.target.closest("[data-smart-option]");
    if (!button) return;
    const item = renderedItems[Number(button.dataset.smartOption)];
    if (!item) return;
    setSelection(item, { notify: true });
    close();
    input.focus();
  });
  input.addEventListener("blur", () => {
    window.setTimeout(close, 120);
    if (currentConfig.requireSelection && input.value.trim() && !selectedItem) {
      input.setCustomValidity(currentConfig.validationMessage || "Selecciona una opción de la lista.");
    }
  });

  const controller = {
    input,
    menu,
    render,
    close,
    getSelected: () => selectedItem,
    setSelection,
    clear: () => {
      input.value = "";
      setSelection(null);
      input.setCustomValidity("");
    },
    updateConfig(next = {}) {
      currentConfig = { ...currentConfig, ...next };
    }
  };
  smartAutocompleteControllers.set(input, controller);
  return controller;
}

function enhanceSearchableSelect(select, options = {}) {
  if (!select) return null;
  const existing = smartSelectControllers.get(select);
  if (existing) {
    existing.update(options);
    existing.sync();
    return existing;
  }

  const input = document.createElement("input");
  input.type = "search";
  input.autocomplete = "off";
  input.className = "smart-select-input";
  input.placeholder = options.placeholder || "Escribe para buscar...";
  const required = Boolean(select.required);
  select.required = false;
  input.required = required;
  select.classList.add("smart-select-source");
  select.parentNode?.insertBefore(input, select);

  const autocomplete = attachSmartAutocomplete(input, {
    maxResults: options.maxResults || 10,
    requireSelection: required || Boolean(options.requireSelection),
    validationMessage: options.validationMessage || "Selecciona una opción válida de la lista.",
    getItems: () =>
      [...select.options]
        .filter((option) => String(option.value || "").trim())
        .map((option) => ({
          value: option.value,
          label: option.textContent?.trim() || option.value,
          inputLabel: option.textContent?.trim() || option.value,
          searchText: `${option.textContent || ""} ${option.dataset.search || ""}`,
          option
        })),
    onInput: () => {
      select.value = "";
    },
    onSelect: (item) => {
      select.value = String(item.value);
      select.dispatchEvent(new Event("change", { bubbles: true }));
      if (typeof options.onSelect === "function") options.onSelect(item, select, input);
    }
  });

  const sync = () => {
    input.disabled = select.disabled;
    const selected = select.selectedOptions?.[0];
    if (selected && String(selected.value || "").trim()) {
      autocomplete.setSelection({
        value: selected.value,
        label: selected.textContent?.trim() || selected.value,
        inputLabel: selected.textContent?.trim() || selected.value,
        searchText: `${selected.textContent || ""} ${selected.dataset.search || ""}`
      });
    } else {
      autocomplete.clear();
    }
  };

  select.addEventListener("change", sync);
  const observer = new MutationObserver(() => {
    window.setTimeout(sync, 0);
  });
  observer.observe(select, { childList: true, subtree: true, attributes: true, attributeFilter: ["disabled"] });

  const controller = {
    input,
    autocomplete,
    sync,
    update(next = {}) {
      options = { ...options, ...next };
      input.placeholder = options.placeholder || input.placeholder;
      autocomplete.updateConfig({
        requireSelection: required || Boolean(options.requireSelection),
        validationMessage: options.validationMessage || "Selecciona una opción válida de la lista."
      });
    }
  };
  smartSelectControllers.set(select, controller);
  sync();
  return controller;
}

function refreshSearchableSelect(select) {
  smartSelectControllers.get(select)?.sync();
}

function focusSearchableSelect(select) {
  const controller = smartSelectControllers.get(select);
  (controller?.input || select)?.focus();
}

function collectSearchMoneyTerms(value, terms = []) {
  if (value == null) return terms;
  if (typeof value === "number" && Number.isFinite(value)) {
    const fixed = value.toFixed(2);
    terms.push(String(value), fixed, fixed.replace(".", ""), formatCurrency(value), formatCurrency(value).replace(/(?<=\d),(?=\d)/g, ""));
    return terms;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectSearchMoneyTerms(item, terms));
    return terms;
  }
  if (typeof value === "object") {
    Object.values(value).forEach((item) => collectSearchMoneyTerms(item, terms));
  }
  return terms;
}

function objectMatchesSearch(item, query) {
  if (!getSearchTerms(query).length) return true;
  const moneyTerms = collectSearchMoneyTerms(item).join(" ");
  const searchable = `${JSON.stringify(item || {})} ${moneyTerms}`;
  return matchesAllSearchTerms(searchable, query);
}


function toComparableDate(value) {
  if (!value) return "";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isWithinDateRange(value, from = "", to = "") {
  const date = toComparableDate(value);
  if (!from && !to) return true;
  if (!date) return false;
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
}

function uniqueSortedValues(values = []) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base", numeric: true })
  );
}

function syncFilterSelect(select, values = [], allLabel = "Todos", comparator = null) {
  if (!select) return;
  const current = select.value;
  const options = uniqueSortedValues(values);
  if (typeof comparator === "function") options.sort(comparator);
  select.innerHTML = `<option value="">${escapeHtml(allLabel)}</option>${options
    .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
    .join("")}`;
  if (options.includes(current)) select.value = current;
}

function getFilterLabel(select) {
  if (!select) return "";
  return select.selectedOptions?.[0]?.textContent?.trim() || select.value || "";
}

function getDownloadFilename(response, fallback) {
  const disposition = response.headers.get("content-disposition") || "";
  const match = disposition.match(/filename="?([^";]+)"?/i);
  return match?.[1] || fallback;
}

async function requestStructuredExport({ format = "xlsx", title, subtitle = "", filename, columns = [], rows = [], filters = [] }, button = null) {
  const originalText = button?.textContent || "";
  if (button) {
    button.disabled = true;
    button.textContent = "Generando...";
  }
  try {
    const exportColumns = columns.filter((column) => column.exportable !== false);
    const response = await fetch("/api/exports/render", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ format, title, subtitle, filename, columns: exportColumns, rows, filters })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "No se pudo generar la exportación.");
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = getDownloadFilename(response, `${filename || "reporte-dalvo"}.${format === "pdf" ? "pdf" : "xlsx"}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function formatExportDate(value) {
  return value ? toComparableDate(value) : "";
}

function getWeekKey(value) {
  const date = new Date(`${toComparableDate(value)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDayNumber = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNumber + 3);
  const week = 1 + Math.round((target - firstThursday) / 604800000);
  return `${target.getFullYear()}-S${String(week).padStart(2, "0")}`;
}

function getPeriodKey(value, groupBy = "detail") {
  const date = toComparableDate(value);
  if (!date) return "Sin fecha";
  if (groupBy === "day") return date;
  if (groupBy === "week") return getWeekKey(date);
  if (groupBy === "month") return date.slice(0, 7);
  return date;
}

function getCurrentRoleKey() {
  const username = String(currentUser?.username || "").toLowerCase();
  if (username === "superadmin") return "superadmin";
  return normalizeRoleKey(currentUser?.role || "");
}

function getAllowedModules() {
  const restrictExclusiveModules = (modules = []) =>
    modules.filter((moduleName) => moduleName !== "exportaciones" || canUseExports());
  if (isCurrentUserSuperAdmin()) return restrictExclusiveModules(ALL_MODULES);
  const permissions = getCurrentUserSpecialPermissions();
  if (permissions.includes("modulo:*")) {
    return restrictExclusiveModules(permissions.includes("modulo:comisiones") || permissions.includes("accion:generar-comisiones")
      ? ALL_MODULES
      : ALL_MODULES.filter((moduleName) => moduleName !== "comisiones"));
  }
  const customModules = permissions
    .filter((permission) => permission.startsWith("modulo:"))
    .map((permission) => permission.replace("modulo:", ""))
    .filter((moduleName) => MODULE_NAMES.has(moduleName));
  if (customModules.length) {
    return restrictExclusiveModules(["inicio", ...customModules.filter((moduleName) => moduleName !== "inicio")]);
  }
  return restrictExclusiveModules((ROLE_MODULES[getCurrentRoleKey()] || ["inicio"]).filter(
    (moduleName) => moduleName !== "comisiones" || permissions.includes("modulo:comisiones") || permissions.includes("accion:generar-comisiones")
  ));
}

function canAccessModule(moduleName) {
  if (moduleName === "inicio") return true;
  if (moduleName === "exportaciones") return canUseExports();
  if (moduleName === "comisiones") {
    const permissions = getCurrentUserSpecialPermissions();
    return isCurrentUserSuperAdmin() || permissions.includes("modulo:comisiones") || permissions.includes("accion:generar-comisiones");
  }
  return getAllowedModules().includes(moduleName);
}

function firstAllowedModule() {
  return getAllowedModules()[0] || "inicio";
}

function canDeleteRecords() {
  return isCurrentUserSuperAdmin() || hasSpecialPermission("botones:eliminar");
}

function canRegisterPayments() {
  return isCurrentUserSuperAdmin() || hasSpecialPermission("accion:pagar") || hasAnyBranchPermission("accion:pagar");
}

function canRegisterCollections() {
  return isCurrentUserSuperAdmin() || hasSpecialPermission("accion:facturar") || hasAnyBranchPermission("accion:facturar");
}

function canDeleteClientRecords() {
  return canDeleteRecords() || userHasRole("administracion");
}

function canDeletePaymentDocuments() {
  return canDeleteRecords() || userHasRole("compras", "administracion") || hasAnyBranchPermission("accion:eliminar-archivos");
}

function getCurrentUserSpecialPermissions() {
  const rawPermissions =
    currentUser?.permisosEspeciales ||
    currentUser?.specialPermissions ||
    currentUser?.permissions ||
    [];
  if (!Array.isArray(rawPermissions)) return [];
  return rawPermissions.map((permission) => normalizeSearchValue(permission));
}

function hasSpecialPermission(permissionName) {
  const permission = normalizeSearchValue(permissionName);
  return getCurrentUserSpecialPermissions().includes(permission);
}

function getCurrentUserBranchPermissionMap() {
  const source = currentUser?.permisosSucursal && typeof currentUser.permisosSucursal === "object"
    ? currentUser.permisosSucursal
    : {};
  return Object.fromEntries(
    Object.entries(source).map(([branchId, permissions]) => [
      Number(branchId || 0),
      Array.isArray(permissions) ? permissions.map((permission) => normalizeSearchValue(permission)) : []
    ])
  );
}

function hasAnyBranchPermission(permissionName) {
  const permission = normalizeSearchValue(permissionName);
  return Object.values(getCurrentUserBranchPermissionMap()).some((permissions) => permissions.includes(permission));
}

function canApproveRecords() {
  return isCurrentUserSuperAdmin() || hasSpecialPermission("botones:aprobar");
}

function canViewBudgetApprovalQueue() {
  return isCurrentUserSuperAdmin() || hasSpecialPermission("operacion:presupuesto:ver-pendientes-aprobacion");
}

function canEditOcgfHeader() {
  return isCurrentUserSuperAdmin() || hasSpecialPermission("operacion:ocgf:editar-cabecera");
}

function canManageUsers() {
  return isCurrentUserSuperAdmin();
}

function canManageCompanyLocations() {
  return isCurrentUserSuperAdmin() || userHasRole("administracion");
}

function canManageProjectOwnerAudit() {
  return isCurrentUserSuperAdmin() || userHasRole("administracion");
}

function canChooseBudgetOwner() {
  return isCurrentUserSuperAdmin() || userHasRole("administracion");
}

function canManageUserCredits() {
  return isCurrentUserSuperAdmin() || userHasRole("administracion");
}

function parseCurrency(value) {
  const normalized = String(value || "").replace(/[^0-9.]/g, "");
  const parts = normalized.split(".");
  const clean = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : normalized;
  return Number(clean || 0);
}

function parseSignedCurrency(value) {
  const raw = String(value || "").trim();
  const sign = raw.includes("-") ? -1 : 1;
  return parseCurrency(raw) * sign;
}

function compareValues(a, b) {
  const first = a ?? "";
  const second = b ?? "";
  const firstNumber = Number(first);
  const secondNumber = Number(second);

  if (!Number.isNaN(firstNumber) && !Number.isNaN(secondNumber)) {
    return firstNumber - secondNumber;
  }

  return String(first).localeCompare(String(second), "es", {
    numeric: true,
    sensitivity: "base"
  });
}

function extractFolioNumber(value) {
  const matches = String(value || "").match(/\d+/g);
  if (!matches || !matches.length) return -1;
  if (matches.length === 1) return Number(matches[0] || 0);
  const version = Number(matches[matches.length - 1] || 0);
  const base = Number(matches.slice(0, -1).join("") || 0);
  return base * 1000 + version;
}

function isFolioSortKey(key) {
  return ["folio", "dlv", "ocp", "ocgf"].includes(String(key || ""));
}

function sortByState(items, sortState, valueGetter) {
  if (!sortState.key) return [...items];
  const direction = sortState.direction === "desc" ? -1 : 1;
  return [...items].sort((a, b) => {
    const first = valueGetter(a, sortState.key);
    const second = valueGetter(b, sortState.key);
    const result = isFolioSortKey(sortState.key)
      ? compareValues(extractFolioNumber(first), extractFolioNumber(second)) || compareValues(first, second)
      : compareValues(first, second);
    return result * direction;
  });
}

function getRowFlagSortValue(scope, id) {
  return isRowFlagged(scope, id) ? 0 : 1;
}

function getRowFlagClass(scope, id) {
  return isRowFlagged(scope, id) ? "row-is-flagged" : "";
}

function getBudgetWorkflowPriority(budget = {}) {
  const state = normalizeSearchValue(budget.estado);
  const status = normalizeSearchValue(budget.estatus);
  if (status.includes("espera de aprobacion") && !status.includes("cotizacion")) return 0;
  if (status.includes("espera de aprobacion de cotizacion")) return 1;
  if (status.includes("cobrado pendiente")) return 2;
  if (status.includes("espera de po")) return 3;
  if (status.includes("espera de facturacion")) return 4;
  if (status.includes("espera de gr")) return 5;
  if (status.includes("espera de track")) return 6;
  if (status.includes("espera de comprobante")) return 7;
  if (status.includes("aprobado")) return 8;
  if (status.includes("cobrado") && status.includes("completa")) return 98;
  if (state.includes("cerrad")) return 99;
  return 20;
}

function isBudgetPendingApproval(budget = {}) {
  const status = normalizeSearchValue(budget.estatus);
  const state = normalizeSearchValue(budget.estado);
  return !state.includes("cerrad") && status.includes("espera de aprobacion");
}

function sortBudgetsForWorkflow(budgets = []) {
  if (budgetsSort.key) {
    return sortByState(budgets, budgetsSort, (budget, key) =>
      key === "__flagged" ? getRowFlagSortValue("budget", budget.id) : budget[key]
    );
  }
  return [...budgets].sort((a, b) => {
    const priority = getBudgetWorkflowPriority(a) - getBudgetWorkflowPriority(b);
    if (priority) return priority;
    return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
  });
}

function getPaginatedRows(key, rows) {
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(Number(paginationState[key] || 1), 1), totalPages);
  paginationState[key] = currentPage;
  const start = (currentPage - 1) * PAGE_SIZE;
  return rows.slice(start, start + PAGE_SIZE);
}

function renderPagination(container, key, totalRows, onChange) {
  const existing = document.querySelector(`[data-pagination-for="${key}"]`);
  if (existing) existing.remove();
  if (!container || totalRows <= PAGE_SIZE) return;

  const totalPages = Math.ceil(totalRows / PAGE_SIZE);
  const currentPage = Math.min(Math.max(Number(paginationState[key] || 1), 1), totalPages);
  const nav = document.createElement("nav");
  nav.className = "table-pagination";
  nav.dataset.paginationFor = key;
  nav.innerHTML = `
    <button type="button" data-page-action="prev" ${currentPage <= 1 ? "disabled" : ""}>Anterior</button>
    <span>Página ${currentPage} de ${totalPages}</span>
    <button type="button" data-page-action="next" ${currentPage >= totalPages ? "disabled" : ""}>Siguiente</button>
  `;
  nav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page-action]");
    if (!button) return;
    paginationState[key] = button.dataset.pageAction === "next" ? currentPage + 1 : currentPage - 1;
    onChange();
  });
  const tableShell = container.closest(".budgets-table-shell");
  (tableShell || container).insertAdjacentElement("afterend", nav);
}

function paginateRows(container, key, rows, onChange) {
  const paginatedRows = getPaginatedRows(key, rows);
  renderPagination(container, key, rows.length, onChange);
  return paginatedRows;
}

function splitGridColumnTracks(value = "") {
  const tracks = [];
  let current = "";
  let depth = 0;
  for (const character of String(value || "").trim()) {
    if (/\s/.test(character) && depth === 0) {
      if (current) tracks.push(current);
      current = "";
      continue;
    }
    if (character === "(") depth += 1;
    if (character === ")") depth = Math.max(0, depth - 1);
    current += character;
  }
  if (current) tracks.push(current);
  return tracks;
}

function getGridHiddenColumnSet(table) {
  if (!table?.id) return new Set();
  try {
    const stored = JSON.parse(localStorage.getItem(`dalvo:hidden-columns:${table.id}`) || "[]");
    return new Set((Array.isArray(stored) ? stored : []).map(Number).filter(Number.isInteger));
  } catch {
    return new Set();
  }
}

function getStoredGridColumnWidths(table, columnCount) {
  if (!table?.id) return [];
  try {
    const stored = JSON.parse(localStorage.getItem(`dalvo:grid-columns:${table.id}`) || "[]");
    if (!Array.isArray(stored) || stored.length !== columnCount) return [];
    const widths = stored.map(Number);
    return widths.every((width) => Number.isFinite(width) && width > 0) ? widths : [];
  } catch {
    return [];
  }
}

function getGridBaseColumns(table, columnCount) {
  const raw = String(table?.dataset?.gridBaseColumns || "").trim();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === columnCount) return parsed.map(String);
  } catch {
    const legacy = raw.split("|").filter(Boolean);
    if (legacy.length === columnCount) return legacy;
  }
  return [];
}

function setVisibleGridColumnWidths(table, fullWidths, hiddenColumns = getGridHiddenColumnSet(table)) {
  if (!table || !Array.isArray(fullWidths)) return;
  const visibleWidths = fullWidths
    .filter((_, index) => !hiddenColumns.has(index))
    .map((width) => (typeof width === "number" ? `${Math.round(width)}px` : String(width)));
  if (visibleWidths.length) table.style.setProperty("--grid-columns", visibleWidths.join(" "));
}

function setupInteractiveGridTable(table) {
  if (!table) return;
  const storageKey = table.id ? `dalvo:grid-columns:${table.id}` : "";
  table.querySelectorAll(".row-flag-th").forEach((header) => {
    if (!header.dataset.sortKey) header.dataset.sortKey = "__flagged";
    if (!header.querySelector(".sortable-column")) {
      header.innerHTML = `<button class="sortable-column" type="button">Marca</button>`;
    }
  });

  const columnCount = table.querySelectorAll(".grid-th").length;
  const savedColumns = getStoredGridColumnWidths(table, columnCount);
  if (savedColumns.length) {
    setVisibleGridColumnWidths(table, savedColumns);
  }

  table.addEventListener("click", (event) => {
    const button = event.target.closest(".sortable-column");
    if (!button) return;
    const headerCell = button.closest("[data-sort-key]");
    if (!headerCell) return;

    const key = headerCell.dataset.sortKey;
    const currentDirection = headerCell.dataset.sortDirection || "";
    const direction = currentDirection === "asc" ? "desc" : "asc";

    table.querySelectorAll("[data-sort-key]").forEach((cell) => {
      cell.dataset.sortDirection = cell === headerCell ? direction : "";
    });
    table.dispatchEvent(new CustomEvent("grid-sort", { detail: { key, direction } }));
  });

  table.addEventListener("pointerdown", (event) => {
    const handle = event.target.closest(".column-resizer");
    if (!handle) return;
    event.preventDefault();

    if (event.button !== 0) return;
    const headerCells = [...table.querySelectorAll(".grid-th")];
    const headerCell = handle.closest(".grid-th");
    const columnIndex = headerCells.indexOf(headerCell);
    if (columnIndex < 0) return;

    const startX = event.clientX;
    const hiddenColumns = getGridHiddenColumnSet(table);
    const storedWidths = getStoredGridColumnWidths(table, headerCells.length);
    const baseWidths = getGridColumnWidths(table, headerCells.length);
    const widths = storedWidths.length
      ? [...storedWidths]
      : headerCells.map((cell, index) => {
          const renderedWidth = Math.round(cell.getBoundingClientRect().width);
          if (!hiddenColumns.has(index) && renderedWidth > 0) return renderedWidth;
          const pixelValue = Number.parseFloat(String(baseWidths[index] || "").match(/\d+(?:\.\d+)?/)?.[0] || "");
          return Number.isFinite(pixelValue) && pixelValue > 0 ? pixelValue : 120;
        });
    let activeWidths = [...widths];
    try {
      handle.setPointerCapture(event.pointerId);
    } catch {
      // El seguimiento en window conserva el arrastre aunque el puntero salga del separador.
    }
    table.classList.add("is-resizing");

    const setWidths = (nextWidths) => {
      activeWidths = nextWidths;
      setVisibleGridColumnWidths(table, nextWidths, hiddenColumns);
    };

    const onMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      const nextWidths = [...widths];
      nextWidths[columnIndex] = Math.max(88, widths[columnIndex] + delta);
      setWidths(nextWidths);
    };

    const onUp = () => {
      table.classList.remove("is-resizing");
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(activeWidths));
      }
      table.dataset.gridBaseColumns = JSON.stringify(activeWidths.map((width) => `${Math.round(width)}px`));
      try {
        if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
      } catch {
        // El puntero puede haberse liberado fuera de la ventana.
      }
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
    window.addEventListener("pointercancel", onUp, { once: true });
    window.addEventListener("blur", onUp, { once: true });
  });
}

function getGridColumnWidths(table, columnCount) {
  const stored = getStoredGridColumnWidths(table, columnCount);
  if (stored.length) return stored.map((width) => `${width}px`);
  const baseColumns = getGridBaseColumns(table, columnCount);
  if (baseColumns.length) return baseColumns;
  const inline = table.style.getPropertyValue("--grid-columns").trim();
  const inlineColumns = splitGridColumnTracks(inline);
  if (inlineColumns.length === columnCount) return inlineColumns;
  const defaults = {
    purchasePendingTable: "54px 150px 110px 110px 240px 260px 170px 120px 132px",
    purchaseCreatedTable: "54px 150px 110px 120px 180px 240px 130px 132px 130px 170px",
    purchaseFixedExpenseTable: "54px 150px 96px 130px 190px 260px 128px 132px 150px 150px 150px 110px 76px",
    accountsPayablePendingCashTable: "54px 130px 170px 110px 120px 110px 150px 220px 140px 180px 96px 120px 108px 118px 110px",
    accountsPayablePendingTable: "54px 130px 170px 110px 120px 110px 150px 220px 140px 180px 96px 120px 108px 118px 110px",
    accountsPayablePaidCashTable: "54px 130px 170px 110px 120px 110px 150px 220px 140px 180px 96px 120px 108px 118px 110px",
    accountsPayablePaidTable: "54px 130px 170px 110px 120px 110px 150px 220px 140px 180px 96px 120px 108px 118px 110px",
    accountsPayableOcgfPendingCashTable: "54px 190px 120px 130px 130px 180px 96px 120px 108px 118px 150px 150px 110px",
    accountsPayableOcgfPendingTable: "54px 190px 120px 130px 130px 180px 96px 120px 108px 118px 150px 150px 110px",
    accountsPayableOcgfPaidCashTable: "54px 190px 120px 130px 130px 180px 96px 120px 108px 118px 150px 150px 110px",
    accountsPayableOcgfPaidTable: "54px 190px 120px 130px 130px 180px 96px 120px 108px 118px 150px 150px 110px",
    accountsPayableCommissionPendingTable: "54px 190px 130px 120px 150px 220px 130px 180px 108px 118px 110px",
    accountsPayableCommissionPaidTable: "54px 190px 130px 120px 150px 220px 130px 180px 108px 118px 110px"
  };
  return splitGridColumnTracks(defaults[table.id] || "");
}

function applyVisibleColumns(table) {
  if (!table) return;
  const hidden = getGridHiddenColumnSet(table);
  const headerCells = [...table.querySelectorAll(".purchase-table-head > span, .budgets-table-head > span")];
  const rows = [...table.querySelectorAll(".purchase-table-row, .budget-table-row")];
  const fullWidths = getGridColumnWidths(table, headerCells.length);
  if (fullWidths.length === headerCells.length) setVisibleGridColumnWidths(table, fullWidths, hidden);

  headerCells.forEach((cell, index) => {
    cell.classList.toggle("is-column-hidden", hidden.has(index));
  });
  rows.forEach((row) => {
    if (row.classList.contains("purchase-table-empty") || row.classList.contains("budget-table-empty")) return;
    [...row.children].forEach((cell, index) => {
      cell.classList.toggle("is-column-hidden", hidden.has(index));
    });
  });
}

function setupColumnChooser(table) {
  if (!table?.id) return;
  const shell = table.closest(".budgets-table-shell");
  if (!shell || shell.previousElementSibling?.dataset?.columnsToolbarFor === table.id) {
    applyVisibleColumns(table);
    return;
  }

  const headerCells = [...table.querySelectorAll(".purchase-table-head > span, .budgets-table-head > span")];
  if (!headerCells.length) return;
  if (!table.dataset.gridBaseColumns) {
    table.dataset.gridBaseColumns = JSON.stringify(getGridColumnWidths(table, headerCells.length));
  }

  const toolbar = document.createElement("div");
  toolbar.className = "columns-toolbar";
  toolbar.dataset.columnsToolbarFor = table.id;
  toolbar.innerHTML = `
    <button class="columns-button" type="button">Columnas</button>
    <div class="columns-menu hidden">
      ${headerCells
        .map((cell, index) => {
          const label = cell.textContent.trim() || `Columna ${index + 1}`;
          return `
            <label>
              <input type="checkbox" value="${index}" checked />
              <span>${escapeHtml(label)}</span>
            </label>
          `;
        })
        .join("")}
    </div>
  `;
  if (table.id === "purchasePendingTable" && purchaseCreateOcpButton) {
    toolbar.insertBefore(purchaseCreateOcpButton, toolbar.firstElementChild);
  }
  shell.insertAdjacentElement("beforebegin", toolbar);

  const menu = toolbar.querySelector(".columns-menu");
  const button = toolbar.querySelector(".columns-button");
  const inputs = [...toolbar.querySelectorAll('input[type="checkbox"]')];
  let storedHiddenColumns = [];
  try {
    storedHiddenColumns = JSON.parse(localStorage.getItem(`dalvo:hidden-columns:${table.id}`) || "[]");
  } catch {
    storedHiddenColumns = [];
  }
  const storedHidden = new Set(storedHiddenColumns.map(Number));
  inputs.forEach((input) => {
    input.checked = !storedHidden.has(Number(input.value));
  });
  applyVisibleColumns(table);

  button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
  toolbar.addEventListener("change", () => {
    const hidden = inputs.filter((input) => !input.checked).map((input) => Number(input.value));
    localStorage.setItem(`dalvo:hidden-columns:${table.id}`, JSON.stringify(hidden));
    applyVisibleColumns(table);
  });
  document.addEventListener("click", (event) => {
    if (!toolbar.contains(event.target)) menu.classList.add("hidden");
  });
}

function getCurrentUserStorageKey() {
  return String(currentUser?.id || currentUser?.username || currentUser?.name || "anonimo")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function getRowFlags() {
  try {
    return JSON.parse(localStorage.getItem(ROW_FLAGS_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveRowFlags(flags) {
  localStorage.setItem(ROW_FLAGS_STORAGE_KEY, JSON.stringify(flags || {}));
}

function getRowFlagKey(scope, id) {
  return `${getCurrentUserStorageKey()}:${scope}:${id}`;
}

function isRowFlagged(scope, id) {
  if (!scope || !id) return false;
  return Boolean(getRowFlags()[getRowFlagKey(scope, id)]);
}

function setRowFlag(scope, id, flagged) {
  if (!scope || !id) return;
  const flags = getRowFlags();
  const key = getRowFlagKey(scope, id);
  if (flagged) flags[key] = true;
  else delete flags[key];
  saveRowFlags(flags);
}

function handleRowFlagToggle(event) {
  const button = event.target.closest?.("[data-row-flag-toggle]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  const scope = button.dataset.rowFlagScope || "";
  const id = button.dataset.rowFlagId || "";
  const active = !isRowFlagged(scope, id);
  setRowFlag(scope, id, active);
  button.classList.toggle("is-active", active);
  button.closest(".budget-table-row, .purchase-table-row")?.classList.toggle("row-is-flagged", active);
  button.setAttribute("aria-pressed", active ? "true" : "false");
  const label = active ? "Quitar marca de seguimiento" : "Marcar para seguimiento";
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
}

function renderRowFlag(scope, id) {
  const active = isRowFlagged(scope, id);
  const label = active ? "Quitar marca de seguimiento" : "Marcar para seguimiento";
  return `
    <span class="row-flag-cell">
      <button class="row-flag-button${active ? " is-active" : ""}" type="button"
        data-row-flag-toggle data-row-flag-scope="${escapeHtml(scope)}" data-row-flag-id="${escapeHtml(id)}"
        aria-pressed="${active ? "true" : "false"}" aria-label="${label}" title="${label}">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 21V4h10l-1.5 4L16 12H6"></path>
        </svg>
      </button>
    </span>
  `;
}

function getReadAlertKey(scope, id, updatedAt = "") {
  return `dalvo:alert-read:${getCurrentUserStorageKey()}:${scope}:${id}:${updatedAt || "sin-fecha"}`;
}

function getAlertBaselineKey(scope) {
  return `dalvo:alert-baseline:v1:${getCurrentUserStorageKey()}:${scope}`;
}

function hasAlertBaseline(scope) {
  return localStorage.getItem(getAlertBaselineKey(scope)) === "1";
}

function markAlertBaseline(scope) {
  localStorage.setItem(getAlertBaselineKey(scope), "1");
}

function isAlertRead(scope, id, updatedAt = "") {
  return localStorage.getItem(getReadAlertKey(scope, id, updatedAt)) === "1";
}

function markAlertRead(scope, id, updatedAt = "") {
  localStorage.setItem(getReadAlertKey(scope, id, updatedAt), "1");
}

function ensureAlertBaseline(scope, items = [], getId = (item) => item?.id, shouldAlert = () => true) {
  if (!scope || hasAlertBaseline(scope)) return;
  (items || []).forEach((item) => {
    const id = getId(item);
    if (id && shouldAlert(item)) markAlertRead(scope, id, item.updatedAt || "");
  });
  markAlertBaseline(scope);
}

function userHasRole(...roles) {
  const role = getCurrentRoleKey();
  return roles.includes(role);
}

function isAdministrationUser() {
  return userHasRole("administracion");
}

function canManageClientPo() {
  return isCurrentUserSuperAdmin() || userHasRole("administracion", "compras");
}

function canReceiveApprovalAlerts() {
  return canApproveRecords();
}

function isCurrentUserOwner(item = {}) {
  const owner = normalizeRoleKey(item.owner || item.ownerNombre || "");
  const currentName = normalizeRoleKey(currentUser?.name || "");
  const currentUsername = normalizeRoleKey(currentUser?.username || "");
  if (!owner) return true;
  return owner === currentName || owner === currentUsername;
}

function shouldAlertBudget(budget) {
  const status = normalizeRoleKey(budget?.estatus || "");
  if (isBudgetPendingInitialApproval(budget)) return canReceiveApprovalAlerts();
  if (status === "en espera de aprobacion de cotizacion") return canReceiveApprovalAlerts();
  if (status === "aprobado") return userHasRole("supervisor") && isCurrentUserOwner(budget);
  return false;
}

function isBudgetPendingInitialApproval(budget) {
  const status = normalizeRoleKey(budget?.estatus || "");
  return status === "en espera de aprobacion";
}

function shouldAlertPurchasePending() {
  return !canReceiveApprovalAlerts() && userHasRole("compras", "administracion");
}

function shouldAlertPurchaseCreated(item) {
  const status = normalizeRoleKey(item?.estatus || "");
  if (status.includes("pendiente") && status.includes("aprob")) return canReceiveApprovalAlerts();
  if (status.includes("aprobada")) return !canReceiveApprovalAlerts() && userHasRole("compras", "administracion");
  return false;
}

function shouldAlertFixedExpensePurchase(item) {
  const pendingApprovals = Number(item?.approvalPending || item?.aprobacionesPendientes || 0);
  if (pendingApprovals > 0) return canReceiveApprovalAlerts();
  const status = normalizeRoleKey(item?.estado || "");
  if (status.includes("aprob")) return !canReceiveApprovalAlerts() && userHasRole("compras", "administracion");
  return false;
}

function shouldAlertAccountsReceivable(item) {
  if (isCurrentUserSuperAdmin()) return false;
  return normalizeRoleKey(item?.pendiente || "").includes("cargar") && userHasRole("compras", "administracion");
}

function shouldAlertAccountsPayable(item) {
  const pending = normalizeRoleKey(item?.pendiente || "");
  const state = normalizeRoleKey(`${item?.estado || ""} ${item?.estatus || ""}`);
  if (isCurrentUserSuperAdmin()) {
    if (item?.source === "OCGF" && !item?.pagado && state.includes("aprob")) return true;
    return pending.includes("comprobante") || state.includes("factura cargada") || state.includes("track id cargado");
  }
  return pending.includes("cargar") && userHasRole("compras", "administracion");
}

function getPaymentRowClass(item = {}) {
  const paymentStatus = normalizeRoleKey(item.estatusPago || item.estatus_pago || "");
  const paid = paymentStatus === "pagada" || Boolean(item.pagado) || normalizeRoleKey(item.estado).includes("pago completo") || normalizeRoleKey(item.pendiente).includes("sin pendiente");
  if (paid) return "row-state-paid";
  if (paymentStatus.includes("pago parcial")) return "row-state-docs";
  const status = normalizeRoleKey(`${item.estado || ""} ${item.pendiente || ""}`);
  if (status.includes("cargar factura proveedor") || status.includes("creacion de factura")) {
    return "row-state-waiting";
  }
  if (status.includes("factura") || status.includes("comprobante") || status.includes("complemento") || status.includes("gr ") || status.includes("track")) {
    return "row-state-docs";
  }
  return "row-state-waiting";
}

function getBudgetRowStateClass(budget = {}) {
  const state = normalizeSearchValue(budget.estado);
  const status = normalizeSearchValue(budget.estatus);
  if (state.includes("cerrad") || (status.includes("cobrado") && status.includes("completa"))) {
    return "row-state-paid";
  }
  if (status.includes("cobrado pendiente")) return "row-state-docs";
  if (status.includes("espera")) return "row-state-waiting";
  return "";
}

function getFixedExpenseStateClass(item = {}) {
  const state = normalizeSearchValue(`${item.estadoRegistro || ""} ${item.estado || ""} ${item.estatus || ""}`);
  if (state.includes("finaliz") || state.includes("suspend") || state.includes("cancel")) return "row-state-docs";
  if (state.includes("ocgf pagada") || state.includes("po pagada")) return "row-state-paid";
  if (state.includes("factura") || state.includes("comprobante") || state.includes("complemento")) return "row-state-docs";
  if (state.includes("activo") || state.includes("generada") || state.includes("pendiente") || state.includes("aprob")) return "row-state-waiting";
  return "";
}

function getPurchaseCreatedRowClass(item = {}) {
  const status = normalizeSearchValue(item.estatus || "");
  if (status.includes("aprobada")) return "";
  if (status.includes("cancelada")) return "row-state-docs";
  if (status.includes("pendiente") || status.includes("crear")) return "row-state-waiting";
  return "";
}

function isBranchValue(value = "") {
  const normalized = normalizeSearchValue(value);
  return ["slp", "san luis potosi", "san luis potosí", "queretaro", "querétaro", "celaya"].includes(normalized);
}

function getBudgetDisplayFields(budget = {}) {
  const branchLooksLikeClient = !budget.sucursal && isBranchValue(budget.clienteUsuario);
  return {
    sucursal: branchLooksLikeClient ? budget.clienteUsuario : budget.sucursal || "",
    clienteUsuario: branchLooksLikeClient ? "" : budget.clienteUsuario || ""
  };
}

function canShowClientQuoteFlow(budget = {}) {
  const status = normalizeSearchValue(budget.estatus);
  const state = normalizeSearchValue(budget.estado);
  if (state.includes("cerrad")) return true;
  if (status.includes("no aprobado")) return false;
  return (
    status === "aprobado" ||
    status.includes("cotizacion") ||
    status.includes("po") ||
    status.includes("facturacion") ||
    status.includes("comprobante") ||
    status.includes("documentacion") ||
    status.includes("cobrado")
  );
}

function getAlertClass(scope, id, updatedAt, shouldAlert) {
  if (!hasAlertBaseline(scope)) {
    if (scope && id && shouldAlert) markAlertRead(scope, id, updatedAt);
    return "";
  }
  return shouldAlert && !isAlertRead(scope, id, updatedAt) ? " row-alert" : "";
}

function getRowClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

function markRowAlertRead(row, fallbackId = "") {
  if (!row?.classList?.contains("row-alert")) return;
  const scope = row.dataset.alertScope || "";
  const id = row.dataset.alertId || fallbackId || row.dataset.budgetId || row.dataset.purchaseBudgetId || row.dataset.accountsReceivableQuoteId || row.dataset.accountsPayableOrderId || row.dataset.accountsPayableOcgfOrderId || "";
  const updatedAt = row.dataset.alertUpdatedAt || "";
  if (scope && id) {
    markAlertRead(scope, id, updatedAt);
    row.classList.remove("row-alert");
  }
}

function setNavBadge(moduleName, count = 0) {
  const items = document.querySelectorAll(`.nav-item[data-module="${moduleName}"]`);
  if (!items.length) return;
  items.forEach((item) => {
    let badge = item.querySelector(".nav-badge");
    if (!count || !canAccessModule(moduleName)) {
      badge?.remove();
      return;
    }
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "nav-badge";
      item.appendChild(badge);
    }
    badge.textContent = count > 99 ? "99+" : String(count);
  });
}

function countUnreadAlerts(items, scope, getId, shouldAlert) {
  ensureAlertBaseline(scope, items, getId, shouldAlert);
  return (items || []).filter((item) => {
    const id = getId(item);
    return id && shouldAlert(item) && !isAlertRead(scope, id, item.updatedAt || "");
  }).length;
}

function updateNavigationBadges({
  budgets = [],
  receivable = [],
  payable = [],
  payableOcgf = [],
  payableCommissions = [],
  tasks = [],
  purchases = {},
  fixedExpenses = []
} = {}) {
  const createdPurchases = purchases.created || [];
  const pendingPurchases = purchases.pending || [];
  setNavBadge("presupuesto", countUnreadAlerts(budgets, "budget", (item) => item.id, shouldAlertBudget));
  setNavBadge(
    "compras",
    countUnreadAlerts(pendingPurchases, "purchasePending", (item) => item.budgetId, shouldAlertPurchasePending) +
      countUnreadAlerts(createdPurchases, "purchaseCreated", (item) => item.orderId || item.budgetId, shouldAlertPurchaseCreated) +
      countUnreadAlerts(fixedExpenses, "purchaseFixedExpense", (item) => item.id, shouldAlertFixedExpensePurchase)
  );
  setNavBadge("cuentas-cobrar", countUnreadAlerts(receivable, "accountsReceivable", (item) => item.quoteId, shouldAlertAccountsReceivable));
  setNavBadge(
    "cuentas-pagar",
    countUnreadAlerts(payable, "accountsPayable", (item) => item.orderId, shouldAlertAccountsPayable) +
      countUnreadAlerts(payableOcgf, "accountsPayableOcgf", (item) => item.orderId, shouldAlertAccountsPayable) +
      countUnreadAlerts(payableCommissions, "accountsPayableCommission", (item) => item.orderId, shouldAlertAccountsPayable)
  );
  setNavBadge("tareas", tasks.filter(shouldAlertTask).length);
}

function isAnyOverlayOpen() {
  return Boolean(
    document.querySelector(
      ".modal:not(.hidden), .quick-actions-overlay:not(.hidden), .module-launcher:not(.hidden), .global-results:not(.hidden)"
    )
  );
}

function isEditingElement(element = document.activeElement) {
  if (!element) return false;
  return Boolean(element.closest("input, textarea, select, [contenteditable='true'], form"));
}

function isDetailViewOpen() {
  return [
    budgetDetailView,
    purchaseDetailView,
    purchaseFixedExpenseDetailView,
    accountsReceivableDetailView,
    accountsReceivableBatchSelectView,
    accountsReceivableBatchReviewView,
    accountsPayableDetailView,
    accountsPayableCommissionBatchSelectView,
    accountsPayableCommissionBatchReviewView,
    commissionsDetailView,
    userCreditDetailView
  ].some((view) => view && !view.classList.contains("hidden"));
}

function canAutoRefreshVisibleList() {
  if (!currentUser || document.hidden || isAnyOverlayOpen() || isEditingElement()) return false;
  return !isDetailViewOpen();
}

async function refreshActiveListModule() {
  if (!canAutoRefreshVisibleList()) return;

  const refreshers = {
    inicio: loadHomeModule,
    usuarios: loadUsersModule,
    prestamos: loadUserCreditsModule,
    sucursales: loadClientsModule,
    empresas: loadClientsModule,
    clientes: loadClientsModule,
    proveedores: loadProvidersModule,
    "lista-precios": loadPriceListModule,
    "gastos-fijos": loadFixedExpensesModule,
    presupuesto: loadBudgetsModule,
    compras: loadPurchasesModule,
    "cuentas-cobrar": loadAccountsReceivableModule,
    "cuentas-pagar": loadAccountsPayableModule,
    comisiones: loadCommissionsModule,
    tareas: loadTasksModule
  };
  const refresh = refreshers[currentModuleName];
  if (refresh && canAccessModule(currentModuleName)) await refresh();
}

async function refreshNavigationBadges() {
  if (!currentUser) return;
  try {
    const [summaryData, budgetsData, purchasesData, fixedExpensesData, tasksData] = await Promise.all([
      api("/api/dashboard/summary"),
      api("/api/budgets?search="),
      canAccessModule("compras") ? api("/api/purchases?search=") : Promise.resolve({ pending: [], created: [] }),
      canAccessModule("compras") ? api("/api/purchases/fixed-expenses?search=") : Promise.resolve({ expenses: [] }),
      canAccessModule("tareas") ? api("/api/tasks?search=") : Promise.resolve({ tasks: [] })
    ]);
    updateNavigationBadges({
      budgets: budgetsData.budgets || [],
      receivable: summaryData.receivable || [],
      payable: summaryData.payable?.accounts || [],
      payableOcgf: summaryData.payable?.ocgfAccounts || [],
      payableCommissions: summaryData.payable?.commissionAccounts || [],
      tasks: tasksData.tasks || [],
      purchases: purchasesData || { pending: [], created: [] },
      fixedExpenses: fixedExpensesData.expenses || []
    });
  } catch (_error) {
    updateNavigationBadges();
  }
}

async function autoRefreshTick() {
  if (!currentUser || autoRefreshInFlight) return;
  autoRefreshInFlight = true;
  try {
    await refreshNavigationBadges();
    await refreshActiveListModule();
  } catch (error) {
    console.warn("[auto-refresh]", error.message);
  } finally {
    autoRefreshInFlight = false;
  }
}

function showApp(user, options = {}) {
  currentUser = user || null;
  sessionName.textContent = user?.name || "Usuario Dalvo";
  sessionRole.textContent = user?.role || "Operaciones";
  applyRoleVisibility();
  initializeSidebarState();
  loginView.classList.add("hidden");
  appView.classList.remove("hidden");
  restoreAppLocation();
  refreshNavigationBadges();
  if (options.greet) {
  }
}

function applyTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark-mode", dark);
  if (topbarLogo) {
    topbarLogo.src = dark ? LOGO_DARK_SRC : LOGO_LIGHT_SRC;
  }
  if (themeToggleButton) {
    themeToggleButton.textContent = dark ? "☀" : "☾";
    themeToggleButton.setAttribute("aria-label", dark ? "Activar modo claro" : "Activar modo oscuro");
    themeToggleButton.setAttribute("aria-pressed", dark ? "true" : "false");
  }
}

function loadThemePreference() {
  if (localStorage.getItem("dalvo:theme-design") !== THEME_DESIGN_VERSION) {
    localStorage.setItem("dalvo:theme", "dark");
    localStorage.setItem("dalvo:theme-design", THEME_DESIGN_VERSION);
  }
  applyTheme(localStorage.getItem("dalvo:theme") || "dark");
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
  localStorage.setItem("dalvo:theme", nextTheme);
  applyTheme(nextTheme);
}

function filterQuickCreateActions(query = "") {
  const normalized = normalizeSearchValue(query);
  quickCreateList?.querySelectorAll("button").forEach((button) => {
    const haystack = normalizeSearchValue(`${button.textContent} ${button.dataset.search || ""}`);
    const allowed = canAccessModule(button.dataset.quickModule);
    button.classList.toggle("hidden", !allowed || (Boolean(normalized) && !haystack.includes(normalized)));
  });
}

function openQuickCreate() {
  quickCreateOverlay?.classList.remove("hidden");
  quickCreateSearch.value = "";
  filterQuickCreateActions("");
  setTimeout(() => quickCreateSearch?.focus(), 0);
}

function closeQuickCreate() {
  quickCreateOverlay?.classList.add("hidden");
}

function openAssistant() {
  assistantOverlay?.classList.remove("hidden");
  setTimeout(() => assistantQuestion?.focus(), 0);
}

function closeAssistant() {
  assistantOverlay?.classList.add("hidden");
}

function speakAssistantAnswer(text) {
  if (!("speechSynthesis" in window) || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-MX";
  utterance.rate = 0.96;
  window.speechSynthesis.speak(utterance);
}

async function askDalvoAssistant(question) {
  const cleanQuestion = String(question || "").trim();
  if (!cleanQuestion) return;
  assistantResponse.textContent = "Consultando datos del sistema...";
  try {
    const data = await api("/api/assistant/query", {
      method: "POST",
      body: JSON.stringify({ question: cleanQuestion })
    });
    assistantResponse.textContent = data.answer || "No encontré una respuesta para esa pregunta.";
    speakAssistantAnswer(assistantResponse.textContent);
  } catch (error) {
    assistantResponse.textContent = error.message || "No pude consultar el asistente.";
  }
}

async function getAssistantMicrophonePermissionState() {
  if (!navigator.permissions?.query) return "unknown";
  try {
    const permission = await navigator.permissions.query({ name: "microphone" });
    return permission?.state || "unknown";
  } catch {
    return "unknown";
  }
}

async function requestAssistantMicrophonePermission() {
  const permissionState = await getAssistantMicrophonePermissionState();
  if (permissionState === "denied") {
    assistantResponse.textContent =
      "El micrófono está bloqueado para este sitio. Actívalo desde el candado de la barra de direcciones y, si Chrome lo pide, recarga la página.";
    return false;
  }
  if (permissionState === "granted") return true;
  if (!navigator.mediaDevices?.getUserMedia) return true;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch (error) {
    const nextPermissionState = await getAssistantMicrophonePermissionState();
    const denied = ["NotAllowedError", "PermissionDeniedError"].includes(error?.name);
    assistantResponse.textContent = denied
      ? nextPermissionState === "granted"
        ? "Chrome ya tiene el micrófono permitido, pero necesita recargar la página para aplicarlo. Da clic en Volver a cargar e intenta de nuevo."
        : "El navegador tiene bloqueado el micrófono para este sitio. Actívalo desde el candado de la barra de direcciones y vuelve a intentarlo."
      : "No pude acceder al micrófono. Revisa que esté conectado y disponible.";
    return false;
  }
}

function resetAssistantVoiceButton() {
  if (!assistantVoiceButton) return;
  assistantVoiceButton.disabled = false;
  assistantVoiceButton.classList.remove("is-listening");
  assistantVoiceButton.setAttribute("aria-label", "Dictar pregunta");
  assistantVoiceButton.setAttribute("title", "Dictar pregunta");
}

function startAssistantVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSecureOrigin =
    window.isSecureContext || ["localhost", "127.0.0.1"].includes(window.location.hostname);
  if (!isSecureOrigin) {
    assistantResponse.textContent =
      "El dictado por voz necesita HTTPS o localhost para activar el micrófono. Puedes escribir la pregunta mientras tanto.";
    return;
  }
  if (!SpeechRecognition) {
    assistantResponse.textContent =
      "Este navegador no permite dictado por voz aquí. Prueba con Chrome o Edge, o escribe la pregunta.";
    return;
  }
  if (assistantVoiceButton) {
    assistantVoiceButton.disabled = true;
    assistantVoiceButton.classList.add("is-listening");
    assistantVoiceButton.setAttribute("aria-label", "Escuchando");
    assistantVoiceButton.setAttribute("title", "Escuchando");
  }
  const recognition = new SpeechRecognition();
  recognition.lang = "es-MX";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  let heardResult = false;
  assistantResponse.textContent = "Activando micrófono... Si el navegador pide permiso, selecciona Permitir.";
  recognition.onstart = () => {
    assistantResponse.textContent = "Te escucho...";
  };
  recognition.onresult = (event) => {
    const text = event.results?.[0]?.[0]?.transcript || "";
    heardResult = Boolean(text);
    assistantQuestion.value = text;
    askDalvoAssistant(text);
  };
  recognition.onerror = (event) => {
    const messages = {
      "not-allowed": "El navegador bloqueó el dictado. Revisa que el micrófono esté permitido desde el candado de la barra y recarga la página si Chrome lo solicita.",
      "service-not-allowed": "El servicio de dictado está bloqueado en este navegador o dominio.",
      "audio-capture": "No detecté un micrófono disponible en este equipo.",
      network: "No pude conectar con el servicio de dictado del navegador.",
      "no-speech": "No alcancé a escuchar la pregunta. Intenta de nuevo hablando un poco más cerca."
    };
    assistantResponse.textContent =
      messages[event.error] || "No pude escuchar bien. Intenta de nuevo o escribe tu pregunta.";
    if (event.error === "not-allowed") {
      requestAssistantMicrophonePermission().then((allowed) => {
        if (allowed) {
          assistantResponse.textContent =
            "El permiso del micrófono ya está listo. Da clic otra vez en el micrófono para empezar a hablar.";
        }
      });
    }
  };
  recognition.onend = () => {
    if (!heardResult && assistantResponse.textContent === "Te escucho...") {
      assistantResponse.textContent = "No alcancé a escuchar nada. Intenta de nuevo o escribe la pregunta.";
    }
    resetAssistantVoiceButton();
  };
  try {
    recognition.start();
  } catch {
    resetAssistantVoiceButton();
    assistantResponse.textContent = "No pude iniciar el micrófono. Intenta de nuevo o escribe la pregunta.";
  }
}

function runQuickCreateAction(button) {
  const moduleName = button?.dataset.quickModule;
  if (!moduleName) return;
  closeQuickCreate();
  setActiveModule(moduleName);
  if (button.dataset.quickAction === "new-budget") {
    setTimeout(() => openBudgetModal(), 120);
  }
  if (button.dataset.quickAction === "new-task") {
    setTimeout(() => {
      resetTaskForm();
      taskForm?.scrollIntoView({ behavior: "smooth", block: "start" });
      taskForm?.titulo?.focus();
    }, 120);
  }
}

function showLogin() {
  currentUser = null;
  sessionStorage.removeItem(APP_LOCATION_KEY);
  appView.classList.add("hidden");
  loginView.classList.remove("hidden");
}

function normalizeAppLocation(location = {}) {
  const moduleName = String(location.module || "").trim();
  if (!MODULE_NAMES.has(moduleName) || !canAccessModule(moduleName)) return null;
  return {
    module: moduleName,
    view: location.view || "list",
    id: location.id ?? null,
    source: location.source || null
  };
}

function appLocationsMatch(left = {}, right = {}) {
  return (
    left.module === right.module &&
    (left.view || "list") === (right.view || "list") &&
    String(left.id ?? "") === String(right.id ?? "") &&
    String(left.source ?? "") === String(right.source ?? "")
  );
}

function buildAppLocationHash(location = {}) {
  const safeLocation = normalizeAppLocation(location);
  if (!safeLocation) return window.location.hash || "";
  const parts = [safeLocation.module];
  if (safeLocation.view && safeLocation.view !== "list") parts.push(safeLocation.view);
  if (safeLocation.id !== null && safeLocation.id !== undefined) parts.push(String(safeLocation.id));
  if (safeLocation.source) parts.push(String(safeLocation.source));
  return `#/${parts.map((part) => encodeURIComponent(part)).join("/")}`;
}

function readAppLocationFromUrl() {
  const rawHash = window.location.hash || "";
  if (!rawHash.startsWith("#/")) return null;
  const parts = rawHash
    .slice(2)
    .split("/")
    .filter(Boolean)
    .map((part) => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part;
      }
    });
  if (!parts.length) return null;
  return normalizeAppLocation({
    module: parts[0],
    view: parts[1] || "list",
    id: parts[2] || null,
    source: parts[3] || null
  });
}

function writeAppHistory(location, options = {}) {
  const safeLocation = normalizeAppLocation(location);
  if (!safeLocation || isApplyingHistoryState) return;
  const currentStateLocation = window.history.state?.dalvoLocation;
  const shouldReplace = options.replace === true || !window.history.state?.dalvoApp;
  if (!shouldReplace && currentStateLocation && appLocationsMatch(currentStateLocation, safeLocation)) return;
  const nextUrl = `${window.location.pathname}${window.location.search}${buildAppLocationHash(safeLocation)}`;
  const nextState = { dalvoApp: true, dalvoLocation: safeLocation };
  if (shouldReplace) {
    window.history.replaceState(nextState, "", nextUrl);
  } else {
    window.history.pushState(nextState, "", nextUrl);
  }
}

function saveAppLocation(location, options = {}) {
  const safeLocation = normalizeAppLocation(location);
  if (!safeLocation) return;
  sessionStorage.setItem(
    APP_LOCATION_KEY,
    JSON.stringify(safeLocation)
  );
  if (options.history !== false) {
    writeAppHistory(safeLocation, { replace: options.replace === true });
  }
}

function readAppLocation() {
  const urlLocation = readAppLocationFromUrl();
  if (urlLocation) return urlLocation;
  try {
    const location = JSON.parse(sessionStorage.getItem(APP_LOCATION_KEY) || "{}");
    return normalizeAppLocation(location);
  } catch {
    sessionStorage.removeItem(APP_LOCATION_KEY);
    return null;
  }
}

function saveModuleLocation(moduleName, options = {}) {
  saveAppLocation({ module: moduleName, view: "list" }, options);
}

function saveDetailLocation(moduleName, view, id = null, source = null, options = {}) {
  saveAppLocation({ module: moduleName, view, id, source }, options);
}

async function applyAppLocation(location, options = {}) {
  if (!location || !canAccessModule(location.module)) {
    setActiveModule(firstAllowedModule(), { persist: false });
    return { module: firstAllowedModule(), view: "list", id: null, source: null };
  }

  setActiveModule(location.module, { persist: false });

  try {
    if (location.module === "presupuesto" && location.view === "detail" && location.id) {
      await openBudgetDetail(Number(location.id), { persist: false });
    } else if (location.module === "compras" && location.view === "purchase-detail" && location.id) {
      await openPurchaseDetail(Number(location.id), { persist: false });
    } else if (location.module === "compras" && location.view === "fixed-expense-detail" && location.id) {
      await openPurchaseFixedExpenseDetail(Number(location.id), { persist: false });
    } else if (location.module === "cuentas-cobrar" && location.view === "detail" && location.id) {
      await openAccountsReceivableDetail(Number(location.id), { persist: false });
    } else if (location.module === "cuentas-pagar" && location.view === "detail" && location.id) {
      await openAccountsPayableDetail(location.source === "occom" ? location.id : Number(location.id), location.source || "ocp", { persist: false });
    } else if (location.module === "prestamos" && location.view === "detail" && location.id) {
      await openUserCreditDetail(Number(location.id), { persist: false });
    }
    return location;
  } catch (_error) {
    return { module: location.module, view: "list", id: null, source: null };
  }
}

async function restoreAppLocation() {
  const location = readAppLocation();
  const restoredLocation = await applyAppLocation(location, { persist: false });
  if (restoredLocation) saveAppLocation(restoredLocation, { replace: true });
}

function applyRoleVisibility() {
  navItems.forEach((item) => {
    item.classList.toggle("hidden", !canAccessModule(item.dataset.module));
  });
  document.querySelectorAll(".sidebar-nav-group").forEach((group) => {
    const visibleItems = [...group.querySelectorAll(".nav-item")].some((item) => !item.classList.contains("hidden"));
    group.classList.toggle("hidden", !visibleItems);
  });
  document.querySelectorAll(".launcher-card").forEach((card) => {
    card.classList.toggle("hidden", !canAccessModule(card.dataset.module));
  });
  const hasQuickAction = [...(quickCreateList?.querySelectorAll("[data-quick-module]") || [])].some((button) =>
    canAccessModule(button.dataset.quickModule)
  );
  quickCreateButton.classList.toggle("hidden", !hasQuickAction);
  openUserModalButton?.classList.toggle("hidden", !canManageUsers());
  toggleProjectOwnerAuditButton?.classList.toggle("hidden", !canManageProjectOwnerAudit());
  openClientBranchModalButton?.classList.toggle("hidden", !canManageCompanyLocations());
  openLocationCatalogModalButton?.classList.toggle("hidden", !canManageCompanyLocations());
  openUserCreditModalButton?.classList.toggle("hidden", !canManageUserCredits());
  document
    .querySelectorAll(
      "#reportExportExcelButton, #reportExportPdfButton, #budgetsExportExcelButton, #budgetsExportPdfButton, #purchaseExportExcelButton, #purchaseExportPdfButton, #accountsReceivableExportExcelButton, #accountsReceivableExportPdfButton, #accountsPayableExportExcelButton, #accountsPayableExportPdfButton, [data-structured-export]"
    )
    .forEach((button) => button.classList.toggle("hidden", !canUseExports()));
}

function setSidebarCollapsed(isCollapsed, options = {}) {
  const collapsed = Boolean(isCollapsed);
  appView?.classList.toggle("sidebar-collapsed", collapsed);
  appView?.classList.toggle("sidebar-expanded", !collapsed);
  document.body.classList.toggle("sidebar-drawer-open", !collapsed);
  mainNav?.setAttribute("aria-hidden", String(collapsed));
  sidebarToggleButton?.setAttribute("aria-expanded", String(!collapsed));
  sidebarToggleButton?.setAttribute("aria-label", collapsed ? "Abrir menú de módulos" : "Cerrar menú de módulos");
  if (options.persist !== false) {
    localStorage.setItem(SIDEBAR_STATE_KEY, collapsed ? "true" : "false");
  }
}

function initializeSidebarState() {
  const storedState = localStorage.getItem(SIDEBAR_STATE_KEY);
  setSidebarCollapsed(storedState === null ? true : storedState === "true", { persist: false });
}

function closeSidebarOnCompactScreens() {
  if (window.matchMedia?.("(max-width: 960px)")?.matches) {
    setSidebarCollapsed(true);
  }
}

function openModuleLauncher() {
  moduleLauncher.classList.remove("hidden");
  moduleLauncherSearch.value = "";
  filterLauncherCards("");
  moduleLauncherSearch.focus();
}

function closeModuleLauncher() {
  moduleLauncher.classList.add("hidden");
}

function openUserModal(user = null) {
  editingUserId = user?.id || null;
  userForm.reset();
  userFormStatus.textContent = "";
  userModalTitle.textContent = editingUserId ? "Editar usuario" : "Crear nuevo usuario";
  createUserButton.textContent = editingUserId ? "Guardar cambios" : "Crear usuario";

  if (user) {
    userForm.elements.nombre.value = user.nombre || "";
    userForm.elements.apellido.value = user.apellido || "";
    userForm.elements.usuario.value = user.usuario || "";
    userForm.elements.password.value = "";
    userForm.elements.rolId.value = user.rolId || "";
    userForm.elements.comisionSupervisor.value = Number(user.comisionSupervisor || 0).toFixed(2);
    userForm.elements.banco.value = user.banco || "";
    userForm.elements.cuenta.value = user.cuenta || "";
    userForm.elements.clabe.value = user.clabe || "";
  }

  const explicitPermissionIds = (user?.permisosEspecialesIds || []).map(Number).filter(Boolean);
  const permissionIds = new Set(
    explicitPermissionIds.length ? explicitPermissionIds : getDefaultPermissionIdsForSelectedRole()
  );
  specialPermissions.querySelectorAll('input[name="permisosEspeciales"]').forEach((input) => {
    input.checked = permissionIds.has(Number(input.value));
  });
  operationPermissions.querySelectorAll('input[name="permisosEspeciales"]').forEach((input) => {
    input.checked = permissionIds.has(Number(input.value));
  });

  const tempRoleIds = new Set((user?.rolesTemporalesIds || []).map(Number));
  temporaryRoles.querySelectorAll('input[name="rolesTemporales"]').forEach((input) => {
    input.checked = tempRoleIds.has(Number(input.value));
  });

  const branchScopePermissions = new Map(
    (user?.alcancesSucursal || []).map((scope) => [
      Number(scope.sucursalId || 0),
      new Set((scope.permisosIds || []).map(Number).filter(Boolean))
    ])
  );
  branchAccessScopes?.querySelectorAll("[data-branch-scope]").forEach((scopeElement) => {
    const branchId = Number(scopeElement.dataset.branchId || 0);
    const selectedPermissions = branchScopePermissions.get(branchId) || new Set();
    scopeElement.querySelectorAll("[data-branch-permission-id]").forEach((input) => {
      input.checked = selectedPermissions.has(Number(input.dataset.branchPermissionId || 0));
    });
    scopeElement.open = selectedPermissions.size > 0;
  });

  setSuperAdminRoleState();
  userModal.classList.remove("hidden");
  userForm.elements.nombre.focus();
}

function closeUserModal() {
  userModal.classList.add("hidden");
  editingUserId = null;
}

function clearUserFormValidation() {
  userForm.querySelectorAll(".user-field-invalid").forEach((element) => {
    element.classList.remove("user-field-invalid");
  });
}

function markUserFieldInvalid(field, message = "Completa este campo para continuar.") {
  if (!field) return;
  const label = field.closest("label") || field;
  label.classList.remove("user-field-invalid");
  void label.offsetWidth;
  label.classList.add("user-field-invalid");
  field.setAttribute("aria-invalid", "true");
  userFormStatus.textContent = message;
  field.scrollIntoView({ behavior: "smooth", block: "center" });
  field.focus({ preventScroll: true });
  window.setTimeout(() => {
    label.classList.remove("user-field-invalid");
    field.removeAttribute("aria-invalid");
  }, 2600);
}

function validateUserFormBeforeSubmit() {
  clearUserFormValidation();
  const requiredFields = [
    { field: userForm.elements.nombre, label: "Nombre" },
    { field: userForm.elements.apellido, label: "Apellido" },
    { field: userForm.elements.usuario, label: "Usuario" },
    { field: userForm.elements.rolId, label: "Rol" }
  ];
  if (!editingUserId) {
    requiredFields.splice(3, 0, { field: userForm.elements.password, label: "Contraseña" });
  }
  const invalid = requiredFields.find(({ field }) => !String(field?.value || "").trim());
  if (!invalid) return true;
  markUserFieldInvalid(invalid.field, `Falta completar: ${invalid.label}.`);
  return false;
}

function getUserFieldFromErrorMessage(message = "") {
  const normalized = normalizeSearchValue(message);
  if (normalized.includes("nombre")) return userForm.elements.nombre;
  if (normalized.includes("apellido")) return userForm.elements.apellido;
  if (normalized.includes("usuario")) return userForm.elements.usuario;
  if (normalized.includes("contrasena") || normalized.includes("password")) return userForm.elements.password;
  if (normalized.includes("rol")) return userForm.elements.rolId;
  if (normalized.includes("comision")) return userForm.elements.comisionSupervisor;
  if (normalized.includes("banco")) return userForm.elements.banco;
  if (normalized.includes("cuenta")) return userForm.elements.cuenta;
  if (normalized.includes("clabe")) return userForm.elements.clabe;
  return null;
}

function setSuperAdminRoleState() {
  const selected = roleSelect.options[roleSelect.selectedIndex]?.textContent.trim().toLowerCase();
  const isSuperAdmin = selected === "superadmin";
  [specialPermissions, operationPermissions, temporaryRoles, branchAccessScopes].filter(Boolean).forEach((container) => {
    container.closest("fieldset").classList.toggle("hidden", isSuperAdmin);
    if (isSuperAdmin) {
      container.querySelectorAll("input").forEach((input) => {
        input.checked = false;
      });
    }
  });
}

function getDefaultPermissionIdsForSelectedRole() {
  const selectedRoleId = Number(roleSelect.value || 0);
  const roleOption = [...roleSelect.options].find((option) => Number(option.value || 0) === selectedRoleId);
  const roleName = normalizeRoleKey(roleOption?.textContent || "");
  const defaults = new Set(userPermissionCatalog.roleDefaults?.[roleName] || []);
  const permissionByName = userPermissionCatalog.permissionByName || {};
  return [...defaults].map((permissionName) => Number(permissionByName[permissionName] || 0)).filter(Boolean);
}

function applyRolePermissionDefaults() {
  const defaultPermissionIds = new Set(getDefaultPermissionIdsForSelectedRole());
  [specialPermissions, operationPermissions].forEach((container) => {
    container.querySelectorAll('input[name="permisosEspeciales"]').forEach((input) => {
      input.checked = defaultPermissionIds.has(Number(input.value));
    });
  });
  setSuperAdminRoleState();
}

function updateClientCompanyCreditDaysVisibility() {
  if (!clientBranchForm || !clientCompanyCreditDaysField) return;
  const isCredit = clientBranchForm.elements.empresaMetodoPago?.value === "credito";
  clientCompanyCreditDaysField.classList.toggle("hidden", !isCredit);
  if (!clientBranchForm.elements.empresaDiasCredito) return;
  if (!isCredit) {
    clientBranchForm.elements.empresaDiasCredito.value = "0";
  } else if (!Number(clientBranchForm.elements.empresaDiasCredito.value || 0)) {
    clientBranchForm.elements.empresaDiasCredito.value = "30";
  }
}

function updateProviderCreditDaysVisibility() {
  if (!providerForm || !providerCreditDaysField) return;
  const isCredit = providerForm.elements.pago?.value === "credito";
  providerCreditDaysField.classList.toggle("hidden", !isCredit);
  if (!providerForm.elements.diasCredito) return;
  if (!isCredit) {
    providerForm.elements.diasCredito.value = "0";
  } else if (!Number(providerForm.elements.diasCredito.value || 0)) {
    providerForm.elements.diasCredito.value = "30";
  }
}

function clientDirectoryCompanies() {
  const companies = [
    ...(clientDirectoryCatalogCache.length ? clientDirectoryCatalogCache : clientsCache).map((client) => client.empresa),
    ...clientBranchLocationsCache.map((branch) => branch.empresa)
  ];
  return [...new Set(companies.map((value) => String(value || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base", numeric: true }));
}

function clientBranchesForCompany(company = "") {
  const normalizedCompany = normalizeSearchValue(company);
  if (!normalizedCompany) return [];
  return clientBranchLocationsCache
    .filter((branch) => normalizeSearchValue(branch.empresa) === normalizedCompany && branch.activo !== false)
    .sort((a, b) => String(a.nombre || "").localeCompare(String(b.nombre || ""), "es", { sensitivity: "base", numeric: true }));
}

function updateClientBranchNewCompanyVisibility() {
  if (!clientBranchCompanyInput || !clientBranchNewCompanyField || !clientBranchNewCompanyInput) return;
  const creatingCompany = clientBranchCompanyInput.value === "__new__";
  clientBranchNewCompanyField.classList.toggle("hidden", !creatingCompany);
  clientBranchNewCompanyInput.required = creatingCompany;
  if (!creatingCompany) clientBranchNewCompanyInput.value = "";
}

function selectedClientBranchCompanyName() {
  if (!clientBranchCompanyInput) return "";
  if (clientBranchCompanyInput.value === "__new__") {
    return String(clientBranchNewCompanyInput?.value || "").trim();
  }
  return String(clientBranchCompanyInput.value || "").trim();
}

function syncLocationCatalogOptions(selected = "") {
  if (!clientBranchLocationCatalogSelect) return;
  const currentId = Number(selected || clientBranchLocationCatalogSelect.value || 0);
  const activeLocations = (locationCatalogCache || [])
    .filter((location) => location.activo !== false)
    .sort((a, b) => String(a.nombre || "").localeCompare(String(b.nombre || ""), "es", { sensitivity: "base", numeric: true }));
  clientBranchLocationCatalogSelect.innerHTML = `<option value="">${activeLocations.length ? "Selecciona una sucursal del catálogo" : "Primero da de alta una sucursal"}</option>${activeLocations
    .map((location) => `<option value="${Number(location.id)}">${escapeHtml(location.nombre || "Sucursal")}</option>`)
    .join("")}`;
  clientBranchLocationCatalogSelect.disabled = !activeLocations.length;
  if (currentId && activeLocations.some((location) => Number(location.id) === currentId)) {
    clientBranchLocationCatalogSelect.value = String(currentId);
  }
}

function renderLocationCatalog(locations = locationCatalogCache) {
  if (!locationCatalogList) return;
  const visible = locations || [];
  if (!visible.length) {
    locationCatalogList.innerHTML = `<div class="empty-state">Aún no hay sucursales en el catálogo</div>`;
    return;
  }
  locationCatalogList.innerHTML = `
    <div class="client-directory-list-head location-list-head" aria-hidden="true">
      <span>Sucursal</span><span>Empresas</span><span>Acciones</span>
    </div>
    ${visible.map((location) => `
      <article class="client-branch-location-card location-catalog-card">
        <div class="client-list-primary">
          <strong>${escapeHtml(location.nombre || "Sucursal")}</strong>
        </div>
        <div class="client-branch-location-stats">
          <span>${Number(location.empresasCount || 0)} empresa(s)</span>
        </div>
        ${canManageCompanyLocations() ? `<div class="client-branch-location-actions">
          <button class="small-button edit-location-catalog-button" type="button" data-location-id="${Number(location.id)}">Editar</button>
          <button class="small-button danger-button delete-location-catalog-button" type="button" data-location-id="${Number(location.id)}">Eliminar</button>
        </div>` : `<span class="client-list-empty-action">—</span>`}
      </article>
    `).join("")}`;
}

function openLocationCatalogModal(location = null) {
  if (!locationCatalogModal || !locationCatalogForm) return;
  editingLocationCatalogId = location?.id || null;
  locationCatalogForm.reset();
  locationCatalogFormStatus.textContent = "";
  locationCatalogModalTitle.textContent = editingLocationCatalogId ? "Editar sucursal" : "Nueva sucursal";
  saveLocationCatalogButton.textContent = editingLocationCatalogId ? "Guardar cambios" : "Guardar sucursal";
  locationCatalogNameInput.value = location?.nombre || "";
  locationCatalogModal.classList.remove("hidden");
  locationCatalogNameInput?.focus();
}

function closeLocationCatalogModal() {
  locationCatalogModal?.classList.add("hidden");
  editingLocationCatalogId = null;
  locationCatalogForm?.reset();
  if (locationCatalogFormStatus) locationCatalogFormStatus.textContent = "";
}

function syncClientCompanyOptions(selectedClientCompany = "", selectedBranchCompany = "") {
  const companies = clientDirectoryCompanies();
  if (clientCompanyInput) {
    const current = String(selectedClientCompany || clientCompanyInput.value || "").trim();
    const options = [...companies];
    if (current && !options.some((company) => normalizeSearchValue(company) === normalizeSearchValue(current))) options.push(current);
    options.sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base", numeric: true }));
    clientCompanyInput.innerHTML = `<option value="">Selecciona una empresa</option>${options
      .map((company) => `<option value="${escapeHtml(company)}">${escapeHtml(company)}</option>`)
      .join("")}`;
    const match = options.find((company) => normalizeSearchValue(company) === normalizeSearchValue(current));
    if (match) clientCompanyInput.value = match;
  }
  if (clientBranchCompanyInput) {
    const current = String(selectedBranchCompany || (clientBranchCompanyInput.value !== "__new__" ? clientBranchCompanyInput.value : "") || "").trim();
    const options = [...companies];
    if (current && !options.some((company) => normalizeSearchValue(company) === normalizeSearchValue(current))) options.push(current);
    options.sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base", numeric: true }));
    clientBranchCompanyInput.innerHTML = `<option value="">Selecciona una empresa</option>${options
      .map((company) => `<option value="${escapeHtml(company)}">${escapeHtml(company)}</option>`)
      .join("")}<option value="__new__">+ Dar de alta nueva empresa</option>`;
    const match = options.find((company) => normalizeSearchValue(company) === normalizeSearchValue(current));
    if (match) clientBranchCompanyInput.value = match;
    updateClientBranchNewCompanyVisibility();
  }
}

function syncClientBranchOptions(selected = "", fallbackName = "") {
  if (!clientBranchSelect) return;
  const company = String(clientCompanyInput?.value || "").trim();
  const branches = clientBranchesForCompany(company);
  const selectedId = Number(selected || 0);
  const selectedName = String(fallbackName || (!selectedId ? selected : "") || "").trim();
  clientBranchSelect.innerHTML = `<option value="">${company ? "Selecciona una sucursal registrada" : "Selecciona empresa primero"}</option>${branches
    .map((branch) => `<option value="${Number(branch.id)}">${escapeHtml(branch.nombre || "Sucursal")}</option>`)
    .join("")}`;
  clientBranchSelect.disabled = !company;
  if (selectedId && branches.some((branch) => Number(branch.id) === selectedId)) {
    clientBranchSelect.value = String(selectedId);
  } else if (selectedName) {
    const match = branches.find((branch) => branchLabelsMatch(branch.nombre, selectedName));
    if (match) clientBranchSelect.value = String(match.id);
  }
  if (!clientBranchSelect.value && branches.length === 1) clientBranchSelect.value = String(branches[0].id);
}

function syncClientCompanySettings(company = selectedClientBranchCompanyName()) {
  if (!clientBranchForm) return;
  const normalized = normalizeSearchValue(company);
  const source = normalized
    ? clientBranchLocationsCache.find((branch) => normalizeSearchValue(branch.empresa) === normalized)
    : null;
  clientBranchForm.elements.empresaRfc.value = source?.empresaRfc || "";
  clientBranchForm.elements.empresaDireccion.value = source?.empresaDireccion || "";
  clientBranchForm.elements.empresaEmail.value = source?.empresaEmail || "";
  clientBranchForm.elements.empresaUsoCfdi.value = source?.empresaUsoCfdi || "";
  clientBranchForm.elements.empresaValorVenta.value = Number(source?.empresaValorVenta || 0) > 0
    ? Number(source.empresaValorVenta).toFixed(4)
    : "";
  clientBranchForm.elements.empresaMetodoPago.value = source?.empresaMetodoPago || "contado";
  clientBranchForm.elements.empresaDiasCredito.value = Number(source?.empresaDiasCredito || 0);
  clientBranchForm.elements.empresaNotas.value = source?.empresaNotas || "";
  updateClientCompanyCreditDaysVisibility();
}

function openClientBranchModal(branch = null) {
  if (!clientBranchModal || !clientBranchForm) return;
  editingClientBranchId = branch?.id || null;
  clientBranchForm.reset();
  clientBranchFormStatus.textContent = "";
  clientBranchModalTitle.textContent = editingClientBranchId ? "Editar empresa" : "Nueva empresa";
  saveClientBranchButton.textContent = editingClientBranchId ? "Guardar cambios" : "Guardar empresa";
  syncClientCompanyOptions("", branch?.empresa || "");
  if (!branch && clientBranchCompanyInput) {
    clientBranchCompanyInput.value = "__new__";
    updateClientBranchNewCompanyVisibility();
  }
  syncLocationCatalogOptions(branch?.ubicacionId || "");
  if (branch) {
    clientBranchForm.elements.direccion.value = branch.direccion || "";
  }
  syncClientCompanySettings(branch?.empresa || "");
  updateClientBranchNewCompanyVisibility();
  clientBranchModal.classList.remove("hidden");
  clientBranchCompanyInput?.focus();
}

function closeClientBranchModal() {
  clientBranchModal?.classList.add("hidden");
  editingClientBranchId = null;
  clientBranchForm?.reset();
  if (clientBranchFormStatus) clientBranchFormStatus.textContent = "";
}

function renderClientBranchLocations(branches = clientBranchLocationsCache) {
  if (!clientBranchLocationsList) return;
  const visible = branches || [];
  if (!visible.length) {
    clientBranchLocationsList.innerHTML = `<div class="empty-state">Aún no hay empresas registradas</div>`;
    return;
  }
  clientBranchLocationsList.innerHTML = `
    <div class="client-directory-list-head branch-list-head" aria-hidden="true">
      <span>Empresa</span><span>Sucursal</span><span>Actividad</span><span>Acciones</span>
    </div>
    ${visible.map((branch) => `
      <article class="client-branch-location-card">
        <div class="client-list-primary"><strong>${escapeHtml(branch.empresa || "Empresa")}</strong></div>
        <div class="client-list-branch">
          <span>${escapeHtml(branch.nombre || "Sin sucursal")}</span>
          ${branch.direccion ? `<small>${escapeHtml(branch.direccion)}</small>` : ""}
        </div>
        <div class="client-branch-location-stats">
          <span>${Number(branch.contactosCount || 0)} contacto(s)</span>
          <span>${Number(branch.proyectosCount || 0)} proyecto(s)</span>
        </div>
        ${canManageCompanyLocations() ? `<div class="client-branch-location-actions">
          <button class="small-button edit-client-branch-button" type="button" data-branch-id="${Number(branch.id)}">Editar</button>
          <button class="small-button danger-button delete-client-branch-button" type="button" data-branch-id="${Number(branch.id)}">Eliminar</button>
        </div>` : `<span class="client-list-empty-action">—</span>`}
      </article>
    `).join("")}`;
}

function openClientModal(client = null) {
  editingClientId = client?.id || null;
  clientForm.reset();
  clientFormStatus.textContent = "";
  clientModalTitle.textContent = editingClientId ? "Editar contacto" : "Nuevo contacto";
  saveClientButton.textContent = editingClientId ? "Guardar cambios" : "Guardar contacto";
  syncClientCompanyOptions(client?.empresa || "");

  if (client) {
    syncClientBranchOptions(client.sucursalId || "", client.sucursal || "");
    clientForm.elements.nombre.value = client.nombre || "";
    clientForm.elements.telefono.value = client.telefono || "";
    clientForm.elements.email.value = client.email || "";
  } else {
    syncClientBranchOptions();
  }
  clientModal.classList.remove("hidden");
  clientForm.elements.empresa.focus();
}

function closeClientModal() {
  clientModal.classList.add("hidden");
  editingClientId = null;
}

function closeClientDocsModal() {
  clientDocsModal.classList.add("hidden");
  activeDocsClientId = null;
  clientDocumentForm.reset();
}

function openProviderModal(provider = null) {
  editingProviderId = provider?.id || null;
  providerForm.reset();
  providerFormStatus.textContent = "";
  providerModalTitle.textContent = editingProviderId ? "Editar proveedor" : "Nuevo proveedor";
  saveProviderButton.textContent = editingProviderId ? "Guardar cambios" : "Guardar proveedor";

  if (provider) {
    providerForm.elements.empresa.value = provider.empresa || "";
    providerForm.elements.rfc.value = provider.rfc || "";
    providerForm.elements.direccion.value = provider.direccion || "";
    providerForm.elements.telefono.value = provider.telefono || "";
    providerForm.elements.correo.value = provider.correo || "";
    providerForm.elements.contactoVentas.value = provider.contactoVentas || "";
    providerForm.elements.contactoCompras.value = provider.contactoCompras || "";
    providerForm.elements.contactoContabilidad.value = provider.contactoContabilidad || "";
    providerForm.elements.pago.value = provider.pago || "contado";
    if (providerForm.elements.diasCredito) providerForm.elements.diasCredito.value = Number(provider.diasCredito || 0);
    providerForm.elements.banco.value = provider.banco || "";
    providerForm.elements.cuenta.value = provider.cuenta || "";
    providerForm.elements.clabe.value = provider.clabe || "";
    providerForm.elements.spei.value = provider.spei || "";
  }
  updateProviderCreditDaysVisibility();

  providerModal.classList.remove("hidden");
  providerForm.elements.empresa.focus();
}

function closeProviderModal() {
  providerModal.classList.add("hidden");
  editingProviderId = null;
}

function closeProviderDocsModal() {
  providerDocsModal.classList.add("hidden");
  activeDocsProviderId = null;
  providerDocumentForm.reset();
}

function updateFixedExpenseBudgetSummary() {
  const assigned = parseCurrency(fixedExpenseBudget?.value || 0);
  const additional = parseCurrency(fixedExpenseAdditionalBudget?.value || 0);
  const used = parseCurrency(fixedExpenseAvailableBudget?.dataset.used || 0);
  const available = Math.max(0, assigned + additional - used);
  if (fixedExpenseAssignedSummary) fixedExpenseAssignedSummary.textContent = formatCurrency(assigned);
  if (fixedExpenseAdditionalSummary) fixedExpenseAdditionalSummary.textContent = formatCurrency(additional);
  if (fixedExpenseAvailableSummary) fixedExpenseAvailableSummary.textContent = formatCurrency(available);
  if (fixedExpenseAvailableBudget) fixedExpenseAvailableBudget.value = formatCurrency(available);
}

function updateFixedExpenseAutomaticFields() {
  if (!fixedExpenseForm) return;
  const enabled = Boolean(fixedExpenseAutomaticToggle?.checked);
  fixedExpenseForm.querySelectorAll("[data-fixed-expense-auto-field]").forEach((field) => {
    field.classList.toggle("is-disabled", !enabled);
    field.querySelectorAll("input, select, textarea").forEach((control) => {
      control.disabled = !enabled;
    });
  });
  const description = fixedExpenseForm.elements.descripcionAutomatica;
  const provider = fixedExpenseForm.elements.proveedorId;
  if (description) description.required = enabled;
  if (provider) {
    const smartProvider = smartSelectControllers.get(provider);
    if (smartProvider) {
      provider.required = false;
      smartProvider.input.required = enabled;
      smartProvider.input.disabled = !enabled;
    } else {
      provider.required = enabled;
    }
  }
}

function renderFixedExpenseProviderOptions(selectedId = "") {
  if (!fixedExpenseProviderSelect) return;
  fixedExpenseProviderSelect.innerHTML = `<option value="">Selecciona proveedor</option>${fixedExpenseProvidersCache
    .map((provider) => `<option value="${provider.id}" data-search="${escapeHtml(`${provider.empresa || ""} ${provider.contacto || ""}`)}">${escapeHtml(provider.empresa || "Proveedor")}</option>`)
    .join("")}`;
  fixedExpenseProviderSelect.value = String(selectedId || "");
  refreshSearchableSelect(fixedExpenseProviderSelect);
}

function renderFixedExpenseBranchOptions(selected = "") {
  if (!fixedExpenseBranchSelect) return;
  const branches = [...new Set((fixedExpenseBranchesCache || [])
    .map((value) => String(value || "").trim())
    .filter(Boolean))];
  const current = String(selected || "").trim();
  const selectedBranch = branches.find((branch) => normalizeSearchValue(branch) === normalizeSearchValue(current)) || "";
  fixedExpenseBranchSelect.innerHTML = `<option value="">Selecciona sucursal</option>${branches
    .map((branch) => `<option value="${escapeHtml(branch)}">${escapeHtml(branch)}</option>`)
    .join("")}`;
  fixedExpenseBranchSelect.value = selectedBranch;
}

function openFixedExpenseModal(expense = null) {
  editingFixedExpenseId = expense?.id || null;
  fixedExpenseForm.reset();
  fixedExpenseFormStatus.textContent = "";
  fixedExpenseModalTitle.textContent = editingFixedExpenseId ? "Editar gasto fijo" : "Nuevo gasto fijo";
  saveFixedExpenseButton.textContent = editingFixedExpenseId ? "Guardar cambios" : "Guardar gasto fijo";
  renderFixedExpenseProviderOptions(expense?.proveedorId || "");
  renderFixedExpenseBranchOptions(expense?.sucursal || "");
  fixedExpenseBudget.value = "$0.00";
  if (fixedExpenseAdditionalBudget) fixedExpenseAdditionalBudget.value = "$0.00";
  if (fixedExpenseAvailableBudget) fixedExpenseAvailableBudget.value = "$0.00";
  if (fixedExpenseAvailableBudget) fixedExpenseAvailableBudget.dataset.used = "0";
  fixedExpenseForm.elements.fechaInicio.value = toDateInputValue(new Date());
  fixedExpenseForm.elements.diaGeneracion.value = String(new Date().getDate() > 28 ? 28 : new Date().getDate());
  fixedExpenseForm.elements.recurrencia.value = "mensual";
  fixedExpenseForm.elements.estadoRegistro.value = "Activo";

  if (expense) {
    fixedExpenseForm.elements.gasto.value = expense.gasto || "";
    fixedExpenseForm.elements.sucursal.value = expense.sucursal || "";
    fixedExpenseForm.elements.recurrencia.value = expense.recurrencia || "mensual";
    fixedExpenseForm.elements.estadoRegistro.value = expense.estadoRegistro || "Activo";
    fixedExpenseForm.elements.descripcionAutomatica.value = expense.descripcionAutomatica || "";
    fixedExpenseForm.elements.generacionAutomatica.checked = Boolean(expense.generacionAutomatica);
    fixedExpenseForm.elements.diaGeneracion.value = Number(expense.diaGeneracion || 1);
    fixedExpenseForm.elements.fechaInicio.value = toDateInputValue(expense.fechaInicio || new Date());
    fixedExpenseForm.elements.fechaFin.value = toDateInputValue(expense.fechaFin || "");
    fixedExpenseBudget.value = formatCurrency(expense.presupuesto);
    if (fixedExpenseAdditionalBudget) fixedExpenseAdditionalBudget.value = formatCurrency(expense.presupuestoAdicional || 0);
    if (fixedExpenseAvailableBudget) {
      fixedExpenseAvailableBudget.dataset.used = String(Number(expense.usado || 0));
      fixedExpenseAvailableBudget.value = formatCurrency(expense.disponible ?? expense.presupuesto ?? 0);
    }
  }
  updateFixedExpenseAutomaticFields();
  updateFixedExpenseBudgetSummary();
  fixedExpenseModal.classList.remove("hidden");
  fixedExpenseForm.elements.gasto.focus();
}

function closeFixedExpenseModal() {
  fixedExpenseModal.classList.add("hidden");
  editingFixedExpenseId = null;
}

async function loadBudgetCatalogs() {
  const [clientsData, pricesData, ownersData] = await Promise.all([
    api("/api/clients?search="),
    api("/api/price-list?search="),
    api("/api/project-owners")
  ]);

  budgetClientsCache = clientsData.clients || [];
  clientBranchLocationsCache = clientsData.branchLocations || clientBranchLocationsCache || [];
  budgetProjectOwnersCache = ownersData.users || [];
  budgetEquipmentPriceItems = (pricesData.items || []).filter(
    (item) => item.tipo === "Equipos de elevación e izaje"
  );
  budgetLaborPriceItems = (pricesData.items || []).filter((item) => item.tipo === "Mano de obra");

  const companies = [...new Set([
    ...budgetClientsCache.map((client) => String(client.empresa || "").trim()),
    ...clientBranchLocationsCache.map((branch) => String(branch.empresa || "").trim())
  ].filter(Boolean))].sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base", numeric: true }));
  budgetCompanySelect.innerHTML = `<option value="">Selecciona empresa</option>${companies
    .map((company) => {
      const clients = budgetClientsCache.filter(
        (client) => normalizeSearchValue(client.empresa) === normalizeSearchValue(company)
      );
      const branches = clientBranchLocationsCache.filter(
        (branch) => normalizeSearchValue(branch.empresa) === normalizeSearchValue(company)
      );
      const searchText = [
        ...clients.map((client) => `${client.empresa || ""} ${client.nombre || ""} ${client.rfc || ""} ${client.sucursal || ""}`),
        ...branches.map((branch) => `${branch.empresa || ""} ${branch.nombre || ""} ${branch.direccion || ""}`)
      ].join(" ");
      return `<option value="${escapeHtml(company)}" data-search="${escapeHtml(searchText)}">${escapeHtml(company)}</option>`;
    })
    .join("")}`;
  refreshSearchableSelect(budgetCompanySelect);
  renderBudgetOwnerOptions(Number(budgetOwnerSelect?.value || currentUser?.id || 0));
  syncBudgetBranchOptions();
  syncBudgetClientUserOptions();
  refreshBudgetClientAutocomplete();
}

function renderBudgetOwnerOptions(selectedId = null) {
  if (!budgetOwnerSelect) return;
  const currentId = Number(currentUser?.id || 0);
  const canChoose = canChooseBudgetOwner();
  const users = canChoose
    ? budgetProjectOwnersCache
    : budgetProjectOwnersCache.filter((user) => Number(user.id) === currentId);
  const selected = Number(selectedId || 0) || currentId;
  budgetOwnerSelect.innerHTML = `<option value="">Selecciona responsable</option>${users.map((user) => {
    const label = user.nombreCompleto || `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario || `Usuario ${user.id}`;
    return `<option value="${Number(user.id)}" data-search="${escapeHtml(`${label} ${user.usuario || ""} ${user.rol || ""}`)}">${escapeHtml(label)}</option>`;
  }).join("")}`;
  if (selected && users.some((user) => Number(user.id) === selected)) budgetOwnerSelect.value = String(selected);
  if (!budgetOwnerSelect.value && users.length === 1) budgetOwnerSelect.value = String(users[0].id);
  budgetOwnerSelect.disabled = !canChoose && users.length === 1;
  refreshSearchableSelect(budgetOwnerSelect);
}

function selectedBudgetCompanyName() {
  return String(budgetCompanySelect?.value || "").trim();
}

function budgetCompanyClients() {
  const company = selectedBudgetCompanyName();
  if (!company) return [];
  return budgetClientsCache.filter(
    (client) => normalizeSearchValue(client.empresa) === normalizeSearchValue(company)
  );
}

function selectedBudgetBranchName() {
  return String(budgetBranchInput?.value || "").trim();
}

function budgetCompanyBranchLocations() {
  const company = selectedBudgetCompanyName();
  if (!company) return [];
  return clientBranchLocationsCache
    .filter((branch) => normalizeSearchValue(branch.empresa) === normalizeSearchValue(company) && branch.activo !== false)
    .sort((a, b) => String(a.nombre || "").localeCompare(String(b.nombre || ""), "es", { sensitivity: "base", numeric: true }));
}

function budgetCompanyBranches() {
  return budgetCompanyBranchLocations().map((branch) => String(branch.nombre || "").trim()).filter(Boolean);
}

function selectedBudgetBranchId() {
  const branchName = selectedBudgetBranchName();
  if (!branchName) return null;
  const match = budgetCompanyBranchLocations().find(
    (branch) => normalizeSearchValue(branch.nombre) === normalizeSearchValue(branchName)
  );
  return match ? Number(match.id) : null;
}

function syncBudgetBranchOptions(selected = "", fallbackName = "") {
  if (!budgetBranchInput) return;
  const company = selectedBudgetCompanyName();
  const branches = budgetCompanyBranchLocations();
  const selectedId = Number(selected || 0);
  let current = selectedId
    ? String(branches.find((branch) => Number(branch.id) === selectedId)?.nombre || fallbackName || "")
    : String(selected || fallbackName || "").trim();
  const catalogMatch = current
    ? branches.find((branch) => branchLabelsMatch(branch.nombre, current))
    : null;
  const legacyOption = current && !catalogMatch
    ? `<option value="${escapeHtml(current)}" data-legacy-branch="true">${escapeHtml(current)} (registrada en el proyecto)</option>`
    : "";
  budgetBranchInput.disabled = !company;
  budgetBranchInput.innerHTML = company
    ? `<option value="">Selecciona ubicación / sucursal</option>${branches
        .map((branch) => `<option value="${escapeHtml(branch.nombre || "")}" data-branch-id="${Number(branch.id)}">${escapeHtml(branch.nombre || "Sucursal")}</option>`)
        .join("")}${legacyOption}`
    : `<option value="">Selecciona empresa primero</option>`;
  if (current) {
    budgetBranchInput.value = catalogMatch?.nombre || current;
  }
  if (!budgetBranchInput.value && branches.length === 1) budgetBranchInput.value = branches[0].nombre || "";
}

function budgetContactRows() {
  const branchId = selectedBudgetBranchId();
  const branchName = selectedBudgetBranchName();
  if (!branchId && !branchName) return [];
  const rows = budgetCompanyClients().filter((client) => {
    const idMatches = branchId && Number(client.sucursalId || 0) === branchId;
    const labelMatches = branchName && branchLabelsMatch(client.sucursal, branchName);
    return Boolean(idMatches || labelMatches);
  });
  return rows.filter(
    (client) => String(client.nombre || "").trim() && normalizeSearchValue(client.nombre) !== normalizeSearchValue(client.sucursal)
  );
}

function syncBudgetClientUserOptions() {
  if (!budgetClientUserOptions) return;
  const names = [...new Set(budgetContactRows().map((client) => String(client.nombre || "").trim()).filter(Boolean))];
  budgetClientUserOptions.innerHTML = names.map((name) => `<option value="${escapeHtml(name)}"></option>`).join("");
}

function budgetClientAutocompleteItems() {
  return budgetContactRows().map((client) => ({
    value: client.id,
    label: client.nombre || "Contacto",
    inputLabel: client.nombre || "",
    meta: [client.empresa, client.sucursal, client.email || client.telefono].filter(Boolean).join(" · "),
    searchText: `${client.nombre || ""} ${client.empresa || ""} ${client.sucursal || ""} ${client.rfc || ""} ${client.email || ""}`,
    client
  }));
}

function refreshBudgetClientAutocomplete() {
  if (!budgetClientUserInput) return;
  const controller = attachSmartAutocomplete(budgetClientUserInput, {
    requireSelection: true,
    validationMessage: "Selecciona el cliente / usuario correcto de la sucursal elegida.",
    emptyText: selectedBudgetBranchName() ? "No hay contactos registrados para esta sucursal" : "Selecciona una sucursal primero",
    getItems: budgetClientAutocompleteItems,
    onSelect: (item) => {
      const client = item.client || budgetClientsCache.find((row) => Number(row.id) === Number(item.value));
      if (!client) return;
      budgetClientUserInput.value = client.nombre || "";
      budgetClientUserInput.dataset.selectedClientId = String(client.id || "");
      refreshBudgetFolioPreview();
    }
  });
  const currentName = normalizeSearchValue(budgetClientUserInput.value);
  const selectedClientId = Number(budgetClientUserInput.dataset.selectedClientId || 0);
  const item = budgetClientAutocompleteItems().find((row) =>
    selectedClientId
      ? Number(row.value) === selectedClientId
      : currentName && normalizeSearchValue(row.inputLabel || row.label) === currentName
  );
  if (item) controller.setSelection(item);
  else controller.render();
}

function resolveBudgetClientContact(value = "") {
  const company = selectedBudgetCompanyName();
  const branch = selectedBudgetBranchName();
  const selectedClientId = Number(
    smartAutocompleteControllers.get(budgetClientUserInput)?.getSelected()?.value ||
      budgetClientUserInput?.dataset.selectedClientId ||
      0
  );
  if (selectedClientId) {
    const byId = budgetClientsCache.find(
      (client) =>
        Number(client.id) === selectedClientId &&
        (!company || normalizeSearchValue(client.empresa) === normalizeSearchValue(company)) &&
        (!selectedBudgetBranchId() ||
          Number(client.sucursalId || 0) === Number(selectedBudgetBranchId()) ||
          (!branch ? false : branchLabelsMatch(client.sucursal, branch)))
    );
    if (byId) return byId;
  }
  const normalized = normalizeSearchValue(value);
  if (!normalized) return null;
  return budgetContactRows().find((client) => normalizeSearchValue(client.nombre) === normalized) || null;
}


function budgetProjectAutocompleteItems() {
  return (budgetsCache || []).map((budget) => ({
    value: budget.id,
    label: budget.tituloProyecto || budget.folio || "Proyecto",
    inputLabel: budget.tituloProyecto || budget.folio || "",
    meta: [budget.folio, budget.empresa, budget.clienteUsuario].filter(Boolean).join(" · "),
    searchText: `${budget.tituloProyecto || ""} ${budget.folio || ""} ${budget.empresa || ""} ${budget.clienteUsuario || ""} ${budget.owner || ""}`,
    budget
  }));
}

function initializeBudgetProjectSearchAutocomplete() {
  if (!budgetsSearch) return;
  attachSmartAutocomplete(budgetsSearch, {
    requireSelection: false,
    emptyText: "Sin proyectos similares",
    getItems: budgetProjectAutocompleteItems,
    onSelect: (item) => {
      const budget = item.budget || budgetsCache.find((row) => Number(row.id) === Number(item.value));
      if (!budget) return;
      budgetsSearch.value = budget.tituloProyecto || budget.folio || "";
      openBudgetDetail(Number(budget.id));
    }
  });
}

function selectedBudgetClient() {
  const company = selectedBudgetCompanyName();
  if (!company) return null;
  return budgetClientsCache.find((client) => normalizeSearchValue(client.empresa) === normalizeSearchValue(company)) || null;
}

async function refreshBudgetFolioPreview() {
  const client = selectedBudgetClient();

  if (isCurrentUserSuperAdmin() && budgetManualFolioToggle.checked) {
    budgetFolioPreview.readOnly = false;
    return;
  }

  budgetFolioPreview.readOnly = true;
  if (!client) {
    budgetFolioPreview.value = "";
    return;
  }

  try {
    const data = await api(`/api/budgets/next-folio?empresa=${encodeURIComponent(client.empresa || "")}`);
    budgetFolioPreview.value = data.folio || "";
  } catch (_error) {
    budgetFolioPreview.value = "Pendiente";
  }
}

function syncBudgetManualFolioAccess() {
  const canUseManualFolio = isCurrentUserSuperAdmin();
  const field = budgetManualFolioToggle?.closest("label");
  if (field) field.classList.toggle("hidden", !canUseManualFolio);
  if (budgetManualFolioToggle) {
    budgetManualFolioToggle.disabled = !canUseManualFolio;
    if (!canUseManualFolio) budgetManualFolioToggle.checked = false;
  }
  if (!canUseManualFolio) budgetFolioPreview.readOnly = true;
}

function clearBudgetContactSelection() {
  if (!budgetClientUserInput) return;
  smartAutocompleteControllers.get(budgetClientUserInput)?.clear();
  budgetClientUserInput.value = "";
  delete budgetClientUserInput.dataset.selectedClientId;
}

function updateBudgetClientFields() {
  clearBudgetContactSelection();
  syncBudgetBranchOptions();
  syncBudgetClientUserOptions();
  refreshBudgetClientAutocomplete();
  refreshBudgetFolioPreview();
}

function updateBudgetBranchContacts() {
  clearBudgetContactSelection();
  syncBudgetClientUserOptions();
  refreshBudgetClientAutocomplete();
}

function newBudgetEquipmentRow() {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    itemPrecioId: "",
    item: "",
    cantidadEquipos: 1,
    cantidadUm: 1,
    unidadMedida: "",
    costoUnitario: 0,
    flete: 0,
    subtotal: 0
  };
}

function newBudgetContractorRow() {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    descripcion: "",
    cantidad: 1,
    costo: 0
  };
}

function newBudgetLaborRow() {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    itemPrecioId: "",
    descripcion: "",
    personas: 1,
    horas: 1,
    costoHora: 0,
    comidas: 0,
    costoComida: 0
  };
}

function newBudgetMaterialRow() {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    descripcion: "",
    cantidad: 1,
    unidad: "",
    costo: 0
  };
}

function calculateBudgetEquipmentSubtotal(row) {
  return (
    Number(row.cantidadEquipos || 0) * Number(row.cantidadUm || 0) * Number(row.costoUnitario || 0) +
    Number(row.flete || 0)
  );
}

function calculateBudgetContractorSubtotal(row) {
  return Number(row.cantidad || 0) * Number(row.costo || 0);
}

function calculateBudgetLaborHours(row) {
  return Number(row.personas || 0) * Number(row.horas || 0);
}

function normalizeWholeQuantity(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.round(number));
}

function calculateBudgetLaborMeals(row) {
  const hours = calculateBudgetLaborHours(row);
  return hours > 0 ? Math.floor(hours / 12) : 0;
}

function calculateBudgetLaborSubtotal(row) {
  return (
    calculateBudgetLaborHours(row) * Number(row.costoHora || 0) +
    Number(row.costoComida || 0) * Number(row.comidas || 0)
  );
}

function calculateBudgetMaterialSubtotal(row) {
  return Number(row.cantidad || 0) * Number(row.costo || 0);
}

function budgetEquipmentOptions(selectedId = "", selectedDescription = "") {
  const normalizedDescription = normalizeSearchValue(selectedDescription);
  return `<option value="">Selecciona item</option>${budgetEquipmentPriceItems
    .map((item) => {
      const selectedById = Number(selectedId) && Number(selectedId) === Number(item.id);
      const selectedByDescription =
        !Number(selectedId) && normalizedDescription && normalizeSearchValue(item.item) === normalizedDescription;
      return `<option value="${item.id}" data-cost="${item.costo}" ${selectedById || selectedByDescription ? "selected" : ""}>${escapeHtml(item.item)}</option>`;
    })
    .join("")}`;
}

function budgetLaborOptions(selectedId = "", selectedDescription = "") {
  const normalizedDescription = normalizeSearchValue(selectedDescription);
  return `<option value="">Selecciona descripción</option>${budgetLaborPriceItems
    .map((item) => {
      const selectedById = Number(selectedId) && Number(selectedId) === Number(item.id);
      const selectedByDescription =
        !Number(selectedId) && normalizedDescription && normalizeSearchValue(item.item) === normalizedDescription;
      return `<option value="${item.id}" data-cost="${item.costo}" ${selectedById || selectedByDescription ? "selected" : ""}>${escapeHtml(item.item)}</option>`;
    })
    .join("")}`;
}

function updateBudgetEquipmentTotal() {
  const total = budgetEquipmentDraftRows.reduce(
    (sum, row) => sum + calculateBudgetEquipmentSubtotal(row),
    0
  );
  budgetEquipmentTotal.textContent = formatCurrency(total);
}

function updateBudgetContractorTotal() {
  const total = budgetContractorDraftRows.reduce(
    (sum, row) => sum + calculateBudgetContractorSubtotal(row),
    0
  );
  budgetContractorTotal.textContent = formatCurrency(total);
}

function updateBudgetLaborTotal() {
  const total = budgetLaborDraftRows.reduce((sum, row) => sum + calculateBudgetLaborSubtotal(row), 0);
  budgetLaborTotal.textContent = formatCurrency(total);
}

function updateBudgetMaterialsTotal() {
  const total = budgetMaterialDraftRows.reduce(
    (sum, row) => sum + calculateBudgetMaterialSubtotal(row),
    0
  );
  budgetMaterialsTotal.textContent = formatCurrency(total);
}

function renderBudgetEquipmentRows() {
  const rows = sortByState(budgetEquipmentDraftRows, budgetEquipmentSort, (row, key) =>
    key === "subtotal" ? calculateBudgetEquipmentSubtotal(row) : row[key]
  );

  if (!rows.length) {
    budgetEquipmentRows.innerHTML = `<div class="budget-equipment-empty">Sin costos agregados</div>`;
    updateBudgetEquipmentTotal();
    return;
  }

  budgetEquipmentRows.innerHTML = rows
    .map(
      (row) => `
        <article class="budget-equipment-row" data-row-id="${row.id}">
          <select data-field="itemPrecioId" aria-label="Item">${budgetEquipmentOptions(row.itemPrecioId, row.item)}</select>
          <input data-field="cantidadEquipos" type="number" min="0" step="1" value="${normalizeWholeQuantity(row.cantidadEquipos)}" aria-label="Cantidad de equipos" />
          <input data-field="cantidadUm" type="number" min="0" step="1" value="${normalizeWholeQuantity(row.cantidadUm)}" aria-label="Cantidad UM" />
          <input data-field="unidadMedida" value="${escapeHtml(row.unidadMedida)}" aria-label="Unidad de medida" />
          <input class="budget-money-input" data-field="costoUnitario" inputmode="decimal" value="${formatCurrency(row.costoUnitario)}" aria-label="Costo unitario" />
          <input class="budget-money-input" data-field="flete" inputmode="decimal" value="${formatCurrency(row.flete)}" aria-label="Flete" />
          <b data-subtotal>${formatCurrency(calculateBudgetEquipmentSubtotal(row))}</b>
          <button class="icon-button remove-budget-equipment-row" type="button" aria-label="Eliminar costo" data-row-id="${row.id}">x</button>
        </article>
      `
    )
    .join("");
  updateBudgetEquipmentTotal();
}

function renderBudgetContractorRows() {
  const rows = sortByState(budgetContractorDraftRows, budgetContractorSort, (row, key) =>
    key === "subtotal" ? calculateBudgetContractorSubtotal(row) : row[key]
  );

  if (!rows.length) {
    budgetContractorRows.innerHTML = `<div class="budget-equipment-empty">Sin costos agregados</div>`;
    updateBudgetContractorTotal();
    return;
  }

  budgetContractorRows.innerHTML = rows
    .map(
      (row) => `
        <article class="budget-equipment-row budget-contractor-row" data-row-id="${row.id}">
          <input data-field="descripcion" value="${escapeHtml(row.descripcion)}" aria-label="Descripción" />
          <input data-field="cantidad" type="number" min="0" step="1" value="${normalizeWholeQuantity(row.cantidad)}" aria-label="Cantidad" />
          <input class="budget-money-input" data-field="costo" inputmode="decimal" value="${formatCurrency(row.costo)}" aria-label="Costo" />
          <b data-subtotal>${formatCurrency(calculateBudgetContractorSubtotal(row))}</b>
          <button class="icon-button remove-budget-contractor-row" type="button" aria-label="Eliminar costo" data-row-id="${row.id}">x</button>
        </article>
      `
    )
    .join("");
  updateBudgetContractorTotal();
}

function renderBudgetLaborRows() {
  const rows = sortByState(budgetLaborDraftRows, budgetLaborSort, (row, key) => {
    if (key === "horasTotal") return calculateBudgetLaborHours(row);
    if (key === "subtotal") return calculateBudgetLaborSubtotal(row);
    return row[key];
  });

  if (!rows.length) {
    budgetLaborRows.innerHTML = `<div class="budget-equipment-empty">Sin costos agregados</div>`;
    updateBudgetLaborTotal();
    return;
  }

  budgetLaborRows.innerHTML = rows
    .map(
      (row) => `
        <article class="budget-equipment-row budget-labor-row" data-row-id="${row.id}">
          <select data-field="itemPrecioId" aria-label="Descripción">${budgetLaborOptions(row.itemPrecioId, row.descripcion)}</select>
          <input data-field="personas" type="number" min="0" step="1" value="${normalizeWholeQuantity(row.personas)}" aria-label="Personas" />
          <input data-field="horas" type="number" min="0" step="1" value="${normalizeWholeQuantity(row.horas)}" aria-label="Horas" />
          <b data-hours-total>${normalizeWholeQuantity(calculateBudgetLaborHours(row))}</b>
          <input class="budget-money-input" data-field="costoHora" inputmode="decimal" value="${formatCurrency(row.costoHora)}" aria-label="Costo por hora" />
          <input data-field="comidas" type="number" min="0" step="1" value="${normalizeWholeQuantity(row.comidas)}" aria-label="Comidas" />
          <input class="budget-money-input" data-field="costoComida" inputmode="decimal" value="${formatCurrency(row.costoComida)}" aria-label="Costo comida" />
          <b data-subtotal>${formatCurrency(calculateBudgetLaborSubtotal(row))}</b>
          <button class="icon-button remove-budget-labor-row" type="button" aria-label="Eliminar costo" data-row-id="${row.id}">x</button>
        </article>
      `
    )
    .join("");
  updateBudgetLaborTotal();
}

function renderBudgetMaterialRows() {
  const rows = sortByState(budgetMaterialDraftRows, budgetMaterialSort, (row, key) =>
    key === "subtotal" ? calculateBudgetMaterialSubtotal(row) : row[key]
  );

  if (!rows.length) {
    budgetMaterialsRows.innerHTML = `<div class="budget-equipment-empty">Sin materiales agregados</div>`;
    updateBudgetMaterialsTotal();
    return;
  }

  budgetMaterialsRows.innerHTML = rows
    .map(
      (row) => `
        <article class="budget-equipment-row budget-material-row" data-row-id="${row.id}">
          <input data-field="descripcion" value="${escapeHtml(row.descripcion)}" aria-label="Descripción" />
          <input data-field="cantidad" type="number" min="0" step="1" value="${normalizeWholeQuantity(row.cantidad)}" aria-label="Cantidad" />
          <input data-field="unidad" value="${escapeHtml(row.unidad)}" aria-label="Unidad" />
          <input class="budget-money-input" data-field="costo" inputmode="decimal" value="${formatCurrency(row.costo)}" aria-label="Costo" />
          <b data-subtotal>${formatCurrency(calculateBudgetMaterialSubtotal(row))}</b>
          <button class="icon-button remove-budget-material-row" type="button" aria-label="Eliminar material" data-row-id="${row.id}">x</button>
        </article>
      `
    )
    .join("");
  updateBudgetMaterialsTotal();
}

function renderSupplierQuoteFiles() {
  if (!budgetSupplierQuoteFiles.length) {
    supplierQuoteRows.innerHTML = `<div class="budget-documents-row"><span>Cotización proveedor</span><span>Sin archivos cargados</span><span></span></div>`;
    return;
  }

  supplierQuoteRows.innerHTML = budgetSupplierQuoteFiles
    .map(
      (item) => `
        <div class="budget-documents-row">
          <span>Cotización proveedor</span>
          <span>${escapeHtml(item.file.name)}</span>
          <span>
            <button class="small-button danger-button remove-supplier-quote" type="button" data-file-id="${item.id}">
              Eliminar
            </button>
          </span>
        </div>
      `
    )
    .join("");
}

function renderBudgetSupplierQuoteDocuments(files = [], options = {}) {
  const {
    eyebrow = "Archivos del presupuesto",
    title = "Documentos del proyecto",
    emptyText = "Sin archivos cargados",
    canDelete = false
  } = options;
  return `
    <section class="budget-documents-card">
      <div class="budget-documents-heading">
        <div>
          <span>${escapeHtml(eyebrow)}</span>
          <h3>${escapeHtml(title)}</h3>
        </div>
      </div>
      <div class="budget-documents-table">
        <div class="budget-documents-head">
          <span>Tipo</span>
          <span>Nombre</span>
          <span>Acción</span>
        </div>
        ${
          files.length
            ? files
                .map(
                  (file) => `
                    <div class="budget-documents-row">
                      <span>${escapeHtml(file.tipo || "Cotización proveedor")}</span>
                      <span>${renderFileNameLink(file)}</span>
                      <span class="document-actions">
                        ${renderFileViewButton(file)}
                        ${
                          canDelete
                            ? `<button class="small-button danger-button icon-only-button" type="button" aria-label="Eliminar archivo" data-budget-file-delete="${file.id}">X</button>`
                            : ""
                        }
                      </span>
                    </div>
                  `
                )
                .join("")
            : `<div class="budget-documents-row"><span>Documento</span><span>${escapeHtml(emptyText)}</span><span></span></div>`
        }
      </div>
    </section>
  `;
}

function budgetRowsFromCosts(costs = {}) {
  budgetEquipmentDraftRows = (costs.equipos || []).map((row) => ({
    ...newBudgetEquipmentRow(),
    itemPrecioId: row.itemPrecioId || "",
    item: row.item || "",
    cantidadEquipos: normalizeWholeQuantity(row.cantidadEquipos),
    cantidadUm: normalizeWholeQuantity(row.cantidadUm),
    unidadMedida: row.unidadMedida || "",
    costoUnitario: Number(row.costoUnitario || 0),
    flete: Number(row.flete || 0)
  }));
  budgetContractorDraftRows = (costs.contratistas || []).map((row) => ({
    ...newBudgetContractorRow(),
    descripcion: row.descripcion || "",
    cantidad: normalizeWholeQuantity(row.cantidad),
    costo: Number(row.costo || 0)
  }));
  budgetLaborDraftRows = (costs.manoObra || []).map((row) => ({
    ...newBudgetLaborRow(),
    itemPrecioId: row.itemPrecioId || "",
    descripcion: row.descripcion || "",
    personas: normalizeWholeQuantity(row.personas),
    horas: normalizeWholeQuantity(row.horas),
    costoHora: Number(row.costoHora || 0),
    comidas: normalizeWholeQuantity(row.comidas),
    costoComida: Number(row.costoComida || 0)
  }));
  budgetMaterialDraftRows = (costs.materiales || []).map((row) => ({
    ...newBudgetMaterialRow(),
    descripcion: row.descripcion || "",
    cantidad: normalizeWholeQuantity(row.cantidad),
    unidad: row.unidad || "",
    costo: Number(row.costo || 0)
  }));
}

function populateBudgetForm(data) {
  const budget = data.budget;
  editingBudgetId = budget.id;
  budgetModalTitle.textContent = "Editar presupuesto";
  saveBudgetButton.textContent = "Guardar cambios";
  toggleBudgetCostsButton.textContent = "Ver costos";

  const companyMatch = String(budget.empresa || "").trim() ||
    String(budgetClientsCache.find((client) => Number(client.id) === Number(budget.clienteId || 0))?.empresa || "").trim();
  if (budget.clienteId && !budgetClientsCache.some((client) => Number(client.id) === Number(budget.clienteId))) {
    budgetClientsCache.push({
      id: Number(budget.clienteId),
      empresa: companyMatch,
      sucursalId: budget.sucursalId || null,
      sucursal: budget.sucursal || "",
      nombre: budget.clienteUsuario || ""
    });
  }
  if (companyMatch && ![...budgetCompanySelect.options].some((option) => branchLabelsMatch(option.value, companyMatch))) {
    budgetCompanySelect.add(new Option(companyMatch, companyMatch));
  }
  budgetCompanySelect.value = companyMatch;
  refreshSearchableSelect(budgetCompanySelect);
  const display = getBudgetDisplayFields(budget);
  syncBudgetBranchOptions(budget.sucursalId || "", display.sucursal || "");
  budgetForm.elements.clienteUsuario.value = display.clienteUsuario || "";
  const legacyContact = budgetClientsCache.find((client) =>
    normalizeSearchValue(client.empresa) === normalizeSearchValue(companyMatch) &&
    branchLabelsMatch(client.sucursal, selectedBudgetBranchName()) &&
    normalizeSearchValue(client.nombre) === normalizeSearchValue(display.clienteUsuario || "")
  );
  const selectedClientId = Number(budget.clienteId || 0) || Number(legacyContact?.id || 0) || 0;
  if (budgetClientUserInput) budgetClientUserInput.dataset.selectedClientId = selectedClientId ? String(selectedClientId) : "";
  syncBudgetClientUserOptions();
  refreshBudgetClientAutocomplete();
  budgetForm.elements.area.value = budget.area || "";
  renderBudgetOwnerOptions(budget.ownerId || currentUser?.id || null);
  budgetForm.elements.tituloProyecto.value = budget.tituloProyecto || "";
  budgetManualFolioToggle.checked = isCurrentUserSuperAdmin() && Boolean(budget.folioManual);
  syncBudgetManualFolioAccess();
  if (budgetSinWarrantyToggle) budgetSinWarrantyToggle.checked = Boolean(budget.sinGarantia);
  budgetFolioPreview.value = budget.folio || "";
  budgetFolioPreview.readOnly = !isCurrentUserSuperAdmin() || !budgetManualFolioToggle.checked;
  budgetRowsFromCosts(data.costs || {});
  renderBudgetEquipmentRows();
  renderBudgetContractorRows();
  renderBudgetLaborRows();
  renderBudgetMaterialRows();
}

function resetBudgetForm() {
  budgetForm.reset();
  smartAutocompleteControllers.get(budgetClientUserInput)?.clear();
  if (budgetClientUserInput) delete budgetClientUserInput.dataset.selectedClientId;
  refreshSearchableSelect(budgetCompanySelect);
  editingBudgetId = null;
  budgetModalTitle.textContent = "Nuevo presupuesto";
  saveBudgetButton.textContent = "Guardar presupuesto";
  toggleBudgetCostsButton.textContent = "Agregar costos";
  budgetFormStatus.textContent = "";
  syncBudgetBranchOptions();
  renderBudgetOwnerOptions(currentUser?.id || null);
  budgetFolioPreview.value = "";
  budgetFolioPreview.readOnly = true;
  syncBudgetManualFolioAccess();
  if (budgetSinWarrantyToggle) budgetSinWarrantyToggle.checked = false;
  budgetCostsPanel.classList.add("hidden");
  budgetEquipmentDraftRows = [];
  budgetContractorDraftRows = [];
  budgetLaborDraftRows = [];
  budgetMaterialDraftRows = [];
  budgetSupplierQuoteFiles = [];
  budgetEquipmentSort = { key: "", direction: "asc" };
  budgetContractorSort = { key: "", direction: "asc" };
  budgetLaborSort = { key: "", direction: "asc" };
  budgetMaterialSort = { key: "", direction: "asc" };
  renderBudgetEquipmentRows();
  renderBudgetContractorRows();
  renderBudgetLaborRows();
  renderBudgetMaterialRows();
  renderSupplierQuoteFiles();
}

async function openBudgetModal(data = null) {
  if (data instanceof Event) data = null;
  resetBudgetForm();
  budgetInlineEditorOpen = true;
  budgetModal.classList.add("hidden");
  budgetsListView.classList.add("hidden");
  budgetDetailView.classList.remove("hidden");
  budgetDetailActions.classList.add("hidden");
  budgetDetailContent.innerHTML = `
    <button class="ghost-button budget-inline-back-button" type="button" data-budget-inline-back>← Volver</button>
  `;
  budgetForm.classList.add("budget-inline-form");
  budgetDetailContent.appendChild(budgetForm);
  try {
    await loadBudgetCatalogs();
    if (data?.budget) populateBudgetForm(data);
  } catch (error) {
    budgetFormStatus.textContent = error.message;
  }
  focusSearchableSelect(budgetCompanySelect);
}

function closeBudgetModal() {
  if (budgetInlineEditorOpen) {
    restoreBudgetInlineForm();
    activeBudgetDetailId = null;
    saveModuleLocation("presupuesto");
    budgetDetailActions.classList.add("hidden");
    budgetDetailView.classList.add("hidden");
    budgetsListView.classList.remove("hidden");
    loadBudgets();
    return;
  }
  budgetModal.classList.add("hidden");
}

function restoreBudgetInlineForm() {
  if (!budgetInlineEditorOpen) return;
  budgetInlineEditorOpen = false;
  budgetForm.classList.remove("budget-inline-form");
  if (budgetFormOriginalParent && budgetForm.parentElement !== budgetFormOriginalParent) {
    budgetFormOriginalParent.appendChild(budgetForm);
  }
}

function isLockableActionButton(button) {
  if (!button || button.disabled) return false;
  // Este formulario administra su propio estado de carga. Si entra al bloqueo global,
  // el submit puede quedarse visualmente en "Procesando..." antes de ejecutar su petición.
  if (button.closest("#accountsPayableCommissionDiscountForm")) return false;
  if (
    button.matches(
      ".sortable-column, .columns-button, .nav-item, .launcher-button, .launcher-card, .launcher-close, .modal-close, .ghost-button, .theme-toggle, .home-link-button"
    )
  ) {
    return false;
  }
  return button.matches(
    ".primary-button, .small-button, .success-button, .danger-button, .create-button, .create-user-button, .secondary-action-button, .dark-button"
  );
}

function lockActionButton(button, fallbackMs = 18000) {
  if (!button) return () => {};
  if (lockedActionButtons.has(button)) return () => unlockActionButton(button);
  const originalText = button.textContent;
  const timeoutId = window.setTimeout(() => unlockActionButton(button), fallbackMs);
  lockedActionButtons.set(button, { originalText, timeoutId });
  button.disabled = true;
  button.classList.add("is-action-busy");
  if (!button.classList.contains("icon-only-button")) button.textContent = "Procesando...";
  return () => unlockActionButton(button);
}

function unlockActionButton(button) {
  const state = lockedActionButtons.get(button);
  if (!state) return;
  window.clearTimeout(state.timeoutId);
  lockedActionButtons.delete(button);
  button.disabled = false;
  button.classList.remove("is-action-busy");
  if (!button.classList.contains("icon-only-button")) button.textContent = state.originalText;
}

function ensureToastRegion() {
  let region = document.querySelector("#appToastRegion");
  if (region) return region;
  region = document.createElement("div");
  region.id = "appToastRegion";
  region.className = "app-toast-region";
  region.setAttribute("aria-live", "polite");
  region.setAttribute("aria-atomic", "false");
  document.body.appendChild(region);
  return region;
}

function showAppToast({ type = "success", title = "", message = "", details = "", duration = 5200 } = {}) {
  const region = ensureToastRegion();
  const toast = document.createElement("div");
  const normalizedType = type === "error" ? "error" : "success";
  toast.className = `app-toast app-toast-${normalizedType}`;
  toast.setAttribute("role", normalizedType === "error" ? "alert" : "status");
  const safeTitle = title || (normalizedType === "error" ? "No se pudo completar" : "Acción completada");
  toast.innerHTML = `
    <div class="app-toast-icon" aria-hidden="true">${normalizedType === "error" ? "!" : "✓"}</div>
    <div class="app-toast-copy">
      <strong>${escapeHtml(safeTitle)}</strong>
      <span>${escapeHtml(message || (normalizedType === "error" ? "Ocurrió un error inesperado." : "La operación se realizó correctamente."))}</span>
      ${details ? `<small>${escapeHtml(details)}</small>` : ""}
    </div>
    <button class="app-toast-close" type="button" aria-label="Cerrar notificación">×</button>
  `;
  const close = () => {
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 180);
  };
  toast.querySelector(".app-toast-close")?.addEventListener("click", close);
  region.appendChild(toast);
  window.setTimeout(close, Math.max(2200, Number(duration || 0)));
  return toast;
}

function showSuccessToast(message, title = "Acción completada") {
  return showAppToast({ type: "success", title, message });
}

function showErrorToast(error, fallback = "No se pudo completar la acción.", title = "No se pudo completar") {
  const message = typeof error === "string" ? error : error?.message || fallback;
  const status = Number(error?.status || 0);
  return showAppToast({
    type: "error",
    title,
    message,
    details: status ? `Código de respuesta: ${status}` : "",
    duration: 7200
  });
}

async function api(path, options = {}) {
  const actionButton = pendingActionButton;
  pendingActionButton = null;
  const unlock = actionButton ? lockActionButton(actionButton) : () => {};
  const method = String(options.method || "GET").toUpperCase();
  const shouldToast = options.toast !== false;
  const { toast: _toastPreference, ...fetchOptions } = options;
  const requestHeaders = fetchOptions.body instanceof FormData
    ? { ...(fetchOptions.headers || {}) }
    : { "Content-Type": "application/json", ...(fetchOptions.headers || {}) };
  try {
    const response = await fetch(path, {
      credentials: "same-origin",
      ...fetchOptions,
      headers: requestHeaders
    });

    const data = await response.json().catch(() => ({
      message: response.status === 404 ? "La ruta solicitada no existe en el servidor. Actualiza server.js y reinicia Node." : ""
    }));
    if (!response.ok) {
      if (response.status === 401 && !path.includes("/api/auth/login") && !path.includes("/api/session")) {
        showLogin();
      }
      const error = new Error(data.message || "Ocurrió un error inesperado.");
      error.status = response.status;
      error.code = data.code || "";
      error.data = data;
      error.batch = data.batch || null;
      if (shouldToast) showErrorToast(error);
      throw error;
    }

    if (shouldToast && !["GET", "HEAD"].includes(method)) {
      showSuccessToast(data.message || "La operación se guardó correctamente.");
    }
    return data;
  } finally {
    unlock();
  }
}

function renderGlobalResults(results) {
  if (!results.length) {
    globalSearchResults.innerHTML = `<div class="empty-state">Sin resultados</div>`;
    globalSearchResults.classList.remove("hidden");
    return;
  }

  globalSearchResults.innerHTML = results
    .map(
      (result) => {
        const target = getGlobalSearchTarget(result.table);
        const targetLabel = target ? getModuleLabel(target.module) : "Resultado";
        return `
        <button class="search-result" type="button" data-global-result-module="${escapeHtml(target?.module || "")}" data-global-result-search="${escapeHtml(lastGlobalSearchTerm)}">
          <strong>${escapeHtml(result.table)}</strong>
          <span>${escapeHtml(result.text)}</span>
          <small>${escapeHtml(target ? `Abrir ${targetLabel}` : "Sin acceso directo")}</small>
        </button>
      `;
      }
    )
    .join("");
  globalSearchResults.classList.remove("hidden");
}

function getModuleLabel(moduleName) {
  return (
    document.querySelector(`.nav-item[data-module="${moduleName}"]`)?.textContent?.trim() ||
    document.querySelector(`[data-module="${moduleName}"] strong`)?.textContent?.trim() ||
    moduleName
  );
}

function getGlobalSearchTarget(tableName = "") {
  const table = String(tableName || "").toLowerCase();
  const moduleMap = [
    { module: "usuarios", tables: ["usuarios", "roles", "roles_permisos", "usuario_permisos", "usuario_roles_temporales"] },
    { module: "clientes", tables: ["clientes", "cliente_archivos"] },
    { module: "proveedores", tables: ["proveedores", "proveedor_archivos"] },
    { module: "lista-precios", tables: ["lista_precios"] },
    { module: "gastos-fijos", tables: ["gastos_fijos"] },
    {
      module: "presupuesto",
      tables: [
        "presupuestos",
        "presupuesto_archivos",
        "presupuesto_po_cliente",
        "presupuesto_costos_equipos",
        "presupuesto_costos_contratistas",
        "presupuesto_costos_mano_obra",
        "presupuesto_costos_materiales",
        "presupuesto_transferencias",
        "presupuesto_adicionales",
        "cotizaciones_cliente",
        "cotizacion_cliente_partidas"
      ]
    },
    {
      module: "compras",
      tables: ["ocp_proveedor", "ocp_proveedor_partidas", "ocp_proveedor_archivos", "ocgf_compras", "ocgf_ordenes", "ocgf_orden_partidas", "ocgf_archivos"]
    },
    { module: "cuentas-cobrar", tables: ["cuentas_por_cobrar", "cuentas_por_cobrar_archivos"] },
    { module: "cuentas-pagar", tables: ["cuentas_por_pagar", "cuentas_por_pagar_archivos"] },
    { module: "comisiones", tables: ["comisiones"] },
    { module: "tareas", tables: ["tareas"] }
  ];
  return moduleMap.find((item) => item.tables.includes(table)) || null;
}

async function openGlobalSearchResult(moduleName, searchTerm) {
  if (!moduleName || !canAccessModule(moduleName)) return;
  globalSearchResults.classList.add("hidden");
  setActiveModule(moduleName);

  const value = String(searchTerm || "").trim();
  const inputByModule = {
    usuarios: usersSearch,
    clientes: clientsSearch,
    proveedores: providersSearch,
    "lista-precios": pricesSearch,
    "gastos-fijos": fixedExpensesSearch,
    presupuesto: budgetsSearch,
    compras: purchaseSearch,
    "cuentas-cobrar": accountsReceivableSearch,
    "cuentas-pagar": accountsPayableSearch,
    comisiones: commissionsSearch,
    tareas: tasksSearch
  };
  const input = inputByModule[moduleName];
  if (input) {
    input.value = value;
    input.focus();
  }

  if (moduleName === "usuarios") await loadUsers();
  if (moduleName === "clientes") await loadClients();
  if (moduleName === "proveedores") await loadProviders();
  if (moduleName === "lista-precios") await loadPriceItems();
  if (moduleName === "gastos-fijos") await loadFixedExpenses();
  if (moduleName === "presupuesto") await loadBudgets();
  if (moduleName === "compras") await loadPurchasesModule();
  if (moduleName === "cuentas-cobrar") renderAccountsReceivable({ accounts: accountsReceivableCache });
  if (moduleName === "cuentas-pagar") renderAccountsPayable({ accounts: accountsPayableCache, ocgfAccounts: accountsPayableOcgfCache, commissionAccounts: accountsPayableCommissionCache });
  if (moduleName === "comisiones") await loadCommissionsModule();
  if (moduleName === "tareas") await loadTasksModule();
}

async function runGlobalSearch() {
  const term = globalSearchInput.value.trim();
  lastGlobalSearchTerm = term;
  if (term.length < 2) {
    globalSearchResults.classList.add("hidden");
    globalSearchResults.innerHTML = "";
    return;
  }

  try {
    const data = await api(`/api/search?q=${encodeURIComponent(term)}`);
    renderGlobalResults(data.results || []);
  } catch (error) {
    globalSearchResults.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    globalSearchResults.classList.remove("hidden");
  }
}

function renderCheckOptions(container, items, name) {
  container.innerHTML = items
    .map(
      (item) => `
        <label class="check-row">
          <input type="checkbox" name="${name}" value="${item.id}" data-permission-name="${escapeHtml(item.nombre || "")}" />
          <span>${escapeHtml(item.label)}</span>
        </label>
      `
    )
    .join("");
}

function renderBranchPermissionScopes(container, branches = [], modulePermissions = [], operationPermissions = []) {
  if (!container) return;
  if (!branches.length) {
    container.innerHTML = `<div class="empty-state">No hay sucursales activas para asignar.</div>`;
    return;
  }
  const renderPermissions = (items, type) => items
    .map((item) => `
      <label class="check-row">
        <input
          type="checkbox"
          data-branch-permission-id="${Number(item.id || 0)}"
          data-branch-permission-name="${escapeHtml(item.nombre || "")}"
          data-branch-permission-type="${type}"
        />
        <span>${escapeHtml(item.label || item.nombre || "")}</span>
      </label>
    `)
    .join("");

  container.innerHTML = branches
    .map((branch) => `
      <details class="user-permission-section" data-branch-scope data-branch-id="${Number(branch.id || 0)}">
        <summary><strong>${escapeHtml(branch.label || [branch.empresa, branch.sucursal].filter(Boolean).join(" · "))}</strong></summary>
        <p class="form-helper">Módulos visibles y registros que podrá consultar de esta sucursal.</p>
        <div class="check-grid" data-branch-module-permissions>
          ${renderPermissions(modulePermissions, "module")}
        </div>
        <p class="form-helper">Acciones permitidas únicamente dentro de esta sucursal.</p>
        <div class="check-grid" data-branch-operation-permissions>
          ${renderPermissions(operationPermissions, "operation")}
        </div>
      </details>
    `)
    .join("");
}

async function loadUserCatalogs() {
  if (catalogsLoaded) return;

  const data = await api("/api/users/catalogs");
  userPermissionCatalog = data || { roleDefaults: {}, permissionByName: {} };
  roleSelect.innerHTML = `<option value="">Selecciona un rol</option>${(data.roles || [])
    .map((role) => `<option value="${role.id}">${escapeHtml(role.label)}</option>`)
    .join("")}`;
  renderCheckOptions(specialPermissions, data.modulePermissions || data.specialPermissions || [], "permisosEspeciales");
  renderCheckOptions(operationPermissions, data.operationPermissions || [], "permisosEspeciales");
  renderCheckOptions(temporaryRoles, data.roles || [], "rolesTemporales");
  renderBranchPermissionScopes(
    branchAccessScopes,
    data.branchScopes || [],
    data.branchModulePermissions || [],
    data.branchOperationPermissions || []
  );
  catalogsLoaded = true;
  setSuperAdminRoleState();
}

function renderTagList(items = [], emptyText = "Sin asignar") {
  if (!items.length) return `<span class="tag is-empty">${escapeHtml(emptyText)}</span>`;
  return `<span class="tag-list">${items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</span>`;
}

function getUserInitials(user = {}) {
  const fullName = `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario || "U";
  return fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
}

function getUserRoleTone(role = "") {
  const normalized = normalizeSearchValue(role);
  if (normalized.includes("superadmin")) return "superadmin";
  if (normalized.includes("administracion")) return "admin";
  if (normalized.includes("compras")) return "compras";
  if (normalized.includes("supervisor")) return "supervisor";
  return "default";
}

function getClientInitials(client = {}) {
  const source = String(client.empresa || client.nombre || "C").trim();
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
}

function getProviderInitials(provider = {}) {
  const source = String(provider.empresa || "P").trim();
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
}

function renderUsers(users) {
  usersCache = users;
  if (document.activeElement === usersSearch) smartAutocompleteControllers.get(usersSearch)?.render();

  if (!users.length) {
    renderPagination(usersCardList, "users", 0, () => renderUsers(usersCache));
    usersCardList.innerHTML = `<div class="empty-state">Sin usuarios registrados</div>`;
    return;
  }

  const rows = paginateRows(usersCardList, "users", users, () => renderUsers(usersCache));
  usersCardList.innerHTML = rows
    .map(
      (user) => {
        const fullName = `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario;
        const permissions = (user.permisosEspeciales || []).map((permission) =>
          String(permission || "").replace("botones:", "").replace("modulo:", "")
        );
        const previewPermissions = permissions.slice(0, 3);
        const extraPermissions = Math.max(0, permissions.length - previewPermissions.length);
        const roleTone = getUserRoleTone(user.rol);
        return `
          <article class="user-card user-access-card">
            <div class="user-card-header">
              <div class="user-card-avatar" data-role-tone="${escapeHtml(roleTone)}">${escapeHtml(getUserInitials(user))}</div>
              <div>
                <h2>${escapeHtml(fullName)}</h2>
                <span class="user-username">Usuario: ${escapeHtml(user.usuario || "Sin usuario")}</span>
              </div>
              <span class="user-role-pill ${escapeHtml(roleTone)}">${escapeHtml(user.rol || "Sin rol")}</span>
            </div>

            <div class="user-card-body">
              <span><strong>Estado</strong><b>${user.activo === false ? "Inactivo" : "Activo"}</b></span>
              <span><strong>Proyectos asignados</strong><b>${Number(user.proyectosCount || 0)}</b></span>
              <span><strong>Comisión supervisor</strong><b>${Number(user.comisionSupervisor || 0).toFixed(2)}%</b></span>
              <span><strong>Banco</strong><b>${escapeHtml(user.banco || "Sin banco")}</b></span>
              <span><strong>Cuenta</strong><b>${escapeHtml(user.cuenta || "Sin cuenta")}</b></span>
              <span><strong>CLABE</strong><b>${escapeHtml(user.clabe || "Sin CLABE")}</b></span>
            </div>

            <div class="user-permission-preview">
              <strong>Permisos</strong>
              ${renderTagList(previewPermissions, "Sin permisos especiales")}
              ${extraPermissions ? `<span class="tag more-tag">+${extraPermissions} más</span>` : ""}
            </div>

            <div class="user-permission-preview">
              <strong>Roles adicionales</strong>
              ${renderTagList(user.rolesTemporales || [], "Sin roles adicionales")}
            </div>

            <div class="user-permission-preview">
              <strong>Permisos por sucursal</strong>
              ${renderTagList(user.alcancesSucursalResumen || user.sucursalesAcceso || [], "Sin permisos por sucursal")}
            </div>

            <div class="user-card-actions">
              ${
                canManageUsers()
                  ? `<button class="small-button edit-user-button" type="button" data-user-id="${user.id}">
                       <i class="ri-pencil-line" aria-hidden="true"></i> Editar
                     </button>
                     <button class="small-button danger-button delete-user-button" type="button" data-user-id="${user.id}" aria-label="Eliminar usuario ${escapeHtml(
                       fullName
                     )}">
                       <i class="ri-delete-bin-line" aria-hidden="true"></i>
                     </button>`
                  : ""
              }
            </div>
          </article>
        `;
      }
    )
    .join("");
}

async function loadUsers() {
  const search = usersSearch.value.trim();
  const data = await api(`/api/users?search=${encodeURIComponent(search)}`);
  renderUsers(data.users || []);
}

async function loadUsersModule() {
  try {
    await loadUserCatalogs();
    await loadUsers();
  } catch (error) {
    usersCardList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function projectOwnerNameSimilarity(a, b) {
  const normalize = (value) => normalizeSearchValue(value).replace(/[^a-z0-9]+/g, " ").trim();
  const left = normalize(a);
  const right = normalize(b);
  if (!left || !right) return 0;
  if (left === right) return 1;
  const leftTokens = left.split(/\s+/).filter(Boolean);
  const rightTokens = right.split(/\s+/).filter(Boolean);
  const intersection = leftTokens.filter((token) => rightTokens.includes(token)).length;
  const union = new Set([...leftTokens, ...rightTokens]).size || 1;
  const tokenScore = intersection / union;
  const prefixScore = left.startsWith(right) || right.startsWith(left)
    ? Math.min(left.length, right.length) / Math.max(left.length, right.length)
    : 0;
  return Math.max(tokenScore, prefixScore);
}

function selectedProjectOwnerSource() {
  const key = String(projectOwnerSourceSelect?.value || "");
  return projectOwnerAuditCache.sources.find((source) => source.key === key) || null;
}

function projectOwnerSourceProjects(source = selectedProjectOwnerSource()) {
  if (!source) return [];
  if (source.kind === "user") {
    return projectOwnerAuditCache.projects.filter((project) => Number(project.ownerId || 0) === Number(source.sourceUserId || 0));
  }
  const alias = normalizeSearchValue(source.alias || source.label || "");
  return projectOwnerAuditCache.projects.filter((project) =>
    normalizeSearchValue(project.legacyOwner || "") === alias &&
    (!Number(project.ownerId || 0) || normalizeSearchValue(project.ownerNombre || "") !== alias)
  );
}

function renderProjectOwnerTargetOptions(source = selectedProjectOwnerSource()) {
  if (!projectOwnerTargetSelect) return;
  const activeUsers = projectOwnerAuditCache.users.filter((user) => user.activo !== false);
  const available = activeUsers.filter((user) => source?.kind !== "user" || Number(user.id) !== Number(source.sourceUserId));
  projectOwnerTargetSelect.innerHTML = `<option value="">Selecciona el usuario correcto</option>${available.map((user) => {
    const label = user.nombreCompleto || `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario || `Usuario ${user.id}`;
    return `<option value="${Number(user.id)}">${escapeHtml(label)}${user.usuario ? ` · ${escapeHtml(user.usuario)}` : ""}</option>`;
  }).join("")}`;

  let suggestedId = Number(source?.suggestedUserId || 0);
  if (!available.some((user) => Number(user.id) === suggestedId) && source) {
    let best = null;
    available.forEach((user) => {
      const label = user.nombreCompleto || `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario || "";
      const score = projectOwnerNameSimilarity(source.label || source.alias || "", label);
      if (!best || score > best.score) best = { id: Number(user.id), score };
    });
    if (best && best.score >= 0.5) suggestedId = best.id;
  }
  if (suggestedId && available.some((user) => Number(user.id) === suggestedId)) {
    projectOwnerTargetSelect.value = String(suggestedId);
  }
}

function renderProjectOwnerAuditSelection() {
  const source = selectedProjectOwnerSource();
  if (!source) {
    if (projectOwnerProjectList) projectOwnerProjectList.innerHTML = `<div class="empty-state">Selecciona un nombre o usuario para revisar sus proyectos.</div>`;
    if (projectOwnerDeactivateSourceField) projectOwnerDeactivateSourceField.classList.add("hidden");
    if (projectOwnerNormalizeLegacy?.closest("label")) projectOwnerNormalizeLegacy.closest("label").classList.add("hidden");
    renderProjectOwnerTargetOptions(null);
    return;
  }

  renderProjectOwnerTargetOptions(source);
  const isLegacy = source.kind === "legacy";
  projectOwnerDeactivateSourceField?.classList.toggle("hidden", isLegacy);
  projectOwnerNormalizeLegacy?.closest("label")?.classList.toggle("hidden", !isLegacy);
  if (projectOwnerDeactivateSource) projectOwnerDeactivateSource.checked = false;
  if (projectOwnerNormalizeLegacy) projectOwnerNormalizeLegacy.checked = true;

  const projects = projectOwnerSourceProjects(source);
  const similar = projectOwnerAuditCache.sources
    .filter((item) => item.key !== source.key)
    .map((item) => ({ item, score: projectOwnerNameSimilarity(source.label || source.alias || "", item.label || item.alias || "") }))
    .filter((entry) => entry.score >= 0.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  const similarText = similar.length
    ? `<div class="project-owner-similar-hint"><strong>Posibles duplicados:</strong> ${similar.map((entry) => escapeHtml(entry.item.label || entry.item.alias || "")).join(" · ")}</div>`
    : "";
  if (!projects.length) {
    projectOwnerProjectList.innerHTML = `${similarText}<div class="empty-state">Este registro ya no tiene proyectos pendientes de consolidar.</div>`;
    return;
  }
  projectOwnerProjectList.innerHTML = `${similarText}<div class="project-owner-project-toolbar"><strong>${projects.length} proyecto(s)</strong><button class="small-button" type="button" data-project-owner-select-all>Seleccionar todos</button></div>${projects.map((project) => `
    <label class="project-owner-project-row">
      <input type="checkbox" data-project-owner-project value="${Number(project.id)}" checked />
      <span>
        <strong>${escapeHtml(project.folio || `Proyecto ${project.id}`)}</strong>
        <small>${escapeHtml(project.tituloProyecto || "Sin título")} · ${escapeHtml(project.empresa || "Sin empresa")}</small>
        ${project.legacyOwner ? `<em>Histórico: ${escapeHtml(project.legacyOwner)}</em>` : ""}
      </span>
    </label>
  `).join("")}`;
}

async function loadProjectOwnerAudit() {
  if (!canManageProjectOwnerAudit()) return;
  if (projectOwnerAuditStatus) projectOwnerAuditStatus.textContent = "Cargando responsables y proyectos...";
  const data = await api("/api/project-owner-audit");
  projectOwnerAuditCache = {
    users: data.users || [],
    sources: data.sources || [],
    projects: data.projects || []
  };
  if (projectOwnerSourceSelect) {
    projectOwnerSourceSelect.innerHTML = `<option value="">Selecciona un registro</option>${projectOwnerAuditCache.sources.map((source) => {
      const prefix = source.kind === "legacy" ? "Histórico" : "Usuario";
      return `<option value="${escapeHtml(source.key)}">[${prefix}] ${escapeHtml(source.label || source.alias || "Sin nombre")} · ${Number(source.projectCount || 0)} proyecto(s)</option>`;
    }).join("")}`;
  }
  if (projectOwnerAuditStatus) {
    projectOwnerAuditStatus.textContent = "Selecciona un nombre repetido o un usuario duplicado. Nada se modifica hasta presionar Aplicar consolidación.";
  }
  renderProjectOwnerAuditSelection();
}


function getTodayInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderUserCreditUserOptions(selectedUserId = null) {
  if (!userCreditUserSelect) return;
  userCreditUserSelect.innerHTML = `<option value="">Selecciona una persona</option>${userCreditUsersCatalog
    .map((user) => {
      const label = `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario || "Usuario";
      return `<option value="${Number(user.id)}" data-search="${escapeHtml(`${label} ${user.usuario || ""}`)}" ${Number(selectedUserId) === Number(user.id) ? "selected" : ""}>${escapeHtml(
        `${label} · saldo ${formatCurrency(user.saldoAdeudoTotal || 0)}`
      )}</option>`;
    })
    .join("")}`;
  refreshSearchableSelect(userCreditUserSelect);
}

function openUserCreditModal(userId = null) {
  if (!canManageUserCredits() || !userCreditForm || !userCreditModal) return;
  userCreditForm.reset();
  userCreditFormStatus.textContent = "";
  userCreditForm.elements.fechaOtorgamiento.value = getTodayInputValue();
  userCreditForm.elements.monto.value = formatCurrency(0);
  renderUserCreditUserOptions(userId);
  userCreditModal.classList.remove("hidden");
  if (userId) userCreditForm.elements.monto?.focus();
  else focusSearchableSelect(userCreditUserSelect);
}

function closeUserCreditModal() {
  userCreditModal?.classList.add("hidden");
}

function openUserCreditPaymentModal(credit) {
  if (!credit || !canManageUserCredits() || !userCreditPaymentForm || !userCreditPaymentModal) return;
  activeUserCreditId = Number(credit.id);
  userCreditPaymentForm.reset();
  userCreditPaymentStatus.textContent = "";
  userCreditPaymentForm.elements.monto.value = formatCurrency(0);
  userCreditPaymentBalance.innerHTML = `
    <span>${escapeHtml(credit.usuarioNombre || credit.concepto || "Préstamo")}</span>
    <strong>Saldo pendiente: ${formatCurrency(credit.saldoPendiente || 0)}</strong>
  `;
  userCreditPaymentModal.classList.remove("hidden");
  userCreditPaymentForm.elements.monto.focus();
}

function closeUserCreditPaymentModal() {
  userCreditPaymentModal?.classList.add("hidden");
  activeUserCreditId = null;
}

function renderUserCreditsSummary(summary = {}) {
  if (!userCreditsSummary) return;
  userCreditsSummary.innerHTML = `
    <article><span>Saldo pendiente</span><strong>${formatCurrency(summary.saldoPendiente || 0)}</strong></article>
    <article><span>Total recuperado</span><strong>${formatCurrency(summary.totalRecuperado || 0)}</strong></article>
    <article><span>Personas con saldo</span><strong>${Number(summary.personasConSaldo || 0)}</strong></article>
    <article><span>Registros activos</span><strong>${Number(summary.creditosActivos || 0)}</strong></article>
  `;
}

function renderUserCreditsList(credits = []) {
  if (!userCreditsList) return;
  userCreditsCache = credits;
  if (!credits.length) {
    userCreditsList.innerHTML = `<div class="empty-state">Sin préstamos o adeudos para este filtro</div>`;
    return;
  }

  userCreditsList.innerHTML = `
    <div class="user-credits-table-head">
      <span>Persona</span><span>Concepto</span><span>Fecha</span><span>Original</span><span>Recuperado</span><span>Saldo</span><span>Acción</span>
    </div>
    ${credits
      .map(
        (credit) => `
          <article class="user-credits-table-row">
            <span class="table-stacked-cell"><strong>${escapeHtml(credit.usuarioNombre || credit.usuario || "Usuario")}</strong><small>${escapeHtml(
              credit.tipo === "ADEUDO" ? "Adeudo" : "Préstamo"
            )}</small></span>
            <span class="table-stacked-cell"><strong>${escapeHtml(credit.concepto || "Sin concepto")}</strong><small>${escapeHtml(
              credit.notas || ""
            )}</small></span>
            <span>${escapeHtml(formatDate(credit.fechaOtorgamiento))}</span>
            <span>${formatCurrency(credit.montoOriginal || 0)}</span>
            <span>${formatCurrency(credit.totalRecuperado || 0)}</span>
            <span><strong class="credit-balance-value ${Number(credit.saldoPendiente || 0) > 0 ? "pending" : "paid"}">${formatCurrency(
              credit.saldoPendiente || 0
            )}</strong></span>
            <span class="user-credit-toolbar-actions">
              <button class="small-button user-credit-detail-button" type="button" data-user-id="${credit.usuarioId}">Historial</button>
              ${
                Number(credit.saldoPendiente || 0) > 0 && canManageUserCredits()
                  ? `<button class="small-button success-button user-credit-payment-button" type="button" data-credit-id="${credit.id}">Abonar</button>`
                  : `<b class="status-pill green">Liquidado</b>`
              }
            </span>
          </article>
        `
      )
      .join("")}
  `;
}

function renderUserCreditDetail(data = {}) {
  if (!userCreditDetailContent) return;
  activeUserCreditDetailData = data;
  const user = data.user || {};
  const summary = data.summary || {};
  const credits = data.credits || [];
  const movements = data.movements || [];
  const fullName = `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario || "Persona";

  userCreditDetailContent.innerHTML = `
    <section class="users-panel credit-detail-panel">
      <div class="section-heading-inline">
        <div>
          <p class="eyebrow">Expediente de préstamo</p>
          <h2>${escapeHtml(fullName)}</h2>
          <span class="user-username">${escapeHtml(user.usuario || "")}</span>
        </div>
        ${
          canManageUserCredits()
            ? `<button class="success-button user-credit-create-button" type="button" data-user-id="${Number(user.id || 0)}">+ Nuevo préstamo</button>`
            : ""
        }
      </div>

      <div class="credit-summary-grid credit-detail-summary">
        <article><span>Monto original</span><strong>${formatCurrency(summary.montoOriginal || 0)}</strong></article>
        <article><span>Recuperado</span><strong>${formatCurrency(summary.totalRecuperado || 0)}</strong></article>
        <article><span>Saldo pendiente</span><strong>${formatCurrency(summary.saldoPendiente || 0)}</strong></article>
        <article><span>Registros activos</span><strong>${Number(summary.creditosActivos || 0)}</strong></article>
      </div>

      <section class="credit-detail-section">
        <h3>Préstamos y adeudos registrados</h3>
        <div class="credit-detail-table">
          <div class="credit-detail-credit-head"><span>Tipo</span><span>Concepto</span><span>Fecha</span><span>Original</span><span>Recuperado</span><span>Saldo</span><span>Acción</span></div>
          ${
            credits.length
              ? credits
                  .map(
                    (credit) => `<article class="credit-detail-credit-row">
                      <span>${escapeHtml(credit.tipo === "ADEUDO" ? "Adeudo" : "Préstamo")}</span>
                      <span class="table-stacked-cell"><strong>${escapeHtml(credit.concepto || "Sin concepto")}</strong><small>${escapeHtml(
                        credit.notas || ""
                      )}</small></span>
                      <span>${escapeHtml(formatDate(credit.fechaOtorgamiento))}</span>
                      <span>${formatCurrency(credit.montoOriginal || 0)}</span>
                      <span>${formatCurrency(credit.totalRecuperado || 0)}</span>
                      <span><strong class="credit-balance-value ${Number(credit.saldoPendiente || 0) > 0 ? "pending" : "paid"}">${formatCurrency(
                        credit.saldoPendiente || 0
                      )}</strong></span>
                      <span>${
                        Number(credit.saldoPendiente || 0) > 0 && canManageUserCredits()
                          ? `<button class="small-button success-button user-credit-payment-button" type="button" data-credit-id="${credit.id}">Abonar</button>`
                          : `<b class="status-pill green">Liquidado</b>`
                      }</span>
                    </article>`
                  )
                  .join("")
              : `<div class="empty-state">Sin préstamos o adeudos registrados</div>`
          }
        </div>
      </section>

      <section class="credit-detail-section">
        <h3>Historial de movimientos</h3>
        <div class="credit-movements-table">
          <div class="credit-movements-head"><span>Fecha</span><span>Movimiento</span><span>Referencia</span><span>Monto</span><span>Saldo anterior</span><span>Saldo posterior</span><span>Registró</span></div>
          ${
            movements.length
              ? movements
                  .map(
                    (movement) => `<article class="credit-movements-row">
                      <span>${escapeHtml(formatDate(movement.createdAt))}</span>
                      <span class="table-stacked-cell"><strong>${escapeHtml(
                        movement.tipo === "CARGO_INICIAL" ? "Registro inicial" : "Abono"
                      )}</strong><small>${escapeHtml(movement.creditoConcepto || movement.detalle || "")}</small></span>
                      <span>${escapeHtml(movement.referencia || "Sin referencia")}</span>
                      <span>${formatCurrency(movement.monto || 0)}</span>
                      <span>${formatCurrency(movement.saldoAnterior || 0)}</span>
                      <span>${formatCurrency(movement.saldoPosterior || 0)}</span>
                      <span>${escapeHtml(movement.registradoPor || "Sistema")}</span>
                    </article>`
                  )
                  .join("")
              : `<div class="empty-state">Sin movimientos registrados</div>`
          }
        </div>
      </section>
    </section>
  `;
}

function showUserCreditsListView(options = {}) {
  activeUserCreditDetailId = null;
  activeUserCreditDetailData = null;
  userCreditDetailView?.classList.add("hidden");
  userCreditsListView?.classList.remove("hidden");
  if (options.persist !== false) saveModuleLocation("prestamos");
}

async function openUserCreditDetail(userId, options = {}) {
  activeUserCreditDetailId = Number(userId);
  if (!activeUserCreditDetailId) return;
  if (options.persist !== false) saveDetailLocation("prestamos", "detail", activeUserCreditDetailId);
  userCreditsListView?.classList.add("hidden");
  userCreditDetailView?.classList.remove("hidden");
  userCreditDetailContent.innerHTML = `<div class="empty-state">Cargando historial...</div>`;
  try {
    const data = await api(`/api/users/${activeUserCreditDetailId}/credits`);
    renderUserCreditDetail(data);
  } catch (error) {
    userCreditDetailContent.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

async function loadUserCredits() {
  const search = userCreditsSearch?.value.trim() || "";
  const status = userCreditsStatusFilter?.value || "active";
  const data = await api(`/api/user-credits?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`);
  userCreditUsersCatalog = data.users || [];
  renderUserCreditsSummary(data.summary || {});
  renderUserCreditsList(data.credits || []);
}

async function loadUserCreditsModule() {
  try {
    await loadUserCredits();
  } catch (error) {
    if (userCreditsList) userCreditsList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function renderClients(clients) {
  clientsCache = clients;
  if (document.activeElement === clientsSearch) smartAutocompleteControllers.get(clientsSearch)?.render();

  if (!clients.length) {
    renderPagination(clientsCardList, "clients", 0, () => renderClients(clientsCache));
    clientsCardList.innerHTML = `<div class="empty-state">Sin empresas o contactos registrados</div>`;
    return;
  }

  const rows = paginateRows(clientsCardList, "clients", clients, () => renderClients(clientsCache));
  clientsCardList.innerHTML = `
    <div class="client-directory-list-head contacts-list-head" aria-hidden="true">
      <span>Empresa / RFC</span><span>Sucursal</span><span>Contacto</span><span>Comunicación</span><span>Condiciones</span><span>Acciones</span>
    </div>
    ${rows.map((client) => `
      <article class="client-directory-card">
        <div class="client-card-header">
          <div class="client-card-avatar" aria-hidden="true">${escapeHtml(getClientInitials(client))}</div>
          <div class="client-card-title">
            <h2>${escapeHtml(client.empresa || client.nombre)}</h2>
            <span>RFC: ${escapeHtml(client.rfc || "Sin RFC")}</span>
          </div>
        </div>
        <div class="client-list-cell" data-label="Sucursal"><b>${escapeHtml(client.sucursal || "Sin sucursal")}</b></div>
        <div class="client-list-cell" data-label="Contacto"><b>${escapeHtml(client.nombre || "Sin contacto")}</b></div>
        <div class="client-list-cell client-contact-data" data-label="Comunicación">
          <b>${escapeHtml(client.telefono || "Sin teléfono")}</b>
          <small>${escapeHtml(client.email || "Sin correo")}</small>
        </div>
        <div class="client-list-cell client-payment-data" data-label="Condiciones">
          <b>${escapeHtml(client.metodoPago || "contado")} · ${Number(client.diasCredito || 0)} días</b>
          <small>CFDI: ${escapeHtml(client.usoCfdi || "Sin dato")} · Valor: ${Number(client.valorVenta || 0).toFixed(2)}</small>
        </div>
        <div class="client-card-actions">
          <button class="small-button client-docs-button" type="button" data-client-id="${client.id}" title="${Number(client.archivosCount || 0)} documento(s)">Documentos (${Number(client.archivosCount || 0)})</button>
          <button class="small-button edit-client-button" type="button" data-client-id="${client.id}">Editar</button>
          ${canDeleteClientRecords() ? `<button class="small-button danger-button delete-client-button" type="button" data-client-id="${client.id}">Eliminar</button>` : ""}
        </div>
      </article>
    `).join("")}`;
}

async function loadClients() {
  const search = clientsSearch.value.trim();
  const data = await api(`/api/clients?search=${encodeURIComponent(search)}`);
  clientBranchLocationsCache = data.branchLocations || clientBranchLocationsCache || [];
  locationCatalogCache = data.locationCatalog || locationCatalogCache || [];
  if (!search) clientDirectoryCatalogCache = data.clients || [];
  syncClientCompanyOptions();
  syncLocationCatalogOptions();
  renderLocationCatalog(locationCatalogCache);
  renderClientBranchLocations(clientBranchLocationsCache);
  renderClients(data.clients || []);
}

async function loadClientsModule() {
  try {
    await loadClients();
  } catch (error) {
    clientsCardList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function renderClientDocuments(files) {
  if (!files.length) {
    clientDocumentsList.innerHTML = `<div class="empty-state">Sin documentos cargados</div>`;
    return;
  }

  clientDocumentsList.innerHTML = files
    .map(
      (file) => `
        <div class="document-row">
          ${renderDocumentCardLink(file)}
          ${
            canDeleteRecords()
              ? `<button class="small-button danger-button" type="button" data-client-file-delete="${file.id}">Eliminar</button>`
              : ""
          }
        </div>
      `
    )
    .join("");
}

async function openClientDocs(client) {
  activeDocsClientId = client.id;
  clientDocsTitle.textContent = `Documentos de ${client.empresa || client.nombre}`;
  clientDocsModal.classList.remove("hidden");
  const data = await api(`/api/clients/${client.id}/files`);
  renderClientDocuments(data.files || []);
}

function renderProviders(providers) {
  providersCache = providers;
  if (document.activeElement === providersSearch) smartAutocompleteControllers.get(providersSearch)?.render();

  if (!providers.length) {
    renderPagination(providersCardList, "providers", 0, () => renderProviders(providersCache));
    providersCardList.innerHTML = `<div class="empty-state">Sin proveedores registrados</div>`;
    return;
  }

  const rows = paginateRows(providersCardList, "providers", providers, () => renderProviders(providersCache));
  providersCardList.innerHTML = rows
    .map(
      (provider) => `
        <article class="provider-directory-card">
          <div class="provider-card-header">
            <div class="provider-card-avatar" aria-hidden="true">${escapeHtml(getProviderInitials(provider))}</div>
            <div class="provider-card-title">
              <h2>${escapeHtml(provider.empresa)}</h2>
              <span>RFC: ${escapeHtml(provider.rfc || "Sin RFC")}</span>
            </div>
            <span class="provider-doc-chip"><strong>Documentos:</strong> ${provider.archivosCount || 0}</span>
          </div>

          <div class="provider-card-body">
            <div class="provider-card-facts">
              <span><strong>Teléfono:</strong><b>${escapeHtml(provider.telefono || "Sin teléfono")}</b></span>
              <span><strong>Correo:</strong><b>${escapeHtml(provider.correo || "Sin correo")}</b></span>
              <span><strong>Ventas:</strong><b>${escapeHtml(provider.contactoVentas || "Sin contacto")}</b></span>
              <span><strong>Compras:</strong><b>${escapeHtml(provider.contactoCompras || "Sin contacto")}</b></span>
              <span><strong>Contabilidad:</strong><b>${escapeHtml(provider.contactoContabilidad || "Sin contacto")}</b></span>
              <span><strong>Pago:</strong><b>${escapeHtml(provider.pago || "contado")}</b></span>
              <span><strong>Días crédito:</strong><b>${Number(provider.diasCredito || 0)}</b></span>
              <span class="is-wide"><strong>Banco:</strong><b>${escapeHtml(provider.banco || "Sin banco")}</b></span>
            </div>
          </div>

          <div class="provider-card-actions">
            <button class="small-button provider-docs-button" type="button" data-provider-id="${provider.id}">Documentos</button>
            <button class="small-button edit-provider-button" type="button" data-provider-id="${provider.id}">Editar</button>
            ${
              canDeleteRecords()
                ? `<button class="small-button danger-button delete-provider-button" type="button" data-provider-id="${provider.id}">Eliminar</button>`
                : ""
            }
          </div>
        </article>
      `
    )
    .join("");
}

async function loadProviders() {
  const search = providersSearch.value.trim();
  const requestId = ++providersSearchRequestId;
  const data = await api(`/api/providers?search=${encodeURIComponent(search)}`);
  // Si el usuario siguió escribiendo o limpió el campo mientras esperaba la
  // respuesta, se ignora el resultado anterior para no regresar la búsqueda.
  if (requestId !== providersSearchRequestId || search !== providersSearch.value.trim()) return;
  renderProviders(data.providers || []);
}

async function loadProvidersModule() {
  try {
    await loadProviders();
  } catch (error) {
    providersCardList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function renderProviderDocuments(files) {
  if (!files.length) {
    providerDocumentsList.innerHTML = `<div class="empty-state">Sin documentos cargados</div>`;
    return;
  }

  providerDocumentsList.innerHTML = files
    .map(
      (file) => `
        <div class="document-row">
          ${renderDocumentCardLink(file)}
          ${
            canDeleteRecords()
              ? `<button class="small-button danger-button" type="button" data-provider-file-delete="${file.id}">Eliminar</button>`
              : ""
          }
        </div>
      `
    )
    .join("");
}

async function openProviderDocs(provider) {
  activeDocsProviderId = provider.id;
  providerDocsTitle.textContent = `Documentos de ${provider.empresa}`;
  providerDocsModal.classList.remove("hidden");
  const data = await api(`/api/providers/${provider.id}/files`);
  renderProviderDocuments(data.files || []);
}

function renderPriceItems(items) {
  priceItemsCache = items;
  const equipmentItems = items.filter((item) => item.tipo === "Equipos de elevación e izaje");
  const laborItems = items.filter((item) => item.tipo === "Mano de obra");

  const renderRows = (categoryItems) => {
    if (!categoryItems.length) return `<div class="price-table-empty">Sin items registrados</div>`;

    return categoryItems
      .map(
        (item) => `
        <article class="price-table-row">
          <strong>${escapeHtml(item.item)}</strong>
          <b>${formatCurrency(item.costo)}</b>
          ${
            canDeleteRecords()
              ? `<button class="small-button danger-button delete-price-button" type="button" data-price-id="${item.id}">
                  Eliminar
                </button>`
              : ""
          }
        </article>
      `
      )
      .join("");
  };

  priceEquipmentList.innerHTML = renderRows(equipmentItems);
  priceLaborList.innerHTML = renderRows(laborItems);
}

async function loadPriceItems() {
  const search = pricesSearch.value.trim();
  const data = await api(`/api/price-list?search=${encodeURIComponent(search)}`);
  renderPriceItems(data.items || []);
}

async function loadPriceListModule() {
  try {
    await loadPriceItems();
  } catch (error) {
    const errorState = `<div class="price-table-empty">${escapeHtml(error.message)}</div>`;
    priceEquipmentList.innerHTML = errorState;
    priceLaborList.innerHTML = errorState;
  }
}

function renderFixedExpenses(expenses) {
  fixedExpensesCache = expenses;
  const sortedExpenses = sortByState(expenses, fixedExpensesSort, (expense, key) => {
    if (key === "recurrencia") return expense.recurrenciaLabel || expense.recurrencia;
    return expense[key];
  });

  if (!sortedExpenses.length) {
    renderPagination(fixedExpensesList, "fixedExpenses", 0, () => renderFixedExpenses(fixedExpensesCache));
    fixedExpensesList.innerHTML = `<div class="fixed-expense-table-empty">Sin gastos fijos registrados</div>`;
    return;
  }

  const rows = paginateRows(fixedExpensesList, "fixedExpenses", sortedExpenses, () => renderFixedExpenses(fixedExpensesCache));
  fixedExpensesList.innerHTML = rows
    .map(
      (expense) => `
        <article class="${getRowClasses("fixed-expense-table-row", getFixedExpenseStateClass(expense))}">
          <strong>${escapeHtml(expense.gasto)}</strong>
          <span>${escapeHtml(expense.proveedorNombre || "Sin proveedor")}</span>
          <span>${escapeHtml(expense.recurrenciaLabel || expense.recurrencia)}</span>
          <span><b class="status-pill">${escapeHtml(expense.estadoRegistro || "Activo")}</b></span>
          <span>${expense.generacionAutomatica ? `Sí · día ${Number(expense.diaGeneracion || 1)}` : "No"}</span>
          <span>${expense.generacionAutomatica ? escapeHtml(formatDate(expense.proximaGeneracion)) : "—"}</span>
          <b>${formatCurrency(expense.presupuesto)}</b>
          <b>${formatCurrency(expense.presupuestoAdicional || 0)}</b>
          <b>${formatCurrency(expense.disponible ?? expense.presupuesto ?? 0)}</b>
          <span class="fixed-expense-actions">
            <button class="small-button edit-fixed-expense-button" type="button" data-expense-id="${expense.id}">Editar</button>
            ${canDeleteRecords() ? `<button class="small-button danger-button delete-fixed-expense-button" type="button" data-expense-id="${expense.id}">Desactivar</button>` : ""}
          </span>
        </article>`
    )
    .join("");
}

async function loadFixedExpenses() {
  const search = fixedExpensesSearch.value.trim();
  const data = await api(`/api/fixed-expenses?search=${encodeURIComponent(search)}`);
  fixedExpenseProvidersCache = data.providers || fixedExpenseProvidersCache;
  fixedExpenseBranchesCache = data.branches || fixedExpenseBranchesCache;
  renderFixedExpenses(data.expenses || []);
}

async function loadFixedExpensesModule() {
  try {
    await loadFixedExpenses();
  } catch (error) {
    fixedExpensesList.innerHTML = `<div class="fixed-expense-table-empty">${escapeHtml(error.message)}</div>`;
  }
}

function canSelectBudgetForSharedPo(budget = {}) {
  const status = normalizeSearchValue(budget.estatus);
  const state = normalizeSearchValue(budget.estado);
  return (
    !budget.hasClientPo &&
    !String(budget.po || "").trim() &&
    !state.includes("cerrad") &&
    status.includes("espera de po") &&
    Number(budget.montoCotizacion || 0) > 0
  );
}

function getSharedClientPoSelectedBudgets() {
  return sharedClientPoCandidates.filter((budget) => sharedClientPoSelectedBudgetIds.has(Number(budget.id)));
}

function getSharedClientPoEligibilityMessage(budget = {}) {
  if (budget.hasClientPo || String(budget.po || "").trim()) return "Ya tiene PO";
  if (normalizeSearchValue(budget.estado).includes("cerrad")) return "Proyecto cerrado";
  if (Number(budget.montoCotizacion || 0) <= 0) return "Sin cotización aprobada";
  if (!normalizeSearchValue(budget.estatus).includes("espera de po")) return budget.estatus || "No disponible";
  return "Disponible";
}

function getFilteredSharedClientPoCandidates() {
  const company = normalizeSearchValue(sharedClientPoCompanyFilter?.value || "");
  const search = normalizeSearchValue(sharedClientPoProjectFilter?.value || "");
  return sharedClientPoCandidates.filter((budget) => {
    if (company && normalizeSearchValue(budget.empresa) !== company) return false;
    if (!search) return true;
    return [budget.folio, budget.tituloProyecto, budget.clienteUsuario, budget.empresa, budget.po, budget.owner]
      .some((value) => normalizeSearchValue(value).includes(search));
  });
}

function updateSharedClientPoSelectionUi({ render = false } = {}) {
  const selected = getSharedClientPoSelectedBudgets();
  const total = selected.reduce((sum, budget) => sum + Number(budget.montoCotizacion || 0), 0);
  const amountInput = sharedClientPoForm?.elements?.montoTotal;
  if (amountInput) amountInput.value = total ? total.toFixed(2) : "";
  if (saveSharedClientPoButton) saveSharedClientPoButton.disabled = selected.length < 2;
  if (sharedClientPoCalculatedTotal) {
    sharedClientPoCalculatedTotal.innerHTML = `<span>${selected.length} proyecto${selected.length === 1 ? "" : "s"} seleccionado${selected.length === 1 ? "" : "s"}</span><strong>${formatCurrency(total)}</strong>`;
  }
  if (render) renderSharedClientPoCandidates();
}

function renderSharedClientPoCompanyOptions() {
  if (!sharedClientPoCompanyFilter) return;
  const current = sharedClientPoCompanyFilter.value;
  const companies = [...new Set(sharedClientPoCandidates.map((budget) => String(budget.empresa || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "es"));
  sharedClientPoCompanyFilter.innerHTML = `<option value="">Todas las empresas</option>${companies
    .map((company) => `<option value="${escapeHtml(company)}">${escapeHtml(company)}</option>`)
    .join("")}`;
  if (companies.includes(current)) sharedClientPoCompanyFilter.value = current;
}

function renderSharedClientPoCandidates() {
  if (!sharedClientPoProjects) return;
  const rows = getFilteredSharedClientPoCandidates();
  if (!rows.length) {
    sharedClientPoProjects.innerHTML = `<div class="client-quote-empty">No hay proyectos que coincidan con los filtros.</div>`;
    return;
  }
  sharedClientPoProjects.innerHTML = rows
    .map((budget) => {
      const eligible = canSelectBudgetForSharedPo(budget);
      const selected = sharedClientPoSelectedBudgetIds.has(Number(budget.id));
      return `<article class="shared-client-po-candidate ${eligible ? "" : "is-disabled"}">
        <span class="shared-client-po-check">
          <input type="checkbox" data-shared-client-po-budget="${budget.id}" ${selected ? "checked" : ""} ${eligible ? "" : "disabled"} aria-label="Seleccionar ${escapeHtml(budget.folio || "proyecto")}" />
        </span>
        <span>${escapeHtml(budget.empresa || "Sin empresa")}</span>
        <span class="shared-client-po-project-name"><b>${escapeHtml(budget.folio || "Sin folio")}</b><small>${escapeHtml(budget.tituloProyecto || "Sin título")}</small></span>
        <span><b class="status-pill">${escapeHtml(getSharedClientPoEligibilityMessage(budget))}</b></span>
        <strong>${formatCurrency(budget.montoCotizacion || 0)}</strong>
      </article>`;
    })
    .join("");
}

function closeSharedClientPoModal() {
  if (!sharedClientPoModal) return;
  sharedClientPoModal.classList.add("hidden");
  if (sharedClientPoStatus) sharedClientPoStatus.textContent = "";
}

async function openSharedClientPoModal() {
  sharedClientPoForm?.reset();
  sharedClientPoCandidates = [];
  sharedClientPoSelectedBudgetIds.clear();
  sharedClientPoModal?.classList.remove("hidden");
  if (sharedClientPoProjects) sharedClientPoProjects.innerHTML = `<div class="client-quote-empty">Cargando proyectos...</div>`;
  if (sharedClientPoStatus) sharedClientPoStatus.textContent = "Cargando proyectos disponibles...";
  updateSharedClientPoSelectionUi();
  try {
    const data = await api("/api/budgets?all=1");
    sharedClientPoCandidates = data.budgets || [];
    renderSharedClientPoCompanyOptions();
    renderSharedClientPoCandidates();
    if (sharedClientPoStatus) sharedClientPoStatus.textContent = "";
    sharedClientPoProjectFilter?.focus();
  } catch (error) {
    if (sharedClientPoStatus) sharedClientPoStatus.textContent = error.message;
    if (sharedClientPoProjects) sharedClientPoProjects.innerHTML = `<div class="client-quote-empty">No se pudieron cargar los proyectos.</div>`;
  }
}

async function submitSharedClientPo(event) {
  event.preventDefault();
  const selected = getSharedClientPoSelectedBudgets();
  if (selected.length < 2 || !sharedClientPoForm) {
    if (sharedClientPoStatus) sharedClientPoStatus.textContent = "Selecciona al menos dos presupuestos.";
    return;
  }

  const formData = new FormData(sharedClientPoForm);
  formData.set("budgetIds", JSON.stringify(selected.map((budget) => Number(budget.id))));
  const expectedTotal = selected.reduce((sum, budget) => sum + Number(budget.montoCotizacion || 0), 0);
  const enteredTotal = Number(formData.get("montoTotal") || 0);
  if (Math.abs(expectedTotal - enteredTotal) > 0.05) {
    sharedClientPoStatus.textContent = `El monto debe coincidir con ${formatCurrency(expectedTotal)}.`;
    sharedClientPoForm.elements.montoTotal?.focus();
    return;
  }

  saveSharedClientPoButton.disabled = true;
  saveSharedClientPoButton.textContent = "Asignando PO...";
  sharedClientPoStatus.textContent = "Guardando la relación y creando las cuentas por cobrar...";
  try {
    const result = await api("/api/budgets/shared-client-po", {
      method: "POST",
      body: formData
    });
    sharedClientPoSelectedBudgetIds.clear();
    closeSharedClientPoModal();
    await loadBudgets();
    if (result.warnings?.length) {
      showAppToast({
        type: "warning",
        title: "PO asignada con avisos",
        message: result.warnings.join(" "),
        duration: 9000
      });
    }
  } catch (error) {
    sharedClientPoStatus.textContent = error.message;
  } finally {
    saveSharedClientPoButton.disabled = false;
    saveSharedClientPoButton.textContent = "Asignar PO y crear CxC";
  }
}

function renderBudgetTableRow(budget) {
  const display = getBudgetDisplayFields(budget);
  const isClosed = normalizeSearchValue(budget.estado).includes("cerrad");
  return `
    <article class="${getRowClasses(
      "budget-table-row is-clickable",
      getBudgetRowStateClass(budget),
      isClosed ? "budget-is-closed" : "",
      getAlertClass("budget", budget.id, budget.updatedAt, shouldAlertBudget(budget)),
      getRowFlagClass("budget", budget.id)
    )}" data-budget-id="${budget.id}" data-alert-scope="budget" data-alert-updated-at="${escapeHtml(budget.updatedAt || "")}">
      ${isClosed ? `<span class="budget-closed-ribbon" aria-label="Presupuesto cerrado"><span>✓</span> CERRADA</span>` : ""}
      ${renderRowFlag("budget", budget.id)}
      <span>${escapeHtml(budget.empresa)}</span>
      <span>${escapeHtml(display.clienteUsuario || "Sin dato")}</span>
      <span>${escapeHtml(budget.folio)}</span>
      <span>${escapeHtml(budget.po || "")}</span>
      <span>${escapeHtml(budget.tituloProyecto)}</span>
      <span>${escapeHtml(formatDate(budget.createdAt))}</span>
      <span>${escapeHtml(formatDate(budget.updatedAt))}</span>
      <span><b class="status-pill">${escapeHtml(budget.estado || "Abierta")}</b></span>
      <span><b class="status-pill">${escapeHtml(budget.estatus || "En espera de aprobación")}</b></span>
      <span>${formatCurrency(budget.montoCotizacion || 0)}</span>
      <span>${escapeHtml(budget.owner || "Sin owner")}</span>
      <span class="budget-actions">
        <button class="small-button open-budget-detail-button" type="button" data-budget-id="${budget.id}">Ver</button>
      </span>
    </article>
  `;
}

function renderBudgetApprovalQueueRows(rows) {
  if (!budgetApprovalQueue || !budgetApprovalRows) return;
  const visible = canViewBudgetApprovalQueue();
  budgetApprovalQueue.classList.toggle("hidden", !visible);
  if (!visible) return;

  if (!rows.length) {
    renderPagination(budgetApprovalRows, "budgetApprovals", 0, () => renderBudgets(budgetsCache));
    budgetApprovalRows.innerHTML = `<div class="budget-table-row budget-table-empty"><span>Sin presupuestos pendientes de aprobación</span></div>`;
    applyVisibleColumns(budgetApprovalTable);
    return;
  }

  const sortedRows = sortBudgetsForWorkflow(rows);
  const pageRows = paginateRows(budgetApprovalRows, "budgetApprovals", sortedRows, () => renderBudgets(budgetsCache));
  budgetApprovalRows.innerHTML = pageRows.map(renderBudgetTableRow).join("");
  applyVisibleColumns(budgetApprovalTable);
}

function renderBudgets(budgets) {
  budgetsCache = budgets;
  if (document.activeElement === budgetsSearch) smartAutocompleteControllers.get(budgetsSearch)?.render();
  ensureAlertBaseline("budget", budgets, (item) => item.id, shouldAlertBudget);
  const showApprovalQueue = canViewBudgetApprovalQueue();
  const pendingApprovalRows = showApprovalQueue ? budgets.filter(isBudgetPendingApproval) : [];
  const listRows = showApprovalQueue ? budgets.filter((budget) => !isBudgetPendingApproval(budget)) : budgets;
  renderBudgetApprovalQueueRows(pendingApprovalRows);

  if (!listRows.length) {
    renderPagination(budgetsCardList, "budgets", 0, () => renderBudgets(budgetsCache));
    budgetsCardList.innerHTML = `<div class="budget-table-row budget-table-empty"><span>${
      showApprovalQueue && pendingApprovalRows.length
        ? "Sin presupuestos fuera de aprobación"
        : "Sin presupuestos registrados"
    }</span></div>`;
    applyVisibleColumns(budgetsTable);
    return;
  }

  const rows = sortBudgetsForWorkflow(listRows);
  const pageRows = paginateRows(budgetsCardList, "budgets", rows, () => renderBudgets(budgetsCache));
  budgetsCardList.innerHTML = pageRows.map(renderBudgetTableRow).join("");
  applyVisibleColumns(budgetsTable);
}

function renderBudgetReadonlyRow(cells) {
  return `<tr>${cells.map((cell) => `<td>${cell}</td>`).join("")}</tr>`;
}

function renderBudgetReadonlyTable(title, headers, rows, total) {
  const body = rows.length
    ? rows.join("")
    : `<tr><td class="empty-cell" colspan="${headers.length}">Sin registros capturados</td></tr>`;

  return `
    <section class="budget-readonly-card">
      <div class="budget-readonly-heading">
        <h3>${escapeHtml(title)}</h3>
        <strong>${formatCurrency(total || 0)}</strong>
      </div>
      <div class="budget-readonly-table-shell">
        <table class="budget-readonly-table">
          <thead>
            <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderBudgetBlockOptions(selected = "") {
  const selectedBlock = normalizeBudgetBlock(selected);
  return budgetBlockOptions
    .map(
      (block) =>
        `<option value="${block.value}" ${block.value === selectedBlock ? "selected" : ""}>${escapeHtml(block.label)}</option>`
    )
    .join("");
}

function calculateBudgetBlocks(budget, transfers = [], additionals = []) {
  const blocks = {
    equipos: Number(budget.totalEquipos || 0),
    manoObra: Number(budget.totalManoObra || 0) + Number(budget.totalContratistas || 0),
    materiales: Number(budget.totalMateriales || 0)
  };

  transfers.forEach((transfer) => {
    const origen = normalizeBudgetBlock(transfer.origen);
    const destino = normalizeBudgetBlock(transfer.destino);
    if (blocks[origen] === undefined || blocks[destino] === undefined) return;
    const amount = Number(transfer.monto || 0);
    blocks[origen] -= amount;
    blocks[destino] += amount;
  });

  additionals.forEach((additional) => {
    const normalizedBlock = normalizeBudgetBlock(
      additional.bloque ?? additional.block ?? additional.presupuesto ?? additional.tipo
    );
    const block = blocks[normalizedBlock] === undefined ? "materiales" : normalizedBlock;
    if (blocks[block] === undefined) return;
    blocks[block] += Number(additional.monto ?? additional.amount ?? 0);
  });

  return blocks;
}

function getBudgetBaseBlocks(budget = {}) {
  return {
    equipos: Number(budget.totalEquipos || 0),
    manoObra: Number(budget.totalManoObra || 0) + Number(budget.totalContratistas || 0),
    materiales: Number(budget.totalMateriales || 0)
  };
}

function calculateSupplierOrderUsedBlocks(versions = [], excludeOrderId = null) {
  const activeFolios = versions
    .filter((order) => order.estatus !== "Cancelada" && Number(order.id) !== Number(excludeOrderId))
    .map((order) => String(order.folio || ""));
  return versions.reduce(
    (acc, order) => {
      if (order.estatus === "Cancelada" || Number(order.id) === Number(excludeOrderId)) return acc;
      const folio = String(order.folio || "");
      if (folio && activeFolios.some((activeFolio) => activeFolio.startsWith(`${folio}.`))) return acc;
      (order.items || []).forEach((item) => {
        const block = normalizeBudgetBlock(item.presupuesto);
        if (acc[block] === undefined) return;
        acc[block] += Number(item.total || 0);
      });
      return acc;
    },
    { equipos: 0, manoObra: 0, materiales: 0 }
  );
}

function eventTimestamp(value) {
  const time = new Date(value || 0).getTime();
  return Number.isFinite(time) ? time : 0;
}

function calculateSupplierOrderAvailableTimeline(data = {}, excludeOrderId = null) {
  const balances = getBudgetBaseBlocks(data.budget || {});
  const events = [];
  const activeFolios = (data.versions || [])
    .filter((order) => order.estatus !== "Cancelada" && Number(order.id) !== Number(excludeOrderId))
    .map((order) => String(order.folio || ""));

  (data.versions || []).forEach((order) => {
    if (order.estatus === "Cancelada" || Number(order.id) === Number(excludeOrderId)) return;
    const folio = String(order.folio || "");
    if (folio && activeFolios.some((activeFolio) => activeFolio.startsWith(`${folio}.`))) return;
    events.push({
      type: "ocp",
      at: eventTimestamp(order.createdAt || order.updatedAt),
      order: 20,
      items: order.items || []
    });
  });

  (data.transfers || []).forEach((transfer) => {
    events.push({
      type: "transfer",
      at: eventTimestamp(transfer.createdAt),
      order: 10,
      origen: normalizeBudgetBlock(transfer.origen),
      destino: normalizeBudgetBlock(transfer.destino),
      monto: Number(transfer.monto || 0)
    });
  });

  (data.additionals || []).forEach((additional) => {
    const normalizedBlock = normalizeBudgetBlock(
      additional.bloque ?? additional.block ?? additional.presupuesto ?? additional.tipo
    );
    events.push({
      type: "additional",
      at: eventTimestamp(additional.createdAt),
      order: 10,
      bloque: balances[normalizedBlock] === undefined ? "materiales" : normalizedBlock,
      monto: Number(additional.monto ?? additional.amount ?? 0)
    });
  });

  events
    .sort((a, b) => a.at - b.at || a.order - b.order)
    .forEach((event) => {
      if (event.type === "additional") {
        balances[event.bloque] += event.monto;
        return;
      }
      if (event.type === "transfer") {
        if (balances[event.origen] === undefined || balances[event.destino] === undefined) return;
        balances[event.origen] = Math.max(0, balances[event.origen] - event.monto);
        balances[event.destino] += event.monto;
        return;
      }
      (event.items || []).forEach((item) => {
        const block = normalizeBudgetBlock(item.presupuesto);
        if (balances[block] === undefined) return;
        balances[block] = Math.max(0, balances[block] - Number(item.total || 0));
      });
    });

  return balances;
}

function normalizeBudgetBlockTotals(totals = {}) {
  return Object.entries(totals || {}).reduce(
    (acc, [key, value]) => {
      const block = normalizeBudgetBlock(key);
      if (acc[block] === undefined) return acc;
      acc[block] += Number(value || 0);
      return acc;
    },
    { equipos: 0, manoObra: 0, materiales: 0 }
  );
}

function calculateSupplierOrderAvailableBlocks(data = {}, excludeOrderId = null) {
  const canCalculateLocally = Array.isArray(data.versions);
  if (canCalculateLocally) {
    return calculateSupplierOrderAvailableTimeline(data, excludeOrderId);
  }
  if (!canCalculateLocally && !excludeOrderId && data.availableBlocks) {
    return normalizeBudgetBlockTotals(data.availableBlocks);
  }
  const totals = calculateBudgetBlocks(data.budget || {}, data.transfers || [], data.additionals || []);
  const used = calculateSupplierOrderUsedBlocks(data.versions || [], excludeOrderId);
  return {
    equipos: Math.max(0, Number(totals.equipos || 0) - Number(used.equipos || 0)),
    manoObra: Math.max(0, Number(totals.manoObra || 0) - Number(used.manoObra || 0)),
    materiales: Math.max(0, Number(totals.materiales || 0) - Number(used.materiales || 0))
  };
}

function calculateBudgetFinancials(budget) {
  const tablesCost =
    Number(budget.totalEquipos || 0) +
    Number(budget.totalContratistas || 0) +
    Number(budget.totalManoObra || 0) +
    Number(budget.totalMateriales || 0);
  const warranty = budget.sinGarantia ? 0 : tablesCost * BUDGET_WARRANTY_RATE;
  const quoteCost = tablesCost + warranty;
  const saleValue = Number(budget.valorVenta || 0);
  const salePrice = quoteCost * saleValue;
  const grossProfit = salePrice - quoteCost;
  const supervisorRate = Number(budget.comisionSupervisor || 0);
  const supervisorCommission = salePrice * (supervisorRate / 100);
  const totalProfit = grossProfit - supervisorCommission;

  return {
    quoteCost,
    saleValue,
    salePrice,
    grossProfit,
    supervisorRate,
    supervisorCommission,
    totalProfit
  };
}

function isBudgetEditable(budget) {
  if (budget.estado === "Cerrada") return false;

  const status = normalizeSearchValue(budget.estatus);
  const quoteAlreadyApproved =
    status.includes("espera de po") ||
    status.includes("espera de facturacion") ||
    status.includes("espera de gr") ||
    status.includes("espera de track") ||
    status.includes("espera de comprobante") ||
    status.includes("documentacion") ||
    status.includes("cobrado");

  if (userHasRole("supervisor") && quoteAlreadyApproved) return false;

  return true;
}

function newClientQuoteRow(row = {}) {
  return {
    id: row.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
    cantidad: Number(row.cantidad ?? 1),
    unidadMedida: row.unidadMedida || "",
    descripcion: row.descripcion || "",
    precio: Number(row.precio || 0)
  };
}

function calculateClientQuoteSubtotal(row) {
  return Number(row.cantidad || 0) * Number(row.precio || 0);
}

function clientQuoteSubtotal() {
  return clientQuoteRows.reduce((sum, row) => sum + calculateClientQuoteSubtotal(row), 0);
}

function normalizeClientQuoteDiscountPercent(value) {
  const number = Number(String(value || "").replace("%", ""));
  if (!Number.isFinite(number)) return 0;
  return Math.min(Math.max(number, 0), 100);
}

function clientQuoteDiscountPercentFromAmount(amount) {
  const subtotal = clientQuoteSubtotal();
  if (!subtotal) return 0;
  return normalizeClientQuoteDiscountPercent((Number(amount || 0) / subtotal) * 100);
}

function clientQuoteDiscount() {
  const subtotal = clientQuoteSubtotal();
  return Math.min(Math.max((subtotal * normalizeClientQuoteDiscountPercent(clientQuoteDiscountPercent)) / 100, 0), subtotal);
}

function clientQuoteNetTotal() {
  return Math.max(clientQuoteSubtotal() - clientQuoteDiscount(), 0);
}

function updateClientQuoteTotals() {
  const subtotalElement = document.querySelector("#clientQuoteSubtotal");
  const discountElement = document.querySelector("#clientQuoteDiscount");
  const totalElement = document.querySelector("#clientQuoteTotal");
  const discountInput = document.querySelector("#clientQuoteDiscountInput");
  const subtotal = clientQuoteSubtotal();
  const discount = clientQuoteDiscount();
  clientQuoteDiscountAmount = discount;

  if (subtotalElement) subtotalElement.textContent = formatCurrency(subtotal);
  if (discountElement) {
    discountElement.textContent = `${normalizeClientQuoteDiscountPercent(clientQuoteDiscountPercent).toFixed(2)}% · ${formatCurrency(discount)}`;
  }
  if (totalElement) totalElement.textContent = formatCurrency(Math.max(subtotal - discount, 0));
  if (discountInput && document.activeElement !== discountInput) {
    discountInput.value = normalizeClientQuoteDiscountPercent(clientQuoteDiscountPercent).toFixed(2);
  }
}

function clientQuotePayload() {
  const terms = document.querySelector("#clientQuoteTerms")?.value || clientQuoteData?.defaultTerms || "";
  return {
    borradorId: editingClientQuoteDraftId || null,
    terminos: terms,
    descuentoMonto: clientQuoteDiscount(),
    items: clientQuoteRows
      .filter((row) => row.descripcion)
      .map((row) => ({
        cantidad: Number(row.cantidad || 0),
        unidadMedida: row.unidadMedida || "",
        descripcion: row.descripcion || "",
        precio: Number(row.precio || 0)
      }))
  };
}

function renderClientQuoteRows() {
  const rowsContainer = document.querySelector("#clientQuoteRows");
  if (!rowsContainer) return;

  if (!clientQuoteRows.length) clientQuoteRows = [newClientQuoteRow()];
  rowsContainer.innerHTML = clientQuoteRows
    .map(
      (row) => `
        <article class="client-quote-row" data-row-id="${row.id}">
          <input data-client-quote-field="cantidad" type="number" min="0" step="0.01" value="${Number(row.cantidad || 0)}" aria-label="Cantidad" />
          <input data-client-quote-field="unidadMedida" value="${escapeHtml(row.unidadMedida)}" placeholder="U.M." aria-label="U.M." />
          <input data-client-quote-field="descripcion" value="${escapeHtml(row.descripcion)}" placeholder="Descripción del concepto" aria-label="Descripción" />
          <input class="budget-money-input" data-client-quote-field="precio" inputmode="decimal" value="${formatCurrency(row.precio)}" aria-label="Precio" />
          <b>${formatCurrency(calculateClientQuoteSubtotal(row))}</b>
          <button class="icon-button remove-client-quote-row" type="button" data-row-id="${row.id}" aria-label="Eliminar partida">x</button>
        </article>
      `
    )
    .join("");

  updateClientQuoteTotals();
}

function renderClientQuoteCostParts() {
  const list = document.querySelector("#clientQuoteCostParts");
  if (!list) return;

  if (!clientQuoteVisibleBlock) {
    list.innerHTML = `<div class="client-quote-empty">Selecciona un bloque para ver partidas disponibles.</div>`;
    return;
  }

  const parts = clientQuoteData?.costParts?.[clientQuoteVisibleBlock] || [];
  if (!parts.length) {
    list.innerHTML = `<div class="client-quote-empty">Sin partidas disponibles en este bloque.</div>`;
    return;
  }

  list.innerHTML = parts
    .map(
      (part, index) => {
        const key = `${clientQuoteVisibleBlock}:${index}`;
        return `
          <label class="client-quote-part">
            <input type="checkbox" data-client-quote-part="${key}" ${clientQuoteSelectedCostParts.has(key) ? "checked" : ""} />
            <span>${escapeHtml(part.descripcion || "Partida sin descripción")}</span>
            <strong>${formatCurrency(part.precio || 0)}</strong>
          </label>
        `;
      }
    )
    .join("");
}

function renderClientQuoteVersions() {
  const list = document.querySelector("#clientQuoteHistory");
  if (!list) return;
  const versions = clientQuoteData?.versions || [];
  if (!versions.length) {
    list.innerHTML = `<div class="client-quote-empty">Sin versiones guardadas.</div>`;
    return;
  }

  list.innerHTML = versions
    .map((quote) => {
      const isApproved = quote.estatus === "Aprobada";
      const isCancelled = String(quote.estatus || "").toLowerCase().includes("cancel");
      return `
        <article class="client-quote-history-row">
          <div>
            <strong>${escapeHtml(quote.folio)}</strong>
            <span>${formatDate(quote.createdAt)} · Versión ${quote.version} · ${escapeHtml(quote.estatus || "Aprobada")}</span>
          </div>
          <div class="client-quote-history-actions">
            ${
              isApproved
                ? `<a class="small-button" href="/api/client-quotes/${quote.id}/download" target="_blank" rel="noreferrer">Descargar</a>`
                : ""
            }
            ${
              isApproved && clientQuoteData?.isHonda
                ? `<a class="small-button" href="/api/client-quotes/${quote.id}/raisa-download" target="_blank" rel="noreferrer">Cotización Raisa</a>`
                : ""
            }
            <button class="small-button dark-button" type="button" data-client-quote-preview="${quote.id}">Vista previa</button>
            ${
              ""
            }
            ${
              isApproved && isCurrentUserSuperAdmin()
                ? `<button class="small-button" type="button" data-client-quote-regenerate="${quote.id}">Regenerar PDF</button>`
                : ""
            }
            ${
              isCancelled
                ? ""
                : `<button class="small-button" type="button" data-client-quote-edit-version="${quote.id}">Editar</button>`
            }
            ${
              canDeleteRecords()
                ? `<button class="danger-button small-button" type="button" data-client-quote-delete-version="${quote.id}">Eliminar</button>`
                : ""
            }
          </div>
        </article>
      `;
    })
    .join("");
}

function renderClientQuoteDrafts() {
  const list = document.querySelector("#clientQuoteDrafts");
  if (!list) return;
  const drafts = clientQuoteData?.drafts || [];
  if (!drafts.length) {
    list.innerHTML = `<div class="client-quote-empty">Sin borradores guardados.</div>`;
    return;
  }

  list.innerHTML = drafts
    .map(
      (draft) => `
        <article class="client-quote-history-row">
          <div>
            <strong>Borrador ${draft.id}</strong>
            <span>${formatDate(draft.updatedAt || draft.createdAt)} · ${formatCurrency(draft.total || 0)}</span>
          </div>
          <div class="client-quote-history-actions">
            <button class="small-button" type="button" data-client-quote-edit-draft="${draft.id}">Continuar</button>
          </div>
        </article>
      `
    )
    .join("");
}

function showClientQuoteMessage(message, tone = "error") {
  const module = document.querySelector("#clientQuoteModule");
  if (!module) return;
  module.querySelectorAll("[data-client-quote-message]").forEach((node) => node.remove());
  module.insertAdjacentHTML(
    "afterbegin",
    `<div class="client-quote-empty ${tone === "error" ? "is-error" : "is-success"}" data-client-quote-message>${escapeHtml(message || "No se pudo completar la acción.")}</div>`
  );
}

function clientQuoteSaveErrorMessage(error, action) {
  const message = error?.message || "No se pudo completar la acción.";
  if (/precio de venta|menor al precio|exced/i.test(message)) {
    return `No se puede guardar la cotización porque el monto no cumple con el precio de venta autorizado. ${message}`;
  }
  if (action === "save-draft") return `No se pudo guardar el borrador. ${message}`;
  return `No se pudo guardar la cotización. ${message}`;
}

function renderClientQuoteModule() {
  const container = document.querySelector("#clientQuoteModule");
  if (!container || !clientQuoteData) return;
  const terms = clientQuoteData.draft?.terminos || clientQuoteData.defaultTerms || "";
  const showDiscount = clientQuoteDiscountVisible || normalizeClientQuoteDiscountPercent(clientQuoteDiscountPercent) > 0;

  container.innerHTML = `
    <h3>Cotización Cliente</h3>
    <section class="client-quote-cost-picker">
      <label>
        <span>Partidas de costos</span>
        <select id="clientQuoteBlockSelect">
          ${budgetBlockOptions.map((block) => `<option value="${block.value}">${escapeHtml(block.label)}</option>`).join("")}
        </select>
      </label>
      <button class="small-button" type="button" data-client-quote-action="view-cost-parts">Ver partidas</button>
      <button class="ghost-button client-quote-ghost" type="button" data-client-quote-action="add-selected-parts">Agregar seleccionadas</button>
      <div class="client-quote-parts-list" id="clientQuoteCostParts"></div>
    </section>

    <section class="client-quote-table">
      <div class="client-quote-head">
        <span>Cantidad</span>
        <span>U.M.</span>
        <span>Descripción</span>
        <span>Precio</span>
        <span>Subtotal</span>
        <span>Acción</span>
      </div>
      <div id="clientQuoteRows"></div>
    </section>
    <div class="client-quote-total-row">
      <button class="ghost-button client-quote-ghost" type="button" data-client-quote-action="add-row">+ Agregar</button>
      <div class="client-quote-totals-wrap">
        <button class="ghost-button client-quote-ghost" type="button" data-client-quote-action="toggle-discount">Descuento</button>
        <label class="client-quote-discount ${showDiscount ? "" : "hidden"}" id="clientQuoteDiscountBox">
          <span>Descuento (%)</span>
          <input
            id="clientQuoteDiscountInput"
            type="number"
            min="0"
            max="100"
            step="0.01"
            inputmode="decimal"
            value="${normalizeClientQuoteDiscountPercent(clientQuoteDiscountPercent).toFixed(2)}"
          />
        </label>
        <div class="client-quote-total-stack">
          <div class="client-quote-total">Subtotal: <strong id="clientQuoteSubtotal">$0.00</strong></div>
          <div class="client-quote-total ${showDiscount ? "" : "hidden"}" id="clientQuoteDiscountSummary">
            Descuento: <strong id="clientQuoteDiscount">$0.00</strong>
          </div>
          <div class="client-quote-total">Total: <strong id="clientQuoteTotal">$0.00</strong></div>
        </div>
      </div>
    </div>

    <label class="client-quote-terms">
      <span>Términos y condiciones</span>
      <textarea id="clientQuoteTerms">${escapeHtml(terms)}</textarea>
    </label>

    <div class="client-quote-actions">
      <button class="success-button" type="button" data-client-quote-action="save-draft">
        ${editingClientQuoteDraftId ? "Actualizar borrador" : "Guardar borrador"}
      </button>
      <button class="success-button" id="clientQuoteVersionSaveButton" type="button" data-client-quote-action="save-version">
        ${editingClientQuoteVersionId ? "Guardar nueva versión" : "Guardar versión"}
      </button>
    </div>

    <h3 class="client-quote-history-title">Borradores</h3>
    <div class="client-quote-history" id="clientQuoteDrafts"></div>

    <h3 class="client-quote-history-title">Historial de cotizaciones</h3>
    <div class="client-quote-history" id="clientQuoteHistory"></div>
  `;

  renderClientQuoteCostParts();
  renderClientQuoteRows();
  renderClientQuoteDrafts();
  renderClientQuoteVersions();
}

async function loadClientQuoteModule(budgetId) {
  const container = document.querySelector("#clientQuoteModule");
  if (!container) return;
  container.innerHTML = `<div class="client-quote-empty">Cargando cotización cliente...</div>`;
  try {
    clientQuoteData = await api(`/api/budgets/${budgetId}/client-quote`);
    clientQuoteRows = (clientQuoteData.draft?.items || []).map((row) => newClientQuoteRow(row));
    if (!clientQuoteRows.length) clientQuoteRows = [newClientQuoteRow()];
    clientQuoteDiscountAmount = Number(clientQuoteData.draft?.descuentoMonto || 0);
    clientQuoteDiscountPercent = clientQuoteDiscountPercentFromAmount(clientQuoteDiscountAmount);
    clientQuoteDiscountVisible = clientQuoteDiscountPercent > 0;
    clientQuoteSelectedCostParts = new Set();
    clientQuoteVisibleBlock = "";
    editingClientQuoteDraftId = null;
    editingClientQuoteVersionId = null;
    renderClientQuoteModule();
  } catch (error) {
    container.innerHTML = `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`;
  }
}

function normalizeSupplierOrderPercentage(value) {
  const percentage = Number(String(value ?? 100).replace("%", ""));
  if (!Number.isFinite(percentage)) return 100;
  return Math.min(100, Math.max(0, percentage));
}

function newSupplierOrderRow(row = {}) {
  return {
    id: row.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
    presupuesto: row.presupuesto || "equipos",
    proveedorId: Number(row.proveedorId || 0) || null,
    proveedorNombre: row.proveedorNombre || "",
    descripcion: row.descripcion || "",
    cantidad: Number(row.cantidad ?? 1),
    precioUnitario: Number(row.precioUnitario || 0),
    porcentajeAplicado: normalizeSupplierOrderPercentage(row.porcentajeAplicado ?? 100),
    montoBasePresupuesto: Number(row.montoBasePresupuesto || 0)
  };
}

function calculateSupplierOrderBaseTotal(row) {
  return Math.round(Number(row.cantidad || 0) * Number(row.precioUnitario || 0) * 100) / 100;
}

function calculateSupplierOrderTotal(row) {
  return calculateSupplierOrderBaseTotal(row);
}

function calculateSupplierOrderPaymentAmount(row) {
  const base = calculateSupplierOrderBaseTotal(row);
  return Math.round(base * (normalizeSupplierOrderPercentage(row.porcentajeAplicado) / 100) * 100) / 100;
}

function syncSupplierOrderRowsFromDom() {
  document.querySelectorAll("#supplierOrderRows [data-row-id]").forEach((rowElement) => {
    const row = supplierOrderRows.find(
      (item) => String(item.id) === String(rowElement.dataset.rowId)
    );
    if (!row) return;

    rowElement.querySelectorAll("[data-supplier-order-field]").forEach((input) => {
      const field = input.dataset.supplierOrderField;
      if (field === "cantidad") {
        row.cantidad = Number(input.value || 0);
      } else if (field === "precioUnitario") {
        row.precioUnitario = parseCurrency(input.value);
      } else if (field === "porcentajeAplicado") {
        row.porcentajeAplicado = normalizeSupplierOrderPercentage(input.value);
      } else if (field === "presupuesto") {
        row.presupuesto = normalizeBudgetBlock(input.value);
      } else {
        row[field] = input.value;
      }
    });
    row.montoBasePresupuesto = calculateSupplierOrderBaseTotal(row);
  });
}

function supplierOrderPayload() {
  syncSupplierOrderRowsFromDom();
  const retentionBox = document.querySelector("#supplierOrderRetentionBox");
  const providers = getSortedPurchaseProviders();
  const items = supplierOrderRows.map((row) => {
    const provider = resolveProviderFromCatalog(row.proveedorNombre, row.proveedorId, providers);
    return {
      presupuesto: row.presupuesto,
      proveedorId: provider?.id || null,
      proveedorNombre: provider?.empresa || "",
      descripcion: String(row.descripcion || "").trim(),
      cantidad: Number(row.cantidad || 0),
      precioUnitario: Number(row.precioUnitario || 0),
      montoBasePresupuesto: calculateSupplierOrderBaseTotal(row),
      porcentajeAplicado: normalizeSupplierOrderPercentage(row.porcentajeAplicado)
    };
  });
  const invalid = items.find(
    (row) =>
      !row.presupuesto ||
      !row.proveedorId ||
      !row.proveedorNombre ||
      !row.descripcion ||
      row.cantidad <= 0 ||
      row.precioUnitario <= 0 ||
      row.porcentajeAplicado <= 0 ||
      row.porcentajeAplicado > 100
  );
  if (invalid) {
    throw new Error(
      "Selecciona un proveedor registrado y completa descripción, cantidad, precio unitario y un porcentaje entre 0.01% y 100% en todas las partidas OCP."
    );
  }
  return {
    retencionActiva: Boolean(retentionBox && !retentionBox.classList.contains("hidden")),
    retencionMonto: parseCurrency(document.querySelector("#supplierOrderRetentionInput")?.value || 0),
    items
  };
}

function supplierOrderTotal() {
  return supplierOrderRows.reduce((sum, row) => sum + calculateSupplierOrderTotal(row), 0);
}

function supplierOrderPaymentSubtotal() {
  return supplierOrderRows.reduce((sum, row) => sum + calculateSupplierOrderPaymentAmount(row), 0);
}

function supplierOrderGeneralPercentage() {
  if (!supplierOrderRows.length) return 100;
  const values = [...new Set(supplierOrderRows.map((row) => normalizeSupplierOrderPercentage(row.porcentajeAplicado).toFixed(4)))];
  return values.length === 1 ? Number(values[0]) : null;
}

function syncSupplierOrderGeneralPercentageInput() {
  const input = document.querySelector("#supplierOrderGeneralPercentage");
  if (!input) return;
  const percentage = supplierOrderGeneralPercentage();
  if (percentage === null) {
    input.value = "";
    input.placeholder = "Mixto";
  } else {
    input.value = percentage.toFixed(2);
    input.placeholder = "";
  }
}

function getSortedPurchaseProviders() {
  return [...(purchaseFlowData?.providers || [])].sort((a, b) =>
    String(a.empresa || "").localeCompare(String(b.empresa || ""), "es", { sensitivity: "base" })
  );
}


function providerAutocompleteItems(providers = []) {
  return (providers || []).map((provider) => ({
    value: provider.id,
    label: provider.empresa || "Proveedor",
    inputLabel: provider.empresa || "",
    meta: [provider.contacto, provider.telefono].filter(Boolean).join(" · "),
    searchText: `${provider.empresa || ""} ${provider.contacto || ""} ${provider.rfc || ""} ${provider.telefono || ""}`,
    provider
  }));
}

function resolveProviderFromCatalog(value = "", providerId = 0, providers = []) {
  const normalized = normalizeSearchValue(value);
  return (
    (Number(providerId)
      ? (providers || []).find(
          (provider) =>
            Number(provider.id) === Number(providerId) &&
            (!normalized || normalizeSearchValue(provider.empresa) === normalized)
        )
      : null) ||
    (providers || []).find((provider) => normalizeSearchValue(provider.empresa) === normalized) ||
    null
  );
}

function enhanceSupplierOrderProviderPicker() {
  const input = document.querySelector("#supplierOrderProviderInput");
  if (!input) return;
  const controller = attachSmartAutocomplete(input, {
    requireSelection: true,
    validationMessage: "Selecciona un proveedor registrado.",
    emptyText: "No hay proveedores que coincidan",
    getItems: () => providerAutocompleteItems(getSortedPurchaseProviders()),
    onInput: () => {
      input.dataset.providerId = "";
    },
    onSelect: (item) => {
      const provider = item.provider || resolveProviderFromCatalog(item.inputLabel, item.value, getSortedPurchaseProviders());
      input.dataset.providerId = provider?.id || "";
      input.value = provider?.empresa || item.inputLabel || "";
      supplierOrderSelectedCostParts = new Set();
      renderSupplierOrderCostParts();
    }
  });
  const current = resolveProviderFromCatalog(input.value, input.dataset.providerId, getSortedPurchaseProviders());
  if (current) {
    const item = providerAutocompleteItems(getSortedPurchaseProviders()).find((row) => Number(row.value) === Number(current.id));
    if (item) controller.setSelection(item);
  }
}

function enhanceSupplierOrderProviderInputs() {
  document.querySelectorAll("[data-supplier-order-field='proveedorNombre']").forEach((input) => {
    const rowElement = input.closest("[data-row-id]");
    const row = supplierOrderRows.find((item) => String(item.id) === String(rowElement?.dataset.rowId));
    if (!row) return;
    const controller = attachSmartAutocomplete(input, {
      requireSelection: true,
      validationMessage: "Selecciona un proveedor registrado.",
      emptyText: "No hay proveedores que coincidan",
      getItems: () => providerAutocompleteItems(getSortedPurchaseProviders()),
      onInput: (value) => {
        row.proveedorId = null;
        row.proveedorNombre = value;
      },
      onSelect: (item) => {
        const provider = item.provider || resolveProviderFromCatalog(item.inputLabel, item.value, getSortedPurchaseProviders());
        if (!provider) return;
        row.proveedorId = Number(provider.id);
        row.proveedorNombre = provider.empresa || "";
        input.value = provider.empresa || "";
      }
    });
    const provider = resolveProviderFromCatalog(row.proveedorNombre, row.proveedorId, getSortedPurchaseProviders());
    if (provider) {
      row.proveedorId = Number(provider.id);
      row.proveedorNombre = provider.empresa || "";
      const item = providerAutocompleteItems(getSortedPurchaseProviders()).find((candidate) => Number(candidate.value) === Number(provider.id));
      if (item) controller.setSelection(item);
    }
  });
}

function getSelectedSupplierOrderProvider() {
  const input = document.querySelector("#supplierOrderProviderInput");
  const value = normalizeSearchValue(input?.value || "");
  const providerId = Number(input?.dataset.providerId || 0);
  const providers = getSortedPurchaseProviders();
  return (
    providers.find((provider) => Number(provider.id) === providerId && normalizeSearchValue(provider.empresa) === value) ||
    providers.find((provider) => normalizeSearchValue(provider.empresa) === value) ||
    null
  );
}

function renderSupplierOrderRows() {
  const rowsContainer = document.querySelector("#supplierOrderRows");
  const totalElement = document.querySelector("#supplierOrderTotal");
  if (!rowsContainer || !totalElement) return;

  if (!supplierOrderRows.length) supplierOrderRows = [newSupplierOrderRow()];
  rowsContainer.innerHTML = supplierOrderRows
    .map(
      (row) => `
        <article class="supplier-order-row" data-row-id="${row.id}">
          <select data-supplier-order-field="presupuesto" aria-label="Presupuesto" required>
            ${budgetBlockOptions
              .map(
                (block) =>
                  `<option value="${block.value}" ${normalizeBudgetBlock(row.presupuesto) === block.value ? "selected" : ""}>${escapeHtml(block.label)}</option>`
              )
              .join("")}
          </select>
          <input data-supplier-order-field="proveedorNombre" value="${escapeHtml(row.proveedorNombre)}" placeholder="Proveedor" aria-label="Proveedor" required />
          <input data-supplier-order-field="descripcion" value="${escapeHtml(row.descripcion)}" placeholder="Descripción" aria-label="Descripción" required />
          <input data-supplier-order-field="cantidad" type="number" min="0.01" step="0.01" value="${Number(row.cantidad || 0)}" aria-label="Cantidad" required />
          <input class="budget-money-input" data-supplier-order-field="precioUnitario" inputmode="decimal" value="${formatCurrency(row.precioUnitario)}" aria-label="Precio unitario base" required />
          <b data-supplier-order-row-total title="Monto total comprometido en la OCP">${formatCurrency(calculateSupplierOrderTotal(row))}</b>
          <input class="supplier-order-percent-input" data-supplier-order-field="porcentajeAplicado" type="number" min="0.01" max="100" step="0.01" value="${normalizeSupplierOrderPercentage(row.porcentajeAplicado).toFixed(2)}" aria-label="Porcentaje a pagar" title="Porcentaje que el proveedor solicita pagar de esta partida" required />
          <b data-supplier-order-row-payment title="Monto que pasará a Cuentas por pagar">${formatCurrency(calculateSupplierOrderPaymentAmount(row))}</b>
          <button class="icon-button remove-supplier-order-row" type="button" data-row-id="${row.id}" aria-label="Eliminar partida">x</button>
        </article>
      `
    )
    .join("");

  totalElement.textContent = formatCurrency(supplierOrderTotal());
  const paymentElement = document.querySelector("#supplierOrderPaymentTotal");
  if (paymentElement) paymentElement.textContent = formatCurrency(supplierOrderPaymentSubtotal());
  syncSupplierOrderGeneralPercentageInput();
  enhanceSupplierOrderProviderInputs();
}

function renderSupplierOrderCostParts() {
  const list = document.querySelector("#supplierOrderCostParts");
  if (!list || !purchaseFlowData) return;
  const block = supplierOrderVisibleBlock || document.querySelector("#supplierOrderBlockSelect")?.value || "equipos";
  const provider = getSelectedSupplierOrderProvider();
  const providerId = Number(provider?.id || 0);

  if (!providerId) {
    list.innerHTML = `<div class="client-quote-empty">Selecciona un proveedor para cargar partidas.</div>`;
    return;
  }

  const availableBlocks = calculateSupplierOrderAvailableBlocks(purchaseFlowData, editingSupplierOrderVersionId);
  if (Number(availableBlocks[block] || 0) <= 0) {
    list.innerHTML = `<div class="client-quote-empty">No hay presupuesto disponible para este bloque.</div>`;
    return;
  }

  const parts = purchaseFlowData.costParts?.[block] || [];
  if (!parts.length) {
    list.innerHTML = `<div class="client-quote-empty">No hay partidas disponibles para este bloque.</div>`;
    return;
  }

  list.innerHTML = parts
    .map((part, index) => {
      const key = `${block}:${providerId}:${index}`;
      return `
        <label class="client-quote-part">
          <input type="checkbox" data-supplier-order-part="${key}" ${supplierOrderSelectedCostParts.has(key) ? "checked" : ""} />
          <span>${escapeHtml(part.descripcion || "Partida sin descripción")}</span>
          <strong>${formatCurrency(part.precioUnitario || 0)}</strong>
        </label>
      `;
    })
    .join("");

  if (provider) {
    const input = document.querySelector("#supplierOrderProviderInput");
    if (input) {
      input.dataset.providerId = provider.id;
      input.value = provider.empresa || "";
    }
  }
}

function renderSupplierOrderFiles() {
  const list = document.querySelector("#supplierOrderFilesList");
  if (!list) return;
  const files = purchaseFlowData?.files || [];
  if (!files.length) {
    list.innerHTML = `<div class="budget-documents-row"><span>Cotización proveedor</span><span>No hay cotizaciones de proveedor cargadas aún</span><span></span></div>`;
    return;
  }

  list.innerHTML = files
    .map(
      (file) => `
        <div class="budget-documents-row">
          <span>${escapeHtml(file.tipo || "Cotización proveedor")}</span>
          <span>${renderFileNameLink(file)}</span>
          <span>
            ${
              canDeleteRecords()
                ? `<button class="small-button danger-button" type="button" data-supplier-order-file-delete="${file.id}">Eliminar</button>`
                : ""
            }
          </span>
        </div>
      `
    )
    .join("");
}

function budgetBlockLabel(value = "") {
  const normalized = normalizeBudgetBlock(value);
  return budgetBlockOptions.find((block) => block.value === normalized)?.label || String(value || "Presupuesto");
}

function renderBudgetMovementHistory(transfers = [], additionals = []) {
  const movements = [
    ...(additionals || []).map((item) => ({ ...item, movementType: "additional" })),
    ...(transfers || []).map((item) => ({ ...item, movementType: "transfer" }))
  ].sort((first, second) => new Date(second.createdAt || 0) - new Date(first.createdAt || 0));

  if (!movements.length) {
    return `<div class="client-quote-empty">Todavía no hay cambios registrados en el presupuesto.</div>`;
  }

  return movements
    .map((movement) => {
      const isAdditional = movement.movementType === "additional";
      const title = isAdditional
        ? `Presupuesto adicional · ${budgetBlockLabel(movement.bloque)}`
        : `Transferencia · ${budgetBlockLabel(movement.origen)} → ${budgetBlockLabel(movement.destino)}`;
      return `
        <article class="client-quote-history-row">
          <div>
            <strong>${escapeHtml(title)}</strong>
            <span>${escapeHtml(formatDate(movement.createdAt))} · ${escapeHtml(movement.registradoPor || "Sistema")}</span>
            ${movement.nota ? `<span>${escapeHtml(movement.nota)}</span>` : ""}
          </div>
          <div class="client-quote-history-actions"><strong>${formatCurrency(movement.monto || 0)}</strong></div>
        </article>`;
    })
    .join("");
}

function renderExpenseReassignmentHistory(items = [], emptyText = "Sin reasignaciones registradas.") {
  if (!items.length) return `<div class="client-quote-empty">${escapeHtml(emptyText)}</div>`;
  return items
    .map(
      (item) => `
        <article class="client-quote-history-row">
          <div>
            <strong>${escapeHtml(item.folio || item.tipoDocumento || "Movimiento")}: ${escapeHtml(item.origenReferencia || "Origen")} → ${escapeHtml(item.destinoReferencia || "Destino")}</strong>
            <span>${escapeHtml(formatDate(item.createdAt))} · ${escapeHtml(item.registradoPor || "Sistema")}</span>
            <span>Motivo: ${escapeHtml(item.motivo || "Sin motivo capturado")}</span>
          </div>
        </article>`
    )
    .join("");
}

let expenseReassignmentContext = null;

function closeExpenseReassignmentDialog() {
  const modal = document.querySelector("#expenseReassignmentModal");
  if (modal) modal.classList.add("hidden");
  expenseReassignmentContext = null;
}

function ensureExpenseReassignmentDialog() {
  let modal = document.querySelector("#expenseReassignmentModal");
  if (modal) return modal;
  document.body.insertAdjacentHTML(
    "beforeend",
    `<section class="modal hidden" id="expenseReassignmentModal" aria-label="Reasignar gasto">
      <form class="modal-panel user-form" id="expenseReassignmentForm">
        <div class="modal-heading">
          <div><p class="eyebrow">Auditoría de gastos</p><h2 id="expenseReassignmentTitle">Mover gasto</h2></div>
          <button class="modal-close" type="button" data-expense-reassignment-close aria-label="Cerrar">x</button>
        </div>
        <span class="modal-status" id="expenseReassignmentStatus"></span>
        <div class="form-grid">
          <label class="wide-field"><span>Destino</span><select name="destinationId" id="expenseReassignmentDestination" required></select></label>
          <label class="wide-field"><span>Motivo del movimiento</span><textarea name="reason" rows="4" maxlength="500" required placeholder="Explica por qué se mueve; quedará en el historial."></textarea></label>
        </div>
        <div class="modal-actions">
          <button class="secondary-button" type="button" data-expense-reassignment-close>Cancelar</button>
          <button class="success-button" type="submit">Mover y registrar</button>
        </div>
      </form>
    </section>`
  );
  modal = document.querySelector("#expenseReassignmentModal");
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-expense-reassignment-close]")) {
      closeExpenseReassignmentDialog();
    }
  });
  modal.querySelector("#expenseReassignmentForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!expenseReassignmentContext) return;
    const form = event.currentTarget;
    const status = form.querySelector("#expenseReassignmentStatus");
    const submit = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const destinationId = Number(formData.get("destinationId") || 0);
    const reason = String(formData.get("reason") || "").trim();
    if (!destinationId || !reason) return;
    submit.disabled = true;
    if (status) status.textContent = "Moviendo y registrando el cambio...";
    try {
      const context = expenseReassignmentContext;
      const data = await api(context.endpoint, {
        method: "PATCH",
        body: JSON.stringify(
          context.type === "OCP"
            ? { presupuestoId: destinationId, motivo: reason }
            : { gastoFijoId: destinationId, motivo: reason }
        )
      });
      closeExpenseReassignmentDialog();
      showSuccessToast(data.message || "El gasto se movió y quedó registrado.", "Gasto reasignado");
      if (context.type === "OCP") {
        await openPurchaseDetail(Number(data.destinationBudgetId), { orderId: context.recordId });
        await loadPurchasesModule();
      } else {
        await loadPurchaseFixedExpenseCatalogs();
        renderPurchaseFixedExpenseDetail(data);
        await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
        await loadPurchasesModule();
      }
    } catch (error) {
      if (status) status.textContent = error.message || "No se pudo mover el gasto.";
    } finally {
      submit.disabled = false;
    }
  });
  return modal;
}

async function openExpenseReassignmentDialog({ type, recordId, folio = "", currentDestinationId = 0 }) {
  const normalizedType = String(type || "").toUpperCase();
  const modal = ensureExpenseReassignmentDialog();
  const title = modal.querySelector("#expenseReassignmentTitle");
  const select = modal.querySelector("#expenseReassignmentDestination");
  const status = modal.querySelector("#expenseReassignmentStatus");
  const form = modal.querySelector("#expenseReassignmentForm");
  form?.reset();
  if (status) status.textContent = "Cargando destinos disponibles...";
  if (title) title.textContent = `Mover ${folio || normalizedType}`;
  select.innerHTML = `<option value="">Cargando...</option>`;
  modal.classList.remove("hidden");

  try {
    let options = [];
    if (normalizedType === "OCP") {
      const data = await api("/api/budgets?all=1");
      options = (data.budgets || [])
        .filter((budget) => Number(budget.id) !== Number(currentDestinationId))
        .map((budget) => ({
          id: budget.id,
          label: [budget.folio, budget.tituloProyecto, budget.empresa, getBudgetDisplayFields(budget).sucursal].filter(Boolean).join(" · ")
        }));
    } else {
      if (!purchaseFixedExpenseCatalogs.fixedExpenses?.length) await loadPurchaseFixedExpenseCatalogs();
      options = (purchaseFixedExpenseCatalogs.fixedExpenses || [])
        .filter((expense) => Number(expense.id) !== Number(currentDestinationId))
        .map((expense) => ({ id: expense.id, label: [expense.gasto, expense.sucursal].filter(Boolean).join(" · ") }));
    }
    select.innerHTML = `<option value="">Selecciona destino</option>${options
      .map((option) => `<option value="${Number(option.id)}">${escapeHtml(option.label || `Registro ${option.id}`)}</option>`)
      .join("")}`;
    if (status) status.textContent = options.length ? "El movimiento conservará folio, documentos e historial." : "No hay destinos disponibles.";
    expenseReassignmentContext = {
      type: normalizedType,
      recordId: Number(recordId),
      endpoint:
        normalizedType === "OCP"
          ? `/api/supplier-orders/${Number(recordId)}/reassign`
          : `/api/purchases/fixed-expenses/${Number(recordId)}/reassign`
    };
  } catch (error) {
    if (status) status.textContent = error.message || "No se pudieron cargar los destinos.";
    expenseReassignmentContext = null;
  }
}

function renderSupplierOrderVersions() {
  const list = document.querySelector("#supplierOrderHistory");
  if (!list) return;
  const versions = purchaseFlowData?.versions || [];
  if (!versions.length) {
    list.innerHTML = `<div class="client-quote-empty">Sin versiones OCP guardadas.</div>`;
    return;
  }

  list.innerHTML = versions
    .map((order) => {
      const isApproved = order.estatus === "Aprobada";
      const isCancelled = order.estatus === "Cancelada";
      const isContextLocked = Boolean(activeSupplierOrderContextId) && Number(order.id) !== Number(activeSupplierOrderContextId);
      return `
        <article class="client-quote-history-row">
          <div>
            <strong>${escapeHtml(order.folio)}</strong>
            <span>${formatDate(order.createdAt)} · Versión ${order.version} · ${escapeHtml(order.estatus || "Pendiente de aprobación")}</span>
          </div>
          <div class="client-quote-history-actions">
            ${
              isApproved && !isCancelled
                ? `<a class="small-button" href="/api/supplier-orders/${order.id}/download" target="_blank" rel="noreferrer">Descargar</a>`
                : ""
            }
            <button class="small-button dark-button" type="button" data-supplier-order-preview="${order.id}">Vista previa</button>
            ${
              !isApproved && !isCancelled && canApproveRecords() && !isContextLocked
                ? `<button class="success-button small-button" type="button" data-supplier-order-approve="${order.id}">✓ Aprobar</button>`
                : ""
            }
            ${
              isApproved && !isCancelled && isCurrentUserSuperAdmin() && !isContextLocked
                ? `<button class="small-button" type="button" data-supplier-order-regenerate="${order.id}">Regenerar PDF</button>`
                : ""
            }
            ${!isCancelled && !isContextLocked ? `<button class="small-button" type="button" data-supplier-order-edit-version="${order.id}">Editar</button>` : ""}
            ${!isCancelled && isCurrentUserSuperAdmin() ? `<button class="small-button" type="button" data-supplier-order-reassign="${order.id}" data-supplier-order-folio="${escapeHtml(order.folio)}">Mover de proyecto</button>` : ""}
            ${!isCancelled && !isContextLocked ? `<button class="small-button danger-button" type="button" data-supplier-order-cancel="${order.id}">Cancelar</button>` : ""}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderClientPoModule() {
  const container = document.querySelector("#clientPoModule");
  if (!container || !purchaseFlowData) return;
  const po = purchaseFlowData.clientPo;
  const sharedPo = po?.shared;
  const sharedMembers = sharedPo?.members || [];

  container.innerHTML = `
    <h3>PO del Cliente</h3>
    ${
      sharedPo
        ? `<section class="client-po-shared-summary">
          <div class="client-po-shared-heading">
            <span class="status-pill">PO compartida</span>
            <strong>Total del documento: ${formatCurrency(sharedPo.montoTotal || 0)}</strong>
          </div>
          <p>Esta PO está relacionada con ${sharedMembers.length} proyectos. A este proyecto le corresponden <b>${formatCurrency(po.montoAsignado || 0)}</b>.</p>
          <div class="client-po-shared-members">
            ${sharedMembers
              .map(
                (member) => `<div>
                  <span><b>${escapeHtml(member.folio || "Sin folio")}</b> · ${escapeHtml(member.proyecto || "Sin título")}</span>
                  <strong>${formatCurrency(member.montoAsignado || 0)}</strong>
                </div>`
              )
              .join("")}
          </div>
        </section>`
        : ""
    }
    <form class="client-po-form" id="clientPoForm">
      <label class="file-upload-inline">
        <span>${po ? (sharedPo ? "Separar este proyecto y reemplazar su PO" : "Reemplazar archivo de PO") : "Selecciona la PO del cliente"}</span>
        <input name="poArchivo" type="file" />
      </label>
      ${
        !po || po.sinPo
          ? `<label class="inline-check-field client-po-check">
            <input name="sinPo" type="checkbox" ${po?.sinPo ? "checked" : ""} />
            <span>Sin PO</span>
          </label>`
          : ""
      }
      <button class="success-button" id="clientPoSubmitButton" type="submit">
        ${po ? (po.sinPo ? "Confirmar sin PO" : sharedPo ? "Separar y reemplazar PO" : "Reemplazar PO") : "Subir PO Cliente"}
      </button>
    </form>
    ${
      po
        ? `<div class="client-po-current">
          <div>
            <span>${po.sinPo ? "Sin PO" : `PO: ${escapeHtml(po.numeroPo || "Sin número")}`}</span>
              ${po.url ? `<a class="small-button dark-button" href="${escapeHtml(po.url)}" target="_blank" rel="noreferrer">Vista previa</a>` : ""}
          </div>
            <button class="small-button danger-button" type="button" data-client-po-delete>${sharedPo ? "Quitar este proyecto de la PO" : "Quitar PO"}</button>
          </div>`
        : `<div class="client-quote-empty">Carga la PO del cliente o marca Sin PO para habilitar compras.</div>`
    }
    ${sharedPo ? `<p class="client-po-shared-note">Quitar o reemplazar aquí sólo afecta a este proyecto; la PO seguirá disponible para los demás.</p>` : ""}
  `;
}

function renderSupplierOrderModule() {
  const container = document.querySelector("#supplierOrderModule");
  if (!container || !purchaseFlowData) return;
  if (!purchaseFlowData.purchasesEnabled) {
    container.innerHTML = "";
    return;
  }

  const budget = purchaseFlowData.budget || {};
  const blockTotals = calculateSupplierOrderAvailableBlocks(purchaseFlowData, editingSupplierOrderVersionId);
  const draft = purchaseFlowData.draft;
  const retentionValue = draft?.retencionMonto || 0;
  const retentionActive = draft?.retencionActiva || false;

  container.innerHTML = `
    <h3>Orden de Compra Proveedor</h3>
    <section class="budget-block-panel supplier-budget-panel">
      <h3>Presupuestos disponibles para compra</h3>
      <div class="budget-block-cards">
        ${budgetBlockOptions
          .map(
            (block) => `
              <article>
                <span>${escapeHtml(block.label)}</span>
                <strong>${formatCurrency(blockTotals[block.value] || 0)}</strong>
              </article>
            `
          )
          .join("")}
        <article>
          <span>Presupuesto adicional</span>
          <strong>${formatCurrency(budget.totalAdicional || 0)}</strong>
        </article>
      </div>
      <form class="budget-block-form" data-budget-block-form="transfer">
        <h4>Transferir presupuesto</h4>
        <select name="origen">${renderBudgetBlockOptions("equipos")}</select>
        <select name="destino">${renderBudgetBlockOptions("materiales")}</select>
        <input class="budget-money-input" name="monto" inputmode="decimal" placeholder="$0.00" />
        <button class="small-button" type="submit">Transferir</button>
      </form>
      <form class="budget-block-form" data-budget-block-form="additional">
        <h4>Agregar presupuesto adicional</h4>
        <select name="bloque">${renderBudgetBlockOptions("materiales")}</select>
        <input class="budget-money-input" name="monto" inputmode="decimal" placeholder="$0.00" />
        <button class="small-button" type="submit">Agregar</button>
      </form>
      <h3 class="client-quote-history-title">Historial de cambios al presupuesto</h3>
      <div class="client-quote-history">${renderBudgetMovementHistory(purchaseFlowData.transfers || [], purchaseFlowData.additionals || [])}</div>
    </section>

    ${renderBudgetSupplierQuoteDocuments(purchaseFlowData.budgetFiles || [], {
      eyebrow: "Archivos del presupuesto",
      title: "Documentos del proyecto",
      emptyText: "Sin documentos cargados en presupuesto"
    })}

    <section class="client-quote-cost-picker supplier-order-picker">
      <label>
        <span>Partidas de la orden</span>
        <select id="supplierOrderBlockSelect">
          ${budgetBlockOptions.map((block) => `<option value="${block.value}">${escapeHtml(block.label)}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>Proveedor</span>
        <input id="supplierOrderProviderInput" list="supplierOrderProviderList" placeholder="Buscar o seleccionar proveedor" autocomplete="off" />
        <datalist id="supplierOrderProviderList">
          ${getSortedPurchaseProviders()
            .map((provider) => `<option value="${escapeHtml(provider.empresa)}"></option>`)
            .join("")}
        </datalist>
      </label>
      <button class="ghost-button client-quote-ghost" type="button" data-supplier-order-action="add-selected-parts">Agregar seleccionadas</button>
      <div class="client-quote-parts-list" id="supplierOrderCostParts"></div>
    </section>

    <section class="supplier-order-table">
      <div class="supplier-order-head">
        <span>Presupuesto</span>
        <span>Proveedor</span>
        <span>Descripción</span>
        <span>Cantidad</span>
        <span>Precio unitario</span>
        <span>Total OCP</span>
        <span>% a pagar</span>
        <span>Monto a pagar</span>
        <span>Acción</span>
      </div>
      <div id="supplierOrderRows"></div>
    </section>
    <div class="client-quote-total-row">
      <div class="client-quote-actions">
        <button class="small-button" type="button" data-supplier-order-action="add-row">+ Agregar fila</button>
        <button class="success-button" type="button" data-supplier-order-action="save-draft">Guardar borrador</button>
        <button class="success-button" type="button" data-supplier-order-action="save-version">
          ${editingSupplierOrderVersionId ? "Actualizar versión" : "Guardar versión"}
        </button>
        <button class="ghost-button client-quote-ghost" type="button" data-supplier-order-action="toggle-retention">Retención de impuestos</button>
      </div>
      <div class="supplier-order-general-percent">
        <label for="supplierOrderGeneralPercentage">
          <span>% general a pagar</span>
          <input id="supplierOrderGeneralPercentage" type="number" min="0.01" max="100" step="0.01" value="${supplierOrderGeneralPercentage() === null ? "" : supplierOrderGeneralPercentage().toFixed(2)}" placeholder="Mixto" aria-label="Porcentaje general a pagar" />
        </label>
        <button class="ghost-button client-quote-ghost" type="button" data-supplier-order-action="apply-general-percentage">Aplicar a todas</button>
        <small>Aplica el mismo porcentaje a todas las partidas. Después puedes ajustar una partida individual si lo necesitas.</small>
      </div>
      <div class="supplier-order-total-stack">
        <div class="client-quote-total">Total OCP proveedor: <strong id="supplierOrderTotal">$0.00</strong></div>
        <div class="client-quote-total">Pago solicitado: <strong id="supplierOrderPaymentTotal">$0.00</strong></div>
      </div>
    </div>
    <div class="supplier-order-retention ${retentionActive ? "" : "hidden"}" id="supplierOrderRetentionBox">
      <label>
        <span>Retención de impuestos</span>
        <input class="budget-money-input" id="supplierOrderRetentionInput" inputmode="decimal" value="${formatCurrency(retentionValue)}" />
      </label>
    </div>

    <section class="budget-documents-card">
      <div class="budget-documents-heading">
        <div>
          <span>Cotización del proveedor para esta OCP</span>
          <h3>Archivos de proveedor</h3>
        </div>
      </div>
      <form class="supplier-order-file-form" id="supplierOrderFileForm">
        <input name="archivos" type="file" multiple />
        <button class="small-button" type="submit">Subir cotizaciones</button>
      </form>
      <div class="budget-documents-table">
        <div class="budget-documents-head">
          <span>Tipo</span>
          <span>Nombre</span>
          <span>Acción</span>
        </div>
        <div id="supplierOrderFilesList"></div>
      </div>
    </section>

    <h3 class="client-quote-history-title">Historial de OCP de Proveedor</h3>
    <div class="client-quote-history" id="supplierOrderHistory"></div>
    <h3 class="client-quote-history-title">Historial de reasignaciones OCP</h3>
    <div class="client-quote-history">${renderExpenseReassignmentHistory(purchaseFlowData.reassignments || [])}</div>
  `;

  enhanceSupplierOrderProviderPicker();
  renderSupplierOrderCostParts();
  renderSupplierOrderRows();
  renderSupplierOrderFiles();
  renderSupplierOrderVersions();
}

async function loadPurchaseFlowModule(budgetId) {
  const poContainer = document.querySelector("#clientPoModule");
  const orderContainer = document.querySelector("#supplierOrderModule");
  if (!poContainer && !orderContainer) return;
  if (poContainer) poContainer.innerHTML = `<div class="client-quote-empty">Cargando PO del cliente...</div>`;
  if (orderContainer) orderContainer.innerHTML = "";
  try {
    purchaseFlowData = await api(`/api/budgets/${budgetId}/purchase-flow`);
    supplierOrderRows = (purchaseFlowData.draft?.items || []).map((row) => newSupplierOrderRow(row));
    if (!supplierOrderRows.length) supplierOrderRows = [newSupplierOrderRow()];
    supplierOrderSelectedCostParts = new Set();
    supplierOrderVisibleBlock = "";
    editingSupplierOrderVersionId = null;
    if (poContainer) renderClientPoModule();
    if (orderContainer) renderSupplierOrderModule();
  } catch (error) {
    if (poContainer) poContainer.innerHTML = `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`;
    if (orderContainer) orderContainer.innerHTML = `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`;
  }
}

function renderBudgetDetail(data) {
  const budget = data.budget;
  const costs = data.costs || {};
  const files = data.files || [];
  const transfers = data.transfers || [];
  const additionals = data.additionals || [];
  const canAdmin = isCurrentUserSuperAdmin();
  const canApprove = canApproveRecords();
  const deletionLock = data.deletionLock || {};
  const canDelete = isCurrentUserSuperAdmin();
  const canEdit = isBudgetEditable(budget);
  const isClosed = normalizeSearchValue(budget.estado).includes("cerrad");
  const budgetDisplay = getBudgetDisplayFields(budget);
  const blockTotals = data.availableBlocks
    ? normalizeBudgetBlockTotals(data.availableBlocks)
    : calculateBudgetBlocks(budget, transfers, additionals);
  const financials = calculateBudgetFinancials(budget);
  const actionButtons = `
    ${canEdit ? `<button class="small-button edit-budget-detail-button" type="button">Editar presupuesto</button>` : ""}
    ${
      isClosed
        ? `${canAdmin ? `<button class="small-button budget-detail-status-button" type="button" data-action="reopen">🔓 Reabrir</button>` : ""}
           ${canDelete ? `<button class="small-button danger-button delete-budget-detail-button icon-only-button" type="button" aria-label="Eliminar">×</button>` : ""}`
        : `${canApprove ? `<button class="small-button budget-detail-status-button" type="button" data-action="approve">✓ Aprobar</button>
             <button class="small-button danger-button budget-detail-status-button" type="button" data-action="reject">✕ No aprobar</button>` : ""}
           ${canAdmin ? `<button class="small-button budget-detail-status-button" type="button" data-action="close">🔒 Cerrar orden</button>` : ""}
           ${canDelete ? `<button class="small-button danger-button delete-budget-detail-button icon-only-button" type="button" aria-label="Eliminar">×</button>` : ""}`
    }
  `;
  budgetDetailActions.classList.toggle("hidden", !actionButtons.trim());
  budgetDetailActions.dataset.budgetId = budget.id;
  budgetDetailActions.innerHTML = actionButtons;
  if (!isCurrentUserSuperAdmin() && deletionLock.locked) {
    budgetDetailActions.insertAdjacentHTML(
      "beforeend",
      `<span class="budget-deletion-lock" title="${escapeHtml(deletionLock.reason || "El proyecto ya está protegido contra eliminación.")}">🔐 Eliminación protegida</span>`
    );
  }
  activeBudgetDetailId = budget.id;

  const equipmentRows = (costs.equipos || []).map((row) =>
    renderBudgetReadonlyRow([
      escapeHtml(row.item || ""),
      String(normalizeWholeQuantity(row.cantidadEquipos)),
      String(normalizeWholeQuantity(row.cantidadUm)),
      escapeHtml(row.unidadMedida || ""),
      formatCurrency(row.costoUnitario || 0),
      formatCurrency(row.flete || 0),
      formatCurrency(row.subtotal || 0)
    ])
  );
  const contractorRows = (costs.contratistas || []).map((row) =>
    renderBudgetReadonlyRow([
      escapeHtml(row.descripcion || ""),
      String(normalizeWholeQuantity(row.cantidad)),
      formatCurrency(row.costo || 0),
      formatCurrency(row.subtotal || 0)
    ])
  );
  const laborRows = (costs.manoObra || []).map((row) =>
    renderBudgetReadonlyRow([
      escapeHtml(row.descripcion || ""),
      String(normalizeWholeQuantity(row.personas)),
      String(normalizeWholeQuantity(row.horas)),
      String(normalizeWholeQuantity(row.horasTotal)),
      formatCurrency(row.costoHora || 0),
      String(normalizeWholeQuantity(row.comidas)),
      formatCurrency(row.costoComida || 0),
      formatCurrency(row.subtotal || 0)
    ])
  );
  const materialRows = (costs.materiales || []).map((row) =>
    renderBudgetReadonlyRow([
      escapeHtml(row.descripcion || ""),
      String(normalizeWholeQuantity(row.cantidad)),
      escapeHtml(row.unidad || ""),
      formatCurrency(row.costo || 0),
      formatCurrency(row.subtotal || 0)
    ])
  );

  budgetDetailContent.innerHTML = `
    <section class="budget-detail-card${isClosed ? " budget-is-closed" : ""}">
      ${isClosed ? `<div class="budget-closed-detail-ribbon"><span>✓</span><strong>CERRADA</strong><small>Esta cotización / proyecto fue cerrado</small></div>` : ""}
      <div class="budget-detail-grid">
        <label><span>Empresa</span><input value="${escapeHtml(budget.empresa)}" readonly /></label>
        <label><span>Sucursal</span><input value="${escapeHtml(budgetDisplay.sucursal || "")}" readonly /></label>
        <label><span>Cliente/Usuario</span><input value="${escapeHtml(budgetDisplay.clienteUsuario || "")}" readonly /></label>
        <label><span>Área</span><input value="${escapeHtml(budget.area || "")}" readonly /></label>
        <label><span>Fecha</span><input value="${escapeHtml(formatDate(budget.createdAt))}" readonly /></label>
        <label class="wide-field"><span>Título del proyecto</span><input value="${escapeHtml(budget.tituloProyecto || "")}" readonly /></label>
        <label><span>Folio</span><input value="${escapeHtml(budget.folio || "")}" readonly /></label>
        <label><span>PO</span><input value="${escapeHtml(budget.po || "")}" readonly /></label>
        <label><span>Estado</span><input value="${escapeHtml(budget.estado || "Abierta")}" readonly /></label>
        <label><span>Estatus</span><input value="${escapeHtml(budget.estatus || "En espera de aprobación")}" readonly /></label>
        <label><span>Owner</span><input value="${escapeHtml(budget.owner || "Sin owner")}" readonly /></label>
      </div>
    </section>

    <section class="budget-costs-access">
      <button class="small-button toggle-budget-detail-costs" type="button">Ver costos</button>
    </section>

    <section class="budget-readonly-stack hidden" id="budgetReadonlyCosts">
      ${renderBudgetReadonlyTable(
        "Equipos de elevación e izaje",
        ["Item", "Cant. equipos", "Cant. U.M.", "U.M.", "Costo unitario", "Flete", "Subtotal"],
        equipmentRows,
        budget.totalEquipos
      )}
      ${renderBudgetReadonlyTable(
        "Contratista a destajo",
        ["Descripción", "Cantidad", "Costo", "Subtotal"],
        contractorRows,
        budget.totalContratistas
      )}
      ${renderBudgetReadonlyTable(
        "Mano de obra externa / interna",
        ["Descripción", "Personas", "Horas", "Horas total", "Costo/hora", "Comidas", "Costo comida", "Subtotal"],
        laborRows,
        budget.totalManoObra
      )}
      ${renderBudgetReadonlyTable(
        "Materiales",
        ["Descripción", "Cantidad", "Unidad", "Costo", "Subtotal"],
        materialRows,
        budget.totalMateriales
      )}
      <label class="budget-warranty-check">
        <input type="checkbox" data-budget-financial-toggle="sinGarantia" ${budget.sinGarantia ? "checked" : ""} />
        <span>Sin garantía</span>
      </label>
    </section>

    ${renderBudgetSupplierQuoteDocuments(files, { canDelete: canDeleteRecords() })}

    <section class="budget-block-panel">
      <h3>Presupuesto disponible por bloque</h3>
      <div class="budget-block-cards">
        ${budgetBlockOptions
          .map(
            (block) => `
              <article>
                <span>${escapeHtml(block.label)}</span>
                <strong>${formatCurrency(blockTotals[block.value] || 0)}</strong>
              </article>
            `
          )
          .join("")}
        <article>
          <span>Presupuesto adicional</span>
          <strong>${formatCurrency(budget.totalAdicional || 0)}</strong>
        </article>
      </div>
      <h3 class="client-quote-history-title">Historial de cambios al presupuesto</h3>
      <div class="client-quote-history">${renderBudgetMovementHistory(transfers, additionals)}</div>
    </section>

    <section class="budget-financial-panel">
      <h3>Resumen Financiero</h3>
      <div class="budget-financial-grid">
        ${
          canAdmin
            ? `<form class="budget-financial-field" data-budget-financial-form="value">
                <label>
                  <span>Factor de venta</span>
                  <input name="valorVenta" type="number" min="0" step="0.0001" value="${Number(financials.saleValue || 0)}" />
                </label>
                <button class="success-button" type="submit">Actualizar valor</button>
              </form>`
            : `<label class="budget-financial-field">
                <span>Factor de venta</span>
                <input value="${Number(financials.saleValue || 0).toFixed(4).replace(/\.?0+$/, "")}" readonly />
              </label>`
        }
        <label class="budget-financial-field">
          <span>Costo de cotización</span>
          <input value="${formatCurrency(financials.quoteCost)}" readonly />
        </label>
        <label class="budget-financial-field">
          <span>Precio de venta</span>
          <input value="${formatCurrency(financials.salePrice)}" readonly />
        </label>
      </div>

      ${
        canAdmin
          ? `<form class="budget-financial-grid budget-financial-profit" data-budget-financial-form="utility">
              <label class="budget-financial-field">
                <span>Utilidad bruta</span>
                <input value="${formatCurrency(financials.grossProfit)}" readonly />
              </label>
              <label class="budget-financial-field">
                <span>Comisión supervisor (%)</span>
                <input name="comisionSupervisor" type="number" min="0" max="100" step="0.01" value="${Number(financials.supervisorRate || 0).toFixed(2)}" />
              </label>
              <label class="budget-financial-field">
                <span>Comisión supervisor ($)</span>
                <input value="${formatCurrency(financials.supervisorCommission)}" readonly />
              </label>
              <label class="budget-financial-field is-highlight">
                <span>Utilidad Total</span>
                <input value="${formatCurrency(financials.totalProfit)}" readonly />
              </label>
              <button class="success-button" type="submit">Actualizar utilidad</button>
            </form>`
          : ""
      }
    </section>
    ${
      canShowClientQuoteFlow(budget)
        ? `<section class="client-quote-module" id="clientQuoteModule"></section>
           ${canManageClientPo() ? `<section class="client-quote-module" id="clientPoModule"></section>` : ""}`
        : ""
    }
  `;

  if (canShowClientQuoteFlow(budget)) {
    loadClientQuoteModule(budget.id);
    loadPurchaseFlowModule(budget.id);
  }
}

async function openBudgetDetail(budgetId, options = {}) {
  if (options.persist !== false) saveDetailLocation("presupuesto", "detail", budgetId);
  budgetsListView.classList.add("hidden");
  budgetDetailView.classList.remove("hidden");
  budgetDetailContent.innerHTML = `<div class="empty-state">Cargando presupuesto...</div>`;

  try {
    const data = await api(`/api/budgets/${budgetId}`);
    renderBudgetDetail(data);
  } catch (error) {
    budgetDetailContent.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function closeBudgetDetail() {
  activeBudgetDetailId = null;
  saveModuleLocation("presupuesto");
  budgetDetailView.classList.add("hidden");
  budgetsListView.classList.remove("hidden");
}

async function loadBudgets() {
  const search = budgetsSearch.value.trim();
  const data = await api(`/api/budgets?search=${encodeURIComponent(search)}`);
  renderBudgets(data.budgets || []);
  refreshNavigationBadges();
}

async function loadBudgetsModule() {
  try {
    await loadBudgets();
  } catch (error) {
    budgetsCardList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function renderHomeActivity(items = []) {
  const activityList = document.querySelector("#homeActivityList");
  if (!activityList) return;
  activityList.innerHTML = items.length
    ? items
        .slice(0, 6)
        .map(
          (item) => `
            <article class="home-activity-item">
              <span class="home-activity-dot ${escapeHtml(item.type || "")}"></span>
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <small>${escapeHtml(item.detail)}</small>
              </div>
              <time>${escapeHtml(formatDate(item.date))}</time>
            </article>
          `
        )
        .join("")
    : `<div class="home-empty">Sin movimientos recientes.</div>`;
}

function renderHomePendingList(items = []) {
  const pendingList = document.querySelector("#homePendingList");
  if (!pendingList) return;
  if (!items.length) {
    pendingList.innerHTML = `<div class="home-empty">Sin pendientes visibles para tu rol.</div>`;
    return;
  }
  pendingList.innerHTML = items
    .map(
      (item) => `
        <button class="home-pending-item" type="button" data-home-module="${escapeHtml(item.module)}" ${item.filter ? `data-home-filter="${escapeHtml(item.filter)}"` : ""}>
          <span class="home-pending-dot"></span>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <small>${escapeHtml(item.detail)}</small>
          </div>
          <b data-counter-value="${Number(item.count || 0)}">${formatInteger(0)}</b>
        </button>
      `
    )
    .join("");
  animateCounters(pendingList);
}

function reportBarRows(items = [], { currency = true } = {}) {
  const max = Math.max(...items.map((item) => Number(item.value || 0)), 1);
  return items.length
    ? items
        .map((item) => {
          const value = Number(item.value || 0);
          return `
            <div class="report-bar-row">
              <div>
                <strong>${escapeHtml(item.label)}</strong>
                <span data-counter-format="${currency ? "currency" : "integer"}" data-counter-value="${value}">
                  ${currency ? formatCurrency(0) : formatInteger(0)}
                </span>
              </div>
              <i style="--bar-width: ${Math.max(4, (value / max) * 100).toFixed(2)}%"></i>
            </div>
          `;
        })
        .join("")
    : `<div class="home-empty">Sin datos para mostrar</div>`;
}

function formatReportMonth(label) {
  if (!label || label === "Sin fecha") return "Sin fecha";
  const date = new Date(`${label}-01T12:00:00`);
  if (Number.isNaN(date.getTime())) return label;
  return new Intl.DateTimeFormat("es-MX", { month: "short", year: "numeric" }).format(date);
}


const REPORT_EXPORT_TYPES = [
  ["ocp", "OCP"],
  ["occom", "OCCOM"],
  ["ocgf", "OCGF"],
  ["accounts-payable", "Cuentas por pagar"],
  ["accounts-receivable", "Cuentas por cobrar"],
  ["quotes-collected", "Cotizaciones cobradas"],
  ["commissions", "Comisiones"],
  ["project-expenses", "Gasto por proyecto (OCP + OCCOM + gastos adicionales)"],
  ["budget-movements", "Historial de cambios a presupuestos"],
  ["expense-reassignments", "Reasignaciones OCP / OCGF"],
  ["quote-performance", "Cotizaciones por vendedor"],
  ["loans", "Préstamos"],
  ["projects", "Proyectos"],
  ["sales", "Ventas"]
];

const REPORT_EXPORT_FILTER_FIELDS = {
  provider: "reportExportProviderField",
  supervisor: "reportExportSupervisorField",
  branch: "reportExportBranchField",
  project: "reportExportProjectField",
  folio: "reportExportFolioField",
  company: "reportExportCompanyField",
  client: "reportExportClientField",
  status: "reportExportStatusField",
  terms: "reportExportTermsField",
  paymentState: "reportExportPaymentStateField",
  type: "reportExportSourceTypeField"
};

async function loadReportExportCache(force = false) {
  if (reportExportCache && !force) return reportExportCache;
  reportExportCache = await api("/api/exports/data");
  return reportExportCache;
}

function reportPaymentTerms(item = {}) {
  const raw = String(item.paymentTerms || item.condicionesPago || item.condiciones_pago || item.pago || "").trim();
  const normalized = normalizeSearchValue(raw);
  if (normalized.includes("contado")) return "Contado";
  if (normalized.includes("credito")) return "Crédito";
  return raw || "Sin definir";
}

function reportPayableRow(item = {}, source = "OCP", budgetById = new Map()) {
  const paid = isAccountsPayablePaid(item);
  const budget = budgetById.get(Number(item.presupuestoId || 0)) || {};
  const createdDate = item.createdAt || item.fecha || item.updatedAt;
  const paidDate = item.fechaPago || item.fecha_pago || item.updatedAt || createdDate;
  const effectiveDate = paid ? paidDate : createdDate;
  // Exportaciones siempre trabaja con importes base SIN IVA y antes de
  // retenciones/deducciones. Los pagos se prorratean a esa misma base.
  const baseAmount = source === "OCP"
    ? Number(item.subtotalOcp ?? item.subtotal ?? item.montoOriginal ?? item.monto ?? 0)
    : source === "OCGF"
      ? Number(item.subtotal ?? item.montoOriginal ?? item.monto ?? 0)
      : Number(item.montoOriginal ?? item.subtotal ?? item.monto ?? 0);
  const paymentGrossTotal = Math.max(0, Number(item.montoTotal ?? item.montoOriginal ?? item.monto ?? baseAmount));
  const paidGross = Math.max(0, Number(item.totalPagado || (paid ? paymentGrossTotal : 0) || 0));
  const paidRatio = paid
    ? 1
    : paymentGrossTotal > 0
      ? Math.min(1, Math.max(0, paidGross / paymentGrossTotal))
      : 0;
  const grossAmount = Math.round(baseAmount * 100) / 100;
  const appliedAmount = Math.round(grossAmount * paidRatio * 100) / 100;
  const remainingAmount = Math.max(0, Math.round((grossAmount - appliedAmount) * 100) / 100);
  const provider = source === "OCCOM" ? "" : String(item.proveedor || "").trim();
  const supervisor = source === "OCCOM"
    ? String(item.supervisor || item.proveedor || "").trim()
    : String(budget.owner || item.owner || item.usuario || "").trim();
  const condition = source === "OCCOM" ? "" : reportPaymentTerms(item);
  const project = item.proyecto || item.gasto || budget.tituloProyecto || item.empresa || "";
  const folio = item.folio || item.dlv || budget.folio || "";
  const document = item.ocp || item.ocgf || item.occom || "";
  const company = item.empresa || budget.empresa || "";
  const branch = item.sucursal || budget.sucursal || "";
  const client = item.cliente || budget.clienteUsuario || company || "";
  return {
    origen: source,
    proveedor: provider,
    supervisor,
    empresa: company,
    sucursal: branch,
    cliente: client,
    folio,
    documento: document,
    proyecto: project,
    condicion: condition,
    estado: item.estadoRegistro || item.estado || "",
    estatus: item.estatusPago || item.estatus || "",
    estadoPago: paid ? "Pagada" : "Pendiente",
    pendiente: item.pendiente || "",
    total: grossAmount,
    pagado: appliedAmount,
    saldo: remainingAmount,
    fechaPago: formatExportDate(item.fechaPago),
    fechaCreacion: formatExportDate(createdDate),
    fechaFiltro: formatExportDate(effectiveDate),
    _date: effectiveDate,
    _provider: provider,
    _supervisor: supervisor,
    _branch: branch,
    _project: project,
    _folio: folio || document,
    _company: company,
    _client: client,
    _user: supervisor,
    _status: item.estatusPago || item.estatus || item.estado || "",
    _terms: condition,
    _paymentState: paid ? "Pagada" : "Pendiente",
    _type: source,
    _amount: grossAmount,
    _source: source,
    _budgetId: Number(item.presupuestoId || budget.id || 0)
  };
}

function reportBudgetRow(item = {}) {
  const sale = Number(item.montoCotizacion || item.precioVenta || 0);
  const cost = Number(item.costoCotizacion || item.totalProyecto || 0);
  const normalizedState = normalizeSearchValue(`${item.estado || ""} ${item.estatus || ""}`);
  const projectState = normalizedState.includes("cerrad") ? "Cerrado" : normalizedState.includes("cancel") ? "Cancelado" : "Abierto";
  return {
    empresa: item.empresa || "",
    sucursal: item.sucursal || "",
    cliente: item.clienteUsuario || "",
    supervisor: item.owner || "Sin usuario asignado",
    folio: item.folio || "",
    po: item.po || "Sin PO",
    proyecto: item.tituloProyecto || "",
    estado: item.estado || "",
    estatus: item.estatus || "",
    estadoProyecto: projectState,
    costo: cost,
    venta: sale,
    utilidad: sale - cost,
    fechaCreacion: formatExportDate(item.createdAt),
    modificacion: formatExportDate(item.updatedAt),
    _date: item.createdAt || item.updatedAt,
    _provider: "",
    _supervisor: item.owner || "",
    _branch: item.sucursal || "",
    _project: item.tituloProyecto || "",
    _folio: item.folio || "",
    _company: item.empresa || "",
    _client: item.clienteUsuario || "",
    _user: item.owner || "",
    _status: item.estado || item.estatus || projectState,
    _terms: "",
    _paymentState: "",
    _type: "Proyecto",
    _amount: sale,
    _source: "Proyecto",
    _budgetId: Number(item.id || item.presupuestoId || 0)
  };
}

function reportReceivableRow(item = {}, budget = {}) {
  const collected = isAccountsReceivableCollected(item);
  const actualPaymentDate = item.fechaCobro || item.fechaComprobantePago || item.comprobantePagoFecha || item.fechaComplementoPago || item.complementoPagoFecha || item.updatedAt || item.fechaPago;
  const createdDate = item.createdAt || item.fecha || item.updatedAt;
  // El periodo de CxC se determina por el momento en que alcanzo su estado
  // actual (Factura, GR, Track ID, Comprobante, Pago completo, etc.).
  const stateEventDate = item.fechaEventoEstado || item.updatedAt || createdDate;
  const effectiveDate = stateEventDate;
  const amount = Number(item.monto || budget.montoCotizacion || budget.precioVenta || 0);
  const originalAmount = Number(item.montoOriginal ?? amount);
  // La comisión se calcula sobre el Precio de venta financiero del presupuesto
  // (costo de cotización × factor de venta), no sobre pagos parciales ni saldos.
  const salePrice = Number(budget.precioVenta || budget.montoCotizacion || item.monto || 0);
  const supervisorRate = Number(budget.comisionSupervisor || 0);
  const supervisorCommission = Math.round(salePrice * (supervisorRate / 100) * 100) / 100;
  const supervisor = item.owner || budget.owner || "Sin usuario asignado";
  const condition = reportPaymentTerms(item);
  const projectCreatedDate = item.fechaCreacionProyecto || budget.createdAt || item.fecha || item.createdAt;
  const clientPoDate = item.fechaCargaPo || "";
  return {
    presupuestoId: Number(item.presupuestoId || budget.id || 0),
    empresa: item.empresa || budget.empresa || "",
    sucursal: item.sucursal || budget.sucursal || "",
    cliente: item.clienteUsuario || budget.clienteUsuario || "",
    supervisor,
    folio: item.folio || budget.folio || "",
    cotizacion: item.quoteFolio || "",
    po: item.po || budget.po || "Sin PO",
    proyecto: item.proyecto || budget.tituloProyecto || "",
    condicion: condition,
    estado: item.estado || "",
    pendiente: item.pendiente || "",
    estadoCobro: collected ? "Cobrada" : "Pendiente",
    montoOriginal: originalAmount,
    monto: amount,
    descuentoCobranza: Number(item.descuentoCobranza || 0),
    porcentajeDescuentoCobranza: Number(item.porcentajeDescuentoCobranza || 0),
    cobroGeneral: item.cobroAgrupado?.folio || "",
    pagadorIntermediario: item.cobroAgrupado?.intermediario || "",
    referenciaCobro: item.cobroAgrupado?.referenciaExterna || "",
    precioVenta: salePrice,
    porcentajeComision: supervisorRate,
    comisionCalculada: supervisorCommission,
    facturado: Number(item.solicitadoFacturar || 0),
    montoCobrado: Number(item.montoCobrado || 0),
    saldoCobrar: Number(item.saldoCobrar ?? item.monto ?? 0),
    saldoFacturar: Number(item.saldoRestante || 0),
    fechaVencimiento: formatExportDate(item.fechaPago),
    fechaCobro: formatExportDate(actualPaymentDate),
    fechaCreacionProyecto: formatExportDate(projectCreatedDate),
    fechaCargaPo: formatExportDate(clientPoDate),
    fechaCreacion: formatExportDate(createdDate),
    fechaEstado: formatExportDate(stateEventDate),
    fechaFactura: formatExportDate(item.fechaFactura),
    fechaGr: formatExportDate(item.fechaGr),
    fechaTrackId: formatExportDate(item.fechaTrackId),
    fechaComprobantePago: formatExportDate(item.fechaComprobantePago),
    fechaComplementoPago: formatExportDate(item.fechaComplementoPago),
    fechaFiltro: formatExportDate(effectiveDate),
    complementoPago: item.complementoPagoCargado ? "Cargado" : "Pendiente",
    facturaNombre: item.facturaNombre || "",
    _date: effectiveDate,
    _stateDate: stateEventDate,
    _provider: "",
    _supervisor: supervisor,
    _branch: item.sucursal || budget.sucursal || "",
    _project: item.proyecto || budget.tituloProyecto || "",
    _folio: item.folio || item.quoteFolio || budget.folio || "",
    _company: item.empresa || budget.empresa || "",
    _client: item.clienteUsuario || budget.clienteUsuario || "",
    _user: supervisor,
    _status: item.estado || item.pendiente || "",
    _terms: condition,
    _paymentState: collected ? "Cobrada" : "Pendiente",
    _type: "CxC",
    _amount: amount,
    _source: "CxC"
  };
}

function reportReceivablePaymentRow(item = {}, payment = {}, budget = {}) {
  const paymentDate = payment.fechaPago || payment.createdAt || item.fechaCobro || item.updatedAt || item.fechaPago;
  const paymentAmount = Number(payment.monto || 0);
  const base = reportReceivableRow({
    ...item,
    fechaCobro: paymentDate,
    monto: paymentAmount,
    saldoCobrar: Number(payment.saldoPosterior ?? item.saldoCobrar ?? 0),
    pagosRegistrados: true
  }, budget);
  return {
    ...base,
    estadoCobro: "Cobrada",
    monto: paymentAmount,
    // La base de venta/comisión pertenece al proyecto, no al tamaño de la
    // parcialidad recibida. Se conserva igual que en el reporte original.
    precioVenta: base.precioVenta,
    porcentajeComision: base.porcentajeComision,
    comisionCalculada: base.comisionCalculada,
    saldoCobrar: Number(payment.saldoPosterior ?? 0),
    fechaCobro: formatExportDate(paymentDate),
    fechaFiltro: formatExportDate(paymentDate),
    referenciaPago: payment.referencia || "",
    _date: paymentDate,
    _stateDate: base._stateDate || item.fechaEventoEstado || paymentDate,
    _paymentState: "Cobrada",
    _amount: paymentAmount,
    _source: "Cobro CxC"
  };
}

function buildCommissionReportRows(cache, budgetById) {
  const payableCommissionById = new Map((cache.payableCommissions || []).map((item) => [Number(item.commissionId || item.orderId || 0), item]));
  const rows = [];
  (cache.commissionBudgets || []).forEach((item) => {
    const budget = budgetById.get(Number(item.presupuestoId || 0)) || {};
    const collected = Boolean(item.cobrada || item.fechaPago);
    rows.push({
      supervisor: item.supervisorNombre || budget.owner || "Sin supervisor",
      empresa: item.empresa || budget.empresa || "",
      sucursal: budget.sucursal || "",
      cliente: budget.clienteUsuario || "",
      proyecto: item.nombreProyecto || budget.tituloProyecto || "",
      folio: item.folioPresupuesto || budget.folio || "",
      occom: "Sin generar",
      montoProyecto: Number(item.montoProyecto || 0),
      porcentaje: Number(item.porcentajeComision || 0),
      monto: Number(item.montoComision || 0),
      estadoCobro: collected ? "Cobrada" : "Pendiente de cobro",
      estatus: collected ? "Pendiente de generar" : "Pendiente de cobro",
      estadoPago: "Pendiente",
      fechaPago: "",
      fechaOccom: "",
      fechaFiltro: formatExportDate(item.fechaPago || item.createdAt),
      _date: item.fechaPago || item.createdAt || item.updatedAt,
      _provider: "",
      _supervisor: item.supervisorNombre || budget.owner || "",
      _branch: budget.sucursal || "",
      _project: item.nombreProyecto || budget.tituloProyecto || "",
      _folio: item.folioPresupuesto || budget.folio || "",
      _company: item.empresa || budget.empresa || "",
      _client: budget.clienteUsuario || "",
      _user: item.supervisorNombre || budget.owner || "",
      _status: collected ? "Pendiente de generar" : "Pendiente de cobro",
      _terms: "",
      _paymentState: "Pendiente",
      _type: "Pendiente",
      _amount: Number(item.montoComision || 0),
      _source: "Comisión pendiente"
    });
  });
  (cache.commissions || []).forEach((item) => {
    const account = payableCommissionById.get(Number(item.id || 0)) || {};
    const budget = budgetById.get(Number(item.presupuestoId || 0)) || {};
    const paid = isAccountsPayablePaid(account);
    const normalizedStatus = normalizeSearchValue(item.estatus || "");
    const inactive = ["rechaz", "no aprobad", "cancel", "elimin"].some((value) => normalizedStatus.includes(value));
    const effectiveDate = paid ? (account.fechaPago || account.updatedAt || item.updatedAt) : (item.createdAt || account.createdAt || item.updatedAt);
    rows.push({
      supervisor: item.supervisorNombre || account.supervisor || budget.owner || "Sin supervisor",
      empresa: item.empresa || budget.empresa || "",
      sucursal: budget.sucursal || "",
      cliente: budget.clienteUsuario || "",
      proyecto: item.nombreProyecto || account.proyecto || budget.tituloProyecto || "",
      folio: item.folioPresupuesto || account.folio || budget.folio || "",
      occom: item.folio || account.occom || "",
      montoProyecto: Number(item.montoProyecto || account.montoProyecto || 0),
      porcentaje: Number(item.porcentajeComision || account.porcentajeComision || 0),
      monto: Number(item.montoComision || account.montoOriginal || account.monto || 0),
      estadoCobro: item.cobrada ? "Cobrada" : "Pendiente de cobro",
      estatus: inactive ? (item.estatus || "No aprobada") : (paid ? "Pagada" : item.estatus || "Generada"),
      estadoPago: paid ? "Pagada" : "Pendiente",
      fechaPago: formatExportDate(account.fechaPago),
      fechaOccom: formatExportDate(item.createdAt || account.createdAt),
      fechaFiltro: formatExportDate(effectiveDate),
      _date: effectiveDate,
      _provider: "",
      _supervisor: item.supervisorNombre || account.supervisor || budget.owner || "",
      _branch: budget.sucursal || "",
      _project: item.nombreProyecto || account.proyecto || budget.tituloProyecto || "",
      _folio: item.folioPresupuesto || account.folio || item.folio || budget.folio || "",
      _company: item.empresa || budget.empresa || "",
      _client: budget.clienteUsuario || "",
      _user: item.supervisorNombre || account.supervisor || budget.owner || "",
      _status: inactive ? (item.estatus || "No aprobada") : (paid ? "Pagada" : item.estatus || "Generada"),
      _terms: "",
      _paymentState: paid ? "Pagada" : "Pendiente",
      _type: "OCCOM",
      _amount: Number(item.montoComision || account.montoOriginal || account.monto || 0),
      _source: "OCCOM"
    });
  });
  return rows;
}

function buildProjectExpenseRows(cache, budgetById, payableRows) {
  const expenseRowsByBudget = new Map();
  const pushExpense = (budgetId, row) => {
    const id = Number(budgetId || 0);
    if (!id) return;
    if (!expenseRowsByBudget.has(id)) expenseRowsByBudget.set(id, []);
    expenseRowsByBudget.get(id).push(row);
  };

  payableRows.filter((row) => row.origen === "OCP").forEach((row) => {
    pushExpense(row._budgetId, {
      type: "OCP",
      amount: Number(row.total || 0),
      date: row._date,
      document: row.documento,
      provider: row.proveedor,
      supervisor: row.supervisor,
      status: row.estadoPago
    });
  });
  (cache.payableCommissions || []).forEach((item) => {
    const budgetId = Number(item.presupuestoId || 0);
    pushExpense(budgetId, {
      type: "OCCOM",
      amount: Number(item.montoOriginal ?? item.subtotal ?? item.monto ?? 0),
      date: isAccountsPayablePaid(item) ? (item.fechaPago || item.updatedAt) : (item.createdAt || item.updatedAt),
      document: item.occom || "",
      provider: "",
      supervisor: item.supervisor || item.proveedor || "",
      status: isAccountsPayablePaid(item) ? "Pagada" : "Pendiente"
    });
  });
  (cache.additionals || []).forEach((item) => {
    pushExpense(item.presupuestoId, {
      type: "Gastos adicionales",
      amount: Number(item.monto || 0),
      date: item.createdAt,
      document: item.bloque || "",
      provider: "",
      supervisor: item.owner || "",
      status: "Registrado"
    });
  });

  const rows = [];
  budgetById.forEach((budget, budgetId) => {
    const expenses = expenseRowsByBudget.get(Number(budgetId)) || [];
    if (!expenses.length) return;
    const totalOcp = expenses.filter((item) => item.type === "OCP").reduce((sum, item) => sum + item.amount, 0);
    const totalOccom = expenses.filter((item) => item.type === "OCCOM").reduce((sum, item) => sum + item.amount, 0);
    const totalAdditional = expenses.filter((item) => item.type === "Gastos adicionales").reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = totalOcp + totalOccom + totalAdditional;
    const sale = Number(budget.montoCotizacion || budget.precioVenta || 0);
    const realUtility = sale - totalExpense;
    expenses.forEach((expense) => {
      rows.push({
        empresa: budget.empresa || "",
        sucursal: budget.sucursal || "",
        cliente: budget.clienteUsuario || "",
        supervisor: expense.supervisor || budget.owner || "",
        folio: budget.folio || "",
        proyecto: budget.tituloProyecto || "",
        tipoGasto: expense.type,
        documento: expense.document || "",
        proveedor: expense.provider || "",
        estatus: expense.status || "",
        monto: expense.amount,
        totalOcp,
        totalOccom,
        totalAdicional: totalAdditional,
        gastoTotalProyecto: totalExpense,
        venta: sale,
        utilidadReal: realUtility,
        fecha: formatExportDate(expense.date),
        _date: expense.date,
        _provider: expense.provider || "",
        _supervisor: expense.supervisor || budget.owner || "",
        _branch: budget.sucursal || "",
        _project: budget.tituloProyecto || "",
        _folio: budget.folio || expense.document || "",
        _company: budget.empresa || "",
        _client: budget.clienteUsuario || "",
        _user: expense.supervisor || budget.owner || "",
        _status: expense.status || "",
        _terms: "",
        _paymentState: "",
        _type: expense.type,
        _amount: expense.amount,
        _source: expense.type
      });
    });
  });
  return rows;
}

function buildReportDataset(type, cache) {
  const budgets = cache.budgets || [];
  const budgetById = new Map(budgets.map((budget) => [Number(budget.id || budget.presupuestoId || 0), budget]));
  const budgetByFolio = new Map(budgets.filter((budget) => budget.folio).map((budget) => [normalizeSearchValue(budget.folio), budget]));
  const payableRows = [
    ...(cache.payable || []).map((item) => reportPayableRow(item, "OCP", budgetById)),
    ...(cache.payableOcgf || []).map((item) => reportPayableRow(item, "OCGF", budgetById)),
    ...(cache.payableCommissions || []).map((item) => reportPayableRow(item, "OCCOM", budgetById))
  ];
  const receivableRows = (cache.receivable || []).map((item) => {
    const budget = budgetById.get(Number(item.presupuestoId || 0)) || budgetByFolio.get(normalizeSearchValue(item.folio || "")) || {};
    return reportReceivableRow(item, budget);
  });
  const receivablePaymentRows = [];
  (cache.receivable || []).forEach((item) => {
    const budget = budgetById.get(Number(item.presupuestoId || 0)) || budgetByFolio.get(normalizeSearchValue(item.folio || "")) || {};
    const payments = Array.isArray(item.pagos) ? item.pagos : [];
    if (payments.length) {
      payments.forEach((payment) => receivablePaymentRows.push(reportReceivablePaymentRow(item, payment, budget)));
    } else if (isAccountsReceivableCollected(item)) {
      // Compatibilidad con históricos anteriores al registro de parcialidades.
      receivablePaymentRows.push(reportReceivableRow(item, budget));
    }
  });
  const budgetRows = budgets.map(reportBudgetRow);
  const commissionRows = buildCommissionReportRows(cache, budgetById);
  const projectExpenseRows = buildProjectExpenseRows(cache, budgetById, payableRows);
  const budgetMovementRows = [
    ...(cache.additionals || []).map((item) => ({
      tipoMovimiento: "Presupuesto adicional",
      empresa: item.empresa || "",
      sucursal: item.sucursal || "",
      cliente: item.clienteUsuario || "",
      supervisor: item.owner || "",
      folio: item.folio || "",
      proyecto: item.proyecto || "",
      origen: "",
      destino: budgetBlockLabel(item.bloque),
      monto: Number(item.monto || 0),
      registradoPor: item.registradoPor || "Sistema",
      fecha: formatExportDate(item.createdAt),
      _date: item.createdAt,
      _provider: "",
      _supervisor: item.registradoPor || item.owner || "",
      _branch: item.sucursal || "",
      _project: item.proyecto || "",
      _folio: item.folio || "",
      _company: item.empresa || "",
      _client: item.clienteUsuario || "",
      _user: item.registradoPor || item.owner || "",
      _status: "Registrado",
      _terms: "",
      _paymentState: "",
      _type: "Presupuesto adicional",
      _amount: Number(item.monto || 0),
      _source: "Presupuesto adicional"
    })),
    ...(cache.transfers || []).map((item) => ({
      tipoMovimiento: "Transferencia interna",
      empresa: item.empresa || "",
      sucursal: item.sucursal || "",
      cliente: item.clienteUsuario || "",
      supervisor: item.owner || "",
      folio: item.folio || "",
      proyecto: item.proyecto || "",
      origen: budgetBlockLabel(item.origen),
      destino: budgetBlockLabel(item.destino),
      monto: Number(item.monto || 0),
      registradoPor: item.registradoPor || "Sistema",
      fecha: formatExportDate(item.createdAt),
      _date: item.createdAt,
      _provider: "",
      _supervisor: item.registradoPor || item.owner || "",
      _branch: item.sucursal || "",
      _project: item.proyecto || "",
      _folio: item.folio || "",
      _company: item.empresa || "",
      _client: item.clienteUsuario || "",
      _user: item.registradoPor || item.owner || "",
      _status: "Registrado",
      _terms: "",
      _paymentState: "",
      _type: "Transferencia interna",
      _amount: Number(item.monto || 0),
      _source: "Transferencia interna"
    }))
  ];
  const expenseReassignmentRows = (cache.reassignments || []).map((item) => ({
    tipoDocumento: item.tipoDocumento || "",
    folio: item.folio || "",
    origen: item.origenReferencia || "",
    destino: item.destinoReferencia || "",
    motivo: item.motivo || "",
    registradoPor: item.registradoPor || "Sistema",
    fecha: formatExportDate(item.createdAt),
    _date: item.createdAt,
    _provider: "",
    _supervisor: item.registradoPor || "",
    _branch: "",
    _project: `${item.origenReferencia || ""} ${item.destinoReferencia || ""}`,
    _folio: item.folio || "",
    _company: "",
    _client: "",
    _user: item.registradoPor || "",
    _status: "Reasignado",
    _terms: "",
    _paymentState: "",
    _type: item.tipoDocumento || "",
    _amount: 0,
    _source: item.tipoDocumento || ""
  }));
  const quotePerformanceRows = (cache.quotePerformance || []).map((item) => ({
    periodo: item.periodo || "",
    usuario: item.usuario || "Sin usuario",
    realizadas: Number(item.realizadas || 0),
    aprobadas: Number(item.aprobadas || 0),
    pendientes: Number(item.pendientes || 0),
    _date: item.fecha,
    _provider: "",
    _supervisor: item.usuario || "",
    _branch: "",
    _project: "",
    _folio: "",
    _company: "",
    _client: "",
    _user: item.usuario || "",
    _status: "",
    _terms: "",
    _paymentState: "",
    _type: "Cotizaciones",
    _amount: Number(item.realizadas || 0),
    _source: "Cotizaciones"
  }));
  const loanRows = (cache.credits || []).map((item) => {
    const pending = Number(item.saldoPendiente || 0) > 0 && normalizeSearchValue(item.estado || "").includes("activo");
    return {
      persona: item.usuarioNombre || item.usuario || "",
      usuario: item.usuario || "",
      tipo: item.tipo === "ADEUDO" ? "Adeudo" : "Préstamo",
      concepto: item.concepto || "",
      montoOriginal: Number(item.montoOriginal || 0),
      recuperado: Number(item.totalRecuperado || 0),
      saldoPendiente: Number(item.saldoPendiente || 0),
      estado: pending ? "Pendiente" : "Liquidado",
      fechaOtorgamiento: formatExportDate(item.fechaOtorgamiento || item.createdAt),
      creadoPor: item.creadoPor || "",
      _date: item.fechaOtorgamiento || item.createdAt,
      _provider: "",
      _supervisor: item.usuarioNombre || item.usuario || "",
      _branch: "",
      _project: "",
      _folio: `PRESTAMO-${item.id || ""}`,
      _company: "",
      _client: item.usuarioNombre || item.usuario || "",
      _user: item.usuarioNombre || item.usuario || "",
      _status: pending ? "Pendiente" : "Liquidado",
      _terms: "",
      _paymentState: pending ? "Pendiente" : "Liquidado",
      _type: item.tipo === "ADEUDO" ? "Adeudo" : "Préstamo",
      _amount: Number(item.montoOriginal || 0),
      _source: item.tipo === "ADEUDO" ? "Adeudo" : "Préstamo"
    };
  });

  const definitions = {
    ocp: {
      title: "OCP",
      subtitle: "Órdenes de compra con condición y estado de pago. Las pagadas usan fecha real de pago; las pendientes usan fecha de creación.",
      dateRule: "Pagadas: fecha de pago · Pendientes: fecha de creación de la OCP.",
      filters: ["provider", "supervisor", "branch", "project", "folio", "company", "client", "status", "terms", "paymentState"],
      paymentStateOptions: ["Pagada", "Pendiente"],
      columns: [
        { key: "documento", label: "OCP" }, { key: "folio", label: "Folio proyecto" }, { key: "proveedor", label: "Proveedor" },
        { key: "supervisor", label: "Supervisor" }, { key: "empresa", label: "Empresa" }, { key: "sucursal", label: "Sucursal" },
        { key: "proyecto", label: "Proyecto" }, { key: "condicion", label: "Condición" }, { key: "estadoPago", label: "Pago" },
        { key: "estatus", label: "Estatus" }, { key: "total", label: "Total", type: "currency" }, { key: "pagado", label: "Pagado", type: "currency" },
        { key: "saldo", label: "Saldo", type: "currency" }, { key: "fechaPago", label: "Fecha de pago", type: "date" }, { key: "fechaCreacion", label: "Creación", type: "date" }
      ],
      rows: payableRows.filter((row) => row.origen === "OCP")
    },
    occom: {
      title: "OCCOM",
      subtitle: "Órdenes de comisión pagadas y pendientes por supervisor.",
      dateRule: "Pagadas: fecha de pago de la comisión · Pendientes: fecha de creación de la OCCOM.",
      filters: ["supervisor", "project", "folio", "company", "client", "status", "paymentState"],
      paymentStateOptions: ["Pagada", "Pendiente"],
      columns: [
        { key: "documento", label: "OCCOM" }, { key: "folio", label: "Folio proyecto" }, { key: "supervisor", label: "Supervisor" },
        { key: "empresa", label: "Empresa" }, { key: "proyecto", label: "Proyecto" }, { key: "estadoPago", label: "Pago" },
        { key: "estatus", label: "Estatus" }, { key: "total", label: "Comisión", type: "currency" }, { key: "pagado", label: "Pagado", type: "currency" },
        { key: "saldo", label: "Saldo", type: "currency" }, { key: "fechaPago", label: "Fecha de pago", type: "date" }, { key: "fechaCreacion", label: "Creación OCCOM", type: "date" }
      ],
      rows: payableRows.filter((row) => row.origen === "OCCOM")
    },
    ocgf: {
      title: "OCGF",
      subtitle: "Órdenes de compra de gastos fijos, con condición y estado de pago.",
      dateRule: "Pagadas: fecha de pago · Pendientes: fecha de creación de la OCGF.",
      filters: ["provider", "branch", "project", "folio", "status", "terms", "paymentState"],
      paymentStateOptions: ["Pagada", "Pendiente"],
      columns: [
        { key: "documento", label: "OCGF" }, { key: "proveedor", label: "Proveedor" }, { key: "sucursal", label: "Sucursal" },
        { key: "proyecto", label: "Gasto" }, { key: "condicion", label: "Condición" }, { key: "estadoPago", label: "Pago" },
        { key: "estatus", label: "Estatus" }, { key: "total", label: "Total", type: "currency" }, { key: "pagado", label: "Pagado", type: "currency" },
        { key: "saldo", label: "Saldo", type: "currency" }, { key: "fechaPago", label: "Fecha de pago", type: "date" }, { key: "fechaCreacion", label: "Creación", type: "date" }
      ],
      rows: payableRows.filter((row) => row.origen === "OCGF")
    },
    "accounts-payable": {
      title: "Cuentas por pagar",
      subtitle: "Consolidado de OCP, OCGF y OCCOM por proveedor/supervisor, condición y estado de pago.",
      dateRule: "Pagadas: fecha real de pago · Pendientes: fecha de alta/creación del documento.",
      filters: ["provider", "supervisor", "branch", "project", "folio", "company", "client", "status", "terms", "paymentState", "type"],
      paymentStateOptions: ["Pagada", "Pendiente"],
      columns: [
        { key: "origen", label: "Tipo" }, { key: "documento", label: "Documento" }, { key: "proveedor", label: "Proveedor" }, { key: "supervisor", label: "Supervisor" },
        { key: "empresa", label: "Empresa" }, { key: "sucursal", label: "Sucursal" }, { key: "proyecto", label: "Proyecto / gasto" },
        { key: "condicion", label: "Condición" }, { key: "estadoPago", label: "Pago" }, { key: "estatus", label: "Estatus" },
        { key: "total", label: "Total", type: "currency" }, { key: "pagado", label: "Pagado", type: "currency" }, { key: "saldo", label: "Saldo", type: "currency" },
        { key: "fechaPago", label: "Fecha de pago", type: "date" }, { key: "fechaCreacion", label: "Creación", type: "date" }
      ],
      rows: payableRows
    },
    "accounts-receivable": {
      title: "Cuentas por cobrar",
      subtitle: "Cuentas por cobrar con fecha de creación del proyecto y fecha real de carga de la PO para seguimiento de tiempos.",
      dateRule: "La fecha del filtro es la fecha en que la cuenta alcanzo su estado actual. Ej.: Track ID cargado = fecha de carga del Track ID; Pago completo = fecha del complemento/comprobante que completo el flujo.",
      filters: ["supervisor", "branch", "project", "folio", "company", "client", "status", "terms", "paymentState"],
      paymentStateOptions: ["Cobrada", "Pendiente"],
      columns: [
        { key: "empresa", label: "Empresa" }, { key: "sucursal", label: "Sucursal" }, { key: "cliente", label: "Cliente" }, { key: "supervisor", label: "Supervisor" },
        { key: "folio", label: "Folio" }, { key: "cotizacion", label: "Cotización" }, { key: "proyecto", label: "Proyecto" }, { key: "condicion", label: "Condición" },
        { key: "estadoCobro", label: "Cobro" }, { key: "estado", label: "Estado" }, { key: "pendiente", label: "Pendiente" },
        { key: "montoOriginal", label: "Monto original", type: "currency" }, { key: "descuentoCobranza", label: "Descuento de cobranza", type: "currency" },
        { key: "porcentajeDescuentoCobranza", label: "% descuento", type: "percent" }, { key: "monto", label: "Monto a cobrar", type: "currency" },
        { key: "montoCobrado", label: "Cobrado", type: "currency" }, { key: "saldoCobrar", label: "Saldo por cobrar", type: "currency" },
        { key: "facturado", label: "Facturado", type: "currency" }, { key: "saldoFacturar", label: "Saldo por facturar", type: "currency" },
        { key: "cobroGeneral", label: "Cobro general" }, { key: "pagadorIntermediario", label: "Pagador / intermediario" }, { key: "referenciaCobro", label: "Referencia OC / PO" },
        { key: "fechaEstado", label: "Fecha del estado", type: "date" },
        { key: "fechaCreacionProyecto", label: "Creación del proyecto", type: "date" }, { key: "fechaCargaPo", label: "Carga de PO", type: "date" },
        { key: "fechaVencimiento", label: "Fecha programada", type: "date" }, { key: "fechaCobro", label: "Fecha cobro real", type: "date" }, { key: "fechaCreacion", label: "Alta en CxC", type: "date" }
      ],
      rows: receivableRows
    },
    "quotes-collected": {
      title: "Cotizaciones cobradas",
      subtitle: "Cotizaciones ya cobradas con Precio de venta y comisión calculada. El Precio de venta es la base utilizada para el pago de comisiones.",
      dateRule: "La fecha del filtro es cuando la CxC alcanzo Pago completo. No usa el mes de creación del proyecto. Para crédito se toma el Complemento de pago; para contado, el Comprobante de pago; solo como respaldo se usa la modificación de la CxC.",
      filters: ["supervisor", "branch", "project", "folio", "company", "client", "status", "terms"],
      summaryAmountKey: "precioVenta",
      columns: [
        { key: "empresa", label: "Empresa" }, { key: "sucursal", label: "Sucursal" }, { key: "cliente", label: "Cliente" }, { key: "supervisor", label: "Supervisor" },
        { key: "folio", label: "Folio" }, { key: "cotizacion", label: "Cotización" }, { key: "proyecto", label: "Proyecto" }, { key: "condicion", label: "Condición" },
        { key: "monto", label: "Monto cobrado", type: "currency" }, { key: "precioVenta", label: "Precio de venta (base comisión)", type: "currency" },
        { key: "porcentajeComision", label: "% comisión", type: "percent" }, { key: "comisionCalculada", label: "Comisión calculada", type: "currency" },
        { key: "fechaEstado", label: "Fecha Pago completo", type: "date" }, { key: "fechaCobro", label: "Fecha de cobro real", type: "date" },
        { key: "complementoPago", label: "Complemento" }, { key: "facturaNombre", label: "Factura" }
      ],
      rows: receivableRows.filter((row) => row._paymentState === "Cobrada")
    },
    commissions: {
      title: "Comisiones",
      subtitle: "Comisiones pendientes y OCCOM generadas, con supervisor, proyecto, estatus y pago.",
      dateRule: "OCCOM pagada: fecha de pago · OCCOM pendiente: creación · Comisión aún no generada: fecha de cobro del proyecto o creación del proyecto.",
      filters: ["supervisor", "branch", "project", "folio", "company", "client", "status", "paymentState", "type"],
      paymentStateOptions: ["Pagada", "Pendiente"],
      summaryAmountKey: "monto",
      columns: [
        { key: "supervisor", label: "Supervisor" }, { key: "proyecto", label: "Proyecto" }, { key: "folio", label: "Folio presupuesto" }, { key: "empresa", label: "Empresa" },
        { key: "occom", label: "OCCOM" }, { key: "montoProyecto", label: "Monto proyecto", type: "currency" }, { key: "porcentaje", label: "% comisión", type: "percent" },
        { key: "monto", label: "Comisión", type: "currency" }, { key: "estadoCobro", label: "Cobro proyecto" }, { key: "estatus", label: "Estatus comisión" },
        { key: "estadoPago", label: "Pago comisión" }, { key: "fechaPago", label: "Fecha pago comisión", type: "date" }, { key: "fechaOccom", label: "Fecha OCCOM", type: "date" }
      ],
      rows: commissionRows
    },
    "project-expenses": {
      title: "Gasto por proyecto",
      subtitle: "OCP + OCCOM + gastos adicionales, mostrando el gasto total y la utilidad real del proyecto.",
      dateRule: "Cada movimiento se filtra por su fecha efectiva: pagos usan fecha de pago; pendientes/altas usan fecha de creación.",
      filters: ["provider", "supervisor", "branch", "project", "folio", "company", "client", "status", "type"],
      summaryAmountKey: "monto",
      columns: [
        { key: "empresa", label: "Empresa" }, { key: "sucursal", label: "Sucursal" }, { key: "folio", label: "Folio" }, { key: "proyecto", label: "Proyecto" },
        { key: "tipoGasto", label: "Tipo de gasto" }, { key: "documento", label: "Documento / bloque" }, { key: "proveedor", label: "Proveedor" }, { key: "supervisor", label: "Supervisor" },
        { key: "monto", label: "Movimiento", type: "currency" }, { key: "totalOcp", label: "OCP proyecto", type: "currency" }, { key: "totalOccom", label: "OCCOM proyecto", type: "currency" },
        { key: "totalAdicional", label: "Gastos adicionales", type: "currency" }, { key: "gastoTotalProyecto", label: "Gasto total", type: "currency" },
        { key: "venta", label: "Venta", type: "currency" }, { key: "utilidadReal", label: "Utilidad real", type: "currency" }, { key: "fecha", label: "Fecha movimiento", type: "date" }
      ],
      rows: projectExpenseRows
    },
    "budget-movements": {
      title: "Historial de cambios a presupuestos",
      subtitle: "Adiciones y transferencias internas con fecha, importe y usuario que registró cada cambio.",
      dateRule: "La fecha del filtro es la fecha exacta en que se registró el movimiento.",
      filters: ["supervisor", "branch", "project", "folio", "company", "client", "type"],
      summaryAmountKey: "monto",
      columns: [
        { key: "tipoMovimiento", label: "Movimiento" }, { key: "empresa", label: "Empresa" }, { key: "sucursal", label: "Sucursal" },
        { key: "folio", label: "Folio" }, { key: "proyecto", label: "Proyecto" }, { key: "origen", label: "Origen" },
        { key: "destino", label: "Destino / bloque" }, { key: "monto", label: "Monto", type: "currency" },
        { key: "registradoPor", label: "Registró" }, { key: "fecha", label: "Fecha", type: "date" }
      ],
      rows: budgetMovementRows
    },
    "expense-reassignments": {
      title: "Reasignaciones OCP / OCGF",
      subtitle: "Auditoría de gastos movidos entre proyectos o gastos fijos; conserva origen, destino, motivo y usuario.",
      dateRule: "La fecha del filtro es la fecha de la reasignación.",
      filters: ["supervisor", "project", "folio", "type"],
      columns: [
        { key: "tipoDocumento", label: "Tipo" }, { key: "folio", label: "Folio" }, { key: "origen", label: "Origen" },
        { key: "destino", label: "Destino" }, { key: "motivo", label: "Motivo" },
        { key: "registradoPor", label: "Registró" }, { key: "fecha", label: "Fecha", type: "date" }
      ],
      rows: expenseReassignmentRows
    },
    "quote-performance": {
      title: "Cotizaciones por vendedor",
      subtitle: "Conteo mensual por usuario responsable, con cotizaciones realizadas, aprobadas y pendientes.",
      dateRule: "Aprobadas: fecha de aprobación. Pendientes: fecha de creación.",
      filters: ["supervisor"],
      summaryAmountKey: "realizadas",
      columns: [
        { key: "periodo", label: "Mes" }, { key: "usuario", label: "Vendedor / usuario" },
        { key: "realizadas", label: "Realizadas", type: "integer" }, { key: "aprobadas", label: "Aprobadas", type: "integer" },
        { key: "pendientes", label: "Pendientes", type: "integer" }
      ],
      rows: quotePerformanceRows
    },
    loans: {
      title: "Préstamos",
      subtitle: "Préstamos y adeudos registrados por persona, con recuperación y saldo pendiente.",
      dateRule: "La fecha del filtro es la fecha de otorgamiento del préstamo o adeudo.",
      filters: ["supervisor", "client", "status", "paymentState", "type"],
      paymentStateOptions: ["Liquidado", "Pendiente"],
      columns: [
        { key: "persona", label: "Persona" }, { key: "usuario", label: "Usuario" }, { key: "tipo", label: "Tipo" }, { key: "concepto", label: "Concepto" },
        { key: "montoOriginal", label: "Monto original", type: "currency" }, { key: "recuperado", label: "Recuperado", type: "currency" }, { key: "saldoPendiente", label: "Saldo pendiente", type: "currency" },
        { key: "estado", label: "Estado" }, { key: "fechaOtorgamiento", label: "Fecha otorgamiento", type: "date" }, { key: "creadoPor", label: "Registró" }
      ],
      rows: loanRows
    },
    projects: {
      title: "Proyectos",
      subtitle: "Proyectos abiertos, cerrados o cancelados con costo, venta y utilidad base.",
      dateRule: "La fecha del filtro es la fecha de creación del proyecto.",
      filters: ["supervisor", "branch", "project", "folio", "company", "client", "status"],
      columns: [
        { key: "empresa", label: "Empresa" }, { key: "sucursal", label: "Sucursal" }, { key: "cliente", label: "Cliente" }, { key: "supervisor", label: "Supervisor" },
        { key: "folio", label: "Folio" }, { key: "proyecto", label: "Proyecto" }, { key: "estadoProyecto", label: "Estado proyecto" }, { key: "estado", label: "Estado" }, { key: "estatus", label: "Estatus" },
        { key: "costo", label: "Costo", type: "currency" }, { key: "venta", label: "Venta", type: "currency" }, { key: "utilidad", label: "Utilidad", type: "currency" }, { key: "fechaCreacion", label: "Creación", type: "date" }
      ],
      rows: budgetRows
    },
    sales: {
      title: "Ventas",
      subtitle: "Ventas cobradas. El periodo se determina por la fecha real del cobro, no por la fecha de creación del proyecto.",
      dateRule: "La fecha del filtro es la fecha real del cobro del cliente (XML/comprobante).",
      filters: ["supervisor", "branch", "project", "folio", "company", "client", "terms"],
      summaryAmountKey: "monto",
      columns: [
        { key: "empresa", label: "Empresa" }, { key: "sucursal", label: "Sucursal" }, { key: "cliente", label: "Cliente" }, { key: "supervisor", label: "Supervisor" },
        { key: "folio", label: "Folio" }, { key: "proyecto", label: "Proyecto" }, { key: "condicion", label: "Condición" }, { key: "monto", label: "Venta cobrada", type: "currency" },
        { key: "fechaCobro", label: "Fecha de venta/cobro", type: "date" }
      ],
      rows: receivablePaymentRows
    }
  };
  const dataset = definitions[type] || definitions.ocp;
  return {
    ...dataset,
    subtitle: ["budget-movements", "expense-reassignments", "quote-performance"].includes(type)
      ? dataset.subtitle
      : `${dataset.subtitle} · Importes expresados sin IVA y antes de retenciones, impuestos o deducciones.`
  };
}

function aggregateReceivablePaymentsByProject(rows = []) {
  const grouped = new Map();
  rows.forEach((row) => {
    const key = Number(row.presupuestoId || 0)
      ? `p:${Number(row.presupuestoId)}`
      : `f:${normalizeSearchValue(row.folio || row._folio || "")}`;
    const previous = grouped.get(key);
    if (!previous) {
      grouped.set(key, { ...row, referenciaPago: row.referenciaPago || "" });
      return;
    }
    const previousDate = toComparableDate(previous._date || previous.fechaCobro);
    const currentDate = toComparableDate(row._date || row.fechaCobro);
    const latest = !previousDate || (currentDate && currentDate >= previousDate) ? row : previous;
    const refs = [...new Set([previous.referenciaPago, row.referenciaPago].filter(Boolean))].join(", ");
    grouped.set(key, {
      ...previous,
      ...latest,
      monto: Math.round((Number(previous.monto || 0) + Number(row.monto || 0)) * 100) / 100,
      referenciaPago: refs,
      // Precio de venta y comisión se contabilizan una sola vez por proyecto.
      precioVenta: Number(previous.precioVenta || latest.precioVenta || 0),
      porcentajeComision: Number(previous.porcentajeComision || latest.porcentajeComision || 0),
      comisionCalculada: Number(previous.comisionCalculada || latest.comisionCalculada || 0)
    });
  });
  return [...grouped.values()];
}

function applyReportExportFilters(dataset, controls) {
  let rows = dataset.rows.filter((row) => {
    if (controls.dateFrom && !isWithinDateRange(row._date || row.fechaFiltro || row.fecha, controls.dateFrom, controls.dateTo)) return false;
    if (!controls.dateFrom && controls.dateTo && !isWithinDateRange(row._date || row.fechaFiltro || row.fecha, "", controls.dateTo)) return false;
    if (controls.provider && normalizeSearchValue(row._provider) !== normalizeSearchValue(controls.provider)) return false;
    if (controls.supervisor && normalizeSearchValue(row._supervisor) !== normalizeSearchValue(controls.supervisor)) return false;
    if (controls.branch && normalizeSearchValue(row._branch) !== normalizeSearchValue(controls.branch)) return false;
    if (controls.project && !matchesAllSearchTerms(row._project || row.proyecto, controls.project)) return false;
    if (controls.folio && !matchesAllSearchTerms(row._folio || row.folio || row.documento, controls.folio)) return false;
    if (controls.company && normalizeSearchValue(row._company || row.empresa || "") !== normalizeSearchValue(controls.company)) return false;
    if (controls.client && !matchesAllSearchTerms(row._client || row.cliente || row.persona || row.owner, controls.client)) return false;
    if (controls.status && normalizeSearchValue(row._status) !== normalizeSearchValue(controls.status)) return false;
    if (controls.terms && normalizeSearchValue(row._terms) !== normalizeSearchValue(controls.terms)) return false;
    if (controls.paymentState && normalizeSearchValue(row._paymentState) !== normalizeSearchValue(controls.paymentState)) return false;
    if (controls.sourceType && normalizeSearchValue(row._type) !== normalizeSearchValue(controls.sourceType)) return false;
    return true;
  });
  // Cotizaciones cobradas debe seguir mostrando un renglón por proyecto, como
  // antes del cambio. Primero filtramos por fecha real de cada pago y después
  // sumamos las parcialidades del mismo proyecto dentro del periodo seleccionado.
  if (dataset.aggregatePaymentsByProject) {
    rows = aggregateReceivablePaymentsByProject(rows);
  }
  if (controls.groupBy && controls.groupBy !== "detail") {
    const grouped = new Map();
    const groupAmountKey = dataset.summaryAmountKey || "_amount";
    const groupAmountColumn = (dataset.columns || []).find((column) => column.key === groupAmountKey);
    rows.forEach((row) => {
      let group = "Sin dato";
      if (["day", "week", "month"].includes(controls.groupBy)) group = getPeriodKey(row._date || row.fechaFiltro || row.fecha, controls.groupBy);
      if (controls.groupBy === "provider") group = row._provider || "Sin proveedor";
      if (controls.groupBy === "supervisor") group = row._supervisor || "Sin supervisor";
      if (controls.groupBy === "branch") group = row._branch || "Sin sucursal";
      if (controls.groupBy === "project") group = row._project || "Sin proyecto";
      if (controls.groupBy === "company") group = row._company || row.empresa || "Sin empresa";
      if (controls.groupBy === "client") group = row._client || row.cliente || row.persona || "Sin cliente";
      if (controls.groupBy === "user") group = row._user || row.usuario || row.supervisor || "Sin usuario";
      if (controls.groupBy === "status") group = row._status || "Sin estatus";
      if (controls.groupBy === "type") group = row._type || row._source || "Sin tipo";
      const source = row._source || row._type || row.origen || "General";
      const key = `${group}|||${source}`;
      const current = grouped.get(key) || { grupo: group, tipo: source, registros: 0, monto: 0 };
      current.registros += 1;
      current.monto += Number(row[groupAmountKey] ?? row._amount ?? 0);
      grouped.set(key, current);
    });
    rows = [...grouped.values()].sort((a, b) => String(a.grupo).localeCompare(String(b.grupo), "es", { numeric: true }));
    const groupLabel = {
      provider: "Proveedor", supervisor: "Supervisor", branch: "Sucursal", project: "Proyecto", company: "Empresa",
      client: "Cliente", user: "Usuario", status: "Estatus", type: "Tipo"
    }[controls.groupBy] || "Periodo";
    return {
      ...dataset,
      summaryAmountKey: "monto",
      columns: [
        { key: "grupo", label: groupLabel }, { key: "tipo", label: "Tipo" }, { key: "registros", label: "Registros", type: "integer" },
        { key: "monto", label: `${groupAmountColumn?.label || "Monto"} total`, type: "currency" }
      ],
      rows
    };
  }
  return { ...dataset, rows };
}

function reportExportControlValues() {
  return {
    type: document.querySelector("#reportExportType")?.value || "ocp",
    preset: document.querySelector("#reportExportPreset")?.value || "month",
    dateFrom: document.querySelector("#reportExportDateFrom")?.value || "",
    dateTo: document.querySelector("#reportExportDateTo")?.value || "",
    groupBy: document.querySelector("#reportExportGroupBy")?.value || "detail",
    provider: document.querySelector("#reportExportProvider")?.value || "",
    supervisor: document.querySelector("#reportExportSupervisor")?.value || "",
    branch: document.querySelector("#reportExportBranch")?.value || "",
    project: document.querySelector("#reportExportProject")?.value || "",
    folio: document.querySelector("#reportExportFolio")?.value || "",
    company: document.querySelector("#reportExportCompany")?.value || "",
    client: document.querySelector("#reportExportClient")?.value || "",
    status: document.querySelector("#reportExportStatus")?.value || "",
    terms: document.querySelector("#reportExportTerms")?.value || "",
    paymentState: document.querySelector("#reportExportPaymentState")?.value || "",
    sourceType: document.querySelector("#reportExportSourceType")?.value || ""
  };
}

function applyReportDatePreset(preset) {
  const from = document.querySelector("#reportExportDateFrom");
  const to = document.querySelector("#reportExportDateTo");
  if (!from || !to || preset === "custom") return;
  const today = new Date();
  const end = toComparableDate(today);
  let startDate = new Date(today);
  if (preset === "today") startDate = today;
  if (preset === "week") startDate.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  if (preset === "month") startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  if (preset === "quarter") startDate = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1);
  if (preset === "year") startDate = new Date(today.getFullYear(), 0, 1);
  if (preset === "all") {
    from.value = "";
    to.value = "";
    return;
  }
  from.value = toComparableDate(startDate);
  to.value = end;
}

function setReportExportFieldVisibility(dataset) {
  const visible = new Set(dataset.filters || []);
  Object.entries(REPORT_EXPORT_FILTER_FIELDS).forEach(([key, fieldId]) => {
    const field = document.querySelector(`#${fieldId}`);
    const control = field?.querySelector("input, select");
    const isVisible = visible.has(key);
    field?.classList.toggle("hidden", !isVisible);
    if (!isVisible && control) control.value = "";
  });

  const paymentStateSelect = document.querySelector("#reportExportPaymentState");
  if (paymentStateSelect && visible.has("paymentState")) {
    const current = paymentStateSelect.value;
    const label = dataset.paymentStateOptions?.includes("Cobrada") ? "Todos" : dataset.paymentStateOptions?.includes("Liquidado") ? "Todos" : "Todas";
    paymentStateSelect.innerHTML = `<option value="">${label}</option>${(dataset.paymentStateOptions || []).map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
    if ([...paymentStateSelect.options].some((option) => option.value === current)) paymentStateSelect.value = current;
  }
  const dateRule = document.querySelector("#reportExportDateRule");
  if (dateRule) dateRule.textContent = dataset.dateRule || "La fecha del filtro depende de la fecha efectiva del movimiento.";
}

function getReportExportSortColumn(payload = {}, key = "") {
  return (payload.columns || []).find((column) => column.key === key) || null;
}

function compareReportExportValues(first, second, column = {}) {
  const firstEmpty = first === null || first === undefined || String(first).trim() === "";
  const secondEmpty = second === null || second === undefined || String(second).trim() === "";
  if (firstEmpty && secondEmpty) return 0;
  if (firstEmpty) return 1;
  if (secondEmpty) return -1;

  if (["currency", "number", "integer", "percent"].includes(column.type)) {
    return Number(first || 0) - Number(second || 0);
  }
  if (column.type === "date") {
    return compareValues(toComparableDate(first), toComparableDate(second));
  }
  if (["folio", "documento", "occom", "cotizacion", "po"].includes(String(column.key || ""))) {
    const folioComparison = compareValues(extractFolioNumber(first), extractFolioNumber(second));
    if (folioComparison) return folioComparison;
  }
  return compareValues(first, second);
}

function sortReportExportPayload(payload = {}) {
  const column = getReportExportSortColumn(payload, reportExportSort.key);
  if (!column || !reportExportSort.key) return { ...payload, rows: [...(payload.rows || [])] };
  const direction = reportExportSort.direction === "desc" ? -1 : 1;
  const rows = [...(payload.rows || [])].sort((firstRow, secondRow) => {
    const first = firstRow?.[column.key];
    const second = secondRow?.[column.key];
    const firstEmpty = first === null || first === undefined || String(first).trim() === "";
    const secondEmpty = second === null || second === undefined || String(second).trim() === "";
    if (firstEmpty && secondEmpty) return 0;
    // Los valores vacíos siempre quedan al final, tanto ascendente como descendente.
    if (firstEmpty) return 1;
    if (secondEmpty) return -1;
    return compareReportExportValues(first, second, column) * direction;
  });
  return { ...payload, rows };
}

function renderReportPreview(payload) {
  const preview = document.querySelector("#reportExportPreview");
  if (!preview) return;
  const amountColumn =
    payload.columns.find((column) => column.key === payload.summaryAmountKey) ||
    payload.columns.find((column) => column.type === "currency");
  const total = payload.rows.reduce((sum, row) => sum + Number(amountColumn ? row[amountColumn.key] || 0 : 0), 0);
  const previewRows = payload.rows.slice(0, 100);
  const activeSortColumn = getReportExportSortColumn(payload, reportExportSort.key);
  const sortLabel = activeSortColumn
    ? ` · Orden: ${activeSortColumn.label} ${reportExportSort.direction === "desc" ? "↓" : "↑"}`
    : "";
  preview.innerHTML = `
    <div class="report-export-preview-summary">
      <strong>${escapeHtml(payload.title)}</strong>
      <span>${payload.rows.length.toLocaleString("es-MX")} registros${amountColumn && payload.rows.length ? ` · ${formatCurrency(total)}` : ""}${payload.rows.length > 100 ? " · vista previa de 100" : ""}${escapeHtml(sortLabel)}</span>
    </div>
    <div class="report-preview-table-shell">
      <table class="report-preview-table">
        <thead><tr>${payload.columns.map((column) => {
          const isNumeric = ["currency", "number", "integer", "percent"].includes(column.type);
          const isActive = reportExportSort.key === column.key;
          const direction = isActive ? reportExportSort.direction : "";
          const ariaSort = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";
          const indicator = direction === "asc" ? "↑" : direction === "desc" ? "↓" : "↕";
          return `<th class="${isNumeric ? "is-number" : ""}" aria-sort="${ariaSort}"><button class="report-preview-sort-button${isActive ? " is-active" : ""}" type="button" data-report-sort-key="${escapeHtml(column.key)}" title="Ordenar por ${escapeHtml(column.label)}"><span>${escapeHtml(column.label)}</span><i aria-hidden="true">${indicator}</i></button></th>`;
        }).join("")}</tr></thead>
        <tbody>${previewRows.length ? previewRows.map((row) => `<tr>${payload.columns.map((column) => `<td class="${["currency", "number", "integer", "percent"].includes(column.type) ? "is-number" : ""}">${escapeHtml(column.type === "currency" ? formatCurrency(row[column.key] || 0) : column.type === "date" ? formatDate(row[column.key]) : column.type === "percent" ? `${Number(row[column.key] || 0).toFixed(2)}%` : row[column.key] ?? "")}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="${payload.columns.length}">Sin registros para los filtros seleccionados.</td></tr>`}</tbody>
      </table>
    </div>`;
}

async function refreshReportExportPreview(forceReload = false) {
  const preview = document.querySelector("#reportExportPreview");
  if (preview) preview.innerHTML = `<div class="report-export-loading">Preparando reporte...</div>`;
  try {
    const cache = await loadReportExportCache(forceReload);
    const initialControls = reportExportControlValues();
    const dataset = buildReportDataset(initialControls.type, cache);
    setReportExportFieldVisibility(dataset);
    reportExportSuggestionRows = dataset.rows || [];

    syncFilterSelect(document.querySelector("#reportExportProvider"), dataset.rows.map((row) => row._provider), "Todos");
    syncFilterSelect(document.querySelector("#reportExportSupervisor"), dataset.rows.map((row) => row._supervisor), "Todos");
    syncFilterSelect(document.querySelector("#reportExportBranch"), dataset.rows.map((row) => row._branch), "Todas");
    syncFilterSelect(document.querySelector("#reportExportCompany"), dataset.rows.map((row) => row._company || row.empresa), "Todas");
    syncFilterSelect(document.querySelector("#reportExportStatus"), dataset.rows.map((row) => row._status), "Todos");
    syncFilterSelect(document.querySelector("#reportExportSourceType"), dataset.rows.map((row) => row._type), "Todos");
    refreshSearchableSelect(document.querySelector("#reportExportProvider"));
    refreshSearchableSelect(document.querySelector("#reportExportCompany"));

    const controls = reportExportControlValues();
    const filtered = applyReportExportFilters(dataset, controls);
    const filterDescriptions = currentFilterDescriptions([
      { label: "Periodo", value: getFilterLabel(document.querySelector("#reportExportPreset")) },
      { label: "Desde", value: controls.dateFrom }, { label: "Hasta", value: controls.dateTo },
      { label: "Fecha aplicada", value: dataset.dateRule || "" },
      { label: "Agrupación", value: getFilterLabel(document.querySelector("#reportExportGroupBy")) },
      { label: "Proveedor", value: controls.provider }, { label: "Supervisor", value: controls.supervisor }, { label: "Sucursal", value: controls.branch },
      { label: "Proyecto", value: controls.project }, { label: "Folio", value: controls.folio }, { label: "Empresa", value: controls.company },
      { label: "Cliente", value: controls.client }, { label: "Estatus", value: controls.status }, { label: "Condición", value: controls.terms },
      { label: "Estado de pago/cobro", value: controls.paymentState }, { label: "Tipo", value: controls.sourceType }
    ]);
    if (reportExportSort.key && !filtered.columns.some((column) => column.key === reportExportSort.key)) {
      reportExportSort = { key: "", direction: "asc" };
    }
    const sorted = sortReportExportPayload(filtered);
    activeReportExport = {
      ...sorted,
      filters: filterDescriptions,
      filename: `${controls.type}-${toComparableDate(new Date())}`
    };
    renderReportPreview(activeReportExport);
  } catch (error) {
    if (preview) preview.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function initializeReportExportCenter() {
  const typeSelect = document.querySelector("#reportExportType");
  if (!typeSelect) return;
  enhanceSearchableSelect(document.querySelector("#reportExportProvider"), { placeholder: "Escribe proveedor..." });
  enhanceSearchableSelect(document.querySelector("#reportExportCompany"), { placeholder: "Selecciona empresa..." });
  applyReportDatePreset(document.querySelector("#reportExportPreset")?.value || "month");

  document.querySelector("#reportExportPreset")?.addEventListener("change", (event) => {
    applyReportDatePreset(event.target.value);
    refreshReportExportPreview();
  });
  typeSelect.addEventListener("change", () => {
    reportExportSort = { key: "", direction: "asc" };
    refreshReportExportPreview();
  });
  [
    "reportExportDateFrom", "reportExportDateTo", "reportExportProvider", "reportExportSupervisor",
    "reportExportBranch", "reportExportCompany", "reportExportStatus", "reportExportTerms", "reportExportPaymentState", "reportExportSourceType"
  ].forEach((id) => document.querySelector(`#${id}`)?.addEventListener("change", () => refreshReportExportPreview()));
  document.querySelector("#reportExportGroupBy")?.addEventListener("change", () => {
    reportExportSort = { key: "", direction: "asc" };
    refreshReportExportPreview();
  });

  let exportFilterTimer = null;
  ["reportExportProject", "reportExportFolio", "reportExportClient"].forEach((id) => {
    document.querySelector(`#${id}`)?.addEventListener("input", () => {
      clearTimeout(exportFilterTimer);
      exportFilterTimer = setTimeout(() => refreshReportExportPreview(), 180);
    });
  });
  document.querySelector("#reportExportPreview")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-report-sort-key]");
    if (!button) return;
    const key = button.dataset.reportSortKey || "";
    if (!getReportExportSortColumn(activeReportExport, key)) return;
    reportExportSort = {
      key,
      direction: reportExportSort.key === key && reportExportSort.direction === "asc" ? "desc" : "asc"
    };
    activeReportExport = sortReportExportPayload(activeReportExport);
    renderReportPreview(activeReportExport);
  });
  document.querySelector("#reportExportRefreshButton")?.addEventListener("click", () => refreshReportExportPreview(true));
  document.querySelector("#reportExportExcelButton")?.addEventListener("click", async (event) => {
    if (!activeReportExport.rows?.length) return showErrorToast("No hay registros para exportar.");
    try { await requestStructuredExport({ ...activeReportExport, format: "xlsx" }, event.currentTarget); } catch (error) { showErrorToast(error); }
  });
  document.querySelector("#reportExportPdfButton")?.addEventListener("click", async (event) => {
    if (!activeReportExport.rows?.length) return showErrorToast("No hay registros para exportar.");
    try { await requestStructuredExport({ ...activeReportExport, format: "pdf" }, event.currentTarget); } catch (error) { showErrorToast(error); }
  });
  refreshReportExportPreview();
}

function reportExportCenterHtml() {
  return `
    <section class="report-export-center">
      <div class="report-export-heading">
        <div><span>Exportaciones</span><h2>Constructor de reportes</h2><p>Selecciona el reporte y filtra los datos antes de exportar.</p></div>
      </div>
      <div class="report-export-date-rule"><strong>Fecha aplicada al filtro:</strong><span id="reportExportDateRule">Preparando criterio de fecha...</span></div>
      <div class="report-export-filter-grid">
        <label class="wide-field"><span>Reporte</span><select id="reportExportType">${REPORT_EXPORT_TYPES.map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join("")}</select></label>
        <label><span>Periodo rápido</span><select id="reportExportPreset"><option value="today">Hoy</option><option value="week">Semana actual</option><option value="month" selected>Mes actual</option><option value="quarter">Trimestre actual</option><option value="year">Año actual</option><option value="all">Todo el historial</option><option value="custom">Personalizado</option></select></label>
        <label><span>Agrupar por</span><select id="reportExportGroupBy"><option value="detail">Detalle</option><option value="day">Día</option><option value="week">Semana</option><option value="month">Mes</option><option value="provider">Proveedor</option><option value="supervisor">Supervisor</option><option value="branch">Sucursal</option><option value="project">Proyecto</option><option value="user">Usuario</option><option value="company">Empresa</option><option value="client">Cliente</option><option value="status">Estatus</option><option value="type">Tipo</option></select></label>
        <label><span>Desde</span><input id="reportExportDateFrom" type="date" /></label>
        <label><span>Hasta</span><input id="reportExportDateTo" type="date" /></label>
        <label id="reportExportProviderField"><span>Proveedor</span><select id="reportExportProvider"><option value="">Todos</option></select></label>
        <label id="reportExportSupervisorField"><span>Supervisor</span><select id="reportExportSupervisor"><option value="">Todos</option></select></label>
        <label id="reportExportBranchField"><span>Sucursal</span><select id="reportExportBranch"><option value="">Todas</option></select></label>
        <label id="reportExportProjectField"><span>Proyecto</span><input id="reportExportProject" type="search" autocomplete="off" placeholder="Escribe para filtrar..." /></label>
        <label id="reportExportFolioField"><span>Folio</span><input id="reportExportFolio" type="search" autocomplete="off" placeholder="Escribe el folio..." /></label>
        <label id="reportExportCompanyField"><span>Empresa</span><select id="reportExportCompany"><option value="">Todas</option></select></label>
        <label id="reportExportClientField"><span>Cliente / persona</span><input id="reportExportClient" type="search" autocomplete="off" placeholder="Escribe para filtrar..." /></label>
        <label id="reportExportStatusField"><span>Estatus</span><select id="reportExportStatus"><option value="">Todos</option></select></label>
        <label id="reportExportTermsField"><span>Condición de pago</span><select id="reportExportTerms"><option value="">Todas</option><option value="Contado">Contado</option><option value="Crédito">Crédito</option></select></label>
        <label id="reportExportPaymentStateField"><span>Pago / cobro</span><select id="reportExportPaymentState"><option value="">Todas</option></select></label>
        <label id="reportExportSourceTypeField"><span>Tipo</span><select id="reportExportSourceType"><option value="">Todos</option></select></label>
      </div>
      <div class="report-export-toolbar report-export-toolbar-actions-only">
        <div class="report-export-actions">
          <button class="ghost-button" id="reportExportRefreshButton" type="button">Actualizar datos</button>
          <button class="small-button" id="reportExportExcelButton" type="button">Exportar Excel</button>
          <button class="small-button" id="reportExportPdfButton" type="button">Exportar PDF</button>
        </div>
      </div>
      <div class="report-export-preview" id="reportExportPreview"><div class="report-export-loading">Preparando reporte...</div></div>
    </section>`;
}


function renderReports(data = {}) {
  if (!reportsContent) return;
  const metrics = data.metrics || {};
  const charts = data.charts || {};
  const byMonth = (charts.byMonth || []).map((item) => ({ ...item, label: formatReportMonth(item.label) }));
  const profitabilityProjects = data.profitabilityProjects || [];
  const reportMonth = data.reportMonth || reportsPaidMonth || getCurrentMonthValue();
  reportsPaidMonth = reportMonth;
  const reportMonthLabel = formatReportMonth(reportMonth);
  const kpis = [
    {
      label: "Valor de cotizaciones aprobadas",
      value: metrics.quoteValue,
      format: "currency",
      detail: `${formatInteger(metrics.approvedQuoteCount || 0)} cotizaciones vigentes`,
      primary: true
    },
    {
      label: "Cotizado este mes",
      value: metrics.quoteValueMonth,
      format: "currency",
      detail: "Cotizaciones aprobadas en el mes"
    },
    {
      label: "Cotizado trimestre",
      value: metrics.quoteValueQuarter,
      format: "currency",
      detail: "Cotizaciones aprobadas en el trimestre"
    },
    {
      label: "Cotizado año",
      value: metrics.quoteValueYear,
      format: "currency",
      detail: "Cotizaciones aprobadas en el año"
    },
    {
      label: "Pendiente por cobrar",
      value: metrics.receivablePending,
      format: "currency",
      detail: `${formatInteger(metrics.receivablePendingCount || 0)} cuentas pendientes`
    },
    {
      label: "Cobrado este mes",
      value: metrics.collectedMonth,
      format: "currency",
      detail: "Según fecha real del comprobante de pago"
    },
    {
      label: "Pendiente por pagar",
      value: metrics.payablePending,
      format: "currency",
      detail: `${formatInteger(metrics.payablePendingCount || 0)} pagos pendientes`
    },
    {
      label: "Utilidad real Dalvo",
      value: metrics.realProfit,
      format: "currency",
      detail: `${formatInteger(metrics.paidProjectCount || 0)} proyectos pagados en ${reportMonthLabel} · ${Number(metrics.realMarginPercent || 0).toFixed(1)}% de margen`
    },
    {
      label: "OCCOM de proyectos pagados",
      value: metrics.paidCommission ?? metrics.commissionExpense,
      format: "currency",
      detail: `Comisiones reales incluidas en ${reportMonthLabel}`
    },
    {
      label: "Venta cobrada del periodo",
      value: metrics.paidSales,
      format: "currency",
      detail: `Solo proyectos con cobro confirmado en ${reportMonthLabel}`
    },
    {
      label: "Proyectos activos",
      value: metrics.activeProjects,
      format: "integer",
      detail: "Presupuestos no cerrados"
    },
    {
      label: "Aprobaciones",
      value: metrics.pendingBudgetApprovals,
      format: "integer",
      detail: `${formatInteger(metrics.pendingInitialBudgetApprovals || 0)} presupuestos · ${formatInteger(
        metrics.pendingQuoteApprovals || 0
      )} cotizaciones`
    },
    {
      label: "Vencidos",
      value: Number(metrics.receivableOverdueCount || 0) + Number(metrics.payableOverdueCount || 0),
      format: "integer",
      detail: `${formatCurrency(metrics.receivableOverdue || 0)} cobrar · ${formatCurrency(
        metrics.payableOverdue || 0
      )} pagar`
    }
  ];

  reportsContent.innerHTML = `
    <section class="reports-profit-filter" aria-label="Filtro de utilidad real">
      <div class="reports-profit-filter-copy">
        <span>Utilidad real Dalvo</span>
        <h2>Solo proyectos pagados</h2>
        <p>La utilidad se calcula únicamente con proyectos que tienen cobro confirmado dentro del mes seleccionado: venta cobrada − (OCP + OCCOM + gastos adicionales). Presupuestos y cotizaciones no cobradas quedan fuera.</p>
      </div>
      <label class="reports-month-control">
        <span>Mes de cobro</span>
        <input id="reportsPaidMonthFilter" type="month" value="${escapeHtml(reportMonth)}" max="${escapeHtml(getCurrentMonthValue())}" />
      </label>
    </section>

    <section class="reports-kpi-grid">
      ${kpis
        .map(
          (item) => `
            <article class="report-kpi ${item.primary ? "primary" : ""}">
              <span>${escapeHtml(item.label)}</span>
              <strong data-counter-format="${item.format}" data-counter-value="${Number(item.value || 0)}">${formatCounterValue(
                0,
                item.format
              )}</strong>
              <small>${escapeHtml(item.detail)}</small>
            </article>
          `
        )
        .join("")}
    </section>

    <section class="reports-grid">
      <article class="report-card wide">
        <div class="report-card-heading">
          <span>Pipeline comercial</span>
          <h2>Cotizaciones aprobadas por mes</h2>
        </div>
        <div class="report-bars month-bars">${reportBarRows(byMonth)}</div>
      </article>
      <article class="report-card">
        <div class="report-card-heading">
          <span>Ritmo comercial</span>
          <h2>Cotización aprobada: mes, trimestre y año</h2>
        </div>
        <div class="report-bars">${reportBarRows(charts.salesPace || [])}</div>
      </article>
      <article class="report-card">
        <div class="report-card-heading">
          <span>Clientes</span>
          <h2>Valor cotizado por empresa</h2>
        </div>
        <div class="report-bars">${reportBarRows(charts.byCompany || [])}</div>
      </article>
      <article class="report-card">
        <div class="report-card-heading">
          <span>Supervisores</span>
          <h2>Valor cotizado por owner</h2>
        </div>
        <div class="report-bars">${reportBarRows(charts.byOwner || [])}</div>
      </article>
      <article class="report-card">
        <div class="report-card-heading">
          <span>Cobranza</span>
          <h2>Cartera cliente</h2>
        </div>
        <div class="report-bars">${reportBarRows(charts.receivableBreakdown || [])}</div>
      </article>
      <article class="report-card">
        <div class="report-card-heading">
          <span>Pagos</span>
          <h2>Compromisos proveedor</h2>
        </div>
        <div class="report-bars">${reportBarRows(charts.payableBreakdown || [])}</div>
      </article>
      <article class="report-card">
        <div class="report-card-heading">
          <span>Cobranza</span>
          <h2>Estatus por documento</h2>
        </div>
        <div class="report-bars">${reportBarRows(charts.receivableStatus || [], { currency: false })}</div>
      </article>
      <article class="report-card">
        <div class="report-card-heading">
          <span>Pagos</span>
          <h2>Estatus por proveedor</h2>
        </div>
        <div class="report-bars">${reportBarRows(charts.payableStatus || [], { currency: false })}</div>
      </article>
    </section>

    <section class="report-card report-table-card report-paid-projects-card">
      <div class="report-card-heading report-profitability-heading">
        <div>
          <span>Utilidad real Dalvo · ${escapeHtml(reportMonthLabel)}</span>
          <h2>Proyectos pagados en el mes</h2>
        </div>
        <p>${formatInteger(profitabilityProjects.length)} proyecto(s) con fecha de cobro confirmada.</p>
      </div>
      <div class="report-profitability-table" role="region" aria-label="Desglose de utilidad de proyectos pagados" tabindex="0">
        <table class="report-profitability-grid">
          <colgroup>
            <col class="col-company" />
            <col class="col-owner" />
            <col class="col-folio" />
            <col class="col-project" />
            <col class="col-date" />
            <col class="col-money" />
            <col class="col-money" />
            <col class="col-money" />
            <col class="col-money" />
            <col class="col-money" />
            <col class="col-money" />
            <col class="col-margin" />
          </colgroup>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Owner</th>
              <th>Folio</th>
              <th>Proyecto</th>
              <th>Fecha de cobro</th>
              <th class="money-cell">Venta cobrada</th>
              <th class="money-cell">OCP</th>
              <th class="money-cell">OCCOM</th>
              <th class="money-cell">Gastos adicionales</th>
              <th class="money-cell">Gasto total</th>
              <th class="money-cell">Utilidad Dalvo</th>
              <th class="money-cell">Margen</th>
            </tr>
          </thead>
          <tbody>
            ${
              profitabilityProjects.length
                ? profitabilityProjects
                    .map(
                      (item) => `
                        <tr>
                          <td>${escapeHtml(item.empresa || "Sin empresa")}</td>
                          <td>${escapeHtml(item.owner || "Sin owner")}</td>
                          <td class="folio-cell">${escapeHtml(item.folio || "")}</td>
                          <td class="project-cell">${escapeHtml(item.proyecto || "Sin proyecto")}</td>
                          <td class="date-cell">${escapeHtml(formatDate(item.fechaCobro) || "Sin fecha")}</td>
                          <td class="money-cell"><strong>${formatCurrency(item.venta || 0)}</strong></td>
                          <td class="money-cell"><strong>${formatCurrency(item.totalOcp ?? item.costoBase ?? 0)}</strong></td>
                          <td class="money-cell"><strong>${formatCurrency(item.totalOccom ?? item.comision ?? 0)}</strong></td>
                          <td class="money-cell"><strong>${formatCurrency(item.totalAdditional || 0)}</strong></td>
                          <td class="money-cell"><strong>${formatCurrency(item.gastoTotal || 0)}</strong></td>
                          <td class="money-cell"><strong class="${Number(item.utilidadDalvo || 0) < 0 ? "is-negative" : "is-positive"}">${formatCurrency(item.utilidadDalvo || 0)}</strong></td>
                          <td class="money-cell"><strong>${Number(item.margen || 0).toFixed(1)}%</strong></td>
                        </tr>
                      `
                    )
                    .join("")
                : `<tr class="report-profitability-empty"><td colspan="12">No hay proyectos con cobro confirmado en ${escapeHtml(reportMonthLabel)}.</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
  `;

  const paidMonthInput = reportsContent.querySelector("#reportsPaidMonthFilter");
  paidMonthInput?.addEventListener("change", () => {
    reportsPaidMonth = paidMonthInput.value || getCurrentMonthValue();
    loadReportsModule();
  });
  animateCounters(reportsContent);
}

function formatTaskDateTime(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value).replace("T", " ").slice(0, 16);
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(parsed);
}

function toDateInputValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 10);
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

function toDateTimeInputValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value.replace(" ", "T").slice(0, 16);
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 16);
}

function shouldAlertTask(task = {}) {
  return task.estatus !== "Completada" && (task.overdue || task.dueToday || task.reminderDue);
}

function resetTaskForm() {
  editingTaskId = null;
  taskForm?.reset();
  if (taskFormTitle) taskFormTitle.textContent = "Nueva tarea";
  if (taskFormStatus) taskFormStatus.textContent = "";
  if (taskAssignedTo && currentUser?.id) taskAssignedTo.value = String(currentUser.id);
  refreshSearchableSelect(taskAssignedTo);
  taskCancelEditButton?.classList.add("hidden");
}

function renderTaskUsers(users = []) {
  tasksUsersCache = users;
  if (!taskAssignedTo) return;
  taskAssignedTo.innerHTML = users
    .map((user) => `<option value="${escapeHtml(user.id)}" data-search="${escapeHtml(`${user.nombre || ""} ${user.usuario || ""} ${user.rol || ""}`)}">${escapeHtml(user.nombre)}</option>`)
    .join("");
  if (!taskAssignedTo.value && currentUser?.id) taskAssignedTo.value = String(currentUser.id);
  refreshSearchableSelect(taskAssignedTo);
}

function collectTaskFormPayload() {
  const formData = new FormData(taskForm);
  return {
    titulo: formData.get("titulo"),
    prioridad: formData.get("prioridad"),
    estatus: formData.get("estatus"),
    fechaLimite: formData.get("fechaLimite"),
    recordatorioAt: formData.get("recordatorioAt"),
    asignadoA: formData.get("asignadoA"),
    descripcion: formData.get("descripcion"),
    seguimiento: formData.get("seguimiento")
  };
}

function fillTaskForm(task) {
  editingTaskId = task.id;
  if (taskFormTitle) taskFormTitle.textContent = "Editar tarea";
  if (taskFormStatus) taskFormStatus.textContent = "";
  taskForm.titulo.value = task.titulo || "";
  taskForm.prioridad.value = task.prioridad || "Media";
  taskForm.estatus.value = task.estatus || "Pendiente";
  taskForm.fechaLimite.value = toDateInputValue(task.fechaLimite);
  taskForm.recordatorioAt.value = toDateTimeInputValue(task.recordatorioAt);
  taskForm.asignadoA.value = String(task.asignadoA || currentUser?.id || "");
  taskForm.descripcion.value = task.descripcion || "";
  taskForm.seguimiento.value = task.seguimiento || "";
  taskCancelEditButton?.classList.remove("hidden");
  taskForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderTaskStats(stats = {}) {
  if (!taskStats) return;
  const cards = [
    ["Pendientes", stats.pendientes || 0, "Por iniciar"],
    ["Hoy", stats.hoy || 0, "Con fecha límite"],
    ["Vencidas", stats.vencidas || 0, "Requieren atención"],
    ["Recordatorios", stats.recordatorios || 0, "Activos ahora"],
    ["En proceso", stats.enProceso || 0, "Seguimiento abierto"],
    ["Completadas", stats.completadas || 0, "Cerradas"]
  ];
  taskStats.innerHTML = cards
    .map(
      ([label, value, caption]) => `
        <article class="task-stat-card">
          <span>${escapeHtml(label)}</span>
          <strong data-counter-value="${Number(value || 0)}" data-counter-format="integer">0</strong>
          <small>${escapeHtml(caption)}</small>
        </article>`
    )
    .join("");
  animateCounters(taskStats);
}

function taskPriorityClass(priority = "") {
  const normalized = normalizeSearchValue(priority);
  if (normalized.includes("urgent")) return "urgent";
  if (normalized.includes("alta")) return "high";
  if (normalized.includes("baja")) return "low";
  return "medium";
}

function renderTasksList(tasks = []) {
  if (!tasksList) return;
  if (!tasks.length) {
    tasksList.innerHTML = `<div class="empty-state">Sin tareas capturadas todavía.</div>`;
    return;
  }
  tasksList.innerHTML = tasks
    .map((task) => {
      const isDone = task.estatus === "Completada";
      const attentionClass = task.overdue ? "is-overdue" : task.reminderDue || task.dueToday ? "is-reminder" : "";
      return `
        <article class="task-card ${attentionClass}">
          <div class="task-card-top">
            <span class="task-priority ${taskPriorityClass(task.prioridad)}">${escapeHtml(task.prioridad)}</span>
            <span class="status-pill">${escapeHtml(task.estatus)}</span>
          </div>
          <h3>${escapeHtml(task.titulo)}</h3>
          ${task.descripcion ? `<p>${escapeHtml(task.descripcion)}</p>` : ""}
          ${task.seguimiento ? `<div class="task-note">${escapeHtml(task.seguimiento)}</div>` : ""}
          <dl class="task-meta">
            <div><dt>Asignado</dt><dd>${escapeHtml(task.asignadoNombre || "Sin asignar")}</dd></div>
            <div><dt>Límite</dt><dd>${escapeHtml(task.fechaLimite ? formatDate(task.fechaLimite) : "Sin fecha")}</dd></div>
            <div><dt>Recordatorio</dt><dd>${escapeHtml(task.recordatorioAt ? formatTaskDateTime(task.recordatorioAt) : "Sin recordatorio")}</dd></div>
            <div><dt>Actualización</dt><dd>${escapeHtml(task.updatedAt ? formatDate(task.updatedAt) : "")}</dd></div>
          </dl>
          <div class="task-actions">
            <button class="table-action-button" type="button" data-task-edit="${task.id}">Editar</button>
            <button class="${isDone ? "secondary-button" : "success-button"}" type="button" data-task-status="${task.id}" data-status="${isDone ? "En proceso" : "Completada"}">
              ${isDone ? "Reabrir" : "Completar"}
            </button>
            ${
              canDeleteRecords()
                ? `<button class="danger-button icon-only-button" type="button" data-task-delete="${task.id}" aria-label="Eliminar tarea">×</button>`
                : ""
            }
          </div>
        </article>`;
    })
    .join("");
}

async function loadTasksModule() {
  if (!tasksList) return;
  const search = tasksSearch?.value || "";
  tasksList.innerHTML = `<div class="empty-state">Cargando tareas...</div>`;
  try {
    const data = await api(`/api/tasks?search=${encodeURIComponent(search)}`);
    tasksCache = data.tasks || [];
    renderTaskUsers(data.users || []);
    renderTaskStats(data.stats || {});
    renderTasksList(tasksCache);
    if (!editingTaskId && taskAssignedTo && currentUser?.id) taskAssignedTo.value = String(currentUser.id);
  } catch (error) {
    tasksList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function getCommissionSupervisor(supervisorId) {
  return (commissionsCache.supervisors || []).find((item) => Number(item.id) === Number(supervisorId)) || null;
}

function renderCommissionSupervisorOptions(selectedId = 0, excludedIds = []) {
  const excluded = new Set((excludedIds || []).map((id) => Number(id || 0)).filter(Boolean));
  return (commissionsCache.supervisors || [])
    .filter((supervisor) => Number(supervisor.id) === Number(selectedId) || !excluded.has(Number(supervisor.id)))
    .map((supervisor) => {
      const selected = Number(supervisor.id) === Number(selectedId) ? "selected" : "";
      return `<option value="${supervisor.id}" data-rate="${Number(supervisor.comisionSupervisor || 0)}" ${selected}>${escapeHtml(supervisor.nombre)}</option>`;
    })
    .join("");
}

function getSelectedCommissionSupervisorIds(exceptRow = null) {
  return [...commissionsDetailContent.querySelectorAll("[data-commission-split-row]")]
    .filter((row) => row !== exceptRow)
    .map((row) => Number(row.querySelector("[data-commission-field='supervisorId']")?.value || 0))
    .filter(Boolean);
}

function syncCommissionSupervisorOptions() {
  commissionsDetailContent.querySelectorAll("[data-commission-split-row]").forEach((row) => {
    const select = row.querySelector("select[data-commission-field='supervisorId']");
    if (!select) return;
    const selectedId = Number(select.value || 0);
    select.innerHTML = renderCommissionSupervisorOptions(selectedId, getSelectedCommissionSupervisorIds(row));
    select.value = String(selectedId);
    enhanceSearchableSelect(select, {
      placeholder: "Escribe supervisor...",
      requireSelection: true,
      validationMessage: "Selecciona un supervisor de la lista."
    });
    refreshSearchableSelect(select);
  });
}

function getNextAvailableCommissionSupervisorId() {
  const selected = new Set(getSelectedCommissionSupervisorIds().map(Number));
  const next = (commissionsCache.supervisors || []).find((supervisor) => !selected.has(Number(supervisor.id)));
  return Number(next?.id || 0);
}

function getCommissionCreatedBudgetIds() {
  return new Set(
    (commissionsCache.commissions || [])
      .filter((item) => normalizeSearchValue(item.estatus || "") !== "no aprobada")
      .map((item) => Number(item.presupuestoId || 0))
      .filter(Boolean)
  );
}

function renderCommissionTableRows(container, rows, emptyMessage, paginationKey, mode) {
  const pageRows = paginateRows(container, paginationKey, rows, () => renderCommissions(commissionsCache));
  container.innerHTML = rows.length
    ? pageRows
        .map(
          (item) => `
            <article class="purchase-table-row is-clickable" data-commission-${mode}-id="${
              mode === "created" ? Number(item.id || 0) : Number(item.presupuestoId || 0)
            }">
              <span>${escapeHtml(item.supervisorNombre || "Sin supervisor")}</span>
              <span>${escapeHtml(item.nombreProyecto || "")}</span>
              <span>${escapeHtml(item.folioPresupuesto || item.descripcionProyecto || "")}</span>
              <span>${escapeHtml(item.empresa || "")}</span>
              ${mode === "pending" ? `<span>${escapeHtml(formatDate(item.fechaPago || item.fechaPagoPresupuesto || ""))}</span>` : ""}
              ${mode === "pending" ? `<span>${formatCurrency(item.montoProyecto || 0)}</span>` : ""}
              <span>${Number(item.porcentajeComision || 0).toFixed(2)}%</span>
              <span>${formatCurrency(item.montoComision || 0)}</span>
              ${
                mode === "created"
                  ? `<span><span class="status-pill ${normalizeSearchValue(item.estatusPago || "") === "pagada" ? "green" : ""}">${escapeHtml(
                      item.estatusPago || "Pendiente de pago"
                    )}</span></span>
                    <span>${
                      canDeleteRecords()
                        ? `<button class="small-button danger-button icon-only-button" type="button" aria-label="Eliminar OCCOM" data-commission-delete="${Number(
                            item.id || 0
                          )}">×</button>`
                        : ""
                    }</span>`
                  : ""
              }
            </article>
          `
        )
        .join("")
    : `<div class="purchase-table-row purchase-table-empty"><span>${escapeHtml(emptyMessage)}</span></div>`;
  applyVisibleColumns(container.closest(".purchase-table"));
}

function renderCommissions(data = {}) {
  commissionsCache = {
    budgets: data.budgets || [],
    commissions: data.commissions || [],
    supervisors: data.supervisors || [],
    canManage: Boolean(data.canManage)
  };
  syncFilterSelect(
    commissionsSupervisorFilter,
    [
      ...(commissionsCache.supervisors || []).map((supervisor) => supervisor.nombre),
      ...(commissionsCache.budgets || []).map((item) => item.supervisorNombre),
      ...(commissionsCache.commissions || []).map((item) => item.supervisorNombre)
    ],
    "Todos los supervisores"
  );

  const pendingBudgets = (commissionsCache.budgets || [])
    .map((item) => {
      // El backend ya descuenta las OCCOM asignadas. No se resta una segunda vez
      // en pantalla porque eso ocultaba saldo disponible válido.
      const assigned = Number(item.montoComisionAsignada || 0);
      const available = Math.max(0, Number(item.montoComisionDisponible ?? item.montoComision ?? 0));
      return {
        ...item,
        montoComisionAsignado: assigned,
        montoComisionDisponible: available,
        montoComision: available
      };
    })
    .filter((item) => Number(item.montoComisionDisponible || 0) > 0.01);
  const visiblePending = pendingBudgets.filter((item) => commissionMatchesActiveFilters(item, "pending"));
  const visibleCreated = (commissionsCache.commissions || []).filter((item) => commissionMatchesActiveFilters(item, "created"));
  const sortedPending = sortByState(visiblePending, commissionsPendingSort, (item, key) => item[key]);
  const sortedCreated = sortByState(visibleCreated, commissionsCreatedSort, (item, key) => item[key]);

  renderCommissionTableRows(
    commissionsPendingRows,
    sortedPending,
    "Sin comisiones pendientes de crear",
    "commissionsPending",
    "pending"
  );
  renderCommissionTableRows(
    commissionsCreatedRows,
    sortedCreated,
    "Sin comisiones creadas",
    "commissionsCreated",
    "created"
  );
}

function commissionPeriodRange(period = "month") {
  if (period === "all" || period === "custom") return { from: "", to: "" };
  const today = new Date();
  let start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (period === "week") start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  if (period === "month") start = new Date(today.getFullYear(), today.getMonth(), 1);
  if (period === "quarter") start = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1);
  if (period === "year") start = new Date(today.getFullYear(), 0, 1);
  return { from: toComparableDate(start), to: toComparableDate(today) };
}

function commissionMatchesActiveFilters(item = {}, mode = "pending") {
  const supervisor = commissionsSupervisorFilter?.value || "";
  if (supervisor && normalizeSearchValue(item.supervisorNombre || "") !== normalizeSearchValue(supervisor)) return false;
  const collection = commissionsCollectionFilter?.value || "collected";
  const collected = Boolean(item.cobrada || item.fechaPago);
  if (collection === "collected" && !collected) return false;
  const customFrom = commissionsDateFromFilter?.value || "";
  const customTo = commissionsDateToFilter?.value || "";
  const range = customFrom || customTo
    ? { from: customFrom, to: customTo }
    : commissionPeriodRange(commissionsPeriodFilter?.value || "month");
  if (!range.from && !range.to) return true;
  const relevantDate = item.fechaPago || (mode === "created" ? item.createdAt : "");
  return Boolean(relevantDate && isWithinDateRange(relevantDate, range.from, range.to));
}

async function loadCommissionsModule() {
  if (!commissionsPendingRows || !commissionsCreatedRows) return;
  commissionsListView?.classList.remove("hidden");
  commissionsDetailView?.classList.add("hidden");
  try {
    const requestedBudgetId = Number(pendingCommissionBudgetId || 0);
    const requestedFolio = String(pendingCommissionFolio || "").trim();
    const search = requestedFolio || (commissionsSearch?.value || "").trim();
    if (requestedFolio && commissionsSearch) commissionsSearch.value = requestedFolio;
    const data = await api(`/api/commissions?search=${encodeURIComponent(search)}`);
    renderCommissions(data);
    if (requestedBudgetId || requestedFolio) {
      const folioKey = normalizeSearchValue(requestedFolio);
      pendingCommissionBudgetId = null;
      pendingCommissionFolio = "";
      const matchesRequestedCommission = (item = {}) =>
        (requestedBudgetId && Number(item.presupuestoId || 0) === requestedBudgetId) ||
        (folioKey &&
          [item.folioPresupuesto, item.descripcionProyecto, item.folio].some(
            (value) => normalizeSearchValue(value || "") === folioKey
          ));
      const pending = (commissionsCache.budgets || []).find(matchesRequestedCommission);
      const created = (commissionsCache.commissions || []).find(matchesRequestedCommission);
      if (pending) renderCommissionDetail(pending, "pending");
      else if (created) renderCommissionDetail(created, "created");
      else showErrorToast(`No se encontró una comisión asociada al proyecto${requestedFolio ? ` ${requestedFolio}` : ""}.`);
    }
  } catch (error) {
    pendingCommissionBudgetId = null;
    pendingCommissionFolio = "";
    commissionsPendingRows.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    commissionsCreatedRows.innerHTML = "";
  }
}

function renderCommissionDetailHeader(item = {}) {
  const isManualCommission = Boolean(item.manualCommission);
  const displayStatus = item.estatusPago || item.estatus || "";
  return `
    <section class="budget-detail-card">
      <div class="budget-detail-grid">
        <label><span>Supervisor</span><input value="${escapeHtml(item.supervisorNombre || "Sin supervisor")}" readonly /></label>
        <label><span>Proyecto</span><input value="${escapeHtml(item.nombreProyecto || "")}" readonly /></label>
        <label><span>Folio</span><input value="${escapeHtml(item.folioPresupuesto || item.descripcionProyecto || "")}" readonly /></label>
        <label><span>Empresa</span><input value="${escapeHtml(item.empresa || "")}" readonly /></label>
        <label><span>${isManualCommission ? "Monto de proyecto total (PVP2)" : "Monto proyecto (PVP1)"}</span><input value="${formatCurrency(item.montoProyecto || 0)}" readonly /></label>
        <label><span>% Comisión</span><input value="${Number(item.porcentajeComision || 0).toFixed(2)}%" readonly /></label>
        <label><span>Monto comisión</span><input value="${formatCurrency(item.montoComisionBase ?? item.montoComision ?? 0)}" readonly /></label>
        ${item.folio ? `<label><span>OCCOM</span><input value="${escapeHtml(item.folio)}" readonly /></label>` : ""}
        ${displayStatus ? `<label><span>Estatus</span><input value="${escapeHtml(displayStatus)}" readonly /></label>` : ""}
      </div>
    </section>
  `;
}

function createCommissionSplitRow(item = {}, options = {}) {
  const rowId = options.rowId || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));
  const supervisorId = Number(options.supervisorId || item.supervisorId || 0);
  const supervisor = getCommissionSupervisor(supervisorId);
  const amount = Number(options.amount ?? item.montoComisionDisponible ?? item.montoComision ?? 0);
  const distribution = Number(options.porcentajeDistribucion ?? item.porcentajeDistribucion ?? 100);
  const removable = Boolean(options.removable);
  const lockedOwner = Boolean(options.lockedOwner);
  return `
    <article class="purchase-table-row commission-table-row" data-commission-split-row="${rowId}">
      <span>
        ${
          lockedOwner
            ? `<input type="hidden" data-commission-field="supervisorId" value="${supervisorId}" />
               <strong>${escapeHtml(item.supervisorNombre || supervisor?.nombre || "Sin supervisor")}</strong>`
            : `<select data-commission-field="supervisorId" aria-label="Supervisor">
                ${renderCommissionSupervisorOptions(supervisorId)}
              </select>`
        }
      </span>
      <span>${escapeHtml(item.folioPresupuesto || item.descripcionProyecto || "")}</span>
      <span>${escapeHtml(item.nombreProyecto || "")}</span>
      <span>
        <input
          class="commission-percent-input"
          data-commission-rate
          data-commission-field="porcentajeDistribucion"
          data-commission-distribution="${distribution}"
          type="number"
          min="0"
          max="100"
          step="0.01"
          value="${Number(distribution || 0).toFixed(2)}"
          aria-label="Porcentaje de comisión"
        />
      </span>
      <span>
        <input class="budget-money-input commission-amount-input" data-commission-field="montoComision" value="${formatCurrency(amount)}" readonly />
      </span>
      <span>
        ${
          removable
            ? `<button class="small-button danger-button icon-only-button" type="button" aria-label="Quitar división" data-commission-remove-split>×</button>`
            : `<b class="status-pill">Owner</b>`
        }
      </span>
    </article>
  `;
}

function updateCommissionSplitSummary() {
  const table = commissionsDetailContent?.querySelector("[data-commission-available]");
  if (!table) return;
  const available = Number(table.dataset.commissionAvailable || 0);
  const rows = [...commissionsDetailContent.querySelectorAll("[data-commission-split-row]")];
  const availableCents = Math.round(available * 100);
  const manualRows = rows.filter((row) => row.dataset.commissionManualPercent === "1");
  const autoRows = rows.filter((row) => row.dataset.commissionManualPercent !== "1");
  const manualTotal = manualRows.reduce((sum, row) => {
    const percentInput = row.querySelector("[data-commission-field='porcentajeDistribucion']");
    const value = Math.min(100, Math.max(0, Number(percentInput?.value || 0)));
    if (percentInput && Number(percentInput.value || 0) !== value) percentInput.value = value.toFixed(2);
    return sum + value;
  }, 0);
  const autoDistribution = autoRows.length ? Math.max(0, 100 - manualTotal) / autoRows.length : 0;
  let assigned = 0;
  let assignedGrossCents = 0;
  rows.forEach((row, index) => {
    const distributionElement = row.querySelector("[data-commission-field='porcentajeDistribucion']");
    const amountInput = row.querySelector("[data-commission-field='montoComision']");
    const distribution =
      row.dataset.commissionManualPercent === "1"
        ? Math.min(100, Math.max(0, Number(distributionElement?.value || 0)))
        : autoDistribution;
    const grossCents =
      index === rows.length - 1
        ? availableCents - assignedGrossCents
        : Math.round(availableCents * (distribution / 100));
    assignedGrossCents += grossCents;
    const grossAmount = grossCents / 100;
    const netAmount = Math.round(grossAmount * 100) / 100;
    const displayDistribution = availableCents ? (grossCents / availableCents) * 100 : distribution;
    assigned += netAmount;
    if (distributionElement) {
      if (row.dataset.commissionManualPercent !== "1") distributionElement.value = displayDistribution.toFixed(2);
      distributionElement.dataset.commissionDistribution = String(displayDistribution);
    }
    if (amountInput) {
      amountInput.value = formatCurrency(netAmount);
      amountInput.classList.toggle("commission-negative-text", netAmount < 0);
    }
  });
  assigned = Math.round(assigned * 100) / 100;
  const remaining = Math.round((available - assigned) * 100) / 100;
  const assignedElement = commissionsDetailContent.querySelector("[data-commission-assigned]");
  const remainingElement = commissionsDetailContent.querySelector("[data-commission-remaining]");
  if (assignedElement) assignedElement.textContent = formatCurrency(assigned);
  if (remainingElement) {
    remainingElement.textContent = formatCurrency(remaining);
    remainingElement.classList.toggle("commission-negative-text", remaining < -0.01);
  }
}

function renderCommissionDetail(item = {}, mode = "pending") {
  activeCommissionDetail = { mode, item };
  const isCreated = mode === "created";
  const canGenerateCollectedCommission = !isCreated && commissionsCache.canManage && Boolean(item.cobrada || item.fechaPago);
  const selectedSupervisor = getCommissionSupervisor(item.supervisorId);
  const rate = Number(selectedSupervisor?.comisionSupervisor ?? item.porcentajeComision ?? 0);
  const availableAmount = Number(item.montoComisionDisponible ?? item.montoComision ?? Number(item.montoProyecto || 0) * (rate / 100));
  commissionsListView?.classList.add("hidden");
  commissionsDetailView?.classList.remove("hidden");
  commissionsDetailContent.innerHTML = `
    ${renderCommissionDetailHeader(item)}
    <section class="client-quote-module">
      <h3>${isCreated ? "Detalle de comisión" : "Generar comisión"}</h3>
      ${!isCreated && !canGenerateCollectedCommission ? `<div class="empty-state">Esta cotización todavía no está cobrada. La OCCOM se habilitará cuando exista complemento de pago.</div>` : ""}
      ${
        !isCreated
          ? `<div class="financial-actions commission-split-summary">
              <span>Disponible para asignar: <strong>${formatCurrency(availableAmount)}</strong></span>
              <span>Asignado: <strong data-commission-assigned>${formatCurrency(availableAmount)}</strong></span>
              <span>Restante: <strong data-commission-remaining>${formatCurrency(0)}</strong></span>
            </div>`
          : ""
      }
      <div class="purchase-table commissions-detail-table" data-commission-available="${availableAmount}">
        <div class="purchase-table-head">
          <span>Supervisor</span>
          <span>Folio</span>
          <span>Proyecto</span>
          <span>% Comisión</span>
          <span>Monto comisión</span>
          <span>Acción</span>
        </div>
        <div data-commission-split-rows>
          ${
            canGenerateCollectedCommission
              ? createCommissionSplitRow(item, { amount: availableAmount, lockedOwner: true })
              : `<article class="purchase-table-row commission-table-row">
                  <span>${escapeHtml(item.supervisorNombre || "Sin supervisor")}</span>
                  <span>${escapeHtml(item.folioPresupuesto || item.descripcionProyecto || "")}</span>
                  <span>${escapeHtml(item.nombreProyecto || "")}</span>
                  <span>${Number(item.porcentajeDistribucion || 100).toFixed(2)}%</span>
                  <span class="${Number(item.montoComision || 0) < 0 ? "commission-negative-text" : ""}">${formatCurrency(item.montoComision || 0)}</span>
                  <span><b class="status-pill">${escapeHtml(item.estatus || "Generada")}</b></span>
                </article>`
          }
        </div>
      </div>
      ${
        canGenerateCollectedCommission
          ? `<div class="modal-actions inline-actions">
              <button class="ghost-button" type="button" data-commission-add-split>Dividir comisión</button>
              <button class="success-button" type="button" data-commission-generate="${Number(item.presupuestoId || 0)}">Generar comisión</button>
            </div>`
          : ""
      }
    </section>
  `;
  updateCommissionSplitSummary();
  syncCommissionSupervisorOptions();
}

function renderManualCommissionDetail(item = {}) {
  activeCommissionDetail = { mode: "manual", item };
  commissionsListView?.classList.add("hidden");
  commissionsDetailView?.classList.remove("hidden");
  commissionsDetailContent.innerHTML = `
    <section class="budget-detail-card">
      <div class="budget-detail-grid">
        <label><span>Supervisor</span><input value="Captura manual" readonly /></label>
        <label><span>Proyecto</span><input value="${escapeHtml(item.nombreProyecto || "")}" readonly /></label>
        <label><span>Folio</span><input value="${escapeHtml(item.folioPresupuesto || item.descripcionProyecto || "")}" readonly /></label>
        <label><span>Empresa</span><input value="${escapeHtml(item.empresa || "")}" readonly /></label>
        <label><span>Monto de proyecto total (PVP2)</span><input value="${formatCurrency(item.montoProyecto || 0)}" readonly /></label>
        <label>
          <span>% Comisión</span>
          <input
            data-manual-commission-percent
            type="number"
            min="0"
            max="5"
            step="0.01"
            value="${Math.min(5, Math.max(0, Number(item.porcentajeComision || 0))).toFixed(2)}"
          />
        </label>
        <label><span>Monto comisión</span><input data-manual-commission-amount class="budget-money-input" value="$0.00" /></label>
      </div>
      <div class="commission-pvp2-note">
        Base extraordinaria: última cotización al cliente${item.pvp2Version ? ` · versión ${Number(item.pvp2Version)}` : ""}${item.pvp2Folio ? ` · ${escapeHtml(item.pvp2Folio)}` : ""}. Máximo 5% y siempre sin IVA.
      </div>
    </section>
    <section class="client-quote-module">
      <h3>Generar comisión extraordinaria</h3>
      <div class="purchase-table commissions-detail-table" data-commission-manual data-manual-commission-base="${Number(item.montoProyecto || 0)}">
        <div class="purchase-table-head">
          <span>Persona</span>
          <span>Folio</span>
          <span>Proyecto</span>
          <span>% Comisión</span>
          <span>Monto comisión</span>
          <span>Acción</span>
        </div>
        <div data-commission-split-rows>
          <article class="purchase-table-row commission-table-row" data-commission-split-row="manual">
            <span><input data-commission-field="nombreManual" placeholder="Nombre de la persona" /></span>
            <span>${escapeHtml(item.folioPresupuesto || item.descripcionProyecto || "")}</span>
            <span>${escapeHtml(item.nombreProyecto || "")}</span>
            <span><b data-manual-row-percent>0.00%</b></span>
            <span><input class="budget-money-input commission-amount-input" data-commission-field="montoComision" value="$0.00" /></span>
            <span><b class="status-pill">Manual</b></span>
          </article>
        </div>
      </div>
      <div class="modal-actions inline-actions">
        <button class="success-button" type="button" data-commission-generate-manual="${Number(item.presupuestoId || 0)}">Generar comisión</button>
      </div>
    </section>
  `;
  updateManualCommissionCalculation("percent");
}

function updateManualCommissionCalculation(source = "percent") {
  const table = commissionsDetailContent?.querySelector("[data-commission-manual]");
  if (!table) return;
  const base = Math.max(0, Number(table.dataset.manualCommissionBase || 0));
  const percentInput = commissionsDetailContent.querySelector("[data-manual-commission-percent]");
  const amountInput = commissionsDetailContent.querySelector("[data-manual-commission-amount]");
  const row = commissionsDetailContent.querySelector("[data-commission-split-row='manual']");
  const rowPercent = commissionsDetailContent.querySelector("[data-manual-row-percent]");
  const rowAmountInput = row?.querySelector("[data-commission-field='montoComision']");
  const maxAmount = Math.round(base * 0.05 * 100) / 100;

  let percent = Math.min(5, Math.max(0, Number(percentInput?.value || 0)));
  let netAmount = Math.round(base * (percent / 100) * 100) / 100;

  if (source === "headerAmount" || source === "rowAmount") {
    const sourceInput = source === "rowAmount" ? rowAmountInput : amountInput;
    netAmount = Math.min(maxAmount, Math.max(0, Math.round(parseSignedCurrency(sourceInput?.value || 0) * 100) / 100));
    percent = base ? Math.min(5, Math.max(0, Math.round((netAmount / base) * 10000) / 100)) : 0;
  }

  if (percentInput) {
    percentInput.value = Number(percent || 0).toFixed(2);
    percentInput.setCustomValidity(percent > 5 ? "La comisión extraordinaria no puede exceder 5%." : "");
  }
  if (amountInput) {
    amountInput.value = formatCurrency(netAmount);
    amountInput.dataset.maxCommission = String(maxAmount);
  }
  if (rowAmountInput) {
    rowAmountInput.value = formatCurrency(netAmount);
    rowAmountInput.dataset.maxCommission = String(maxAmount);
  }
  if (rowPercent) rowPercent.textContent = `${percent.toFixed(2)}%`;
}

async function loadReportsModule() {
  if (!reportsContent) return;
  reportExportCache = null;
  if (!reportsPaidMonth) reportsPaidMonth = getCurrentMonthValue();
  reportsContent.innerHTML = `<div class="reports-loading">Cargando reportes...</div>`;
  try {
    const data = await api(`/api/reports/summary?month=${encodeURIComponent(reportsPaidMonth)}`);
    renderReports(data);
  } catch (error) {
    reportsContent.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}


function formatFileSize(bytes = 0) {
  const value = Number(bytes || 0);
  if (!value) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let size = value;
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  return `${size.toFixed(size >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function recoveryBadgeClass(value = "") {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("falta")) return "warning";
  if (normalized.includes("no encontrado") || normalized.includes("requiere")) return "danger";
  if (normalized.includes("importado")) return "success";
  if (normalized.includes("registrado") || normalized.includes("duplicado")) return "neutral";
  return "info";
}

function renderDocumentRecoveryBatches(batches = [], selectedBatchId = 0) {
  if (!batches.length) return `<option value="">Sin análisis previos</option>`;
  return batches
    .map((batch) => `<option value="${Number(batch.id)}" ${Number(batch.id) === Number(selectedBatchId) ? "selected" : ""}>#${Number(batch.id)} · ${escapeHtml(batch.nombre_lote || "Respaldo")} · ${formatDate(batch.created_at)}</option>`)
    .join("");
}

function renderDocumentRecoveryItems(items = []) {
  if (!items.length) return `<div class="empty-state">Aún no hay archivos analizados. Sube una carpeta de respaldo para iniciar la conciliación.</div>`;
  return `
    <div class="document-recovery-table-shell">
      <table class="document-recovery-table">
        <thead>
          <tr>
            <th><input type="checkbox" id="documentRecoverySelectAll" aria-label="Seleccionar todos" /></th>
            <th>Proyecto</th>
            <th>Archivo</th>
            <th>Tipo sugerido</th>
            <th>Estado SQL</th>
            <th>Importación</th>
            <th>Tamaño</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map((item) => {
              const canImport = item.status !== "Importado" && item.status !== "Restaurado" && item.budgetId && (item.matchStatus === "Falta en SQL" || String(item.matchStatus || "").includes("falta archivo físico"));
              return `<tr>
                <td><input type="checkbox" class="document-recovery-item-check" value="${Number(item.id)}" ${canImport ? "" : "disabled"} /></td>
                <td><strong>${escapeHtml(item.folio || "Sin proyecto")}</strong></td>
                <td><span class="document-recovery-file-name">${escapeHtml(item.originalName || "Archivo")}</span><small>${escapeHtml(item.relativePath || "")}</small></td>
                <td>${escapeHtml(item.suggestedType || "Documento proyecto")}<small>${escapeHtml(item.suggestedModule || "Proyecto")}</small></td>
                <td><span class="status-pill ${recoveryBadgeClass(item.matchStatus)}">${escapeHtml(item.matchStatus || "Pendiente")}</span></td>
                <td><span class="status-pill ${recoveryBadgeClass(item.status)}">${escapeHtml(item.status || "Pendiente")}</span></td>
                <td>${formatFileSize(item.sizeBytes)}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>`;
}

function renderDocumentRecoverySummary(items = []) {
  const totals = items.reduce(
    (acc, item) => {
      acc.total += 1;
      if (item.matchStatus === "Falta en SQL") acc.missing += 1;
      if (String(item.matchStatus || "").includes("falta archivo físico")) acc.physicalMissing += 1;
      if (String(item.matchStatus || "").includes("registrado") && !String(item.matchStatus || "").includes("falta archivo físico")) acc.registered += 1;
      if (item.matchStatus === "Proyecto no encontrado") acc.unmatched += 1;
      if (item.status === "Importado") acc.imported += 1;
      return acc;
    },
    { total: 0, missing: 0, physicalMissing: 0, registered: 0, unmatched: 0, imported: 0 }
  );
  return `
    <div class="document-recovery-summary">
      <article><span>Total analizado</span><strong>${formatInteger(totals.total)}</strong></article>
      <article><span>Faltan en SQL</span><strong>${formatInteger(totals.missing)}</strong></article>
      <article><span>Faltan en servidor</span><strong>${formatInteger(totals.physicalMissing)}</strong></article>
      <article><span>Ya registrados</span><strong>${formatInteger(totals.registered)}</strong></article>
      <article><span>Sin proyecto</span><strong>${formatInteger(totals.unmatched)}</strong></article>
      <article><span>Importados</span><strong>${formatInteger(totals.imported)}</strong></article>
    </div>`;
}

function documentRecoveryHtml(data = {}) {
  const batches = data.batches || [];
  const items = data.items || [];
  const selectedBatchId = data.selectedBatchId || batches[0]?.id || 0;
  return `
    <section class="document-recovery-panel">
      <div class="document-recovery-heading">
        <div>
          <h2>Analizar carpeta de respaldo</h2>
          <p>Selecciona la carpeta extraída del respaldo. El sistema lee nombres, rutas, tamaños y hash; no abre el contenido de los documentos.</p>
        </div>
      </div>
      <form class="document-recovery-upload" id="documentRecoveryUploadForm">
        <label>
          <span>Nombre del lote</span>
          <input name="nombreLote" value="Respaldo documental ${new Date().toLocaleDateString("es-MX")}" />
        </label>
        <label class="wide-field">
          <span>Carpeta de respaldo</span>
          <input id="documentRecoveryFiles" name="files" type="file" webkitdirectory directory multiple />
        </label>
        <button class="success-button" type="submit">Analizar carpeta</button>
      </form>
      <div class="document-recovery-note">Para respaldos .RAR, primero extrae la carpeta en Windows y sube la carpeta resultante. Así conservamos las rutas por proyecto.</div>
    </section>

    <section class="document-recovery-panel">
      <div class="document-recovery-toolbar">
        <label>
          <span>Análisis</span>
          <select id="documentRecoveryBatchSelect">${renderDocumentRecoveryBatches(batches, selectedBatchId)}</select>
        </label>
        <div class="document-recovery-actions">
          <button class="ghost-button" type="button" id="documentRecoveryRefreshButton">Actualizar</button>
          <button class="ghost-button" type="button" id="documentRecoveryReclassifyButton">Actualizar clasificación</button>
          <button class="small-button" type="button" id="documentRecoveryImportButton">Importar / restaurar seleccionados</button>
        </div>
      </div>
      ${renderDocumentRecoverySummary(items)}
      <div id="documentRecoveryItems">${renderDocumentRecoveryItems(items)}</div>
    </section>`;
}

function attachDocumentRecoveryEvents() {
  const form = document.querySelector("#documentRecoveryUploadForm");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const filesInput = document.querySelector("#documentRecoveryFiles");
    const files = Array.from(filesInput?.files || []);
    if (!files.length) return showErrorToast("Selecciona la carpeta extraída del respaldo.");
    const formData = new FormData();
    formData.append("nombreLote", form.elements.nombreLote?.value || "Respaldo documental");
    formData.append("sourceName", files[0]?.webkitRelativePath?.split("/")[0] || "Carpeta subida desde navegador");
    files.forEach((file) => formData.append("files", file, file.webkitRelativePath || file.name));
    const button = form.querySelector("button[type='submit']");
    const originalText = button?.textContent || "Analizar carpeta";
    if (button) {
      button.disabled = true;
      button.textContent = "Analizando...";
    }
    try {
      const response = await fetch("/api/document-recovery/analyze", { method: "POST", body: formData, credentials: "same-origin" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "No se pudo analizar la carpeta.");
      recuperacionDocumentalContent.innerHTML = documentRecoveryHtml(data);
      attachDocumentRecoveryEvents();
    } catch (error) {
      showErrorToast(error);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  });

  document.querySelector("#documentRecoveryBatchSelect")?.addEventListener("change", async (event) => {
    await loadRecuperacionDocumentalModule(Number(event.target.value || 0));
  });
  document.querySelector("#documentRecoveryRefreshButton")?.addEventListener("click", () => loadRecuperacionDocumentalModule(Number(document.querySelector("#documentRecoveryBatchSelect")?.value || 0)));
  document.querySelector("#documentRecoverySelectAll")?.addEventListener("change", (event) => {
    document.querySelectorAll(".document-recovery-item-check:not(:disabled)").forEach((checkbox) => {
      checkbox.checked = event.target.checked;
    });
  });
  document.querySelector("#documentRecoveryReclassifyButton")?.addEventListener("click", async (event) => {
    const batchId = Number(document.querySelector("#documentRecoveryBatchSelect")?.value || 0);
    if (!batchId) return showErrorToast("Selecciona un análisis para actualizar la clasificación.");
    pendingActionButton = event.currentTarget;
    try {
      const data = await api("/api/document-recovery/reclassify", { method: "POST", body: JSON.stringify({ batchId }) });
      showSuccessToast(`Clasificación actualizada: ${data.reclassified || 0}. Archivos vinculados/corregidos: ${data.updatedFiles || 0}.`);
      recuperacionDocumentalContent.innerHTML = documentRecoveryHtml(data);
      attachDocumentRecoveryEvents();
    } catch (error) {
      showErrorToast(error);
    }
  });

  document.querySelector("#documentRecoveryImportButton")?.addEventListener("click", async (event) => {
    const itemIds = Array.from(document.querySelectorAll(".document-recovery-item-check:checked")).map((input) => Number(input.value)).filter(Boolean);
    if (!itemIds.length) return showErrorToast("No hay archivos nuevos para importar o restaurar. Si el archivo está en SQL pero no existe en uploads, debe aparecer como 'Registrado en SQL, falta archivo físico'.");
    pendingActionButton = event.currentTarget;
    try {
      const data = await api("/api/document-recovery/import", { method: "POST", body: JSON.stringify({ itemIds }) });
      showSuccessToast(`Importados/restaurados: ${data.imported || 0}. Omitidos: ${data.skipped || 0}.`);
      recuperacionDocumentalContent.innerHTML = documentRecoveryHtml(data);
      attachDocumentRecoveryEvents();
    } catch (error) {
      showErrorToast(error);
    }
  });
}

async function loadRecuperacionDocumentalModule(batchId = 0) {
  if (!recuperacionDocumentalContent) return;
  recuperacionDocumentalContent.innerHTML = `<div class="reports-loading">Cargando conciliación documental...</div>`;
  try {
    const suffix = batchId ? `?batchId=${encodeURIComponent(batchId)}` : "";
    const data = await api(`/api/document-recovery${suffix}`);
    recuperacionDocumentalContent.innerHTML = documentRecoveryHtml(data);
    attachDocumentRecoveryEvents();
  } catch (error) {
    recuperacionDocumentalContent.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

async function loadExportacionesModule() {
  if (!exportacionesContent) return;
  reportExportCache = null;
  exportacionesContent.innerHTML = reportExportCenterHtml();
  initializeReportExportCenter();
}

async function loadHomeModule() {
  const greeting = document.querySelector("#homeGreeting");
  const allowed = document.querySelector("#homeAllowedModules");
  if (greeting) greeting.textContent = "Dalvo Command Center";
  if (allowed) allowed.textContent = `${getAllowedModules().length} herramientas disponibles`;

  try {
    const [summaryData, budgetsData, clientsData, purchasesData, fixedExpensesData] = await Promise.all([
      api("/api/dashboard/summary"),
      api("/api/budgets?search="),
      api("/api/clients?search="),
      canAccessModule("compras") ? api("/api/purchases?search=") : Promise.resolve({ pending: [], created: [] }),
      canAccessModule("compras") ? api("/api/purchases/fixed-expenses?search=") : Promise.resolve({ expenses: [] })
    ]);
    const budgets = budgetsData.budgets || [];
    const receivable = summaryData.receivable || [];
    const payableOcp = summaryData.payable?.accounts || [];
    const payableOcgf = summaryData.payable?.ocgfAccounts || [];
    const payableCommissions = summaryData.payable?.commissionAccounts || [];
    const payable = [...payableOcp, ...payableOcgf, ...payableCommissions];
    const metrics = summaryData.metrics || {};
    updateNavigationBadges({
      budgets,
      receivable,
      payable: payableOcp,
      payableOcgf,
      payableCommissions,
      purchases: purchasesData || { pending: [], created: [] },
      fixedExpenses: fixedExpensesData.expenses || []
    });

    animateCounter(document.querySelector("#homeActiveProjects"), metrics.activeProjects, { format: "integer" });
    animateCounter(document.querySelector("#homeMonthCollected"), metrics.collectedMonth, { format: "currency" });
    animateCounter(document.querySelector("#homeRealProfitMonth"), metrics.realProfitMonth, { format: "currency" });
    animateCounter(document.querySelector("#homeReceivablePending"), metrics.receivablePending, { format: "currency" });
    animateCounter(document.querySelector("#homePayablePending"), metrics.payablePending, { format: "currency" });

    renderHomePendingList([
      {
        label: "Presupuestos por aprobar",
        detail: `${formatInteger(metrics.pendingInitialBudgetApprovals || 0)} presupuestos · ${formatInteger(
          metrics.pendingQuoteApprovals || 0
        )} cotizaciones`,
        count: Number(metrics.pendingBudgetApprovals ?? metrics.pendingInitialBudgetApprovals ?? 0),
        module: "presupuesto",
        filter: "approval"
      },
      {
        label: "Cuentas por cobrar",
        detail: `${formatCurrency(metrics.receivablePending || 0)} pendientes`,
        count: Number(metrics.receivablePendingCount ?? 0),
        module: "cuentas-cobrar",
        filter: "pending"
      },
      {
        label: "Cuentas por pagar",
        detail: `${formatCurrency(metrics.payablePending || 0)} pendientes`,
        count: Number(metrics.payablePendingCount ?? payable.filter((item) => !isAccountsPayablePaid(item)).length),
        module: "cuentas-pagar",
        filter: "pending"
      }
    ]);

    const activity = [
      ...budgets.map((item) => ({
        type: "budget",
        title: `Presupuesto ${item.folio || "sin folio"}`,
        detail: `${item.empresa || "Empresa"} · ${item.estatus || "Sin estatus"}`,
        date: item.updatedAt || item.createdAt
      })),
      ...receivable.map((item) => ({
        type: "receivable",
        title: `Cobranza ${item.folio || ""}`,
        detail: `${item.empresa || "Cliente"} · ${item.pendiente || item.estado}`,
        date: item.updatedAt || item.fecha
      })),
      ...payable.map((item) => ({
        type: "payable",
        title: `Pago ${item.ocp || item.ocgf || ""}`,
        detail: `${item.proveedor || "Proveedor"} · ${item.pendiente || item.estado}`,
        date: item.updatedAt || item.createdAt
      })),
      ...(clientsData.clients || []).slice(0, 4).map((item) => ({
        type: "client",
        title: `Cliente ${item.empresa || item.nombre}`,
        detail: item.nombre || "Directorio actualizado",
        date: item.updatedAt || item.createdAt
      }))
    ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    renderHomeActivity(activity);
  } catch (error) {
    renderHomeActivity([{ title: "No se pudo cargar el command center", detail: error.message, date: new Date(), type: "warning" }]);
  }
}


function getPurchaseFilters() {
  return {
    type: purchaseFilterType?.value || "all",
    company: purchaseFilterCompany?.value || "",
    provider: purchaseFilterProvider?.value || "",
    status: purchaseFilterStatus?.value || "",
    dateFrom: purchaseFilterDateFrom?.value || "",
    dateTo: purchaseFilterDateTo?.value || "",
    search: purchaseSearch?.value || ""
  };
}

function purchaseRowMatchesFilters(item = {}, source = "created", filters = getPurchaseFilters()) {
  if (filters.type !== "all" && filters.type !== source) return false;
  const sourceSearch = source === "ocgf" ? purchaseFixedExpenseSearch?.value || "" : filters.search;
  if (sourceSearch && !objectMatchesSearch(item, sourceSearch)) return false;
  const company = String(item.empresa || item.sucursal || "");
  if (filters.company && company !== filters.company) return false;
  const provider = String(item.proveedor || item.proveedorNombre || "");
  if (filters.provider && provider !== filters.provider) return false;
  const status = String(item.estatus || item.estado || item.estadoRegistro || "");
  if (filters.status && status !== filters.status) return false;
  return isWithinDateRange(item.createdAt || item.fecha || item.updatedAt, filters.dateFrom, filters.dateTo);
}

function syncPurchaseFilterOptions() {
  const allRows = [...(purchasesCache.pending || []), ...(purchasesCache.created || []), ...(purchaseFixedExpensesCache || [])];
  syncFilterSelect(purchaseFilterCompany, allRows.map((item) => item.empresa || item.sucursal), "Todas");
  syncFilterSelect(purchaseFilterProvider, allRows.map((item) => item.proveedor || item.proveedorNombre), "Todos");
  syncFilterSelect(purchaseFilterStatus, allRows.map((item) => item.estatus || item.estado || item.estadoRegistro), "Todos");
}

function getFilteredPurchaseCollections() {
  const filters = getPurchaseFilters();
  return {
    filters,
    pending: (purchasesCache.pending || []).filter((item) => purchaseRowMatchesFilters(item, "pending", filters)),
    created: (purchasesCache.created || []).filter((item) => purchaseRowMatchesFilters(item, "created", filters)),
    ocgf: (purchaseFixedExpensesCache || []).filter((item) => purchaseRowMatchesFilters(item, "ocgf", filters))
  };
}

function updatePurchaseSectionVisibility(type = "all") {
  document.querySelectorAll("[data-purchase-section]").forEach((section) => {
    section.classList.toggle("hidden", type !== "all" && section.dataset.purchaseSection !== type);
  });
}

function updatePurchaseFilterSummary(collections) {
  if (!purchaseFilterSummary) return;
  const total = collections.pending.length + collections.created.length + collections.ocgf.length;
  purchaseFilterSummary.textContent = `${total.toLocaleString("es-MX")} registros visibles · ${collections.pending.length} pendientes · ${collections.created.length} OCP · ${collections.ocgf.length} OCGF`;
}

function renderPurchases(data) {
  if (data) purchasesCache = data;
  purchasesCache = purchasesCache || { pending: [], created: [] };
  ensureAlertBaseline("purchasePending", purchasesCache.pending || [], (item) => item.budgetId, shouldAlertPurchasePending);
  ensureAlertBaseline("purchaseCreated", purchasesCache.created || [], (item) => item.orderId || item.budgetId, shouldAlertPurchaseCreated);
  syncPurchaseFilterOptions();
  const collections = getFilteredPurchaseCollections();
  updatePurchaseSectionVisibility(collections.filters.type);
  updatePurchaseFilterSummary(collections);
  const pending = sortByState(collections.pending, purchasePendingSort, (item, key) =>
    key === "__flagged" ? getRowFlagSortValue("purchasePending", item.budgetId) : item[key]
  );
  const created = sortByState(collections.created, purchaseCreatedSort, (item, key) =>
    key === "__flagged" ? getRowFlagSortValue("purchaseCreated", item.orderId || item.budgetId) : item[key]
  );
  const pendingRows = paginateRows(purchasePendingRows, "purchasePending", pending, () => renderPurchases(purchasesCache));
  const createdRows = paginateRows(purchaseCreatedRows, "purchaseCreated", created, () => renderPurchases(purchasesCache));

  purchasePendingRows.innerHTML = pending.length
    ? pendingRows
        .map(
          (item) => `
            <article class="${getRowClasses(
              "purchase-table-row is-clickable",
              "row-state-waiting",
              getAlertClass("purchasePending", item.budgetId, item.updatedAt, shouldAlertPurchasePending(item)),
              getRowFlagClass("purchasePending", item.budgetId)
            )}" data-purchase-budget-id="${item.budgetId}" data-alert-scope="purchasePending" data-alert-updated-at="${escapeHtml(item.updatedAt || "")}">
              ${renderRowFlag("purchasePending", item.budgetId)}
              <span>${escapeHtml(item.empresa)}</span>
              <span>${escapeHtml(item.dlv)}</span>
              <span>${escapeHtml(item.po || "Sin PO")}</span>
              <span>${escapeHtml(item.proyecto)}</span>
              <span>${escapeHtml(item.partidasPendientes)}</span>
              <span><b class="status-pill">${escapeHtml(item.estatus)}</b></span>
              <span>${escapeHtml(formatDate(item.createdAt))}</span>
              <span>${escapeHtml(formatDate(item.updatedAt))}</span>
            </article>
          `
        )
        .join("")
    : `<div class="purchase-table-row purchase-table-empty"><span>Sin OCP pendientes de creación</span></div>`;

  purchaseCreatedRows.innerHTML = created.length
    ? createdRows
        .map(
          (item) => `
            <article class="${getRowClasses(
              "purchase-table-row is-clickable",
              getPurchaseCreatedRowClass(item),
              getAlertClass("purchaseCreated", item.orderId || item.budgetId, item.updatedAt, shouldAlertPurchaseCreated(item)),
              getRowFlagClass("purchaseCreated", item.orderId || item.budgetId)
            )}" data-purchase-budget-id="${item.budgetId}" data-purchase-order-id="${item.orderId || ""}" data-alert-scope="purchaseCreated" data-alert-id="${item.orderId || item.budgetId}" data-alert-updated-at="${escapeHtml(item.updatedAt || "")}">
              ${renderRowFlag("purchaseCreated", item.orderId || item.budgetId)}
              <span>${escapeHtml(item.empresa)}</span>
              <span>${escapeHtml(item.dlv)}</span>
              <span>${escapeHtml(item.ocp)}</span>
              <span>${escapeHtml(item.proveedor)}</span>
              <span>${escapeHtml(item.proyecto)}</span>
              <span>${escapeHtml(formatDate(item.createdAt))}</span>
              <span>${escapeHtml(item.owner || "Sin dato")}</span>
              <span>${renderModificationStamp(item.updatedAt, item.updatedBy || item.owner)}</span>
              <span>${formatCurrency(item.monto || 0)}</span>
              <span><b class="status-pill">${escapeHtml(item.estatus)}</b></span>
            </article>
          `
        )
        .join("")
    : `<div class="purchase-table-row purchase-table-empty"><span>Sin OCP creadas</span></div>`;
  applyVisibleColumns(purchasePendingTable);
  applyVisibleColumns(purchaseCreatedTable);
}

function renderPurchaseFixedExpenses(expenses = null) {
  if (Array.isArray(expenses)) purchaseFixedExpensesCache = expenses;
  ensureAlertBaseline("purchaseFixedExpense", purchaseFixedExpensesCache, (item) => item.id, shouldAlertFixedExpensePurchase);
  syncPurchaseFilterOptions();
  const collections = getFilteredPurchaseCollections();
  updatePurchaseSectionVisibility(collections.filters.type);
  updatePurchaseFilterSummary(collections);
  const filteredExpenses = collections.ocgf;
  const sortedExpenses = sortByState(filteredExpenses, purchaseFixedExpenseSort, (item, key) =>
    key === "__flagged" ? getRowFlagSortValue("purchaseFixedExpense", item.id) : item[key]
  );
  const rows = paginateRows(purchaseFixedExpenseRows, "purchaseFixedExpenses", sortedExpenses, () =>
    renderPurchaseFixedExpenses(purchaseFixedExpensesCache)
  );
  purchaseFixedExpenseRows.innerHTML = filteredExpenses.length
    ? rows
        .map(
          (item) => `
            <article class="${getRowClasses(
              "purchase-table-row is-clickable",
              getFixedExpenseStateClass(item),
              getAlertClass("purchaseFixedExpense", item.id, item.updatedAt, shouldAlertFixedExpensePurchase(item)),
              getRowFlagClass("purchaseFixedExpense", item.id)
            )}" data-ocgf-id="${item.id}" data-alert-scope="purchaseFixedExpense" data-alert-updated-at="${escapeHtml(item.updatedAt || "")}">
              ${renderRowFlag("purchaseFixedExpense", item.id)}
              <span>${escapeHtml(item.gasto)}</span>
              <span>${escapeHtml(item.folio)}</span>
              <span>${escapeHtml(item.sucursal)}</span>
              <span>${escapeHtml(item.proveedorNombre)}</span>
              <span>${escapeHtml(item.descripcion)}</span>
              <span>${escapeHtml(formatDate(item.createdAt || item.fecha))}</span>
              <span>${escapeHtml(item.owner || "Sin dato")}</span>
              <span>${renderModificationStamp(item.updatedAt, item.updatedBy || item.owner)}</span>
              <span><b class="status-pill">${escapeHtml(item.estado)}</b></span>
              <span>${formatCurrency(item.presupuestoAsignado ?? item.presupuesto ?? 0)}</span>
              <span>${formatCurrency(item.presupuestoDisponible ?? item.presupuesto ?? 0)}</span>
              <span>${formatCurrency(item.monto || 0)}</span>
              <span>
                ${
                  isCurrentUserSuperAdmin()
                    ? `<button class="small-button danger-button" type="button" data-ocgf-delete="${item.id}">X</button>`
                    : ""
                }
              </span>
            </article>
          `
        )
        .join("")
    : `<div class="purchase-table-row purchase-table-empty"><span>Sin gastos fijos generados</span></div>`;
  applyVisibleColumns(purchaseFixedExpenseTable);
}

async function loadPurchaseFixedExpenses(search = "") {
  const data = await api(`/api/purchases/fixed-expenses?search=${encodeURIComponent(search)}`);
  renderPurchaseFixedExpenses(data.expenses || []);
}

async function loadPurchasesModule() {
  try {
    const purchaseQuery = (purchaseSearch?.value || "").trim();
    const [data] = await Promise.all([
      api(`/api/purchases?search=${encodeURIComponent(purchaseQuery)}`),
      loadPurchaseFixedExpenses(purchaseFixedExpenseSearch?.value || "")
    ]);
    renderPurchases(data);
    refreshNavigationBadges();
  } catch (error) {
    purchasePendingRows.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    purchaseCreatedRows.innerHTML = "";
    purchaseFixedExpenseRows.innerHTML = "";
  }
}

function newFixedExpenseOrderRow(row = {}) {
  return {
    id: row.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
    presupuesto: row.presupuesto || "Gastos Fijos",
    proveedorId: Number(row.proveedorId || 0) || null,
    proveedorNombre: row.proveedorNombre || "",
    descripcion: row.descripcion || "",
    cantidad: Number(row.cantidad ?? 1),
    precioUnitario: Number(row.precioUnitario || 0)
  };
}

function calculateFixedExpenseOrderTotal(row) {
  return Number(row.cantidad || 0) * Number(row.precioUnitario || 0);
}

function fixedExpenseOrderTotal() {
  const subtotal = purchaseFixedExpenseOrderRows.reduce((sum, row) => sum + calculateFixedExpenseOrderTotal(row), 0);
  const retentionBox = document.querySelector("#fixedExpenseRetentionBox");
  const retention = retentionBox && !retentionBox.classList.contains("hidden")
    ? parseCurrency(document.querySelector("#fixedExpenseRetentionInput")?.value || 0)
    : 0;
  const sinIva = document.querySelector("#fixedExpenseSinIva")?.checked;
  return Math.max(0, subtotal * (sinIva ? 1 : 1.16) - retention);
}

function renderProviderOptions(selectedId = 0) {
  return (purchaseFixedExpenseCatalogs.providers || [])
    .map((provider) => `<option value="${provider.id}" ${Number(selectedId) === Number(provider.id) ? "selected" : ""}>${escapeHtml(provider.empresa)}</option>`)
    .join("");
}

function renderFixedExpenseOptions(selectedId = 0, selectedLabel = "") {
  const fixedExpenses = purchaseFixedExpenseCatalogs.fixedExpenses || [];
  const hasSelected = fixedExpenses.some((expense) => Number(selectedId) === Number(expense.id));
  const fallbackOption =
    selectedLabel && !hasSelected ? `<option value="${escapeHtml(selectedId || "")}" selected>${escapeHtml(selectedLabel)}</option>` : "";
  return (
    fallbackOption +
    fixedExpenses
    .map((expense) => `<option value="${expense.id}" ${Number(selectedId) === Number(expense.id) ? "selected" : ""}>${escapeHtml(expense.gasto)}</option>`)
    .join("")
  );
}

function renderFixedExpenseOrderRows() {
  const rowsContainer = document.querySelector("#fixedExpenseOrderRows");
  const totalElement = document.querySelector("#fixedExpenseOrderTotal");
  if (!rowsContainer || !totalElement) return;
  if (!purchaseFixedExpenseOrderRows.length) purchaseFixedExpenseOrderRows = [newFixedExpenseOrderRow()];
  rowsContainer.innerHTML = purchaseFixedExpenseOrderRows
    .map((row) => `
      <article class="fixed-purchase-order-row" data-row-id="${row.id}">
        <input value="Gastos Fijos" readonly />
        <input data-fixed-expense-order-field="proveedorNombre" value="${escapeHtml(row.proveedorNombre)}" readonly required />
        <input data-fixed-expense-order-field="descripcion" value="${escapeHtml(row.descripcion)}" placeholder="Descripción" required />
        <input data-fixed-expense-order-field="cantidad" type="number" min="0.01" step="0.01" value="${Number(row.cantidad || 0)}" required />
        <input class="budget-money-input" data-fixed-expense-order-field="precioUnitario" inputmode="decimal" value="${formatCurrency(row.precioUnitario || 0)}" required />
        <b data-fixed-expense-row-total>${formatCurrency(calculateFixedExpenseOrderTotal(row))}</b>
        <button class="icon-button remove-fixed-expense-order-row" type="button" data-row-id="${row.id}">x</button>
      </article>
    `)
    .join("");
  totalElement.textContent = formatCurrency(fixedExpenseOrderTotal());
}

function fixedExpenseOrderPayload() {
  const retentionBox = document.querySelector("#fixedExpenseRetentionBox");
  const items = purchaseFixedExpenseOrderRows.map((row) => ({
    presupuesto: row.presupuesto,
    proveedorId: row.proveedorId,
    proveedorNombre: String(row.proveedorNombre || "").trim(),
    descripcion: String(row.descripcion || "").trim(),
    cantidad: Number(row.cantidad || 0),
    precioUnitario: Number(row.precioUnitario || 0)
  }));
  const invalid = items.find((row) => !row.proveedorNombre || !row.descripcion || row.cantidad <= 0 || row.precioUnitario <= 0);
  if (invalid) {
    throw new Error("Completa proveedor, descripción, cantidad y precio unitario en todas las partidas OCGF.");
  }
  return {
    retencionActiva: Boolean(retentionBox && !retentionBox.classList.contains("hidden")),
    retencionMonto: parseCurrency(document.querySelector("#fixedExpenseRetentionInput")?.value || 0),
    sinIva: Boolean(document.querySelector("#fixedExpenseSinIva")?.checked),
    items
  };
}

async function loadPurchaseFixedExpenseCatalogs() {
  purchaseFixedExpenseCatalogs = await api("/api/purchases/fixed-expenses/catalogs");
  fixedExpenseBranchesCache = purchaseFixedExpenseCatalogs.branches || fixedExpenseBranchesCache;
}

function renderPurchaseFixedExpenseFiles(files = []) {
  return files.length
    ? files
        .map(
          (file) => `
            <div class="budget-documents-row">
              <span>${escapeHtml(file.tipo || "Cotización proveedor")}</span>
              <span>${renderFileNameLink(file)}</span>
                <span>${escapeHtml(formatDate(file.createdAt))}</span>
                <span class="document-actions">
                  ${renderFileViewButton(file)}
                  ${
                    canDeleteRecords()
                    ? `<button class="small-button danger-button icon-only-button" type="button" aria-label="Eliminar archivo" data-ocgf-file-delete="${file.id}">X</button>`
                      : ""
                  }
                </span>
            </div>
          `
        )
        .join("")
    : `<div class="budget-documents-row"><span>Cotización proveedor</span><span>Sin archivos cargados</span><span></span><span></span></div>`;
}

function renderPurchaseFixedExpenseVersions(versions = []) {
  return versions.length
    ? versions
        .map((version) => {
          const isApproved = version.estatus === "Aprobada";
          const isCancelled = version.estatus === "Cancelada";
          return `
            <article class="client-quote-history-row">
              <div>
                <strong>${escapeHtml(version.folio || `Versión ${version.version}`)}</strong>
                <span>${formatDate(version.createdAt)} · Versión ${version.version} · ${escapeHtml(version.estatus)}</span>
              </div>
              <div class="client-quote-history-actions">
                ${
                  isApproved && !isCancelled
                    ? `<a class="small-button" href="/api/ocgf-orders/${version.id}/download" target="_blank" rel="noreferrer">Descargar</a>`
                    : ""
                }
                <button class="small-button dark-button" type="button" data-ocgf-order-preview="${version.id}">Vista previa</button>
                ${
                  !isApproved && !isCancelled && canApproveRecords()
                    ? `<button class="success-button small-button" type="button" data-ocgf-order-approve="${version.id}">✓ Aprobar</button>`
                    : ""
                }
                ${
                  isApproved && !isCancelled && isCurrentUserSuperAdmin()
                    ? `<button class="small-button" type="button" data-ocgf-order-regenerate="${version.id}">Regenerar PDF</button>`
                    : ""
                }
                ${!isCancelled ? `<button class="small-button" type="button" data-ocgf-order-edit-version="${version.id}">Editar</button>` : ""}
                ${!isCancelled ? `<button class="small-button danger-button" type="button" data-ocgf-order-cancel="${version.id}">Cancelar</button>` : ""}
              </div>
            </article>
          `;
        })
        .join("")
    : `<div class="client-quote-empty">Sin versiones OCGF guardadas.</div>`;
}

function enhancePurchaseFixedExpenseProviderPicker() {
  // El proveedor de OCGF usa un <select> real para garantizar que siempre viaje el ID.
}

function renderPurchaseFixedExpenseDetail(data = {}) {
  activePurchaseFixedExpenseData = data;
  const expense = data.expense || {};
  const isNew = !expense.id;
  const canEditHeader = !isNew && Boolean(data.canEditHeader || canEditOcgfHeader());
  const draft = expense.draft || {};
  purchaseFixedExpenseOrderRows = (draft.items || []).map((row) => newFixedExpenseOrderRow(row));
  if (!purchaseFixedExpenseOrderRows.length) {
    purchaseFixedExpenseOrderRows = [
      newFixedExpenseOrderRow({
        proveedorId: expense.proveedorId,
        proveedorNombre: expense.proveedorNombre
      })
    ];
  }
  const retentionActive = draft.retencionActiva || false;
  const retentionValue = draft.retencionMonto || 0;
  const sinIva = draft.sinIva || false;
  const headerBudgetValue = isNew ? Number(expense.presupuesto || 0) : Number(expense.budget?.disponible ?? expense.presupuesto ?? 0);

  purchaseFixedExpenseDetailContent.innerHTML = `
    <form class="budget-detail-card" id="purchaseFixedExpenseForm">
      <div class="budget-detail-grid">
        <label>
          <span>Gasto</span>
          <select name="gastoFijoId" id="purchaseFixedExpenseCatalogSelect" ${isNew || canEditHeader ? "" : "disabled"}>
            <option value="">Selecciona gasto</option>
            ${renderFixedExpenseOptions(expense.gastoFijoId, expense.gasto)}
          </select>
        </label>
        <label><span>Sucursal</span><select name="sucursal" id="purchaseFixedExpenseBranch" ${isNew || canEditHeader ? "required" : "disabled"}>
          <option value="">Selecciona sucursal</option>
          ${(purchaseFixedExpenseCatalogs.branches || [])
            .map((value) => String(value || "").trim())
            .filter(Boolean)
            .map((branch) => `<option value="${escapeHtml(branch)}" ${normalizeSearchValue(branch) === normalizeSearchValue(expense.sucursal) ? "selected" : ""}>${escapeHtml(branch)}</option>`)
            .join("")}
        </select></label>
        <label>
          <span>Proveedor</span>
          <select name="proveedorId" id="purchaseFixedExpenseProviderInput" ${isNew ? "required" : "disabled"}>
            <option value="">Selecciona un proveedor</option>
            ${(purchaseFixedExpenseCatalogs.providers || [])
              .slice()
              .sort((a, b) => String(a.empresa || "").localeCompare(String(b.empresa || ""), "es", { sensitivity: "base" }))
              .map((provider) => `<option value="${provider.id}" ${Number(provider.id) === Number(expense.proveedorId || 0) ? "selected" : ""}>${escapeHtml(provider.empresa || "Proveedor")}</option>`)
              .join("")}
          </select>
        </label>
        <label><span>Fecha</span><input name="fecha" type="date" value="${escapeHtml((expense.fecha || new Date().toISOString()).slice(0, 10))}" ${isNew ? "" : "disabled"} /></label>
        <label><span>Presupuesto disponible</span><input id="purchaseFixedExpenseBudget" value="${formatCurrency(headerBudgetValue)}" readonly /></label>
        <label><span>Folio</span><input value="${escapeHtml(expense.folio || purchaseFixedExpenseCatalogs.nextFolio || "OCGF0001")}" readonly /></label>
        <label class="wide-field"><span>Descripción</span><input name="descripcion" value="${escapeHtml(expense.descripcion || "")}" ${isNew ? "required" : "disabled"} placeholder="Descripción del gasto fijo" /></label>
      </div>
      ${
        isNew
          ? `<button class="success-button" type="submit">Guardar Gasto Fijo</button>`
          : canEditHeader
            ? `<div class="client-quote-actions">
                <button class="success-button" type="submit">Guardar cabecera</button>
                ${isCurrentUserSuperAdmin() ? `<button class="small-button" type="button" data-ocgf-reassign="${expense.id}">Mover a otro gasto</button>` : ""}
              </div>`
            : isCurrentUserSuperAdmin()
              ? `<button class="small-button" type="button" data-ocgf-reassign="${expense.id}">Mover a otro gasto</button>`
            : ""
      }
    </form>

    ${
      !isNew
        ? `<section class="budget-block-panel fixed-purchase-budget-panel">
            <h3>Presupuesto disponible</h3>
            <div class="fixed-purchase-summary">
              <article><span>Asignado</span><strong>${formatCurrency(expense.budget?.asignado || 0)}</strong></article>
              <article><span>Presupuesto adicional</span><strong>${formatCurrency(expense.budget?.adicional || 0)}</strong></article>
              <article><span>Usado</span><strong>${formatCurrency(expense.budget?.usado || 0)}</strong></article>
              <article><span>Disponible</span><strong>${formatCurrency(expense.budget?.disponible || 0)}</strong></article>
            </div>
          </section>`
        : ""
    }

    ${
      !isNew
        ? `<section class="client-quote-module">
            <h3>Orden de Compra Proveedor</h3>
            <section class="supplier-order-table">
              <div class="supplier-order-head">
                <span>Presupuesto</span>
                <span>Proveedor</span>
                <span>Descripción</span>
                <span>Cantidad</span>
                <span>Precio unitario</span>
                <span>Total</span>
                <span>Acción</span>
              </div>
              <div id="fixedExpenseOrderRows"></div>
            </section>
            <div class="client-quote-total-row">
              <div class="client-quote-actions">
                <button class="small-button" type="button" data-ocgf-order-action="add-row">+ Agregar Fila</button>
                <button class="success-button" type="button" data-ocgf-order-action="save-draft">Guardar borrador</button>
                <button class="success-button" type="button" data-ocgf-order-action="save-version">
                  ${editingFixedExpenseOrderVersionId ? "Actualizar versión" : "Guardar versión"}
                </button>
                <button class="ghost-button client-quote-ghost" type="button" data-ocgf-order-action="toggle-retention">Retención de impuestos</button>
                <label class="inline-check-field"><input id="fixedExpenseSinIva" type="checkbox" ${sinIva ? "checked" : ""} /> <span>Sin IVA</span></label>
              </div>
              <div class="client-quote-total">Total OC proveedor: <strong id="fixedExpenseOrderTotal">$0.00</strong></div>
            </div>
            <div class="supplier-order-retention ${retentionActive ? "" : "hidden"}" id="fixedExpenseRetentionBox">
              <label><span>Retención de impuestos</span><input class="budget-money-input" id="fixedExpenseRetentionInput" inputmode="decimal" value="${formatCurrency(retentionValue)}" /></label>
            </div>
            <section class="budget-documents-card">
              <div class="budget-documents-heading"><span>Cotización del proveedor para esta OCP</span><h3>Archivos de proveedor</h3></div>
              <form class="supplier-order-file-form" id="fixedExpenseFileForm">
                <label class="file-upload-inline"><input name="cotizaciones" type="file" multiple /></label>
                <button class="small-button" type="submit">Subir cotización</button>
              </form>
              <div class="budget-documents-table">
                <div class="budget-documents-head"><span>Tipo</span><span>Nombre</span><span>Fecha</span><span>Acción</span></div>
                <div id="fixedExpenseFilesList">${renderPurchaseFixedExpenseFiles(expense.files || [])}</div>
              </div>
            </section>
            <h3 class="client-quote-history-title">Historial de OCGF</h3>
            <div class="client-quote-history">${renderPurchaseFixedExpenseVersions(expense.versions || [])}</div>
            <h3 class="client-quote-history-title">Historial de reasignaciones OCGF</h3>
            <div class="client-quote-history">${renderExpenseReassignmentHistory(expense.reassignments || [])}</div>
          </section>`
        : ""
    }
  `;

  enhancePurchaseFixedExpenseProviderPicker();
  renderFixedExpenseOrderRows();
}

async function openPurchaseFixedExpenseDetail(ocgfId = null, options = {}) {
  if (options.persist !== false && ocgfId) {
    saveDetailLocation("compras", "fixed-expense-detail", ocgfId);
  }
  activePurchaseFixedExpenseId = ocgfId;
  activePurchaseFixedExpenseData = null;
  editingFixedExpenseOrderVersionId = null;
  purchasesListView.classList.add("hidden");
  purchaseDetailView.classList.add("hidden");
  purchaseFixedExpenseDetailView.classList.remove("hidden");
  purchaseFixedExpenseDetailContent.innerHTML = `<div class="empty-state">Cargando gasto fijo...</div>`;
  try {
    await loadPurchaseFixedExpenseCatalogs();
    if (ocgfId) {
      const data = await api(`/api/purchases/fixed-expenses/${ocgfId}`);
      renderPurchaseFixedExpenseDetail(data);
    } else {
      renderPurchaseFixedExpenseDetail({ expense: {} });
    }
  } catch (error) {
    purchaseFixedExpenseDetailContent.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

async function refreshActivePurchaseFixedExpenseDetail() {
  if (!activePurchaseFixedExpenseId || purchaseFixedExpenseDetailView.classList.contains("hidden")) return;
  try {
    const data = await api(`/api/purchases/fixed-expenses/${activePurchaseFixedExpenseId}`);
    renderPurchaseFixedExpenseDetail(data);
    await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
  } catch (error) {
    purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
}

function closePurchaseFixedExpenseDetail() {
  activePurchaseFixedExpenseId = null;
  activePurchaseFixedExpenseData = null;
  editingFixedExpenseOrderVersionId = null;
  saveModuleLocation("compras");
  purchaseFixedExpenseDetailView.classList.add("hidden");
  purchasesListView.classList.remove("hidden");
  loadPurchasesModule();
}


function isAccountsReceivableCollected(item = {}) {
  // No degradar proyectos históricos que Dalvo ya reconoce como cobrados.
  // Los eventos de pago nuevos complementan el dato, pero no sustituyen el estado
  // documental cuando el histórico de pagos aún no está completo.
  const normalized = normalizeSearchValue(`${item.estado || ""} ${item.pendiente || ""}`);
  if (normalized.includes("pago completo") || normalized.includes("cobrad") || normalized.includes("sin pendientes") || normalized.includes("complemento cargado")) {
    return true;
  }
  if (item.pagosRegistrados === true) {
    return Number(item.saldoCobrar ?? item.monto ?? 0) <= 0.004;
  }
  return false;
}

const ACCOUNTS_RECEIVABLE_STATUS_ORDER = [
  "En proceso",
  "Facturación",
  "Track ID cargado",
  "Comprobante de pago cargado",
  "Pago parcial",
  "Pago completo"
];

function getAccountsReceivableStatusOrder(status = "") {
  const normalized = normalizeSearchValue(status);
  if (normalized.includes("proceso")) return 0;
  if (normalized.includes("facturacion") || normalized.includes("factura cargada")) return 1;
  // GR forma parte del flujo previo al Track ID y se mantiene junto a esa etapa.
  if (normalized.includes("gr cargada") || normalized.includes("track id cargado")) return 2;
  if (normalized.includes("comprobante de pago cargado")) return 3;
  if (normalized.includes("pago parcial")) return 4;
  if (normalized.includes("pago completo")) return 5;
  return ACCOUNTS_RECEIVABLE_STATUS_ORDER.length;
}

function compareAccountsReceivableStatuses(first, second) {
  return getAccountsReceivableStatusOrder(first) - getAccountsReceivableStatusOrder(second)
    || compareValues(first, second);
}

function isAccountsReceivableOverdue(item = {}) {
  if (isAccountsReceivableCollected(item)) return false;
  const due = toComparableDate(item.fechaPago);
  const today = toComparableDate(new Date());
  return Boolean(due && today && due < today);
}

function getAccountsReceivableFilters() {
  return {
    company: accountsReceivableFilterCompany?.value || "",
    status: accountsReceivableFilterStatus?.value || "",
    collection: accountsReceivableFilterCollection?.value || "all",
    balance: accountsReceivableFilterBalance?.value || "all",
    dateFrom: accountsReceivableFilterDateFrom?.value || "",
    dateTo: accountsReceivableFilterDateTo?.value || "",
    search: accountsReceivableSearch?.value || ""
  };
}

function accountsReceivableMatchesFilters(item = {}, filters = getAccountsReceivableFilters()) {
  if (filters.search && !objectMatchesSearch(item, filters.search)) return false;
  if (filters.company && String(item.empresa || "") !== filters.company) return false;
  if (filters.status && String(item.estado || item.pendiente || "") !== filters.status) return false;
  if (filters.collection === "pending" && isAccountsReceivableCollected(item)) return false;
  if (filters.collection === "collected" && !isAccountsReceivableCollected(item)) return false;
  if (filters.collection === "overdue" && !isAccountsReceivableOverdue(item)) return false;
  const saldoCobrar = Number(item.saldoCobrar ?? item.monto ?? 0);
  if (filters.balance === "with" && saldoCobrar <= 0.004) return false;
  if (filters.balance === "without" && saldoCobrar > 0.004) return false;
  // El periodo de CxC debe seguir la fecha del evento/estado, no la fecha
  // de creación del proyecto. Si el usuario selecciona un estado (por ejemplo
  // Track ID cargado o Pago completo), fechaEventoEstado es la fuente principal.
  // Para el filtro explícito de cobranza "Cobradas" sin estado seleccionado,
  // conservamos la fecha real de cobro como primera opción.
  const filterDate = filters.status
    ? item.fechaEventoEstado || item.updatedAt || item.createdAt || item.fecha
    : filters.collection === "collected"
      ? item.fechaCobro || item.fechaEventoEstado || item.updatedAt || item.createdAt || item.fecha
      : item.fechaEventoEstado || item.updatedAt || item.createdAt || item.fecha;
  return isWithinDateRange(filterDate, filters.dateFrom, filters.dateTo);
}

function syncAccountsReceivableFilterOptions() {
  syncFilterSelect(accountsReceivableFilterCompany, accountsReceivableCache.map((item) => item.empresa), "Todas");
  syncFilterSelect(
    accountsReceivableFilterStatus,
    accountsReceivableCache.map((item) => item.estado || item.pendiente),
    "Todos",
    compareAccountsReceivableStatuses
  );
}

function getFilteredAccountsReceivableRows() {
  const filters = getAccountsReceivableFilters();
  return { filters, rows: accountsReceivableCache.filter((item) => accountsReceivableMatchesFilters(item, filters)) };
}

function updateAccountsReceivableFilterSummary(rows = []) {
  if (!accountsReceivableFilterSummary) return;
  const pending = rows.filter((item) => !isAccountsReceivableCollected(item)).length;
  const collected = rows.length - pending;
  const withBalance = rows.filter((item) => Number(item.saldoCobrar ?? item.monto ?? 0) > 0.004).length;
  accountsReceivableFilterSummary.textContent = `${rows.length.toLocaleString("es-MX")} registros visibles · ${pending} pendientes · ${collected} cobradas · ${withBalance} con saldo`;
}

function renderAccountsReceivablePendingBatches(batches = []) {
  accountsReceivablePendingBatches = Array.isArray(batches) ? batches : [];
  if (!accountsReceivablePendingBatchesPanel || !accountsReceivablePendingBatchesRows) return;
  accountsReceivablePendingBatchesPanel.classList.toggle("hidden", accountsReceivablePendingBatches.length === 0);
  if (accountsReceivablePendingBatchesCount) accountsReceivablePendingBatchesCount.textContent = String(accountsReceivablePendingBatches.length);
  accountsReceivablePendingBatchesRows.innerHTML = accountsReceivablePendingBatches.map((batch) => `
    <article class="accounts-payable-pending-batch-card">
      <span class="accounts-payable-pending-batch-icon">COB</span>
      <span><strong>${escapeHtml(batch.folio || `Cobro general ${batch.id}`)}</strong><small>${Number(batch.itemCount || 0)} proyecto(s) · ${escapeHtml(batch.intermediario || batch.empresa || "Cliente")} · ${formatCurrency(batch.total || batch.montoCobrar || 0)}</small></span>
      <span><small>Estado</small><strong>${escapeHtml(batch.estado || "Pendiente")}</strong></span>
      <div class="accounts-payable-pending-batch-actions">
        <button class="secondary-button" type="button" data-manage-receivable-batch="${Number(batch.id)}">Gestionar cobro</button>
        ${canRegisterCollections() && normalizeSearchValue(batch.estado) === "pendiente" ? `<button class="commission-batch-cancel-button" type="button" data-cancel-receivable-batch="${Number(batch.id)}" data-batch-folio="${escapeHtml(batch.folio || `Cobro general ${batch.id}`)}">Cancelar</button>` : ""}
      </div>
    </article>`).join("");
}

function renderAccountsReceivable(data) {
  if (data?.accounts) accountsReceivableCache = data.accounts;
  if (data?.pendingBatches) renderAccountsReceivablePendingBatches(data.pendingBatches);
  if (openReceivableBatchSelectorButton) openReceivableBatchSelectorButton.classList.toggle("hidden", data?.canCreateBatches === false || !canRegisterCollections());
  ensureAlertBaseline("accountsReceivable", accountsReceivableCache, (item) => item.quoteId, shouldAlertAccountsReceivable);
  syncAccountsReceivableFilterOptions();
  const filteredData = getFilteredAccountsReceivableRows();
  updateAccountsReceivableFilterSummary(filteredData.rows);
  const rows = sortByState(filteredData.rows, accountsReceivableSort, (item, key) =>
    key === "__flagged"
      ? getRowFlagSortValue("accountsReceivable", item.quoteId)
      : key === "estado"
        ? getAccountsReceivableStatusOrder(item.estado)
        : item[key]
  );
  const pageRows = paginateRows(accountsReceivableRows, "accountsReceivable", rows, () =>
    renderAccountsReceivable({ accounts: accountsReceivableCache })
  );
  accountsReceivableRows.innerHTML = rows.length
    ? pageRows
        .map(
          (item) => `
            <article class="${getRowClasses(
              "purchase-table-row is-clickable",
              getPaymentRowClass(item),
              getAlertClass("accountsReceivable", item.quoteId, item.updatedAt, shouldAlertAccountsReceivable(item)),
              getRowFlagClass("accountsReceivable", item.quoteId)
            )}" data-accounts-receivable-quote-id="${item.quoteId}" data-alert-scope="accountsReceivable" data-alert-updated-at="${escapeHtml(item.updatedAt || "")}">
              ${renderRowFlag("accountsReceivable", item.quoteId)}
              <span>${escapeHtml(item.empresa)}</span>
              <span>${escapeHtml(item.clienteUsuario)}</span>
              <span>${escapeHtml(item.folio)}</span>
              <span>${escapeHtml(item.po || "Sin PO")}</span>
              <span>${escapeHtml(item.proyecto)}</span>
              <span>${escapeHtml(formatDate(item.fecha))}</span>
              <span>${escapeHtml(formatDate(item.updatedAt))}</span>
              <span><b class="status-pill">${escapeHtml(item.estado)}</b></span>
              <span>${escapeHtml(item.pendiente)}</span>
              <span>${displayAccountsPayableDays(item)}</span>
              <span>${escapeHtml(formatDate(item.fechaPago))}</span>
              <span>${escapeHtml(formatDate(item.fechaCobro))}</span>
              <span>${formatCurrency(item.montoOriginal ?? item.monto ?? 0)}</span>
              <span>${formatCurrency(item.monto || 0)}</span>
              <span class="${Number(item.saldoCobrar ?? item.monto ?? 0) > 0.004 ? "money-pending" : "money-settled"}">${formatCurrency(item.saldoCobrar ?? item.monto ?? 0)}</span>
            </article>
          `
        )
        .join("")
    : `<div class="purchase-table-row purchase-table-empty"><span>Sin cotizaciones aprobadas para cobrar</span></div>`;
  applyVisibleColumns(accountsReceivableTable);
}

async function loadAccountsReceivableModule() {
  accountsReceivableListView.classList.remove("hidden");
  accountsReceivableDetailView.classList.add("hidden");
  accountsReceivableBatchSelectView?.classList.add("hidden");
  accountsReceivableBatchReviewView?.classList.add("hidden");
  try {
    const data = await api("/api/accounts-receivable");
    renderAccountsReceivable(data);
    refreshNavigationBadges();
  } catch (error) {
    accountsReceivableRows.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function renderAccountsReceivableFiles(files = []) {
  return `
    <div class="budget-documents-table">
      <div class="budget-documents-head">
        <span>Tipo</span>
        <span>Nombre</span>
        <span>Fecha</span>
        <span>Acción</span>
      </div>
      ${
        files.length
          ? files
              .map(
                (file) => `
                  <div class="budget-documents-row">
                    <span>${escapeHtml(file.tipo)}</span>
                    <span>${renderFileNameLink(file)}</span>
                    <span>${escapeHtml(formatDate(file.createdAt))}</span>
                    <span>
                      ${
                        canDeletePaymentDocuments()
                          ? `<button class="small-button danger-button" type="button" data-accounts-receivable-file-delete="${file.id}">Eliminar</button>`
                          : ""
                      }
                    </span>
                  </div>
                `
              )
              .join("")
          : `<div class="budget-documents-empty">Sin archivos cargados</div>`
      }
    </div>
  `;
}

function renderAccountsReceivableDetail(data) {
  const account = data.account || {};
  const quote = data.quote || {};
  const files = data.files || [];
  const supportDocuments = data.supportDocuments || [];
  const billingSummary = data.billingSummary || { total: Number(account.monto || 0), billed: 0, remaining: Number(account.monto || 0), movements: [] };
  const billingMovements = data.billingMovements || billingSummary.movements || [];
  const billingTotal = Number(billingSummary.total || account.monto || 0);
  const billingRemaining = Number(billingSummary.remaining || 0);
  const defaultBillingPercent = billingTotal > 0 ? Math.min(100, Math.max(0, (billingRemaining / billingTotal) * 100)) : 0;
  const quoteRows = quote.items || [];
  const hasInvoiceFile = files.some((file) => String(file.tipo || "").toLowerCase() === "factura");
  const normalizedPending = normalizeSearchValue(account.pendiente || "");
  const isPendingInvoice = normalizedPending === "crear factura" || normalizedPending === "para facturar";
  const canToggleInvoice = !hasInvoiceFile;
  const fileOptions = (data.fileTypes || ["Factura", "Comprobante de pago", "Complemento de pago"])
    .map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`)
    .join("");

  accountsReceivableDetailContent.innerHTML = `
    <div class="module-toolbar accounts-receivable-detail-toolbar">
      <h3>Cuentas por cobrar</h3>
      ${Number(billingSummary.remaining || 0) > 0.004
        ? `<button class="success-button" type="button" data-accounts-receivable-bill="send">Solicitar factura</button>`
        : `<button class="success-button" type="button" disabled>Total solicitado</button>`}
    </div>
    <section class="budget-detail-card">
      <div class="budget-detail-grid">
        <label><span>Empresa</span><input value="${escapeHtml(account.empresa || "")}" readonly /></label>
        <label><span>Cliente/Usuario</span><input value="${escapeHtml(account.clienteUsuario || "")}" readonly /></label>
        <label><span>Folio</span><input value="${escapeHtml(account.folio || "")}" readonly /></label>
        <label><span>PO</span><input value="${escapeHtml(account.po || "Sin PO")}" readonly /></label>
        <label class="wide-field"><span>Proyecto</span><input value="${escapeHtml(account.proyecto || "")}" readonly /></label>
        <label><span>Cotización</span><input value="${escapeHtml(account.quoteFolio || "")}" readonly /></label>
        <label><span>Estado</span><input value="${escapeHtml(account.estado || "")}" readonly /></label>
        <label><span>Pendiente</span><input value="${escapeHtml(account.pendiente || "")}" readonly /></label>
        <label><span>Días de pago</span><input value="${Number(account.diasPago || 0)}" readonly /></label>
        <label><span>Fecha para pago</span><input value="${escapeHtml(formatDate(account.fechaPago))}" readonly /></label>
        <label><span>Monto original</span><input value="${formatCurrency(account.montoOriginal ?? billingTotal)}" readonly /></label>
        <label><span>Monto a cobrar</span><input value="${formatCurrency(billingTotal)}" readonly /></label>
        ${account.cobroAgrupado ? `<label><span>Cobro general</span><input value="${escapeHtml(account.cobroAgrupado.folio || "")}" readonly /></label><label><span>Pagador / intermediario</span><input value="${escapeHtml(account.cobroAgrupado.intermediario || account.empresa || "")}" readonly /></label><label><span>Descuento aplicado</span><input value="${Number(account.porcentajeDescuentoCobranza || 0).toFixed(2)}% · ${formatCurrency(account.descuentoCobranza || 0)}" readonly /></label>` : ""}
      </div>
    </section>

    ${account.cobroAgrupado ? `<section class="commission-batch-linked"><div><span>Cobro agrupado</span><strong>${escapeHtml(account.cobroAgrupado.folio || `Cobro ${account.cobroAgrupado.id}`)}</strong><small>Esta cuenta forma parte de un cobro consolidado por ${formatCurrency(account.cobroAgrupado.total || 0)}${account.cobroAgrupado.referenciaExterna ? ` · ${escapeHtml(account.cobroAgrupado.referenciaExterna)}` : ""}.</small></div><a class="primary-button" href="/api/accounts-receivable-batches/${Number(account.cobroAgrupado.id)}/preview" target="_blank" rel="opener">Ver cobro general</a></section>` : ""}

    <section class="client-quote-module accounts-receivable-billing">
      <h3>Parcialidades de facturación</h3>
      <div class="budget-detail-grid">
        <label><span>Total del proyecto</span><input value="${formatCurrency(billingSummary.total || account.monto || 0)}" readonly /></label>
        <label><span>Solicitado a facturar</span><input value="${formatCurrency(billingSummary.billed || 0)}" readonly /></label>
        <label><span>Saldo por facturar</span><input value="${formatCurrency(billingSummary.remaining || 0)}" readonly /></label>
      </div>
      ${billingRemaining > 0.004 ? `
        <form class="accounts-receivable-partiality-form" id="accountsReceivableBillingForm" data-billing-total="${billingTotal}" data-billing-remaining="${billingRemaining}">
          <label>
            <span>Monto de parcialidad</span>
            <input class="budget-money-input" name="monto" inputmode="decimal" value="${formatCurrency(billingRemaining)}" autocomplete="off" required />
            <small>Importe máximo disponible: ${formatCurrency(billingRemaining)}</small>
          </label>
          <label>
            <span>% del proyecto</span>
            <div class="percentage-input-shell"><input name="porcentaje" type="number" min="0.01" max="100" step="0.01" value="${defaultBillingPercent.toFixed(2)}" autocomplete="off" /><b>%</b></div>
            <small>Calculado sobre ${formatCurrency(billingTotal)}</small>
          </label>
          <label class="wide-field"><span>Observaciones</span><input name="observaciones" maxlength="500" placeholder="Opcional" /></label>
          <div class="accounts-receivable-partiality-preview">
            <span>Saldo después de esta parcialidad</span>
            <strong data-billing-after>${formatCurrency(Math.max(0, billingRemaining - billingRemaining))}</strong>
          </div>
          <button class="success-button accounts-receivable-partiality-button" type="button" data-accounts-receivable-add-partial>Registrar parcialidad</button>
        </form>` : ""}
      <div class="budget-documents-table accounts-receivable-billing-table">
        <div class="budget-documents-head">
          <span>Monto</span><span>%</span><span>Estado</span><span>Observaciones</span><span>Saldo anterior</span><span>Saldo posterior</span><span>Fecha</span><span>Acción</span>
        </div>
        ${billingMovements.length ? billingMovements.map((movement) => `
          <div class="budget-documents-row">
            <span>${formatCurrency(movement.monto || 0)}</span>
            <span>${billingTotal > 0 ? `${((Number(movement.monto || 0) / billingTotal) * 100).toFixed(2)}%` : "0.00%"}</span>
            <span><b class="status-pill">${escapeHtml(movement.estado || "")}</b></span>
            <span>${escapeHtml(movement.observaciones || "—")}</span>
            <span>${formatCurrency(movement.saldoAnterior ?? 0)}</span>
            <span>${formatCurrency(movement.saldoPosterior ?? 0)}</span>
            <span>${escapeHtml(formatDate(movement.createdAt))}</span>
            <span>${normalizeSearchValue(movement.estado) === "solicitada" ? `<button class="small-button danger-button" type="button" data-accounts-receivable-billing-cancel="${movement.id}">Cancelar</button>` : ""}</span>
          </div>`).join("") : `<div class="budget-documents-empty">Sin parcialidades registradas.</div>`}
      </div>
    </section>

    <section class="client-quote-module accounts-receivable-quote">
      <h3>Datos de la cotización</h3>
      <div class="purchase-table accounts-quote-table">
        <div class="purchase-table-head">
          <span>Cantidad</span>
          <span>U.M.</span>
          <span>Descripción</span>
          <span>Precio</span>
          <span>Subtotal</span>
        </div>
        ${
          quoteRows.length
            ? quoteRows
                .map(
                  (row) => `
                    <article class="purchase-table-row">
                      <span>${Number(row.cantidad || 0).toFixed(2)}</span>
                      <span>${escapeHtml(row.unidadMedida || "")}</span>
                      <span>${escapeHtml(row.descripcion || "")}</span>
                      <span>${formatCurrency(row.precio || 0)}</span>
                      <span>${formatCurrency(row.subtotal || 0)}</span>
                    </article>
                  `
                )
                .join("")
            : `<div class="purchase-table-row purchase-table-empty"><span>Sin partidas en la cotización</span></div>`
        }
      </div>
      <div class="client-quote-total-row">
        <div></div>
        <div class="client-quote-total">Monto sin IVA: <strong>${formatCurrency(account.monto || 0)}</strong></div>
      </div>
    </section>

    ${renderAccountsPayableSupportDocuments(supportDocuments, "PO y cotización cliente")}

    <section class="client-quote-module accounts-receivable-files">
      <h3>Archivos de cobranza</h3>
      <form class="accounts-receivable-upload-form" id="accountsReceivableUploadForm">
        <label>
          <span>Tipo de archivo</span>
          <select name="tipo">${fileOptions}</select>
        </label>
        <label class="wide-field">
          <span>Archivo</span>
          <input name="archivo" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.xml,.xlsx,.xls" />
        </label>
        <button class="success-button" type="submit">Cargar archivo</button>
      </form>
      <div id="accountsReceivableFilesList">
        ${renderAccountsReceivableFiles(files)}
      </div>
    </section>
  `;
}

async function openAccountsReceivableDetail(quoteId, options = {}) {
  if (options.persist !== false) saveDetailLocation("cuentas-cobrar", "detail", quoteId);
  activeAccountsReceivableQuoteId = quoteId;
  accountsReceivableListView.classList.add("hidden");
  accountsReceivableDetailView.classList.remove("hidden");
  accountsReceivableDetailContent.innerHTML = `<div class="empty-state">Cargando cuenta por cobrar...</div>`;

  try {
    const data = await api(`/api/accounts-receivable/${quoteId}`);
    renderAccountsReceivableDetail(data);
  } catch (error) {
    accountsReceivableDetailContent.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function closeAccountsReceivableDetail() {
  activeAccountsReceivableQuoteId = null;
  saveModuleLocation("cuentas-cobrar");
  accountsReceivableDetailView.classList.add("hidden");
  accountsReceivableListView.classList.remove("hidden");
  loadAccountsReceivableModule();
}

function getSelectedReceivableBatchCandidates() {
  return receivableBatchCandidates.filter((item) => receivableBatchSelectedIds.has(Number(item.quoteId)));
}

function getVisibleReceivableBatchCandidates() {
  const company = normalizeSearchValue(receivableBatchCompanyFilter?.value || "");
  const po = normalizeSearchValue(receivableBatchPoFilter?.value || "");
  const project = normalizeSearchValue(receivableBatchProjectFilter?.value || "");
  const availability = receivableBatchAvailabilityFilter?.value || "all";
  return receivableBatchCandidates.filter((item) => {
    if (company && !normalizeSearchValue(item.empresa || "").includes(company)) return false;
    if (po && !normalizeSearchValue(item.po || "").includes(po)) return false;
    if (project && !normalizeSearchValue(`${item.proyecto || ""} ${item.folio || ""} ${item.quoteFolio || ""} ${item.clienteUsuario || ""}`).includes(project)) return false;
    if (availability === "available" && item.existingBatch?.id) return false;
    if (availability === "grouped" && !item.existingBatch?.id) return false;
    return true;
  });
}

function getSelectableVisibleReceivableBatchCandidates() {
  return getVisibleReceivableBatchCandidates().filter((item) => !item.existingBatch?.id);
}

function getReceivableBatchPreviewTotal(selected = getSelectedReceivableBatchCandidates()) {
  const original = selected.reduce((sum, item) => sum + Number(item.saldoCobrar || 0), 0);
  const percentage = Math.min(99.99, Math.max(0, Number(receivableBatchDiscount?.value || 0)));
  const authorized = Number(receivableBatchAuthorizedTotal?.value || 0);
  return {
    original,
    percentage,
    net: authorized > 0 ? authorized : original * (1 - percentage / 100)
  };
}

function updateReceivableBatchSelectionSummary() {
  const selected = getSelectedReceivableBatchCandidates();
  const totals = getReceivableBatchPreviewTotal(selected);
  if (receivableBatchSelectionSummary) receivableBatchSelectionSummary.textContent = `${selected.length} seleccionada${selected.length === 1 ? "" : "s"} · ${formatCurrency(totals.net)}`;
  if (receivableBatchSelectionHint) receivableBatchSelectionHint.textContent = selected.length > 1
    ? `${selected.length} cobros · Original ${formatCurrency(totals.original)} · A cobrar ${formatCurrency(totals.net)}`
    : "Selecciona al menos dos cuentas del mismo cliente.";
  if (receivableBatchContinueButton) receivableBatchContinueButton.disabled = selected.length < 2;
  const visible = getSelectableVisibleReceivableBatchCandidates();
  const allSelected = visible.length > 0 && visible.every((item) => receivableBatchSelectedIds.has(Number(item.quoteId)));
  if (receivableBatchSelectVisibleButton) receivableBatchSelectVisibleButton.textContent = allSelected ? "Quitar visibles" : "Seleccionar visibles";
}

function renderReceivableBatchExistingBatches() {
  if (!receivableBatchExistingPanel || !receivableBatchExistingRows) return;
  const batches = receivableBatchExistingBatches.filter((batch) => Number(batch.id || 0) > 0);
  receivableBatchExistingPanel.classList.toggle("hidden", batches.length === 0);
  if (receivableBatchExistingCount) receivableBatchExistingCount.textContent = String(batches.length);
  receivableBatchExistingRows.innerHTML = batches.map((batch) => `
    <article class="commission-batch-existing-card">
      <span class="commission-batch-existing-icon">COB</span>
      <span><strong>${escapeHtml(batch.folio || `Cobro general ${batch.id}`)}</strong><small>${Number(batch.itemCount || 0)} proyecto(s) · ${formatCurrency(batch.total || 0)}</small></span>
      <span class="commission-batch-existing-status">${escapeHtml(batch.estado || "Pendiente")}</span>
      <button class="commission-batch-existing-button" type="button" data-open-receivable-batch="${Number(batch.id)}">Gestionar cobro</button>
      ${canRegisterCollections() && normalizeSearchValue(batch.estado) === "pendiente" ? `<button class="commission-batch-cancel-button" type="button" data-cancel-receivable-batch="${Number(batch.id)}" data-batch-folio="${escapeHtml(batch.folio || `Cobro general ${batch.id}`)}">Cancelar</button>` : ""}
    </article>`).join("");
}

function renderReceivableBatchCandidates() {
  if (!receivableBatchCandidateRows) return;
  const visible = getVisibleReceivableBatchCandidates();
  const availableCount = visible.filter((item) => !item.existingBatch?.id).length;
  const groupedCount = visible.length - availableCount;
  if (receivableBatchFilterSummary) {
    receivableBatchFilterSummary.textContent = `${visible.length} visible${visible.length === 1 ? "" : "s"} · ${availableCount} disponible${availableCount === 1 ? "" : "s"} · ${groupedCount} ya agrupada${groupedCount === 1 ? "" : "s"}`;
  }
  receivableBatchCandidateRows.innerHTML = visible.length ? visible.map((item) => {
    const linked = item.existingBatch || null;
    const content = `<span class="commission-batch-person"><strong>${escapeHtml(item.empresa || "Sin empresa")}</strong><small>${escapeHtml(item.quoteFolio || "Sin cotización")} · ${escapeHtml(item.po || "Sin PO")}</small></span><span><small>Proyecto</small><strong>${escapeHtml(item.proyecto || item.folio || "Sin proyecto")}</strong></span><span><small>Folio</small><strong>${escapeHtml(item.folio || "Sin folio")}</strong></span><span class="commission-batch-money"><small>Saldo a cobrar</small><strong>${formatCurrency(item.saldoCobrar || 0)}</strong></span>`;
    if (linked?.id) return `<article class="commission-batch-candidate is-linked"><span class="commission-batch-linked-icon">✓</span>${content}<span class="commission-batch-linked-action"><small>Incluido en ${escapeHtml(linked.folio || "otro cobro general")}</small><button class="commission-batch-existing-button" type="button" data-open-receivable-batch="${Number(linked.id)}">Gestionar cobro</button></span></article>`;
    return `<label class="commission-batch-candidate ${receivableBatchSelectedIds.has(Number(item.quoteId)) ? "is-selected" : ""}"><input type="checkbox" data-receivable-batch-quote="${Number(item.quoteId)}" ${receivableBatchSelectedIds.has(Number(item.quoteId)) ? "checked" : ""}/>${content}</label>`;
  }).join("") : `<div class="empty-state">No hay cuentas pendientes con esos filtros.</div>`;
  updateReceivableBatchSelectionSummary();
}

function syncReceivableBatchCompanyOptions() {
  if (!receivableBatchCompanyOptions) return;
  const companies = [...new Set(receivableBatchCandidates.map((item) => item.empresa).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
  receivableBatchCompanyOptions.innerHTML = companies.map((company) => `<option value="${escapeHtml(company)}"></option>`).join("");
}

function syncReceivableBatchPoOptions() {
  if (!receivableBatchPoOptions) return;
  const purchaseOrders = [...new Set(receivableBatchCandidates.map((item) => String(item.po || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
  receivableBatchPoOptions.innerHTML = purchaseOrders.map((po) => `<option value="${escapeHtml(po)}"></option>`).join("");
}

async function loadReceivableBatchCandidates() {
  if (receivableBatchCandidateRows) receivableBatchCandidateRows.innerHTML = `<div class="empty-state">Cargando cuentas pendientes...</div>`;
  try {
    const data = await api("/api/accounts-receivable-batches/candidates", { toast: false });
    receivableBatchCandidates = data.candidates || [];
    receivableBatchExistingBatches = data.existingBatches || [];
    const available = new Set(receivableBatchCandidates.filter((item) => !item.existingBatch?.id).map((item) => Number(item.quoteId)));
    receivableBatchSelectedIds = new Set([...receivableBatchSelectedIds].filter((id) => available.has(Number(id))));
    syncReceivableBatchCompanyOptions();
    syncReceivableBatchPoOptions();
    renderReceivableBatchExistingBatches();
    renderReceivableBatchCandidates();
  } catch (error) {
    receivableBatchCandidates = [];
    receivableBatchExistingBatches = [];
    renderReceivableBatchExistingBatches();
    if (receivableBatchCandidateRows) receivableBatchCandidateRows.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

async function openReceivableBatchSelector() {
  accountsReceivableListView?.classList.add("hidden");
  accountsReceivableDetailView?.classList.add("hidden");
  accountsReceivableBatchReviewView?.classList.add("hidden");
  accountsReceivableBatchSelectView?.classList.remove("hidden");
  receivableBatchSelectedIds = new Set();
  receivableBatchActive = null;
  receivableBatchOpenedFromMain = false;
  receivableBatchGeneralProofFiles = [];
  receivableBatchProofFilesByItem = new Map();
  if (receivableBatchCompanyFilter) receivableBatchCompanyFilter.value = "";
  if (receivableBatchPoFilter) receivableBatchPoFilter.value = "";
  if (receivableBatchProjectFilter) receivableBatchProjectFilter.value = "";
  if (receivableBatchAvailabilityFilter) receivableBatchAvailabilityFilter.value = "all";
  if (receivableBatchIntermediary) receivableBatchIntermediary.value = "";
  if (receivableBatchReference) receivableBatchReference.value = "";
  if (receivableBatchDiscount) receivableBatchDiscount.value = "0";
  if (receivableBatchAuthorizedTotal) receivableBatchAuthorizedTotal.value = "";
  receivableBatchProofPanel?.classList.add("hidden");
  receivableBatchDoneButton?.classList.add("hidden");
  await loadReceivableBatchCandidates();
}

function mapReceivableBatchItemsToCandidates(batch = {}) {
  return (batch.items || []).map((item) => ({
    ...item,
    empresa: batch.empresa || "",
    clienteUsuario: batch.intermediario || "",
    saldoCobrar: Number(item.montoCobrar || 0),
    existingBatch: { id: Number(batch.id), folio: batch.folio, estado: batch.estado, total: Number(batch.montoCobrar || 0) }
  }));
}

function renderReceivableBatchReview(batch = receivableBatchActive) {
  if (!batch || !receivableBatchReviewContent) return;
  const batchState = normalizeSearchValue(batch.estado);
  const completed = batchState === "completado";
  // "Cobrado" se conserva como compatibilidad con lotes creados antes de
  // separar el pago recibido del cierre documental.
  const awaitingComplement = batchState === "pendiente complemento" || batchState === "cobrado";
  const partial = batchState === "parcial";
  // También mostramos documentos creados por la versión anterior, que podía
  // guardarlos contra un item concreto. Cancelación valida todos los archivos
  // del lote; ocultarlos aquí dejaba el lote bloqueado sin forma de borrarlos.
  const batchFiles = Array.isArray(batch.files) ? batch.files : [];
  const batchItemsById = new Map((batch.items || []).map((item) => [Number(item.id), item]));
  if (receivableBatchReviewEyebrow) receivableBatchReviewEyebrow.textContent = completed
    ? "Cobro consolidado completado"
    : awaitingComplement ? "Pago recibido · documentación pendiente"
      : partial ? "Cobro consolidado parcial" : "Cotización consolidada";
  if (receivableBatchReviewTitle) receivableBatchReviewTitle.textContent = completed
    ? "Cobranza completada"
    : awaitingComplement ? "Falta cargar el complemento de pago" : "Cotización y cobranza consolidada";
  if (receivableBatchReviewDescription) receivableBatchReviewDescription.textContent = completed
    ? "El pago y el complemento quedaron ligados a todos los proyectos del cobro consolidado."
    : awaitingComplement
      ? "El pago ya fue registrado. Carga aquí un solo complemento general para completar todos los proyectos."
      : "Revisa las partidas, carga una sola documentación para todos los proyectos y registra el cobro mediante su comprobante.";
  const projectSections = (batch.items || []).map((item) => {
    const parts = item.partidas?.length ? item.partidas : [{ cantidad: 1, unidadMedida: "P", descripcion: item.proyecto || "Proyecto", precio: item.montoOriginal, subtotal: item.montoOriginal }];
    return `<article class="receivable-consolidated-project">
      <header><span><strong>${escapeHtml(item.folio || item.quoteFolio || "Proyecto")}</strong><small>${escapeHtml(item.proyecto || "Sin proyecto")} · ${escapeHtml(item.po || "Sin PO")}</small></span><span><small>Original</small><strong>${formatCurrency(item.montoOriginal || 0)}</strong></span><span><small>Neto</small><strong>${formatCurrency(item.montoCobrar || 0)}</strong></span></header>
      <div class="receivable-consolidated-parts"><div class="is-head"><span>Folio / serie</span><span>Cant.</span><span>U.M.</span><span>Descripción</span><span>Precio</span><span>Subtotal</span></div>${parts.map((part) => `<div><span>${escapeHtml(item.quoteFolio || item.folio || "—")}</span><span>${Number(part.cantidad || 0).toFixed(2)}</span><span>${escapeHtml(part.unidadMedida || "")}</span><span>${escapeHtml(part.descripcion || "Sin descripción")}</span><span>${formatCurrency(part.precio || 0)}</span><span>${formatCurrency(part.subtotal || 0)}</span></div>`).join("")}</div>
    </article>`;
  }).join("");
  const batchFilesSection = batchFiles.length ? `<section class="budget-detail-card receivable-batch-files-card"><div class="receivable-batch-files-heading"><div><h3>Documentos del cobro</h3><p class="receivable-general-files-help">Aquí aparecen los documentos generales y cualquier archivo heredado ligado a un proyecto. Elimínalos antes de cancelar el cobro.</p></div><strong>${batchFiles.length}</strong></div><div class="budget-documents-table"><div class="budget-documents-head"><span>Tipo / alcance</span><span>Nombre</span><span>Fecha</span><span>Acciones</span></div>${batchFiles.map((file) => {
    const linkedItem = file.itemId ? batchItemsById.get(Number(file.itemId)) : null;
    const scope = linkedItem ? `Proyecto ${linkedItem.folio || linkedItem.quoteFolio || linkedItem.proyecto || file.itemId}` : "Todos los proyectos";
    return `<div class="budget-documents-row"><span><strong>${escapeHtml(file.tipo || "Comprobante de pago")}</strong><small>${escapeHtml(scope)}</small></span><span>${escapeHtml(file.nombre || "Archivo")}</span><span>${escapeHtml(formatDate(file.createdAt))}</span><span class="receivable-general-file-actions"><a class="small-button" href="${escapeHtml(file.url || "#")}" target="_blank" rel="noreferrer">Abrir</a><a class="small-button" href="${escapeHtml(file.downloadUrl || file.url || "#")}">Descargar</a>${canRegisterCollections() ? `<button class="danger-button" type="button" data-delete-receivable-batch-file="${Number(file.id)}" data-file-name="${escapeHtml(file.nombre || "Archivo")}">Eliminar</button>` : ""}</span></div>`;
  }).join("")}</div></section>` : "";
  receivableBatchReviewContent.innerHTML = `
    <section class="commission-batch-file-ready">
      <span class="commission-batch-file-icon">COB</span>
      <div><strong>${escapeHtml(batch.folio || "Cobro general")}</strong><small>${batch.items?.length || 0} proyectos · ${escapeHtml(batch.empresa || "")} · ${escapeHtml(batch.intermediario || batch.empresa || "")} · ${escapeHtml(batch.referenciaExterna || "Sin referencia")}</small></div>
      <div class="commission-batch-file-actions"><a class="commission-batch-open-button" href="${escapeHtml(batch.previewUrl || `/api/accounts-receivable-batches/${Number(batch.id)}/preview`)}" target="_blank" rel="opener"><span class="commission-batch-open-button-icon">↗</span><span><strong>Abrir cotización</strong><small>Vista consolidada y PDF</small></span></a><a class="secondary-button" href="${escapeHtml(batch.pdfUrl || `/api/accounts-receivable-batches/${Number(batch.id)}/pdf`)}?download=1">Descargar PDF</a>${batchState === "pendiente" && canRegisterCollections() ? `<button class="commission-batch-cancel-button" type="button" data-cancel-receivable-batch="${Number(batch.id)}" data-batch-folio="${escapeHtml(batch.folio || "Cobro general")}">Cancelar cobro</button>` : ""}</div>
    </section>
    ${completed ? `<section class="commission-batch-paid-notice"><span>✓</span><div><strong>Cobro y documentación completados</strong><small>El comprobante y el complemento quedaron ligados a todas las cuentas.</small></div><a class="secondary-button" href="${escapeHtml(batch.pdfUrl || `/api/accounts-receivable-batches/${Number(batch.id)}/pdf`)}" target="_blank">Abrir PDF</a></section>` : awaitingComplement ? `<section class="commission-batch-paid-notice is-partial"><span>!</span><div><strong>Pago recibido · falta el complemento</strong><small>Selecciona “Complemento de pago” arriba y cárgalo una sola vez para todos los proyectos.</small></div></section>` : partial ? `<section class="commission-batch-paid-notice is-partial"><span>◐</span><div><strong>Pago parcial registrado</strong><small>Adjunta el siguiente comprobante cuando se reciba el saldo restante.</small></div></section>` : ""}
    ${batchFilesSection}
    <section class="commission-batch-general-order"><header class="commission-batch-general-header"><div><span class="commission-batch-general-brand">DALVO</span><strong>${escapeHtml(batch.folio || "")}</strong><small>${batch.items?.length || 0} proyectos · Cotización consolidada</small></div><div><small>Monto original</small><strong>${formatCurrency(batch.montoOriginal || 0)}</strong><small>Descuento ${Number(batch.porcentajeDescuento || 0).toFixed(2)}%</small><strong>${formatCurrency(batch.descuentoMonto || 0)}</strong></div></header>${projectSections}<footer class="receivable-consolidated-totals"><span>Monto original <strong>${formatCurrency(batch.montoOriginal || 0)}</strong></span><span>Descuento <strong>− ${formatCurrency(batch.descuentoMonto || 0)}</strong></span><span>Subtotal neto <strong>${formatCurrency(batch.montoCobrar || 0)}</strong></span><span>IVA 16% <strong>${formatCurrency(batch.iva || 0)}</strong></span><span class="grand">Total con IVA <strong>${formatCurrency(batch.totalConIva || 0)}</strong></span></footer></section>
    `;
  if (receivableBatchReviewSummary) receivableBatchReviewSummary.textContent = `${batch.items?.length || 0} proyectos · Neto ${formatCurrency(batch.montoCobrar || 0)} · IVA ${formatCurrency(batch.iva || 0)} · Total ${formatCurrency(batch.totalConIva || 0)} · ${completed ? "Completado" : awaitingComplement ? "Pago recibido; falta complemento" : partial ? "Parcial" : "Pendiente"}`;
  receivableBatchProofPanel?.classList.toggle("hidden", !canRegisterCollections());
  receivableBatchDoneButton?.classList.toggle("hidden", !completed);
  if (receivableBatchUploadProofButton) receivableBatchUploadProofButton.classList.toggle("hidden", !canRegisterCollections());
  if (awaitingComplement && receivableBatchGeneralFileType) receivableBatchGeneralFileType.value = "Complemento de pago";
  const status = document.getElementById("receivableBatchGeneralProofStatus");
  if (status) status.textContent = receivableBatchGeneralProofFiles.length ? receivableBatchGeneralProofFiles.map((file) => file.name).join(" · ") : "Ningún archivo seleccionado";
}

async function createReceivableBatchDraft() {
  const selected = getSelectedReceivableBatchCandidates();
  if (selected.length < 2) return;
  const companies = new Set(selected.map((item) => normalizeSearchValue(item.empresa || "")));
  if (companies.size !== 1) {
    showErrorToast(new Error("Selecciona proyectos de una sola empresa."), "No se pueden mezclar clientes en el mismo cobro.", "Selección inválida");
    return;
  }
  accountsReceivableBatchSelectView?.classList.add("hidden");
  accountsReceivableBatchReviewView?.classList.remove("hidden");
  if (receivableBatchReviewContent) receivableBatchReviewContent.innerHTML = `<div class="empty-state">Creando el cobro general...</div>`;
  try {
    const data = await api("/api/accounts-receivable-batches/drafts", { method: "POST", toast: false, body: JSON.stringify({
      quoteIds: selected.map((item) => Number(item.quoteId)),
      percentage: Number(receivableBatchDiscount?.value || 0),
      authorizedTotal: receivableBatchAuthorizedTotal?.value || null,
      intermediary: receivableBatchIntermediary?.value || "",
      externalReference: receivableBatchReference?.value || ""
    }) });
    receivableBatchActive = data.batch;
    receivableBatchCandidates = mapReceivableBatchItemsToCandidates(data.batch);
    receivableBatchSelectedIds = new Set(receivableBatchCandidates.map((item) => Number(item.quoteId)));
    renderReceivableBatchReview();
    showSuccessToast("El cobro general fue creado. Ábrelo para revisarlo y registrar el cobro.", "Cobro listo");
  } catch (error) {
    accountsReceivableBatchReviewView?.classList.add("hidden");
    accountsReceivableBatchSelectView?.classList.remove("hidden");
    showErrorToast(error, "No se pudo crear el cobro general.", "Error al crear");
  }
}

async function openExistingReceivableBatch(batchId, options = {}) {
  const id = Number(batchId || 0);
  if (!id) return;
  receivableBatchOpenedFromMain = Boolean(options.fromMain);
  accountsReceivableListView?.classList.add("hidden");
  accountsReceivableBatchSelectView?.classList.add("hidden");
  accountsReceivableBatchReviewView?.classList.remove("hidden");
  if (receivableBatchReviewContent) receivableBatchReviewContent.innerHTML = `<div class="empty-state">Cargando el cobro general...</div>`;
  try {
    const data = await api(`/api/accounts-receivable-batches/${id}`, { toast: false });
    receivableBatchActive = data.batch;
    receivableBatchCandidates = mapReceivableBatchItemsToCandidates(data.batch);
    receivableBatchSelectedIds = new Set(receivableBatchCandidates.map((item) => Number(item.quoteId)));
    receivableBatchGeneralProofFiles = [];
    receivableBatchProofFilesByItem = new Map();
    renderReceivableBatchReview();
  } catch (error) {
    accountsReceivableBatchReviewView?.classList.add("hidden");
    if (receivableBatchOpenedFromMain) accountsReceivableListView?.classList.remove("hidden");
    else accountsReceivableBatchSelectView?.classList.remove("hidden");
    showErrorToast(error, "No se pudo cargar el cobro general.", "Error al abrir");
  }
}

async function cancelReceivableBatch(batchId, folio = "Cobro general") {
  const id = Number(batchId || 0);
  if (!id || !confirm(`¿Cancelar ${folio}?\n\nLas cuentas volverán a estar disponibles para seleccionar.`)) return;
  try {
    await api(`/api/accounts-receivable-batches/${id}`, { method: "DELETE", toast: false });
    receivableBatchActive = null;
    receivableBatchSelectedIds.clear();
    if (receivableBatchOpenedFromMain) await loadAccountsReceivableModule();
    else {
      accountsReceivableBatchReviewView?.classList.add("hidden");
      accountsReceivableBatchSelectView?.classList.remove("hidden");
      await loadReceivableBatchCandidates();
    }
    showSuccessToast("El cobro general pendiente fue cancelado.", "Cobro cancelado");
  } catch (error) { showErrorToast(error, "No se pudo cancelar el cobro general.", "Error al cancelar"); }
}

async function deleteReceivableBatchFile(fileId, fileName = "el documento") {
  const id = Number(fileId || 0);
  if (!id) return;
  const warning = `¿Eliminar ${fileName}?\n\nSe quitará del cobro consolidado y de las cuentas vinculadas a este documento. Si es un comprobante, también se revertirá el pago que generó.`;
  if (!confirm(warning)) return;
  try {
    const data = await api(`/api/accounts-receivable-batch-files/${id}`, { method: "DELETE", toast: false });
    receivableBatchActive = data.batch || receivableBatchActive;
    renderReceivableBatchReview();
    showSuccessToast(data.message || "El documento general fue eliminado.", "Documento eliminado");
  } catch (error) {
    showErrorToast(error, "No se pudo eliminar el documento general.", "Error al eliminar");
  }
}

async function uploadReceivableBatchFiles(files, itemId = null, type = "Comprobante de pago") {
  if (!receivableBatchActive?.id || !files?.length) return;
  const form = new FormData();
  form.append("tipo", type);
  if (itemId) form.append("itemId", String(itemId));
  files.forEach((file) => form.append("archivo", file, file.name));
  const response = await fetch(`/api/accounts-receivable-batches/${Number(receivableBatchActive.id)}/files`, { method: "POST", credentials: "same-origin", body: form });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "No se pudieron guardar los comprobantes.");
  receivableBatchActive = data.batch || receivableBatchActive;
}

async function saveReceivableBatchProofFiles() {
  const hasIndividual = [...receivableBatchProofFilesByItem.values()].some((files) => files.length);
  if (!receivableBatchGeneralProofFiles.length && !hasIndividual) {
    showErrorToast(new Error("Selecciona al menos un documento."), "No hay archivos para guardar.", "Documentación");
    return;
  }
  const original = receivableBatchUploadProofButton?.textContent || "Guardar documento general";
  if (receivableBatchUploadProofButton) { receivableBatchUploadProofButton.disabled = true; receivableBatchUploadProofButton.textContent = "Guardando documentación..."; }
  try {
    const generalType = receivableBatchGeneralFileType?.value || "Comprobante de pago";
    if (receivableBatchGeneralProofFiles.length) await uploadReceivableBatchFiles(receivableBatchGeneralProofFiles, null, generalType);
    for (const [itemId, files] of receivableBatchProofFilesByItem.entries()) if (files.length) await uploadReceivableBatchFiles(files, itemId, generalType);
    receivableBatchGeneralProofFiles = [];
    receivableBatchProofFilesByItem = new Map();
    if (receivableBatchGeneralProofInput) receivableBatchGeneralProofInput.value = "";
    renderReceivableBatchReview();
    showSuccessToast(
      generalType === "Comprobante de pago"
        ? "El pago quedó registrado. El lote seguirá pendiente hasta cargar el complemento."
        : generalType === "Complemento de pago"
          ? "El complemento quedó ligado a todos los proyectos y el cobro fue completado."
          : `${generalType} quedó ligado a todos los proyectos.`,
      "Documento guardado"
    );
  } catch (error) { showErrorToast(error, "No se pudo guardar la documentación general.", "Error al adjuntar"); }
  finally { if (receivableBatchUploadProofButton) { receivableBatchUploadProofButton.disabled = false; receivableBatchUploadProofButton.textContent = original; } }
}

function isAccountsPayablePaid(item) {
  return Boolean(item?.pagado);
}

function getAccountsPayableDocumentPresentation(item = {}) {
  const rawStatus = String(item.estatusDocumentacion || "").trim();
  const normalized = normalizeSearchValue(rawStatus);
  if (!rawStatus) return { label: "Documentación pendiente", tone: "warning" };
  if (normalized.includes("completa")) return { label: "Documentación completa", tone: "success" };
  if (normalized.includes("factura")) return { label: "Factura pendiente", tone: "warning" };
  if (normalized.includes("comprobante")) return { label: "Comprobante pendiente", tone: "warning" };
  if (normalized.includes("complemento")) return { label: "Complemento pendiente", tone: "warning" };
  return { label: rawStatus, tone: "warning" };
}

function getAccountsPayableSplitPresentation(item = {}) {
  const paid = Math.max(0, Number(item.totalPagado || 0));
  const remaining = Math.max(0, Number(item.saldoRestante ?? item.monto ?? 0));
  const hasPartialPayment = item.source === "OCP" && paid > 0.004 && remaining > 0.004;
  const document = getAccountsPayableDocumentPresentation(item);
  const pending = String(item.pendiente || "").trim();
  return {
    hasPartialPayment,
    paid,
    remaining,
    document,
    primaryTotal: hasPartialPayment ? paid : Number(item.montoTotal ?? item.monto ?? 0),
    primaryPaid: hasPartialPayment ? paid : Number(item.totalPagado || 0),
    primaryRemaining: hasPartialPayment ? 0 : remaining,
    primaryStatus: hasPartialPayment ? "Pago parcial registrado" : item.estatusPago || item.estatus || item.estado,
    // No sustituir el pendiente documental por un texto genérico. El backend mantiene
    // la secuencia Factura -> Comprobante -> Complemento y aquí la mostramos tal cual.
    primaryPending: pending || (document.tone === "success" ? "Sin pendientes de documentación" : document.label)
  };
}

function renderAccountsPayableMainPayButton(item = {}, source = "ocp") {
  const remaining = Math.max(0, Number(item.saldoRestante ?? item.monto ?? item.montoTotal ?? 0));
  if (!canRegisterPayments() || isAccountsPayablePaid(item) || remaining <= 0.004) return "";
  return `<button class="accounts-payable-main-pay-button" type="button" data-payable-pay data-source="${escapeHtml(source)}" data-order-id="${escapeHtml(item.orderId)}" data-remaining="${remaining}" data-requested-payment="${Math.max(0, Number(item.pagoSolicitado || 0))}">Pagar</button>`;
}

function renderAccountsPayableRows(container, rows, emptyMessage, paginationKey) {
  if (!container) return;
  ensureAlertBaseline("accountsPayable", accountsPayableCache, (item) => item.orderId, shouldAlertAccountsPayable);
  const pageRows = paginateRows(container, paginationKey, rows, () =>
    renderAccountsPayable({
      accounts: accountsPayableCache,
      ocgfAccounts: accountsPayableOcgfCache,
      commissionAccounts: accountsPayableCommissionCache
    })
  );
  container.innerHTML = rows.length
    ? pageRows
        .map((item) => {
          const split = getAccountsPayableSplitPresentation(item);
          const primaryStateClass = split.hasPartialPayment
            ? "row-state-paid accounts-payable-paid-installment"
            : getPaymentRowClass(item);
          return `
            <article class="${getRowClasses(
              "purchase-table-row is-clickable",
              primaryStateClass,
              getAlertClass("accountsPayable", item.orderId, item.updatedAt, shouldAlertAccountsPayable(item)),
              getRowFlagClass("accountsPayable", item.orderId)
            )}" data-accounts-payable-order-id="${item.orderId}" data-accounts-payable-segment="${split.hasPartialPayment ? "paid" : "account"}" data-alert-scope="accountsPayable" data-alert-updated-at="${escapeHtml(item.updatedAt || "")}">
              ${renderRowFlag("accountsPayable", item.orderId)}
              <span>${escapeHtml(item.sucursal)}</span>
              <span>${escapeHtml(item.proveedor)}</span>
              <span>${escapeHtml(item.folio || item.dlv)}</span>
              <span>${escapeHtml(item.ocp)}</span>
              <span>${escapeHtml(item.po || "Sin PO")}</span>
              <span>${escapeHtml(item.cliente)}</span>
              <span>${escapeHtml(item.proyecto || "Sin proyecto")}</span>
              <span class="accounts-payable-status-stack">
                <b class="status-pill ${split.hasPartialPayment ? "green" : ""}">${escapeHtml(split.primaryStatus || "")}</b>
                <b class="status-pill accounts-payable-document-pill ${escapeHtml(split.document.tone)}">${escapeHtml(split.document.label)}</b>
                ${renderAccountsPayableMainPayButton(item, "ocp")}
              </span>
              <span class="accounts-payable-pending-document ${split.document.tone === "success" ? "is-complete" : "is-pending"}">${escapeHtml(split.primaryPending || "")}</span>
              <span>${displayAccountsPayableDays(item)}</span>
              <span>${escapeHtml(formatDate(item.fechaPago))}</span>
              <span>${escapeHtml(formatDate(item.createdAt))}</span>
              <span>${escapeHtml(formatDate(item.updatedAt))}</span>
              <span>${formatCurrency(split.primaryTotal)}</span>
              <span>${formatCurrency(split.primaryPaid)}</span>
              <span>${formatCurrency(split.primaryRemaining)}</span>
            </article>
            ${
              split.hasPartialPayment
                ? `<article class="purchase-table-row is-clickable accounts-payable-balance-copy row-state-waiting" data-accounts-payable-order-id="${item.orderId}" data-accounts-payable-segment="remaining">
                    <span class="row-balance-continuation-mark">↳</span>
                    <span>${escapeHtml(item.sucursal)}</span>
                    <span>${escapeHtml(item.proveedor)}</span>
                    <span>${escapeHtml(item.folio || item.dlv)}</span>
                    <span>${escapeHtml(item.ocp)}</span>
                    <span>${escapeHtml(item.po || "Sin PO")}</span>
                    <span>${escapeHtml(item.cliente)}</span>
                    <span>${escapeHtml(item.proyecto || "Sin proyecto")}</span>
                    <span><b class="status-pill">Saldo pendiente</b></span>
                    <span>Restante por pagar</span>
                    <span>${displayAccountsPayableDays(item)}</span>
                    <span>${escapeHtml(formatDate(item.fechaPago))}</span>
                    <span>${escapeHtml(formatDate(item.createdAt))}</span>
                    <span>${escapeHtml(formatDate(item.updatedAt))}</span>
                    <span>${formatCurrency(split.remaining)}</span>
                    <span>${formatCurrency(0)}</span>
                    <span>${formatCurrency(split.remaining)}</span>
                  </article>`
                : ""
            }
          `;
        })
        .join("")
    : `<div class="purchase-table-row purchase-table-empty"><span>${escapeHtml(emptyMessage)}</span></div>`;
  applyVisibleColumns(container.closest(".purchase-table"));
}

function renderAccountsPayableOcgfRows(container, rows, emptyMessage, paginationKey) {
  if (!container) return;
  ensureAlertBaseline("accountsPayableOcgf", accountsPayableOcgfCache, (item) => item.orderId, shouldAlertAccountsPayable);
  const pageRows = paginateRows(container, paginationKey, rows, () =>
    renderAccountsPayable({
      accounts: accountsPayableCache,
      ocgfAccounts: accountsPayableOcgfCache,
      commissionAccounts: accountsPayableCommissionCache
    })
  );
  container.innerHTML = rows.length
    ? pageRows
        .map(
          (item) => `
            <article class="${getRowClasses(
              "purchase-table-row is-clickable",
              getPaymentRowClass(item),
              getAlertClass("accountsPayableOcgf", item.orderId, item.updatedAt, shouldAlertAccountsPayable(item)),
              getRowFlagClass("accountsPayableOcgf", item.orderId)
            )}" data-accounts-payable-ocgf-order-id="${item.orderId}" data-alert-scope="accountsPayableOcgf" data-alert-updated-at="${escapeHtml(item.updatedAt || "")}">
              ${renderRowFlag("accountsPayableOcgf", item.orderId)}
              <span>${escapeHtml(item.proveedor)}</span>
              <span>${escapeHtml(item.ocgf)}</span>
              <span><b class="status-pill">${escapeHtml(item.estadoRegistro || item.estado)}</b></span>
              <span class="accounts-payable-status-stack"><b class="status-pill">${escapeHtml(item.estatusPago || item.estatus || "Pendiente")}</b>${renderAccountsPayableMainPayButton(item, "ocgf")}</span>
              <span>${escapeHtml(item.pendiente)}</span>
              <span>${Number(item.diasPago || 0)}</span>
              <span>${escapeHtml(formatDate(item.fechaPago))}</span>
              <span>${escapeHtml(formatDate(item.createdAt))}</span>
              <span>${escapeHtml(formatDate(item.updatedAt))}</span>
              <span>${formatCurrency(item.presupuestoAsignado ?? 0)}</span>
              <span>${formatCurrency(item.presupuestoDisponible ?? 0)}</span>
              <span>${formatCurrency(item.montoTotal ?? item.monto ?? 0)}</span>
              <span>${formatCurrency(item.totalPagado || 0)}</span>
              <span>${formatCurrency(item.saldoRestante ?? item.monto ?? 0)}</span>
            </article>
          `
        )
        .join("")
    : `<div class="purchase-table-row purchase-table-empty"><span>${escapeHtml(emptyMessage)}</span></div>`;
  applyVisibleColumns(container.closest(".purchase-table"));
}

function getCommissionDisplayAmount(item = {}) {
  const candidates = [
    item.montoComisionBruta,
    item.montoOriginal,
    item.comision,
    item.comisionTotal,
    item.subtotal,
    item.monto
  ];
  const amount = candidates
    .map((value) => Number(value))
    .find((value) => Number.isFinite(value) && Math.abs(value) > 0.009);
  return amount ?? 0;
}

function renderAccountsPayableCommissionRows(container, rows, emptyMessage, paginationKey) {
  if (!container) return;
  ensureAlertBaseline(
    "accountsPayableCommission",
    accountsPayableCommissionCache,
    (item) => item.orderId,
    shouldAlertAccountsPayable
  );
  const pageRows = paginateRows(container, paginationKey, rows, () =>
    renderAccountsPayable({
      accounts: accountsPayableCache,
      ocgfAccounts: accountsPayableOcgfCache,
      commissionAccounts: accountsPayableCommissionCache
    })
  );
  container.innerHTML = rows.length
    ? pageRows
        .map(
          (item) => `
            <article class="${getRowClasses(
              "purchase-table-row is-clickable",
              getPaymentRowClass(item),
              getAlertClass("accountsPayableCommission", item.orderId, item.updatedAt, shouldAlertAccountsPayable(item)),
              getRowFlagClass("accountsPayableCommission", item.orderId)
            )}" data-accounts-payable-commission-order-id="${item.orderId}" data-alert-scope="accountsPayableCommission" data-alert-updated-at="${escapeHtml(item.updatedAt || "")}">
              ${renderRowFlag("accountsPayableCommission", item.orderId)}
              <span>${escapeHtml(item.supervisor || item.proveedor || "")}</span>
              <span>${escapeHtml(item.occom || "")}</span>
              <span>${escapeHtml(item.folio || "")}</span>
              <span>${escapeHtml(item.empresa || "")}</span>
              <span>${escapeHtml(item.proyecto || "")}</span>
              <span class="accounts-payable-status-stack"><b class="status-pill">${escapeHtml(item.estado || "")}</b>${renderAccountsPayableMainPayButton(item, "occom")}</span>
              <span>${escapeHtml(item.pendiente || "")}</span>
              <span>${escapeHtml(formatDate(item.createdAt))}</span>
              <span>${escapeHtml(formatDate(item.updatedAt))}</span>
              <span>${formatCurrency(getCommissionDisplayAmount(item))}</span>
            </article>
          `
        )
        .join("")
    : `<div class="purchase-table-row purchase-table-empty"><span>${escapeHtml(emptyMessage)}</span></div>`;
  applyVisibleColumns(container.closest(".purchase-table"));
}

function isCashPaymentTerm(item = {}) {
  const terms = normalizeRoleKey(item.paymentTerms || item.condicionesPago || item.pago || "");
  return terms.includes("contado");
}

function displayAccountsPayableDays(item = {}) {
  return Number(item.diasRestantes ?? item.diasPago ?? 0);
}


function getAccountsPayablePaymentState(item = {}) {
  if (isAccountsPayablePaid(item)) return "paid";
  const paid = Number(item.totalPagado || 0);
  const remaining = Number(item.saldoRestante ?? item.monto ?? 0);
  if (paid > 0 && remaining > 0) return "partial";
  return "pending";
}

function getAccountsPayableFilters() {
  return {
    source: accountsPayableFilterSource?.value || "all",
    provider: accountsPayableFilterProvider?.value || "",
    branch: accountsPayableFilterBranch?.value || "",
    terms: accountsPayableFilterTerms?.value || "all",
    payment: accountsPayableFilterPayment?.value || "all",
    dateFrom: accountsPayableFilterDateFrom?.value || "",
    dateTo: accountsPayableFilterDateTo?.value || "",
    search: accountsPayableSearch?.value || ""
  };
}

function accountsPayableMatchesFilters(item = {}, source = "ocp", filters = getAccountsPayableFilters()) {
  if (filters.source !== "all" && filters.source !== source) return false;
  if (filters.search && !objectMatchesSearch(item, filters.search)) return false;
  const provider = String(item.proveedor || item.supervisor || "");
  if (filters.provider && provider !== filters.provider) return false;
  if (filters.branch && String(item.sucursal || "") !== filters.branch) return false;
  if (filters.terms === "cash" && !isCashPaymentTerm(item)) return false;
  if (filters.terms === "credit" && isCashPaymentTerm(item)) return false;
  if (filters.payment !== "all" && getAccountsPayablePaymentState(item) !== filters.payment) return false;
  return isWithinDateRange(item.createdAt || item.fecha || item.updatedAt, filters.dateFrom, filters.dateTo);
}

function syncAccountsPayableFilterOptions() {
  const allRows = [...accountsPayableCache, ...accountsPayableOcgfCache, ...accountsPayableCommissionCache];
  syncFilterSelect(accountsPayableFilterProvider, allRows.map((item) => item.proveedor || item.supervisor), "Todos");
  syncFilterSelect(accountsPayableFilterBranch, allRows.map((item) => item.sucursal), "Todas");
}

function getFilteredAccountsPayableCollections() {
  const filters = getAccountsPayableFilters();
  return {
    filters,
    ocp: accountsPayableCache.filter((item) => accountsPayableMatchesFilters(item, "ocp", filters)),
    ocgf: accountsPayableOcgfCache.filter((item) => accountsPayableMatchesFilters(item, "ocgf", filters)),
    occom: accountsPayableCommissionCache.filter((item) => accountsPayableMatchesFilters(item, "occom", filters))
  };
}

function updateAccountsPayableSectionVisibility(source = "all") {
  document.querySelectorAll("[data-payable-section]").forEach((section) => {
    const sectionSource = String(section.dataset.payableSection || "").split("-")[0];
    section.classList.toggle("hidden", source !== "all" && sectionSource !== source);
  });
}

function updateAccountsPayableFilterSummary(collections) {
  if (!accountsPayableFilterSummary) return;
  const rows = [...collections.ocp, ...collections.ocgf, ...collections.occom];
  const total = rows.reduce((sum, item) => sum + Number(item.montoTotal ?? item.monto ?? 0), 0);
  const remaining = rows.reduce((sum, item) => sum + Number(item.saldoRestante ?? (isAccountsPayablePaid(item) ? 0 : item.monto) ?? 0), 0);
  accountsPayableFilterSummary.textContent = `${rows.length.toLocaleString("es-MX")} registros visibles · Total ${formatCurrency(total)} · Saldo ${formatCurrency(remaining)}`;
}

function renderAccountsPayablePendingBatches() {
  if (!accountsPayablePendingBatchesPanel || !accountsPayablePendingBatchesRows) return;
  const batches = accountsPayablePendingBatches.filter((batch) => Number(batch?.id || 0) > 0);
  accountsPayablePendingBatchesPanel.classList.toggle("hidden", batches.length === 0);
  if (accountsPayablePendingBatchesCount) accountsPayablePendingBatchesCount.textContent = String(batches.length);
  accountsPayablePendingBatchesRows.innerHTML = batches.map((batch) => `
    <article class="accounts-payable-pending-batch-card">
      <span class="accounts-payable-pending-batch-icon">OCP</span>
      <span class="accounts-payable-pending-batch-folio"><small>Folio</small><strong>${escapeHtml(batch.folio || `OCP general ${batch.id}`)}</strong></span>
      <span><small>Pagos agrupados</small><strong>${Number(batch.itemCount || 0)}</strong></span>
      <span><small>Importe total</small><strong>${formatCurrency(batch.total || 0)}</strong></span>
      <span class="accounts-payable-pending-batch-status">Pendiente</span>
      <span class="accounts-payable-pending-batch-actions">
        <button class="commission-batch-existing-button" type="button" data-manage-main-batch="${Number(batch.id)}">Gestionar OCP</button>
        ${accountsPayableCanCancelBatches ? `<button class="commission-batch-cancel-button" type="button" data-cancel-main-batch="${Number(batch.id)}" data-batch-folio="${escapeHtml(batch.folio || `OCP general ${batch.id}`)}">Cancelar OCP</button>` : ""}
      </span>
    </article>`).join("");
}

function renderAccountsPayable(data) {
  if (data?.accounts) accountsPayableCache = data.accounts;
  if (data?.ocgfAccounts) accountsPayableOcgfCache = data.ocgfAccounts;
  if (data?.commissionAccounts) accountsPayableCommissionCache = data.commissionAccounts;
  accountsPayablePendingBatches = Array.isArray(data?.pendingPaymentBatches) ? data.pendingPaymentBatches : [];
  accountsPayableCanCancelBatches = Boolean(data?.canCancelPaymentBatches);
  renderAccountsPayablePendingBatches();
  const canSeeCommissionPayables = canAccessModule("comisiones");
  if (openCommissionBatchSelectorButton) {
    openCommissionBatchSelectorButton.classList.toggle("hidden", !canRegisterPayments());
  }
  syncAccountsPayableFilterOptions();
  const collections = getFilteredAccountsPayableCollections();
  updateAccountsPayableSectionVisibility(collections.filters.source);
  updateAccountsPayableFilterSummary(collections);
  accountsPayableCommissionPendingTable?.closest(".purchase-section")?.classList.toggle("hidden", !canSeeCommissionPayables || (collections.filters.source !== "all" && collections.filters.source !== "occom"));
  accountsPayableCommissionPaidTable?.closest(".purchase-section")?.classList.toggle("hidden", !canSeeCommissionPayables || (collections.filters.source !== "all" && collections.filters.source !== "occom"));
  const ocpRows = collections.ocp;
  const ocgfRows = collections.ocgf;
  const commissionRows = collections.occom;
  const pending = ocpRows.filter((item) => !isAccountsPayablePaid(item));
  const paid = ocpRows.filter(isAccountsPayablePaid);
  const ocgfPending = ocgfRows.filter((item) => !isAccountsPayablePaid(item));
  const ocgfPaid = ocgfRows.filter(isAccountsPayablePaid);
  const commissionPending = commissionRows.filter((item) => !isAccountsPayablePaid(item));
  const commissionPaid = commissionRows.filter(isAccountsPayablePaid);
  const pendingRows = sortByState(pending, accountsPayablePendingSort, (item, key) =>
    key === "__flagged" ? getRowFlagSortValue("accountsPayable", item.orderId) : item[key]
  );
  const paidRows = sortByState(paid, accountsPayablePaidSort, (item, key) =>
    key === "__flagged" ? getRowFlagSortValue("accountsPayable", item.orderId) : item[key]
  );
  const ocgfPendingRows = sortByState(ocgfPending, accountsPayableOcgfPendingSort, (item, key) =>
    key === "__flagged" ? getRowFlagSortValue("accountsPayableOcgf", item.orderId) : item[key]
  );
  const ocgfPaidRows = sortByState(ocgfPaid, accountsPayableOcgfPaidSort, (item, key) =>
    key === "__flagged" ? getRowFlagSortValue("accountsPayableOcgf", item.orderId) : item[key]
  );
  const commissionPendingRows = sortByState(commissionPending, accountsPayableCommissionPendingSort, (item, key) =>
    key === "__flagged" ? getRowFlagSortValue("accountsPayableCommission", item.orderId) : item[key]
  );
  const commissionPaidRows = sortByState(commissionPaid, accountsPayableCommissionPaidSort, (item, key) =>
    key === "__flagged" ? getRowFlagSortValue("accountsPayableCommission", item.orderId) : item[key]
  );

  renderAccountsPayableRows(
    accountsPayablePendingCashRows,
    pendingRows.filter(isCashPaymentTerm),
    "Sin OCP de contado pendientes de pago",
    "accountsPayablePendingCash"
  );
  renderAccountsPayableRows(
    accountsPayablePendingRows,
    pendingRows.filter((item) => !isCashPaymentTerm(item)),
    "Sin OCP de crédito pendientes de pago",
    "accountsPayablePending"
  );
  renderAccountsPayableRows(
    accountsPayablePaidRows,
    paidRows,
    "Sin OCP pagadas",
    "accountsPayablePaid"
  );
  renderAccountsPayableOcgfRows(
    accountsPayableOcgfPendingCashRows,
    ocgfPendingRows.filter(isCashPaymentTerm),
    "Sin OCGF de contado pendientes de pago",
    "accountsPayableOcgfPendingCash"
  );
  renderAccountsPayableOcgfRows(
    accountsPayableOcgfPendingRows,
    ocgfPendingRows.filter((item) => !isCashPaymentTerm(item)),
    "Sin OCGF de crédito pendientes de pago",
    "accountsPayableOcgfPending"
  );
  renderAccountsPayableOcgfRows(
    accountsPayableOcgfPaidRows,
    ocgfPaidRows,
    "Sin OCGF pagadas",
    "accountsPayableOcgfPaid"
  );
  if (canSeeCommissionPayables) {
    renderAccountsPayableCommissionRows(
      accountsPayableCommissionPendingRows,
      commissionPendingRows,
      "Sin OCCOM pendientes de pago",
      "accountsPayableCommissionPending"
    );
    renderAccountsPayableCommissionRows(
      accountsPayableCommissionPaidRows,
      commissionPaidRows,
      "Sin OCCOM pagadas",
      "accountsPayableCommissionPaid"
    );
  }
}

async function loadAccountsPayableModule() {
  commissionBatchOpenedFromMain = false;
  accountsPayableListView.classList.remove("hidden");
  accountsPayableDetailView.classList.add("hidden");
  accountsPayableCommissionBatchSelectView?.classList.add("hidden");
  accountsPayableCommissionBatchReviewView?.classList.add("hidden");
  if (accountsPayableCommissionMonth && !accountsPayableCommissionMonth.value) {
    accountsPayableCommissionMonth.value = getCurrentMonthValue();
  }
  try {
    const commissionMonth = accountsPayableCommissionMonth?.value || "";
    const query = commissionMonth ? `?commissionMonth=${encodeURIComponent(commissionMonth)}` : "";
    const data = await api(`/api/accounts-payable${query}`);
    renderAccountsPayable(data);
    refreshNavigationBadges();
  } catch (error) {
    accountsPayablePendingBatches = [];
    accountsPayablePendingBatchesPanel?.classList.add("hidden");
    if (accountsPayablePendingCashRows) accountsPayablePendingCashRows.innerHTML = "";
    if (accountsPayablePendingRows) accountsPayablePendingRows.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    if (accountsPayablePaidCashRows) accountsPayablePaidCashRows.innerHTML = "";
    if (accountsPayablePaidRows) accountsPayablePaidRows.innerHTML = "";
    if (accountsPayableOcgfPendingCashRows) accountsPayableOcgfPendingCashRows.innerHTML = "";
    if (accountsPayableOcgfPendingRows) accountsPayableOcgfPendingRows.innerHTML = "";
    if (accountsPayableOcgfPaidCashRows) accountsPayableOcgfPaidCashRows.innerHTML = "";
    if (accountsPayableOcgfPaidRows) accountsPayableOcgfPaidRows.innerHTML = "";
    if (accountsPayableCommissionPendingRows) accountsPayableCommissionPendingRows.innerHTML = "";
    if (accountsPayableCommissionPaidRows) accountsPayableCommissionPaidRows.innerHTML = "";
  }
}

function getCommissionBatchPaymentAmount(account = {}) {
  const explicitBalance = Number(account.saldoRestante);
  if (Number.isFinite(explicitBalance) && explicitBalance > 0) return explicitBalance;
  return Math.max(0, Number(account.monto || account.total || account.montoOriginal || 0));
}

function getCommissionBatchCandidateKey(account = {}) {
  return `${String(account.source || "OCCOM").toUpperCase()}:${Number(account.entityId || account.commissionId || account.orderId || 0)}`;
}

function getSelectedCommissionBatchCandidates() {
  return commissionBatchCandidates.filter((item) => commissionBatchSelectedIds.has(getCommissionBatchCandidateKey(item)));
}

function getVisibleCommissionBatchCandidates() {
  const person = normalizeSearchValue(commissionBatchPersonFilter?.value || "");
  const project = normalizeSearchValue(commissionBatchProjectFilter?.value || "");
  return commissionBatchCandidates.filter((item) => {
    if (person && !normalizeSearchValue(item.person || item.supervisor || item.proveedor || "").includes(person)) return false;
    if (project && !normalizeSearchValue(`${item.proyecto || ""} ${item.empresa || ""} ${item.folio || ""} ${item.documento || item.occom || item.ocp || ""}`).includes(project)) return false;
    return true;
  });
}

function getSelectableVisibleCommissionBatchCandidates() {
  return getVisibleCommissionBatchCandidates().filter((item) => !item.existingBatch?.id);
}

function updateCommissionBatchSelectionSummary() {
  const selected = getSelectedCommissionBatchCandidates();
  const total = selected.reduce((sum, item) => sum + getCommissionBatchPaymentAmount(item), 0);
  if (commissionBatchSelectionSummary) {
    commissionBatchSelectionSummary.textContent = `${selected.length} seleccionada${selected.length === 1 ? "" : "s"} · ${formatCurrency(total)}`;
  }
  if (commissionBatchSelectionHint) {
    commissionBatchSelectionHint.textContent = selected.length === 1
      ? "Un pago: continuarás al registro individual."
      : selected.length > 1
        ? `${selected.length} pagos: se creará la OCP general.`
        : "Selecciona uno o más pagos.";
  }
  if (commissionBatchContinueButton) commissionBatchContinueButton.disabled = selected.length === 0;
  const visible = getSelectableVisibleCommissionBatchCandidates();
  const allVisibleSelected = visible.length > 0 && visible.every((item) => commissionBatchSelectedIds.has(getCommissionBatchCandidateKey(item)));
  if (commissionBatchSelectVisibleButton) {
    commissionBatchSelectVisibleButton.textContent = allVisibleSelected ? "Quitar visibles" : "Seleccionar visibles";
  }
}

function renderCommissionBatchExistingBatches() {
  if (!commissionBatchExistingPanel || !commissionBatchExistingRows) return;
  const batches = commissionBatchExistingBatches.filter((batch) => Number(batch?.id || 0) > 0);
  commissionBatchExistingPanel.classList.toggle("hidden", batches.length === 0);
  if (commissionBatchExistingCount) commissionBatchExistingCount.textContent = String(batches.length);
  commissionBatchExistingRows.innerHTML = batches.map((batch) => `
    <article class="commission-batch-existing-card">
      <span class="commission-batch-existing-icon">OCP</span>
      <span><strong>${escapeHtml(batch.folio || `OCP general ${batch.id}`)}</strong><small>${Number(batch.itemCount || 0)} pago(s) · ${formatCurrency(batch.total || 0)}</small></span>
      <span class="commission-batch-existing-status">${escapeHtml(batch.estado || "Pendiente")}</span>
      <button class="commission-batch-existing-button" type="button" data-open-existing-batch="${Number(batch.id)}">Gestionar OCP</button>
      <button class="commission-batch-cancel-button" type="button" data-cancel-existing-batch="${Number(batch.id)}" data-batch-folio="${escapeHtml(batch.folio || `OCP general ${batch.id}`)}">Cancelar</button>
    </article>`).join("");
}

function renderCommissionBatchCandidates() {
  if (!commissionBatchCandidateRows) return;
  const visible = getVisibleCommissionBatchCandidates();
  commissionBatchCandidateRows.innerHTML = visible.length
    ? visible.map((item) => {
        const key = getCommissionBatchCandidateKey(item);
        const existingBatch = item.existingBatch || null;
        const content = `
            <span class="commission-batch-person"><strong>${escapeHtml(item.person || item.supervisor || item.proveedor || "Sin persona")}</strong><small>${escapeHtml(item.documento || item.occom || item.ocp || "Sin documento")} · ${escapeHtml(item.source || "")}</small></span>
            <span><small>Proyecto</small><strong>${escapeHtml(item.proyecto || item.folio || "Sin proyecto")}</strong></span>
            <span><small>Empresa</small><strong>${escapeHtml(item.empresa || "Sin empresa")}</strong></span>
            <span class="commission-batch-money"><small>Pago</small><strong>${formatCurrency(getCommissionBatchPaymentAmount(item))}</strong>${Number(item.adeudoMonto || 0) > 0 ? `<em>Adeudo ${formatCurrency(item.adeudoMonto)}</em>` : ""}</span>`;
        if (existingBatch?.id) {
          return `
            <article class="commission-batch-candidate is-linked">
              <span class="commission-batch-linked-icon" title="Ya pertenece a una OCP general">✓</span>
              ${content}
              <span class="commission-batch-linked-action">
                <small>Incluido en ${escapeHtml(existingBatch.folio || "otra OCP general")}</small>
                <button class="commission-batch-existing-button" type="button" data-open-existing-batch="${Number(existingBatch.id)}">Gestionar OCP</button>
                <button class="commission-batch-cancel-button" type="button" data-cancel-existing-batch="${Number(existingBatch.id)}" data-batch-folio="${escapeHtml(existingBatch.folio || `OCP general ${existingBatch.id}`)}">Cancelar</button>
              </span>
            </article>`;
        }
        return `
          <label class="commission-batch-candidate ${commissionBatchSelectedIds.has(key) ? "is-selected" : ""}">
            <input type="checkbox" data-commission-batch-key="${escapeHtml(key)}" ${commissionBatchSelectedIds.has(key) ? "checked" : ""} />
            ${content}
          </label>`;
      }).join("")
    : `<div class="empty-state">No hay pagos pendientes con esos filtros. El mes sólo limita las comisiones OCCOM; las OCP y OCGF pendientes se incluyen siempre.</div>`;
  updateCommissionBatchSelectionSummary();
}

function syncCommissionBatchPersonOptions() {
  if (!commissionBatchPersonOptions) return;
  const people = [...new Set(commissionBatchCandidates.map((item) => String(item.person || item.supervisor || item.proveedor || "Sin persona")))].sort((a, b) => a.localeCompare(b, "es"));
  commissionBatchPersonOptions.innerHTML = people.map((name) => `<option value="${escapeHtml(name)}"></option>`).join("");
}

async function loadCommissionBatchCandidates() {
  if (commissionBatchCandidateRows) commissionBatchCandidateRows.innerHTML = `<div class="empty-state">Cargando pagos pendientes...</div>`;
  try {
    const month = commissionBatchMonthFilter?.value || accountsPayableCommissionMonth?.value || getCurrentMonthValue();
    const data = await api(`/api/commission-payment-batches/candidates?commissionMonth=${encodeURIComponent(month)}`);
    commissionBatchCandidates = data.candidates || [];
    commissionBatchExistingBatches = data.existingBatches || [];
    const selectableKeys = new Set(commissionBatchCandidates
      .filter((item) => !item.existingBatch?.id)
      .map(getCommissionBatchCandidateKey));
    commissionBatchSelectedIds = new Set([...commissionBatchSelectedIds].filter((key) => selectableKeys.has(key)));
    syncCommissionBatchPersonOptions();
    renderCommissionBatchExistingBatches();
    renderCommissionBatchCandidates();
  } catch (error) {
    commissionBatchCandidates = [];
    commissionBatchExistingBatches = [];
    renderCommissionBatchExistingBatches();
    if (commissionBatchCandidateRows) commissionBatchCandidateRows.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

async function openCommissionBatchSelector() {
  accountsPayableListView?.classList.add("hidden");
  accountsPayableDetailView?.classList.add("hidden");
  accountsPayableCommissionBatchReviewView?.classList.add("hidden");
  accountsPayableCommissionBatchSelectView?.classList.remove("hidden");
  commissionBatchSelectedIds = new Set();
  commissionBatchExistingBatches = [];
  commissionBatchGeneralProofFiles = [];
  commissionBatchProofFilesByKey = new Map();
  commissionBatchDraftBatch = null;
  commissionBatchPaidBatch = null;
  commissionBatchOpenedExisting = false;
  commissionBatchOpenedFromMain = false;
  commissionBatchUploadedGeneralNames = [];
  commissionBatchUploadedProofNamesByKey = new Map();
  if (commissionBatchGeneralProofInput) commissionBatchGeneralProofInput.value = "";
  commissionBatchProofPanel?.classList.add("hidden");
  commissionBatchUploadProofButton?.classList.add("hidden");
  commissionBatchConfirmButton?.classList.remove("hidden");
  if (commissionBatchConfirmButton) {
    commissionBatchConfirmButton.disabled = false;
    commissionBatchConfirmButton.textContent = "Pagar todo";
  }
  if (backFromCommissionBatchReviewButton) backFromCommissionBatchReviewButton.textContent = "← Volver";
  if (commissionBatchMonthFilter) {
    commissionBatchMonthFilter.value = accountsPayableCommissionMonth?.value || getCurrentMonthValue();
  }
  if (commissionBatchPersonFilter) commissionBatchPersonFilter.value = "";
  if (commissionBatchProjectFilter) commissionBatchProjectFilter.value = "";
  await loadCommissionBatchCandidates();
}

function renderCommissionBatchGeneralOrder(selected = [], batch = null) {
  const total = selected.reduce((sum, item) => sum + getCommissionBatchPaymentAmount(item), 0);
  const paid = Boolean(batch?.id);
  return `
    <section class="commission-batch-general-order">
      <header class="commission-batch-general-header">
        <div>
          <span class="commission-batch-general-brand">DALVO SOLUTIONS</span>
          <small>Orden consolidada de cuentas por pagar</small>
        </div>
        <div>
          <span class="commission-batch-status ${paid ? "is-paid" : "is-pending"}">${paid ? "Pagada" : "Pendiente de pago"}</span>
          <strong>${escapeHtml(batch?.folio || "OCP GENERAL")}</strong>
          <small>${selected.length} proyecto${selected.length === 1 ? "" : "s"} seleccionado${selected.length === 1 ? "" : "s"}</small>
        </div>
      </header>
      <div class="commission-batch-general-table">
        <div class="commission-batch-general-row is-head">
          <span>Tipo / folio</span><span>Proveedor o persona</span><span>Proyecto</span><span>Empresa</span><span>Total</span>
        </div>
        ${selected.map((item) => `
          <div class="commission-batch-general-row">
            <span><strong>${escapeHtml(item.documento || item.occom || item.ocp || item.ocgf || "Documento")}</strong><small>${escapeHtml(item.source || "")}</small></span>
            <span>${escapeHtml(item.person || item.supervisor || item.proveedor || "Sin persona")}</span>
            <span>${escapeHtml(item.proyecto || item.gasto || item.folio || "Sin proyecto")}</span>
            <span>${escapeHtml(item.empresa || item.sucursal || "Sin empresa")}</span>
            <strong>${formatCurrency(getCommissionBatchPaymentAmount(item))}</strong>
          </div>`).join("")}
      </div>
      <footer class="commission-batch-general-total"><span>Total de la OCP general</span><strong>${formatCurrency(batch?.total ?? total)}</strong></footer>
    </section>`;
}

function renderCommissionBatchReviewItems(selected = [], allowProofs = false) {
  const mode = commissionBatchGroupMode?.value === "proyecto" ? "proyecto" : "persona";
  const groups = new Map();
  selected.forEach((item) => {
    const label = mode === "proyecto" ? item.proyecto || item.folio || "Sin proyecto" : item.person || item.supervisor || item.proveedor || "Sin persona";
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(item);
  });
  return [...groups.entries()].map(([label, items]) => `
    <section class="commission-batch-group">
      <div class="commission-batch-group-heading"><h3>${escapeHtml(label)}</h3><strong>${formatCurrency(items.reduce((sum, item) => sum + getCommissionBatchPaymentAmount(item), 0))}</strong></div>
      ${items.map((item) => {
        const key = getCommissionBatchCandidateKey(item);
        const files = commissionBatchProofFilesByKey.get(key) || [];
        const uploadedNames = commissionBatchUploadedProofNamesByKey.get(key) || [];
        return `<article class="commission-batch-review-item" data-batch-item-key="${escapeHtml(key)}">
          <span><strong>${escapeHtml(item.documento || item.occom || item.ocp || item.ocgf || "Documento")}</strong><small>${escapeHtml(item.person || item.supervisor || item.proveedor || "Sin persona")} · ${escapeHtml(item.empresa || "Sin empresa")} · ${escapeHtml(item.source || "")}</small></span>
          <span><strong>${escapeHtml(item.proyecto || item.gasto || item.folio || "Sin proyecto")}</strong><small>${escapeHtml(item.sucursal || "")} · ${uploadedNames.length ? `${uploadedNames.length} comprobante(s) cargado(s)` : files.length ? `${files.length} comprobante(s) listo(s)` : "Sin comprobante adjunto"}</small></span>
          <strong>${formatCurrency(getCommissionBatchPaymentAmount(item))}</strong>
          <button class="secondary-button" type="button" data-batch-item-info="${escapeHtml(key)}">Ver información y archivos</button>
          ${allowProofs ? `<label class="small-button batch-proof-picker"><span>Adjuntar comprobante de este pago</span><input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.xml" data-batch-proof-input="${escapeHtml(key)}" />${files.length ? `<small class="batch-proof-files">Por guardar: ${files.map((file) => escapeHtml(file.name)).join(" · ")}</small>` : uploadedNames.length ? `<small class="batch-proof-files">Cargado: ${uploadedNames.map(escapeHtml).join(" · ")}</small>` : ""}</label>` : ""}
          <div class="commission-batch-item-info hidden" data-batch-item-info-panel="${escapeHtml(key)}"></div>
        </article>`;
      }).join("")}
    </section>`).join("");
}

function setCommissionBatchReviewHeading(paid = false) {
  if (commissionBatchReviewEyebrow) commissionBatchReviewEyebrow.textContent = paid ? "OCP general pagada" : "OCP general";
  if (commissionBatchReviewTitle) commissionBatchReviewTitle.textContent = paid ? "Pago general registrado" : "Orden de compra general";
  if (commissionBatchReviewDescription) commissionBatchReviewDescription.textContent = paid
    ? "Las cuentas individuales ya están pagadas. Ahora puedes adjuntar el comprobante general o los comprobantes de cada proyecto."
    : "Revisa los proyectos seleccionados y paga el total en una sola operación.";
}

function renderCommissionBatchReview() {
  if (!commissionBatchReviewContent) return;
  const selected = getSelectedCommissionBatchCandidates();
  const total = selected.reduce((sum, item) => sum + getCommissionBatchPaymentAmount(item), 0);
  setCommissionBatchReviewHeading(false);
  const previewUrl = commissionBatchDraftBatch?.previewUrl || (commissionBatchDraftBatch?.id ? `/api/commission-payment-batches/${Number(commissionBatchDraftBatch.id)}/preview` : "#");
  commissionBatchReviewContent.innerHTML = `
    <section class="commission-batch-file-ready">
      <span class="commission-batch-file-icon">OCP</span>
      <div><strong>${escapeHtml(commissionBatchDraftBatch?.folio || "OCP general")}</strong><small>El archivo general fue creado con ${selected.length} proyectos por ${formatCurrency(total)}. Ábrelo para revisar y pagar todo.</small></div>
      <div class="commission-batch-file-actions">
        <a class="commission-batch-open-button" href="${escapeHtml(previewUrl)}" target="_blank" rel="opener">
          <span class="commission-batch-open-button-icon" aria-hidden="true">↗</span>
          <span><strong>Abrir OCP general</strong><small>Revisar y pagar</small></span>
        </a>
        ${commissionBatchDraftBatch?.id ? `<button class="commission-batch-cancel-button" type="button" data-cancel-existing-batch="${Number(commissionBatchDraftBatch.id)}" data-batch-folio="${escapeHtml(commissionBatchDraftBatch.folio || `OCP general ${commissionBatchDraftBatch.id}`)}">Cancelar OCP</button>` : ""}
      </div>
    </section>
    ${renderCommissionBatchReviewItems(selected, false)}`;
  if (commissionBatchReviewSummary) commissionBatchReviewSummary.textContent = `${selected.length} pagos · Total ${formatCurrency(total)} · Pendiente`;
  commissionBatchConfirmButton?.classList.add("hidden");
}

function renderCommissionBatchPaidReview(batch, selected) {
  if (!commissionBatchReviewContent) return;
  setCommissionBatchReviewHeading(true);
  commissionBatchReviewContent.innerHTML = `
    <section class="commission-batch-paid-notice">
      <span>✓</span>
      <div><strong>Pago registrado correctamente</strong><small>Cada cuenta seleccionada quedó marcada individualmente como pagada.</small></div>
      <a class="secondary-button" href="${escapeHtml(`/api/commission-payment-batches/${Number(batch?.id || 0)}/preview`)}" target="_blank" rel="opener">Abrir OCP general</a>
    </section>
    ${renderCommissionBatchReviewItems(selected, true)}`;
  commissionBatchProofPanel?.classList.remove("hidden");
  commissionBatchUploadProofButton?.classList.remove("hidden");
  if (commissionBatchReviewSummary) commissionBatchReviewSummary.textContent = `Pagado · ${formatCurrency(batch?.total || 0)} · Los comprobantes pueden cargarse ahora.`;
  if (commissionBatchConfirmButton) {
    commissionBatchConfirmButton.classList.remove("hidden");
    commissionBatchConfirmButton.disabled = false;
    commissionBatchConfirmButton.textContent = "Volver a cuentas por pagar";
  }
  if (backFromCommissionBatchReviewButton) backFromCommissionBatchReviewButton.textContent = "← Volver";
}

async function openCommissionBatchReview() {
  commissionBatchOpenedExisting = false;
  commissionBatchOpenedFromMain = false;
  if (backFromCommissionBatchReviewButton) backFromCommissionBatchReviewButton.textContent = "← Volver";
  accountsPayableCommissionBatchSelectView?.classList.add("hidden");
  accountsPayableCommissionBatchReviewView?.classList.remove("hidden");
  if (commissionBatchReviewContent) commissionBatchReviewContent.innerHTML = `<div class="empty-state">Creando el archivo OCP general...</div>`;
  if (commissionBatchConfirmButton) {
    commissionBatchConfirmButton.disabled = true;
    commissionBatchConfirmButton.textContent = "Creando OCP general...";
  }
  const selected = getSelectedCommissionBatchCandidates();
  try {
    const data = await api("/api/commission-payment-batches/drafts", {
      method: "POST",
      body: JSON.stringify({
        selections: selected.map((item) => ({ source: item.source, id: Number(item.entityId || item.commissionId || item.orderId) })),
        mode: commissionBatchGroupMode?.value || "persona",
        commissionMonth: commissionBatchMonthFilter?.value || accountsPayableCommissionMonth?.value || ""
      }),
      toast: false
    });
    commissionBatchDraftBatch = data.batch || null;
    renderCommissionBatchReview();
    if (commissionBatchConfirmButton) commissionBatchConfirmButton.disabled = false;
    showSuccessToast("La OCP general fue creada. Usa el botón para abrirla cuando estés listo.", "Archivo listo");
  } catch (error) {
    accountsPayableCommissionBatchReviewView?.classList.add("hidden");
    accountsPayableCommissionBatchSelectView?.classList.remove("hidden");
    if (error.code === "PAYMENT_BATCH_EXISTS" && error.batch?.id) {
      commissionBatchSelectedIds.clear();
      await loadCommissionBatchCandidates();
      commissionBatchExistingPanel?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      showSuccessToast(`${error.batch.folio || "La OCP general"} ya existía. Puedes abrirla desde el apartado de OCP generales existentes.`, "OCP general encontrada");
      if (commissionBatchConfirmButton) commissionBatchConfirmButton.disabled = false;
      return;
    }
    showErrorToast(error, "No se pudo crear el archivo OCP general.", "Error al crear");
    if (commissionBatchConfirmButton) commissionBatchConfirmButton.disabled = false;
  }
}

function mapCommissionBatchItemToCandidate(item = {}, batch = {}) {
  const source = String(item.source || "OCP").toUpperCase();
  const entityId = Number(item.entityId || item.orderId || item.ocgfOrderId || item.commissionId || 0);
  const amount = Number(item.montoPagado || item.montoBruto || 0);
  return {
    ...item,
    source,
    entityId,
    person: item.supervisor || "Sin persona",
    proveedor: item.supervisor || "Sin proveedor",
    documento: item.documento || item.occom || "Documento",
    monto: amount,
    montoOriginal: Number(item.montoBruto || amount),
    saldoRestante: amount,
    existingBatch: {
      id: Number(batch.id || 0),
      folio: batch.folio || "OCP general",
      estado: batch.estado || "Pendiente",
      total: Number(batch.total || 0),
      previewUrl: `/api/commission-payment-batches/${Number(batch.id || 0)}/preview`
    }
  };
}

async function openExistingCommissionBatch(batchId, options = {}) {
  const id = Number(batchId || 0);
  if (!id) return;
  const openedFromMain = Boolean(options.fromMain);
  commissionBatchOpenedFromMain = openedFromMain;
  if (openedFromMain) accountsPayableListView?.classList.add("hidden");
  accountsPayableCommissionBatchSelectView?.classList.add("hidden");
  accountsPayableCommissionBatchReviewView?.classList.remove("hidden");
  commissionBatchProofPanel?.classList.add("hidden");
  commissionBatchUploadProofButton?.classList.add("hidden");
  commissionBatchConfirmButton?.classList.add("hidden");
  if (commissionBatchReviewContent) commissionBatchReviewContent.innerHTML = `<div class="empty-state">Cargando la gestión de la OCP general...</div>`;
  try {
    const data = await api(`/api/commission-payment-batches/${id}`, { toast: false });
    const batch = data.batch || null;
    if (!batch?.id) throw new Error("No se encontró la OCP general.");
    const items = (batch.items || []).map((item) => mapCommissionBatchItemToCandidate(item, batch));
    if (!items.length) throw new Error("La OCP general no contiene pagos.");
    commissionBatchCandidates = items;
    commissionBatchSelectedIds = new Set(items.map(getCommissionBatchCandidateKey));
    commissionBatchDraftBatch = {
      ...batch,
      previewUrl: `/api/commission-payment-batches/${Number(batch.id)}/preview`
    };
    commissionBatchPaidBatch = String(batch.estado || "").toLowerCase() === "pagado" ? batch : null;
    commissionBatchOpenedExisting = true;
    commissionBatchGeneralProofFiles = [];
    commissionBatchProofFilesByKey = new Map();
    commissionBatchUploadedGeneralNames = [];
    commissionBatchUploadedProofNamesByKey = new Map();
    if (commissionBatchGeneralProofInput) commissionBatchGeneralProofInput.value = "";
    if (commissionBatchGroupMode) commissionBatchGroupMode.value = batch.modoAgrupacion === "proyecto" ? "proyecto" : "persona";
    if (backFromCommissionBatchReviewButton) backFromCommissionBatchReviewButton.textContent = "← Volver";
    if (commissionBatchPaidBatch) renderCommissionBatchPaidReview(batch, items);
    else renderCommissionBatchReview();
  } catch (error) {
    commissionBatchOpenedExisting = false;
    commissionBatchOpenedFromMain = false;
    accountsPayableCommissionBatchReviewView?.classList.add("hidden");
    if (openedFromMain) accountsPayableListView?.classList.remove("hidden");
    else accountsPayableCommissionBatchSelectView?.classList.remove("hidden");
    showErrorToast(error, "No se pudo cargar la gestión de la OCP general.", "Error al abrir");
  }
}

async function cancelCommissionPaymentBatch(batchId, folio = "OCP general", options = {}) {
  const id = Number(batchId || 0);
  if (!id) return;
  const returnToMain = Boolean(options.fromMain || commissionBatchOpenedFromMain);
  const confirmed = confirm(`¿Cancelar ${folio}?\n\nLa OCP general pendiente se eliminará y sus pagos volverán a estar disponibles.`);
  if (!confirmed) return;
  try {
    await api(`/api/commission-payment-batches/${id}`, { method: "DELETE", toast: false });
    if (Number(commissionBatchDraftBatch?.id || 0) === id) {
      commissionBatchDraftBatch = null;
      commissionBatchPaidBatch = null;
      commissionBatchOpenedExisting = false;
      commissionBatchOpenedFromMain = false;
      accountsPayableCommissionBatchReviewView?.classList.add("hidden");
      if (!returnToMain) accountsPayableCommissionBatchSelectView?.classList.remove("hidden");
      if (backFromCommissionBatchReviewButton) backFromCommissionBatchReviewButton.textContent = "← Volver";
    }
    commissionBatchSelectedIds.clear();
    if (returnToMain) await loadAccountsPayableModule();
    else await loadCommissionBatchCandidates();
    showSuccessToast(`${folio} fue cancelada. Sus pagos ya pueden seleccionarse nuevamente.`, "OCP general cancelada");
  } catch (error) {
    showErrorToast(error, "No se pudo cancelar la OCP general.", "Error al cancelar");
  }
}

async function handleCommissionBatchExistingAction(event) {
  const openButton = event.target.closest("[data-open-existing-batch]");
  if (openButton) {
    await openExistingCommissionBatch(openButton.dataset.openExistingBatch);
    return;
  }
  const cancelButton = event.target.closest("[data-cancel-existing-batch]");
  if (cancelButton) {
    await cancelCommissionPaymentBatch(cancelButton.dataset.cancelExistingBatch, cancelButton.dataset.batchFolio || "OCP general");
  }
}

function getCommissionBatchItemByKey(key) {
  return commissionBatchCandidates.find((item) => getCommissionBatchCandidateKey(item) === key) || null;
}

function getCommissionBatchItemEndpoint(item, action = "") {
  const id = Number(item?.entityId || item?.commissionId || item?.orderId || 0);
  const source = String(item?.source || "OCP").toUpperCase();
  if (source === "OCGF") return `/api/accounts-payable/ocgf/${id}${action}`;
  if (source === "OCCOM") {
    const month = commissionBatchMonthFilter?.value || accountsPayableCommissionMonth?.value || "";
    const query = month ? `?commissionMonth=${encodeURIComponent(month)}` : "";
    return `/api/accounts-payable/commissions/${encodeURIComponent(String(id))}${action}${query}`;
  }
  return `/api/accounts-payable/${id}${action}`;
}

function renderCommissionBatchItemInfo(panel, item, data) {
  const account = data.account || {};
  const files = data.files || [];
  const support = data.supportDocuments || [];
  panel.innerHTML = `
    <div class="commission-batch-item-summary">
      <strong>${escapeHtml(item.documento || item.ocp || item.ocgf || item.occom || "Documento")}</strong>
      <span>Tipo: ${escapeHtml(item.source || "")} · Proyecto: ${escapeHtml(item.proyecto || item.gasto || "Sin proyecto")}</span>
      <span>Proveedor: ${escapeHtml(item.proveedor || item.person || "Sin proveedor")} · Sucursal: ${escapeHtml(item.sucursal || "Sin sucursal")}</span>
      <span>Total: ${formatCurrency(account.montoTotal ?? account.monto ?? item.monto ?? 0)} · Saldo: ${formatCurrency(account.saldoRestante ?? item.saldoRestante ?? item.monto ?? 0)}</span>
    </div>
    <h4>Archivos del proyecto y de pago</h4>
    ${renderAccountsPayableFiles(files)}
    ${support.length ? renderAccountsPayableSupportDocuments(support, "Archivos del proyecto") : ""}`;
}

async function loadCommissionBatchItemInfo(key) {
  const item = getCommissionBatchItemByKey(key);
  const panel = commissionBatchReviewContent?.querySelector(`[data-batch-item-info-panel="${CSS.escape(key)}"]`);
  if (!item || !panel) return;
  if (!panel.classList.contains("hidden")) {
    panel.classList.add("hidden");
    return;
  }
  panel.classList.remove("hidden");
  panel.innerHTML = `<div class="empty-state">Cargando información y archivos...</div>`;
  try {
    const data = await api(getCommissionBatchItemEndpoint(item), { toast: false });
    renderCommissionBatchItemInfo(panel, item, data);
  } catch (error) {
    panel.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

async function uploadCommissionBatchProofFiles(item, files) {
  if (!files?.length) return;
  const formData = new FormData();
  formData.append("tipo", "Comprobante de pago");
  files.forEach((file) => formData.append("archivo", file, file.name));
  const response = await fetch(getCommissionBatchItemEndpoint(item, "/files"), {
    method: "POST",
    credentials: "same-origin",
    body: formData
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `No se pudo adjuntar el comprobante de ${item.documento || "la cuenta"}.`);
}

async function confirmCommissionBatchPayment() {
  const selected = getSelectedCommissionBatchCandidates();
  if (selected.length < 2 || !commissionBatchConfirmButton) return;
  if (commissionBatchPaidBatch?.id) {
    await loadAccountsPayableModule();
    return;
  }
  const previewUrl = commissionBatchDraftBatch?.previewUrl || (commissionBatchDraftBatch?.id
    ? `/api/commission-payment-batches/${Number(commissionBatchDraftBatch.id)}/preview`
    : "");
  if (previewUrl) window.open(previewUrl, "dalvoOcpGeneral");
}

async function saveCommissionBatchProofFiles() {
  const selected = getSelectedCommissionBatchCandidates();
  if (!commissionBatchPaidBatch?.id || !selected.length || !commissionBatchUploadProofButton) return;
  const hasIndividualFiles = selected.some((item) => (commissionBatchProofFilesByKey.get(getCommissionBatchCandidateKey(item)) || []).length);
  if (!commissionBatchGeneralProofFiles.length && !hasIndividualFiles) {
    showErrorToast(new Error("Selecciona al menos un comprobante antes de guardar."), "No hay archivos seleccionados.", "Comprobantes");
    return;
  }
  const originalText = commissionBatchUploadProofButton.textContent;
  commissionBatchUploadProofButton.disabled = true;
  commissionBatchUploadProofButton.textContent = "Guardando comprobantes...";
  try {
    const generalNames = commissionBatchGeneralProofFiles.map((file) => file.name);
    for (const item of selected) {
      const key = getCommissionBatchCandidateKey(item);
      const individualFiles = commissionBatchProofFilesByKey.get(key) || [];
      if (individualFiles.length) {
        await uploadCommissionBatchProofFiles(item, individualFiles);
        commissionBatchUploadedProofNamesByKey.set(key, individualFiles.map((file) => file.name));
      }
      if (commissionBatchGeneralProofFiles.length) await uploadCommissionBatchProofFiles(item, commissionBatchGeneralProofFiles);
    }
    if (generalNames.length) commissionBatchUploadedGeneralNames = generalNames;
    commissionBatchGeneralProofFiles = [];
    commissionBatchProofFilesByKey = new Map();
    if (commissionBatchGeneralProofInput) commissionBatchGeneralProofInput.value = "";
    const status = document.getElementById("commissionBatchGeneralProofStatus");
    if (status) status.textContent = commissionBatchUploadedGeneralNames.length
      ? `Cargado: ${commissionBatchUploadedGeneralNames.join(" · ")}`
      : "Ningún archivo seleccionado";
    renderCommissionBatchPaidReview(commissionBatchPaidBatch, selected);
    showSuccessToast("Los comprobantes quedaron ligados a las cuentas correspondientes.", "Comprobantes guardados");
  } catch (error) {
    showErrorToast(error, "No se pudieron guardar todos los comprobantes.", "Error al adjuntar");
  } finally {
    commissionBatchUploadProofButton.disabled = false;
    commissionBatchUploadProofButton.textContent = originalText;
  }
}

function renderAccountsPayableFiles(files = []) {
  return `
    <div class="budget-documents-table">
      <div class="budget-documents-head">
        <span>Tipo</span>
        <span>Nombre</span>
        <span>Fecha</span>
        <span>Acción</span>
      </div>
      ${
        files.length
          ? files
              .map(
                (file) => `
                  <div class="budget-documents-row">
                    <span>${escapeHtml(file.tipo)}</span>
                    <span>${renderFileNameLink(file)}</span>
                    <span>${escapeHtml(formatDate(file.createdAt))}</span>
                    <span class="document-actions">
                      ${renderFileViewButton(file)}
                      ${
                        canDeletePaymentDocuments()
                          ? `<button class="small-button danger-button icon-only-button" type="button" aria-label="Eliminar archivo" data-accounts-payable-file-delete="${file.id}">X</button>`
                          : ""
                      }
                    </span>
                  </div>
                `
              )
              .join("")
          : `<div class="budget-documents-empty">Sin archivos cargados</div>`
      }
    </div>
  `;
}

function renderAccountsPayableSupportDocuments(documents = [], title = "Orden y documentos de soporte") {
  return `
    <section class="client-quote-module documents-support">
      <h3>${escapeHtml(title)}</h3>
      <div class="budget-documents-table">
        <div class="budget-documents-head">
          <span>Tipo</span>
          <span>Nombre</span>
          <span>Fecha</span>
          <span>Acción</span>
        </div>
        ${
          documents.length
            ? documents
                .map((document) => {
                  const fileUrl = getFileViewUrl(document);
                  return `
                    <div class="budget-documents-row">
                      <span>${escapeHtml(document.tipo || "Documento")}</span>
                      <span>${renderFileNameLink(document, "Documento")}</span>
                      <span>${escapeHtml(formatDate(document.createdAt))}</span>
                      <span class="document-actions">
                        ${
                          fileUrl
                            ? `<a class="small-button view-file-button" href="${escapeHtml(fileUrl)}" target="_blank" rel="noreferrer">Vista previa</a>`
                            : `<button class="small-button view-file-button" type="button" disabled>Vista previa</button>`
                        }
                      </span>
                    </div>
                  `;
                })
                .join("")
            : `<div class="budget-documents-empty">Sin documentos de soporte</div>`
        }
      </div>
    </section>
  `;
}

function renderPaymentOrderHistory(paymentOrders = []) {
  const visibleOrders = (paymentOrders || []).filter((order) => String(order.estadoMovimiento || "") !== "Cancelado");
  if (!visibleOrders.length) return `<div class="client-quote-empty">Sin abonos registrados</div>`;

  return visibleOrders
    .map((order) => `
      <article class="payment-order-history-row payment-order-balance-row">
        <div class="payment-order-main">
          <strong>Abono · ${escapeHtml(order.folio || "OP")}</strong>
          <span>${escapeHtml(formatDate(order.fechaAplicacion || order.createdAt))} · ${formatCurrency(order.monto || 0)}</span>
          ${order.metodoPago || order.referencia ? `<small>${escapeHtml([order.metodoPago, order.referencia].filter(Boolean).join(" · "))}</small>` : ""}
          ${order.observaciones ? `<small>${escapeHtml(order.observaciones)}</small>` : ""}
        </div>
        <div class="payment-order-balance-cells">
          <span><small>Saldo anterior</small><strong>${formatCurrency(order.saldoAnterior ?? 0)}</strong></span>
          <span><small>Saldo restante</small><strong>${formatCurrency(order.saldoPosterior ?? 0)}</strong></span>
        </div>
        <span class="payment-order-history-actions">
          ${order.pdfUrl ? `<a class="small-button" href="/api/payment-orders/${Number(order.id)}/pdf" target="_blank" rel="noreferrer">Ver OP</a>` : ""}
        </span>
      </article>`)
    .join("");
}

function renderAccountsPayableCommissionAdjustmentHistory(history = []) {
  const rows = Array.isArray(history) ? history : [];
  return `
    <section class="client-quote-module accounts-payable-adjustment-history">
      <h3>Historial de cobros a préstamos / adeudos</h3>
      <div class="commission-adjustments-table">
        <div class="commission-adjustments-head">
          <span>Aplicado</span>
          <span>Descuento</span>
          <span>Detalle</span>
          <span>Usuario</span>
          <span>Fecha</span>
        </div>
        ${
          rows.length
            ? rows
                .map((item) => {
                  const detailParts = [
                    item.adeudoDetalle ? `Préstamo/adeudo: ${item.adeudoDetalle}` : "",
                    item.descuentoDetalle ? `Descuento: ${item.descuentoDetalle}` : ""
                  ].filter(Boolean);
                  return `
                    <article class="commission-adjustments-row">
                      <span>${formatCurrency(item.adeudoMonto || 0)}</span>
                      <span>${formatCurrency(item.descuentoMonto || 0)}</span>
                      <span>${escapeHtml(detailParts.join(" | ") || "Sin detalle")}</span>
                      <span>${escapeHtml(item.usuario || "Sistema")}</span>
                      <span>${escapeHtml(formatDate(item.createdAt))}</span>
                    </article>
                  `;
                })
                .join("")
            : `<div class="commission-adjustments-empty">Sin movimientos registrados</div>`
        }
      </div>
    </section>
  `;
}

function renderAccountsPayableDetail(data) {
  const account = data.account || {};
  const order = data.order || {};
  const files = data.files || [];
  const paymentOrders = data.paymentOrders || [];
  const supportDocuments = data.supportDocuments || [];
  const discountHistory = data.discountHistory || [];
  const orderRows = order.items || [];
  const isOcgf = data.source === "OCGF" || account.source === "OCGF";
  const isCommission = data.source === "OCCOM" || account.source === "OCCOM";
  const orderLabel = isCommission ? "OCCOM" : isOcgf ? "OCGF" : "OCP";
  const orderFolio = isCommission ? account.occom : isOcgf ? account.ocgf : account.ocp;
  const orderRowsEmptyText = isCommission ? "Sin detalle de comisión" : isOcgf ? "Sin partidas en la OCGF" : "Sin partidas en la OCP";
  const orderRowsTitle = isCommission ? "Datos de la comisión" : isOcgf ? "Datos de la OCGF" : "Datos de la OCP";
  const paymentTerms = data.paymentTerms || order.provider?.condicionesPago || "Crédito";
  const preferredFileType = account.pagado || Number(account.totalPagado || 0) > 0.004 ? "Comprobante de pago" : "Factura";
  const fileOptions = (data.fileTypes || ["Factura", "Comprobante de pago", "Complemento de pago"])
    .map((type) => `<option value="${escapeHtml(type)}" ${type === preferredFileType ? "selected" : ""}>${escapeHtml(type)}</option>`)
    .join("");
  const provider = order.provider || {};
  const debtAmount = Number(order.debt ?? account.adeudoMonto ?? 0);
  const debtDetail = String(order.debtDetail ?? account.adeudoDetalle ?? "");
  const creditApplication = data.creditApplication || {};
  const creditBalance = Number(creditApplication.saldoPendiente || 0);
  const creditApplied = Number(creditApplication.montoAplicado || 0);
  const creditBalanceBefore = Number(creditApplication.saldoAntesAplicacion ?? creditBalance);
  const creditLocked = Boolean(creditApplication.bloqueado);
  const creditHasUser = Boolean(creditApplication.tienePersonaRegistrada);
  const creditMaxApplicable = Number(creditApplication.maxAplicable || 0);
  const grossCommissionTotal = Number(order.subtotal ?? account.subtotal ?? orderRows.reduce((sum, row) => sum + Number(row.total || 0), 0));
  const retentionAmount = Number(order.retention ?? account.retencion ?? 0);
  const subtotalAmount = isCommission
    ? Math.max(Math.round((grossCommissionTotal - debtAmount) * 100) / 100, 0)
    : isOcgf
      ? Number(order.subtotal ?? account.subtotal ?? orderRows.reduce((sum, row) => sum + Number(row.total || 0), 0))
      : Number(account.subtotalProgramadoPago ?? order.pagoSubtotal ?? account.subtotal ?? 0);
  const ivaAmount = isCommission
    ? Math.round(subtotalAmount * 0.16 * 100) / 100
    : Number(order.iva ?? Math.max(0, Number(account.montoTotal ?? account.monto ?? order.totalPagar ?? order.total ?? 0) + retentionAmount - subtotalAmount));
  const totalAmount = isCommission
    ? Math.max(Math.round((subtotalAmount + ivaAmount - retentionAmount) * 100) / 100, 0)
    : Number(account.montoTotal ?? account.monto ?? order.totalPagar ?? order.total ?? 0);
  const fullOcpSubtotal = Number(account.subtotalOcp ?? order.subtotal ?? 0);
  const fullOcpTotal = Number(account.montoTotal ?? account.monto ?? 0);
  const fullOcpRetention = Number(account.retencion ?? 0);
  const fullOcpIva = Math.max(0, Math.round((fullOcpTotal + fullOcpRetention - fullOcpSubtotal) * 100) / 100);
  const requestedSubtotal = Number(account.subtotalProgramadoPago ?? order.pagoSubtotal ?? 0);
  const requestedPaymentOriginal = Number(account.pagoSolicitadoOriginal ?? account.pagoSolicitado ?? 0);
  const requestedPaymentPending = Number(account.pagoSolicitado ?? 0);
  const requestedRetention = Number(account.retencionSolicitada ?? 0);
  const requestedIva = Number(
    account.ivaSolicitado ??
      Math.max(0, Math.round((requestedPaymentOriginal + requestedRetention - requestedSubtotal) * 100) / 100)
  );
  const payableRemaining = Number(account.saldoRestante ?? account.monto ?? 0);
  const totalPaidAmount = Math.max(0, Number(account.totalPagado || 0));
  const hasPartialSupplierPayment = !isCommission && !isOcgf && totalPaidAmount > 0.004 && payableRemaining > 0.004;
  const suggestedAbono = Math.max(0, Math.min(requestedPaymentPending, payableRemaining));
  const commissionPdfId = encodeURIComponent(String(account.commissionId || activeAccountsPayableOrderId || ""));
  const commissionMonthQuery =
    isCommission && accountsPayableCommissionMonth?.value
      ? `&commissionMonth=${encodeURIComponent(accountsPayableCommissionMonth.value)}`
      : "";
  const headerFields = isCommission
    ? `
        <label><span>Supervisor</span><input value="${escapeHtml(account.supervisor || account.proveedor || "")}" readonly /></label>
        <label><span>OCCOM</span><input value="${escapeHtml(orderFolio || "")}" readonly /></label>
        <label><span>Folio presupuesto</span><input value="${escapeHtml(account.folio || "")}" readonly /></label>
        <label><span>Empresa</span><input value="${escapeHtml(account.empresa || "")}" readonly /></label>
        <label class="wide-field"><span>Proyecto</span><input value="${escapeHtml(account.proyecto || "")}" readonly /></label>
        <label><span>Estado</span><input value="${escapeHtml(account.estado || "")}" readonly /></label>
        <label><span>Pendiente</span><input value="${escapeHtml(account.pendiente || "")}" readonly /></label>
        <label><span>Fecha de pago</span><input value="${escapeHtml(formatDate(account.fechaPago))}" readonly /></label>
        <label><span>Monto</span><input value="${formatCurrency(account.monto || 0)}" readonly /></label>
        <label><span>Saldo préstamo / adeudo</span><input value="${formatCurrency(creditBalance)}" readonly /></label>
      `
    : `
        ${
          isOcgf
            ? `<label><span>Sucursal</span><input value="${escapeHtml(account.sucursal || "")}" readonly /></label>
               <label><span>Proveedor</span><input value="${escapeHtml(account.proveedor || "")}" readonly /></label>
               <label><span>Gasto</span><input value="${escapeHtml(account.gasto || "")}" readonly /></label>
               <label><span>OCGF</span><input value="${escapeHtml(orderFolio || "")}" readonly /></label>
               <label><span>Fecha</span><input value="${escapeHtml(formatDate(account.fecha))}" readonly /></label>`
            : `<label><span>Sucursal</span><input value="${escapeHtml(account.sucursal || "")}" readonly /></label>
               <label><span>Proveedor</span><input value="${escapeHtml(account.proveedor || "")}" readonly /></label>
               <label><span>Folio</span><input value="${escapeHtml(account.folio || account.dlv || "")}" readonly /></label>
               <label><span>OCP</span><input value="${escapeHtml(orderFolio || "")}" readonly /></label>
               <label><span>PO</span><input value="${escapeHtml(account.po || "Sin PO")}" readonly /></label>
               <label><span>Cliente</span><input value="${escapeHtml(account.cliente || "")}" readonly /></label>
               <label class="wide-field"><span>Proyecto</span><input value="${escapeHtml(account.proyecto || "")}" readonly /></label>
               <label><span>% solicitado por proveedor</span><input value="${escapeHtml(account.porcentajePago || "100%")}" readonly /></label>
               <label><span>Subtotal OCP</span><input value="${formatCurrency(account.subtotalOcp || 0)}" readonly /></label>
               <label><span>Subtotal solicitado</span><input value="${formatCurrency(account.subtotalProgramadoPago || 0)}" readonly /></label>`
        }
        <label><span>Estado del registro</span><input value="${escapeHtml(account.estadoRegistro || account.estado || "Activa")}" readonly /></label>
        <label><span>Estatus de pago</span><input value="${escapeHtml(account.estatusPago || account.estatus || "Pendiente")}" readonly /></label>
        <label><span>Documentación</span><input value="${escapeHtml(account.estatusDocumentacion || "Factura pendiente")}" readonly /></label>
        <label><span>Pendiente</span><input value="${escapeHtml(account.pendiente || "")}" readonly /></label>
        <label><span>Días para pago</span><input value="${displayAccountsPayableDays(account)}" readonly /></label>
        <label><span>Fecha de pago</span><input value="${escapeHtml(formatDate(account.fechaPago))}" readonly /></label>
        <label><span>Monto total</span><input value="${formatCurrency(account.montoTotal ?? account.monto ?? 0)}" readonly /></label>
        <label><span>Total pagado</span><input value="${formatCurrency(account.totalPagado || 0)}" readonly /></label>
        <label><span>Saldo restante</span><input value="${formatCurrency(account.saldoRestante ?? account.monto ?? 0)}" readonly /></label>
      `;

  accountsPayableDetailContent.innerHTML = `
    <section class="budget-detail-card">
      <div class="budget-detail-grid ${isCommission ? "accounts-payable-commission-header-grid" : ""}">
        ${headerFields}
      </div>
    </section>

    ${account.lotePagoId ? `<section class="commission-batch-linked"><div><span>Pago agrupado</span><strong>${escapeHtml(account.lotePagoFolio || `Lote ${account.lotePagoId}`)}</strong><small>Esta cuenta ya fue pagada dentro de un lote consolidado.</small></div><a class="primary-button" href="${escapeHtml(account.lotePagoPdfUrl || `/api/commission-payment-batches/${Number(account.lotePagoId)}/pdf`)}" target="_blank" rel="noreferrer">Ver comprobante del lote</a></section>` : ""}

    <section class="client-quote-module accounts-payable-order">
      <h3>${orderRowsTitle}</h3>
      <div class="purchase-table accounts-quote-table">
        <div class="purchase-table-head ${!isOcgf && !isCommission ? "accounts-payable-ocp-percent-head" : ""}">
          <span>Cantidad</span>
          <span>Presupuesto</span>
          <span>Descripción</span>
          <span>Precio unitario</span>
          ${!isOcgf && !isCommission ? "<span>Total OCP</span><span>% pago</span><span>Monto a pagar</span>" : "<span>Total</span>"}
        </div>
        ${
          orderRows.length
            ? orderRows
                .map(
                  (row) => `
                    <article class="purchase-table-row ${!isOcgf && !isCommission ? "accounts-payable-ocp-percent-row" : ""}">
                      <span>${Number(row.cantidad || 0).toFixed(2)}</span>
                      <span>${escapeHtml(isOcgf || isCommission ? orderLabel : getBudgetBlockLabel(row.presupuesto || ""))}</span>
                      <span>${escapeHtml(row.descripcion || "")}</span>
                      <span>${formatCurrency(row.precioUnitario || 0)}</span>
                      ${!isOcgf && !isCommission
                        ? `<span>${formatCurrency(row.total || 0)}</span><span>${Number(row.porcentajeAplicado ?? 100).toFixed(2)}%</span><span>${formatCurrency(row.montoPagoAplicado || 0)}</span>`
                        : `<span>${formatCurrency(row.total || 0)}</span>`}
                    </article>
                  `
                )
                .join("")
            : `<div class="purchase-table-row purchase-table-empty"><span>${orderRowsEmptyText}</span></div>`
        }
      </div>
      <div class="client-quote-total-row">
        <div></div>
        <div class="accounts-payable-breakdown ${!isCommission && !isOcgf ? "accounts-payable-ocp-breakdown" : ""}">
          ${
            !isCommission && !isOcgf
              ? `
                <span>Subtotal OCP: <strong>${formatCurrency(fullOcpSubtotal)}</strong></span>
                <span>IVA OCP: <strong>${formatCurrency(fullOcpIva)}</strong></span>
                <span>Total OCP proveedor: <strong>${formatCurrency(fullOcpTotal)}</strong></span>
                <span>% solicitado: <strong>${escapeHtml(account.porcentajePago || "100%")}</strong></span>
                <span>Subtotal solicitado: <strong>${formatCurrency(requestedSubtotal)}</strong></span>
                <span>IVA solicitado: <strong>${formatCurrency(requestedIva)}</strong></span>
                <span>Retención del pago: <strong>${formatCurrency(requestedRetention)}</strong></span>
                <span>Pago solicitado: <strong>${formatCurrency(requestedPaymentOriginal)}</strong></span>
              `
              : `
                ${isCommission ? `<span>Comisión: <strong data-occom-summary="commission">${formatCurrency(grossCommissionTotal)}</strong></span>` : ""}
                ${isCommission ? `<span>Aplicado a préstamo/adeudo: <strong data-occom-summary="debt">${formatCurrency(debtAmount)}</strong></span>` : ""}
                <span>Subtotal: <strong ${isCommission ? 'data-occom-summary="subtotal"' : ""}>${formatCurrency(subtotalAmount)}</strong></span>
                <span>IVA: <strong ${isCommission ? 'data-occom-summary="iva"' : ""}>${formatCurrency(ivaAmount)}</strong></span>
                <span>Retenciones: <strong ${isCommission ? 'data-occom-summary="retention"' : ""}>${formatCurrency(retentionAmount)}</strong></span>
                <span>Total: <strong ${isCommission ? 'data-occom-summary="total"' : ""}>${formatCurrency(totalAmount)}</strong></span>
              `
          }
        </div>
      </div>
      ${
        isCommission
          ? `<form class="accounts-payable-discount-form" id="accountsPayableCommissionDiscountForm" data-gross-total="${Number(grossCommissionTotal || 0)}" data-retention="${Number(retentionAmount || 0)}">
              <div class="accounts-payable-discount-row">
                <label>
                  <span>Saldo actual préstamo / adeudo</span>
                  <input value="${formatCurrency(creditBalance)}" readonly />
                </label>
                <label>
                  <span>Aplicar de esta comisión</span>
                  <input
                    class="budget-money-input"
                    name="adeudoMonto"
                    value="${formatCurrency(debtAmount)}"
                    inputmode="decimal"
                    data-credit-max="${Number(creditMaxApplicable || 0)}"
                    ${creditLocked || !creditHasUser ? "readonly" : ""}
                  />
                </label>
                <label class="wide-field">
                  <span>Resultado</span>
                  <input value="${escapeHtml(
                    creditLocked
                      ? `Cobro aplicado. Saldo antes ${formatCurrency(creditBalanceBefore)} · saldo actual ${formatCurrency(creditBalance)}`
                      : creditHasUser
                        ? `Puedes aplicar hasta ${formatCurrency(creditMaxApplicable)} del saldo registrado.`
                        : "La comisión no está ligada a un supervisor registrado."
                  )}" readonly />
                </label>
                <button class="success-button" type="submit" ${creditLocked || !creditHasUser ? "disabled" : ""}>
                  ${creditLocked ? "Cobro aplicado" : "Aplicar al préstamo / adeudo"}
                </button>
              </div>
            </form>`
          : ""
      }
    </section>

    ${isCommission ? "" : renderAccountsPayableSupportDocuments(supportDocuments, "Orden y documentos de soporte")}

    <section class="client-quote-module accounts-payable-payment" id="accountsPayablePaymentSection">
      <h3>${isCommission ? "Datos del supervisor y pago" : "Datos del proveedor y pago"}</h3>
      <div class="budget-detail-grid accounts-payable-provider-grid">
        <label><span>${isCommission ? "Supervisor" : "Proveedor"}</span><input value="${escapeHtml(provider.empresa || account.proveedor || "Sin proveedor")}" readonly /></label>
        <label><span>Banco</span><input value="${escapeHtml(provider.banco || "Sin dato")}" readonly /></label>
        <label><span>Cuenta</span><input value="${escapeHtml(provider.cuenta || "Sin dato")}" readonly /></label>
        <label><span>CLABE</span><input value="${escapeHtml(provider.clabe || "Sin dato")}" readonly /></label>
        <label><span>Pago</span><input value="${escapeHtml(paymentTerms || "Sin dato")}" readonly /></label>
      </div>
      ${
        isCommission
          ? ""
          : `<div class="accounts-payable-section-stack">
              <div class="accounts-payable-financial-summary accounts-payable-financial-summary-four">
                <article><span>Total OCP proveedor</span><strong>${formatCurrency(account.montoTotal ?? account.monto ?? 0)}</strong><small>Importe completo de la compra</small></article>
                <article><span>Pago solicitado pendiente</span><strong>${formatCurrency(requestedPaymentPending)}</strong><small>${escapeHtml(account.porcentajePago || "100%")} · solicitado originalmente ${formatCurrency(requestedPaymentOriginal)}</small></article>
                <article><span>Abonado</span><strong>${formatCurrency(account.totalPagado || 0)}</strong><small>Pagos aplicados al total</small></article>
                <article><span>Saldo restante</span><strong>${formatCurrency(payableRemaining)}</strong><small>Importe que aún se debe al proveedor</small></article>
              </div>

              <section class="accounts-payable-panel">
                <div class="accounts-payable-panel-header">
                  <div>
                    <h4>${payableRemaining > 0.004 ? "Registrar abono" : "Cuenta cubierta"}</h4>
                    <p>${
                      payableRemaining > 0.004
                        ? "El total del proveedor se conserva completo. Cada abono reduce el saldo y mantiene visible el restante."
                        : "El saldo total de esta OCP ya fue cubierto. El historial conserva todos los movimientos."
                    }</p>
                  </div>
                </div>
                <form class="accounts-payable-payment-order-form accounts-payable-abono-form ${payableRemaining <= 0.004 ? "hidden" : ""}" id="accountsPayablePaymentOrderForm" data-saldo-restante="${payableRemaining}">
                  <label><span>Monto del abono</span><input class="budget-money-input" name="monto" value="${suggestedAbono > 0.004 ? formatCurrency(suggestedAbono) : ""}" placeholder="$0.00" required /></label>
                  <label><span>Método de pago</span><input name="metodoPago" placeholder="Transferencia, cheque..." /></label>
                  <label><span>Referencia</span><input name="referencia" maxlength="120" placeholder="SPEI, folio o número de cheque" /></label>
                  <label class="wide-field"><span>Observaciones</span><input name="observaciones" maxlength="500" placeholder="Notas del abono" /></label>
                  <div class="accounts-payable-inline-hint">${
                    requestedPaymentPending > 0.004
                      ? `Pago solicitado pendiente: <strong>${formatCurrency(requestedPaymentPending)}</strong> · Saldo total proveedor: <strong>${formatCurrency(payableRemaining)}</strong>`
                      : `La solicitud porcentual actual ya está cubierta. Saldo total proveedor: <strong>${formatCurrency(payableRemaining)}</strong>. Captura manualmente el siguiente abono.`
                  }</div>
                  <div class="accounts-payable-form-actions accounts-payable-form-actions-full">
                    <button class="success-button" type="submit">Registrar abono</button>
                  </div>
                </form>
              </section>

              ${
                Number(account.saldoRestante ?? account.monto ?? 0) > 0.004
                  ? `<section class="accounts-payable-next-balance">
                      <div>
                        <span>Siguiente saldo pendiente</span>
                        <strong>${formatCurrency(account.saldoRestante ?? account.monto ?? 0)}</strong>
                      </div>
                      <div>
                        <small>Proveedor</small><b>${escapeHtml(provider.empresa || account.proveedor || "Sin proveedor")}</b>
                      </div>
                      <div>
                        <small>OCP</small><b>${escapeHtml(account.ocp || orderFolio || "—")}</b>
                      </div>
                      <div>
                        <small>Proyecto</small><b>${escapeHtml(account.proyecto || "—")}</b>
                      </div>
                    </section>`
                  : `<section class="accounts-payable-next-balance is-settled"><span>Cuenta cubierta</span><strong>${formatCurrency(0)}</strong></section>`
              }

              <section class="accounts-payable-panel payment-order-history">
                <div class="accounts-payable-panel-header">
                  <div>
                    <h4>Historial de abonos</h4>
                    <p>Cada abono conserva el saldo anterior y el saldo restante para mantener trazabilidad.</p>
                  </div>
                </div>
                ${renderPaymentOrderHistory(paymentOrders)}
              </section>
            </div>`
      }
    </section>

    ${
      isCommission
        ? `<section class="client-quote-module">
            <h3>Historial de OCCOM</h3>
            <article class="client-quote-history-row">
              <div>
                <strong>${escapeHtml(orderFolio || "OCCOM")}</strong>
                <span>
                  ${escapeHtml(formatDate(account.createdAt))} · ${escapeHtml(account.supervisor || account.proveedor || "")} ·
                  ${escapeHtml(account.empresa || "")} · ${formatCurrency(account.monto || 0)}
                </span>
              </div>
              <div class="client-quote-history-actions">
                <a class="small-button" href="/api/accounts-payable/commissions/${commissionPdfId}/payment-pdf?payable=1${commissionMonthQuery}" target="_blank" rel="noreferrer">Ver PDF</a>
              </div>
            </article>
          </section>`
        : ""
    }
    ${isCommission ? renderAccountsPayableCommissionAdjustmentHistory(discountHistory) : ""}

    <section class="client-quote-module accounts-payable-files ${hasPartialSupplierPayment ? "accounts-payable-files-partial" : ""}">
      <div class="accounts-payable-files-heading">
        <div>
          <h3>Archivos de pago</h3>
          <p>${
            hasPartialSupplierPayment
              ? `Este pago parcial ya quedó registrado por <strong>${formatCurrency(totalPaidAmount)}</strong>. Puedes cargar aquí su factura, comprobante y complemento sin afectar el saldo pendiente de <strong>${formatCurrency(payableRemaining)}</strong>.`
              : "Carga la factura, el comprobante y el complemento que correspondan a esta cuenta."
          }</p>
          <small>Puedes seleccionar varios archivos a la vez; cada uno queda ligado a este proyecto y a esta cuenta por pagar.</small>
        </div>
        ${hasPartialSupplierPayment ? `<span class="accounts-payable-paid-chip">Pago registrado · ${formatCurrency(totalPaidAmount)}</span>` : ""}
      </div>
      <form class="accounts-receivable-upload-form" id="accountsPayableUploadForm">
        <label>
          <span>Tipo de archivo</span>
          <select name="tipo">${fileOptions}</select>
        </label>
        <label class="wide-field">
          <span>Archivo</span>
          <input name="archivo" type="file" />
        </label>
        <button class="success-button" type="submit">Cargar archivo</button>
      </form>
      <div id="accountsPayableFilesList">
        ${renderAccountsPayableFiles(files)}
      </div>
    </section>
  `;
}

function updateAccountsPayableCommissionDiscountSummary(form) {
  if (!form) return;
  const root = form.closest(".accounts-payable-order") || accountsPayableDetailContent;
  const grossTotal = Number(form.dataset.grossTotal || 0);
  const retention = Number(form.dataset.retention || 0);
  const debtInput = form.elements.adeudoMonto;
  const debt = parseCurrency(debtInput?.value || 0);
  const creditMax = Number(debtInput?.dataset.creditMax || grossTotal);
  if (debtInput && !debtInput.readOnly) {
    debtInput.setCustomValidity(
      debt > creditMax + 0.009 ? `Máximo aplicable: ${formatCurrency(creditMax)}.` : ""
    );
  }
  const subtotal = Math.max(Math.round((grossTotal - debt) * 100) / 100, 0);
  const iva = Math.round(subtotal * 0.16 * 100) / 100;
  const total = Math.max(Math.round((subtotal + iva - retention) * 100) / 100, 0);
  const summaries = {
    commission: grossTotal,
    debt,
    subtotal,
    iva,
    retention,
    total
  };

  Object.entries(summaries).forEach(([key, value]) => {
    const target = root.querySelector(`[data-occom-summary="${key}"]`);
    if (target) target.textContent = formatCurrency(value);
  });
}

function getAccountsPayableCommissionQuery(prefix = "?") {
  if (accountsPayableCommissionMonth && !accountsPayableCommissionMonth.value) {
    accountsPayableCommissionMonth.value = getCurrentMonthValue();
  }
  const month = accountsPayableCommissionMonth?.value || "";
  return month ? `${prefix}commissionMonth=${encodeURIComponent(month)}` : "";
}

async function openAccountsPayableDetail(orderId, source = "ocp", options = {}) {
  if (options.persist !== false) saveDetailLocation("cuentas-pagar", "detail", orderId, source);
  activeAccountsPayableOrderId = orderId;
  activeAccountsPayableSource = source;
  accountsPayableListView.classList.add("hidden");
  accountsPayableCommissionBatchSelectView?.classList.add("hidden");
  accountsPayableCommissionBatchReviewView?.classList.add("hidden");
  accountsPayableDetailView.classList.remove("hidden");
  accountsPayableDetailContent.innerHTML = `<div class="empty-state">Cargando cuenta por pagar...</div>`;

  try {
    const endpoint =
      source === "ocgf"
        ? `/api/accounts-payable/ocgf/${orderId}`
        : source === "occom"
          ? `/api/accounts-payable/commissions/${encodeURIComponent(String(orderId))}${getAccountsPayableCommissionQuery()}`
          : `/api/accounts-payable/${orderId}`;
    const data = await api(endpoint);
    renderAccountsPayableDetail(data);
  } catch (error) {
    accountsPayableDetailContent.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function closeAccountsPayableDetail() {
  activeAccountsPayableOrderId = null;
  activeAccountsPayableSource = "ocp";
  saveModuleLocation("cuentas-pagar");
  accountsPayableDetailView.classList.add("hidden");
  accountsPayableListView.classList.remove("hidden");
  loadAccountsPayableModule();
}

function renderPurchaseHeader(budget) {
  const display = getBudgetDisplayFields(budget);
  return `
    <section class="budget-detail-card">
      <div class="budget-detail-grid">
        <label><span>Empresa</span><input value="${escapeHtml(budget.empresa || "")}" readonly /></label>
        <label><span>Sucursal</span><input value="${escapeHtml(display.sucursal || "")}" readonly /></label>
        <label><span>Cliente/Usuario</span><input value="${escapeHtml(display.clienteUsuario || "")}" readonly /></label>
        <label><span>Área</span><input value="${escapeHtml(budget.area || "")}" readonly /></label>
        <label class="wide-field"><span>Título del proyecto</span><input value="${escapeHtml(budget.tituloProyecto || "")}" readonly /></label>
        <label><span>DLV</span><input value="${escapeHtml(budget.folio || "")}" readonly /></label>
        <label><span>PO</span><input value="${escapeHtml(budget.po || "")}" readonly /></label>
        <label><span>Estatus</span><input value="${escapeHtml(budget.estatus || "")}" readonly /></label>
      </div>
    </section>
    <section class="client-quote-module" id="supplierOrderModule"></section>
  `;
}

async function openPurchaseDetail(budgetId, options = {}) {
  if (options.persist !== false) saveDetailLocation("compras", "purchase-detail", budgetId);
  activeBudgetDetailId = budgetId;
  activeSupplierOrderContextId = options.orderId ? Number(options.orderId) : null;
  purchasesListView.classList.add("hidden");
  purchaseDetailView.classList.remove("hidden");
  purchaseDetailContent.innerHTML = `<div class="empty-state">Cargando compras...</div>`;

  try {
    const data = await api(`/api/budgets/${budgetId}/purchase-flow`);
    purchaseDetailContent.innerHTML = renderPurchaseHeader(data.budget);
    await loadPurchaseFlowModule(budgetId);
  } catch (error) {
    purchaseDetailContent.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

async function openPurchaseDetailByFolio() {
  const folio = window.prompt("Ingresa el folio del presupuesto para crear una nueva OCP:");
  const cleanFolio = String(folio || "").trim();
  if (!cleanFolio) return;
  try {
    const data = await api(`/api/purchases/open-by-folio?folio=${encodeURIComponent(cleanFolio)}`);
    await openPurchaseDetail(Number(data.budgetId), { orderId: null });
  } catch (error) {
    showErrorToast(error, "No se pudo abrir el presupuesto para compras.");
  }
}

function closePurchaseDetail() {
  activeBudgetDetailId = null;
  activeSupplierOrderContextId = null;
  saveModuleLocation("compras");
  purchaseDetailView.classList.add("hidden");
  purchasesListView.classList.remove("hidden");
  loadPurchasesModule();
}

async function loadSession() {
  try {
    const data = await api("/api/session");
    if (data.user) showApp(data.user);
  } catch (_error) {
    showLogin();
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("");
  setLoading(true);

  const formData = new FormData(loginForm);
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  try {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });

    loginForm.reset();
    showApp(data.user, { greet: true });
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
});

passwordToggle?.addEventListener("click", () => {
  const shouldShow = passwordInput.type === "password";
  passwordInput.type = shouldShow ? "text" : "password";
  passwordToggle.setAttribute("aria-pressed", String(shouldShow));
  passwordToggle.setAttribute("aria-label", shouldShow ? "Ocultar contraseña" : "Mostrar contraseña");
  passwordToggle.innerHTML = `<i class="${shouldShow ? "ri-eye-off-line" : "ri-eye-line"}" aria-hidden="true"></i>`;
  passwordInput.focus();
});

logoutButton.addEventListener("click", async () => {
  try {
    await api("/api/auth/logout", { method: "POST" });
  } finally {
    showLogin();
  }
});

themeToggleButton?.addEventListener("click", toggleTheme);

sidebarToggleButton?.addEventListener("click", () => {
  setSidebarCollapsed(!appView.classList.contains("sidebar-collapsed"));
});

appView?.addEventListener("click", (event) => {
  if (!window.matchMedia?.("(max-width: 960px)")?.matches) return;
  if (appView.classList.contains("sidebar-collapsed")) return;
  if (event.target.closest("#mainNav") || event.target.closest("#sidebarToggleButton")) return;
  setSidebarCollapsed(true);
});

window.addEventListener("popstate", async (event) => {
  if (!currentUser) return;
  const location = normalizeAppLocation(event.state?.dalvoLocation || readAppLocationFromUrl());
  if (!location) return;
  isApplyingHistoryState = true;
  try {
    const appliedLocation = await applyAppLocation(location, { persist: false });
    if (appliedLocation) saveAppLocation(appliedLocation, { history: false });
  } finally {
    isApplyingHistoryState = false;
  }
});

inicioModule?.addEventListener("click", (event) => {
  const launcherAction = event.target.closest("[data-home-action='launcher']");
  if (launcherAction) {
    openModuleLauncher();
    return;
  }
  const moduleButton = event.target.closest("[data-home-module]");
  if (!moduleButton) return;
  setActiveModule(moduleButton.dataset.homeModule, { homeFilter: moduleButton.dataset.homeFilter || "" });
});

function hideWorkspaceModules() {
  [
    inicioModule,
    usuariosModule,
    prestamosModule,
    sucursalesModule,
    empresasModule,
    clientesModule,
    proveedoresModule,
    listaPreciosModule,
    gastosFijosModule,
    presupuestoModule,
    comprasModule,
    cuentasCobrarModule,
    cuentasPagarModule,
    comisionesModule,
    tareasModule,
    reportesModule,
    exportacionesModule,
    recuperacionDocumentalModule,
    placeholderModule
  ].forEach((module) => module.classList.remove("active"));
}

function showBudgetsListView() {
  restoreBudgetInlineForm();
  activeBudgetDetailId = null;
  budgetDetailView.classList.add("hidden");
  budgetsListView.classList.remove("hidden");
}

function showPurchasesListView() {
  activeBudgetDetailId = null;
  activeSupplierOrderContextId = null;
  activePurchaseFixedExpenseId = null;
  activePurchaseFixedExpenseData = null;
  purchaseDetailView.classList.add("hidden");
  purchaseFixedExpenseDetailView.classList.add("hidden");
  purchasesListView.classList.remove("hidden");
}

function applyHomeModuleFilter(moduleName, filterName) {
  const filter = String(filterName || "").trim();
  if (!filter) return;

  if (moduleName === "presupuesto") {
    if (budgetsSearch) {
      budgetsSearch.value = filter === "approval" ? "En espera de aprobación" : filter === "active" ? "Abierta" : "";
    }
    return;
  }

  if (moduleName === "cuentas-cobrar") {
    if (accountsReceivableSearch) accountsReceivableSearch.value = "";
    if (accountsReceivableFilterCompany) accountsReceivableFilterCompany.value = "";
    if (accountsReceivableFilterStatus) accountsReceivableFilterStatus.value = "";
    if (accountsReceivableFilterCollection) accountsReceivableFilterCollection.value = "all";
    if (accountsReceivableFilterBalance) accountsReceivableFilterBalance.value = "all";
    if (accountsReceivableFilterDateFrom) accountsReceivableFilterDateFrom.value = "";
    if (accountsReceivableFilterDateTo) accountsReceivableFilterDateTo.value = "";

    if (filter === "collected-month") {
      const range = getMonthDateRange();
      if (accountsReceivableFilterCollection) accountsReceivableFilterCollection.value = "collected";
      if (accountsReceivableFilterDateFrom) accountsReceivableFilterDateFrom.value = range.from;
      if (accountsReceivableFilterDateTo) accountsReceivableFilterDateTo.value = range.to;
    } else if (filter === "pending") {
      if (accountsReceivableFilterCollection) accountsReceivableFilterCollection.value = "pending";
      if (accountsReceivableFilterBalance) accountsReceivableFilterBalance.value = "with";
    }
    return;
  }

  if (moduleName === "cuentas-pagar") {
    if (accountsPayableSearch) accountsPayableSearch.value = "";
    if (accountsPayableFilterSource) accountsPayableFilterSource.value = "all";
    if (accountsPayableFilterProvider) accountsPayableFilterProvider.value = "";
    if (accountsPayableFilterBranch) accountsPayableFilterBranch.value = "";
    if (accountsPayableFilterTerms) accountsPayableFilterTerms.value = "all";
    if (accountsPayableFilterPayment) accountsPayableFilterPayment.value = filter === "pending" ? "pending" : "all";
    if (accountsPayableFilterDateFrom) accountsPayableFilterDateFrom.value = "";
    if (accountsPayableFilterDateTo) accountsPayableFilterDateTo.value = "";
    return;
  }

  if (moduleName === "reportes" && filter === "paid-month") {
    reportsPaidMonth = getCurrentMonthValue();
  }
}

function setActiveModule(moduleName, options = {}) {
  restoreBudgetInlineForm();
  if (!canAccessModule(moduleName)) {
    moduleName = firstAllowedModule();
  }
  applyHomeModuleFilter(moduleName, options.homeFilter);
  currentModuleName = moduleName;
  if (options.persist !== false) saveModuleLocation(moduleName);

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.module === moduleName);
  });
  if (options.keepSidebarOpen !== true) closeSidebarOnCompactScreens();

  if (moduleName === "inicio") {
    hideWorkspaceModules();
    inicioModule.classList.add("active");
    loadHomeModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "usuarios") {
    hideWorkspaceModules();
    usuariosModule.classList.add("active");
    loadUsersModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "prestamos") {
    hideWorkspaceModules();
    prestamosModule.classList.add("active");
    showUserCreditsListView({ persist: false });
    loadUserCreditsModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "sucursales") {
    hideWorkspaceModules();
    sucursalesModule.classList.add("active");
    loadClientsModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "empresas") {
    hideWorkspaceModules();
    empresasModule.classList.add("active");
    loadClientsModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "clientes") {
    hideWorkspaceModules();
    clientesModule.classList.add("active");
    loadClientsModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "proveedores") {
    hideWorkspaceModules();
    proveedoresModule.classList.add("active");
    loadProvidersModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "lista-precios") {
    hideWorkspaceModules();
    listaPreciosModule.classList.add("active");
    loadPriceListModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "gastos-fijos") {
    hideWorkspaceModules();
    gastosFijosModule.classList.add("active");
    loadFixedExpensesModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "presupuesto") {
    hideWorkspaceModules();
    presupuestoModule.classList.add("active");
    showBudgetsListView();
    loadBudgetsModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "compras") {
    hideWorkspaceModules();
    comprasModule.classList.add("active");
    showPurchasesListView();
    loadPurchasesModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "cuentas-cobrar") {
    hideWorkspaceModules();
    cuentasCobrarModule.classList.add("active");
    loadAccountsReceivableModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "cuentas-pagar") {
    hideWorkspaceModules();
    cuentasPagarModule.classList.add("active");
    loadAccountsPayableModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "comisiones") {
    hideWorkspaceModules();
    comisionesModule.classList.add("active");
    loadCommissionsModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "tareas") {
    hideWorkspaceModules();
    tareasModule.classList.add("active");
    loadTasksModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "reportes") {
    hideWorkspaceModules();
    reportesModule.classList.add("active");
    loadReportsModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "exportaciones") {
    hideWorkspaceModules();
    exportacionesModule.classList.add("active");
    loadExportacionesModule();
    closeModuleLauncher();
    return;
  }

  if (moduleName === "recuperacion-documental") {
    hideWorkspaceModules();
    recuperacionDocumentalModule.classList.add("active");
    loadRecuperacionDocumentalModule();
    closeModuleLauncher();
    return;
  }

  const selectedItem = document.querySelector(`.nav-item[data-module="${moduleName}"]`);
  moduleTitle.textContent = selectedItem?.textContent.trim() || "Módulo";
  moduleDescription.textContent =
    moduleCopy[moduleName] || "La estructura de este módulo se integrará en el siguiente paso.";
  hideWorkspaceModules();
  placeholderModule.classList.add("active");
  closeModuleLauncher();
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    setActiveModule(item.dataset.module);
    if (item.closest("#mainNav")) setSidebarCollapsed(true);
  });
});

sidebarOpenButtons.forEach((button) => {
  button.addEventListener("click", () => setSidebarCollapsed(false));
});

sidebarScrim?.addEventListener("click", () => setSidebarCollapsed(true));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && appView?.classList.contains("sidebar-expanded")) {
    setSidebarCollapsed(true);
  }
});

mainNav?.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    if (mainNav.scrollWidth <= mainNav.clientWidth) return;
    event.preventDefault();
    mainNav.scrollLeft += event.deltaY;
  },
  { passive: false }
);

launcherButton.addEventListener("click", () => {
  openModuleLauncher();
});

launcherCloseButton.addEventListener("click", closeModuleLauncher);

moduleLauncher.addEventListener("click", (event) => {
  if (event.target === moduleLauncher) closeModuleLauncher();
});

function filterLauncherCards(term) {
  const normalized = term.trim().toLowerCase();
  launcherCards.forEach((card) => {
    const blocked = !canAccessModule(card.dataset.module);
    const haystack = `${card.textContent} ${card.dataset.search || ""}`.toLowerCase();
    card.classList.toggle("hidden", blocked);
    card.classList.toggle("filtered-out", !blocked && normalized && !haystack.includes(normalized));
  });
}

moduleLauncherSearch.addEventListener("input", () => {
  filterLauncherCards(moduleLauncherSearch.value);
});

launcherCards.forEach((card) => {
  card.addEventListener("click", () => {
    setActiveModule(card.dataset.module);
  });
});

quickCreateButton.addEventListener("click", openQuickCreate);
assistantButton?.addEventListener("click", openAssistant);
assistantCloseButton?.addEventListener("click", closeAssistant);

assistantForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  askDalvoAssistant(assistantQuestion.value);
});

assistantVoiceButton?.addEventListener("click", startAssistantVoiceInput);

quickCreateSearch?.addEventListener("input", () => {
  filterQuickCreateActions(quickCreateSearch.value);
});

quickCreateOverlay?.addEventListener("click", (event) => {
  if (event.target === quickCreateOverlay) {
    closeQuickCreate();
    return;
  }
  const button = event.target.closest("[data-quick-module]");
  if (button) runQuickCreateAction(button);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !quickCreateOverlay?.classList.contains("hidden")) {
    closeQuickCreate();
  }
});

globalSearchInput.addEventListener("input", () => {
  clearTimeout(globalSearchTimer);
  globalSearchTimer = setTimeout(runGlobalSearch, 250);
});

globalSearchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  clearTimeout(globalSearchTimer);
  runGlobalSearch();
});

globalSearchResults?.addEventListener("click", async (event) => {
  const resultButton = event.target.closest("[data-global-result-module]");
  if (!resultButton) return;
  const moduleName = resultButton.dataset.globalResultModule;
  if (!moduleName) return;
  try {
    await openGlobalSearchResult(moduleName, resultButton.dataset.globalResultSearch || globalSearchInput.value);
  } catch (error) {
    globalSearchResults.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    globalSearchResults.classList.remove("hidden");
  }
});

tasksSearch?.addEventListener("input", () => {
  window.clearTimeout(tasksSearchTimer);
  tasksSearchTimer = window.setTimeout(loadTasksModule, 220);
});

openTaskFormButton?.addEventListener("click", () => {
  resetTaskForm();
  taskForm?.scrollIntoView({ behavior: "smooth", block: "start" });
  taskForm?.titulo?.focus();
});

taskCancelEditButton?.addEventListener("click", resetTaskForm);

taskForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!taskForm.reportValidity()) return;
  if (taskFormStatus) taskFormStatus.textContent = "Guardando tarea...";
  try {
    const payload = collectTaskFormPayload();
    const path = editingTaskId ? `/api/tasks/${editingTaskId}` : "/api/tasks";
    const method = editingTaskId ? "PUT" : "POST";
    await api(path, { method, body: JSON.stringify(payload) });
    if (taskFormStatus) taskFormStatus.textContent = "Tarea guardada.";
    resetTaskForm();
    await loadTasksModule();
    await refreshNavigationBadges();
  } catch (error) {
    if (taskFormStatus) taskFormStatus.textContent = error.message;
  }
});

tasksList?.addEventListener("click", async (event) => {
  const editButton = event.target.closest("[data-task-edit]");
  const statusButton = event.target.closest("[data-task-status]");
  const deleteButton = event.target.closest("[data-task-delete]");
  if (editButton) {
    const task = tasksCache.find((item) => Number(item.id) === Number(editButton.dataset.taskEdit));
    if (task) fillTaskForm(task);
    return;
  }
  if (statusButton) {
    try {
      await api(`/api/tasks/${statusButton.dataset.taskStatus}/status`, {
        method: "PATCH",
        body: JSON.stringify({ estatus: statusButton.dataset.status })
      });
      await loadTasksModule();
      await refreshNavigationBadges();
    } catch (error) {
      tasksList.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
    return;
  }
  if (deleteButton) {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    try {
      await api(`/api/tasks/${deleteButton.dataset.taskDelete}`, { method: "DELETE" });
      await loadTasksModule();
      await refreshNavigationBadges();
    } catch (error) {
      tasksList.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
  }
});

document.addEventListener("keydown", (event) => {
  const isSearchShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
  if (isSearchShortcut) {
    event.preventDefault();
    globalSearchInput.focus();
    return;
  }

  if (event.key === "Escape") {
    closeModuleLauncher();
    closeUserModal();
    closeClientModal();
    closeClientDocsModal();
    closeProviderModal();
    closeProviderDocsModal();
    closeFixedExpenseModal();
    closeBudgetModal();
    globalSearchResults.classList.add("hidden");
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".global-search")) {
    globalSearchResults.classList.add("hidden");
  }
});

usersSearch.addEventListener("input", () => {
  clearTimeout(usersSearchTimer);
  usersSearchTimer = setTimeout(loadUsers, 250);
});

clientsSearch.addEventListener("input", () => {
  clearTimeout(clientsSearchTimer);
  clientsSearchTimer = setTimeout(loadClients, 250);
});

providersSearch.addEventListener("input", () => {
  clearTimeout(providersSearchTimer);
  providersSearchTimer = setTimeout(loadProviders, 250);
});

pricesSearch.addEventListener("input", () => {
  clearTimeout(pricesSearchTimer);
  pricesSearchTimer = setTimeout(loadPriceItems, 250);
});

fixedExpensesSearch.addEventListener("input", () => {
  clearTimeout(fixedExpensesSearchTimer);
  fixedExpensesSearchTimer = setTimeout(loadFixedExpenses, 250);
});

budgetsSearch.addEventListener("input", () => {
  clearTimeout(budgetsSearchTimer);
  budgetsSearchTimer = setTimeout(loadBudgets, 250);
});

commissionsSearch?.addEventListener("input", () => {
  clearTimeout(commissionsSearchTimer);
  commissionsSearchTimer = setTimeout(() => {
    paginationState.commissionsPending = 1;
    paginationState.commissionsCreated = 1;
    loadCommissionsModule();
  }, 250);
});

[commissionsCollectionFilter, commissionsSupervisorFilter].forEach((control) => {
  control?.addEventListener("change", () => {
    paginationState.commissionsPending = 1;
    paginationState.commissionsCreated = 1;
    renderCommissions(commissionsCache);
  });
});

commissionsPeriodFilter?.addEventListener("change", () => {
  if (commissionsPeriodFilter.value !== "custom") {
    if (commissionsDateFromFilter) commissionsDateFromFilter.value = "";
    if (commissionsDateToFilter) commissionsDateToFilter.value = "";
  }
  paginationState.commissionsPending = 1;
  paginationState.commissionsCreated = 1;
  renderCommissions(commissionsCache);
});

[commissionsDateFromFilter, commissionsDateToFilter].forEach((control) => {
  control?.addEventListener("change", () => {
    if (commissionsPeriodFilter) commissionsPeriodFilter.value = "custom";
    paginationState.commissionsPending = 1;
    paginationState.commissionsCreated = 1;
    renderCommissions(commissionsCache);
  });
});

createManualCommissionButton?.addEventListener("click", async () => {
  const folio = prompt("Captura el folio del presupuesto para crear una comisión extraordinaria:");
  if (!folio || !String(folio).trim()) return;
  createManualCommissionButton.disabled = true;
  const originalText = createManualCommissionButton.textContent;
  createManualCommissionButton.textContent = "Cargando...";
  try {
    const data = await api(`/api/commissions/budget-by-folio?folio=${encodeURIComponent(String(folio).trim())}`);
    renderManualCommissionDetail(data.budget || {});
  } catch (error) {
    commissionsPendingRows?.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  } finally {
    createManualCommissionButton.disabled = false;
    createManualCommissionButton.textContent = originalText;
  }
});


openUserCreditModalButton?.addEventListener("click", () => openUserCreditModal());
userCreditModalClose?.addEventListener("click", closeUserCreditModal);
cancelUserCreditButton?.addEventListener("click", closeUserCreditModal);
userCreditPaymentModalClose?.addEventListener("click", closeUserCreditPaymentModal);
cancelUserCreditPaymentButton?.addEventListener("click", closeUserCreditPaymentModal);
backToUserCreditsButton?.addEventListener("click", () => showUserCreditsListView());

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (userCreditPaymentModal && !userCreditPaymentModal.classList.contains("hidden")) closeUserCreditPaymentModal();
  if (userCreditModal && !userCreditModal.classList.contains("hidden")) closeUserCreditModal();
});

userCreditsSearch?.addEventListener("input", () => {
  clearTimeout(userCreditsSearchTimer);
  userCreditsSearchTimer = setTimeout(loadUserCredits, 250);
});
userCreditsStatusFilter?.addEventListener("change", loadUserCredits);

userCreditsList?.addEventListener("click", async (event) => {
  const detailButton = event.target.closest(".user-credit-detail-button");
  const paymentButton = event.target.closest(".user-credit-payment-button");
  if (detailButton) {
    await openUserCreditDetail(Number(detailButton.dataset.userId));
    return;
  }
  if (paymentButton) {
    const credit = userCreditsCache.find((item) => Number(item.id) === Number(paymentButton.dataset.creditId));
    if (credit) openUserCreditPaymentModal(credit);
  }
});

userCreditDetailContent?.addEventListener("click", (event) => {
  const createButton = event.target.closest(".user-credit-create-button");
  const paymentButton = event.target.closest(".user-credit-payment-button");
  if (createButton) {
    openUserCreditModal(Number(createButton.dataset.userId));
    return;
  }
  if (paymentButton) {
    const creditId = Number(paymentButton.dataset.creditId);
    const credit = activeUserCreditDetailData?.credits?.find((item) => Number(item.id) === creditId);
    if (credit) {
      const user = activeUserCreditDetailData?.user || {};
      const usuarioNombre = `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario || "";
      openUserCreditPaymentModal({ ...credit, usuarioNombre });
    }
  }
});

openUserModalButton.addEventListener("click", () => {
  openUserModal();
});

userModalClose.addEventListener("click", closeUserModal);
cancelUserButton.addEventListener("click", closeUserModal);

roleSelect.addEventListener("change", applyRolePermissionDefaults);

userForm.addEventListener("input", (event) => {
  const field = event.target.closest("input, select, textarea");
  field?.closest("label")?.classList.remove("user-field-invalid");
  field?.removeAttribute("aria-invalid");
});

userForm.addEventListener("change", (event) => {
  const field = event.target.closest("input, select, textarea");
  field?.closest("label")?.classList.remove("user-field-invalid");
  field?.removeAttribute("aria-invalid");
});

toggleProjectOwnerAuditButton?.addEventListener("click", async () => {
  if (!canManageProjectOwnerAudit()) return;
  const opening = projectOwnerAuditPanel?.classList.contains("hidden");
  projectOwnerAuditPanel?.classList.toggle("hidden", !opening);
  if (!opening) return;
  try {
    await loadProjectOwnerAudit();
  } catch (error) {
    if (projectOwnerAuditStatus) projectOwnerAuditStatus.textContent = error.message;
  }
});

projectOwnerSourceSelect?.addEventListener("change", renderProjectOwnerAuditSelection);
projectOwnerProjectList?.addEventListener("click", (event) => {
  if (!event.target.closest("[data-project-owner-select-all]")) return;
  projectOwnerProjectList.querySelectorAll("[data-project-owner-project]").forEach((input) => {
    input.checked = true;
  });
});

applyProjectOwnerAuditButton?.addEventListener("click", async () => {
  const source = selectedProjectOwnerSource();
  const targetUserId = Number(projectOwnerTargetSelect?.value || 0);
  const projectIds = [...(projectOwnerProjectList?.querySelectorAll("[data-project-owner-project]:checked") || [])]
    .map((input) => Number(input.value))
    .filter(Boolean);
  if (!source || !targetUserId || !projectIds.length) {
    if (projectOwnerAuditStatus) projectOwnerAuditStatus.textContent = "Selecciona el origen, el usuario principal y al menos un proyecto.";
    return;
  }
  const target = projectOwnerAuditCache.users.find((user) => Number(user.id) === targetUserId);
  const targetName = target?.nombreCompleto || `${target?.nombre || ""} ${target?.apellido || ""}`.trim() || target?.usuario || "usuario principal";
  if (!confirm(`Se asignarán ${projectIds.length} proyecto(s) de ${source.label || source.alias || "este registro"} a ${targetName}. ¿Continuar?`)) return;

  applyProjectOwnerAuditButton.disabled = true;
  applyProjectOwnerAuditButton.textContent = "Aplicando...";
  try {
    const data = await api("/api/project-owner-audit/assign", {
      method: "POST",
      body: JSON.stringify({
        sourceKind: source.kind,
        sourceUserId: Number(source.sourceUserId || 0) || null,
        alias: source.alias || "",
        targetUserId,
        projectIds,
        normalizeLegacyName: source.kind === "legacy" ? Boolean(projectOwnerNormalizeLegacy?.checked) : false,
        deactivateSource: source.kind === "user" ? Boolean(projectOwnerDeactivateSource?.checked) : false
      })
    });
    await Promise.all([loadUsers(), loadProjectOwnerAudit()]);
    if (projectOwnerAuditStatus) projectOwnerAuditStatus.textContent = `Listo: ${Number(data.reassigned || 0)} proyecto(s) reasignados al usuario principal.`;
    if (budgetsCache.length) loadBudgets().catch(() => {});
  } catch (error) {
    if (projectOwnerAuditStatus) projectOwnerAuditStatus.textContent = error.message;
  } finally {
    applyProjectOwnerAuditButton.disabled = false;
    applyProjectOwnerAuditButton.textContent = "Aplicar consolidación";
  }
});

usersCardList.addEventListener("click", async (event) => {
  const editButton = event.target.closest(".edit-user-button");
  const deleteButton = event.target.closest(".delete-user-button");

  if (editButton) {
    const user = usersCache.find((item) => item.id === Number(editButton.dataset.userId));
    if (user) openUserModal(user);
    return;
  }

  if (deleteButton) {
    const userId = Number(deleteButton.dataset.userId);
    const user = usersCache.find((item) => item.id === userId);
    const label = user ? user.usuario : "este usuario";
    if (!confirm(`¿Eliminar ${label}?`)) return;

    try {
      await api(`/api/users/${userId}`, { method: "DELETE" });
      await loadUsers();
    } catch (error) {
      usersCardList.insertAdjacentHTML(
        "afterbegin",
        `<div class="empty-state">${escapeHtml(error.message)}</div>`
      );
    }
  }
});

openClientModalButton.addEventListener("click", async () => {
  try {
    if (!clientDirectoryCatalogCache.length || !clientBranchLocationsCache.length) {
      const data = await api("/api/clients?search=");
      clientDirectoryCatalogCache = data.clients || [];
      clientBranchLocationsCache = data.branchLocations || [];
      locationCatalogCache = data.locationCatalog || [];
      syncClientCompanyOptions();
      syncLocationCatalogOptions();
    }
  } catch (_error) {
    // El formulario sigue disponible aunque no se pueda precargar el catálogo.
  }
  openClientModal();
});

clientCompanyInput?.addEventListener("change", () => {
  syncClientBranchOptions();
});
clientBranchCompanyInput?.addEventListener("change", () => {
  updateClientBranchNewCompanyVisibility();
  syncClientCompanySettings();
  if (clientBranchCompanyInput.value === "__new__") clientBranchNewCompanyInput?.focus();
});

openLocationCatalogModalButton?.addEventListener("click", () => openLocationCatalogModal());
locationCatalogModalClose?.addEventListener("click", closeLocationCatalogModal);
cancelLocationCatalogButton?.addEventListener("click", closeLocationCatalogModal);
locationCatalogModal?.addEventListener("click", (event) => {
  if (event.target === locationCatalogModal) closeLocationCatalogModal();
});
locationCatalogList?.addEventListener("click", async (event) => {
  const editButton = event.target.closest(".edit-location-catalog-button");
  const deleteButton = event.target.closest(".delete-location-catalog-button");
  if (editButton) {
    const location = locationCatalogCache.find((item) => Number(item.id) === Number(editButton.dataset.locationId));
    if (location) openLocationCatalogModal(location);
    return;
  }
  if (deleteButton) {
    const locationId = Number(deleteButton.dataset.locationId || 0);
    const location = locationCatalogCache.find((item) => Number(item.id) === locationId);
    if (!locationId || !confirm(`¿Eliminar ${location?.nombre || "esta ubicación"} del catálogo general?`)) return;
    try {
      await api(`/api/location-catalog/${locationId}`, { method: "DELETE" });
      await loadClients();
    } catch (error) {
      locationCatalogList?.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
  }
});
locationCatalogForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canManageCompanyLocations()) return;
  const formData = new FormData(locationCatalogForm);
  const nombre = String(formData.get("nombre") || "").trim();
  if (!nombre) {
    locationCatalogFormStatus.textContent = "Escribe el nombre de la ubicación.";
    return;
  }
  const locationIdToEdit = editingLocationCatalogId;
  saveLocationCatalogButton.disabled = true;
  saveLocationCatalogButton.textContent = "Guardando...";
  try {
    await api(locationIdToEdit ? `/api/location-catalog/${locationIdToEdit}` : "/api/location-catalog", {
      method: locationIdToEdit ? "PUT" : "POST",
      body: JSON.stringify({ nombre })
    });
    closeLocationCatalogModal();
    await loadClients();
  } catch (error) {
    locationCatalogFormStatus.textContent = error.message;
  } finally {
    saveLocationCatalogButton.disabled = false;
    saveLocationCatalogButton.textContent = locationIdToEdit ? "Guardar cambios" : "Guardar sucursal";
  }
});

openClientBranchModalButton?.addEventListener("click", () => openClientBranchModal());
clientBranchModalClose?.addEventListener("click", closeClientBranchModal);
cancelClientBranchButton?.addEventListener("click", closeClientBranchModal);
clientBranchModal?.addEventListener("click", (event) => {
  if (event.target === clientBranchModal) closeClientBranchModal();
});
clientBranchLocationsList?.addEventListener("click", async (event) => {
  const editButton = event.target.closest(".edit-client-branch-button");
  const deleteButton = event.target.closest(".delete-client-branch-button");
  if (editButton) {
    const branch = clientBranchLocationsCache.find((item) => Number(item.id) === Number(editButton.dataset.branchId));
    if (branch) openClientBranchModal(branch);
    return;
  }
  if (deleteButton) {
    const branchId = Number(deleteButton.dataset.branchId || 0);
    const branch = clientBranchLocationsCache.find((item) => Number(item.id) === branchId);
    if (!branchId || !confirm(`¿Eliminar ${branch?.empresa || "la empresa"} · ${branch?.nombre || "esta ubicación"}?`)) return;
    try {
      await api(`/api/client-branches/${branchId}`, { method: "DELETE" });
      await loadClients();
    } catch (error) {
      if (clientBranchLocationsList) {
        clientBranchLocationsList.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
      }
    }
  }
});
clientBranchForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canManageCompanyLocations()) return;
  const formData = new FormData(clientBranchForm);
  const payload = {
    empresa: selectedClientBranchCompanyName(),
    ubicacionId: Number(formData.get("ubicacionId") || 0),
    direccion: String(formData.get("direccion") || "").trim(),
    empresaRfc: String(formData.get("empresaRfc") || "").trim(),
    empresaDireccion: String(formData.get("empresaDireccion") || "").trim(),
    empresaEmail: String(formData.get("empresaEmail") || "").trim(),
    empresaUsoCfdi: String(formData.get("empresaUsoCfdi") || "").trim(),
    empresaValorVenta: Number(formData.get("empresaValorVenta") || 0),
    empresaMetodoPago: String(formData.get("empresaMetodoPago") || "contado"),
    empresaDiasCredito: Number(formData.get("empresaDiasCredito") || 0),
    empresaNotas: String(formData.get("empresaNotas") || "").trim()
  };
  if (!payload.empresa || !payload.ubicacionId || !(payload.empresaValorVenta > 0)) {
    clientBranchFormStatus.textContent = "Selecciona la empresa, la sucursal y captura un factor de venta válido.";
    return;
  }
  const branchIdToEdit = editingClientBranchId;
  saveClientBranchButton.disabled = true;
  saveClientBranchButton.textContent = "Guardando...";
  try {
    await api(branchIdToEdit ? `/api/client-branches/${branchIdToEdit}` : "/api/client-branches", {
      method: branchIdToEdit ? "PUT" : "POST",
      body: JSON.stringify(payload)
    });
    closeClientBranchModal();
    clientDirectoryCatalogCache = [];
    await loadClients();
  } catch (error) {
    clientBranchFormStatus.textContent = error.message;
  } finally {
    saveClientBranchButton.disabled = false;
    saveClientBranchButton.textContent = branchIdToEdit ? "Guardar cambios" : "Guardar empresa";
  }
});

clientModalClose.addEventListener("click", closeClientModal);
cancelClientButton.addEventListener("click", closeClientModal);
clientBranchForm?.elements.empresaMetodoPago?.addEventListener("change", updateClientCompanyCreditDaysVisibility);
providerForm.elements.pago?.addEventListener("change", updateProviderCreditDaysVisibility);

clientDocsClose.addEventListener("click", closeClientDocsModal);
clientDocsModal.addEventListener("click", (event) => {
  if (event.target === clientDocsModal) closeClientDocsModal();
});
clientDocumentsList.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-client-file-delete]");
  if (!deleteButton || !activeDocsClientId) return;
  if (!confirm("¿Eliminar este documento?")) return;
  try {
    await api(`/api/client-files/${deleteButton.dataset.clientFileDelete}`, { method: "DELETE" });
    const files = await api(`/api/clients/${activeDocsClientId}/files`);
    renderClientDocuments(files.files || []);
    await loadClients();
  } catch (error) {
    clientDocumentsList.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
});

openProviderModalButton.addEventListener("click", () => {
  openProviderModal();
});

providerModalClose.addEventListener("click", closeProviderModal);
cancelProviderButton.addEventListener("click", closeProviderModal);

providerDocsClose.addEventListener("click", closeProviderDocsModal);
providerDocsModal.addEventListener("click", (event) => {
  if (event.target === providerDocsModal) closeProviderDocsModal();
});
providerDocumentsList.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-provider-file-delete]");
  if (!deleteButton || !activeDocsProviderId) return;
  if (!confirm("¿Eliminar este documento?")) return;
  try {
    await api(`/api/provider-files/${deleteButton.dataset.providerFileDelete}`, { method: "DELETE" });
    const files = await api(`/api/providers/${activeDocsProviderId}/files`);
    renderProviderDocuments(files.files || []);
    await loadProviders();
  } catch (error) {
    providerDocumentsList.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
});

openFixedExpenseModalButton.addEventListener("click", () => {
  openFixedExpenseModal();
});

fixedExpenseModalClose.addEventListener("click", closeFixedExpenseModal);
cancelFixedExpenseButton.addEventListener("click", closeFixedExpenseModal);
fixedExpenseModal.addEventListener("click", (event) => {
  if (event.target === fixedExpenseModal) closeFixedExpenseModal();
});

openBudgetModalButton.addEventListener("click", openBudgetModal);
budgetModalClose.addEventListener("click", closeBudgetModal);
cancelBudgetButton.addEventListener("click", closeBudgetModal);
budgetModal.addEventListener("click", (event) => {
  if (event.target === budgetModal) closeBudgetModal();
});

budgetCompanySelect.addEventListener("change", updateBudgetClientFields);
budgetBranchInput?.addEventListener("change", updateBudgetBranchContacts);
budgetManualFolioToggle.addEventListener("change", () => {
  if (!isCurrentUserSuperAdmin()) {
    budgetManualFolioToggle.checked = false;
    budgetFolioPreview.readOnly = true;
    refreshBudgetFolioPreview();
    return;
  }
  budgetFolioPreview.readOnly = !budgetManualFolioToggle.checked;
  if (budgetManualFolioToggle.checked) {
    budgetFolioPreview.focus();
    budgetFolioPreview.select();
    return;
  }
  refreshBudgetFolioPreview();
});

toggleBudgetCostsButton.addEventListener("click", () => {
  budgetCostsPanel.classList.toggle("hidden");
  toggleBudgetCostsButton.textContent = budgetCostsPanel.classList.contains("hidden")
    ? editingBudgetId
      ? "Ver costos"
      : "Agregar costos"
    : "Ocultar costos";
  if (!budgetEquipmentDraftRows.length) {
    budgetEquipmentDraftRows.push(newBudgetEquipmentRow());
    renderBudgetEquipmentRows();
  }
});

addBudgetEquipmentRowButton.addEventListener("click", () => {
  budgetCostsPanel.classList.remove("hidden");
  budgetEquipmentDraftRows.push(newBudgetEquipmentRow());
  renderBudgetEquipmentRows();
});

addBudgetContractorRowButton.addEventListener("click", () => {
  budgetCostsPanel.classList.remove("hidden");
  budgetContractorDraftRows.push(newBudgetContractorRow());
  renderBudgetContractorRows();
});

addBudgetLaborRowButton.addEventListener("click", () => {
  budgetCostsPanel.classList.remove("hidden");
  budgetLaborDraftRows.push(newBudgetLaborRow());
  renderBudgetLaborRows();
});

addBudgetMaterialRowButton.addEventListener("click", () => {
  budgetCostsPanel.classList.remove("hidden");
  budgetMaterialDraftRows.push(newBudgetMaterialRow());
  renderBudgetMaterialRows();
});

downloadMaterialsTemplateButton.addEventListener("click", () => {
  const rows = budgetMaterialDraftRows.length
    ? budgetMaterialDraftRows
    : [{ descripcion: "", cantidad: "", unidad: "", costo: "" }];
  const tableRows = rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.descripcion)}</td>
          <td>${escapeHtml(row.cantidad)}</td>
          <td>${escapeHtml(row.unidad)}</td>
          <td>${escapeHtml(row.costo)}</td>
        </tr>
      `
    )
    .join("");
  const workbookHtml = `
    <html>
      <head><meta charset="UTF-8" /></head>
      <body>
        <table>
          <thead>
            <tr><th>Descripción</th><th>Cantidad</th><th>Unidad</th><th>Costo</th></tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `;
  const blob = new Blob([workbookHtml], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "materiales-presupuesto.xls";
  link.click();
  URL.revokeObjectURL(url);
});

function exportNumber(value) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? Math.round(number * 100) / 100 : 0;
}

function normalizeExportSheetName(name) {
  return String(name || "Hoja")
    .replace(/[\[\]\*\/\\\?:]/g, " ")
    .slice(0, 31)
    .trim() || "Hoja";
}

function buildExcelTable(rows = []) {
  const safeRows = rows.length ? rows : [{ Mensaje: "Sin datos" }];
  const headers = Object.keys(safeRows.reduce((acc, row) => ({ ...acc, ...row }), {}));
  return `
    <table>
      <thead>
        <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${safeRows
          .map(
            (row) => `
              <tr>
                ${headers.map((header) => `<td>${escapeHtml(row[header] ?? "")}</td>`).join("")}
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}


function currentFilterDescriptions(entries = []) {
  return entries
    .filter((entry) => String(entry.value || "").trim() && !["Todos", "Todas", "Contado y crédito", "OCP, OCGF y OCCOM"].includes(String(entry.value)))
    .map((entry) => ({ label: entry.label, value: entry.value }));
}


function buildBudgetExportPayload() {
  const search = budgetsSearch?.value || "";
  const rows = (budgetsCache || [])
    .filter((item) => objectMatchesSearch(item, search))
    .map((item) => ({
      empresa: item.empresa,
      sucursal: item.sucursal,
      cliente: item.clienteUsuario,
      folio: item.folio,
      po: item.po || "Sin PO",
      proyecto: item.tituloProyecto,
      estado: item.estado,
      estatus: item.estatus,
      owner: item.owner,
      costo: Number(item.costoCotizacion || item.totalProyecto || 0),
      venta: Number(item.montoCotizacion || item.precioVenta || 0),
      fecha: formatExportDate(item.createdAt),
      modificacion: formatExportDate(item.updatedAt)
    }));
  return {
    title: "Presupuestos filtrados",
    subtitle: "Presupuestos y cotizaciones visibles en la pantalla.",
    filename: `presupuestos-${toComparableDate(new Date())}`,
    columns: [
      { key: "empresa", label: "Empresa" }, { key: "sucursal", label: "Sucursal" }, { key: "cliente", label: "Cliente" },
      { key: "folio", label: "Folio" }, { key: "po", label: "PO" }, { key: "proyecto", label: "Proyecto" },
      { key: "estado", label: "Estado" }, { key: "estatus", label: "Estatus" }, { key: "owner", label: "Owner" },
      { key: "costo", label: "Costo", type: "currency" }, { key: "venta", label: "Monto", type: "currency" },
      { key: "fecha", label: "Fecha de creación", type: "date" }, { key: "modificacion", label: "Modificación", type: "date" }
    ],
    rows,
    filters: currentFilterDescriptions([{ label: "Búsqueda", value: search }])
  };
}

function buildPurchaseExportPayload() {
  const collections = getFilteredPurchaseCollections();
  const rows = [
    ...collections.pending.map((item) => ({
      tipo: "OCP pendiente",
      empresa: item.empresa,
      sucursal: item.sucursal || "",
      folio: item.dlv,
      documento: "Por generar",
      proveedor: "",
      proyecto: item.proyecto,
      detalle: item.partidasPendientes,
      estatus: item.estatus,
      monto: 0,
      fecha: formatExportDate(item.createdAt),
      modificacion: formatExportDate(item.updatedAt)
    })),
    ...collections.created.map((item) => ({
      tipo: "OCP",
      empresa: item.empresa,
      sucursal: item.sucursal || "",
      folio: item.dlv,
      documento: item.ocp,
      proveedor: item.proveedor,
      proyecto: item.proyecto,
      detalle: "",
      estatus: item.estatus,
      monto: Number(item.monto || 0),
      fecha: formatExportDate(item.createdAt),
      modificacion: formatExportDate(item.updatedAt)
    })),
    ...collections.ocgf.map((item) => ({
      tipo: "OCGF",
      empresa: "",
      sucursal: item.sucursal,
      folio: item.gasto,
      documento: item.folio,
      proveedor: item.proveedorNombre,
      proyecto: item.descripcion || item.gasto,
      detalle: item.descripcion,
      estatus: item.estado,
      monto: Number(item.monto || 0),
      fecha: formatExportDate(item.createdAt || item.fecha),
      modificacion: formatExportDate(item.updatedAt)
    }))
  ];
  return {
    title: "Compras filtradas",
    subtitle: "OCP pendientes, OCP creadas y OCGF según los filtros de la pantalla.",
    filename: `compras-filtradas-${toComparableDate(new Date())}`,
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "empresa", label: "Empresa" },
      { key: "sucursal", label: "Sucursal" },
      { key: "folio", label: "Folio / DLV" },
      { key: "documento", label: "OCP / OCGF" },
      { key: "proveedor", label: "Proveedor" },
      { key: "proyecto", label: "Proyecto" },
      { key: "detalle", label: "Detalle" },
      { key: "estatus", label: "Estatus" },
      { key: "monto", label: "Monto", type: "currency" },
      { key: "fecha", label: "Fecha", type: "date" },
      { key: "modificacion", label: "Modificación", type: "date" }
    ],
    rows,
    filters: currentFilterDescriptions([
      { label: "Búsqueda", value: collections.filters.search },
      { label: "Tipo", value: getFilterLabel(purchaseFilterType) },
      { label: "Empresa / sucursal", value: getFilterLabel(purchaseFilterCompany) },
      { label: "Proveedor", value: getFilterLabel(purchaseFilterProvider) },
      { label: "Estatus", value: getFilterLabel(purchaseFilterStatus) },
      { label: "Desde", value: collections.filters.dateFrom },
      { label: "Hasta", value: collections.filters.dateTo }
    ])
  };
}

function buildAccountsReceivableExportPayload() {
  const filtered = getFilteredAccountsReceivableRows();
  const rows = filtered.rows.map((item) => ({
    empresa: item.empresa,
    cliente: item.clienteUsuario,
    folio: item.folio,
    po: item.po || "Sin PO",
    proyecto: item.proyecto,
    estado: item.estado,
    pendiente: item.pendiente,
    situacion: isAccountsReceivableCollected(item) ? "Cobrada" : isAccountsReceivableOverdue(item) ? "Vencida" : "Pendiente",
    dias: Number(item.diasPago || 0),
    fechaPago: formatExportDate(item.fechaPago),
    monto: Number(item.monto || 0),
    montoCobrado: Number(item.montoCobrado || 0),
    saldoCobrar: Number(item.saldoCobrar ?? item.monto ?? 0),
    saldoFacturar: Number(item.saldoRestante ?? item.monto ?? 0),
    fecha: formatExportDate(item.fecha || item.createdAt),
    modificacion: formatExportDate(item.updatedAt)
  }));
  return {
    title: "Cuentas por cobrar filtradas",
    subtitle: "Cartera de clientes según los filtros aplicados en la pantalla.",
    filename: `cuentas-por-cobrar-${toComparableDate(new Date())}`,
    columns: [
      { key: "empresa", label: "Empresa" },
      { key: "cliente", label: "Cliente / Usuario" },
      { key: "folio", label: "Folio" },
      { key: "po", label: "PO" },
      { key: "proyecto", label: "Proyecto" },
      { key: "estado", label: "Estado" },
      { key: "pendiente", label: "Pendiente" },
      { key: "situacion", label: "Cobranza" },
      { key: "dias", label: "Días", type: "integer" },
      { key: "fechaPago", label: "Fecha para pago", type: "date" },
      { key: "monto", label: "Monto", type: "currency" },
      { key: "montoCobrado", label: "Cobrado", type: "currency" },
      { key: "saldoCobrar", label: "Saldo por cobrar", type: "currency" },
      { key: "saldoFacturar", label: "Saldo por facturar", type: "currency" },
      { key: "fecha", label: "Fecha de creación", type: "date" },
      { key: "modificacion", label: "Modificación", type: "date" }
    ],
    rows,
    filters: currentFilterDescriptions([
      { label: "Búsqueda", value: filtered.filters.search },
      { label: "Empresa", value: getFilterLabel(accountsReceivableFilterCompany) },
      { label: "Estado", value: getFilterLabel(accountsReceivableFilterStatus) },
      { label: "Cobranza", value: getFilterLabel(accountsReceivableFilterCollection) },
      { label: "Saldo", value: getFilterLabel(accountsReceivableFilterBalance) },
      { label: "Desde", value: filtered.filters.dateFrom },
      { label: "Hasta", value: filtered.filters.dateTo }
    ])
  };
}

function buildAccountsPayableExportPayload() {
  const collections = getFilteredAccountsPayableCollections();
  const mapRow = (item, source) => ({
    origen: source.toUpperCase(),
    sucursal: item.sucursal || "",
    proveedor: item.proveedor || item.supervisor || "",
    folio: item.folio || item.gasto || "",
    documento: item.ocp || item.ocgf || item.occom || "",
    po: item.po || "Sin PO",
    cliente: item.cliente || item.empresa || "",
    proyecto: item.proyecto || item.gasto || "",
    condicion: isCashPaymentTerm(item) ? "Contado" : "Crédito",
    estado: item.estadoRegistro || item.estado || "",
    estatus: item.estatusPago || item.estatus || "",
    pendiente: item.pendiente || "",
    situacion: getAccountsPayablePaymentState(item) === "paid" ? "Pagada" : getAccountsPayablePaymentState(item) === "partial" ? "Pago parcial" : "Pendiente",
    total: Number(item.montoTotal ?? item.monto ?? 0),
    pagado: Number(item.totalPagado || (isAccountsPayablePaid(item) ? item.monto : 0) || 0),
    saldo: Number(item.saldoRestante ?? (isAccountsPayablePaid(item) ? 0 : item.monto) ?? 0),
    fechaPago: formatExportDate(item.fechaPago),
    fecha: formatExportDate(item.createdAt || item.fecha),
    modificacion: formatExportDate(item.updatedAt)
  });
  const rows = [
    ...collections.ocp.map((item) => mapRow(item, "ocp")),
    ...collections.ocgf.map((item) => mapRow(item, "ocgf")),
    ...collections.occom.map((item) => mapRow(item, "occom"))
  ];
  return {
    title: "Cuentas por pagar filtradas",
    subtitle: "OCP, OCGF y comisiones según proveedor, sucursal, periodo y condición de pago.",
    filename: `cuentas-por-pagar-${toComparableDate(new Date())}`,
    columns: [
      { key: "origen", label: "Origen" },
      { key: "sucursal", label: "Sucursal" },
      { key: "proveedor", label: "Proveedor" },
      { key: "folio", label: "Folio" },
      { key: "documento", label: "OCP / OCGF / OCCOM" },
      { key: "po", label: "PO" },
      { key: "cliente", label: "Cliente / Empresa" },
      { key: "proyecto", label: "Proyecto" },
      { key: "condicion", label: "Condición" },
      { key: "estado", label: "Estado" },
      { key: "estatus", label: "Estatus" },
      { key: "pendiente", label: "Pendiente" },
      { key: "situacion", label: "Pago" },
      { key: "total", label: "Monto total", type: "currency" },
      { key: "pagado", label: "Pagado", type: "currency" },
      { key: "saldo", label: "Saldo", type: "currency" },
      { key: "fechaPago", label: "Fecha de pago", type: "date" },
      { key: "fecha", label: "Fecha de creación", type: "date" },
      { key: "modificacion", label: "Modificación", type: "date" }
    ],
    rows,
    filters: currentFilterDescriptions([
      { label: "Búsqueda", value: collections.filters.search },
      { label: "Origen", value: getFilterLabel(accountsPayableFilterSource) },
      { label: "Proveedor", value: getFilterLabel(accountsPayableFilterProvider) },
      { label: "Sucursal", value: getFilterLabel(accountsPayableFilterBranch) },
      { label: "Condición", value: getFilterLabel(accountsPayableFilterTerms) },
      { label: "Pago", value: getFilterLabel(accountsPayableFilterPayment) },
      { label: "Desde", value: collections.filters.dateFrom },
      { label: "Hasta", value: collections.filters.dateTo }
    ])
  };
}

async function exportModuleFilteredData(moduleName, format, button) {
  const builders = {
    budgets: buildBudgetExportPayload,
    purchases: buildPurchaseExportPayload,
    receivable: buildAccountsReceivableExportPayload,
    payable: buildAccountsPayableExportPayload
  };
  const payload = builders[moduleName]?.();
  if (!payload) return;
  if (!payload.rows.length) {
    showErrorToast("No hay registros que coincidan con los filtros seleccionados.");
    return;
  }
  try {
    await requestStructuredExport({ ...payload, format }, button);
  } catch (error) {
    showErrorToast(error, "No se pudo generar la exportación.");
  }
}

function downloadExcelWorkbook(sheets = [], filename = "dalvo-operaciones.xls") {
  const validSheets = sheets.length ? sheets : [{ name: "Sin datos", rows: [{ Mensaje: "Sin datos" }] }];
  const workbookXml = validSheets
    .map(
      (sheet) => `
        <x:ExcelWorksheet>
          <x:Name>${escapeHtml(normalizeExportSheetName(sheet.name))}</x:Name>
          <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
        </x:ExcelWorksheet>
      `
    )
    .join("");
  const tables = validSheets
    .map(
      (sheet) => `
        <h2>${escapeHtml(sheet.name)}</h2>
        ${buildExcelTable(sheet.rows)}
      `
    )
    .join("<br />");
  const workbookHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8" />
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>${workbookXml}</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        <style>
          table { border-collapse: collapse; margin-bottom: 24px; }
          th { background: #0f86a8; color: #ffffff; font-weight: 700; }
          th, td { border: 1px solid #b8d6e2; padding: 6px 8px; font-family: Arial, sans-serif; font-size: 11pt; }
          h2 { font-family: Arial, sans-serif; color: #0f5570; }
        </style>
      </head>
      <body>${tables}</body>
    </html>
  `;
  const blob = new Blob([workbookHtml], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function exportOperationsExcel(triggerButton = null) {
  const originalText = triggerButton?.textContent || "";
  if (triggerButton) {
    triggerButton.disabled = true;
    triggerButton.textContent = "Exportando...";
  }

  try {
    const sheets = [];
    if (canAccessModule("presupuesto")) {
      const data = await api("/api/budgets?search=");
      sheets.push({
        name: "Presupuestos",
        rows: (data.budgets || []).map((item) => ({
          Empresa: item.empresa,
          "Cliente/Usuario": item.clienteUsuario,
          Folio: item.folio,
          PO: item.po || "Sin PO",
          Proyecto: item.tituloProyecto,
          Sucursal: item.sucursal,
          Area: item.area,
          Estado: item.estado,
          Estatus: item.estatus,
          Owner: item.owner,
          "Costo cotización": exportNumber(item.costoCotizacion),
          "Precio venta": exportNumber(item.precioVenta),
          "Monto cotización": exportNumber(item.montoCotizacion),
          "Total equipos": exportNumber(item.totalEquipos),
          "Total contratistas": exportNumber(item.totalContratistas),
          "Total mano de obra": exportNumber(item.totalManoObra),
          "Total materiales": exportNumber(item.totalMateriales),
          "Fecha creación": formatDate(item.createdAt),
          "Fecha modificación": formatDate(item.updatedAt)
        }))
      });
    }

    if (canAccessModule("compras")) {
      const [purchasesData, fixedExpenseData] = await Promise.all([
        api("/api/purchases?search="),
        api("/api/purchases/fixed-expenses?search=")
      ]);
      sheets.push({
        name: "Compras OCP pendientes",
        rows: (purchasesData.pending || []).map((item) => ({
          Empresa: item.empresa,
          DLV: item.dlv,
          PO: item.po || "Sin PO",
          Proyecto: item.proyecto,
          "Partidas pendientes": item.partidasPendientes,
          Estatus: item.estatus,
          "Fecha creación": formatDate(item.createdAt),
          "Fecha modificación": formatDate(item.updatedAt)
        }))
      });
      sheets.push({
        name: "Compras OCP creadas",
        rows: (purchasesData.created || []).map((item) => ({
          Empresa: item.empresa,
          DLV: item.dlv,
          OCP: item.ocp,
          Proveedor: item.proveedor,
          Proyecto: item.proyecto,
          "Monto original": exportNumber(item.montoOriginal ?? item.monto),
          "Descuento de cobranza": exportNumber(item.descuentoCobranza || 0),
          "% descuento de cobranza": exportNumber(item.porcentajeDescuentoCobranza || 0),
          "Monto a cobrar": exportNumber(item.monto),
          "Cobro general": item.cobroAgrupado?.folio || "",
          "Pagador / intermediario": item.cobroAgrupado?.intermediario || "",
          "Referencia OC / PO": item.cobroAgrupado?.referenciaExterna || "",
          Estatus: item.estatus,
          Owner: item.owner,
          "Última modificación": item.updatedBy,
          "Fecha creación": formatDate(item.createdAt),
          "Fecha modificación": formatDate(item.updatedAt)
        }))
      });
      sheets.push({
        name: "Compras OCGF",
        rows: (fixedExpenseData.expenses || []).map((item) => ({
          Gasto: item.gasto,
          OCGF: item.folio,
          Sucursal: item.sucursal,
          Proveedor: item.proveedorNombre,
          Descripción: item.descripcion,
          Estado: item.estado,
          "Presupuesto asignado": exportNumber(item.presupuestoAsignado),
          "Presupuesto adicional": exportNumber(item.presupuestoAdicional),
          "Presupuesto disponible": exportNumber(item.presupuestoDisponible),
          "Usado global": exportNumber(item.usadoGlobal),
          Monto: exportNumber(item.monto),
          Owner: item.owner,
          "Última modificación": item.updatedBy,
          "Fecha creación": formatDate(item.createdAt),
          "Fecha modificación": formatDate(item.updatedAt)
        }))
      });
    }

    if (canAccessModule("cuentas-cobrar")) {
      const data = await api("/api/accounts-receivable");
      sheets.push({
        name: "Cuentas por cobrar",
        rows: (data.accounts || []).map((item) => ({
          Empresa: item.empresa,
          "Cliente/Usuario": item.clienteUsuario,
          Folio: item.folio,
          PO: item.po || "Sin PO",
          Proyecto: item.proyecto,
          Estado: item.estado,
          Pendiente: item.pendiente,
          "Días de pago": Number(item.diasPago || 0),
          "Fecha para pago": formatDate(item.fechaPago),
          Monto: exportNumber(item.monto),
          "Archivos": item.archivosNombres,
          "Fecha creación": formatDate(item.createdAt),
          "Fecha modificación": formatDate(item.updatedAt)
        }))
      });
    }

    if (canAccessModule("cuentas-pagar")) {
      const data = await api("/api/accounts-payable");
      sheets.push({
        name: "CxP OCP",
        rows: (data.accounts || []).map((item) => ({
          Sucursal: item.sucursal,
          Proveedor: item.proveedor,
          Folio: item.folio,
          OCP: item.ocp,
          PO: item.po || "Sin PO",
          Cliente: item.cliente,
          Proyecto: item.proyecto,
          Estado: item.estado,
          Pendiente: item.pendiente,
          "Días para pago": displayAccountsPayableDays(item),
          "Fecha de pago": formatDate(item.fechaPago),
          Monto: exportNumber(item.monto),
          Pagada: isAccountsPayablePaid(item) ? "Sí" : "No",
          "Archivos": item.archivosNombres,
          "Fecha creación": formatDate(item.createdAt),
          "Fecha modificación": formatDate(item.updatedAt)
        }))
      });
      sheets.push({
        name: "CxP OCGF",
        rows: (data.ocgfAccounts || []).map((item) => ({
          Proveedor: item.proveedor,
          OCGF: item.ocgf,
          Gasto: item.gasto,
          Sucursal: item.sucursal,
          Estado: item.estado,
          Estatus: item.estatus,
          Pendiente: item.pendiente,
          "Días para pago": displayAccountsPayableDays(item),
          "Fecha de pago": formatDate(item.fechaPago),
          "Presupuesto asignado": exportNumber(item.presupuestoAsignado),
          "Presupuesto adicional": exportNumber(item.presupuestoAdicional),
          "Presupuesto disponible": exportNumber(item.presupuestoDisponible),
          Monto: exportNumber(item.monto),
          Pagada: isAccountsPayablePaid(item) ? "Sí" : "No",
          "Archivos": item.archivosNombres,
          "Fecha creación": formatDate(item.createdAt),
          "Fecha modificación": formatDate(item.updatedAt)
        }))
      });
      if (canAccessModule("comisiones")) {
        sheets.push({
          name: "CxP OCCOM",
          rows: (data.commissionAccounts || []).map((item) => ({
            Supervisor: item.supervisor,
            OCCOM: item.occom,
            Folio: item.folio,
            Empresa: item.empresa,
            Proyecto: item.proyecto,
            Estado: item.estado,
            Pendiente: item.pendiente,
            Monto: exportNumber(item.monto),
            Pagada: isAccountsPayablePaid(item) ? "Sí" : "No",
            "Fecha creación": formatDate(item.createdAt),
            "Fecha modificación": formatDate(item.updatedAt)
          }))
        });
      }
    }

    const date = new Date();
    const stamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    downloadExcelWorkbook(sheets, `dalvo-operaciones-${stamp}.xls`);
  } catch (error) {
    showErrorToast(error, "No se pudo exportar la información.");
  } finally {
    if (triggerButton) {
      triggerButton.disabled = false;
      triggerButton.textContent = originalText;
    }
  }
}


function resetPurchaseFilterPagination() {
  paginationState.purchasePending = 1;
  paginationState.purchaseCreated = 1;
  paginationState.purchaseFixedExpenses = 1;
}

[purchaseFilterType, purchaseFilterCompany, purchaseFilterProvider, purchaseFilterStatus, purchaseFilterDateFrom, purchaseFilterDateTo]
  .filter(Boolean)
  .forEach((control) => control.addEventListener("change", () => {
    resetPurchaseFilterPagination();
    renderPurchases();
    renderPurchaseFixedExpenses();
  }));

purchaseClearFiltersButton?.addEventListener("click", () => {
  if (purchaseFilterType) purchaseFilterType.value = "all";
  [purchaseFilterCompany, purchaseFilterProvider, purchaseFilterStatus, purchaseFilterDateFrom, purchaseFilterDateTo].filter(Boolean).forEach((control) => { control.value = ""; });
  if (purchaseSearch) purchaseSearch.value = "";
  if (purchaseFixedExpenseSearch) purchaseFixedExpenseSearch.value = "";
  resetPurchaseFilterPagination();
  loadPurchasesModule();
});

budgetsExportExcelButton?.addEventListener("click", (event) => exportModuleFilteredData("budgets", "xlsx", event.currentTarget));
budgetsExportPdfButton?.addEventListener("click", (event) => exportModuleFilteredData("budgets", "pdf", event.currentTarget));

purchaseExportExcelButton?.addEventListener("click", (event) => exportModuleFilteredData("purchases", "xlsx", event.currentTarget));
purchaseExportPdfButton?.addEventListener("click", (event) => exportModuleFilteredData("purchases", "pdf", event.currentTarget));

function resetAccountsReceivableFilterPagination() {
  paginationState.accountsReceivable = 1;
}

[accountsReceivableFilterCompany, accountsReceivableFilterStatus, accountsReceivableFilterCollection, accountsReceivableFilterBalance, accountsReceivableFilterDateFrom, accountsReceivableFilterDateTo]
  .filter(Boolean)
  .forEach((control) => control.addEventListener("change", () => {
    resetAccountsReceivableFilterPagination();
    renderAccountsReceivable();
  }));

accountsReceivableClearFiltersButton?.addEventListener("click", () => {
  [accountsReceivableFilterCompany, accountsReceivableFilterStatus, accountsReceivableFilterDateFrom, accountsReceivableFilterDateTo].filter(Boolean).forEach((control) => { control.value = ""; });
  if (accountsReceivableFilterCollection) accountsReceivableFilterCollection.value = "all";
  if (accountsReceivableFilterBalance) accountsReceivableFilterBalance.value = "all";
  if (accountsReceivableSearch) accountsReceivableSearch.value = "";
  resetAccountsReceivableFilterPagination();
  renderAccountsReceivable();
});

accountsReceivableExportExcelButton?.addEventListener("click", (event) => exportModuleFilteredData("receivable", "xlsx", event.currentTarget));
accountsReceivableExportPdfButton?.addEventListener("click", (event) => exportModuleFilteredData("receivable", "pdf", event.currentTarget));

function resetAccountsPayableFilterPagination() {
  [
    "accountsPayablePendingCash", "accountsPayablePending", "accountsPayablePaidCash", "accountsPayablePaid",
    "accountsPayableOcgfPendingCash", "accountsPayableOcgfPending", "accountsPayableOcgfPaidCash", "accountsPayableOcgfPaid",
    "accountsPayableCommissionPending", "accountsPayableCommissionPaid"
  ].forEach((key) => { paginationState[key] = 1; });
}

[accountsPayableFilterSource, accountsPayableFilterProvider, accountsPayableFilterBranch, accountsPayableFilterTerms, accountsPayableFilterPayment, accountsPayableFilterDateFrom, accountsPayableFilterDateTo]
  .filter(Boolean)
  .forEach((control) => control.addEventListener("change", () => {
    resetAccountsPayableFilterPagination();
    renderAccountsPayable();
  }));

accountsPayableClearFiltersButton?.addEventListener("click", () => {
  if (accountsPayableFilterSource) accountsPayableFilterSource.value = "all";
  if (accountsPayableFilterTerms) accountsPayableFilterTerms.value = "all";
  if (accountsPayableFilterPayment) accountsPayableFilterPayment.value = "all";
  [accountsPayableFilterProvider, accountsPayableFilterBranch, accountsPayableFilterDateFrom, accountsPayableFilterDateTo].filter(Boolean).forEach((control) => { control.value = ""; });
  if (accountsPayableSearch) accountsPayableSearch.value = "";
  resetAccountsPayableFilterPagination();
  renderAccountsPayable();
});

accountsPayableExportExcelButton?.addEventListener("click", (event) => exportModuleFilteredData("payable", "xlsx", event.currentTarget));
accountsPayableExportPdfButton?.addEventListener("click", (event) => exportModuleFilteredData("payable", "pdf", event.currentTarget));

document.querySelectorAll("[data-export-operations-excel]").forEach((button) => {
  button.addEventListener("click", () => exportOperationsExcel(button));
});

uploadMaterialsExcelButton.addEventListener("click", () => {
  materialsExcelInput.click();
});

materialsExcelInput.addEventListener("change", async () => {
  const file = materialsExcelInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("archivo", file);
  uploadMaterialsExcelButton.disabled = true;
  uploadMaterialsExcelButton.textContent = "Cargando...";

  try {
    const response = await fetch("/api/budgets/import-materials-excel", {
      method: "POST",
      credentials: "same-origin",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "No se pudo cargar el Excel.");

    const rows = (data.materiales || []).map((row) => ({
      ...newBudgetMaterialRow(),
      descripcion: row.descripcion || "",
      cantidad: Number(row.cantidad || 0),
      unidad: row.unidad || "",
      costo: Number(row.costo || 0)
    }));

    budgetMaterialDraftRows = [...budgetMaterialDraftRows, ...rows];
    budgetCostsPanel.classList.remove("hidden");
    renderBudgetMaterialRows();
  } catch (error) {
    budgetFormStatus.textContent = error.message;
  } finally {
    materialsExcelInput.value = "";
    uploadMaterialsExcelButton.disabled = false;
    uploadMaterialsExcelButton.textContent = "Cargar Excel";
  }
});

supplierQuoteInput.addEventListener("change", () => {
  const files = [...supplierQuoteInput.files].map((file) => ({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    file
  }));
  budgetSupplierQuoteFiles = [...budgetSupplierQuoteFiles, ...files];
  supplierQuoteInput.value = "";
  renderSupplierQuoteFiles();
});

clientsCardList.addEventListener("click", async (event) => {
  const editButton = event.target.closest(".edit-client-button");
  const deleteButton = event.target.closest(".delete-client-button");
  const docsButton = event.target.closest(".client-docs-button");

  if (editButton) {
    const client = clientsCache.find((item) => item.id === Number(editButton.dataset.clientId));
    if (client) openClientModal(client);
    return;
  }

  if (docsButton) {
    const client = clientsCache.find((item) => item.id === Number(docsButton.dataset.clientId));
    if (client) openClientDocs(client);
    return;
  }

  if (deleteButton) {
    const clientId = Number(deleteButton.dataset.clientId);
    const client = clientsCache.find((item) => item.id === clientId);
    const contactName = client?.nombre || "este contacto";
    const companyName = client?.empresa || "la empresa";
    const branchName = client?.sucursal || "sin ubicación";
    if (
      !confirm(
        `¿Eliminar el contacto "${contactName}" de ${companyName} (${branchName})?\n\nEsta acción no se puede deshacer.`
      )
    )
      return;

    const originalText = deleteButton.textContent;
    deleteButton.disabled = true;
    deleteButton.textContent = "Eliminando...";
    try {
      await api(`/api/clients/${clientId}`, { method: "DELETE" });
      showSuccessToast(`Se eliminó el contacto ${contactName}.`, "Contacto eliminado");
      await loadClients();
    } catch (error) {
      showErrorToast(error, "No se pudo eliminar el contacto.");
      deleteButton.disabled = false;
      deleteButton.textContent = originalText;
    }
  }
});

providersCardList.addEventListener("click", async (event) => {
  const editButton = event.target.closest(".edit-provider-button");
  const deleteButton = event.target.closest(".delete-provider-button");
  const docsButton = event.target.closest(".provider-docs-button");

  if (editButton) {
    const provider = providersCache.find((item) => item.id === Number(editButton.dataset.providerId));
    if (provider) openProviderModal(provider);
    return;
  }

  if (docsButton) {
    const provider = providersCache.find((item) => item.id === Number(docsButton.dataset.providerId));
    if (provider) openProviderDocs(provider);
    return;
  }

  if (deleteButton) {
    const providerId = Number(deleteButton.dataset.providerId);
    const provider = providersCache.find((item) => item.id === providerId);
    if (!confirm(`¿Eliminar ${provider?.empresa || "este proveedor"}?`)) return;

    try {
      await api(`/api/providers/${providerId}`, { method: "DELETE" });
      await loadProviders();
    } catch (error) {
      providersCardList.insertAdjacentHTML(
        "afterbegin",
        `<div class="empty-state">${escapeHtml(error.message)}</div>`
      );
    }
  }
});

fixedExpensesList.addEventListener("click", async (event) => {
  const editButton = event.target.closest(".edit-fixed-expense-button");
  const deleteButton = event.target.closest(".delete-fixed-expense-button");

  if (editButton) {
    const expense = fixedExpensesCache.find((item) => item.id === Number(editButton.dataset.expenseId));
    if (expense) openFixedExpenseModal(expense);
    return;
  }

  if (deleteButton) {
    const expenseId = Number(deleteButton.dataset.expenseId);
    const expense = fixedExpensesCache.find((item) => item.id === expenseId);
    if (!confirm(`¿Eliminar ${expense?.gasto || "este gasto fijo"}?`)) return;

    try {
      const data = await api(`/api/fixed-expenses/${expenseId}`, { method: "DELETE" });
      if (Array.isArray(data.expenses)) {
        renderFixedExpenses(data.expenses);
      } else {
        fixedExpensesCache = fixedExpensesCache.filter((item) => item.id !== expenseId);
        renderFixedExpenses(fixedExpensesCache);
        await loadFixedExpenses();
      }
    } catch (error) {
      fixedExpensesList.insertAdjacentHTML(
        "afterbegin",
        `<div class="fixed-expense-table-empty">${escapeHtml(error.message)}</div>`
      );
    }
  }
});

fixedExpensesTable.addEventListener("grid-sort", (event) => {
  fixedExpensesSort = event.detail;
  renderFixedExpenses(fixedExpensesCache);
});

budgetsTable.addEventListener("grid-sort", (event) => {
  budgetsSort = event.detail;
  renderBudgets(budgetsCache);
});

budgetApprovalTable?.addEventListener("grid-sort", (event) => {
  budgetsSort = event.detail;
  renderBudgets(budgetsCache);
});

purchasePendingTable.addEventListener("grid-sort", (event) => {
  purchasePendingSort = event.detail;
  renderPurchases(purchasesCache);
});

purchaseCreatedTable.addEventListener("grid-sort", (event) => {
  purchaseCreatedSort = event.detail;
  renderPurchases(purchasesCache);
});

purchaseFixedExpenseTable.addEventListener("grid-sort", (event) => {
  purchaseFixedExpenseSort = event.detail;
  renderPurchaseFixedExpenses(purchaseFixedExpensesCache);
});

accountsReceivableTable.addEventListener("grid-sort", (event) => {
  accountsReceivableSort = event.detail;
  renderAccountsReceivable({ accounts: accountsReceivableCache });
});

function rerenderAccountsPayableModule() {
  renderAccountsPayable({ accounts: accountsPayableCache, ocgfAccounts: accountsPayableOcgfCache, commissionAccounts: accountsPayableCommissionCache });
}

accountsPayablePendingCashTable?.addEventListener("grid-sort", (event) => {
  accountsPayablePendingSort = event.detail;
  rerenderAccountsPayableModule();
});

accountsPayablePendingTable.addEventListener("grid-sort", (event) => {
  accountsPayablePendingSort = event.detail;
  rerenderAccountsPayableModule();
});

accountsPayablePaidCashTable?.addEventListener("grid-sort", (event) => {
  accountsPayablePaidSort = event.detail;
  rerenderAccountsPayableModule();
});

accountsPayablePaidTable.addEventListener("grid-sort", (event) => {
  accountsPayablePaidSort = event.detail;
  rerenderAccountsPayableModule();
});

accountsPayableOcgfPendingCashTable?.addEventListener("grid-sort", (event) => {
  accountsPayableOcgfPendingSort = event.detail;
  rerenderAccountsPayableModule();
});

accountsPayableOcgfPendingTable.addEventListener("grid-sort", (event) => {
  accountsPayableOcgfPendingSort = event.detail;
  rerenderAccountsPayableModule();
});

accountsPayableOcgfPaidCashTable?.addEventListener("grid-sort", (event) => {
  accountsPayableOcgfPaidSort = event.detail;
  rerenderAccountsPayableModule();
});

accountsPayableOcgfPaidTable.addEventListener("grid-sort", (event) => {
  accountsPayableOcgfPaidSort = event.detail;
  rerenderAccountsPayableModule();
});

accountsPayableCommissionPendingTable?.addEventListener("grid-sort", (event) => {
  accountsPayableCommissionPendingSort = event.detail;
  rerenderAccountsPayableModule();
});

accountsPayableCommissionPaidTable?.addEventListener("grid-sort", (event) => {
  accountsPayableCommissionPaidSort = event.detail;
  rerenderAccountsPayableModule();
});

commissionsPendingTable?.addEventListener("grid-sort", (event) => {
  commissionsPendingSort = event.detail;
  renderCommissions(commissionsCache);
});

commissionsCreatedTable?.addEventListener("grid-sort", (event) => {
  commissionsCreatedSort = event.detail;
  renderCommissions(commissionsCache);
});

budgetEquipmentTable.addEventListener("grid-sort", (event) => {
  budgetEquipmentSort = event.detail;
  renderBudgetEquipmentRows();
});

budgetContractorTable.addEventListener("grid-sort", (event) => {
  budgetContractorSort = event.detail;
  renderBudgetContractorRows();
});

budgetLaborTable.addEventListener("grid-sort", (event) => {
  budgetLaborSort = event.detail;
  renderBudgetLaborRows();
});

budgetMaterialsTable.addEventListener("grid-sort", (event) => {
  budgetMaterialSort = event.detail;
  renderBudgetMaterialRows();
});

budgetEquipmentRows.addEventListener("change", (event) => {
  const field = event.target.dataset.field;
  if (!field) return;
  const rowElement = event.target.closest("[data-row-id]");
  const row = budgetEquipmentDraftRows.find((item) => item.id === rowElement?.dataset.rowId);
  if (!row) return;

  if (field === "itemPrecioId") {
    const selectedOption = event.target.selectedOptions[0];
    const selectedPrice = budgetEquipmentPriceItems.find(
      (item) => item.id === Number(event.target.value)
    );
    row.itemPrecioId = event.target.value;
    row.item = selectedPrice?.item || selectedOption?.textContent.trim() || "";
    row.costoUnitario = Number(selectedPrice?.costo || 0);
    renderBudgetEquipmentRows();
    return;
  }
});

budgetEquipmentRows.addEventListener("input", (event) => {
  const field = event.target.dataset.field;
  if (!field || field === "itemPrecioId") return;
  const rowElement = event.target.closest("[data-row-id]");
  const row = budgetEquipmentDraftRows.find((item) => item.id === rowElement?.dataset.rowId);
  if (!row) return;

  if (["cantidadEquipos", "cantidadUm"].includes(field)) {
    row[field] = normalizeWholeQuantity(event.target.value);
    event.target.value = row[field] ? String(row[field]) : "";
  } else if (["costoUnitario", "flete"].includes(field)) {
    row[field] = parseCurrency(event.target.value);
  } else {
    row[field] = event.target.value;
  }

  const subtotal = rowElement.querySelector("[data-subtotal]");
  if (subtotal) subtotal.textContent = formatCurrency(calculateBudgetEquipmentSubtotal(row));
  updateBudgetEquipmentTotal();
});

budgetEquipmentRows.addEventListener("focusin", (event) => {
  if (!event.target.classList.contains("budget-money-input")) return;
  const value = parseCurrency(event.target.value);
  event.target.value = value ? String(value) : "";
});

budgetEquipmentRows.addEventListener("focusout", (event) => {
  if (!event.target.classList.contains("budget-money-input")) return;
  event.target.value = formatCurrency(parseCurrency(event.target.value));
});

budgetEquipmentRows.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-budget-equipment-row");
  if (!removeButton) return;
  budgetEquipmentDraftRows = budgetEquipmentDraftRows.filter(
    (row) => row.id !== removeButton.dataset.rowId
  );
  renderBudgetEquipmentRows();
});

budgetContractorRows.addEventListener("input", (event) => {
  const field = event.target.dataset.field;
  if (!field) return;
  const rowElement = event.target.closest("[data-row-id]");
  const row = budgetContractorDraftRows.find((item) => item.id === rowElement?.dataset.rowId);
  if (!row) return;

  if (field === "cantidad") {
    row[field] = normalizeWholeQuantity(event.target.value);
    event.target.value = row[field] ? String(row[field]) : "";
  } else if (field === "costo") {
    row[field] = parseCurrency(event.target.value);
  } else {
    row[field] = event.target.value;
  }

  const subtotal = rowElement.querySelector("[data-subtotal]");
  if (subtotal) subtotal.textContent = formatCurrency(calculateBudgetContractorSubtotal(row));
  updateBudgetContractorTotal();
});

budgetContractorRows.addEventListener("focusin", (event) => {
  if (!event.target.classList.contains("budget-money-input")) return;
  const value = parseCurrency(event.target.value);
  event.target.value = value ? String(value) : "";
});

budgetContractorRows.addEventListener("focusout", (event) => {
  if (!event.target.classList.contains("budget-money-input")) return;
  event.target.value = formatCurrency(parseCurrency(event.target.value));
});

budgetContractorRows.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-budget-contractor-row");
  if (!removeButton) return;
  budgetContractorDraftRows = budgetContractorDraftRows.filter(
    (row) => row.id !== removeButton.dataset.rowId
  );
  renderBudgetContractorRows();
});

budgetLaborRows.addEventListener("change", (event) => {
  const field = event.target.dataset.field;
  if (field !== "itemPrecioId") return;
  const rowElement = event.target.closest("[data-row-id]");
  const row = budgetLaborDraftRows.find((item) => item.id === rowElement?.dataset.rowId);
  if (!row) return;

  const selectedOption = event.target.selectedOptions[0];
  const selectedPrice = budgetLaborPriceItems.find((item) => item.id === Number(event.target.value));
  row.itemPrecioId = event.target.value;
  row.descripcion = selectedPrice?.item || selectedOption?.textContent.trim() || "";
  row.costoHora = Number(selectedPrice?.costo || 0);
  renderBudgetLaborRows();
});

budgetLaborRows.addEventListener("input", (event) => {
  const field = event.target.dataset.field;
  if (!field || field === "itemPrecioId") return;
  const rowElement = event.target.closest("[data-row-id]");
  const row = budgetLaborDraftRows.find((item) => item.id === rowElement?.dataset.rowId);
  if (!row) return;

  if (["personas", "horas", "comidas"].includes(field)) {
    row[field] = normalizeWholeQuantity(event.target.value);
    event.target.value = row[field] ? String(row[field]) : "";
    if (["personas", "horas"].includes(field)) {
      row.comidas = calculateBudgetLaborMeals(row);
      const mealsInput = rowElement.querySelector("[data-field='comidas']");
      if (mealsInput) mealsInput.value = row.comidas ? String(row.comidas) : "";
    }
  } else if (["costoHora", "costoComida"].includes(field)) {
    row[field] = parseCurrency(event.target.value);
  } else {
    row[field] = event.target.value;
  }

  const hoursTotal = rowElement.querySelector("[data-hours-total]");
  const subtotal = rowElement.querySelector("[data-subtotal]");
  if (hoursTotal) hoursTotal.textContent = String(normalizeWholeQuantity(calculateBudgetLaborHours(row)));
  if (subtotal) subtotal.textContent = formatCurrency(calculateBudgetLaborSubtotal(row));
  updateBudgetLaborTotal();
});

budgetLaborRows.addEventListener("focusin", (event) => {
  if (!event.target.classList.contains("budget-money-input")) return;
  const value = parseCurrency(event.target.value);
  event.target.value = value ? String(value) : "";
});

budgetLaborRows.addEventListener("focusout", (event) => {
  if (!event.target.classList.contains("budget-money-input")) return;
  event.target.value = formatCurrency(parseCurrency(event.target.value));
});

budgetLaborRows.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-budget-labor-row");
  if (!removeButton) return;
  budgetLaborDraftRows = budgetLaborDraftRows.filter((row) => row.id !== removeButton.dataset.rowId);
  renderBudgetLaborRows();
});

budgetMaterialsRows.addEventListener("input", (event) => {
  const field = event.target.dataset.field;
  if (!field) return;
  const rowElement = event.target.closest("[data-row-id]");
  const row = budgetMaterialDraftRows.find((item) => item.id === rowElement?.dataset.rowId);
  if (!row) return;

  if (field === "cantidad") {
    row[field] = normalizeWholeQuantity(event.target.value);
    event.target.value = row[field] ? String(row[field]) : "";
  } else if (field === "costo") {
    row[field] = parseCurrency(event.target.value);
  } else {
    row[field] = event.target.value;
  }

  const subtotal = rowElement.querySelector("[data-subtotal]");
  if (subtotal) subtotal.textContent = formatCurrency(calculateBudgetMaterialSubtotal(row));
  updateBudgetMaterialsTotal();
});

budgetMaterialsRows.addEventListener("focusin", (event) => {
  if (!event.target.classList.contains("budget-money-input")) return;
  const value = parseCurrency(event.target.value);
  event.target.value = value ? String(value) : "";
});

budgetMaterialsRows.addEventListener("focusout", (event) => {
  if (!event.target.classList.contains("budget-money-input")) return;
  event.target.value = formatCurrency(parseCurrency(event.target.value));
});

budgetMaterialsRows.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-budget-material-row");
  if (!removeButton) return;
  budgetMaterialDraftRows = budgetMaterialDraftRows.filter(
    (row) => row.id !== removeButton.dataset.rowId
  );
  renderBudgetMaterialRows();
});

supplierQuoteRows.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-supplier-quote");
  if (!removeButton) return;
  budgetSupplierQuoteFiles = budgetSupplierQuoteFiles.filter(
    (item) => item.id !== removeButton.dataset.fileId
  );
  renderSupplierQuoteFiles();
});

budgetsCardList.addEventListener("click", async (event) => {
  const row = event.target.closest(".budget-table-row[data-budget-id]");
  if (!row) return;
  markRowAlertRead(row, row.dataset.budgetId);
  await openBudgetDetail(Number(row.dataset.budgetId));
});

sharedClientPoProjects?.addEventListener("change", (event) => {
  const input = event.target.closest("[data-shared-client-po-budget]");
  if (!input) return;
  const budgetId = Number(input.dataset.sharedClientPoBudget || 0);
  const budget = sharedClientPoCandidates.find((item) => Number(item.id) === budgetId);
  if (!budget || !canSelectBudgetForSharedPo(budget)) {
    input.checked = false;
    return;
  }
  if (input.checked) {
    const selected = getSharedClientPoSelectedBudgets();
    if (selected.length && normalizeSearchValue(selected[0].empresa) !== normalizeSearchValue(budget.empresa)) {
      input.checked = false;
      showErrorToast(
        new Error("Todos los presupuestos deben ser de la misma empresa."),
        "Quita la selección actual antes de elegir otro cliente.",
        "Selección inválida"
      );
      return;
    }
    sharedClientPoSelectedBudgetIds.add(budgetId);
    if (sharedClientPoCompanyFilter && !sharedClientPoCompanyFilter.value) {
      sharedClientPoCompanyFilter.value = budget.empresa || "";
    }
  } else {
    sharedClientPoSelectedBudgetIds.delete(budgetId);
  }
  updateSharedClientPoSelectionUi({ render: true });
});

sharedClientPoCompanyFilter?.addEventListener("change", renderSharedClientPoCandidates);
sharedClientPoProjectFilter?.addEventListener("input", renderSharedClientPoCandidates);
sharedClientPoClearButton?.addEventListener("click", () => {
  sharedClientPoSelectedBudgetIds.clear();
  updateSharedClientPoSelectionUi({ render: true });
});
sharedClientPoSelectVisibleButton?.addEventListener("click", () => {
  const visible = getFilteredSharedClientPoCandidates().filter(canSelectBudgetForSharedPo);
  if (!visible.length) return;
  const companies = new Set(visible.map((budget) => normalizeSearchValue(budget.empresa)));
  if (companies.size > 1) {
    showErrorToast(
      new Error("Selecciona primero una empresa."),
      "Una PO compartida no puede mezclar proyectos de clientes diferentes.",
      "Seleccionar visibles"
    );
    sharedClientPoCompanyFilter?.focus();
    return;
  }
  const remove = visible.every((budget) => sharedClientPoSelectedBudgetIds.has(Number(budget.id)));
  visible.forEach((budget) => {
    if (remove) sharedClientPoSelectedBudgetIds.delete(Number(budget.id));
    else sharedClientPoSelectedBudgetIds.add(Number(budget.id));
  });
  updateSharedClientPoSelectionUi({ render: true });
});

openSharedClientPoButton?.addEventListener("click", openSharedClientPoModal);
sharedClientPoModalClose?.addEventListener("click", closeSharedClientPoModal);
cancelSharedClientPoButton?.addEventListener("click", closeSharedClientPoModal);
sharedClientPoModal?.addEventListener("click", (event) => {
  if (event.target === sharedClientPoModal) closeSharedClientPoModal();
});
sharedClientPoForm?.addEventListener("submit", submitSharedClientPo);
sharedClientPoForm?.elements?.poArchivo?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  const numberInput = sharedClientPoForm.elements.numeroPo;
  if (!file || numberInput.value.trim()) return;
  numberInput.value = file.name.replace(/\.[^.]+$/, "").replace(/^OC[#_ -]*/i, "").trim();
});

budgetApprovalRows?.addEventListener("click", async (event) => {
  const row = event.target.closest(".budget-table-row[data-budget-id]");
  if (!row) return;
  markRowAlertRead(row, row.dataset.budgetId);
  await openBudgetDetail(Number(row.dataset.budgetId));
});

backToBudgetsButton.addEventListener("click", closeBudgetDetail);
backToPurchasesButton.addEventListener("click", closePurchaseDetail);
backToPurchaseFixedExpensesButton.addEventListener("click", closePurchaseFixedExpenseDetail);
backToAccountsReceivableButton.addEventListener("click", closeAccountsReceivableDetail);
backToAccountsPayableButton.addEventListener("click", closeAccountsPayableDetail);
openReceivableBatchSelectorButton?.addEventListener("click", openReceivableBatchSelector);
accountsReceivablePendingBatchesRows?.addEventListener("click", async (event) => {
  const manage = event.target.closest("[data-manage-receivable-batch]");
  if (manage) return openExistingReceivableBatch(manage.dataset.manageReceivableBatch, { fromMain: true });
  const cancel = event.target.closest("[data-cancel-receivable-batch]");
  if (cancel) await cancelReceivableBatch(cancel.dataset.cancelReceivableBatch, cancel.dataset.batchFolio || "Cobro general");
});
backFromReceivableBatchSelectButton?.addEventListener("click", loadAccountsReceivableModule);
backFromReceivableBatchReviewButton?.addEventListener("click", async () => {
  const returnMain = receivableBatchOpenedFromMain || normalizeSearchValue(receivableBatchActive?.estado) !== "pendiente";
  receivableBatchActive = null;
  accountsReceivableBatchReviewView?.classList.add("hidden");
  if (returnMain) { await loadAccountsReceivableModule(); return; }
  accountsReceivableBatchSelectView?.classList.remove("hidden");
  await loadReceivableBatchCandidates();
});
receivableBatchCompanyFilter?.addEventListener("input", renderReceivableBatchCandidates);
receivableBatchPoFilter?.addEventListener("input", renderReceivableBatchCandidates);
receivableBatchProjectFilter?.addEventListener("input", renderReceivableBatchCandidates);
receivableBatchAvailabilityFilter?.addEventListener("change", renderReceivableBatchCandidates);
receivableBatchClearFiltersButton?.addEventListener("click", () => {
  if (receivableBatchCompanyFilter) receivableBatchCompanyFilter.value = "";
  if (receivableBatchPoFilter) receivableBatchPoFilter.value = "";
  if (receivableBatchProjectFilter) receivableBatchProjectFilter.value = "";
  if (receivableBatchAvailabilityFilter) receivableBatchAvailabilityFilter.value = "all";
  renderReceivableBatchCandidates();
});
receivableBatchDiscount?.addEventListener("input", updateReceivableBatchSelectionSummary);
receivableBatchAuthorizedTotal?.addEventListener("input", updateReceivableBatchSelectionSummary);
receivableBatchCandidateRows?.addEventListener("click", async (event) => {
  const open = event.target.closest("[data-open-receivable-batch]");
  if (open) await openExistingReceivableBatch(open.dataset.openReceivableBatch);
});
receivableBatchCandidateRows?.addEventListener("change", (event) => {
  const input = event.target.closest("[data-receivable-batch-quote]");
  if (!input) return;
  const quoteId = Number(input.dataset.receivableBatchQuote || 0);
  const item = receivableBatchCandidates.find((row) => Number(row.quoteId) === quoteId);
  if (input.checked) {
    const selected = getSelectedReceivableBatchCandidates();
    if (selected.length && normalizeSearchValue(selected[0].empresa) !== normalizeSearchValue(item?.empresa)) {
      input.checked = false;
      showErrorToast(new Error("Todos los proyectos deben ser de la misma empresa."), "Filtra o selecciona cuentas del mismo cliente.", "Selección inválida");
      return;
    }
    receivableBatchSelectedIds.add(quoteId);
  } else receivableBatchSelectedIds.delete(quoteId);
  renderReceivableBatchCandidates();
});
receivableBatchSelectVisibleButton?.addEventListener("click", () => {
  const visible = getSelectableVisibleReceivableBatchCandidates();
  if (!visible.length) return;
  const companies = new Set(visible.map((item) => normalizeSearchValue(item.empresa)));
  if (companies.size > 1 && !receivableBatchCompanyFilter?.value) {
    showErrorToast(new Error("Selecciona primero una empresa."), "No se pueden mezclar clientes en un cobro general.", "Seleccionar visibles");
    return;
  }
  const remove = visible.every((item) => receivableBatchSelectedIds.has(Number(item.quoteId)));
  visible.forEach((item) => remove ? receivableBatchSelectedIds.delete(Number(item.quoteId)) : receivableBatchSelectedIds.add(Number(item.quoteId)));
  renderReceivableBatchCandidates();
});
receivableBatchClearButton?.addEventListener("click", () => { receivableBatchSelectedIds.clear(); renderReceivableBatchCandidates(); });
receivableBatchContinueButton?.addEventListener("click", createReceivableBatchDraft);
receivableBatchExistingRows?.addEventListener("click", async (event) => {
  const open = event.target.closest("[data-open-receivable-batch]");
  if (open) return openExistingReceivableBatch(open.dataset.openReceivableBatch);
  const cancel = event.target.closest("[data-cancel-receivable-batch]");
  if (cancel) await cancelReceivableBatch(cancel.dataset.cancelReceivableBatch, cancel.dataset.batchFolio || "Cobro general");
});
receivableBatchReviewContent?.addEventListener("click", async (event) => {
  const deleteFile = event.target.closest("[data-delete-receivable-batch-file]");
  if (deleteFile) {
    await deleteReceivableBatchFile(deleteFile.dataset.deleteReceivableBatchFile, deleteFile.dataset.fileName || "el documento");
    return;
  }
  const cancel = event.target.closest("[data-cancel-receivable-batch]");
  if (cancel) await cancelReceivableBatch(cancel.dataset.cancelReceivableBatch, cancel.dataset.batchFolio || "Cobro general");
});
receivableBatchReviewContent?.addEventListener("change", (event) => {
  const input = event.target.closest("[data-receivable-batch-item-file]");
  if (!input) return;
  receivableBatchProofFilesByItem.set(Number(input.dataset.receivableBatchItemFile), [...(input.files || [])]);
  renderReceivableBatchReview();
});
receivableBatchGeneralProofInput?.addEventListener("change", () => {
  receivableBatchGeneralProofFiles = [...(receivableBatchGeneralProofInput.files || [])];
  const status = document.getElementById("receivableBatchGeneralProofStatus");
  if (status) status.textContent = receivableBatchGeneralProofFiles.length ? receivableBatchGeneralProofFiles.map((file) => file.name).join(" · ") : "Ningún archivo seleccionado";
});
receivableBatchUploadProofButton?.addEventListener("click", saveReceivableBatchProofFiles);
receivableBatchDoneButton?.addEventListener("click", loadAccountsReceivableModule);
openCommissionBatchSelectorButton?.addEventListener("click", openCommissionBatchSelector);
accountsPayablePendingBatchesRows?.addEventListener("click", async (event) => {
  const manageButton = event.target.closest("[data-manage-main-batch]");
  if (manageButton) {
    await openExistingCommissionBatch(manageButton.dataset.manageMainBatch, { fromMain: true });
    return;
  }
  const cancelButton = event.target.closest("[data-cancel-main-batch]");
  if (cancelButton) {
    await cancelCommissionPaymentBatch(
      cancelButton.dataset.cancelMainBatch,
      cancelButton.dataset.batchFolio || "OCP general",
      { fromMain: true }
    );
  }
});
backFromCommissionBatchSelectButton?.addEventListener("click", loadAccountsPayableModule);
backFromCommissionBatchReviewButton?.addEventListener("click", async () => {
  const returnToMain = Boolean(commissionBatchPaidBatch?.id || commissionBatchOpenedFromMain);
  commissionBatchOpenedExisting = false;
  commissionBatchOpenedFromMain = false;
  commissionBatchDraftBatch = null;
  commissionBatchPaidBatch = null;
  accountsPayableCommissionBatchReviewView?.classList.add("hidden");
  if (returnToMain) {
    await loadAccountsPayableModule();
    return;
  }
  accountsPayableCommissionBatchSelectView?.classList.remove("hidden");
  await loadCommissionBatchCandidates();
});
commissionBatchMonthFilter?.addEventListener("change", async () => {
  commissionBatchSelectedIds.clear();
  if (accountsPayableCommissionMonth) accountsPayableCommissionMonth.value = commissionBatchMonthFilter.value;
  await loadCommissionBatchCandidates();
});
commissionBatchPersonFilter?.addEventListener("input", renderCommissionBatchCandidates);
commissionBatchProjectFilter?.addEventListener("input", renderCommissionBatchCandidates);
commissionBatchExistingRows?.addEventListener("click", handleCommissionBatchExistingAction);
commissionBatchCandidateRows?.addEventListener("click", handleCommissionBatchExistingAction);
commissionBatchCandidateRows?.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-commission-batch-key]");
  if (!checkbox) return;
  const key = String(checkbox.dataset.commissionBatchKey || "");
  if (checkbox.checked) commissionBatchSelectedIds.add(key);
  else commissionBatchSelectedIds.delete(key);
  renderCommissionBatchCandidates();
});
commissionBatchSelectVisibleButton?.addEventListener("click", () => {
  const visible = getSelectableVisibleCommissionBatchCandidates();
  const remove = visible.length > 0 && visible.every((item) => commissionBatchSelectedIds.has(getCommissionBatchCandidateKey(item)));
  visible.forEach((item) => {
    const key = getCommissionBatchCandidateKey(item);
    if (remove) commissionBatchSelectedIds.delete(key);
    else commissionBatchSelectedIds.add(key);
  });
  renderCommissionBatchCandidates();
});
commissionBatchClearButton?.addEventListener("click", () => {
  commissionBatchSelectedIds.clear();
  renderCommissionBatchCandidates();
});
commissionBatchContinueButton?.addEventListener("click", async () => {
  const selected = getSelectedCommissionBatchCandidates();
  if (selected.length === 1) {
    const item = selected[0];
    await openAccountsPayableDetail(
      Number(item.entityId || item.commissionId || item.orderId),
      item.source === "OCP" ? "ocp" : item.source === "OCGF" ? "ocgf" : "occom"
    );
    return;
  }
  if (selected.length > 1) await openCommissionBatchReview();
});
commissionBatchGroupMode?.addEventListener("change", () => {
  const selected = getSelectedCommissionBatchCandidates();
  if (commissionBatchPaidBatch?.id) renderCommissionBatchPaidReview(commissionBatchPaidBatch, selected);
  else renderCommissionBatchReview();
});
commissionBatchGeneralProofInput?.addEventListener("change", () => {
  commissionBatchGeneralProofFiles = [...(commissionBatchGeneralProofInput.files || [])];
  const status = document.getElementById("commissionBatchGeneralProofStatus");
  if (status) status.textContent = commissionBatchGeneralProofFiles.length
    ? commissionBatchGeneralProofFiles.map((file) => file.name).join(" · ")
    : "Ningún archivo seleccionado";
  if (commissionBatchGeneralProofFiles.length) commissionBatchUploadProofButton?.classList.remove("hidden");
});
commissionBatchReviewContent?.addEventListener("click", (event) => {
  const cancelButton = event.target.closest("[data-cancel-existing-batch]");
  if (cancelButton) {
    cancelCommissionPaymentBatch(cancelButton.dataset.cancelExistingBatch, cancelButton.dataset.batchFolio || "OCP general");
    return;
  }
  const infoButton = event.target.closest("[data-batch-item-info]");
  if (infoButton) loadCommissionBatchItemInfo(infoButton.dataset.batchItemInfo);
});
commissionBatchReviewContent?.addEventListener("change", (event) => {
  const input = event.target.closest("[data-batch-proof-input]");
  if (!input) return;
  commissionBatchProofFilesByKey.set(input.dataset.batchProofInput, [...(input.files || [])]);
  if (commissionBatchPaidBatch?.id) renderCommissionBatchPaidReview(commissionBatchPaidBatch, getSelectedCommissionBatchCandidates());
  else renderCommissionBatchReview();
});
commissionBatchConfirmButton?.addEventListener("click", confirmCommissionBatchPayment);
commissionBatchUploadProofButton?.addEventListener("click", saveCommissionBatchProofFiles);

function handleOcgfApprovalNotice(payload) {
  if (payload?.type !== "dalvo:ocgf-approved") return;
  if (Number(payload.ocgfId || 0) !== Number(activePurchaseFixedExpenseId || 0)) return;
  refreshActivePurchaseFixedExpenseDetail();
}

async function handleAccountsReceivableBatchCollectedNotice(payload) {
  if (payload?.type !== "dalvo:accounts-receivable-batch-collected") return;
  const batchId = Number(payload.batchId || 0);
  if (!batchId || currentModuleName !== "cuentas-cobrar") return;
  try {
    const data = await api(`/api/accounts-receivable-batches/${batchId}`, { toast: false });
    receivableBatchActive = data.batch || receivableBatchActive;
    if (accountsReceivableBatchReviewView && !accountsReceivableBatchReviewView.classList.contains("hidden")) renderReceivableBatchReview();
    else await loadAccountsReceivableModule();
    refreshNavigationBadges();
    showSuccessToast("El cobro general fue registrado. Ya puedes adjuntar los comprobantes.", "Cobro actualizado");
  } catch (error) { showErrorToast(error, "No se pudo actualizar el cobro general en esta pantalla.", "Actualización pendiente"); }
}

async function handleAccountsPayablePaidNotice(payload) {
  if (payload?.type !== "dalvo:accounts-payable-paid") return;
  if (currentModuleName !== "cuentas-pagar") return;
  const batchViewOpen =
    (accountsPayableCommissionBatchSelectView && !accountsPayableCommissionBatchSelectView.classList.contains("hidden")) ||
    (accountsPayableCommissionBatchReviewView && !accountsPayableCommissionBatchReviewView.classList.contains("hidden"));
  if (batchViewOpen) return;

  const source = payload.source || "ocp";
  const orderId = source === "occom" ? String(payload.orderId || "") : Number(payload.orderId || 0);
  const activeOrderId = source === "occom" ? String(activeAccountsPayableOrderId || "") : Number(activeAccountsPayableOrderId);
  if (activeAccountsPayableOrderId && activeAccountsPayableSource === source && activeOrderId === orderId) {
    await openAccountsPayableDetail(activeAccountsPayableOrderId, activeAccountsPayableSource, { persist: false });
    return;
  }

  await loadAccountsPayableModule();
}

async function handleAccountsPayableBatchPaidNotice(payload) {
  if (payload?.type !== "dalvo:accounts-payable-batch-paid") return;
  const batchId = Number(payload.batchId || 0);
  if (!batchId || currentModuleName !== "cuentas-pagar") return;
  try {
    const data = await api(`/api/commission-payment-batches/${batchId}`, { toast: false });
    commissionBatchDraftBatch = data.batch || commissionBatchDraftBatch;
    commissionBatchPaidBatch = data.batch || null;
    if (accountsPayableCommissionBatchReviewView && !accountsPayableCommissionBatchReviewView.classList.contains("hidden")) {
      renderCommissionBatchPaidReview(commissionBatchPaidBatch, getSelectedCommissionBatchCandidates());
    } else {
      await loadAccountsPayableModule();
    }
    refreshNavigationBadges();
    showSuccessToast("La OCP general fue pagada. Ya puedes adjuntar los comprobantes.", "Pago actualizado");
  } catch (error) {
    showErrorToast(error, "No se pudo actualizar la OCP general en esta pantalla.", "Actualización pendiente");
  }
}

window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;
  handleOcgfApprovalNotice(event.data);
  handleAccountsReceivableBatchCollectedNotice(event.data);
  handleAccountsPayablePaidNotice(event.data);
  handleAccountsPayableBatchPaidNotice(event.data);
});

window.addEventListener("storage", (event) => {
  try {
    if (event.key === "dalvo:ocgf-approved" && event.newValue) {
      handleOcgfApprovalNotice(JSON.parse(event.newValue));
    }
    if (event.key === "dalvo:accounts-receivable-batch-collected" && event.newValue) {
      handleAccountsReceivableBatchCollectedNotice(JSON.parse(event.newValue));
    }
    if (event.key === "dalvo:accounts-payable-paid" && event.newValue) {
      handleAccountsPayablePaidNotice(JSON.parse(event.newValue));
    }
    if (event.key === "dalvo:accounts-payable-batch-paid" && event.newValue) {
      handleAccountsPayableBatchPaidNotice(JSON.parse(event.newValue));
    }
  } catch (error) {
    // No-op: storage notifications from older tabs can contain stale values.
  }
});

purchasePendingRows.addEventListener("click", async (event) => {
  const row = event.target.closest("[data-purchase-budget-id]");
  if (!row) return;
  markRowAlertRead(row, row.dataset.purchaseBudgetId);
  await openPurchaseDetail(Number(row.dataset.purchaseBudgetId), { orderId: null });
});

purchaseCreatedRows.addEventListener("click", async (event) => {
  const row = event.target.closest("[data-purchase-budget-id]");
  if (!row) return;
  markRowAlertRead(row, row.dataset.alertId || row.dataset.purchaseBudgetId);
  await openPurchaseDetail(Number(row.dataset.purchaseBudgetId), { orderId: Number(row.dataset.purchaseOrderId || 0) || null });
});

openPurchaseFixedExpenseButton.addEventListener("click", () => {
  openPurchaseFixedExpenseDetail(null);
});

purchaseSearch?.addEventListener("input", () => {
  clearTimeout(purchaseSearchTimer);
  purchaseSearchTimer = setTimeout(() => {
    loadPurchasesModule().catch((error) => {
      purchasePendingRows.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
      purchaseCreatedRows.innerHTML = "";
    });
  }, 250);
});

purchaseCreateOcpButton?.addEventListener("click", openPurchaseDetailByFolio);

purchaseFixedExpenseSearch.addEventListener("input", () => {
  clearTimeout(purchaseFixedExpenseSearchTimer);
  purchaseFixedExpenseSearchTimer = setTimeout(() => {
    loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value).catch((error) => {
      purchaseFixedExpenseRows.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    });
  }, 250);
});

purchaseFixedExpenseRows.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-ocgf-delete]");
  if (deleteButton) {
    event.stopPropagation();
    if (!confirm("¿Eliminar este gasto fijo?")) return;
    try {
      await api(`/api/purchases/fixed-expenses/${deleteButton.dataset.ocgfDelete}`, { method: "DELETE" });
      await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
    } catch (error) {
      purchaseFixedExpenseRows.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
    return;
  }
  const row = event.target.closest("[data-ocgf-id]");
  if (!row) return;
  markRowAlertRead(row, row.dataset.ocgfId);
  await openPurchaseFixedExpenseDetail(Number(row.dataset.ocgfId));
});

purchaseFixedExpenseDetailContent.addEventListener("click", async (event) => {
  const statusButton = event.target.closest("[data-ocgf-status]");
  const reassignButton = event.target.closest("[data-ocgf-reassign]");
  const actionButton = event.target.closest("[data-ocgf-order-action]");
  const editVersionButton = event.target.closest("[data-ocgf-order-edit-version]");
  const previewButton = event.target.closest("[data-ocgf-order-preview]");
  const approveButton = event.target.closest("[data-ocgf-order-approve]");
  const regenerateButton = event.target.closest("[data-ocgf-order-regenerate]");
  const cancelOrderButton = event.target.closest("[data-ocgf-order-cancel]");
  const deleteFileButton = event.target.closest("[data-ocgf-file-delete]");
  const removeButton = event.target.closest(".remove-fixed-expense-order-row");

  if (reassignButton && activePurchaseFixedExpenseData?.expense) {
    const expense = activePurchaseFixedExpenseData.expense;
    await openExpenseReassignmentDialog({
      type: "OCGF",
      recordId: Number(reassignButton.dataset.ocgfReassign),
      folio: expense.folio || "OCGF",
      currentDestinationId: expense.gastoFijoId
    });
    return;
  }

  if (deleteFileButton && activePurchaseFixedExpenseId) {
    if (!confirm("¿Eliminar este archivo OCGF?")) return;
    try {
      const data = await api(`/api/ocgf-files/${deleteFileButton.dataset.ocgfFileDelete}`, { method: "DELETE" });
      await loadPurchaseFixedExpenseCatalogs();
      const refreshed = await api(`/api/purchases/fixed-expenses/${activePurchaseFixedExpenseId}`);
      renderPurchaseFixedExpenseDetail(refreshed);
    } catch (error) {
      purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  if (statusButton && activePurchaseFixedExpenseId) {
    try {
      const data = await api(`/api/purchases/fixed-expenses/${activePurchaseFixedExpenseId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ action: statusButton.dataset.ocgfStatus })
      });
      await loadPurchaseFixedExpenseCatalogs();
      renderPurchaseFixedExpenseDetail(data);
      await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
    } catch (error) {
      purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  if (editVersionButton && activePurchaseFixedExpenseData) {
    const version = (activePurchaseFixedExpenseData.expense?.versions || []).find(
      (item) => Number(item.id) === Number(editVersionButton.dataset.ocgfOrderEditVersion)
    );
    if (!version) return;
    editingFixedExpenseOrderVersionId = version.id;
    purchaseFixedExpenseOrderRows = (version.items || []).map((row) => newFixedExpenseOrderRow(row));
    if (!purchaseFixedExpenseOrderRows.length) purchaseFixedExpenseOrderRows = [newFixedExpenseOrderRow()];
    renderFixedExpenseOrderRows();
    const retentionBox = document.querySelector("#fixedExpenseRetentionBox");
    if (retentionBox) retentionBox.classList.toggle("hidden", !version.retencionActiva);
    const retentionInput = document.querySelector("#fixedExpenseRetentionInput");
    if (retentionInput) retentionInput.value = formatCurrency(version.retencionMonto || 0);
    const sinIva = document.querySelector("#fixedExpenseSinIva");
    if (sinIva) sinIva.checked = Boolean(version.sinIva);
    const saveButton = document.querySelector('[data-ocgf-order-action="save-version"]');
    if (saveButton) saveButton.textContent = "Actualizar versión";
    return;
  }

  if (previewButton) {
    window.open(`/api/ocgf-orders/${previewButton.dataset.ocgfOrderPreview}/preview`, "_blank", "noopener");
    return;
  }

  if (approveButton) {
    approveButton.disabled = true;
    const originalText = approveButton.textContent;
    approveButton.textContent = "Aprobando...";
    try {
      const data = await api(`/api/ocgf-orders/${approveButton.dataset.ocgfOrderApprove}/approve`, {
        method: "POST"
      });
      renderPurchaseFixedExpenseDetail(data);
      await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
      await loadPurchasesModule();
    } catch (error) {
      purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    } finally {
      approveButton.disabled = false;
      approveButton.textContent = originalText;
    }
    return;
  }

  if (regenerateButton) {
    regenerateButton.disabled = true;
    const originalText = regenerateButton.textContent;
    regenerateButton.textContent = "Regenerando...";
    try {
      const data = await api(`/api/ocgf-orders/${regenerateButton.dataset.ocgfOrderRegenerate}/regenerate-pdf`, {
        method: "POST"
      });
      renderPurchaseFixedExpenseDetail(data);
      await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
    } catch (error) {
      purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    } finally {
      regenerateButton.disabled = false;
      regenerateButton.textContent = originalText;
    }
    return;
  }

  if (cancelOrderButton) {
    if (!confirm("¿Cancelar esta OCGF? El presupuesto volverá a estar disponible.")) return;
    try {
      const data = await api(`/api/ocgf-orders/${cancelOrderButton.dataset.ocgfOrderCancel}/cancel`, {
        method: "POST"
      });
      renderPurchaseFixedExpenseDetail(data);
      await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
    } catch (error) {
      purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  if (removeButton) {
    purchaseFixedExpenseOrderRows = purchaseFixedExpenseOrderRows.filter(
      (row) => row.id !== removeButton.dataset.rowId
    );
    renderFixedExpenseOrderRows();
    return;
  }

  if (!actionButton || !activePurchaseFixedExpenseId) return;
  const action = actionButton.dataset.ocgfOrderAction;

  if (action === "add-row") {
    const currentProvider = purchaseFixedExpenseDetailContent.querySelector("#purchaseFixedExpenseProviderInput")?.value || "";
    purchaseFixedExpenseOrderRows.push(
      newFixedExpenseOrderRow({
        proveedorNombre: currentProvider || purchaseFixedExpenseOrderRows[0]?.proveedorNombre || ""
      })
    );
    renderFixedExpenseOrderRows();
    return;
  }

  if (action === "toggle-retention") {
    const box = document.querySelector("#fixedExpenseRetentionBox");
    if (box) box.classList.toggle("hidden");
    const totalElement = document.querySelector("#fixedExpenseOrderTotal");
    if (totalElement) totalElement.textContent = formatCurrency(fixedExpenseOrderTotal());
    return;
  }

  if (action === "save-draft" || action === "save-version") {
    try {
      const endpoint =
        action === "save-draft"
          ? `/api/purchases/fixed-expenses/${activePurchaseFixedExpenseId}/supplier-order/draft`
          : editingFixedExpenseOrderVersionId
            ? `/api/purchases/fixed-expenses/${activePurchaseFixedExpenseId}/supplier-order/versions/${editingFixedExpenseOrderVersionId}`
            : `/api/purchases/fixed-expenses/${activePurchaseFixedExpenseId}/supplier-order/versions`;
      const data = await api(endpoint, {
        method: action === "save-version" && editingFixedExpenseOrderVersionId ? "PUT" : "POST",
        body: JSON.stringify(fixedExpenseOrderPayload())
      });
      editingFixedExpenseOrderVersionId = null;
      await loadPurchaseFixedExpenseCatalogs();
      renderPurchaseFixedExpenseDetail(data);
      await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
    } catch (error) {
      purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
  }
});

accountsReceivableRows.addEventListener("click", async (event) => {
  const row = event.target.closest("[data-accounts-receivable-quote-id]");
  if (!row) return;
  markRowAlertRead(row, row.dataset.accountsReceivableQuoteId);
  await openAccountsReceivableDetail(Number(row.dataset.accountsReceivableQuoteId));
});

accountsReceivableSearch?.addEventListener("input", () => {
  clearTimeout(accountsReceivableSearchTimer);
  accountsReceivableSearchTimer = setTimeout(() => {
    paginationState.accountsReceivable = 1;
    renderAccountsReceivable({ accounts: accountsReceivableCache });
  }, 180);
});

accountsReceivableDetailContent.addEventListener("click", async (event) => {
  const billButton = event.target.closest("[data-accounts-receivable-bill]");
  const cancelBillingButton = event.target.closest("[data-accounts-receivable-billing-cancel]");
  const deleteFileButton = event.target.closest("[data-accounts-receivable-file-delete]");
  if (billButton && activeAccountsReceivableQuoteId) {
    const action = billButton.dataset.accountsReceivableBill;
    const isCancel = action === "cancel";
    if (!confirm(isCancel ? "¿Estás seguro de cancelar la solicitud de factura?" : "¿Solicitar factura por el saldo disponible de esta cuenta?")) return;
    billButton.disabled = true;
    const originalText = billButton.textContent;
    billButton.textContent = isCancel ? "Cancelando..." : "Solicitando...";
    try {
      const data = await api(`/api/accounts-receivable/${activeAccountsReceivableQuoteId}/${isCancel ? "cancel-bill" : "bill"}`, {
        method: "POST",
        body: JSON.stringify({})
      });
      renderAccountsReceivableDetail(data);
      await refreshNavigationBadges();
    } catch (error) {
      accountsReceivableDetailContent.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
      billButton.disabled = false;
      billButton.textContent = originalText;
    }
    return;
  }

  if (cancelBillingButton && activeAccountsReceivableQuoteId) {
    if (!confirm("¿Cancelar esta parcialidad pendiente?")) return;
    try {
      await api(`/api/accounts-receivable/billing-movements/${cancelBillingButton.dataset.accountsReceivableBillingCancel}/cancel`, { method: "PATCH" });
      await openAccountsReceivableDetail(activeAccountsReceivableQuoteId);
    } catch (error) {
      accountsReceivableDetailContent.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  if (!deleteFileButton || !activeAccountsReceivableQuoteId) return;
  if (!confirm("¿Eliminar este archivo de cobranza?")) return;
  try {
    await api(`/api/accounts-receivable-files/${deleteFileButton.dataset.accountsReceivableFileDelete}`, {
      method: "DELETE"
    });
    await openAccountsReceivableDetail(activeAccountsReceivableQuoteId);
  } catch (error) {
    accountsReceivableDetailContent.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
  }
});

async function handleAccountsPayableMainPay(button) {
  const source = button.dataset.source || "ocp";
  const rawOrderId = String(button.dataset.orderId || "").trim();
  if (!rawOrderId) return;
  const requestedPayment = Math.max(0, Number(button.dataset.requestedPayment || 0));
  const remaining = Math.max(0, Number(button.dataset.remaining || 0));
  let manualAmount = 0;
  if (source === "ocp" && requestedPayment <= 0.004) {
    const captured = prompt("Monto del abono que deseas registrar:", remaining > 0.004 ? formatCurrency(remaining) : "");
    if (captured === null) return;
    manualAmount = parseCurrency(captured);
    if (!Number.isFinite(manualAmount) || manualAmount <= 0 || (remaining > 0 && manualAmount > remaining + 0.004)) {
      showErrorToast(`Ingresa un abono mayor a $0.00 y no superior a ${formatCurrency(remaining)}.`);
      return;
    }
  } else if (!confirm("¿Registrar este pago desde la lista principal?")) {
    return;
  }
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Pagando...";
  try {
    const endpoint =
      source === "ocgf"
        ? `/api/accounts-payable/ocgf/${Number(rawOrderId)}/paid`
        : source === "occom"
          ? `/api/accounts-payable/commissions/${encodeURIComponent(rawOrderId)}/paid${getAccountsPayableCommissionQuery()}`
          : requestedPayment > 0.004
            ? `/api/accounts-payable/${Number(rawOrderId)}/paid`
            : `/api/accounts-payable/${Number(rawOrderId)}/payment-orders`;
    const data = await api(endpoint, {
      method: "POST",
      body: manualAmount > 0 ? JSON.stringify({ monto: manualAmount, observaciones: "Abono registrado desde la lista principal" }) : undefined,
      toast: false
    });
    await openAccountsPayableDetail(
      source === "occom" ? rawOrderId : Number(rawOrderId),
      source,
      { persist: false }
    );
    refreshNavigationBadges();
    showSuccessToast(data.message || "Pago registrado correctamente.", "Pago registrado");
  } catch (error) {
    showErrorToast(error, "No se pudo registrar el pago.", "Error al pagar");
    button.disabled = false;
    button.textContent = originalText;
  }
}

function attachAccountsPayableRowOpen(container, rowSelector, idKey, type = "ocp") {
  container?.addEventListener("click", async (event) => {
    const payButton = event.target.closest("[data-payable-pay]");
    if (payButton) {
      event.preventDefault();
      event.stopPropagation();
      await handleAccountsPayableMainPay(payButton);
      return;
    }
    const row = event.target.closest(rowSelector);
    if (!row) return;
    markRowAlertRead(row, row.dataset[idKey]);
    await openAccountsPayableDetail(Number(row.dataset[idKey]), type === "ocp" ? "ocp" : type);
  });
}

[
  accountsPayablePendingCashRows,
  accountsPayablePendingRows,
  accountsPayablePaidCashRows,
  accountsPayablePaidRows
].forEach((container) => attachAccountsPayableRowOpen(container, "[data-accounts-payable-order-id]", "accountsPayableOrderId"));

[
  accountsPayableOcgfPendingCashRows,
  accountsPayableOcgfPendingRows,
  accountsPayableOcgfPaidCashRows,
  accountsPayableOcgfPaidRows
].forEach((container) => attachAccountsPayableRowOpen(container, "[data-accounts-payable-ocgf-order-id]", "accountsPayableOcgfOrderId", "ocgf"));

accountsPayableCommissionPendingRows?.addEventListener("click", async (event) => {
  const payButton = event.target.closest("[data-payable-pay]");
  if (payButton) {
    event.preventDefault();
    event.stopPropagation();
    await handleAccountsPayableMainPay(payButton);
    return;
  }
  const row = event.target.closest("[data-accounts-payable-commission-order-id]");
  if (!row) return;
  markRowAlertRead(row, row.dataset.accountsPayableCommissionOrderId);
  await openAccountsPayableDetail(row.dataset.accountsPayableCommissionOrderId, "occom");
});

accountsPayableCommissionPaidRows?.addEventListener("click", async (event) => {
  const row = event.target.closest("[data-accounts-payable-commission-order-id]");
  if (!row) return;
  markRowAlertRead(row, row.dataset.accountsPayableCommissionOrderId);
  await openAccountsPayableDetail(row.dataset.accountsPayableCommissionOrderId, "occom");
});

accountsPayableSearch?.addEventListener("input", () => {
  clearTimeout(accountsPayableSearchTimer);
  accountsPayableSearchTimer = setTimeout(() => {
    paginationState.accountsPayablePendingCash = 1;
    paginationState.accountsPayablePending = 1;
    paginationState.accountsPayablePaidCash = 1;
    paginationState.accountsPayablePaid = 1;
    paginationState.accountsPayableOcgfPendingCash = 1;
    paginationState.accountsPayableOcgfPending = 1;
    paginationState.accountsPayableOcgfPaidCash = 1;
    paginationState.accountsPayableOcgfPaid = 1;
    paginationState.accountsPayableCommissionPending = 1;
    paginationState.accountsPayableCommissionPaid = 1;
    renderAccountsPayable({ accounts: accountsPayableCache, ocgfAccounts: accountsPayableOcgfCache, commissionAccounts: accountsPayableCommissionCache });
  }, 180);
});

accountsPayableCommissionMonth?.addEventListener("change", () => {
  paginationState.accountsPayableCommissionPending = 1;
  paginationState.accountsPayableCommissionPaid = 1;
  loadAccountsPayableModule();
});

commissionsPendingRows?.addEventListener("click", (event) => {
  const row = event.target.closest("[data-commission-pending-id]");
  if (!row) return;
  const item = (commissionsCache.budgets || []).find((budget) => Number(budget.presupuestoId) === Number(row.dataset.commissionPendingId));
  if (item) renderCommissionDetail(item, "pending");
});

commissionsCreatedRows?.addEventListener("click", (event) => {
  if (event.target.closest("[data-commission-delete]")) return;
  const row = event.target.closest("[data-commission-created-id]");
  if (!row) return;
  const item = (commissionsCache.commissions || []).find((commission) => Number(commission.id) === Number(row.dataset.commissionCreatedId));
  if (item) renderCommissionDetail(item, "created");
});

commissionsCreatedRows?.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-commission-delete]");
  if (!deleteButton) return;
  const commissionId = Number(deleteButton.dataset.commissionDelete || 0);
  if (!commissionId || !confirm("¿Eliminar esta OCCOM? También se quitará de cuentas por pagar si ya estaba ligada.")) return;
  const originalText = deleteButton.textContent;
  deleteButton.disabled = true;
  deleteButton.textContent = "...";
  try {
    await api(`/api/commissions/${commissionId}`, { method: "DELETE" });
    await loadCommissionsModule();
  } catch (error) {
    commissionsCreatedRows.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  } finally {
    deleteButton.disabled = false;
    deleteButton.textContent = originalText;
  }
});

backToCommissionsButton?.addEventListener("click", () => {
  activeCommissionDetail = null;
  commissionsDetailView?.classList.add("hidden");
  commissionsListView?.classList.remove("hidden");
  loadCommissionsModule();
});

commissionsDetailContent?.addEventListener("change", (event) => {
  const supervisorSelect = event.target.closest("[data-commission-field='supervisorId']");
  if (!supervisorSelect) return;
  syncCommissionSupervisorOptions();
  updateCommissionSplitSummary();
});

commissionsDetailContent?.addEventListener("input", (event) => {
  if (activeCommissionDetail?.mode === "manual") {
    if (event.target.closest("[data-manual-commission-percent]")) {
      updateManualCommissionCalculation("percent");
      return;
    }
    if (event.target.closest("[data-manual-commission-amount]")) {
      updateManualCommissionCalculation("headerAmount");
      return;
    }
    if (event.target.closest("[data-commission-field='montoComision']")) {
      updateManualCommissionCalculation("rowAmount");
      return;
    }
  }
  const percentInput = event.target.closest("[data-commission-field='porcentajeDistribucion']");
  if (percentInput) {
    const row = percentInput.closest("[data-commission-split-row]");
    if (row) row.dataset.commissionManualPercent = "1";
    percentInput.value = String(Math.min(100, Math.max(0, Number(percentInput.value || 0))));
    const manualRows = [...commissionsDetailContent.querySelectorAll("[data-commission-split-row][data-commission-manual-percent='1']")];
    const manualTotal = manualRows.reduce(
      (sum, item) => sum + Math.min(100, Math.max(0, Number(item.querySelector("[data-commission-field='porcentajeDistribucion']")?.value || 0))),
      0
    );
    if (manualTotal > 100.01 && row) {
      const otherManualTotal = manualRows
        .filter((item) => item !== row)
        .reduce(
          (sum, item) => sum + Math.min(100, Math.max(0, Number(item.querySelector("[data-commission-field='porcentajeDistribucion']")?.value || 0))),
          0
        );
      percentInput.value = Math.max(0, 100 - otherManualTotal).toFixed(2);
    }
    updateCommissionSplitSummary();
    return;
  }
  if (event.target.closest("[data-commission-field='montoComision']") && activeCommissionDetail?.mode === "manual") return;
});

commissionsDetailContent?.addEventListener("focusout", (event) => {
  const moneyInput = event.target.closest(
    "[data-commission-field='montoComision'], [data-manual-commission-amount]"
  );
  if (!moneyInput) return;
  const value = parseSignedCurrency(moneyInput.value || 0);
  moneyInput.value = formatCurrency(value);
  if (activeCommissionDetail?.mode === "manual") {
    updateManualCommissionCalculation(
      moneyInput.matches("[data-manual-commission-amount]") ? "headerAmount" : "rowAmount"
    );
  }
});

commissionsDetailContent?.addEventListener("click", async (event) => {
  const addSplitButton = event.target.closest("[data-commission-add-split]");
  if (addSplitButton && activeCommissionDetail?.item) {
    const rowsContainer = commissionsDetailContent.querySelector("[data-commission-split-rows]");
    if (!rowsContainer) return;
    const nextSupervisorId = getNextAvailableCommissionSupervisorId();
    if (!nextSupervisorId) {
      commissionsDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">Ya no hay supervisores disponibles para dividir esta comisión.</div>`);
      return;
    }
    rowsContainer.insertAdjacentHTML(
      "beforeend",
      createCommissionSplitRow(activeCommissionDetail.item, {
        supervisorId: nextSupervisorId,
        amount: 0,
        removable: true
      })
    );
    syncCommissionSupervisorOptions();
    updateCommissionSplitSummary();
    return;
  }

  const removeSplitButton = event.target.closest("[data-commission-remove-split]");
  if (removeSplitButton) {
    removeSplitButton.closest("[data-commission-split-row]")?.remove();
    syncCommissionSupervisorOptions();
    updateCommissionSplitSummary();
    return;
  }

  const approveButton = event.target.closest("[data-commission-approve]");
  const rejectButton = event.target.closest("[data-commission-reject]");
  const approvalButton = approveButton || rejectButton;
  if (approvalButton) {
    const action = approveButton ? "approve" : "reject";
    const commissionId = Number(approvalButton.dataset.commissionApprove || approvalButton.dataset.commissionReject || 0);
    const originalText = approvalButton.textContent;
    approvalButton.disabled = true;
    approvalButton.textContent = action === "approve" ? "Aprobando..." : "Rechazando...";
    try {
      const data = await api(`/api/commissions/${commissionId}/${action}`, { method: "POST" });
      renderCommissions(data);
      const updated = (commissionsCache.commissions || []).find((commission) => Number(commission.id) === commissionId);
      if (updated) renderCommissionDetail(updated, "created");
    } catch (error) {
      commissionsDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    } finally {
      approvalButton.disabled = false;
      approvalButton.textContent = originalText;
    }
    return;
  }

  const deleteButton = event.target.closest("[data-commission-delete]");
  if (deleteButton) {
    const commissionId = Number(deleteButton.dataset.commissionDelete || 0);
    if (!commissionId || !confirm("¿Eliminar esta OCCOM? También se quitará de cuentas por pagar si ya estaba ligada.")) return;
    const originalText = deleteButton.textContent;
    deleteButton.disabled = true;
    deleteButton.textContent = "...";
    try {
      await api(`/api/commissions/${commissionId}`, { method: "DELETE" });
      await loadCommissionsModule();
    } catch (error) {
      commissionsDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    } finally {
      deleteButton.disabled = false;
      deleteButton.textContent = originalText;
    }
    return;
  }

  const manualButton = event.target.closest("[data-commission-generate-manual]");
  if (manualButton) {
    const row = commissionsDetailContent.querySelector("[data-commission-split-row='manual']");
    updateManualCommissionCalculation();
    const nombreManual = String(row?.querySelector("[data-commission-field='nombreManual']")?.value || "").trim();
    const porcentajeComision = Number(commissionsDetailContent.querySelector("[data-manual-commission-percent]")?.value || 0);
    if (!Number.isFinite(porcentajeComision) || porcentajeComision <= 0 || porcentajeComision > 5) {
      commissionsDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">La comisión extraordinaria debe ser mayor a 0% y máximo 5% del PVP2.</div>`);
      return;
    }
    const item = {
      nombreManual,
      descuento: 0,
      porcentajeComision,
      porcentajeDistribucion: 100,
      montoComision: parseSignedCurrency(row?.querySelector("[data-commission-field='montoComision']")?.value || 0)
    };
    if (!item.nombreManual || Math.abs(item.montoComision) <= 0.009) {
      commissionsDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">Captura la persona y el monto de comisión.</div>`);
      return;
    }
    const originalText = manualButton.textContent;
    let commissionWasCreated = false;
    manualButton.disabled = true;
    manualButton.textContent = "Generando...";
    try {
      const data = await api("/api/commissions", {
        method: "POST",
        body: JSON.stringify({
          presupuestoId: Number(manualButton.dataset.commissionGenerateManual || 0),
          manualCommission: true,
          items: [item]
        })
      });
      commissionWasCreated = true;
      manualButton.textContent = "Comisión generada";
      renderCommissions(data);
      const created = (commissionsCache.commissions || []).find(
        (commission) => Number(commission.presupuestoId) === Number(manualButton.dataset.commissionGenerateManual)
      );
      if (created) renderCommissionDetail(created, "created");
    } catch (error) {
      commissionsDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    } finally {
      if (!commissionWasCreated) {
        manualButton.disabled = false;
        manualButton.textContent = originalText;
      }
    }
    return;
  }

  const button = event.target.closest("[data-commission-generate]");
  if (!button) return;
  const available = Number(commissionsDetailContent.querySelector("[data-commission-available]")?.dataset.commissionAvailable || 0);
  const rows = [...commissionsDetailContent.querySelectorAll("[data-commission-split-row]")];
  const items = rows
    .map((row) => ({
      supervisorId: Number(row.querySelector("[data-commission-field='supervisorId']")?.value || 0),
      porcentajeDistribucion: Number(row.querySelector("[data-commission-rate]")?.dataset.commissionDistribution || 0),
      montoComision: parseSignedCurrency(row.querySelector("[data-commission-field='montoComision']")?.value || 0)
    }))
    .filter((item) => item.supervisorId && Math.abs(item.montoComision) > 0.009);
  const total = items.reduce((sum, item) => sum + item.montoComision, 0);
  if (!items.length) {
    commissionsDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">Selecciona supervisor y monto de comisión.</div>`);
    return;
  }
  const distributionTotal = items.reduce((sum, item) => sum + Number(item.porcentajeDistribucion || 0), 0);
  if (distributionTotal > 100.01) {
    commissionsDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">El porcentaje asignado no puede exceder el 100%.</div>`);
    return;
  }
  if (total > available + 0.01) {
    commissionsDetailContent.insertAdjacentHTML(
      "afterbegin",
      `<div class="empty-state">La comisión asignada excede el disponible (${formatCurrency(available)}).</div>`
    );
    return;
  }

  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Generando...";
  try {
    const data = await api("/api/commissions", {
      method: "POST",
      body: JSON.stringify({
        presupuestoId: Number(button.dataset.commissionGenerate),
        items
      })
    });
    try {
      const search = (commissionsSearch?.value || "").trim();
      const refreshed = await api(`/api/commissions?search=${encodeURIComponent(search)}`);
      renderCommissions(refreshed);
      const createdIds = new Set((data.createdCommissionIds || []).map((id) => Number(id)));
      const created =
        (commissionsCache.commissions || []).find((commission) => createdIds.has(Number(commission.id))) ||
        (commissionsCache.commissions || []).find(
          (commission) => Number(commission.presupuestoId) === Number(button.dataset.commissionGenerate)
        );
      if (created) renderCommissionDetail(created, "created");
    } catch (refreshError) {
      commissionsDetailContent.insertAdjacentHTML(
        "afterbegin",
        `<div class="empty-state">La comisión se generó correctamente. No se pudo refrescar el listado en este momento.</div>`
      );
    }
  } catch (error) {
    commissionsDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});

accountsPayableDetailContent.addEventListener("click", async (event) => {
  const deleteFileButton = event.target.closest("[data-accounts-payable-file-delete]");
  if (deleteFileButton && activeAccountsPayableOrderId) {
    if (!confirm("¿Eliminar este archivo de pago?")) return;
    try {
      await api(`/api/accounts-payable-files/${deleteFileButton.dataset.accountsPayableFileDelete}`, {
        method: "DELETE"
      });
      await openAccountsPayableDetail(activeAccountsPayableOrderId, activeAccountsPayableSource);
    } catch (error) {
      accountsPayableDetailContent.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  const paidButton = event.target.closest("#markAccountsPayablePaidButton");
  if (!paidButton || !activeAccountsPayableOrderId) return;
  paidButton.disabled = true;
  const originalText = paidButton.textContent;
  paidButton.textContent = "Marcando...";
  try {
    const endpoint =
      activeAccountsPayableSource === "ocgf"
        ? `/api/accounts-payable/ocgf/${activeAccountsPayableOrderId}/paid`
        : activeAccountsPayableSource === "occom"
          ? `/api/accounts-payable/commissions/${encodeURIComponent(String(activeAccountsPayableOrderId))}/paid${getAccountsPayableCommissionQuery()}`
        : `/api/accounts-payable/${activeAccountsPayableOrderId}/paid`;
    const data = await api(endpoint, { method: "POST" });
    renderAccountsPayableDetail(data);
  } catch (error) {
    accountsPayableDetailContent.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
  } finally {
    paidButton.disabled = false;
    paidButton.textContent = originalText;
  }
});

budgetDetailActions.addEventListener("click", async (event) => {
  const editButton = event.target.closest(".edit-budget-detail-button");
  const statusButton = event.target.closest(".budget-detail-status-button");
  const deleteButton = event.target.closest(".delete-budget-detail-button");
  if (!activeBudgetDetailId) return;

  if (editButton) {
    try {
      const data = await api(`/api/budgets/${activeBudgetDetailId}`);
      if (!isBudgetEditable(data.budget)) {
        budgetDetailContent.insertAdjacentHTML(
          "afterbegin",
          `<div class="empty-state">No puedes editar presupuestos cerrados.</div>`
        );
        return;
      }
      await openBudgetModal(data);
    } catch (error) {
      budgetDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  if (deleteButton) {
    const budget = budgetsCache.find((item) => item.id === activeBudgetDetailId);
    if (!confirm(`¿Eliminar definitivamente el proyecto ${budget?.folio || ""}? También se eliminará su información relacionada. Esta acción no se puede deshacer.`)) return;

    try {
      await api(`/api/budgets/${activeBudgetDetailId}`, { method: "DELETE" });
      closeBudgetDetail();
      await loadBudgets();
    } catch (error) {
      budgetDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  if (!statusButton) return;

  try {
    await api(`/api/budgets/${activeBudgetDetailId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ action: statusButton.dataset.action })
    });
    const data = await api(`/api/budgets/${activeBudgetDetailId}`);
    renderBudgetDetail(data);
    await loadBudgets();
  } catch (error) {
    budgetDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
});

budgetDetailContent.addEventListener("click", async (event) => {
  const inlineBackButton = event.target.closest("[data-budget-inline-back]");
  const deleteBudgetFileButton = event.target.closest("[data-budget-file-delete]");
  const deleteClientPoButton = event.target.closest("[data-client-po-delete]");
  const billBudgetButton = event.target.closest("[data-budget-bill]");

  if (inlineBackButton) {
    closeBudgetModal();
    return;
  }

  if (billBudgetButton && activeBudgetDetailId) {
    if (!confirm("¿Mandar este presupuesto a facturar y enviarlo a cuentas por cobrar?")) return;
    const partialText = prompt("Monto de esta parcialidad. Déjalo vacío para facturar todo el saldo pendiente:", "");
    if (partialText === null) return;
    const partialAmount = partialText.trim() ? parseCurrency(partialText) : null;
    if (partialText.trim() && (!Number.isFinite(partialAmount) || partialAmount <= 0)) {
      showErrorToast("Ingresa un monto válido para la parcialidad.");
      return;
    }
    const originalText = billBudgetButton.textContent;
    billBudgetButton.disabled = true;
    billBudgetButton.textContent = "Facturando...";
    try {
      await api(`/api/budgets/${activeBudgetDetailId}/bill`, {
        method: "POST",
        body: JSON.stringify({ monto: partialAmount })
      });
      await loadBudgets();
      if (canAccessModule("cuentas-cobrar")) await loadAccountsReceivableModule();
      await refreshNavigationBadges();
      closeBudgetDetail();
      setActiveModule("cuentas-cobrar");
    } catch (error) {
      document
        .querySelector("#clientPoModule")
        ?.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
      billBudgetButton.disabled = false;
      billBudgetButton.textContent = originalText;
    }
    return;
  }

  if (deleteClientPoButton && activeBudgetDetailId) {
    const isSharedClientPo = Boolean(purchaseFlowData?.clientPo?.shared);
    if (
      !confirm(
        isSharedClientPo
          ? "¿Quitar este proyecto de la PO compartida? Los demás proyectos conservarán el documento. Este proyecto saldrá de cuentas por cobrar y de OCP pendientes de creación."
          : "¿Quitar esta PO del presupuesto? Esto lo sacará de cuentas por cobrar y de OCP pendientes de creación."
      )
    ) {
      return;
    }
    const originalText = deleteClientPoButton.textContent;
    deleteClientPoButton.disabled = true;
    deleteClientPoButton.textContent = "Quitando...";
    try {
      await api(`/api/budgets/${activeBudgetDetailId}/client-po`, { method: "DELETE" });
      await loadPurchaseFlowModule(activeBudgetDetailId);
      await loadBudgets();
      if (canAccessModule("compras")) await loadPurchasesModule();
      if (canAccessModule("cuentas-cobrar")) await loadAccountsReceivableModule();
      await refreshNavigationBadges();
    } catch (error) {
      document
        .querySelector("#clientPoModule")
        ?.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
      deleteClientPoButton.disabled = false;
      deleteClientPoButton.textContent = originalText;
    }
    return;
  }

  if (deleteBudgetFileButton && activeBudgetDetailId) {
    if (!confirm("¿Eliminar este archivo?")) return;
    try {
      await api(`/api/budget-files/${deleteBudgetFileButton.dataset.budgetFileDelete}`, { method: "DELETE" });
      const data = await api(`/api/budgets/${activeBudgetDetailId}`);
      renderBudgetDetail(data);
    } catch (error) {
      budgetDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  const toggleCostsButton = event.target.closest(".toggle-budget-detail-costs");
  if (!toggleCostsButton) return;
  const costs = document.querySelector("#budgetReadonlyCosts");
  if (!costs) return;
  costs.classList.toggle("hidden");
  toggleCostsButton.textContent = costs.classList.contains("hidden") ? "Ver costos" : "Ocultar costos";
});

budgetDetailContent.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-client-quote-action]");
  const editDraftButton = event.target.closest("[data-client-quote-edit-draft]");
  const editVersionButton = event.target.closest("[data-client-quote-edit-version]");
  const previewVersionButton = event.target.closest("[data-client-quote-preview]");
  const regenerateVersionButton = event.target.closest("[data-client-quote-regenerate]");
  const deleteVersionButton = event.target.closest("[data-client-quote-delete-version]");
  const removeQuoteRowButton = event.target.closest(".remove-client-quote-row");

  if (removeQuoteRowButton) {
    clientQuoteRows = clientQuoteRows.filter((row) => String(row.id) !== String(removeQuoteRowButton.dataset.rowId));
    if (!clientQuoteRows.length) clientQuoteRows.push(newClientQuoteRow());
    renderClientQuoteRows();
    return;
  }

  if (editDraftButton && clientQuoteData) {
    const draft = (clientQuoteData.drafts || []).find(
      (item) => item.id === Number(editDraftButton.dataset.clientQuoteEditDraft)
    );
    if (!draft) return;
    editingClientQuoteDraftId = draft.id;
    editingClientQuoteVersionId = null;
    clientQuoteRows = (draft.items || []).map((row) => newClientQuoteRow(row));
    if (!clientQuoteRows.length) clientQuoteRows.push(newClientQuoteRow());
    clientQuoteDiscountAmount = Number(draft.descuentoMonto || 0);
    clientQuoteDiscountPercent = clientQuoteDiscountPercentFromAmount(clientQuoteDiscountAmount);
    clientQuoteDiscountVisible = clientQuoteDiscountPercent > 0;
    clientQuoteData = {
      ...clientQuoteData,
      draft: {
        ...(clientQuoteData.draft || {}),
        terminos: draft.terminos || clientQuoteData.defaultTerms || ""
      }
    };
    renderClientQuoteModule();
    return;
  }

  if (editVersionButton && clientQuoteData) {
    const quote = (clientQuoteData.versions || []).find(
      (item) => item.id === Number(editVersionButton.dataset.clientQuoteEditVersion)
    );
    if (!quote) return;
    editingClientQuoteDraftId = null;
    editingClientQuoteVersionId = quote.id;
    clientQuoteRows = (quote.items || []).map((row) => newClientQuoteRow(row));
    clientQuoteDiscountAmount = Number(quote.descuentoMonto || 0);
    clientQuoteDiscountPercent = clientQuoteDiscountPercentFromAmount(clientQuoteDiscountAmount);
    clientQuoteDiscountVisible = clientQuoteDiscountPercent > 0;
    const quoteTerms = quote.terminos || clientQuoteData.defaultTerms || "";
    clientQuoteData = {
      ...clientQuoteData,
      draft: {
        ...(clientQuoteData.draft || {}),
        terminos: quoteTerms
      }
    };
    renderClientQuoteModule();
    return;
  }

  if (previewVersionButton) {
    window.open(`/api/client-quotes/${previewVersionButton.dataset.clientQuotePreview}/preview`, "_blank", "noopener");
    return;
  }

  if (regenerateVersionButton) {
    regenerateVersionButton.disabled = true;
    const originalText = regenerateVersionButton.textContent;
    regenerateVersionButton.textContent = "Regenerando...";
    try {
      await api(`/api/client-quotes/${regenerateVersionButton.dataset.clientQuoteRegenerate}/regenerate-pdf`, {
        method: "POST"
      });
      await loadClientQuoteModule(activeBudgetDetailId);
    } catch (error) {
      showClientQuoteMessage(error.message);
    } finally {
      regenerateVersionButton.disabled = false;
      regenerateVersionButton.textContent = originalText;
    }
    return;
  }

  if (deleteVersionButton) {
    if (!window.confirm("¿Eliminar esta cotización? También se quitará de cuentas por cobrar si estaba ligada.")) return;
    deleteVersionButton.disabled = true;
    const originalText = deleteVersionButton.textContent;
    deleteVersionButton.textContent = "Eliminando...";
    try {
      await api(`/api/client-quotes/${deleteVersionButton.dataset.clientQuoteDeleteVersion}`, {
        method: "DELETE"
      });
      if (editingClientQuoteVersionId === Number(deleteVersionButton.dataset.clientQuoteDeleteVersion)) {
        editingClientQuoteVersionId = null;
      }
      await loadClientQuoteModule(activeBudgetDetailId);
      await loadBudgets();
    } catch (error) {
      showClientQuoteMessage(error.message);
    } finally {
      deleteVersionButton.disabled = false;
      deleteVersionButton.textContent = originalText;
    }
    return;
  }

  if (!actionButton || !activeBudgetDetailId) return;
  const action = actionButton.dataset.clientQuoteAction;

  if (action === "view-cost-parts") {
    clientQuoteVisibleBlock = document.querySelector("#clientQuoteBlockSelect")?.value || "equipos";
    renderClientQuoteCostParts();
    return;
  }

  if (action === "add-selected-parts") {
    const partsToAdd = [...clientQuoteSelectedCostParts]
      .map((key) => {
        const [block, index] = key.split(":");
        return clientQuoteData?.costParts?.[block]?.[Number(index)];
      })
      .filter(Boolean);
    clientQuoteRows = [
      ...clientQuoteRows.filter((row) => row.descripcion),
      ...partsToAdd.map((part) =>
        newClientQuoteRow({
          cantidad: part.cantidad,
          unidadMedida: part.unidadMedida,
          descripcion: part.descripcion,
          precio: part.precio
        })
      )
    ];
    clientQuoteSelectedCostParts = new Set();
    renderClientQuoteCostParts();
    renderClientQuoteRows();
    return;
  }

  if (action === "add-row") {
    clientQuoteRows.push(newClientQuoteRow());
    renderClientQuoteRows();
    return;
  }

  if (action === "toggle-discount") {
    clientQuoteDiscountVisible = true;
    document.querySelector("#clientQuoteDiscountBox")?.classList.remove("hidden");
    document.querySelector("#clientQuoteDiscountSummary")?.classList.remove("hidden");
    document.querySelector("#clientQuoteDiscountInput")?.focus();
    updateClientQuoteTotals();
    return;
  }

  if (action === "save-draft" || action === "save-version") {
    actionButton.disabled = true;
    const originalText = actionButton.textContent;
    actionButton.textContent =
      action === "save-draft" ? "Guardando borrador..." : "Generando...";
    try {
      const endpoint =
        action === "save-draft"
          ? `/api/budgets/${activeBudgetDetailId}/client-quote/draft`
          : editingClientQuoteVersionId
            ? `/api/budgets/${activeBudgetDetailId}/client-quote/versions/${editingClientQuoteVersionId}`
            : `/api/budgets/${activeBudgetDetailId}/client-quote/versions`;
      await api(endpoint, {
        method: action === "save-version" && editingClientQuoteVersionId ? "PUT" : "POST",
        body: JSON.stringify(clientQuotePayload())
      });
      await loadClientQuoteModule(activeBudgetDetailId);
    } catch (error) {
      showClientQuoteMessage(clientQuoteSaveErrorMessage(error, action));
    } finally {
      actionButton.disabled = false;
      actionButton.textContent = originalText;
    }
  }
});

document.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-supplier-order-action]");
  const editVersionButton = event.target.closest("[data-supplier-order-edit-version]");
  const reassignButton = event.target.closest("[data-supplier-order-reassign]");
  const previewButton = event.target.closest("[data-supplier-order-preview]");
  const approveButton = event.target.closest("[data-supplier-order-approve]");
  const regenerateButton = event.target.closest("[data-supplier-order-regenerate]");
  const cancelOrderButton = event.target.closest("[data-supplier-order-cancel]");
  const removeRowButton = event.target.closest(".remove-supplier-order-row");
  const deleteFileButton = event.target.closest("[data-supplier-order-file-delete]");

  if (reassignButton && activeBudgetDetailId) {
    await openExpenseReassignmentDialog({
      type: "OCP",
      recordId: Number(reassignButton.dataset.supplierOrderReassign),
      folio: reassignButton.dataset.supplierOrderFolio || "OCP",
      currentDestinationId: activeBudgetDetailId
    });
    return;
  }

  if (removeRowButton) {
    supplierOrderRows = supplierOrderRows.filter((row) => String(row.id) !== String(removeRowButton.dataset.rowId));
    if (!supplierOrderRows.length) supplierOrderRows.push(newSupplierOrderRow());
    renderSupplierOrderRows();
    return;
  }

  if (deleteFileButton) {
    try {
      await api(`/api/supplier-order-files/${deleteFileButton.dataset.supplierOrderFileDelete}`, {
        method: "DELETE"
      });
      purchaseFlowData = await api(`/api/budgets/${activeBudgetDetailId}/purchase-flow`);
      renderSupplierOrderFiles();
    } catch (error) {
      document
        .querySelector("#supplierOrderModule")
        ?.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  if (editVersionButton && purchaseFlowData) {
    const order = (purchaseFlowData.versions || []).find(
      (item) => item.id === Number(editVersionButton.dataset.supplierOrderEditVersion)
    );
    if (!order) return;
    editingSupplierOrderVersionId = order.id;
    supplierOrderRows = (order.items || []).map((row) => newSupplierOrderRow(row));
    renderSupplierOrderRows();
    const retentionBox = document.querySelector("#supplierOrderRetentionBox");
    if (retentionBox) retentionBox.classList.toggle("hidden", !order.retencionActiva);
    const retentionInput = document.querySelector("#supplierOrderRetentionInput");
    if (retentionInput) retentionInput.value = formatCurrency(order.retencionMonto || 0);
    const saveButton = document.querySelector('[data-supplier-order-action="save-version"]');
    if (saveButton) saveButton.textContent = "Actualizar versión";
    return;
  }

  if (previewButton) {
    window.open(`/api/supplier-orders/${previewButton.dataset.supplierOrderPreview}/preview`, "_blank", "noopener");
    return;
  }

  if (approveButton) {
    approveButton.disabled = true;
    const originalText = approveButton.textContent;
    approveButton.textContent = "Aprobando...";
    try {
      await api(`/api/supplier-orders/${approveButton.dataset.supplierOrderApprove}/approve`, {
        method: "POST"
      });
      await loadPurchaseFlowModule(activeBudgetDetailId);
      await loadPurchasesModule();
    } catch (error) {
      document
        .querySelector("#supplierOrderModule")
        ?.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
    } finally {
      approveButton.disabled = false;
      approveButton.textContent = originalText;
    }
    return;
  }

  if (regenerateButton) {
    regenerateButton.disabled = true;
    const originalText = regenerateButton.textContent;
    regenerateButton.textContent = "Regenerando...";
    try {
      await api(`/api/supplier-orders/${regenerateButton.dataset.supplierOrderRegenerate}/regenerate-pdf`, {
        method: "POST"
      });
      await loadPurchaseFlowModule(activeBudgetDetailId);
      await loadPurchasesModule();
    } catch (error) {
      document
        .querySelector("#supplierOrderModule")
        ?.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
    } finally {
      regenerateButton.disabled = false;
      regenerateButton.textContent = originalText;
    }
    return;
  }

  if (cancelOrderButton) {
    if (!confirm("¿Cancelar esta OCP? El presupuesto volverá a estar disponible.")) return;
    try {
      await api(`/api/supplier-orders/${cancelOrderButton.dataset.supplierOrderCancel}/cancel`, {
        method: "POST"
      });
      await loadPurchaseFlowModule(activeBudgetDetailId);
      await loadPurchasesModule();
    } catch (error) {
      document
        .querySelector("#supplierOrderModule")
        ?.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
    }
    return;
  }

  if (!actionButton || !activeBudgetDetailId) return;
  const action = actionButton.dataset.supplierOrderAction;

  if (action === "apply-general-percentage") {
    const input = document.querySelector("#supplierOrderGeneralPercentage");
    const percentage = Number(String(input?.value || "").replace("%", ""));
    if (!Number.isFinite(percentage) || percentage <= 0 || percentage > 100) {
      if (input) {
        input.setCustomValidity("Ingresa un porcentaje entre 0.01% y 100%.");
        input.reportValidity();
      }
      return;
    }
    if (input) input.setCustomValidity("");
    supplierOrderRows.forEach((row) => {
      row.porcentajeAplicado = normalizeSupplierOrderPercentage(percentage);
    });
    renderSupplierOrderRows();
    return;
  }

  if (action === "add-selected-parts") {
    const provider = getSelectedSupplierOrderProvider();
    if (!provider) {
      renderSupplierOrderCostParts();
      return;
    }

    const partsToAdd = [...supplierOrderSelectedCostParts]
      .map((key) => {
        const [block, _providerId, index] = key.split(":");
        return purchaseFlowData?.costParts?.[block]?.[Number(index)];
      })
      .filter(Boolean);

    supplierOrderRows = [
      ...supplierOrderRows.filter((row) => row.descripcion),
      ...partsToAdd.map((part) =>
        newSupplierOrderRow({
          presupuesto: part.presupuesto,
          proveedorId: provider.id,
          proveedorNombre: provider.empresa,
          descripcion: part.descripcion,
          cantidad: part.cantidad,
          precioUnitario: part.precioUnitario
        })
      )
    ];
    supplierOrderSelectedCostParts = new Set();
    renderSupplierOrderCostParts();
    renderSupplierOrderRows();
    return;
  }

  if (action === "add-row") {
    const provider = getSelectedSupplierOrderProvider();
    supplierOrderRows.push(
      newSupplierOrderRow({
        presupuesto: document.querySelector("#supplierOrderBlockSelect")?.value || "equipos",
        proveedorId: provider?.id || null,
        proveedorNombre: provider?.empresa || ""
      })
    );
    renderSupplierOrderRows();
    return;
  }

  if (action === "toggle-retention") {
    const box = document.querySelector("#supplierOrderRetentionBox");
    if (box) box.classList.toggle("hidden");
    renderSupplierOrderRows();
    return;
  }

  if (action === "save-draft" || action === "save-version") {
    actionButton.disabled = true;
    const originalText = actionButton.textContent;
    actionButton.textContent =
      action === "save-draft" ? "Guardando..." : editingSupplierOrderVersionId ? "Actualizando..." : "Generando...";
    try {
      const endpoint =
        action === "save-draft"
          ? `/api/budgets/${activeBudgetDetailId}/supplier-order/draft`
          : editingSupplierOrderVersionId
            ? `/api/budgets/${activeBudgetDetailId}/supplier-order/versions/${editingSupplierOrderVersionId}`
            : `/api/budgets/${activeBudgetDetailId}/supplier-order/versions`;
      await api(endpoint, {
        method: action === "save-version" && editingSupplierOrderVersionId ? "PUT" : "POST",
        body: JSON.stringify(supplierOrderPayload())
      });
      await loadPurchaseFlowModule(activeBudgetDetailId);
    } catch (error) {
      document
        .querySelector("#supplierOrderModule")
        ?.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
    } finally {
      actionButton.disabled = false;
      actionButton.textContent = originalText;
    }
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches("#clientPoForm input[name='poArchivo']")) {
    const form = event.target.closest("#clientPoForm");
    const sinPoInput = form?.elements?.sinPo;
    const button = form?.querySelector("#clientPoSubmitButton");
    if (event.target.files?.length && sinPoInput) sinPoInput.checked = false;
    if (button) {
      button.textContent = purchaseFlowData?.clientPo ? "Reemplazar PO" : "Subir PO Cliente";
    }
  }

  if (event.target.matches("#clientPoForm input[name='sinPo']")) {
    const form = event.target.closest("#clientPoForm");
    const fileInput = form?.elements?.poArchivo;
    if (event.target.checked && fileInput) fileInput.value = "";
    const button = document.querySelector("#clientPoSubmitButton");
    if (button) {
      button.textContent = event.target.checked
        ? "Confirmar sin PO"
        : purchaseFlowData?.clientPo
          ? "Reemplazar PO"
          : "Subir PO Cliente";
    }
  }

  if (event.target.matches("#purchaseFixedExpenseCatalogSelect")) {
    const fixed = (purchaseFixedExpenseCatalogs.fixedExpenses || []).find(
      (item) => Number(item.id) === Number(event.target.value)
    );
    const budget = document.querySelector("#purchaseFixedExpenseBudget");
    if (budget) budget.value = formatCurrency(fixed?.disponible ?? fixed?.presupuesto ?? 0);
  }

  if (event.target.matches("#fixedExpenseSinIva")) {
    const totalElement = document.querySelector("#fixedExpenseOrderTotal");
    if (totalElement) totalElement.textContent = formatCurrency(fixedExpenseOrderTotal());
  }

  const partCheckbox = event.target.closest("[data-client-quote-part]");
  const supplierPartCheckbox = event.target.closest("[data-supplier-order-part]");
  const supplierSelect = event.target.closest("#supplierOrderBlockSelect, #supplierOrderProviderInput");

  if (partCheckbox) {
    if (partCheckbox.checked) {
      clientQuoteSelectedCostParts.add(partCheckbox.dataset.clientQuotePart);
    } else {
      clientQuoteSelectedCostParts.delete(partCheckbox.dataset.clientQuotePart);
    }
    return;
  }

  if (supplierPartCheckbox) {
    if (supplierPartCheckbox.checked) {
      supplierOrderSelectedCostParts.add(supplierPartCheckbox.dataset.supplierOrderPart);
    } else {
      supplierOrderSelectedCostParts.delete(supplierPartCheckbox.dataset.supplierOrderPart);
    }
    return;
  }

  if (supplierSelect) {
    supplierOrderVisibleBlock = document.querySelector("#supplierOrderBlockSelect")?.value || "equipos";
    if (supplierSelect.id === "supplierOrderProviderInput") {
      const provider = getSelectedSupplierOrderProvider();
      supplierSelect.dataset.providerId = provider?.id || "";
    }
    supplierOrderSelectedCostParts = new Set();
    renderSupplierOrderCostParts();
  }
});

document.addEventListener("input", (event) => {
  const field = event.target.dataset.clientQuoteField;
  const supplierField = event.target.dataset.supplierOrderField;
  const fixedExpenseOrderField = event.target.dataset.fixedExpenseOrderField;

  if (event.target.id === "supplierOrderProviderInput") {
    const provider = getSelectedSupplierOrderProvider();
    event.target.dataset.providerId = provider?.id || "";
    supplierOrderSelectedCostParts = new Set();
    renderSupplierOrderCostParts();
    return;
  }

  if (event.target.id === "fixedExpenseRetentionInput") {
    const totalElement = document.querySelector("#fixedExpenseOrderTotal");
    if (totalElement) totalElement.textContent = formatCurrency(fixedExpenseOrderTotal());
    return;
  }

  if (event.target.id === "clientQuoteDiscountInput") {
    clientQuoteDiscountPercent = normalizeClientQuoteDiscountPercent(event.target.value);
    updateClientQuoteTotals();
    return;
  }

  const commissionDiscountForm = event.target.closest("#accountsPayableCommissionDiscountForm");
  if (
    commissionDiscountForm &&
    (event.target.name === "descuentoMonto" || event.target.name === "adeudoMonto")
  ) {
    updateAccountsPayableCommissionDiscountSummary(commissionDiscountForm);
    return;
  }

  if (fixedExpenseOrderField) {
    const rowElement = event.target.closest("[data-row-id]");
    const row = purchaseFixedExpenseOrderRows.find((item) => item.id === rowElement?.dataset.rowId);
    if (!row) return;
    if (fixedExpenseOrderField === "cantidad") {
      row.cantidad = Number(event.target.value || 0);
    } else if (fixedExpenseOrderField === "precioUnitario") {
      row.precioUnitario = parseCurrency(event.target.value);
    } else {
      row[fixedExpenseOrderField] = event.target.value;
    }
    const rowTotal = rowElement?.querySelector("[data-fixed-expense-row-total]");
    const totalElement = document.querySelector("#fixedExpenseOrderTotal");
    if (rowTotal) rowTotal.textContent = formatCurrency(calculateFixedExpenseOrderTotal(row));
    if (totalElement) totalElement.textContent = formatCurrency(fixedExpenseOrderTotal());
    return;
  }

  if (event.target.id === "supplierOrderRetentionInput") {
    const totalElement = document.querySelector("#supplierOrderTotal");
    const paymentElement = document.querySelector("#supplierOrderPaymentTotal");
    if (totalElement) totalElement.textContent = formatCurrency(supplierOrderTotal());
    if (paymentElement) paymentElement.textContent = formatCurrency(supplierOrderPaymentSubtotal());
    return;
  }

  if (supplierField) {
    const rowElement = event.target.closest("[data-row-id]");
    const row = supplierOrderRows.find((item) => String(item.id) === String(rowElement?.dataset.rowId));
    if (!row) return;

    if (supplierField === "cantidad") {
      row.cantidad = Number(event.target.value || 0);
    } else if (supplierField === "precioUnitario") {
      row.precioUnitario = parseCurrency(event.target.value);
    } else if (supplierField === "porcentajeAplicado") {
      row.porcentajeAplicado = normalizeSupplierOrderPercentage(event.target.value);
      if (Number(event.target.value || 0) > 100) event.target.value = "100.00";
    } else if (supplierField === "presupuesto") {
      row.presupuesto = normalizeBudgetBlock(event.target.value);
    } else {
      row[supplierField] = event.target.value;
    }
    row.montoBasePresupuesto = calculateSupplierOrderBaseTotal(row);
    const subtotal = rowElement.querySelector("[data-supplier-order-row-total]") || rowElement.querySelector("b");
    const payment = rowElement.querySelector("[data-supplier-order-row-payment]");
    if (subtotal) {
      subtotal.textContent = formatCurrency(calculateSupplierOrderTotal(row));
      subtotal.title = `Monto total OCP: ${formatCurrency(calculateSupplierOrderTotal(row))}`;
    }
    if (payment) payment.textContent = formatCurrency(calculateSupplierOrderPaymentAmount(row));
    const totalElement = document.querySelector("#supplierOrderTotal");
    const paymentElement = document.querySelector("#supplierOrderPaymentTotal");
    if (totalElement) totalElement.textContent = formatCurrency(supplierOrderTotal());
    if (paymentElement) paymentElement.textContent = formatCurrency(supplierOrderPaymentSubtotal());
    return;
  }

  if (!field) return;
  const rowElement = event.target.closest("[data-row-id]");
  const row = clientQuoteRows.find((item) => String(item.id) === String(rowElement?.dataset.rowId));
  if (!row) return;

  if (field === "cantidad") {
    row.cantidad = Number(event.target.value || 0);
  } else if (field === "precio") {
    row.precio = parseCurrency(event.target.value);
  } else {
    row[field] = event.target.value;
  }
  const subtotal = rowElement.querySelector("b");
  if (subtotal) subtotal.textContent = formatCurrency(calculateClientQuoteSubtotal(row));
  const totalElement = document.querySelector("#clientQuoteTotal");
  if (totalElement) updateClientQuoteTotals();
});

budgetDetailContent.addEventListener("submit", async (event) => {
  const poForm = event.target.closest("#clientPoForm");
  if (!poForm || !activeBudgetDetailId) return;
  event.preventDefault();

  const hadClientPo = Boolean(purchaseFlowData?.clientPo);
  const isSinPoSubmission = Boolean(poForm.elements.sinPo?.checked);
  const selectedPoFile = poForm.elements.poArchivo?.files?.[0] || null;
  const formData = new FormData(poForm);
  formData.set("sinPo", isSinPoSubmission ? "true" : "false");
  const submitButton = poForm.querySelector("#clientPoSubmitButton");
  const originalText = submitButton?.textContent || "";

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = hadClientPo ? "Actualizando..." : "Guardando...";
    }
    const response = await fetch(`/api/budgets/${activeBudgetDetailId}/client-po`, {
      method: "POST",
      credentials: "same-origin",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "No se pudo subir la PO del cliente.");
    await loadBudgets();
    if (canAccessModule("cuentas-cobrar")) await loadAccountsReceivableModule();
    await refreshNavigationBadges();
    // Permanece en el presupuesto actual después de cargar o reemplazar la PO.
    // El flujo se refresca en el mismo detalle para mostrar la PO activa y
    // habilitar las opciones de compra sin cambiar de módulo.
    await loadPurchaseFlowModule(activeBudgetDetailId);
    if (isSinPoSubmission) {
      showSuccessToast(
        data.unchanged
          ? "El presupuesto ya estaba confirmado como Sin PO."
          : "El presupuesto quedó confirmado correctamente como Sin PO.",
        "Sin PO confirmado"
      );
    } else if (selectedPoFile) {
      showSuccessToast(
        hadClientPo
          ? `La PO ${selectedPoFile.name} se reemplazó correctamente.`
          : `La PO ${selectedPoFile.name} se cargó correctamente.`,
        hadClientPo ? "PO reemplazada" : "PO cargada"
      );
    } else {
      showSuccessToast("La PO del cliente se guardó correctamente.", "PO guardada");
    }
  } catch (error) {
    showErrorToast(error, "No se pudo guardar la PO del cliente.", "Error al guardar PO");
    document
      .querySelector("#clientPoModule")
      ?.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
});

document.addEventListener("submit", async (event) => {
  const fileForm = event.target.closest("#supplierOrderFileForm");
  if (!fileForm || !activeBudgetDetailId) return;
  event.preventDefault();

  const formData = new FormData(fileForm);
  try {
    const response = await fetch(`/api/budgets/${activeBudgetDetailId}/supplier-order/files`, {
      method: "POST",
      credentials: "same-origin",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "No se pudieron subir los archivos.");
    purchaseFlowData.files = data.files || [];
    fileForm.reset();
    renderSupplierOrderFiles();
  } catch (error) {
    document
      .querySelector("#supplierOrderModule")
      ?.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("#purchaseFixedExpenseForm");
  if (!form) return;
  event.preventDefault();

  const formData = new FormData(form);
  const gastoFijoId = Number(formData.get("gastoFijoId") || 0);
  if (activePurchaseFixedExpenseId) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent || "Guardar cabecera";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Guardando...";
    }
    try {
      const data = await api(`/api/purchases/fixed-expenses/${activePurchaseFixedExpenseId}/header`, {
        method: "PATCH",
        body: JSON.stringify({
          gastoFijoId,
          sucursal: String(formData.get("sucursal") || "").trim()
        })
      });
      await loadPurchaseFixedExpenseCatalogs();
      renderPurchaseFixedExpenseDetail({
        ...activePurchaseFixedExpenseData,
        ...data,
        fixedExpenses: purchaseFixedExpenseCatalogs.fixedExpenses,
        providers: purchaseFixedExpenseCatalogs.providers
      });
      await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
    } catch (error) {
      purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
    return;
  }

  const providerInput = form.querySelector("#purchaseFixedExpenseProviderInput");
  const providerId = Number(formData.get("proveedorId") || 0);
  const provider = (purchaseFixedExpenseCatalogs.providers || []).find(
    (item) => Number(item.id) === providerId
  ) || null;
  if (!provider) {
    purchaseFixedExpenseDetailContent.insertAdjacentHTML(
      "afterbegin",
      `<div class="empty-state">Selecciona un proveedor registrado de la lista.</div>`
    );
    providerInput?.focus();
    return;
  }
  try {
    const data = await api("/api/purchases/fixed-expenses", {
      method: "POST",
      body: JSON.stringify({
        gastoFijoId,
        proveedorId: provider?.id || 0,
        sucursal: String(formData.get("sucursal") || "").trim(),
        descripcion: String(formData.get("descripcion") || "").trim(),
        fecha: String(formData.get("fecha") || "")
      })
    });
    activePurchaseFixedExpenseId = data.expense?.id || null;
    await loadPurchaseFixedExpenseCatalogs();
    renderPurchaseFixedExpenseDetail(data);
    await loadPurchaseFixedExpenses(purchaseFixedExpenseSearch.value);
  } catch (error) {
    purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("#fixedExpenseFileForm");
  if (!form || !activePurchaseFixedExpenseId) return;
  event.preventDefault();

  const formData = new FormData(form);
  try {
    const response = await fetch(`/api/purchases/fixed-expenses/${activePurchaseFixedExpenseId}/files`, {
      method: "POST",
      credentials: "same-origin",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "No se pudieron subir los archivos.");
    form.reset();
    await loadPurchaseFixedExpenseCatalogs();
    renderPurchaseFixedExpenseDetail(data);
  } catch (error) {
    purchaseFixedExpenseDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
});

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-payment-order-status]");
  if (!button) return;
  event.preventDefault();
  const paymentOrderId = Number(button.dataset.paymentOrderId || 0);
  const estadoMovimiento = String(button.dataset.paymentOrderStatus || "");
  if (!paymentOrderId || !estadoMovimiento) return;
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Actualizando...";
  try {
    await api(`/api/payment-orders/${paymentOrderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ estadoMovimiento })
    });
    await openAccountsPayableDetail(activeAccountsPayableOrderId, activeAccountsPayableSource);
  } catch (error) {
    accountsPayableDetailContent.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});

function refreshAccountsReceivablePartialityForm(form, source = "monto") {
  if (!form) return;
  const total = Math.max(0, Number(form.dataset.billingTotal || 0));
  const remaining = Math.max(0, Number(form.dataset.billingRemaining || 0));
  const amountInput = form.elements.monto;
  const percentInput = form.elements.porcentaje;
  const after = form.querySelector("[data-billing-after]");
  if (!amountInput || !percentInput) return;

  if (source === "porcentaje") {
    const percent = Math.min(100, Math.max(0, Number(percentInput.value || 0)));
    const amount = Math.min(remaining, Math.round(total * (percent / 100) * 100) / 100);
    amountInput.value = formatCurrency(amount);
  } else {
    const amount = Math.min(remaining, Math.max(0, parseCurrency(amountInput.value)));
    const percent = total > 0 ? Math.min(100, (amount / total) * 100) : 0;
    percentInput.value = percent.toFixed(2);
  }

  const currentAmount = Math.min(remaining, Math.max(0, parseCurrency(amountInput.value)));
  if (after) after.textContent = formatCurrency(Math.max(0, remaining - currentAmount));
}

document.addEventListener("keydown", (event) => {
  const form = event.target.closest?.("#accountsReceivableBillingForm");
  if (form && event.key === "Enter") {
    event.preventDefault();
  }
});

document.addEventListener("input", (event) => {
  const form = event.target.closest?.("#accountsReceivableBillingForm");
  if (!form) return;
  if (event.target.name === "monto") refreshAccountsReceivablePartialityForm(form, "monto");
  if (event.target.name === "porcentaje") refreshAccountsReceivablePartialityForm(form, "porcentaje");
});

document.addEventListener("focusout", (event) => {
  const form = event.target.closest?.("#accountsReceivableBillingForm");
  if (!form || event.target.name !== "monto") return;
  const remaining = Math.max(0, Number(form.dataset.billingRemaining || 0));
  const amount = Math.min(remaining, Math.max(0, parseCurrency(event.target.value)));
  event.target.value = formatCurrency(amount);
  refreshAccountsReceivablePartialityForm(form, "monto");
});

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-accounts-receivable-add-partial]");
  const form = button?.closest("#accountsReceivableBillingForm");
  if (!button || !form || !activeAccountsReceivableQuoteId) return;
  event.preventDefault();

  const amount = parseCurrency(form.elements.monto?.value || 0);
  const remaining = Math.max(0, Number(form.dataset.billingRemaining || 0));
  if (!Number.isFinite(amount) || amount <= 0) {
    showErrorToast("Ingresa un monto válido para la parcialidad.");
    return;
  }
  if (amount > remaining + 0.004) {
    showErrorToast(`El monto no puede superar el saldo por facturar de ${formatCurrency(remaining)}.`);
    return;
  }

  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Registrando...";
  try {
    const data = await api(`/api/accounts-receivable/${activeAccountsReceivableQuoteId}/bill`, {
      method: "POST",
      body: JSON.stringify({
        monto: amount,
        observaciones: form.elements.observaciones?.value || ""
      }),
      toast: false
    });
    renderAccountsReceivableDetail(data);
    await loadAccountsReceivableModule();
    await openAccountsReceivableDetail(activeAccountsReceivableQuoteId);
    await refreshNavigationBadges();
    showSuccessToast(data.message || `Parcialidad de ${formatCurrency(amount)} registrada correctamente.`, "Parcialidad registrada");
  } catch (error) {
    showErrorToast(error, "No se pudo registrar la parcialidad.", "Error al registrar parcialidad");
    button.disabled = false;
    button.textContent = originalText;
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("#accountsReceivableUploadForm");
  if (!form || !activeAccountsReceivableQuoteId) return;
  event.preventDefault();

  const formData = new FormData(form);
  try {
    const response = await fetch(`/api/accounts-receivable/${activeAccountsReceivableQuoteId}/files`, {
      method: "POST",
      credentials: "same-origin",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.message || "No se pudo cargar el archivo de cobranza.");
      error.status = response.status;
      throw error;
    }
    form.reset();
    renderAccountsReceivableDetail(data);
    showSuccessToast(data.message || "Archivo de cobranza cargado correctamente.");
  } catch (error) {
    showErrorToast(error, "No se pudo cargar el archivo de cobranza.");
    accountsReceivableDetailContent.insertAdjacentHTML(
      "afterbegin",
      `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`
    );
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("#accountsPayablePaymentOrderForm");
  if (!form || !activeAccountsPayableOrderId) return;
  event.preventDefault();

  const submitButton = form.querySelector("button[type='submit']");
  const originalText = submitButton?.textContent || "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Generando...";
  }

  try {
    const formData = new FormData(form);
    const endpoint =
      activeAccountsPayableSource === "ocgf"
        ? `/api/accounts-payable/ocgf/${activeAccountsPayableOrderId}/payment-orders`
        : `/api/accounts-payable/${activeAccountsPayableOrderId}/payment-orders`;
    const amount = parseCurrency(formData.get("monto"));
    const maxBalance = Number(form.dataset.saldoRestante || 0);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error("Ingresa un monto de abono mayor a $0.00.");
    }
    if (maxBalance > 0 && amount > maxBalance + 0.004) {
      throw new Error(`El abono no puede superar el saldo restante de ${formatCurrency(maxBalance)}.`);
    }
    const data = await api(endpoint, {
      method: "POST",
      body: JSON.stringify({
        monto: amount,
        metodoPago: String(formData.get("metodoPago") || "").trim(),
        referencia: String(formData.get("referencia") || "").trim(),
        observaciones: String(formData.get("observaciones") || "").trim()
      }),
      toast: false
    });
    renderAccountsPayableDetail(data);
    const listData = await api("/api/accounts-payable", { toast: false });
    renderAccountsPayable(listData);
    refreshNavigationBadges();
    showSuccessToast(`Abono de ${formatCurrency(amount)} registrado correctamente.`, "Abono registrado");
  } catch (error) {
    showErrorToast(error, "No se pudo registrar el abono.", "Error al registrar abono");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
});

document.addEventListener("submit", async (event) => {
  const commissionDiscountForm = event.target.closest("#accountsPayableCommissionDiscountForm");
  if (commissionDiscountForm && activeAccountsPayableOrderId && activeAccountsPayableSource === "occom") {
    event.preventDefault();
    const submitButton = commissionDiscountForm.querySelector("button[type='submit']");
    const originalText = submitButton?.textContent || "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Actualizando...";
    }
    try {
      const amountToApply = parseCurrency(commissionDiscountForm.elements.adeudoMonto?.value || 0);
      const maxApplicable = Number(commissionDiscountForm.elements.adeudoMonto?.dataset.creditMax || 0);
      if (amountToApply < 0 || amountToApply > maxApplicable + 0.009) {
        throw new Error(`El monto a aplicar debe estar entre $0.00 y ${formatCurrency(maxApplicable)}.`);
      }
      const payload = {
        descuentoMonto: 0,
        descuentoDetalle: "",
        adeudoMonto: amountToApply,
        adeudoDetalle: ""
      };
      const data = await api(
        `/api/accounts-payable/commissions/${encodeURIComponent(String(activeAccountsPayableOrderId))}/discount${getAccountsPayableCommissionQuery()}`,
        {
          method: "POST",
          body: JSON.stringify(payload)
        }
      );
      renderAccountsPayableDetail(data);
      const commissionMonth = accountsPayableCommissionMonth?.value || "";
      const query = commissionMonth ? `?commissionMonth=${encodeURIComponent(commissionMonth)}` : "";
      const listData = await api(`/api/accounts-payable${query}`);
      renderAccountsPayable(listData);
      refreshNavigationBadges();
    } catch (error) {
      accountsPayableDetailContent.insertAdjacentHTML("afterbegin", `<div class="client-quote-empty">${escapeHtml(error.message)}</div>`);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
    return;
  }

  const form = event.target.closest("#accountsPayableUploadForm");
  if (!form || !activeAccountsPayableOrderId) return;
  event.preventDefault();

  const formData = new FormData(form);
  try {
    const endpoint =
      activeAccountsPayableSource === "ocgf"
        ? `/api/accounts-payable/ocgf/${activeAccountsPayableOrderId}/files`
        : activeAccountsPayableSource === "occom"
          ? `/api/accounts-payable/commissions/${encodeURIComponent(String(activeAccountsPayableOrderId))}/files${getAccountsPayableCommissionQuery()}`
        : `/api/accounts-payable/${activeAccountsPayableOrderId}/files`;
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "same-origin",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "No se pudo cargar el archivo de pago.");
    form.reset();
    renderAccountsPayableDetail(data);
    showSuccessToast(data.message || "Documento de pago cargado correctamente.", "Documento guardado");
  } catch (error) {
    showErrorToast(error, "No se pudo cargar el archivo de pago.", "Error al cargar documento");
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-budget-block-form]");
  if (!form || !activeBudgetDetailId) return;
  event.preventDefault();

  const isPurchaseContext = Boolean(form.closest("#supplierOrderModule"));
  const formData = new FormData(form);
  const type = form.dataset.budgetBlockForm;
  const payload =
    type === "transfer"
      ? {
          origen: normalizeBudgetBlock(formData.get("origen")),
          destino: normalizeBudgetBlock(formData.get("destino")),
          monto: parseCurrency(formData.get("monto"))
        }
      : {
          bloque: normalizeBudgetBlock(formData.get("bloque")),
          monto: parseCurrency(formData.get("monto"))
        };

  try {
    await api(`/api/budgets/${activeBudgetDetailId}/${type === "transfer" ? "transfers" : "additionals"}`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    form.reset();
    if (isPurchaseContext) {
      await loadPurchaseFlowModule(activeBudgetDetailId);
      await loadPurchasesModule();
    } else {
      const data = await api(`/api/budgets/${activeBudgetDetailId}`);
      renderBudgetDetail(data);
      await loadBudgets();
    }
  } catch (error) {
    const target = isPurchaseContext ? document.querySelector("#supplierOrderModule") : budgetDetailContent;
    target?.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
});

budgetDetailContent.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-budget-financial-form]");
  if (!form || !activeBudgetDetailId) return;
  event.preventDefault();

  const formData = new FormData(form);
  const payload =
    form.dataset.budgetFinancialForm === "value"
      ? { valorVenta: Number(formData.get("valorVenta") || 0) }
      : { comisionSupervisor: Number(formData.get("comisionSupervisor") || 0) };

  try {
    await api(`/api/budgets/${activeBudgetDetailId}/financial`, {
      method: "PATCH",
      body: JSON.stringify(payload)
    });
    const data = await api(`/api/budgets/${activeBudgetDetailId}`);
    renderBudgetDetail(data);
  } catch (error) {
    budgetDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
});

budgetDetailContent.addEventListener("change", async (event) => {
  const warrantyToggle = event.target.closest("[data-budget-financial-toggle='sinGarantia']");
  if (!warrantyToggle || !activeBudgetDetailId) return;

  try {
    await api(`/api/budgets/${activeBudgetDetailId}/financial`, {
      method: "PATCH",
      body: JSON.stringify({ sinGarantia: warrantyToggle.checked })
    });
    const data = await api(`/api/budgets/${activeBudgetDetailId}`);
    renderBudgetDetail(data);
  } catch (error) {
    budgetDetailContent.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
});

document.addEventListener("focusin", (event) => {
  if (!event.target.classList.contains("budget-money-input")) return;
  const value = parseCurrency(event.target.value);
  event.target.value = value ? String(value) : "";
});

document.addEventListener("focusout", (event) => {
  if (event.target.id === "clientQuoteDiscountInput") {
    clientQuoteDiscountPercent = normalizeClientQuoteDiscountPercent(event.target.value);
    event.target.value = clientQuoteDiscountPercent.toFixed(2);
    updateClientQuoteTotals();
    return;
  }
  if (!event.target.classList.contains("budget-money-input")) return;
  event.target.value = formatCurrency(parseCurrency(event.target.value));
  const commissionDiscountForm = event.target.closest("#accountsPayableCommissionDiscountForm");
  if (commissionDiscountForm) updateAccountsPayableCommissionDiscountSummary(commissionDiscountForm);
});

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  userFormStatus.textContent = "";
  if (!validateUserFormBeforeSubmit()) return;
  createUserButton.disabled = true;
  createUserButton.textContent = "Creando...";

  const formData = new FormData(userForm);
  const payload = {
    nombre: String(formData.get("nombre") || "").trim(),
    apellido: String(formData.get("apellido") || "").trim(),
    usuario: String(formData.get("usuario") || "").trim(),
    password: String(formData.get("password") || ""),
    rolId: Number(formData.get("rolId") || 0),
    comisionSupervisor: Number(formData.get("comisionSupervisor") || 0),
    banco: String(formData.get("banco") || "").trim(),
    cuenta: String(formData.get("cuenta") || "").trim(),
    clabe: String(formData.get("clabe") || "").trim(),
    permisosEspeciales: formData.getAll("permisosEspeciales").map(Number),
    rolesTemporales: formData.getAll("rolesTemporales").map(Number),
    alcancesSucursal: [...(branchAccessScopes?.querySelectorAll("[data-branch-scope]") || [])]
      .map((scopeElement) => ({
        sucursalId: Number(scopeElement.dataset.branchId || 0),
        permisos: [...scopeElement.querySelectorAll("[data-branch-permission-id]:checked")]
          .map((input) => Number(input.dataset.branchPermissionId || 0))
          .filter(Boolean)
      }))
      .filter((scope) => scope.sucursalId && scope.permisos.length)
  };

  try {
    await api(editingUserId ? `/api/users/${editingUserId}` : "/api/users", {
      method: editingUserId ? "PUT" : "POST",
      body: JSON.stringify(payload)
    });
    userForm.reset();
    closeUserModal();
    await loadUsers();
  } catch (error) {
    userFormStatus.textContent = error.message;
    const errorField = getUserFieldFromErrorMessage(error.message);
    if (errorField) markUserFieldInvalid(errorField, error.message);
  } finally {
    createUserButton.disabled = false;
    createUserButton.textContent = editingUserId ? "Guardar cambios" : "Crear usuario";
  }
});


userCreditForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canManageUserCredits()) return;
  userCreditFormStatus.textContent = "";
  saveUserCreditButton.disabled = true;
  saveUserCreditButton.textContent = "Registrando...";

  const formData = new FormData(userCreditForm);
  const payload = {
    usuarioId: Number(formData.get("usuarioId") || 0),
    tipo: String(formData.get("tipo") || "PRESTAMO"),
    monto: parseCurrency(formData.get("monto")),
    fechaOtorgamiento: String(formData.get("fechaOtorgamiento") || ""),
    concepto: String(formData.get("concepto") || "").trim(),
    notas: String(formData.get("notas") || "").trim()
  };

  const detailUserId = activeUserCreditDetailId;
  try {
    await api("/api/user-credits", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    closeUserCreditModal();
    await loadUserCredits();
    if (detailUserId) await openUserCreditDetail(detailUserId, { persist: false });
  } catch (error) {
    userCreditFormStatus.textContent = error.message;
  } finally {
    saveUserCreditButton.disabled = false;
    saveUserCreditButton.textContent = "Registrar";
  }
});

userCreditPaymentForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!activeUserCreditId || !canManageUserCredits()) return;
  userCreditPaymentStatus.textContent = "";
  saveUserCreditPaymentButton.disabled = true;
  saveUserCreditPaymentButton.textContent = "Guardando...";

  const formData = new FormData(userCreditPaymentForm);
  const payload = {
    monto: parseCurrency(formData.get("monto")),
    referencia: String(formData.get("referencia") || "").trim(),
    detalle: String(formData.get("detalle") || "").trim()
  };
  const detailUserId = activeUserCreditDetailId;

  try {
    await api(`/api/user-credits/${activeUserCreditId}/payments`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    closeUserCreditPaymentModal();
    await loadUserCredits();
    if (detailUserId) await openUserCreditDetail(detailUserId, { persist: false });
  } catch (error) {
    userCreditPaymentStatus.textContent = error.message;
  } finally {
    saveUserCreditPaymentButton.disabled = false;
    saveUserCreditPaymentButton.textContent = "Guardar abono";
  }
});

clientForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clientFormStatus.textContent = "";
  saveClientButton.disabled = true;
  saveClientButton.textContent = "Guardando...";

  const formData = new FormData(clientForm);
  const payload = {
    empresa: String(formData.get("empresa") || "").trim(),
    sucursalId: Number(formData.get("sucursalId") || 0) || null,
    nombre: String(formData.get("nombre") || "").trim(),
    telefono: String(formData.get("telefono") || "").trim(),
    email: String(formData.get("email") || "").trim()
  };

  try {
    await api(editingClientId ? `/api/clients/${editingClientId}` : "/api/clients", {
      method: editingClientId ? "PUT" : "POST",
      body: JSON.stringify(payload)
    });
    closeClientModal();
    clientDirectoryCatalogCache = [];
    await loadClients();
  } catch (error) {
    clientFormStatus.textContent = error.message;
  } finally {
    saveClientButton.disabled = false;
    saveClientButton.textContent = editingClientId ? "Guardar cambios" : "Guardar contacto";
  }
});

clientDocumentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!activeDocsClientId) return;

  uploadClientDocButton.disabled = true;
  uploadClientDocButton.textContent = "Cargando...";

  const formData = new FormData(clientDocumentForm);

  try {
    const response = await fetch(`/api/clients/${activeDocsClientId}/files`, {
      method: "POST",
      credentials: "same-origin",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "No se pudo cargar el documento.");

    clientDocumentForm.reset();
    const files = await api(`/api/clients/${activeDocsClientId}/files`);
    renderClientDocuments(files.files || []);
    await loadClients();
  } catch (error) {
    clientDocumentsList.insertAdjacentHTML(
      "afterbegin",
      `<div class="empty-state">${escapeHtml(error.message)}</div>`
    );
  } finally {
    uploadClientDocButton.disabled = false;
    uploadClientDocButton.textContent = "Cargar documento";
  }
});

providerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  providerFormStatus.textContent = "";
  saveProviderButton.disabled = true;
  saveProviderButton.textContent = "Guardando...";

  const formData = new FormData(providerForm);
  const payload = {
    empresa: String(formData.get("empresa") || "").trim(),
    rfc: String(formData.get("rfc") || "").trim(),
    direccion: String(formData.get("direccion") || "").trim(),
    telefono: String(formData.get("telefono") || "").trim(),
    correo: String(formData.get("correo") || "").trim(),
    contactoVentas: String(formData.get("contactoVentas") || "").trim(),
    contactoCompras: String(formData.get("contactoCompras") || "").trim(),
    contactoContabilidad: String(formData.get("contactoContabilidad") || "").trim(),
    pago: String(formData.get("pago") || "contado"),
    diasCredito: Number(formData.get("diasCredito") || 0),
    banco: String(formData.get("banco") || "").trim(),
    cuenta: String(formData.get("cuenta") || "").trim(),
    clabe: String(formData.get("clabe") || "").trim(),
    spei: String(formData.get("spei") || "").trim()
  };

  try {
    await api(editingProviderId ? `/api/providers/${editingProviderId}` : "/api/providers", {
      method: editingProviderId ? "PUT" : "POST",
      body: JSON.stringify(payload)
    });
    closeProviderModal();
    await loadProviders();
  } catch (error) {
    providerFormStatus.textContent = error.message;
  } finally {
    saveProviderButton.disabled = false;
    saveProviderButton.textContent = editingProviderId ? "Guardar cambios" : "Guardar proveedor";
  }
});

providerDocumentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!activeDocsProviderId) return;

  uploadProviderDocButton.disabled = true;
  uploadProviderDocButton.textContent = "Cargando...";

  const formData = new FormData(providerDocumentForm);

  try {
    const response = await fetch(`/api/providers/${activeDocsProviderId}/files`, {
      method: "POST",
      credentials: "same-origin",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "No se pudo cargar el documento.");

    providerDocumentForm.reset();
    const files = await api(`/api/providers/${activeDocsProviderId}/files`);
    renderProviderDocuments(files.files || []);
    await loadProviders();
  } catch (error) {
    providerDocumentsList.insertAdjacentHTML(
      "afterbegin",
      `<div class="empty-state">${escapeHtml(error.message)}</div>`
    );
  } finally {
    uploadProviderDocButton.disabled = false;
    uploadProviderDocButton.textContent = "Cargar documento";
  }
});

fixedExpenseBudget.addEventListener("focus", () => {
  const value = parseCurrency(fixedExpenseBudget.value);
  fixedExpenseBudget.value = value ? String(value) : "";
});

fixedExpenseBudget.addEventListener("blur", () => {
  const assigned = parseCurrency(fixedExpenseBudget.value);
  fixedExpenseBudget.value = formatCurrency(assigned);
  updateFixedExpenseBudgetSummary();
});

fixedExpenseAdditionalBudget?.addEventListener("focus", () => {
  const value = parseCurrency(fixedExpenseAdditionalBudget.value);
  fixedExpenseAdditionalBudget.value = value ? String(value) : "";
});

fixedExpenseAdditionalBudget?.addEventListener("blur", () => {
  const additional = parseCurrency(fixedExpenseAdditionalBudget.value);
  fixedExpenseAdditionalBudget.value = formatCurrency(additional);
  updateFixedExpenseBudgetSummary();
});

fixedExpenseAutomaticToggle?.addEventListener("change", updateFixedExpenseAutomaticFields);

generateFixedExpensesButton?.addEventListener("click", async () => {
  const originalText = generateFixedExpensesButton.textContent;
  generateFixedExpensesButton.disabled = true;
  generateFixedExpensesButton.textContent = "Generando...";
  try {
    const data = await api("/api/fixed-expenses/generate-due", { method: "POST" });
    renderFixedExpenses(data.expenses || []);
    if (fixedExpenseFormStatus) fixedExpenseFormStatus.textContent = data.message || "Generación revisada.";
  } catch (error) {
    fixedExpensesList.insertAdjacentHTML("afterbegin", `<div class="fixed-expense-table-empty">${escapeHtml(error.message)}</div>`);
  } finally {
    generateFixedExpensesButton.disabled = false;
    generateFixedExpensesButton.textContent = originalText;
  }
});

fixedExpenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  fixedExpenseFormStatus.textContent = "";
  saveFixedExpenseButton.disabled = true;
  saveFixedExpenseButton.textContent = "Guardando...";

  const formData = new FormData(fixedExpenseForm);
  const payload = {
    gasto: String(formData.get("gasto") || "").trim(),
    proveedorId: Number(formData.get("proveedorId") || 0) || null,
    sucursal: String(formData.get("sucursal") || "").trim(),
    recurrencia: String(formData.get("recurrencia") || "mensual"),
    estadoRegistro: String(formData.get("estadoRegistro") || "Activo"),
    descripcionAutomatica: String(formData.get("descripcionAutomatica") || "").trim(),
    generacionAutomatica: formData.get("generacionAutomatica") === "on",
    diaGeneracion: Number(formData.get("diaGeneracion") || 1),
    fechaInicio: String(formData.get("fechaInicio") || ""),
    fechaFin: String(formData.get("fechaFin") || ""),
    presupuesto: parseCurrency(formData.get("presupuesto")),
    presupuestoAdicional: parseCurrency(formData.get("presupuestoAdicional"))
  };

  try {
    await api(
      editingFixedExpenseId
        ? `/api/fixed-expenses/${editingFixedExpenseId}`
        : "/api/fixed-expenses",
      {
        method: editingFixedExpenseId ? "PUT" : "POST",
        body: JSON.stringify(payload)
      }
    );
    closeFixedExpenseModal();
    await loadFixedExpenses();
  } catch (error) {
    fixedExpenseFormStatus.textContent = error.message;
  } finally {
    saveFixedExpenseButton.disabled = false;
    saveFixedExpenseButton.textContent = editingFixedExpenseId
      ? "Guardar cambios"
    : "Guardar gasto fijo";
  }
});

budgetForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isBudgetSaving) return;
  isBudgetSaving = true;
  budgetFormStatus.textContent = "";
  saveBudgetButton.disabled = true;
  saveBudgetButton.textContent = editingBudgetId ? "Guardando cambios..." : "Guardando...";

  const client = selectedBudgetClient();
  const formData = new FormData(budgetForm);
  const targetBudgetId = editingBudgetId;
  const selectedContact = resolveBudgetClientContact(formData.get("clienteUsuario"));
  if (!client || !selectedContact) {
    budgetFormStatus.textContent = "Selecciona el cliente / usuario desde la lista para evitar errores de captura.";
    isBudgetSaving = false;
    saveBudgetButton.disabled = false;
    saveBudgetButton.textContent = editingBudgetId ? "Guardar cambios" : "Guardar presupuesto";
    budgetClientUserInput?.focus();
    return;
  }
  const payload = {
    clienteId: Number(selectedContact.id || 0),
    sucursalId: Number(selectedBudgetBranchId() || selectedContact.sucursalId || 0) || null,
    responsableId: Number(formData.get("responsableId") || budgetOwnerSelect?.value || 0) || null,
    empresa: selectedContact.empresa || client?.empresa || selectedBudgetCompanyName() || "",
    sucursal: selectedContact.sucursal || String(formData.get("sucursal") || "").trim(),
    clienteUsuario: selectedContact.nombre || String(formData.get("clienteUsuario") || "").trim(),
    area: String(formData.get("area") || "").trim(),
    tituloProyecto: String(formData.get("tituloProyecto") || "").trim(),
    folio: String(formData.get("folio") || "").trim(),
    folioManual: isCurrentUserSuperAdmin() && budgetManualFolioToggle.checked,
    sinGarantia: Boolean(formData.get("sinGarantia")),
    equipos: budgetEquipmentDraftRows
      .filter((row) => row.item)
      .map((row) => ({
        itemPrecioId: Number(row.itemPrecioId || 0) || null,
        item: row.item,
        cantidadEquipos: normalizeWholeQuantity(row.cantidadEquipos),
        cantidadUm: normalizeWholeQuantity(row.cantidadUm),
        unidadMedida: row.unidadMedida || "",
        costoUnitario: Number(row.costoUnitario || 0),
        flete: Number(row.flete || 0)
      })),
    contratistas: budgetContractorDraftRows
      .filter((row) => row.descripcion)
      .map((row) => ({
        descripcion: row.descripcion,
        cantidad: normalizeWholeQuantity(row.cantidad),
        costo: Number(row.costo || 0)
      })),
    manoObra: budgetLaborDraftRows
      .filter((row) => row.descripcion)
      .map((row) => ({
        itemPrecioId: Number(row.itemPrecioId || 0) || null,
        descripcion: row.descripcion,
        personas: normalizeWholeQuantity(row.personas),
        horas: normalizeWholeQuantity(row.horas),
        costoHora: Number(row.costoHora || 0),
        comidas: normalizeWholeQuantity(row.comidas),
        costoComida: Number(row.costoComida || 0)
      })),
    materiales: budgetMaterialDraftRows
      .filter((row) => row.descripcion)
      .map((row) => ({
        descripcion: row.descripcion,
        cantidad: normalizeWholeQuantity(row.cantidad),
        unidad: row.unidad || "",
        costo: Number(row.costo || 0)
      }))
  };

  try {
    const data = await api(targetBudgetId ? `/api/budgets/${targetBudgetId}` : "/api/budgets", {
      method: targetBudgetId ? "PUT" : "POST",
      body: JSON.stringify(payload)
    });
    const savedBudgetId = targetBudgetId || data.budgetId;

    for (const item of budgetSupplierQuoteFiles) {
      const filePayload = new FormData();
      filePayload.append("tipo", "Cotización proveedor");
      filePayload.append("archivo", item.file);

      const response = await fetch(`/api/budgets/${savedBudgetId}/files`, {
        method: "POST",
        credentials: "same-origin",
        body: filePayload
      });
      const fileData = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(fileData.message || "No se pudo cargar una cotización.");
    }

    const wasInlineEditor = budgetInlineEditorOpen;
    if (wasInlineEditor) {
      restoreBudgetInlineForm();
    } else {
      closeBudgetModal();
    }
    await loadBudgets();
    if (wasInlineEditor || activeBudgetDetailId === savedBudgetId) {
      await openBudgetDetail(savedBudgetId);
    }
  } catch (error) {
    budgetFormStatus.textContent = error.message;
  } finally {
    isBudgetSaving = false;
    saveBudgetButton.disabled = false;
    saveBudgetButton.textContent = editingBudgetId ? "Guardar cambios" : "Guardar presupuesto";
  }
});

priceCost.addEventListener("focus", () => {
  const value = parseCurrency(priceCost.value);
  priceCost.value = value ? String(value) : "";
});

priceCost.addEventListener("blur", () => {
  priceCost.value = formatCurrency(parseCurrency(priceCost.value));
});

priceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  priceFormStatus.textContent = "";
  addPriceButton.disabled = true;
  addPriceButton.textContent = "Agregando...";

  const formData = new FormData(priceForm);
  const payload = {
    tipo: String(formData.get("tipo") || ""),
    item: String(formData.get("item") || "").trim(),
    costo: parseCurrency(formData.get("costo"))
  };

  try {
    await api("/api/price-list", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    priceForm.reset();
    priceCost.value = "$0.00";
    await loadPriceItems();
  } catch (error) {
    priceFormStatus.textContent = error.message;
  } finally {
    addPriceButton.disabled = false;
    addPriceButton.textContent = "Agregar";
  }
});

priceList.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest(".delete-price-button");
  if (!deleteButton) return;

  const itemId = Number(deleteButton.dataset.priceId);
  const item = priceItemsCache.find((price) => price.id === itemId);
  if (!confirm(`¿Eliminar ${item?.item || "este item"}?`)) return;

  try {
    await api(`/api/price-list/${itemId}`, { method: "DELETE" });
    await loadPriceItems();
  } catch (error) {
    priceList.insertAdjacentHTML("afterbegin", `<div class="empty-state">${escapeHtml(error.message)}</div>`);
  }
});

setupInteractiveGridTable(fixedExpensesTable);
setupInteractiveGridTable(budgetsTable);
setupInteractiveGridTable(budgetApprovalTable);
setupInteractiveGridTable(purchasePendingTable);
setupInteractiveGridTable(purchaseCreatedTable);
setupInteractiveGridTable(purchaseFixedExpenseTable);
setupInteractiveGridTable(accountsReceivableTable);
setupInteractiveGridTable(accountsPayablePendingCashTable);
setupInteractiveGridTable(accountsPayablePendingTable);
setupInteractiveGridTable(accountsPayablePaidCashTable);
setupInteractiveGridTable(accountsPayablePaidTable);
setupInteractiveGridTable(accountsPayableOcgfPendingCashTable);
setupInteractiveGridTable(accountsPayableOcgfPendingTable);
setupInteractiveGridTable(accountsPayableOcgfPaidCashTable);
setupInteractiveGridTable(accountsPayableOcgfPaidTable);
setupInteractiveGridTable(accountsPayableCommissionPendingTable);
setupInteractiveGridTable(accountsPayableCommissionPaidTable);
setupInteractiveGridTable(commissionsPendingTable);
setupInteractiveGridTable(commissionsCreatedTable);
setupInteractiveGridTable(budgetEquipmentTable);
setupInteractiveGridTable(budgetContractorTable);
setupInteractiveGridTable(budgetLaborTable);
setupInteractiveGridTable(budgetMaterialsTable);

[
  budgetApprovalTable,
  budgetsTable,
  purchasePendingTable,
  purchaseCreatedTable,
  purchaseFixedExpenseTable,
  accountsReceivableTable,
  accountsPayablePendingCashTable,
  accountsPayablePendingTable,
  accountsPayablePaidCashTable,
  accountsPayablePaidTable,
  accountsPayableOcgfPendingCashTable,
  accountsPayableOcgfPendingTable,
  accountsPayableOcgfPaidCashTable,
  accountsPayableOcgfPaidTable,
  accountsPayableCommissionPendingTable,
  accountsPayableCommissionPaidTable,
  commissionsPendingTable,
  commissionsCreatedTable
].forEach(setupColumnChooser);

document.addEventListener("click", handleRowFlagToggle, true);

document.addEventListener(
  "click",
  (event) => {
    const button = event.target.closest("button");
    if (!button || !isLockableActionButton(button)) return;
    if (lockedActionButtons.has(button)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    pendingActionButton = button;
    window.setTimeout(() => {
      if (pendingActionButton !== button || lockedActionButtons.has(button)) return;
      pendingActionButton = null;
      const unlock = lockActionButton(button, 1800);
      window.setTimeout(unlock, 900);
    }, 0);
    window.setTimeout(() => {
      if (pendingActionButton === button) pendingActionButton = null;
    }, 8000);
  },
  true
);

document.addEventListener(
  "submit",
  (event) => {
    const submitter = event.submitter;
    if (submitter && isLockableActionButton(submitter)) lockActionButton(submitter);
  },
  true
);

function initializeSmartEntityFields() {
  attachSmartAutocomplete(usersSearch, {
    requireSelection: false,
    emptyText: "Sin usuarios similares",
    getItems: () =>
      (usersCache || []).map((user) => ({
        value: user.id,
        label: `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario || "Usuario",
        inputLabel: `${user.nombre || ""} ${user.apellido || ""}`.trim() || user.usuario || "",
        meta: [user.usuario, user.rol].filter(Boolean).join(" · "),
        searchText: `${user.nombre || ""} ${user.apellido || ""} ${user.usuario || ""} ${user.rol || ""}`
      })),
    onSelect: (item) => {
      usersSearch.value = item.inputLabel || item.label || "";
      loadUsers();
    }
  });
  attachSmartAutocomplete(clientsSearch, {
    requireSelection: false,
    emptyText: "Sin clientes similares",
    getItems: () =>
      (clientsCache || []).map((client) => ({
        value: client.id,
        label: client.nombre || client.empresa || "Cliente",
        inputLabel: client.nombre || client.empresa || "",
        meta: [client.empresa, client.sucursal, client.rfc].filter(Boolean).join(" · "),
        searchText: `${client.nombre || ""} ${client.empresa || ""} ${client.sucursal || ""} ${client.rfc || ""}`
      })),
    onSelect: (item) => {
      clientsSearch.value = item.inputLabel || item.label || "";
      loadClients();
    }
  });
  // Este campo filtra el directorio en tiempo real. No se convierte en un
  // selector porque el menú duplicaba el resultado y reaparecía al limpiar.
  enhanceSearchableSelect(userCreditUserSelect, {
    placeholder: "Escribe el nombre de la persona...",
    requireSelection: true,
    validationMessage: "Selecciona una persona registrada."
  });
  enhanceSearchableSelect(fixedExpenseProviderSelect, {
    placeholder: "Escribe el proveedor...",
    validationMessage: "Selecciona un proveedor registrado."
  });
  enhanceSearchableSelect(budgetCompanySelect, {
    placeholder: "Escribe o selecciona la empresa...",
    requireSelection: true,
    validationMessage: "Selecciona una empresa registrada."
  });
  enhanceSearchableSelect(budgetOwnerSelect, {
    placeholder: "Escribe el nombre del responsable...",
    requireSelection: true,
    validationMessage: "Selecciona un responsable interno registrado."
  });
  enhanceSearchableSelect(taskAssignedTo, {
    placeholder: "Escribe el nombre del responsable...",
    requireSelection: true,
    validationMessage: "Selecciona un usuario registrado."
  });
  enhanceSearchableSelect(purchaseFilterCompany, { placeholder: "Escribe la empresa..." });
  enhanceSearchableSelect(purchaseFilterProvider, { placeholder: "Escribe el proveedor..." });
  enhanceSearchableSelect(accountsReceivableFilterCompany, { placeholder: "Escribe la empresa..." });
  enhanceSearchableSelect(accountsPayableFilterProvider, { placeholder: "Escribe proveedor / supervisor..." });
  refreshBudgetClientAutocomplete();
  initializeBudgetProjectSearchAutocomplete();
}

initializeSmartEntityFields();
loadThemePreference();
loadSession();
window.setInterval(autoRefreshTick, AUTO_REFRESH_MS);
