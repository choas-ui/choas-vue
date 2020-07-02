import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ChoasUI from "./lib";
import router from './router'
Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.use(ChoasUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
