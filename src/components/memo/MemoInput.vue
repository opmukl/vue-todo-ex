<template>
  <textarea
    ref="memoTextarea"
    rows="1"
    placeholder="메모를 입력해주세요."
    v-model="newText"
    @blur="validateMemo"
    v-validate="'required'"
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
    validateMemo() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          alert('내용을 입력해주세요.')
          return
        }
        this.addMemo(this.newText)
        this.newText = ''
      })
    },
    ...mapActions(['addMemo'])
  },
  directives: {
    focus: {
      // 디렉티브 정의
      inserted(el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  position: sticky;
  top: 40px;
  width: 100%;
  height: 60px;
  padding: 20px;
  font-family: 'Hind Siliguri', 'Noto Sans KR', sans-serif;
  font-size: 20px;
  border: 0;
  border-bottom: 2px dashed #9e9e9e;
  resize: none;
  z-index: 10;
}
</style>