import { MouseEventHandler, ResponsivePie } from '@nivo/pie'
import * as React from 'react'

import { stringifyColor, useThemeVariant } from '@habx/ui-core'

import { ExpenseBasicInformation } from '@hooks/useExpenses'

import { ExpenseGraph } from './ExpensesGraphs.style'

type PieDataLine = { id: string; label: string; value: number }

export const CategoryPie: React.VoidFunctionComponent<CategoryPieProps> = ({
  data,
}) => {
  const theme = useThemeVariant()
  const [selectedCategoryGroupId, setSelectedCategoryGroupId] = React.useState<
    string | null
  >(null)

  const pieData = React.useMemo(() => {
    const temp: {
      [categoryId: string]: PieDataLine
    } = {}

    for (const expense of data) {
      if (selectedCategoryGroupId) {
        // Group expenses by category

        if (expense.category.categoryGroup.id === selectedCategoryGroupId) {
          if (!temp[expense.category.id]) {
            temp[expense.category.id] = {
              id: expense.category.id,
              label: expense.category.name,
              value: 0,
            }
          }

          temp[expense.category.id].value += expense.value
        }
      } else {
        // Group expenses by category group

        if (!temp[expense.category.categoryGroup.id]) {
          temp[expense.category.categoryGroup.id] = {
            id: expense.category.categoryGroup.id,
            label: expense.category.categoryGroup.name,
            value: 0,
          }
        }

        temp[expense.category.categoryGroup.id].value += expense.value
      }
    }

    return Object.values(temp)
  }, [data, selectedCategoryGroupId])

  const handleCategoryClick = React.useCallback<
    MouseEventHandler<PieDataLine, any>
  >(
    (line) =>
      setSelectedCategoryGroupId((prev) =>
        prev == null ? line.data.id : null
      ),
    []
  )

  return (
    <ExpenseGraph style={{ height: 450 }}>
      <ResponsivePie<PieDataLine>
        data={pieData}
        margin={{ top: 40, right: 80, bottom: 0, left: 80 }}
        sortByValue
        innerRadius={0.5}
        cornerRadius={3}
        padAngle={1}
        radialLabel={(d) => `${d.data.label} (${d.formattedValue})`}
        radialLabelsTextColor={stringifyColor(theme.typography.colors.text)}
        valueFormat={(value) => `${Math.floor(value)}€`}
        onClick={handleCategoryClick}
      />
    </ExpenseGraph>
  )
}

interface CategoryPieProps {
  data: ExpenseBasicInformation[]
}
