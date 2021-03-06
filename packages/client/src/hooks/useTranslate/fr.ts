import { messageIds } from './useTranslate.interface'

export const frMessages: Record<messageIds, string> = {
  'generic.inDevelopment': 'En cours de construction',
  'generic.submit': 'Valider',
  'generic.abort': 'Annuler',
  'navBar.expenses.label': 'Mes dépenses',
  'navBar.earnings.label': 'Mes revenus',
  'navBar.admin.label': 'Administration',
  'navBar.logout.label': 'Me déconnecter',
  'navBar.logout.notify': 'Vous êtes maintenant déconnecté',
  'navBar.theme.darkMode': 'Thème foncé',
  'navBar.theme.lightMode': 'Thème clair',
  'pages.home.lastMonth.expenseCategoryPie.title':
    'Répartition de mes dépenses depuis un mois',
  'pages.home.lastMonth.expenseTimeline.title':
    'Évolution de mes dépenses dépuis un mois',
  'pages.home.lastYear.expenseAndEarning.title':
    'Mes dépenses et revenus depuis un an',
  'pages.expenses.label': 'Mes dépenses',
  'pages.expenses.itemModal.new.title': 'Nouvelle dépense',
  'pages.expenses.table.label': 'Dépenses',
  'entities.expenses.fields.spentAt.label': 'Date',
  'entities.expenses.fields.expenseCategory.label': 'Catégorie',
  'entities.expenses.fields.amount.label': 'Montant',
  'entities.expenses.fields.description.label': 'Description',
  'entities.expenses.fields.refund.label': 'Remboursement',
  'pages.expenses.graphs.label': 'Graphiques',
  'pages.expenses.graphs.refundDeduction.label': 'Déduire les remboursements',
  'pages.expenses.graphs.expenseCategoryPie.title':
    'Mes dépenses par catégorie',
  'pages.expenses.graphs.expenseTimeline.title': 'Mes dépenses dans le temps',
  'pages.earnings.label': 'Mes revenus',
  'pages.earnings.itemModal.new.title': 'Nouveau revenu',
  'pages.earnings.table.label': 'Revenus',
  'entities.earnings.fields.earnedAt.label': 'Date',
  'entities.earnings.fields.earningCategory.label': 'Catégorie',
  'entities.earnings.fields.amount.label': 'Montant',
  'entities.earnings.fields.description.label': 'Description',
  'pages.earnings.graphs.label': 'Graphiques',
  'pages.earnings.itemModal.onSuccess.notify': 'Recette enregistrée',
  'pages.expenses.itemModal.onSuccess.notify': 'Dépense enregistrée',
  'pages.expenses.itemModal.hasRefund.label': 'Appliquer un remboursement',
  'entities.refunds.fields.earningCategory.label': 'Catégorie',
  'entities.refunds.fields.amount.label': 'Montant',
  'entities.refunds.fields.description.label': 'Description',
  'pages.expenses.itemModal.edit.title': "Édition d'une dépense",
  'pages.earnings.itemModal.edit.title': "Édition d'un revenu",
  'pages.expenses.categories.label': 'Sous pôles',
  'pages.expenses.categoryModal.new.title': 'Nouveau sous-pôle',
  'pages.expenses.categoryModal.edit.title': "Édition d'un sous-pôle",
  'entities.expenseCategories.fields.expenseCategoryGroup.label':
    'Pôle de dépense',
  'entities.expenseCategories.fields.name.label': 'Nom',
  'entities.expenseCategories.fields.description.label': 'Description',
  'pages.expenses.categoryModal.onSuccess.notify':
    'Sous-pôle de dépense enregistré',
  'pages.expenses.categoryGroups.label': 'Pôles de dépense',
  'pages.expenses.categoryGroupModal.new.title': 'Nouveau pôle de dépense',
  'pages.expenses.categoryGroupModal.edit.title':
    "Édition d'un pôle de dépense",
  'pages.expenses.categoryGroupModal.onSuccess.notify':
    'Pôle de dépense enregistrée',
  'entities.expenseCategoryGroups.fields.name.label': 'Nom',
  'entities.expenseCategoryGroups.fields.description.label': 'Description',
  'entities.earningCategories.fields.name.label': 'Nom',
  'entities.earningCategories.fields.description.label': 'Description',
  'pages.earnings.categories.label': 'Sources de revenu',
  'pages.earnings.categoryModal.new.title': 'Nouvelle source de revenu',
  'pages.earnings.categoryModal.edit.title': "Édition d'une source de revenu",
  'pages.earnings.categoryModal.onSuccess.notify':
    'Source de revenu enregistrée',
  'navBar.home.label': 'Résumé',
}
