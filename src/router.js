import Vue from 'vue'
import VueRouter from 'vue-router'

// import pages
import Start from './pages/Start.vue'
import Losing from './pages/Losing.vue'
import Question from './pages/Question.vue'
import Victory from './pages/Victory.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'start',
      path: '/',
      component: Start
    },
    {
      name: 'question',
      path: '/question',
      redirect: '/'
    },
    {
      name: 'question-id',
      path: '/question/:id',
      component: () => Promise.resolve(Question)
    },
    {
      name: 'losing',
      path: '/losing',
      component: () => Promise.resolve(Losing)
    },
    {
      name: 'victory',
      path: '/victory',
      component: () => Promise.resolve(Victory)
    }
  ]
})
