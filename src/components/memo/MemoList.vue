<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :col-num="6"
      :row-height="50"
      :is-draggable="true"
      :vertical-compact="true"
      :margin="[20, 20]"
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
        :static="memo.static"
        v-show="popup.id != memo.id"
      >
        <p v-html="memo.text" @click="openMemo(memo)"></p>
        <aside>
          <button class="btn-static" @click="switchStatic(memo)">
            <i class="fa fa-thumbtack" :class="{ static: memo.static }"></i>
          </button>
          <button @click="deleteMemo(memo.id)">
            <i class="fa fa-trash-alt"></i>
          </button>
        </aside>
      </grid-item>
    </grid-layout>

    <memoPop :popup="popup" @close="closeMemo()"></memoPop>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import memoPop from './MemoPop'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('memos')

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
    openMemo({ id, text, date }) {
      if (!this.isMoving) {
        this.popup = {
          id: id,
          text: text,
          date: date,
          isActive: true
        }
      }
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
    ...mapActions(['switchStatic', 'deleteMemo', 'updateLayout'])
  }
}
</script>

<style lang="scss" scoped>
.vue-grid-item {
  padding: 15px;
  background: #fff;
  box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.2);
  p {
    width: 100%;
    height: 100%;
    overflow: hidden;
    word-break: break-all;
    white-space: pre-line;
    line-height: 22px;
  }

  aside {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    padding: 10px 20px;
    justify-content: space-between;
    border-top: 1px solid #bdbdbd;
    .btn-static {
      i {
        transform: rotate(45deg);
        &.static {
          transform: rotate(0deg);
        }
      }
    }
  }
}
</style>

