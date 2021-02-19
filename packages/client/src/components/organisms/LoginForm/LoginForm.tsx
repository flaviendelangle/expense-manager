import { useMutation } from '@apollo/client'
import * as React from 'react'

import { Form } from '@habx/lib-form-helper'
import { ActionBar, Button, notify } from '@habx/ui-core'

import { EmailInput } from '@components/final-form/EmailInput'
import { PasswordInput } from '@components/final-form/PasswordInput'

import { LoginPayload } from '@globalTypes/api'
import { updateCurrentUserInCache } from '@hooks/useCurrentUser'

import { loginMutation } from './LoginForm.query'
import { LoginFormContainer, LoginFormContent } from './LoginForm.style'
import { login, loginVariables } from './types/login'

export const LoginForm: React.VoidFunctionComponent = () => {
  const [onLogin] = useMutation<login, loginVariables>(loginMutation, {
    update: (cache, { data }) => {
      if (!data?.login) {
        return
      }

      return updateCurrentUserInCache(cache, data.login)
    },
  })

  const handleLogin = async (value: LoginPayload) => {
    try {
      await onLogin({ variables: { payload: value } })

      notify('Vous êtes maintenant connecté')
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
    <LoginFormContainer>
      <Form
        onSubmit={handleLogin}
        render={({ handleSubmit, hasValidationErrors }) => (
          <LoginFormContent spacing="regular">
            <form onSubmit={handleSubmit}>
              <EmailInput name="email" label="Adresse email" required />
              <PasswordInput name="password" label="Mot de passe" required />
              <ActionBar>
                <Button type="submit" disabled={hasValidationErrors}>
                  Me connecter
                </Button>
              </ActionBar>
            </form>
          </LoginFormContent>
        )}
      />
    </LoginFormContainer>
  )
}
