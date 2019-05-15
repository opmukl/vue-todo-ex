<template>
  <div class="pop" :class="{ on: state.popup.isActive }">
    <div class="pop-inner">
      <button type="button" class="btn--close" @click="closeMemo()">
        <i class="fa fa-times solid"></i>
      </button>
      <textarea v-model="popup.text"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['popup', 'memo'],
  methods: {
    openMemo(id, text) {
      // console.log(text)
      this.popup.isActive = true
      this.popup.text = text
      this.updateMemo(text)
    },
    closeMemo() {
      this.popup.isActive = false
      this.popup.text = ''
    }
  }
}
</script>
