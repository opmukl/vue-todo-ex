<template>
  <nav>
    <router-link to="/login" class="nav__icon fa fa-home">
      <span>home</span>
    </router-link>
    <div class="center" v-if="userAuth">
      <router-link to="/todo" class="nav__todos">Todos</router-link>
      <router-link to="/memo" class="nav__memos">Memos</router-link>
    </div>
    <router-link
      to="/login"
      v-if="!userAuth"
      class="nav__icon fa fa-sign-in-alt"
      ><span>login</span>
    </router-link>
    <button
      type="button"
      @click="logout"
      v-if="userAuth"
      class="nav__icon fa fa-sign-out-alt"
    >
      <span>logout</span>
    </button>
  </nav>
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
  computed: {
    ...mapState(['userAuth'])
  },
  created() {},
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  height: 50px;
  text-align: center;
  z-index: 10;
  font-size: 0;
  background: #bbb;
  justify-content: space-between;

  .center {
    width: 70%;
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

  .nav__icon {
    width: 40px;
    height: 40px;
    margin: 5px 10px 0;
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
