import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ClickingGame from '../views/ClickingGame.vue'
import ClickingGame from '../views/ClickingGame.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: "/",
    name: "Login",
    component: Login
  }
  path: '/typing',
    name: 'Typing',
    component: () => import(/* webpackChunkName: "typing" */ '../components/TypingGame/TypingGame.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/clicking-game',
    name: 'ClickingGame',
    component: ClickingGame
  },
    path: '/typing',
    name: 'Typing',
    component: () => import(/* webpackChunkName: "typing" */ '../components/TypingGame/TypingGame.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/clicking-game',
    name: 'ClickingGame',
    component: ClickingGame
  },
]

const router = new VueRouter({
  routes
})

export default router
