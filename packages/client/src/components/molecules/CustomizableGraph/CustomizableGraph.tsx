import * as React from 'react'

import { Title } from '@habx/ui-core'

import {
  CustomizableGraphContainer,
  CustomizableGraphDefaultHeader,
  CustomizableGraphContent,
} from './CustomizableGraph.style'

const defaultHeaderRenderer: CustomizableGraphHeaderRenderer = ({
  label,
  actions,
}) => (
  <CustomizableGraphDefaultHeader>
    <Title type="section">{label}</Title>
    <div>{actions}</div>
  </CustomizableGraphDefaultHeader>
)

export const CustomizableGraph: React.FunctionComponent<CustomizableGraphProps> = ({
  children,
  renderHeader = defaultHeaderRenderer,
  label,
  graphHeight,
  loading,
  initialConfig,
  ...props
}) => {
  const [config, setConfig] = React.useState(initialConfig)

  return (
    <CustomizableGraphContainer {...props}>
      {renderHeader({ label, actions: null })}
      <CustomizableGraphContent style={{ height: graphHeight }}>
        {!loading && children([config, setConfig])}
      </CustomizableGraphContent>
    </CustomizableGraphContainer>
  )
}

type CustomizableGraphHeaderRenderer = (header: {
  label: string
  actions: React.ReactNode
}) => React.ReactNode

export interface CustomizableGraphProps
  extends React.HTMLAttributes<HTMLDivElement> {
  initialConfig: any
  renderHeader?: CustomizableGraphHeaderRenderer
  label: string
  graphHeight: number
  loading?: boolean
  children: (
    value: [any, React.Dispatch<React.SetStateAction<any>>]
  ) => React.ReactNode
}
