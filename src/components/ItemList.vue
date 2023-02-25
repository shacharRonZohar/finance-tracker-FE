<template>
  <ul>
    <li v-for="{ id, name, price } in list" :key="id">
      <span>{{ name }}</span>
      <span>{{ price }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Item } from '@/models/financial'

const props = defineProps<{
  list: Item[]
}>()
</script>
