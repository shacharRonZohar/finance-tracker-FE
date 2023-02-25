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
import { ref } from 'vue'
// import { useQuery } from 'vue-query'
import { useRouter } from 'vue-router'
const router = useRouter()
const userCreds = ref({
  username: '',
  password: ''
})

const onLogin = () => {
  // if (!userCreds.value.username.trim() || !userCreds.value.password.trim()) {
  //   return
  // }
  router.push('/monthly')
}
</script>
