<template>
  <section id="todo">
    <slot name="header">
      <h1>TODOS</h1>
    </slot>
    <section class="section-todos">
      <TodoInput></TodoInput>
      <TodoList :todos="todos"></TodoList>
    </section>
  </section>
</template>
<script>
import TodoInput from './TodoInput'
import TodoList from './TodoList'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('todos')

export default {
  name: 'Todo',
  data() {
    return {}
  },
  components: {
    // TodoHeader,
    TodoInput,
    TodoList
  },
  computed: {
    ...mapState(['todos'])
  },
  created() {
    this.loadTodos()
  },
  methods: {
    ...mapActions(['loadTodos'])
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 50px;
  padding: 50px 0;
  background: #4d82cb;
  color: #fff;
}
#todo {
  display: flex;
  flex-direction: column;
  position: relative;
  color: #000;
  min-height: 100vh;
  background: #fff;
  text-align: center;
  .section-todos {
    padding: 10px;
    flex: 1;
  }
}
</style>
