<template>
  <div>
    <aside>
      <p class="have-todo" v-if="this.countHaveTodos > 0">
        해야하는 일 :
        <span v-text="this.countHaveTodos"></span> 개
      </p>
      <p class="have-todo" v-else>-</p>
      <button @click="deleteDoneTodos">완료 된 할일 전체 삭제하기</button>
    </aside>
    <draggable
      @end="drag = false"
      @start="drag = true"
      :sortable="true"
      class="todo-list"
      group="todos"
      v-model="listTodos"
    >
      <transition-group>
        <TodoItem
          :index="index"
          :key="todo.id"
          :todo="todo"
          class="todo-item"
          v-for="(todo, index) in todos"
        ></TodoItem>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import TodoItem from './TodoItem'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('todos')

export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array
    }
  },
  components: {
    TodoItem,
    draggable
  },
  computed: {
    ...mapGetters(['countHaveTodos']),
    listTodos: {
      get() {
        return this.$store.state.todos.todos
      },
      set(todos) {
        this.updateTodoList(todos)
      }
    }
  },
  methods: {
    ...mapActions(['deleteDoneTodos', 'updateTodoList'])
  }
}
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 10px 20px;

  .have-todo {
    font-size: 20px;
    text-align: right;
  }

  button {
    font-family: 'Jua', sans-serif;
    font-size: 20px;
    background: #4d82cb;
    border-radius: 10px;
    padding: 5px 10px;
    color: #fff;
  }
}

.todo-list {
  padding: 0 20px 50px;

  .todo-item {
    display: flex;
    height: 50px;
    padding: 10px 0;
    font-size: 20px;
    text-align: left;
    color: #3e3e3e;
    border-bottom: 1px dashed #9e9e9e;

    justify-content: space-between;
    align-items: center;
    // list-style: disc;
    // list-style-position: inside;
  }
}
</style>