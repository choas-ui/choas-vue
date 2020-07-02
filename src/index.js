import Vue from 'vue'
import App from 'App'

const componentLib = {
    App
}

Object.keys(componentLib).forEach(key=>{
    Vue.component(key, componentLib[key])
})

export default choasUI
