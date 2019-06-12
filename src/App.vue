<template>
  <div id="app">
    <Navi></Navi>
    <router-view class="content">
      <template v-slot:header></template>
    </router-view>
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
  width: 100%;
  min-width: 500px;
  // max-width: 800px;
  margin: 0 auto;
  font-family: 'Hind Siliguri', 'Noto Sans KR', sans-serif;

  display: flex;
  min-height: 100vh;
  flex-direction: column;

  .content {
    flex: 1;
  }
}

label,
input,
button,
textarea {
  font-family: 'Hind Siliguri', 'Noto Sans KR', sans-serif;
}
</style>
