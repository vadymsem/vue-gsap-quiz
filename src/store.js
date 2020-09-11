import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAppPaused: false,
    playerName: '',
    questions: [{
      id: 1,
      text: 'Inside which HTML element do we put the JavaScript?'
      }, {
        id: 2,
        text: 'How do you write "Hello World" in an alert box?'
      }, {
        id: 3,
        text: 'How do you create a function in JavaScript?'
      }
    ],
    answers: [{
        id: 1,
        options: ['<javascript>', '<scripting>', '<script>', '<js>'],
        trulyIndex: 2
      }, {
        id: 2,
        options: ['msgBox("Hello World")', 'alert("Hello World")', 'msg("Hello World")', 'alertBox("Hello World")'],
        trulyIndex: 1
      }, {
        id: 3,
        options: ['function = myFunction()', 'function:myFunction()', 'function myFunction()', 'var function = myFunction()'],
        trulyIndex: 2
      }
    ]
  },

  mutations: {
    toggleAppPauseState(state) {
      state.isAppPaused = !state.isAppPaused
    },

    setPlayerName(state, value) {
      state.playerName = value
    }
  }
})
