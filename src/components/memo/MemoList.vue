<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :col-num="6"
      :row-height="30"
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
        @move.prevent="test()"
      >
        <p v-html="memo.text" @click="openMemo(memo.id, memo.text)"></p>
      </grid-item>
    </grid-layout>

    <div class="pop" :class="{ on: popup.isActive }">
      <div class="pop-inner">
        <button type="button" class="btn--close" @click="closeMemo()">
          <i class="fa fa-times solid"></i>
        </button>
        <textarea v-model="popup.text"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('memos')

export default {
  el: '#memo',
  data() {
    return {
      popup: {
        id: '',
        text: '',
        isActive: false
      }
      // layout: []
    }
  },
  components: {
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
      // console.log(text)
      this.popup.isActive = true
      this.popup.text = text
      this.updateMemo(text)
    },
    closeMemo() {
      this.popup.isActive = false
      this.popup.text = ''
    },
    layoutUpdatedEvent: function(newLayout) {
      console.log('Updated layout: ', newLayout)
      // this.updateLayout(newLayout)
    },
    ...mapActions(['updateMemo', 'updateLayout'])
  }
}
</script>

<style lang="scss" scoped>
.vue-grid-item {
  background: #fff;
  & > div {
    width: 100%;
    // height: 100%;
    border: 1px solid red;
  }
  p {
    padding: 10%;
    width: 100%;
    word-break: break-all;
    white-space: pre-line;
  }
}

.pop {
  display: none;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  &.on {
    display: block;
  }
  &-inner {
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 500px;

    width: 40%;

    padding: 5%;
    min-height: 50%;
    max-height: 90%;
    background: #fff;
    transform: translate(-50%, -50%);
  }

  .btn--close {
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: 30px;
  }
}
</style>

