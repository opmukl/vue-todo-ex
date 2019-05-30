<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="user.username" />
      <input type="password" v-model="user.password" />
      <button type="submit">login</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      submitted: false
    }
  },
  created() {},
  methods: {
    handleSubmit(e) {
      this.submitted = true
      const { username, password } = this
      if (username && password) {
        this.login({ username, password })
      }
    }
  }
}
</script>
