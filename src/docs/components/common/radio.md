### 单选框 radio
---
<ul>
    <li></li>
</ul>



---
---

### 单选框组 RadioGroup
---

#### 基本用法
----

:::demo
```html
    <template>
        <CRadioGroup :list-data="listData" v-model="selectData" />
    </template>
    <script>
        export default {
            data(){
                return {
                    selectData: ['a'],
                    listData: ['a', 'b', 'c']
                }
            }
        }
    </script>
```
:::
