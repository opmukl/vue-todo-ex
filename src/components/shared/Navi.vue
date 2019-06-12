<template>
  <nav>
    <div class="center" v-if="userAuth">
      <router-link to="/todo" class="nav__todos">Todos</router-link>
      <router-link to="/memo" class="nav__memos">Memos</router-link>
    </div>
    <router-link
      to="/login"
      v-if="!userAuth"
      class="nav__login fa fa-sign-in-alt"
      ><span>login</span>
    </router-link>
    <router-link to="/" v-if="userAuth" class="nav__login fa fa-sign-out-alt">
      <span>logout</span>
    </router-link>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('auth')

export default {
  name: 'Login',
  data() {
    return {
      uid: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['userAuth'])
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 10;
  font-size: 0;
  background: #bbb;

  .center {
    max-width: 70%;
    margin: 0 auto;
  }

  .nav__todos,
  .nav__memos {
    display: inline-block;
    width: 50%;
    height: 50px;
    font-family: 'Hind Siliguri', 'Noto Sans KR', sans-serif;
    font-size: 18px;
    background: #bbb;
    line-height: 50px;
    color: #fff;
    text-decoration: none;

    &.router-link-exact-active {
      background: #4c4c4c;
    }
  }

  .nav__login {
    position: absolute;
    right: 2%;
    top: 5px;
    width: 40px;
    height: 40px;
    line-height: 34px;

    border-radius: 50%;
    border: 2px solid #fff;
    text-decoration: none;
    font-size: 18px;
    color: #fff;
    background: #9a9a9a;
    span {
      font-size: 0;
    }
  }
}
</style>
