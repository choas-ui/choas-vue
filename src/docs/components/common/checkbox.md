### 复选框 checkbox
---
  <ul>
    <li>选择的多值集合。</li>
    <li>存在简单、数据两种模式。</li>
    <li>简单模式中value为简单值，由属性控制组件呈现。</li>
    <li>复杂模式中value为对象，由数据控制组件呈现。</li>
  </ul>

### 简单模式
---
  <ul>
    <li>选择集合中的多个值。</li>
  </ul>
  
:::demo 
```html
<template>
    <p>{{ selectedData }}</p>
    <CCheckbox
        value="a"
        v-model="selectedData"
    />
    <CCheckbox
        value="b"
        v-model="selectedData"
    />
    <CCheckbox
        value="c"
        v-model="selectedData"
    />
    <CCheckbox
        value="d"
        v-model="selectedData"
    />
    <CCheckbox
        value="e"
        v-model="selectedData"
    />
</template>
<script>
    export default {
        data(){
            return {
                selectedData: ['a', 'b', 'e'],
            }
        }
    }
</script>
```
:::

#### 禁止操作 disabled
---
  <ul>
    <li>不可操作，未选值显示禁选色。</li>
  </ul>

:::demo
```html
<template>
    <p>{{ selectedData }}</p>
    <CCheckbox
        value="a"
        disabled
        v-model="selectedData"
    />
    <CCheckbox
        value="b"
        disabled
        v-model="selectedData"
    />
    <CCheckbox
        value="c"
        disabled
        v-model="selectedData"
    />
</template>
<script>
    export default {
        data(){
            return {
                selectedData: ['a'],
            }
        }
    }
</script>
```
:::

#### 半选提示 half-checked
---
  <ul>
    <li>半选提示。</li>
    <li>注意该模式下，不会取消half-checked，需要自行处理绑定值。</li>
  </ul>

:::demo
```html
<template>
    <p>{{ selectedData }}</p>
    <CCheckbox
        value="half-checked"
        half-checked
        v-model="selectedData"
    />
    <CCheckbox
        value="half-checked disabled"
        half-checked
        disabled
        v-model="selectedData"
    />
    <CCheckbox
        value="empty"
        v-model="selectedData"
    />
</template>
<script>
    export default {
        data(){
            return {
                selectedData: [],
            }
        }
    }
</script>
```
:::


#### 图标插槽 slot
---
  <ul>
    <li>selected-icon，选中插槽。</li>
    <li>disabled-icon，禁用插槽。</li>
    <li>half-checked-icon，半选插槽。</li>
  </ul>

:::demo
```html
<template>
    <p>{{ selectedData }}</p>
    <CCheckbox
        value="checked-icon"
        v-model="selectedData"
    >
        <CIcon icon-name="choas-add"
               slot="selected-icon"
               color="blue"
               :style="{
                    position: 'absolute', 
                    left: '-1px', 
                    top: '-1px', 
               }"
        />
        <CIcon icon-name="choas-forbid"
               slot="disabled-icon"
               color="#ff5e5c"
               :style="{
                    position: 'absolute', 
                    left: '-1px', 
                    top: '-1px', 
               }"
        />
        <CIcon icon-name="choas-save"
               slot="half-checked-icon"
               color="blue"
               :style="{
                    position: 'absolute', 
                    left: '-1px', 
                    top: '-1px', 
               }"
        />
    </CCheckbox>
    <CCheckbox
        value="disabled-icon"
        disabled
        v-model="selectedData"
    >
        <CIcon icon-name="choas-add"
               slot="selected-icon"
               color="blue"
               :style="{
                    position: 'absolute', 
                    left: '-1px', 
                    top: '-1px', 
               }"
        />
        <CIcon icon-name="choas-forbid"
               slot="disabled-icon"
               color="#ff5e5c"
               :style="{
                    position: 'absolute', 
                    left: '-1px', 
                    top: '-1px', 
               }"
        />
        <CIcon icon-name="choas-save"
               slot="half-checked-icon"
               color="blue"
               :style="{
                    position: 'absolute', 
                    left: '-1px', 
                    top: '-1px', 
               }"
        />
    </CCheckbox>
    <CCheckbox
        value="half-checked-icon"
        half-checked
        v-model="selectedData"
    >
        <CIcon icon-name="choas-add"
               slot="selected-icon"
               color="blue"
               :style="{
                    position: 'absolute', 
                    left: '-1px', 
                    top: '-1px', 
               }"
        />
        <CIcon icon-name="choas-forbid"
               slot="disabled-icon"
               color="#ff5e5c"
               :style="{
                    position: 'absolute', 
                    left: '-1px', 
                    top: '-1px', 
               }"
        />
        <CIcon icon-name="choas-min"
               slot="half-checked-icon"
               color="green"
               :style="{
                    position: 'absolute', 
                    left: '-1px', 
                    top: '-1px', 
               }"
        />
    </CCheckbox>


</template>
<script>
    export default {
        data(){
            return {
                selectedData: ['checked-icon'],
            }
        }
    }
</script>
```
:::

### 数据模式
---
  <ul>
    <li>value值不再和视图直接相关。</li>
    <li>自动将checked为falsy的值从选中值中移除。</li>
    <li>自动将checked为truthy的值默认选中。</li>
  </ul>
  
