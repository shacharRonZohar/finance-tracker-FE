<template>
  <div class="add-item">
    <form @submit.prevent="onAddItem">
      <input v-model="newItem.name" type="text" placeholder="name" />
      <input v-model="newItem.price" type="number" placeholder="price" />
      <input type="checkbox" placeholder="isRecurring" />
      <button type="submit">Add</button>
    </form>

    <div v-if="isAddingItem">Adding Item...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, type Ref } from 'vue'
import type { NewItem } from '@/models/financial'

const emit = defineEmits<{
  (event: 'add-item', newItem: NewItem): void
}>()

const isAddingItem = inject<Ref<boolean>>('isAddingItem')
const newItem = ref({
  name: '',
  price: 0
})

const onAddItem = () => {
  //   console.log('onAddItem')
  emit('add-item', newItem.value)
}
</script>
