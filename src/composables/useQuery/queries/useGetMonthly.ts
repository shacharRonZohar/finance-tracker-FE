import type { Ref } from 'vue'
import { useQuery } from 'vue-query'
import { financialService } from '@/services/financial.service'

export function useGetMonthly({ searchMonth }: { searchMonth: Ref<number> }) {
  const { data, error, isLoading } = useQuery(['monthly', searchMonth], ({ queryKey }) => {
    const month = queryKey[1] as unknown as number
    return financialService.getMonthlyData(month)
  })

  return {
    monthly: data,
    error,
    isGettingMonthly: isLoading
  }
}
