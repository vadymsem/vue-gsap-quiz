<template>
  <div
    class="start-page space-bg"
    ref="start"
  >
    <transition
      appear
      name="scaling"
    >
      <div class="app-card">
        <div>
          <h1>Intellectual Game</h1>

          <h3>"Get Sleep"</h3>
        </div>

        <form
          @submit="startGame"
          class="start-form"
        >
          <input
            v-model="playerName"
            type="text"
            id="name"
            class="app-input"
            placeholder="What is you name?"
          />

          <button
            :disabled="this.playerName.length < 2"
            type="submit"
            class="app-button"
          >
            Start
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { oldTvBlinking } from '../utils/animations'

export default {
  name: 'Start',

  data() {
    return {
      playerName: ''
    }
  },

  methods: {
    startGame(e) {
      e.preventDefault()
      this.$store.commit('setPlayerName', this.playerName)
      this.$router.push(`/question/${1}`)
    }
  },

  beforeRouteLeave(from, to, next) {
    const { start } = this.$refs

    oldTvBlinking(start).then(next)
  }
}
</script>


<style lang="scss" scoped>
  .scaling-enter-active {
    transition: all 1s;
  }
  
  .scaling-enter {
    transform: scale(0);
  }

  .start-page {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .app-card {
      width: 400px;
    }
  }

  .start-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
