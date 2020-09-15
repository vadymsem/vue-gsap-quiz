<template>
  <div
    class="answer"
    :class="{
      'inactive': !isActive,
      'checked': isChecked
    }"
    @click="checkAnswer"
  >
    <h3>{{ text }}</h3>
  </div>
</template>

<script>
export default {
  name: 'AnswerTile',

  props: {
    text: {
      type: [String, Number],
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    checkAnswer() {
      this.$emit('check-answer')
    }
  }
}
</script>

<style lang="scss" scoped>
  .answer {
    padding: 30px;
    background-color: rgba(255, 255, 255, .1);
    cursor: pointer;
    border-radius: 10px;
    transition: .3s;
    visibility: hidden;
    border: 2px solid transparent;

    &:hover {
      background-color: rgba(255, 255, 255, .2);
      transition: .3s;
    }

    &.checked {
      box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
      pointer-events: none;
    }

    &.inactive {
      background-color: rgba(0, 0, 0, .5);
      pointer-events: none;
      opacity: .2;
    }

    &.error {
      background-color: rgb(179, 45, 45);
      pointer-events: none;
    }

    &.success {
      background-color: rgb(179, 255, 155);
      pointer-events: none;
    }
  }
</style>