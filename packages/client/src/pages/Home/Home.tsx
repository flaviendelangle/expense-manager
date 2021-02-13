import { addMonths } from 'date-fns'
import * as React from 'react'

import { Breadcrumb, BreadcrumbItem, HeaderBar } from '@habx/ui-core'

import { ExpenseCategoryPie } from '@components/graphs/ExpenseCategoryPie'
import { ExpenseTimeline } from '@components/graphs/ExpenseTimeline'
import { CustomizableGraphCard } from '@components/molecules/CustomizableGraphCard'

import { useExpenses } from '@hooks/useExpenses'
import { useMountDate } from '@hooks/useMountDate'

import { HomeContent } from './Home.style'

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
            <CustomizableGraphCard
              initialConfig={null}
              label="Dépenses du mois"
              graphHeight={420}
            >
              {() => <ExpenseCategoryPie data={expenses.data} />}
            </CustomizableGraphCard>
            <CustomizableGraphCard
              initialConfig={null}
              label="Dépenses du mois"
              graphHeight={420}
            >
              {() => <ExpenseTimeline data={expenses.data} />}
            </CustomizableGraphCard>
          </React.Fragment>
        )}
      </HomeContent>
    </React.Fragment>
  )
}
