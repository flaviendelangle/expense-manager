import * as React from 'react'

import { CenteredInformationMessage } from '@components/atoms/CenteredInformationMessage'

import { EarningBasicInformation } from '@hooks/useEarnings'
import { useTranslate } from '@hooks/useTranslate'

export const EarningsGraphs: React.VoidFunctionComponent<ExpensesGraphProps> = () => {
  const t = useTranslate()

  return (
    <CenteredInformationMessage>
      {t('generic.inDevelopment')}
    </CenteredInformationMessage>
  )
}

interface ExpensesGraphProps {
  data: EarningBasicInformation[]
}
