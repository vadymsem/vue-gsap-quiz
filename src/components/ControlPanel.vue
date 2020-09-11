<template>
  <div>
    <button @click="pause">
      Pause
    </button>
    
    <button @click="toStart">
      Exit
    </button>
  </div>
</template>

<script>
export default {
  name: 'ControlPanel',

  methods: {
    toStart() {
      this.$router.push('/')
    }
  }
}
</script>