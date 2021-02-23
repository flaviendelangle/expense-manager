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
  | 'navBar.home.label'
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
  | 'pages.expenses.categories.label'
  | 'pages.expenses.categoryModal.new.title'
  | 'pages.expenses.categoryModal.edit.title'
  | 'pages.expenses.categoryModal.onSuccess.notify'
  | 'pages.expenses.categoryGroups.label'
  | 'pages.expenses.categoryGroupModal.new.title'
  | 'pages.expenses.categoryGroupModal.edit.title'
  | 'pages.expenses.categoryGroupModal.onSuccess.notify'

  // Earnings Page
  | 'pages.earnings.label'
  | 'pages.earnings.itemModal.new.title'
  | 'pages.earnings.itemModal.edit.title'
  | 'pages.earnings.itemModal.onSuccess.notify'
  | 'pages.earnings.table.label'
  | 'pages.earnings.graphs.label'
  | 'pages.earnings.categories.label'
  | 'pages.earnings.categoryModal.new.title'
  | 'pages.earnings.categoryModal.edit.title'
  | 'pages.earnings.categoryModal.onSuccess.notify'

  /*
   * Entities
   */
  // Expense
  | 'entities.expenses.fields.spentAt.label'
  | 'entities.expenses.fields.expenseCategory.label'
  | 'entities.expenses.fields.amount.label'
  | 'entities.expenses.fields.description.label'
  | 'entities.expenses.fields.refund.label'

  // Expense Category
  | 'entities.expenseCategories.fields.expenseCategoryGroup.label'
  | 'entities.expenseCategories.fields.name.label'
  | 'entities.expenseCategories.fields.description.label'

  // Expense Category Group
  | 'entities.expenseCategoryGroups.fields.name.label'
  | 'entities.expenseCategoryGroups.fields.description.label'

  // Earning
  | 'entities.earnings.fields.earnedAt.label'
  | 'entities.earnings.fields.earningCategory.label'
  | 'entities.earnings.fields.amount.label'
  | 'entities.earnings.fields.description.label'

  // Earning Category
  | 'entities.earningCategories.fields.name.label'
  | 'entities.earningCategories.fields.description.label'

  // Refund
  | 'entities.refunds.fields.earningCategory.label'
  | 'entities.refunds.fields.amount.label'
  | 'entities.refunds.fields.description.label'
