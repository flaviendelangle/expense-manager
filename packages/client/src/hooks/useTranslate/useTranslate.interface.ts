export type messageIds =
  /*
   * Generic
   */
  | 'generic.inDevelopment'
  | 'generic.submit'
  | 'generic.abort'

  /*
   * NavBar
   */
  | 'navBar.expenses.label'
  | 'navBar.earnings.label'
  | 'navBar.admin.label'
  | 'navBar.logout.label'
  | 'navBar.logout.notify'
  | 'navBar.theme.darkMode'
  | 'navBar.theme.lightMode'

  /*
   * Pages
   */

  // Home Page
  | 'pages.home.lastMonth.expenseCategoryPie.title'
  | 'pages.home.lastMonth.expenseTimeline.title'
  | 'pages.home.lastYear.expenseAndEarning.title'

  // Expenses Page
  | 'pages.expenses.label'
  | 'pages.expenses.itemModal.new.title'
  | 'pages.expenses.itemModal.edit.title'
  | 'pages.expenses.itemModal.onSuccess.notify'
  | 'pages.expenses.itemModal.hasRefund.label'
  | 'pages.expenses.table.label'
  | 'pages.expenses.graphs.label'
  | 'pages.expenses.graphs.refundDeduction.label'
  | 'pages.expenses.graphs.expenseCategoryPie.title'
  | 'pages.expenses.graphs.expenseTimeline.title'

  // Earnings Page
  | 'pages.earnings.label'
  | 'pages.earnings.itemModal.new.title'
  | 'pages.earnings.itemModal.edit.title'
  | 'pages.earnings.itemModal.onSuccess.notify'
  | 'pages.earnings.table.label'
  | 'pages.earnings.graphs.label'

  /*
   * Entities
   */
  // Expense
  | 'entities.expenses.fields.spentAt.label'
  | 'entities.expenses.fields.expenseCategory.label'
  | 'entities.expenses.fields.amount.label'
  | 'entities.expenses.fields.description.label'
  | 'entities.expenses.fields.refund.label'

  // Earning
  | 'entities.earnings.fields.earnedAt.label'
  | 'entities.earnings.fields.earningCategory.label'
  | 'entities.earnings.fields.amount.label'
  | 'entities.earnings.fields.description.label'

  // Refund
  | 'entities.refunds.fields.earningCategory.label'
  | 'entities.refunds.fields.amount.label'
  | 'entities.refunds.fields.description.label'
