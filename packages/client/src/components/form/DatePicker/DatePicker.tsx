import { ModalState } from '@delangle/use-modal'
import { format } from 'date-fns'
import * as React from 'react'

import { TextInput, TogglePanel, TogglePanelProps } from '@habx/ui-core'

import { DatePickerProps } from './DatePicker.interface'
import { DatePickerPanel } from './DatePickerPanel'

const TRIGGER_MARGIN = 8

const datePickerStyleSetter: Required<TogglePanelProps>['setStyle'] = (
  dimensions,
  triggerDimensions
) => {
  const menuHeight = dimensions.clientHeight
  const menuWidth = dimensions.clientWidth

  let top = triggerDimensions.bottom + TRIGGER_MARGIN

  if (top + menuHeight > window.innerHeight) {
    const topWithMenuAboveTrigger =
      triggerDimensions.top - TRIGGER_MARGIN - menuHeight

    if (topWithMenuAboveTrigger > 0) {
      top = topWithMenuAboveTrigger
    }
  }

  let left =
    triggerDimensions.left + menuWidth > window.innerWidth
      ? triggerDimensions.left - menuWidth + triggerDimensions.width
      : triggerDimensions.left

  return { top, left, minWidth: triggerDimensions.width }
}

export const DatePicker: React.VoidFunctionComponent<DatePickerProps> = ({
  value,
  onChange,
  exactMinBookingDays,
  onFocus,
  inputDateFormat = 'yyyy-MM-dd',
  ...props
}) => {
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = React.useState(false)

  const handleTextInputFocus = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e)
      setIsOpened(true)
    },
    [onFocus]
  )

  const inputValue = React.useMemo(() => {
    if (!value) {
      return ''
    }

    if (exactMinBookingDays) {
      if (!value.start) {
        return ''
      }

      return format(value.start, inputDateFormat)
    }

    const startLabel = value.start ? format(value.start, inputDateFormat) : '?'
    const endLabel = value.end ? format(value.end, inputDateFormat) : '?'

    return `${startLabel} - ${endLabel}`
  }, [exactMinBookingDays, inputDateFormat, value])

  return (
    <React.Fragment>
      <TogglePanel
        triggerRef={triggerRef}
        open={isOpened}
        onClose={() => setIsOpened(false)}
        setStyle={datePickerStyleSetter}
      >
        {(modal) =>
          modal.state !== ModalState.closed && (
            <DatePickerPanel
              value={value}
              onChange={(newValue) => {
                onChange(newValue)
                modal.close()
              }}
              onAbort={modal.close}
              exactMinBookingDays={exactMinBookingDays}
            />
          )
        }
      </TogglePanel>
      <TextInput
        containerRef={triggerRef}
        value={inputValue}
        onFocus={handleTextInputFocus}
        {...props}
      />
    </React.Fragment>
  )
}
