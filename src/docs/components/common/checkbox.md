### 复选框 checkbox
---
  <ul>
    <li>选择的多值集合。</li>
  </ul>

#### 双向绑定 v-model
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
               color="red"
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
               color="red"
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
               color="red"
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
