<template>
  <nav>
    <button><router-link to="/todo">Todos</router-link></button>
    <button><router-link to="/memo">Memo</router-link></button>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 10;
  button {
    width: 50%;
    height: 40px;
    font-family: 'Jua', sans-serif;
    font-size: 18px;
    a {
      display: block;
      background: #bbb;
      line-height: 40px;
      color: #fff;
      text-decoration: none;

      &.router-link-exact-active {
        background: #4c4c4c;
      }
    }
  }
}
</style>
