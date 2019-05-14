<template>
  <div id="app">
    <Navi></Navi>
    <!-- 루트 컴포넌트인 App.vue에 라우터 뷰 추가 -->
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navi from '@/components/shared/Navi.vue'
import Footer from '@/components/shared/Footer'

export default {
  name: 'app',
  components: {
    Navi,
    Footer
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR|Hind+Siliguri');
html,
body {
  background: #e1e2e1;
  width: 100%;
  position: relative;
}
* {
  box-sizing: border-box;
}
button {
  border: 0;
  padding: 0;
  background: none;
}

#app {
  width: 50%;
  min-width: 500px;
  max-width: 800px;
  margin: 0 auto;
}

// nav {
//   position: sticky;
//   top: 0;
//   left: 0;
//   text-align: center;
//   z-index: 10;
//   button {
//     width: 50%;
//     height: 40px;
//     font-family: 'Noto Sans KR', sans-serif;
//     font-size: 18px;
//     a {
//       display: block;
//       background: #bbb;
//       line-height: 40px;
//       color: #fff;
//       text-decoration: none;

//       &.router-link-exact-active {
//         background: #4c4c4c;
//       }
//     }
//   }
// }
</style>
