import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useExpenses } from '@hooks/useExpenses'

import { ExpensesGraphs } from './ExpensesGraphs'
import { ExpensesTable } from './ExpensesTable'

export const Expenses: React.VoidFunctionComponent = () => {
  const expenses = useExpenses()

  return (
    <Routes>
      <Route
        path="/table"
        element={
          <ExpensesTable data={expenses.data} loading={expenses.loading} />
        }
      />
      <Route path="/graphs" element={<ExpensesGraphs data={expenses.data} />} />
      <Navigate to="/expenses/table" />
    </Routes>
  )
}
