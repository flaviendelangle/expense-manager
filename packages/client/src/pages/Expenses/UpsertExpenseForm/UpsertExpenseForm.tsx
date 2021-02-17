import { useMutation } from '@apollo/client'
import * as React from 'react'

import { Form, useFormKeyboardSubmitDecorator } from '@habx/lib-form-helper'
import { ActionBar, Button, notify } from '@habx/ui-core'

import { DatePickerSingle } from '@components/final-form/DatePickerSingle'
import { NumberInput } from '@components/final-form/NumberInput'
import { SelectEarningCategory } from '@components/final-form/SelectEarningCategory'
import { SelectExpenseCategory } from '@components/final-form/SelectExpenseCategory'
import { TextInput } from '@components/final-form/TextInput'
import { Toggle } from '@components/final-form/Toggle'

import { UpsertExpensePayload } from '@globalTypes/api'
import { addExpenseToCache } from '@hooks/useExpenses'

import {
  upsertExpenseForm,
  upsertExpenseFormVariables,
} from './types/upsertExpenseForm'
import { upsertExpenseFormMutation } from './UpsertExpenseForm.query'
import {
  UpsertExpenseFormSubGrid,
  RefundToggleContainer,
} from './UpsertExpenseForm.style'

export const UpsertExpenseForm: React.VoidFunctionComponent<UpsertExpenseFormProps> = ({
  initialValues: rawInitialValues,
  onClose,
}) => {
  const [onUpsertExpense] = useMutation<
    upsertExpenseForm,
    upsertExpenseFormVariables
  >(upsertExpenseFormMutation, {
    update: (cache, { data }) => {
      /*
       * If we did an update, Apollo is smart enough to update the cache by itself
       */
      if (initialValues || !data?.upsertExpense) {
        return
      }

      return addExpenseToCache(cache, data.upsertExpense)
    },
  })

  const handleUpsertExpense = async ({
    hasRefund,
    ...restValue
  }: FormValue) => {
    let payload: UpsertExpensePayload = restValue

    if (!hasRefund) {
      payload.refund = null
    }

    if (payload.refund && !payload.refund.refundedAt) {
      payload.refund.refundedAt = restValue.spentAt
    }

    await onUpsertExpense({
      variables: {
        payload,
      },
    })

    notify('Dépense entregistrée')

    return onClose()
  }

  const initialValues = React.useMemo<FormValue | undefined>(() => {
    if (!rawInitialValues) {
      return undefined
    }

    return { ...rawInitialValues, hasRefund: !!rawInitialValues.refund }
  }, [rawInitialValues])

  const keyboardSubmitDecorator = useFormKeyboardSubmitDecorator()

  return (
    <Form<FormValue>
      onSubmit={handleUpsertExpense}
      initialValues={initialValues}
      decorators={[keyboardSubmitDecorator]}
      render={({
        handleSubmit,
        pristine,
        hasValidationErrors,
        submitting,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <UpsertExpenseFormSubGrid>
            <SelectExpenseCategory
              filterable
              name="expenseCategoryId"
              label="Catégorie"
              required
            />
            <TextInput name="description" label="Description" />
            <NumberInput name="value" label="Montant" required />
            <DatePickerSingle
              name="spentAt"
              label="Date de la dépense"
              required
            />
          </UpsertExpenseFormSubGrid>
          <RefundToggleContainer>
            <Toggle name="hasRefund" label="Appliquer un remboursement" />
          </RefundToggleContainer>
          {values.hasRefund && (
            <UpsertExpenseFormSubGrid>
              <SelectEarningCategory
                filterable
                name="refund.earningCategoryId"
                label="Catégorie"
                required
              />
              <NumberInput name="refund.value" label="Montant" required />
              <TextInput name="refund.description" label="Description" />
            </UpsertExpenseFormSubGrid>
          )}
          <ActionBar>
            <Button ghost error onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={pristine || hasValidationErrors || submitting}
            >
              Enregistrer
            </Button>
          </ActionBar>
        </form>
      )}
    />
  )
}

type FormValue = UpsertExpensePayload & {
  hasRefund?: boolean
}

interface UpsertExpenseFormProps {
  initialValues: UpsertExpensePayload | undefined
  onClose: () => void
}
