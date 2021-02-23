import { useMutation } from '@apollo/client'
import * as React from 'react'

import { Form, useFormKeyboardSubmitDecorator } from '@habx/lib-form-helper'
import { ActionBar, Button, notify } from '@habx/ui-core'

import { SelectExpenseCategoryGroup } from '@components/final-form/SelectExpenseCategoryGroup'
import { TextInput } from '@components/final-form/TextInput'

import { UpsertExpenseCategoryPayload } from '@globalTypes/api'
import { addExpenseCategoryToCache } from '@hooks/useExpenseCategories'
import { useTranslate } from '@hooks/useTranslate'

import {
  upsertExpenseCategoryForm,
  upsertExpenseCategoryFormVariables,
} from './types/upsertExpenseCategoryForm'
import { upsertExpenseCategoryFormMutation } from './UpsertExpenseCategoryForm.query'

export const UpsertExpenseCategoryForm: React.VoidFunctionComponent<UpsertExpenseCategoryFormProps> = ({
  initialValues,
  onClose,
}) => {
  const t = useTranslate()

  const [onUpsertExpense] = useMutation<
    upsertExpenseCategoryForm,
    upsertExpenseCategoryFormVariables
  >(upsertExpenseCategoryFormMutation, {
    update: (cache, { data }) => {
      /*
       * If we did an update, Apollo is smart enough to update the cache by itself
       */
      if (initialValues || !data?.upsertExpenseCategory) {
        return
      }

      return addExpenseCategoryToCache(cache, data.upsertExpenseCategory)
    },
  })

  const handleUpsertExpense = async (value: UpsertExpenseCategoryPayload) => {
    await onUpsertExpense({
      variables: {
        payload: value,
      },
    })

    notify(t('pages.expenses.categoryModal.onSuccess.notify'))

    return onClose()
  }

  const keyboardSubmitDecorator = useFormKeyboardSubmitDecorator()

  return (
    <Form<UpsertExpenseCategoryPayload>
      onSubmit={handleUpsertExpense}
      initialValues={initialValues}
      decorators={[keyboardSubmitDecorator]}
      render={({ handleSubmit, pristine, hasValidationErrors, submitting }) => (
        <form onSubmit={handleSubmit}>
          <SelectExpenseCategoryGroup
            filterable
            name="expenseCategoryGroupId"
            label={t(
              'entities.expenseCategories.fields.expenseCategoryGroup.label'
            )}
            required
          />
          <TextInput
            name="name"
            required
            label={t('entities.expenseCategories.fields.name.label')}
          />
          <TextInput
            name="description"
            label={t('entities.expenseCategories.fields.description.label')}
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

interface UpsertExpenseCategoryFormProps {
  initialValues: UpsertExpenseCategoryPayload | undefined
  onClose: () => void
}
