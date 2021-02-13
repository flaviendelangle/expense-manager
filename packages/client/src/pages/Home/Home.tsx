import { addMonths } from 'date-fns'
import * as React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  HeaderBar,
  Title,
} from '@habx/ui-core'

import { ExpenseCategoryPie } from '@components/graphs/ExpenseCategoryPie'
import { ExpenseTimeline } from '@components/graphs/ExpenseTimeline'

import { useExpenses } from '@hooks/useExpenses'
import { useMountDate } from '@hooks/useMountDate'

import { HomeContent, HomeCardContent } from './Home.style'

export const Home: React.VoidFunctionComponent = () => {
  const mountDate = useMountDate()

  const expenses = useExpenses({
    fetchPolicy: 'cache-and-network',
    variables: {
      filters: {
        spentAt: { after: addMonths(mountDate, -1), before: mountDate },
      },
    },
  })

  return (
    <React.Fragment>
      <HeaderBar>
        <Breadcrumb>
          <BreadcrumbItem>Gestionnaire de dépenses</BreadcrumbItem>
        </Breadcrumb>
      </HeaderBar>
      <HomeContent>
        {!expenses.loading && (
          <React.Fragment>
            <Card spacing="regular-horizontal-only">
              <HeaderBar sticky={false}>
                <Title type="regular">Dépenses du mois</Title>
              </HeaderBar>
              <HomeCardContent>
                <ExpenseCategoryPie data={expenses.data} />
              </HomeCardContent>
            </Card>
            <Card spacing="regular-horizontal-only">
              <HeaderBar sticky={false}>
                <Title type="regular">Dépenses du mois</Title>
              </HeaderBar>
              <HomeCardContent>
                <ExpenseTimeline data={expenses.data} />
              </HomeCardContent>
            </Card>
          </React.Fragment>
        )}
      </HomeContent>
    </React.Fragment>
  )
}
