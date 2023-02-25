<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/auth">{{ navItem }}</RouterLink>
      <RouterLink to="/signup">Signup</RouterLink>
      <RouterLink to="/monthly">Monthly</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { type Ref, inject, computed } from 'vue'
import type { User } from '@/models/user'

const user = inject<Ref<User | null>>('user') as Ref<User | null>

const navItem = computed(() => {
  return user.value ? 'logout' : 'login'
})
</script>
