<template>
  <main>
    <!-- <ChangeYear></ChangeYear> -->
    <div v-if="isGettingMonthly">Loading...</div>
    <div v-else-if="monthlyError">Had an error: {{ monthlyError }}</div>
    <MonthlyOverview v-else-if="monthly" :monthData="monthly" @add-item="onAddItem"></MonthlyOverview>
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

const year = ref(2021)
const searchMonth = ref(1)
const { monthly, error: monthlyError, isGettingMonthly } = useGetMonthly({ year, searchMonth })
const { addItem, isAddingItem } = useAddItem()

const user = inject<Ref<User>>('user')
provide('isAddingItem', isAddingItem)

const onSwitchMonth = (month: number) => {
  searchMonth.value = month
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
