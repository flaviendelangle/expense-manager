import { format } from 'date-fns'
import * as React from 'react'
import { FilterType, Renderer } from 'react-table'

import { CellProps, Column, RangeFilter } from '@habx/ui-table'

import { DatePicker, DatePickerValue } from '@components/form/DatePicker'
import { SelectExpenseCategory } from '@components/form/SelectExpenseCategory'

import { ExpenseBasicInformation } from '@hooks/useExpenses'
import { useTranslate } from '@hooks/useTranslate'

export const betweenDates: FilterType<any> = (
  rows,
  ids,
  filterValue: DatePickerValue
) => {
  if (!filterValue) {
    return rows
  }

  const { start, end } = filterValue

  if (!start || !end) {
    return rows
  }

  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id]

      return rowValue >= start && rowValue <= end
    })
  })
}

betweenDates.autoRemove = (filterValue: DatePickerValue) =>
  !filterValue?.start || !filterValue?.end

export const useColumns = () => {
  const t = useTranslate()

  return React.useMemo<Column<ExpenseBasicInformation>[]>(
    () => [
      {
        Header: t('entities.expenses.fields.spentAt.label'),
        accessor: (el) => new Date(el.spentAt),
        Cell: (({ cell }) => format(cell.value, 'yyyy-MM-dd')) as Renderer<
          CellProps<ExpenseBasicInformation, Date>
        >,
        Filter: ({ column }) => (
          <DatePicker
            small
            value={column.filterValue}
            onChange={column.setFilter}
          />
        ),
        filter: betweenDates,
      },
      {
        Header: t('entities.expenses.fields.expenseCategory.label'),
        id: 'expenseCategory',
        accessor: (el) => el.expenseCategory.id,
        Cell: (({ row }) => {
          const expenseCategory = row.original.expenseCategory

          return `${expenseCategory.expenseCategoryGroup.name} - ${expenseCategory.name}`
        }) as Renderer<CellProps<ExpenseBasicInformation, string>>,
        Filter: ({ column }) => (
          <SelectExpenseCategory
            value={column.filterValue}
            onChange={column.setFilter}
            placeholder="Toutes"
            multi
            small
            canSelectAll
            selectAllLabel="Tout sélectionner"
          />
        ),
        filter: 'includesValue',
      },
      {
        Header: t('entities.expenses.fields.amount.label'),
        accessor: 'value',
        Cell: (({ cell }) => `${cell.value}€`) as Renderer<
          CellProps<ExpenseBasicInformation, number>
        >,
        Filter: ({ column }) => (
          <RangeFilter column={column} tooltipSuffix="€" />
        ),
        filter: 'between',
      },
      {
        Header: t('entities.expenses.fields.description.label'),
        accessor: 'description',
      },
      {
        Header: t('entities.expenses.fields.refund.label'),
        accessor: 'refund',
        Cell: (({ cell }) => {
          const refund = cell.value

          if (!refund) {
            return null
          }

          return `${refund.value} €${
            refund.description ? ` (${refund.description})` : ''
          }`
        }) as Renderer<
          CellProps<ExpenseBasicInformation, ExpenseBasicInformation['refund']>
        >,
      },
    ],
    [t]
  )
}
