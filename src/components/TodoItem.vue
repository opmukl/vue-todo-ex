<template>
  <div>
    <label>
      <!-- updateDoneState를 get()/set()을 통해 하는 방법도 있을 것 같다 -->
      <input
        type="checkbox"
        class="chk__todo-state"
        :checked="todo.done"
        @change="updateTodo({
          id: todo.id,
          done: !todo.done
        })"
      >
      <span :class="{'on':todo.done}" v-show="!this.editing">{{todo.text}}</span>
      <input
        class="input__edit-todo"
        autofocus
        type="text"
        v-model="editedText"
        v-show="this.editing"
        ref="editTodo"
        @keyup.enter="$refs.editTodo.blur()"
        @blur="
          editing = false;
          updateTodo({
            id: todo.id,
            text: editedText
          })"
      >
    </label>
    <div>
      <button type="button" @click="editTodo()" v-show="!todo.done">
        <i class="fa fa-edit solid"></i>
      </button>
      <button type="button" @click="deleteTodo(todo.id)">
        <i class="fa fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  data() {
    return {
      editedText: '',
      editing: false
    }
  },
  props: ['todo', 'index'],
  created() {},
  computed: {},
  methods: {
    editTodo() {
      this.editing = true
      this.editedText = this.todo.text
      this.$nextTick(() => this.$refs.editTodo.focus())
    },

    // updateTodo() {
    //   this.editing = false
    //   this.updateTodo({
    //     id: this.todo.id,
    //     text: this.editedText
    //   })
    // },

    ...mapActions(['updateTodo', 'deleteTodo'])
  }
}
</script>

<style lang="scss" scoped>
label {
  // flex: auto;
  line-height: 25px;
}
button {
  border: 0;
  background: 0;
  font-size: 20px;
  margin-left: 10px;
}
.chk__todo-state {
  margin-right: 10px;
}
span {
  display: inline-block;
  &.on {
    text-decoration: line-through;
    color: #bbb;
  }
}
.input__edit-todo {
  font-family: 'Jua', sans-serif;
  font-size: 20px;
  text-align: left;
  color: #3e3e3e;
}
</style>