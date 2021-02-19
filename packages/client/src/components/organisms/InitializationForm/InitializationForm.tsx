import { useMutation } from '@apollo/client'
import * as React from 'react'

import { Form } from '@habx/lib-form-helper'
import { ActionBar, Button, notify } from '@habx/ui-core'

import { EmailInput } from '@components/final-form/EmailInput'
import { PasswordInput } from '@components/final-form/PasswordInput'

import { LoginPayload } from '@globalTypes/api'

import { initializeServerMutation } from './InitializationForm.query'
import {
  InitializationFormContainer,
  InitializationFormContent,
  InitializationFormTitle,
} from './InitializationForm.style'
import {
  initializeServer,
  initializeServerVariables,
} from './types/initializeServer'

export const InitializationForm: React.VoidFunctionComponent = () => {
  const [onInitialize] = useMutation<
    initializeServer,
    initializeServerVariables
  >(initializeServerMutation)

  const handleInitialize = async (value: LoginPayload) => {
    try {
      await onInitialize({ variables: { adminPayload: value } })

      notify('Le serveur est initialisé, vous pouvez vous connecter')
    } catch (e) {
      const error = e.graphQLErrors[0]?.message

      if (error === 'Wrong email') {
        return { email: "Aucun compte n'a été trouvé pour cet adresse" }
      }

      if (error === 'Wrong password') {
        return {
          password: 'Mot de passe incorrect',
        }
      }
    }
  }

  return (
    <InitializationFormContainer>
      <Form
        onSubmit={handleInitialize}
        render={({ handleSubmit, hasValidationErrors }) => (
          <InitializationFormContent spacing="regular">
            <InitializationFormTitle>
              Créez le compte administrateur
            </InitializationFormTitle>
            <form onSubmit={handleSubmit}>
              <EmailInput name="email" label="Adresse email" required />
              <PasswordInput name="password" label="Mot de passe" required />
              <ActionBar>
                <Button type="submit" disabled={hasValidationErrors}>
                  Créer
                </Button>
              </ActionBar>
            </form>
          </InitializationFormContent>
        )}
      />
    </InitializationFormContainer>
  )
}
