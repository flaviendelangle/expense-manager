import { addMonths, addYears, startOfMonth } from 'date-fns'
import * as React from 'react'

import { Breadcrumb, BreadcrumbItem, HeaderBar, Icon } from '@habx/ui-core'

import { ExpenseAndEarningLine } from '@components/graphs/ExpenseAndEarningLine'
import { ExpenseCategoryPie } from '@components/graphs/ExpenseCategoryPie'
import { ExpenseTimeline } from '@components/graphs/ExpenseTimeline'
import { CustomizableGraphCard } from '@components/molecules/CustomizableGraphCard'

import { DateFilter } from '@globalTypes/api'
import { useEarnings } from '@hooks/useEarnings'
import { useExpenses } from '@hooks/useExpenses'
import { useMountDate } from '@hooks/useMountDate'
import { useTranslate } from '@hooks/useTranslate'

import { HomeContent } from './Home.style'

export const Home: React.VoidFunctionComponent = () => {
  const mountDate = useMountDate()
  const t = useTranslate()

  const monthlyExpenses = useExpenses({
    fetchPolicy: 'cache-and-network',
    variables: {
      filters: {
        spentAt: { after: addMonths(mountDate, -1), before: mountDate },
      },
    },
  })

  const yearlyDateFilters = React.useMemo<DateFilter>(() => {
    const end = startOfMonth(mountDate)
    const start = addYears(end, -1)

    return {
      after: start,
      before: end,
    }
  }, [mountDate])

  const yearlyExpenses = useExpenses({
    fetchPolicy: 'cache-and-network',
    variables: {
      filters: {
        spentAt: yearlyDateFilters,
      },
    },
  })

  const yearlyEarnings = useEarnings({
    fetchPolicy: 'cache-and-network',
    variables: {
      filters: {
        earnedAt: yearlyDateFilters,
      },
    },
  })

  return (
    <React.Fragment>
      <HeaderBar small>
        <Breadcrumb>
          <BreadcrumbItem>
            <Icon icon="house-outline" />
          </BreadcrumbItem>
        </Breadcrumb>
      </HeaderBar>
      <HomeContent>
        <CustomizableGraphCard
          initialConfig={null}
          label={t('pages.home.lastMonth.expenseCategoryPie.title')}
          graphHeight={420}
          loading={monthlyExpenses.loading}
        >
          {() => <ExpenseCategoryPie expenses={monthlyExpenses.data} />}
        </CustomizableGraphCard>
        <CustomizableGraphCard
          initialConfig={null}
          label={t('pages.home.lastMonth.expenseTimeline.title')}
          graphHeight={420}
          loading={monthlyExpenses.loading}
        >
          {() => <ExpenseTimeline expenses={monthlyExpenses.data} />}
        </CustomizableGraphCard>
        <CustomizableGraphCard
          initialConfig={null}
          label={t('pages.home.lastYear.expenseAndEarning.title')}
          graphHeight={420}
          loading={yearlyExpenses.loading || yearlyEarnings.loading}
        >
          {() => (
            <ExpenseAndEarningLine
              expenses={yearlyExpenses.data}
              earnings={yearlyEarnings.data}
            />
          )}
        </CustomizableGraphCard>
      </HomeContent>
    </React.Fragment>
  )
}
