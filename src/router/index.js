import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ClickingGame from '../views/ClickingGame.vue'
import TypingGame from '../components/TypingGame/TypingGame.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    name: "Login",
    components: {
      // https://router.vuejs.org/guide/essentials/named-views.html
      default: Login
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/typing',
    name: 'Typing',
    component: TypingGame
  },
  {
    path: '/clicking-game',
    name: 'ClickingGame',
    component: ClickingGame
  }
]

const router = new VueRouter({
  routes
})

export default router
