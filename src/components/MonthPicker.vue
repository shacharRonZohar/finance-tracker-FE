<template>
  <div class="month-picker-container" list="months">
    Showing month:
    <input list="months" type="text" v-model="chosenMonth" />
  </div>
  <datalist id="months">
    <option v-for="month in months" :key="month" :value="month"></option>
  </datalist>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (event: 'updateMonth', value: number): void
}>()

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]
const today = new Date()
const chosenMonth = ref(months[today.getMonth()])

watch(chosenMonth, (newMonth) => {
  emit('updateMonth', months.indexOf(newMonth))
})
</script>

<style>
input {
  background-color: transparent;
  border: none;
  color: white;
  text-transform: capitalize;
}
</style>
