#### 说明
---
组件库尚在完善中，api调整的随时可能调整，请谨慎使用。

#### 下载
---
    npm i -D choas-vue
    cnpm i -D choas-vue
    yarn add -D choas-vue

#### 使用
---
    import Vue from 'vue'
    import App from './App.vue'
    import ChoasUI from './lib'
    Vue.config.productionTip = false
    Vue.use(ChoasUI)
    new Vue({
      render: h => h(App),
    }).$mount('#app')

####  示例
::: demo
```html
<template>
  <div id="app">
    <Button @click="greeting"></Button>
  </div>
</template>
<script>
export default {
    methods: {
        greeting(){
            alert("Hello world!");
        }       
    }   
}
</script>
```
:::

#### GOOD LUCK
---

希望你不会遇到bug，but life is like a box of chocolate……
maybe you need this.

    https://github.com/faliye/choas-vue/issues
    
    
祝你好运!!!