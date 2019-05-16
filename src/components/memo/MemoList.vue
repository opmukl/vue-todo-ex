<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :col-num="6"
      :row-height="50"
      :is-draggable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      :autoSize="true"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item
        v-for="(memo, index) in layout"
        :key="index"
        :x="memo.x"
        :y="memo.y"
        :w="memo.w"
        :h="memo.h"
        :i="memo.i"
        @move="test()"
        v-show="popup.id != memo.id"
      >
        <p v-html="memo.text" @click="openMemo(memo.id, memo.text)"></p>
      </grid-item>
    </grid-layout>

    <memoPop :popup="popup" @close="closeMemo()"></memoPop>
  </div>
</template>

<script>
import memoPop from './MemoPop'
import VueGridLayout from 'vue-grid-layout'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('memos')

export default {
  data() {
    return {
      isMoving: false,
      popup: {
        id: {
          type: Number
        },
        text: '',
        isActive: false
      }
      // layout: []
    }
  },
  components: {
    memoPop,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  computed: {
    ...mapState({
      layout: 'memos'
    })
  },
  methods: {
    test() {
      console.log('111')
    },
    openMemo(id, text) {
      if (!this.isMoving) {
        console.log(id + '/////' + text)
        this.popup.id = id
        this.popup.isActive = true
        this.popup.text = text
      }

      // const memo = { id: id, text: text }
      // this.updateMemo(memo)
    },
    closeMemo() {
      this.popup = {
        id: '',
        text: '',
        isActive: false
      }
    },
    layoutUpdatedEvent(newLayout) {
      console.log('Updated layout: ', newLayout)
      // this.updateLayout(newLayout)
      this.isMoving = true
      setTimeout(() => {
        this.isMoving = false
      }, 500)
    },
    ...mapActions(['updateLayout'])
  }
}
</script>

<style lang="scss" scoped>
.vue-grid-item {
  background: #fff;
  p {
    padding: 15px;
    width: 100%;
    word-break: break-all;
    white-space: pre-line;
    line-height: 20px;
  }
}
</style>

