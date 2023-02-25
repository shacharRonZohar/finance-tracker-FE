import { useMutation } from 'vue-query'
import { authService } from '@/services/auth.service'

export function useLogout() {
  const { mutateAsync, isLoading: isLoggingOut, error } = useMutation(async () => authService.logout())
  return { logout: mutateAsync, isLoading: isLoggingOut, error }
}
