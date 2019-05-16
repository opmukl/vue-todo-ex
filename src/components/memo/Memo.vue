<template>
  <div>
    <memoInput></memoInput>
    <memoList :memos="memos"></memoList>
  </div>
</template>

<script>
import memoInput from './MemoInput'
import memoList from './MemoList'
// import { mapActions } from 'vuex';

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
    ...mapState(['memos'])
  },
  created() {
    this.loadMemos()
  },
  methods: {
    ...mapActions(['loadMemos'])
  }
}
</script>

