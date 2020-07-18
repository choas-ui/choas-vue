import Vue from 'vue'
import App from './App.vue'
import ChoasUI from 'choas-vue'
Vue.config.productionTip = false
Vue.use(ChoasUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
