<template>
  <div class="modal-backdrop" :class="{ on: this.popup.isActive }">
    <div class="modal" :class="{ on: this.popup.isActive }">
      <button type="button" class="btn--close" @click="$emit('close')">
        <i class="fa fa-times solid"></i>
      </button>
      <textarea
        v-model="newText"
        @blur="
          updateMemo({
            id: popup.id,
            text: newText
          })
        "
      ></textarea>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('memos')

export default {
  props: ['popup'],
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
  methods: {
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
    // transform: scale(0);
    // transition: all 0.2s ease-in-out;
    &.on {
      width: 100%;
      height: 100%;
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s;
      // transform: scale(1);
      // transition: all 0.2s ease-in-out;
    }
  }

  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  min-width: 500px;
  padding: 5%;
  min-height: 50%;
  max-height: 90%;
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
    height: auto;
    border: none;
    outline: none;
    font-size: 20px;
  }

  .btn--close {
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: 30px;
  }
}
</style>
