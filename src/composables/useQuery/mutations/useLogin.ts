import { useMutation } from 'vue-query'

import { authService } from '@/services/auth.service'

import type { Creds } from '@/models/user'

export function useLogin() {
  const {
    mutateAsync,
    isLoading: isLoggingIn,
    error
  } = useMutation(async ({ username, password }: Creds) => authService.login(username, password))
  return { login: mutateAsync, isLoading: isLoggingIn, error }
}
