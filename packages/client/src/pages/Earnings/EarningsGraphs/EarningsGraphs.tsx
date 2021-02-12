import * as React from 'react'

import { Text } from '@habx/ui-core'

import { EarningBasicInformation } from '@hooks/useEarnings'

export const EarningsGraphs: React.VoidFunctionComponent<ExpensesGraphProps> = () => (
  <Text>En cours de développement</Text>
)

interface ExpensesGraphProps {
  data: EarningBasicInformation[]
}
