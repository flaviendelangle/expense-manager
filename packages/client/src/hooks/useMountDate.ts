import * as React from 'react'

export const useMountDate = () => {
  const ref = React.useRef<Date>()

  if (!ref.current) {
    ref.current = new Date()
  }

  return ref.current
}
