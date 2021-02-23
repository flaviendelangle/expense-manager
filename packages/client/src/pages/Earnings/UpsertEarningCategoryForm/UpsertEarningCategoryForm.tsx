import { useMutation } from '@apollo/client'
import * as React from 'react'

import { Form, useFormKeyboardSubmitDecorator } from '@habx/lib-form-helper'
import { ActionBar, Button, notify } from '@habx/ui-core'

import { TextInput } from '@components/final-form/TextInput'

import { UpsertEarningCategoryPayload } from '@globalTypes/api'
import { addEarningCategoryToCache } from '@hooks/useEarningCategories'
import { useTranslate } from '@hooks/useTranslate'

import {
  upsertEarningCategoryForm,
  upsertEarningCategoryFormVariables,
} from './types/upsertEarningCategoryForm'
import { upsertEarningCategoryFormMutation } from './UpsertEarningCategoryForm.query'

export const UpsertEarningCategoryForm: React.VoidFunctionComponent<UpsertEarningCategoryFormProps> = ({
  initialValues,
  onClose,
}) => {
  const t = useTranslate()

  const [onUpsertEarning] = useMutation<
    upsertEarningCategoryForm,
    upsertEarningCategoryFormVariables
  >(upsertEarningCategoryFormMutation, {
    update: (cache, { data }) => {
      /*
       * If we did an update, Apollo is smart enough to update the cache by itself
       */
      if (initialValues || !data?.upsertEarningCategory) {
        return
      }

      return addEarningCategoryToCache(cache, data.upsertEarningCategory)
    },
  })

  const handleUpsertEarningCategory = async (
    value: UpsertEarningCategoryPayload
  ) => {
    await onUpsertEarning({
      variables: {
        payload: value,
      },
    })

    notify(t('pages.earnings.categoryModal.onSuccess.notify'))

    return onClose()
  }

  const keyboardSubmitDecorator = useFormKeyboardSubmitDecorator()

  return (
    <Form<UpsertEarningCategoryPayload>
      onSubmit={handleUpsertEarningCategory}
      initialValues={initialValues}
      decorators={[keyboardSubmitDecorator]}
      render={({ handleSubmit, pristine, hasValidationErrors, submitting }) => (
        <form onSubmit={handleSubmit}>
          <TextInput
            name="name"
            label={t('entities.earningCategories.fields.name.label')}
          />
          <TextInput
            name="description"
            label={t('entities.earningCategories.fields.description.label')}
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

interface UpsertEarningCategoryFormProps {
  initialValues: UpsertEarningCategoryPayload | undefined
  onClose: () => void
}
