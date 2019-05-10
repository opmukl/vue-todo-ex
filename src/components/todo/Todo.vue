<template>
  <section id="todo">
    <TodoHeader></TodoHeader>

    <section class="section-todos">
      <TodoInput></TodoInput>
      <TodoList :todos="todos"></TodoList>
    </section>
    <TodoFooter></TodoFooter>
  </section>
</template>
<script>
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'

import { mapState } from 'vuex'

export default {
  name: 'Todo',
  data() {
    return {}
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },
  computed: mapState({
    todos: state => state.todos
  }),
  created() {
    this.$store.dispatch('loadTodos')
  }
}
</script>

<style lang="scss" scoped>
#todo {
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: 'Jua', sans-serif;
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
