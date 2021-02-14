import { ModalState } from '@delangle/use-modal'
import { format } from 'date-fns'
import * as React from 'react'

import {
  TogglePanel,
  TogglePanelStyleSetter,
  menuDefaultPositionSetter,
  useHasColoredBackground,
  withLabel,
} from '@habx/ui-core'

import { DatePickerInnerProps } from './DatePicker.interface'
import { DatePickerFakeInput } from './DatePicker.style'
import { DatePickerPanel } from './DatePickerPanel'

const togglePanelStyleSetter: TogglePanelStyleSetter = (
  dimensions,
  triggerDimensions
) => {
  const menuHeight = dimensions.clientHeight
  const menuWidth = dimensions.clientWidth

  return menuDefaultPositionSetter({
    triggerDimensions,
    menuHeight,
    menuWidth,
    position: 'vertical',
  })
}

const InnerDatePicker: React.VoidFunctionComponent<DatePickerInnerProps> = ({
  value,
  onChange,
  exactMinBookingDays,
  onFocus,
  inputDateFormat = 'yyyy-MM-dd',
  small,
  disabled,
  error,
  ...props
}) => {
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = React.useState(false)
  const hasBackground = useHasColoredBackground()

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
        setStyle={togglePanelStyleSetter}
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
      <DatePickerFakeInput
        ref={triggerRef}
        onFocus={handleTextInputFocus}
        tabIndex={0}
        data-error={error}
        data-small={small}
        data-background={hasBackground}
        data-disabled={disabled}
        data-focused={isOpened}
        {...props}
      >
        {inputValue}
      </DatePickerFakeInput>
    </React.Fragment>
  )
}

export const DatePicker = withLabel<HTMLDivElement>({
  orientation: 'vertical',
})<DatePickerInnerProps>(InnerDatePicker)
