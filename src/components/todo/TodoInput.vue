<template>
  <div>
    <form class="ui form" @submit.prevent="onSubmit">
      <input
        type="text"
        name="todo"
        placeholder="할일을 입력해주세요"
        v-validate="'required'"
        v-model="newTodo"
      />
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('todos')

export default {
  name: 'TodoInput',
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    ...mapActions(['addTodo']),
    addTD() {
      // this.$store.dispatch('todos/addTodo', this.newTodo)
      this.addTodo(this.newTodo)
      this.newTodo = ''
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          alert('내용을 입력해주세요.')
          return
        }
        this.addTD()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
input[type='text'] {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  font-family: 'Hind Siliguri', 'Noto Sans KR', sans-serif;
  font-size: 25px;
  border: 0;
  border-bottom: 2px dashed #9e9e9e;
}
</style>