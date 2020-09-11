<template>
  <h1
    class="question"
  >
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: 'QuestionTile',

  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .question {
    position: relative;
    margin: 0 auto;
    font-size: 50px;
    letter-spacing: 1px;
    text-shadow: 0px 10px 20px rgba(0, 0, 0 , .6);
    font-weight: 100;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    visibility: hidden;
  }
</style>