<template>
  <form @submit.prevent="onLogin">
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
// import { useQuery } from 'vue-query'
import { useLogin } from '@/composables/useQuery/mutations/useLogin'
import { useRouter } from 'vue-router'
import type { User } from '@/models/user'

const user = inject<Ref<User>>('user')
const router = useRouter()
const { login } = useLogin()

const userCreds = ref({
  username: '',
  password: ''
})

const onLogin = async () => {
  if (!userCreds.value.username.trim() || !userCreds.value.password.trim()) {
    return
  }
  if (!user) {
    return
  }
  user.value = await login(userCreds.value)
  router.push('/monthly')
}
</script>
