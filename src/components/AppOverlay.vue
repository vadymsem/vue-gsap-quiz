<template>
  <div class="app-overlay">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppOverlay'
}
</script>

<style lang="scss">
  .app-overlay {
    z-index: 2147483647;
    min-width: 100vw;
    width: 100vw;
    min-height: 100vh;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0, .75);
  }
</style>