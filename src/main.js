import Vue from 'vue'
import App from './App.vue'
import choasUI from './lib'

Vue.config.productionTip = false
Vue.use(choasUI)


new Vue({
  render: h => h(App),
}).$mount('#app')
