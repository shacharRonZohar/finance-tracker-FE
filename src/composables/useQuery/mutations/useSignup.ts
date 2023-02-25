import { authService } from '@/services/auth.service'
import { useMutation } from 'vue-query'

import type { Creds } from '@/models/user'
export function useSignup() {
  const { data, error, mutateAsync } = useMutation(async ({ username, password }: Creds) =>
    authService.signup(username, password)
  )
  return { user: data, error, signup: mutateAsync }
}
