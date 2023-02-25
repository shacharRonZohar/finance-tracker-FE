<template>
  <div :class="dynamicClass">
    {{ labelTxt }}
    <span contenteditable="true" @blur="onBlur">{{ modelValue }}</span>
  </div>
</template>

<script setup lang="ts">
import type { DynamicClass } from '@/models/vue'

defineProps<{
  modelValue: number
  labelTxt: string
  dynamicClass?: DynamicClass
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const onBlur = (ev: FocusEvent) => {
  // @ts-ignore
  const newValue = ev.target.innerText
  emit('update:modelValue', newValue)
}
</script>
