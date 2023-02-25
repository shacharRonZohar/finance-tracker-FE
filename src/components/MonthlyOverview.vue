<template>
  <MonthPicker />
  <NumberPicker label-txt="Showing Year" v-model="yearCombo" />
  <NumberPicker label-txt="Total Budget" v-model="budgetCombo" />
  <AddItem @add-item="(newItem:NewItem)=>$emit('add-item', newItem)" />
  <ItemList :list="monthData.expneses.recurring" />
  <ItemList :list="monthData.expneses.nonRecurring" />
  left to spend: {{ totalLeft }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ItemList from '@/components/ItemList.vue'
import AddItem from '@/components/AddItem.vue'
import MonthPicker from '@/components/MonthPicker.vue'
import NumberPicker from '@/components/NumberPicker.vue'
import type { NewItem, MonthData } from '@/models/financial'

const props = defineProps<{
  year: number
  monthData: MonthData
}>()

const emit = defineEmits<{
  (event: 'add-item', newItem: NewItem): void
  (event: 'updateBudget', newTotal: number): void
  (event: 'updateYear', newYear: number): void
}>()

// const month = ref(0)
const totalExpenses = computed(() => {
  return (
    props.monthData.expneses.recurring.reduce((acc, item) => acc + item.price, 0) +
    props.monthData.expneses.nonRecurring.reduce((acc, item) => acc + item.price, 0)
  )
})

const totalLeft = computed(() => {
  return props.monthData.budget - totalExpenses.value
})

const budgetCombo = computed({
  get() {
    return props.monthData.budget
  },
  set(newTotal) {
    emit('updateBudget', newTotal)
  }
})
const yearCombo = computed({
  get() {
    return props.year
  },
  set(newYear) {
    emit('updateYear', +newYear)
  }
})

// const onAddItem = (newItem: NewItem) => {

// }
</script>
