import { withFinalForm } from '@habx/lib-form-helper'
import { Toggle as BaseToggle } from '@habx/ui-core'

export const Toggle = withFinalForm<boolean>({ errorBehavior: 'never' })(
  BaseToggle
)
