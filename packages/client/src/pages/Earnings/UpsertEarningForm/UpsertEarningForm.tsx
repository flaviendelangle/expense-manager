import { useMutation } from '@apollo/client'
import * as React from 'react'

import { Form } from '@habx/lib-form-helper'
import { ActionBar, Button, notify } from '@habx/ui-core'

import { DatePickerSingle } from '@components/final-form/DatePickerSingle'
import { NumberInput } from '@components/final-form/NumberInput'
import { SelectEarningCategory } from '@components/final-form/SelectEarningCategory'
import { TextInput } from '@components/final-form/TextInput'

import { UpsertExpensePayload } from '@globalTypes/api'
import { addEarningToCache } from '@hooks/useEarnings'

import {
  upsertEarningForm,
  upsertEarningFormVariables,
} from './types/upsertEarningForm'
import { upsertEarningFormMutation } from './UpsertEarningForm.query'

export const UpsertEarningForm: React.VoidFunctionComponent<UpsertExpenseFormProps> = ({
  initialValues,
  onClose,
}) => {
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

    notify('Recette entregistrée')

    return onClose()
  }

  return (
    <Form<UpsertExpensePayload>
      onSubmit={handleUpsertExpense}
      initialValues={initialValues}
      render={({ handleSubmit, pristine, hasValidationErrors, submitting }) => (
        <form onSubmit={handleSubmit}>
          <SelectEarningCategory
            filterable
            name="earningCategoryId"
            label="Catégorie"
            required
          />
          <TextInput name="description" label="Description" />
          <NumberInput name="value" label="Montant" required />
          <DatePickerSingle
            name="earnedAt"
            label="Date de la recette"
            required
          />
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

interface UpsertExpenseFormProps {
  initialValues: UpsertExpensePayload | undefined
  onClose: () => void
}
