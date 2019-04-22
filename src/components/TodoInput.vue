<template>
  <div>
    <form class="ui form" @submit.prevent="onSubmit">
      <input
        type="text"
        name="todo"
        placeholder="할일을 입력해주세요"
        v-validate="'required'"
        v-model="newTodo"
      >
    </form>
  </div>
</template>

<script>
export default {
  name: 'TodoInput',
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    addTodo() {
      this.$store.dispatch('addTodo', this.newTodo)
      this.newTodo = ''
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          alert('내용을 입력해주세요.')
          return
        }
        this.addTodo()
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
  font-family: 'Jua', sans-serif;
  font-size: 25px;
  border: 0;
  border-bottom: 2px dashed #9e9e9e;
}
</style>