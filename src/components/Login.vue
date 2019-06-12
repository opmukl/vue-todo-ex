<template>
  <section>
    <p v-if="userAuth">{{ authedUserId }}님 안녕하세요</p>

    <form @submit.prevent="onSubmit" v-if="!userAuth">
      <label for="uid">ID</label>
      <input id="uid" type="text" v-model="uid" />

      <label for="pw">PW</label>
      <input id="pw" type="password" v-model="password" />

      <div class="btn-box">
        <button type="submit">login</button>
        <button type="button">회원등록</button>
      </div>
    </form>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('auth')

export default {
  name: 'Login',
  data() {
    return {
      uid: '',
      password: ''
    }
  },
  created() {},
  computed: {
    ...mapState(['authedUserId', 'userAuth'])
  },
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
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
}
p {
  font-size: 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

label {
  width: 100%;
  margin-bottom: 10px;
}

input {
  width: 100%;
  height: 50px;
  border: none;
  background: #fff;
  margin-bottom: 20px;
}

.btn-box {
  width: 100%;
}
button {
  width: 100%;
  height: 50px;
  font-size: 20px;
  background: #4d82cb;
  border-radius: 10px;
  padding: 5px 10px;
  color: #fff;
  &:last-child {
    margin-top: 10px;
    background: #9a9a9a;
  }
}
</style>
