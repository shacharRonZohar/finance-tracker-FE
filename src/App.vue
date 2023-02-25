<template>
  <AppHeader></AppHeader>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import AppHeader from './components/app-header.vue'
import { authService } from './services/auth.service'
import type { User } from './models/user'

const user = ref<User | null>(null)

provide('user', user)

authService.getLoggedInUser().then((loggedInUser) => {
  console.log('user', loggedInUser)
  user.value = loggedInUser
})
// onMounted(async () => {
//   console.log('mounted')
//   user.value =
//   if (!user.value) {
//     console.log('no user')
//   }
// })
</script>
