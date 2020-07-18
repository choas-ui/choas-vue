### 复选框 checkbox
---
  <ul>
    <li>选择集合中的多个值。</li>
    <li>增加select插槽， 增加halfChecked插槽。</li>
  </ul>

#### 基础 basic
---

:::demo
```html
<template>
    <p>{{ selectedData }}</p>
    <CCheckbox
        value="a"
        v-model="selectedData"
    />
</template>
<script>
    export default {
        data(){
            return {
                selectedData: ['a', 'b'],
            }
        }
    }
</script>
```
:::


----
----


#### 复选框组 CheckBoxGroup
---
  <ul>
    <li>选择集合中的多个值。</li>
    <li>CheckboxGroup CheckBoxButtonGroup。</li>
    <li>增加select插槽， 增加halfChecked插槽。</li>
  </ul>

:::demo
```html
<template>
    <p>{{ value }}</p>
    <CCheckboxGroup
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

#### 插槽 slot
---
  <ul>
    <li>拥有插槽则不显示默认内容。</li>
  </ul>

#### 类型 type
---

:::demo
```html
<template>
    <p>{{ value }}</p>
    <CCheckboxGroup
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
