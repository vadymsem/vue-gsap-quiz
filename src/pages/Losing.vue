<template>
  <div class="f-flex">
    <h1>You lose!</h1>

    <span class="app-emoji">
      😩
    </span>

    <router-link
      to="/question/1"
      class="app-link"
    >
      Try again
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Losing'
}
</script>

<style lang="scss" scoped>
  .f-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
</style>