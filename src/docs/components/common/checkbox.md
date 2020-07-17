### 复选框 checkbox
---
  <ul>
    <li>多个选项。</li>
    <li>三个状态，已选 checked，未选，半选 halfChecked。</li>
    <li>CheckboxGroup CheckBoxButtonGroup。</li>
  </ul>

#### 基础 basic
---

:::demo
```html
<template>
    <p>{{ value }}</p>
    <CCheckbox
        v-model="value"
        :list-data="listData"
    />
</template>
<script>
    export default {
        data(){
            return {
                value: ['c'],
                listData: [
                    {
                        key: 'a',
                        value:'a'
                    },
                    {
                        key: 'b',
                        value:'b'
                    },
                    {
                        key: 'c',
                        value:'c'
                    },
                    {
                        key: 'd',
                        value:'d'
                    },
                ],
            }
        }
    }
</script>
```
:::



#### 
---

:::demo
```html
<template>
    <p>{{ value }}</p>
    <CCheckbox
        v-model="value"
        :list-data="listData"
    />
</template>
<script>
    export default {
        data(){
            return {
                value: ['c'],
                listData: [
                    {
                        key: 'a',
                        value:'a',
                        halfChecked: true,
                    },
                    {
                        key: 'b',
                        value:'b'
                    },
                    {
                        key: 'c',
                        value:'c'
                    },
                    {
                        key: 'd',
                        value:'d'
                    },
                ],
            }
        }
    }
</script>
```
:::
