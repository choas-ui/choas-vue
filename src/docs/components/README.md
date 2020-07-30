#### 说明
---
  <ul>
    <li>将子组件的通过属性传递方式深深吸引着我，是的这很react，虽然会让组件库的书写难度
        增加……但真的很好用。choas的每一个可变内容都能实现这样的功能，这是我们的奋斗目标。
    </li>
    <li>组件库尚在完善中，有关API的可能会调整。</li>
  </ul>
  
  
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
