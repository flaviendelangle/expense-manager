import { useMutation } from '@apollo/client'
import * as React from 'react'

import { Form, useFormKeyboardSubmitDecorator } from '@habx/lib-form-helper'
import { ActionBar, Button, notify } from '@habx/ui-core'

import { DatePickerSingle } from '@components/final-form/DatePickerSingle'
import { NumberInput } from '@components/final-form/NumberInput'
import { SelectEarningCategory } from '@components/final-form/SelectEarningCategory'
import { TextInput } from '@components/final-form/TextInput'

import { UpsertExpensePayload } from '@globalTypes/api'
import { addEarningToCache } from '@hooks/useEarnings'
import { useTranslate } from '@hooks/useTranslate'

import {
  upsertEarningForm,
  upsertEarningFormVariables,
} from './types/upsertEarningForm'
import { upsertEarningFormMutation } from './UpsertEarningForm.query'

export const UpsertEarningForm: React.VoidFunctionComponent<UpsertExpenseFormProps> = ({
  initialValues,
  onClose,
}) => {
  const t = useTranslate()

  const [onUpsertEarning] = useMutation<
    upsertEarningForm,
    upsertEarningFormVariables
  >(upsertEarningFormMutation, {
    update: (cache, { data }) => {
      /*
       * If we did an update, Apollo is smart enough to update the cache by itself
       */
      if (initialValues || !data?.upsertEarning) {
        return
      }

      return addEarningToCache(cache, data.upsertEarning)
    },
  })

  const handleUpsertExpense = async (value: UpsertExpensePayload) => {
    await onUpsertEarning({
      variables: {
        payload: value,
      },
    })

    notify(t('pages.earnings.itemModal.onSuccess.notify'))

    return onClose()
  }

  const keyboardSubmitDecorator = useFormKeyboardSubmitDecorator()

  return (
    <Form<UpsertExpensePayload>
      onSubmit={handleUpsertExpense}
      initialValues={initialValues}
      decorators={[keyboardSubmitDecorator]}
      render={({ handleSubmit, pristine, hasValidationErrors, submitting }) => (
        <form onSubmit={handleSubmit}>
          <SelectEarningCategory
            filterable
            name="earningCategoryId"
            label={t('entities.earnings.fields.earningCategory.label')}
            required
          />
          <TextInput
            name="description"
            label={t('entities.earnings.fields.description.label')}
          />
          <NumberInput
            name="value"
            label={t('entities.earnings.fields.amount.label')}
            required
          />
          <DatePickerSingle
            name="earnedAt"
            label={t('entities.earnings.fields.earnedAt.label')}
            required
          />
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

interface UpsertExpenseFormProps {
  initialValues: UpsertExpensePayload | undefined
  onClose: () => void
}
