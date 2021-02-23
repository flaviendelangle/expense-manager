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
import { useTranslate } from '@hooks/useTranslate'

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
  const t = useTranslate()

  const [onUpsertExpense] = useMutation<
    upsertExpenseForm,
    upsertExpenseFormVariables
  >(upsertExpenseFormMutation, {
    update: (cache, { data }) => {
      /*
       * If we did an update, Apollo is smart enough to update the cache by itself
       */
      if (rawInitialValues || !data?.upsertExpense) {
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

    notify(t('pages.expenses.itemModal.onSuccess.notify'))

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
              label={t('entities.expenses.fields.expenseCategory.label')}
              required
            />
            <TextInput
              name="description"
              label={t('entities.expenses.fields.description.label')}
            />
            <NumberInput
              name="value"
              label={t('entities.expenses.fields.amount.label')}
              required
            />
            <DatePickerSingle
              name="spentAt"
              label={t('entities.expenses.fields.spentAt.label')}
              required
            />
          </UpsertExpenseFormSubGrid>
          <RefundToggleContainer>
            <Toggle
              name="hasRefund"
              label={t('pages.expenses.itemModal.hasRefund.label')}
            />
          </RefundToggleContainer>
          {values.hasRefund && (
            <UpsertExpenseFormSubGrid>
              <SelectEarningCategory
                filterable
                name="refund.earningCategoryId"
                label={t('entities.refunds.fields.earningCategory.label')}
                required
              />
              <NumberInput
                name="refund.value"
                label={t('entities.refunds.fields.amount.label')}
                required
              />
              <TextInput
                name="refund.description"
                label={t('entities.refunds.fields.description.label')}
              />
            </UpsertExpenseFormSubGrid>
          )}
          <ActionBar>
            <Button ghost error onClick={onClose}>
              {t('generic.abort')}
            </Button>
            <Button
              type="submit"
              disabled={pristine || hasValidationErrors || submitting}
            >
              {t('generic.submit')}
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
