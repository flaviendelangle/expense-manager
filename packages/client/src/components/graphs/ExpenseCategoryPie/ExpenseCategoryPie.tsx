import { MouseEventHandler, ResponsivePie } from '@nivo/pie'
import * as React from 'react'

import { ExpenseBasicInformation } from '@hooks/useExpenses'
import { useNivoCustomization } from '@hooks/useNivoCustomization'

type PieDataLine = { id: string; label: string; value: number }

export const ExpenseCategoryPie: React.VoidFunctionComponent<CategoryPieProps> = ({
  expenses,
}) => {
  const nivoCustomization = useNivoCustomization()

  const [selectedCategoryGroupId, setSelectedCategoryGroupId] = React.useState<
    string | null
  >(null)

  const pieData = React.useMemo(() => {
    const temp: {
      [categoryId: string]: PieDataLine
    } = {}

    for (const expense of expenses) {
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
  }, [expenses, selectedCategoryGroupId])

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
    <ResponsivePie<PieDataLine>
      data={pieData}
      margin={{ top: 24, right: 72, bottom: 24, left: 72 }}
      sortByValue
      innerRadius={0.5}
      cornerRadius={3}
      padAngle={1}
      radialLabel={(d) => `${d.data.label} (${d.formattedValue})`}
      valueFormat={(value) => `${Math.floor(value)}€`}
      onClick={handleCategoryClick}
      {...nivoCustomization}
    />
  )
}

interface CategoryPieProps {
  expenses: ExpenseBasicInformation[]
}
