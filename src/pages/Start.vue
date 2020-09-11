<template>
  <div
    class="start-page space-bg"
    ref="start"
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
  </div>
</template>

<script>
import { animateOldTV } from '../utils/animations'

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

    animateOldTV(start).then(next)
  }
}
</script>


<style lang="scss" scoped>
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
