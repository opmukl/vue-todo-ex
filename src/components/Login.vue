<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="">ID </label><input type="text" v-model="uid" />
      <label for="">PW </label><input type="password" v-model="password" />
      <button type="submit">login</button>
    </form>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('auth')

export default {
  name: 'Login',
  data() {
    return {
      uid: '',
      password: ''
    }
  },
  created() {},
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      try {
        let loginResult = await this.login({
          uid: this.uid,
          password: this.password
        })
        console.log(loginResult) // 로그인 성공하면 true, 아니면 false
      } catch (err) {
        console.log('여긴 Login.vue에서 에러')
        console.error(err)
      }
    }
  }
}
</script>
