import type { Ref } from 'vue'
import { useQuery } from 'vue-query'
import { financialService } from '@/services/financial.service'

export function useGetMonthly({ year, searchMonth }: { year: Ref<number>; searchMonth: Ref<number> }) {
  const { data, error, isLoading } = useQuery(['monthly', year, searchMonth], ({ queryKey }) => {
    const year = queryKey[1] as unknown as number
    const month = queryKey[2] as unknown as number
    return financialService.getMonthlyData({ year, month })
  })

  return {
    monthly: data,
    error,
    isGettingMonthly: isLoading
  }
}
