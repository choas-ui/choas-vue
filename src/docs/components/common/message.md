### 提醒 Message
---

  <ul>
    <li>轻提醒。</li>
  </ul> 

#### 类型
---
:::demo
```html
<template>
    <CButton @click="info">info</CButton>
</template>
<script>
    const Vue = require('vue');
    const ChoasUI = require('../../../lib');
    export default {
        methods:{
            info(){
                this.$cMessage.info({
                    message: '提示!',
                    timeSpan: 2,
                })
            }
        }
    }
</script>
```
:::

:::demo
```html
<template>
    <CButton @click="success" type="success">success</CButton>
</template>
<script>
    const Vue = require('vue');
    const ChoasUI = require('../../../lib');
    export default {
        methods:{
            success(){
                this.$cMessage.success({
                    message: '提示!',
                    timeSpan: 2,
                })
            }
        }
    }
</script>
```
:::

:::demo
```html
<template>
    <CButton @click="warning" type="warning">warning</CButton>
</template>
<script>
    const Vue = require('vue');
    const ChoasUI = require('../../../lib');
    export default {
        methods:{
            warning(){
                this.$cMessage.warning({
                    message: '提示!',
                    timeSpan: 2,
                })
            }
        }
    }
</script>
```
:::

:::demo
```html
<template>
    <CButton @click="danger" type="danger">danger</CButton>
</template>
<script>
    const Vue = require('vue');
    const ChoasUI = require('../../../lib');
    export default {
        methods:{
            danger(){
                this.$cMessage.danger({
                    message: '提示!',
                    timeSpan: 2,
                })
            }
        }
    }
</script>
```
:::
