import Vue from 'vue'
import HelloWorld from './lib/TreeModal/TreeModal'

const componentLib = {
    HelloWorld
}

Object.keys(componentLib).forEach(key=>{
    Vue.component(key, componentLib[key])
})

export default choasUI
