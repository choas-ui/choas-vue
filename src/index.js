import Vue from 'vue'
import HelloWorld from './components/HelloWorld'

const componentLib = {
    HelloWorld
}

Object.keys(componentLib).forEach(key=>{
    Vue.component(key, componentLib[key])
})

export default choasUI
