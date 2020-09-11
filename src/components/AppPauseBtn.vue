<template>
  <button
    class="app-control"
    @click="pause"
  >
    <slot>
      Pause
    </slot>
  </button>
</template>

<script>
import { gsap } from 'gsap'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppPauseBtn',

  computed: {
    ...mapState({
      isAppPaused: (state) => state.isAppPaused
    }),

    appPauseState: {
      get() { return this.isAppPaused },
      set() { this.toggleAppPauseState() }
    }
  },

  methods: {
    ...mapMutations([
      'toggleAppPauseState'
    ]),

    pause() {
      gsap.globalTimeline[this.appPauseState ? 'play' : 'pause']();
      this.appPauseState = !this.appPauseState; 
    }
  }
}
</script>
