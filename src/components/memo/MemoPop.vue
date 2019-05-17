<template>
  <div
    class="modal-backdrop"
    :class="{ on: this.popup.isActive }"
    @click.self="$emit('close')"
  >
    <div class="modal" :class="{ on: this.popup.isActive }">
      <button type="button" class="btn--close" @click="$emit('close')">
        <i class="fa fa-times solid"></i>
      </button>
      <textarea
        ref="memoTextarea"
        v-model="newText"
        @blur="validateMemo"
        v-validate="'required'"
      ></textarea>
      <aside>
        수정된 시간: <time>{{ popup.date | tranlateDate }}</time>
      </aside>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
import { textareaResize } from '../mixins/textareaResize'

const { mapActions } = createNamespacedHelpers('memos')

export default {
  props: ['popup'],
  mixins: [textareaResize],
  data() {
    return {
      newText: ''
    }
  },
  computed: {
    text() {
      return this.popup.text
    }
  },
  watch: {
    text() {
      this.newText = this.popup.text
    }
  },
  filters: {
    tranlateDate(data) {
      return moment(data).format('YYYY-MM-DD, h:mm:ss a')
    }
  },
  methods: {
    validateMemo() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          alert('내용을 입력해주세요.')
          return
        }
        this.updateMemo({
          id: this.popup.id,
          text: this.newText,
          date: new Date()
        })
      })
    },
    close() {
      this.$emit('close')
    },
    ...mapActions(['updateMemo', 'updateLayout'])
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &-backdrop {
    visibility: hidden;
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    opacity: 0;
    transition: opacity 0.5s;
    &.on {
      width: 100%;
      height: 100%;
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s;
    }
  }

  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  min-width: 500px;
  height: 50%;
  // min-height: 50%;
  // max-height: 90%;
  padding: 5%;
  background: #fff;
  transform: scale(0) translate(-50%, -50%);
  transform-origin: center center;
  transition: all 0.2s ease-in-out;
  &.on {
    transform: scale(1) translate(-50%, -50%);
    transition: all 0.2s ease-in-out;
  }

  textarea {
    width: 100%;
    height: 90% !important;
    border: none;
    outline: none;
    font-size: 20px;
    resize: none;
    overflow-y: auto !important;
  }

  .btn--close {
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: 30px;
  }

  aside {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 14px;
    color: #4c4c4c;
  }
}
</style>
