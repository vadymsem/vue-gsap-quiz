<template>
  <div
    class="f-flex"
    ref="container"
  >
    <div
      v-for="dot in 100"
      :key="dot"
      class="dot"
      ref="dot"
    />

    <div class="congrats">
      <h1>Congratulations!</h1>
    
      <br />

      <span class="app-emoji">
        🎉
      </span>
    </div>
  </div>
</template>

<script>
import { confetti } from '../utils/animations'

export default {
  name: 'Victory',

  mounted() {
    const { dot, container } = this.$refs
    dot.forEach(element => confetti(element, container.clientWidth, container.clientHeight))
  }
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
    overflow: hidden;
  }

  .congrats {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>