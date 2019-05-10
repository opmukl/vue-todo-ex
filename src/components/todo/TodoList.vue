<template>
  <div>
    <aside>
      <p class="have-todo" v-if="this.$store.getters.countHaveTodos > 0">
        해야하는 일 : {{ this.$store.getters.countHaveTodos }} 개
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
      v-if="this.$store.state.todos.length > 0"
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
    <p class="have-todo" v-else>새로운 할일을 입력해주세요</p>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import TodoItem from './TodoItem'
import { mapActions } from 'vuex'

export default {
  name: 'TodoList',
  props: ['todos'],
  components: {
    TodoItem,
    draggable
  },
  computed: {
    listTodos: {
      get() {
        return this.$store.state.todos
      },
      set(todos) {
        console.log(todos)
        this.$store.dispatch('updateTodoList', todos)
      }
    }
  },
  methods: {
    changeDrag() {
      console.log(this.todos)
    },
    ...mapActions(['deleteDoneTodos'])
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