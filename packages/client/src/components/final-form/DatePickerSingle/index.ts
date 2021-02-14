import { withFinalForm } from '@habx/lib-form-helper'

import { DatePickerSingle as BaseDatePickerSingle } from '@components/form/DatePickerSingle'

export const DatePickerSingle = withFinalForm<Date>()(BaseDatePickerSingle)
