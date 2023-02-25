<template>
  <main>
    <!-- <ChangeYear></ChangeYear> -->
    <div v-if="isGettingMonthly">Loading...</div>
    <div v-else-if="monthlyError">Had an error: {{ monthlyError }}</div>
    <MonthlyOverview
      v-else-if="monthly"
      :year="year"
      :monthData="monthly"
      @add-item="onAddItem"
      @update-year="onUpdateYear"
      @update-budget="onUpdateBudget"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, provide, inject, onMounted, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGetMonthly } from '@/composables/useQuery/queries/useGetMonthly'
import { useAddItem } from '@/composables/useQuery/mutations/useAddItem'
import MonthlyOverview from '@/components/MonthlyOverview.vue'
import type { NewItem } from '@/models/financial'
import type { User } from '@/models/user'

const router = useRouter()

const today = new Date()
const year = ref(today.getFullYear())
const searchMonth = ref(today.getMonth())
const { monthly, error: monthlyError, isGettingMonthly } = useGetMonthly({ year, searchMonth })
const { addItem, isAddingItem } = useAddItem()

const user = inject<Ref<User>>('user')
provide('isAddingItem', isAddingItem)

const onSwitchMonth = (month: number) => {
  searchMonth.value = month
}

const onUpdateBudget = (newTotal: number) => {
  console.log('new total', newTotal)
}

const onUpdateYear = (newYear: number) => {
  console.log('new year', newYear)
  year.value = newYear
}

const onAddItem = (newItem: NewItem) => {
  addItem({
    item: newItem,
    searchMonth: searchMonth.value,
    isRecurring: false
  })
}

onMounted(() => {
  if (!user?.value) {
    router.push('/auth')
  }
})
</script>
