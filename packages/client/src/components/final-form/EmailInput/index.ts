import validatorIsEmail from 'validator/lib/isEmail'

import { withFinalForm, ValidationCallback } from '@habx/lib-form-helper'
import { TextInput } from '@habx/ui-core'

export const isEmail = (value: string) =>
  validatorIsEmail(String(value), { allow_utf8_local_part: false })

const validate: ValidationCallback<string, any> = (
  email: string | undefined
) => {
  if (email && !isEmail(email)) {
    return 'Email non valide'
  }

  return undefined
}

export const EmailInput = withFinalForm<string>({
  validate,
  errorBehavior: 'dirty',
})(TextInput)
