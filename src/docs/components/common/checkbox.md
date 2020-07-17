### 复选框 checkbox
---
  <ul>
    <li>选择集合中的多个值。</li>
    <li>CheckboxGroup CheckBoxButtonGroup。</li>
    <li>增加select插槽， 增加halfChecked插槽。</li>
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
