<template>
  <textarea
    rows="1"
    placeholder="메모를 입력해주세요."
    v-model="newText"
    @blur="addMemo(newText)"
    @input="resizeTextarea($event)"
  ></textarea>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { textareaResize } from '../mixins/textareaResize'
const { mapActions } = createNamespacedHelpers('memos')

export default {
  name: 'TodoInput',
  mixins: [textareaResize],
  data() {
    return {
      newText: ''
    }
  },
  methods: {
    ...mapActions(['addMemo'])
  }
}
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  height: 60px;
  padding: 20px;
  font-family: 'Hind Siliguri', 'Noto Sans KR', sans-serif;
  font-size: 20px;
  border: 0;
  border-bottom: 2px dashed #9e9e9e;
}
</style>