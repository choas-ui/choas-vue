import Vue from 'vue'
import HelloWorld from './lib/HelloWorld/HelloWorld'

const componentLib = {
    HelloWorld
}

Object.keys(componentLib).forEach(key=>{
    Vue.component(key, componentLib[key])
})

export default choasUI
