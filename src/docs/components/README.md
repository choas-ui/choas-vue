#### 使用
---

```js
    import Vue from 'vue'
    import App from './App.vue'
    import ChoasUI from './lib'
    Vue.config.productionTip = false
    Vue.use(ChoasUI)
    new Vue({
      render: h => h(App),
    }).$mount('#app')

```

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