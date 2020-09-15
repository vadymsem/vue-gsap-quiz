<template>
  <div class="question-page space-bg">
    <!-- Control panel -->
    <div
      ref="control"
      class="control-panel"
    >
      <button
        class="app-control restart-btn"
        @click="restartQuiz"
      >
        ↺
      </button>

      <app-pause-btn>
        ❚❚
      </app-pause-btn>
    </div>


    <!-- Overlay -->
    <app-overlay
      v-if="isAppPaused"
      class="pause-overlay"
    >
      <app-pause-btn>
        ▶
      </app-pause-btn>
    </app-overlay>

    <!-- Quiz -->
    <div>
      <question-tile
        :text="question.text"
        class="question-tile"
        ref="question"
      />

      <div class="grid-container">
        <answer-tile
          v-for="(option, index) in answer.options"
          :key="option"
          :text="option"
          :ref="`answer__${index}`"
          :is-active="!isAnswerSelected || selectedOptionIndex === index"
          :is-checked="isAnswerSelected && selectedOptionIndex === index"
          @check-answer="checkOption(option, answer)"
        />
      </div>
    </div>
  </div>
</template>

<script>
// vuex
import { mapState } from 'vuex'

// components
import AppPauseBtn from '../components/AppPauseBtn'
import AnswerTile from '../components/AnswerTile'
import AppOverlay from '../components/AppOverlay'
import QuestionTile from '../components/QuestionTile'

import { 
  textTyping,
  scaleIn,
  scaleOut,
  appearToLeft,
  dissolveText,
  flicker,
  hideToRight
} from '../utils/animations'

export default {
  name: 'Question',

  components: {
    AppPauseBtn,
    AppOverlay,
    AnswerTile,
    QuestionTile
  },

  data() {
    return {
      isAnswerSelected: false,
      selectedOptionIndex: null
    }
  },

  computed: {
    ...mapState({
      answers: (state) => state.answers,
      isAppPaused: (state) => state.isAppPaused,
      questions: (state) => state.questions,
    }),

    answer() {
      return this.answers.find(answer => answer.id === this.question.id)
    },

    answerId() {
      return Number(this.$route.params.id)
    },

    answerDomElements() {
      return Object.keys(this.$refs)
        .filter(ref => ref.includes('answer'))
        .map(vcomponent => this.$refs[vcomponent])
        .map(node => node[0].$el)
    },

    question() {
      return this.questions[this.answerId - 1]
    }
  },

  mounted() {
    const { control, question } = this.$refs

    appearToLeft(control)
      .then(() => {
        textTyping(question.$el)
          .then(() => {
            scaleIn(this.answerDomElements)
          })
      })
  },

  methods: {
    checkOption(option, answer) {
      const isAnswerTruthly = answer.options[answer.trulyIndex] === option
      this.isAnswerSelected = true
      this.selectedOptionIndex = answer.options.indexOf(option)

      this.playCheckedAnswerAnimation()
        .then(() => {
          isAnswerTruthly
            ? this.nextQuestion()
            : this.toLosePage()
        })
    },

    nextQuestion() {
      if (this.answers.length === this.answerId) {
        this.toWinPage()
      } else {
        this.$router.push(`/question/${this.answerId + 1}`)
      }
    },

    toLosePage() {
      this.$router.push('/losing')
    },

    toWinPage() {
      this.$router.push('/victory')
    },

    restartQuiz() {
      const ifAgree = confirm('Are you sure you want to restart?');

      ifAgree && this.$router.replace('/')
    },

    playCheckedAnswerAnimation() {
      const selectedOptionRef = `answer__${this.selectedOptionIndex}`
      const rightOptionRef = `answer__${this.answer.trulyIndex}`
      let animations = []

      if (this.answer.trulyIndex === this.selectedOptionIndex) {
        // selected the right option
        animations = [ flicker(this.$refs[selectedOptionRef][0].$el, 3, 1, 'green') ]
      } else {
        // selected the wrong option
        animations = [
          flicker(this.$refs[rightOptionRef][0].$el, 3, 1, 'green'),
          flicker(this.$refs[selectedOptionRef][0].$el, 3, 1, 'red')
        ]
      }

      return Promise.all(animations)
    },

    playPageOutro(cb) {
      const { control, question } = this.$refs

      Promise.all([
        scaleOut(this.answerDomElements),
        dissolveText(question.$el),
        hideToRight(control)
      ])
      .then(cb)
    }
  },

  beforeRouteUpdate(from, to, next) {
    this.playPageOutro(next)
  },

  beforeRouteLeave(from, to, next) {
    this.playPageOutro(next)
  }
}
</script>


<style lang="scss" scoped>
  .question-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    padding: 50px 50px 0 50px;

    .control-panel {
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      opacity: 0;

      .restart-btn {
        font-size: 72px;
      }

      > * {
        margin: 10px;
      }
    }

    .pause-overlay {
      > button {
        font-size: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-shadow: 0 0 100px #3faade;
      }
    }

    .question-tile {
      margin-bottom: 100px;
    }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 50px;
      grid-template-areas: ". ."
    }
  }
</style>