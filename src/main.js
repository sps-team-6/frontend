import Vue from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
=======
import vuetify from './plugins/vuetify';
>>>>>>> master

Vue.config.productionTip = false

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
