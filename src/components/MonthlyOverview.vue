<template>
  <span>Showing month: {{ monthData.month }}</span>
  <br />
  <span>Total Budget: {{ monthData.budget }}</span>
  <AddItem @add-item="(newItem:NewItem)=>$emit('add-item', newItem)" />
  <ItemList :list="monthData.expneses.recurring" />
  <ItemList :list="monthData.expneses.nonRecurring" />
  left to spend: {{ totalLeft }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ItemList from '@/components/ItemList.vue'
import AddItem from '@/components/AddItem.vue'
import type { NewItem, MonthData } from '@/models/financial'

const props = defineProps<{
  monthData: MonthData
}>()

defineEmits<{
  (event: 'add-item', newItem: NewItem): void
}>()

const totalExpenses = computed(() => {
  return (
    props.monthData.expneses.recurring.reduce((acc, item) => acc + item.price, 0) +
    props.monthData.expneses.nonRecurring.reduce((acc, item) => acc + item.price, 0)
  )
})

const totalLeft = computed(() => {
  return props.monthData.budget - totalExpenses.value
})

// const onAddItem = (newItem: NewItem) => {

// }
</script>
