import { useMutation } from '@apollo/client'
import * as React from 'react'

import { Form, useFormKeyboardSubmitDecorator } from '@habx/lib-form-helper'
import { ActionBar, Button, notify } from '@habx/ui-core'

import { TextInput } from '@components/final-form/TextInput'

import { UpsertExpenseCategoryPayload } from '@globalTypes/api'
import { addExpenseCategoryGroupToCache } from '@hooks/useExpenseCategoryGroups'
import { useTranslate } from '@hooks/useTranslate'

import {
  upsertExpenseCategoryGroupForm,
  upsertExpenseCategoryGroupFormVariables,
} from './types/upsertExpenseCategoryGroupForm'
import { upsertExpenseCategoryGroupFormMutation } from './UpsertExpenseCategoryGroupForm.query'

export const UpsertExpenseCategoryGroupForm: React.VoidFunctionComponent<UpsertExpenseCategoryFormProps> = ({
  initialValues,
  onClose,
}) => {
  const t = useTranslate()

  const [onUpsertExpense] = useMutation<
    upsertExpenseCategoryGroupForm,
    upsertExpenseCategoryGroupFormVariables
  >(upsertExpenseCategoryGroupFormMutation, {
    update: (cache, { data }) => {
      /*
       * If we did an update, Apollo is smart enough to update the cache by itself
       */
      if (initialValues || !data?.upsertExpenseCategoryGroup) {
        return
      }

      return addExpenseCategoryGroupToCache(
        cache,
        data.upsertExpenseCategoryGroup
      )
    },
  })

  const handleUpsertExpense = async (value: UpsertExpenseCategoryPayload) => {
    await onUpsertExpense({
      variables: {
        payload: value,
      },
    })

    notify(t('pages.expenses.categoryGroupModal.onSuccess.notify'))

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
          <TextInput
            name="name"
            required
            label={t('entities.expenseCategoryGroups.fields.name.label')}
          />
          <TextInput
            name="description"
            label={t('entities.expenseCategoryGroups.fields.description.label')}
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
