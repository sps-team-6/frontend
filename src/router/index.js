import Vue from 'vue'
import VueRouter from 'vue-router'
import Lobby from '../views/Lobby.vue'
import Login from '../views/Login.vue'
import ClickingGame from '../components/clickinggame/ClickingGame.vue'
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
    path: '/lobby/:userToken',
    name: 'lobby',
    component: Lobby,
    props: true
  },
  {
    path: '/typing/:userToken/:roomNo',
    name: 'Typing',
    component: TypingGame,
    // When props is set to true, the route.params will be set as the component props.
    props: true
  },
  {
    path: '/clicking/:userToken/:roomNo',
    name: 'ClickingGame',
    component: ClickingGame,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
