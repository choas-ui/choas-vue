#### 说明
---
  <p>
    组件库尚在完善中，有关API的可能调整，我们会尽量保持api不变性……
  </p>
  <p>
    小库给大佬让路，所有示例中的组件名称加‘C’。
  </p>
  
  
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
---

::: demo
```html
<template>
  <div id="app">
    <CButton @click="greeting"></CButton>
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

  <p>
    希望你不会遇到bug，but life is like a box of chocolate……
  </p>
  <p>
    maybe you need this.
  </p>

    https://github.com/faliye/choas-vue/issues
    
祝你好运!!!
