<template>
  <div>
    <form class="ui form">
      <textarea v-model="newText" @blur="addMemo(newText)"></textarea>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('memos')

export default {
  name: 'TodoInput',
  data() {
    return {
      newText: ''
    }
  },
  methods: {
    test() {
      console.log(this.newText)
    },
    ...mapActions(['addMemo'])
  }
}
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  font-family: 'Hind Siliguri', 'Noto Sans KR', sans-serif;
  font-size: 25px;
  border: 0;
  border-bottom: 2px dashed #9e9e9e;
}
</style>