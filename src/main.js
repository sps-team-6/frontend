import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
