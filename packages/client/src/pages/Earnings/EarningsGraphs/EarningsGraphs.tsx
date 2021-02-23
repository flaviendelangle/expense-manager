import * as React from 'react'

import { CenteredInformationMessage } from '@components/atoms/CenteredInformationMessage'

import { useTranslate } from '@hooks/useTranslate'

import { EarningsHeaderBars } from '../EarningsHeaderBars'

import { EarningsGraphsContent } from './EarningsGraphs.style'

export const EarningsGraphs: React.VoidFunctionComponent = () => {
  const t = useTranslate()

  return (
    <React.Fragment>
      <EarningsHeaderBars />
      <EarningsGraphsContent>
        <CenteredInformationMessage>
          {t('generic.inDevelopment')}
        </CenteredInformationMessage>
      </EarningsGraphsContent>
    </React.Fragment>
  )
}
