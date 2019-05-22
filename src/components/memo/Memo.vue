<template>
  <div>
    <slot name="header">
      <h1>MEMOS</h1>
    </slot>
    <memoInput></memoInput>
    <memoList :memos="memos"></memoList>
  </div>
</template>

<script>
import memoInput from './MemoInput'
import memoList from './MemoList'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('memos')

export default {
  name: 'memo',
  data() {
    return {}
  },
  components: {
    memoInput,
    memoList
  },
  computed: {
    ...mapState(['memos', 'staticMemos'])
  },
  created() {
    this.loadMemos()
  },
  methods: {
    ...mapActions(['loadMemos'])
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 50px;
  padding: 50px 0;
  background: #4d82cb;
  color: #fff;
  text-align: center;
}
</style>
