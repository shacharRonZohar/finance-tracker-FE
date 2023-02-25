<template>
  <div v-if="user">
    <button @click="onLogout">Log Out</button>
  </div>
  <form v-else @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="username">Username</label>
      <input v-model="userCreds.username" type="text" class="form-control" id="username" placeholder="Enter username" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="userCreds.password" type="password" class="form-control" id="password" placeholder="Password" />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref, inject, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { useQuery } from 'vue-query'
import { useLogin } from '@/composables/useQuery/mutations/useLogin'
import { useSignup } from '@/composables/useQuery/mutations/useSignup'
import { useLogout } from '@/composables/useQuery/mutations/useLogout'
import type { User } from '@/models/user'

const user = inject<Ref<User | null>>('user') as Ref<User | null>
const route = useRoute()
const router = useRouter()
const { login } = useLogin()
const { signup } = useSignup()
const { logout } = useLogout()

const userCreds = ref({
  username: '',
  password: ''
})

const onSubmit = async () => {
  if (!userCreds.value.username.trim() || !userCreds.value.password.trim()) {
    return
  }
  const func = route.fullPath.toLowerCase().includes('signup') ? signup : login
  // console.log(await func(userCreds.value))
  user.value = await func(userCreds.value)
  router.push('/monthly')
}

const onLogout = () => {
  logout()
  user.value = null
  // router.push('/')
}
</script>
