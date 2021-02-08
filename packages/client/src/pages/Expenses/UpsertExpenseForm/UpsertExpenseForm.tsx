import { useMutation } from '@apollo/client'
import * as React from 'react'

import { Form } from '@habx/lib-form-helper'
import { ActionBar, Button, notify } from '@habx/ui-core'

import { NumberInput } from '@components/final-form/NumberInput'
import { SelectExpenseCategory } from '@components/final-form/SelectExpenseCategory'
import { TextInput } from '@components/final-form/TextInput'

import { UpsertExpensePayload } from '@globalTypes/api'
import { addExpenseToCache } from '@hooks/useExpenses'

import {
  upsertExpenseForm,
  upsertExpenseFormVariables,
} from './types/upsertExpenseForm'
import { upsertExpenseFormMutation } from './UpsertExpenseForm.query'

export const UpsertExpenseForm: React.VoidFunctionComponent<UpsertExpenseFormProps> = ({
  initialValues,
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

  const handleUpsertExpense = async (value: UpsertExpensePayload) => {
    await onUpsertExpense({
      variables: {
        payload: value,
      },
    })

    notify('Dépense entregistrée')

    return onClose()
  }

  return (
    <Form<UpsertExpensePayload>
      onSubmit={handleUpsertExpense}
      initialValues={initialValues}
      render={({ handleSubmit, pristine, hasValidationErrors, submitting }) => (
        <form onSubmit={handleSubmit}>
          <SelectExpenseCategory name="categoryId" label="Catégorie" required />
          <TextInput name="description" label="Description" />
          <NumberInput name="value" label="Montant" required />
          <TextInput
            name="spentAt"
            label="Date de l'achat (à améliorer)"
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
