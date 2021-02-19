import { withFinalForm } from '@habx/lib-form-helper'
import { PasswordInput as BasePasswordInput } from '@habx/ui-core'

export const PasswordInput = withFinalForm<string>()(BasePasswordInput)
