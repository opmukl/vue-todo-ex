<template>
  <section class="memo-list">
    <grid-layout
      :layout.sync="layout"
      :col-num="3"
      :row-height="50"
      :is-draggable="true"
      :is-resizable="false"
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
          <button
            type="button"
            class="btn btn-static"
            @click="switchStatic(memo)"
          >
            <i class="fa fa-thumbtack" :class="{ static: memo.static }"></i
            >고정하기
          </button>
          <button type="button" class="btn" @mouseover="showPalette($event)">
            <i class="fa fa-palette"></i>색깔선택
          </button>
          <button type="button" class="btn" @click="deleteMemo(memo.id)">
            <i class="fa fa-trash-alt"></i>
            삭제하기
          </button>
        </aside>
      </grid-item>
    </grid-layout>
    <div class="color-palette" ref="colorPalette">
      <button type="button" class="">색상1</button>
      <button type="button" class="">색상2</button>
      <button type="button" class="">색상3</button>
      <button type="button" class="">색상4</button>
      <button type="button" class="">색상5</button>
      <button type="button" class="">색상6</button>
    </div>
    <memoPop :popup="popup" @close="closeMemo()"></memoPop>
  </section>
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
    showPalette(e) {
      console.log(e)
      $(this.$refs.colorPalette)
        .fadeIn()
        .css({
          left: e.pageX,
          top: e.pageY
        })
    },
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
    layoutUpdatedEvent(memos) {
      // console.log('Updated layout: ', newLayout)
      this.updateLayout(memos)

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
.memo-list {
  position: relative;
  min-height: calc(100vh - 43px - 72px - 40px);
}
.vue-grid-item {
  padding: 15px;
  background: #fff;
  box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.2);
  p {
    width: 100%;
    height: calc(100% - 36px);
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

    .btn {
      font-size: 0;
      i {
        font-size: 14px;
      }
      &-static {
        i {
          transform: rotate(45deg);
          &.static {
            transform: rotate(0deg);
          }
        }
      }
    }
  }
}

.color-palette {
  display: none;
  position: absolute;
  left: 50%;
  bottom: 30px;
  width: 82px;
  padding: 5px;
  background: #fff;
  box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  button {
    background: #ddd;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    font-size: 0;
    margin: 2px;
  }
}
</style>