:::demo 
```html
<template>
    <p>{{ selectedData }}</p>
    <CCheckbox
        :value="{key: 'a', value: 'a'}"
        v-model="selectedData"
    />
    <CCheckbox
        :value="{key: 'b', value: 'b', halfChecked: true }"
        v-model="selectedData"
    />
    <CCheckbox
        :value="{key: 'c', value: 'c', checked: true}"
        v-model="selectedData"
    />
    <CCheckbox
        :value="{key: 'd', value: 'd', disabled: true}"
        v-model="selectedData"
    />
    <CCheckbox
        :value="{key: 'e', value: 'e', disabled: true, checked: true}"
        v-model="selectedData"
    />
</template>
<script>
    export default {
        data(){
            return {
                selectedData: [{key: 'a', value: 'a'}],
            }
        }
    }
</script>
```
:::

### 键值映射 reflectKey
---
  <ul>
    <li>不推荐使用reflectKey，除非不得不。</li>
  </ul>
  
:::demo 
```html
<template>
    <p>{{ selectedData }}</p>
    <CCheckbox
        :value="{key: 'a', value: 'a'}"
        v-model="selectedData"
    />
    <CCheckbox
        :value="{key: 'b', value: 'b', halfChecked: true }"
        v-model="selectedData"
    />
    <CCheckbox
        :value="{key: 'c', value: 'c', checked: true}"
        v-model="selectedData"
    />
    <CCheckbox
        :value="{name: 'laowang', id: '1268', checked: false}"
        v-model="selectedData"
        :reflect-key="{key: 'name', value: 'id'}"
    />
</template>
<script>
    export default {
        data(){
            return {
                selectedData: [{key: 'a', value: 'a'}],
            }
        }
    }
</script>
```
:::

---
---
---
---

### 复选框组 CheckboxGroup
---
  <ul>
    <li>提供数据与插槽两种可选的模式。</li>
    <li>数据模式可以生成快速视图。</li>
    <li>插槽模式可以生成个性试图。</li>
    <li>不能一起使用，插槽优先级高。</li>
  </ul>

### 数据模式
---
  <ul>
    <li>提供简单、数据两种数据模式。</li>
  </ul>
  
:::demo
```html
<template>
    <p>{{ selectData }}</p>
    <CCheckboxGroup v-model="selectData" :list-data="listData"/>   
    <script>
        export default {
            data(){
                return{
                    selectData:['a'],
                    listData: ['a', 'b', 'c']
                }
            },
        }
    </script> 
</template>
```
:::

:::demo
```html
<template>
    <p>{{ selectData }}</p>
    <CCheckboxGroup v-model="selectData" :list-data="listData"/>   
    <script>
        export default {
            data(){
                return{
                    selectData:[{key: 'a1', value: 'a1', checked: true}],
                    listData: [{key: 'a1', value: 'a1'}, {key: 'b1', value: 'b1'}]
                }
            },
        }
    </script> 
</template>
```
:::

#### 复选按钮 type
---
  <ul>
    <li>值只能为button,不与插槽模式共存。</li>
    <li>normal-style,未选中样式。</li>
    <li>active-style,选中样式。</li>
  </ul>
  
:::demo
```html
<template>
    <p>{{ selectData }}</p>
    <CCheckboxGroup v-model="selectData"
                    :list-data="listData"
                    type="button"
                    :normal-style="{background: '#fff', color: '#333'}"
                    :active-style="{background: 'green'}"
    />   
    <script>
        export default {
            data(){
                return{
                    selectData:[{key: 'a', value: 'a'}],
                    listData: [{key: 'a', value: 'a'}, {key: 'b', value: 'b'}, {key: 'c', value: 'c'}]
                }
            },
        }
    </script> 
</template>
```
:::

:::demo
```html
<template>
    <p>{{ selectData }}</p>
    <CCheckboxGroup v-model="selectData"
                    :list-data="listData"
                    type="button"
                    :normal-style="{background: '#fff', color: '#333'}"
                    :active-style="{background: 'green'}"
    />   
    <script>
        export default {
            data(){
                return{
                    selectData:[{key: 'a', value: 'a', checked: true}],
                    listData: [{key: 'a', value: 'a'}, {key: 'b', value: 'b'}, {key: 'c', value: 'c'}]
                }
            },
        }
    </script> 
</template>
```
:::

### 插槽模式
---

:::demo
```html
<template>
    <p>{{ selectedData }}</p>
    <CCheckboxGroup>
         <CCheckbox
           value="a"
           v-model="selectedData"
         />
         <CCheckbox
           value="b"
           v-model="selectedData"
         />
         <CCheckbox
           value="c"
           v-model="selectedData"
         />
    </CCheckboxGroup>   
    <script>
        export default {
            data(){
                return{
                    selectedData:[],
                }
            },
        }
    </script> 
</template>
```
:::

:::demo
```html
<template>
    <p>{{ selectedData }}</p>
    <CCheckboxGroup>
         <CCheckbox
           :value="{key: 'a', value: 'a', checked: true}"
           v-model="selectedData"
         />
         <CCheckbox
           :value="{key: 'b', value: 'b'}"
           v-model="selectedData"
         />
         <CCheckbox
           :value="{key: 'c', value: 'c'}"
           v-model="selectedData"
         />
    </CCheckboxGroup>   
    <script>
        export default {
            data(){
                return{
                    selectedData:[],
                }
            },
        }
    </script> 
</template>
```
:::
