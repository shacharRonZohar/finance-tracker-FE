import type { Item, MonthData, NewItem } from '@/models/financial'
import { financialService } from '@/services/financial.service'
import { useMutation, useQueryClient } from 'vue-query'

interface AddItemParams {
  item: NewItem
  searchMonth: number
  isRecurring: boolean
}

export function useAddItem() {
  const queryClient = useQueryClient()
  const { data, error, isLoading, mutate } = useMutation(
    async ({ item, searchMonth, isRecurring }: AddItemParams) => {
      // const oldData = await queryClient.getQueryData(['monthly', searchMonth])
      const monthData = await financialService.addItem(item, searchMonth, isRecurring)
      return financialService.saveMonthlyData(monthData)
    },
    {
      onSuccess: (newData: MonthData) => {
        queryClient.setQueryData(['monthly', newData.month], newData)
      }
    }
  )

  return {
    newMonthData: data,
    error,
    isAddingItem: isLoading,
    addItem: mutate
  }
}
