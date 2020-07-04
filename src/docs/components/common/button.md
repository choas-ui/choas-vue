### 按钮 Button

#### 大小 size
---


::: demo
``` html
        <template>
        <Button :size="'small'">small</Button>
        <Button :size="'default'">default</Button>
        <Button></Button>
        <Button :size="'large'">large</Button>
    </template>
```
:::

#### 块 block
---
该属性将button转化为block

::: demo
``` html
        <template>
        <Button :size="'small'" block>small</Button>
        <br/>
        <Button type="success" :size="'default'" block>default</Button>
        <br/>
        <Button type="danger" :size="'large'" block>large</Button>
    </template> 
```
:::

#### 类型 type 
---



::: demo
``` html
    <template>
        <Button :type="'primary'">primary</Button>
        <Button :type="'success'">success</Button>
        <Button :type="'warning'">warning</Button>
        <Button type="danger">danger</Button>
        <Button type="disabled">disabled</Button>
        <Button type="ghost">ghost</Button>
    </template> 
```
:::

#### 图标 icon
---
为图标在按钮前后两个地方提供两个插槽

|键|值|类型|位置|
|-|-|-|-|
| v-slot|left-icon|string|左|
| v-slot|right-icon|string|右|


::: demo
``` html
    <template>
        <Button><template slot="left">ico</template></Button>
        <Button><template slot="right">ico</template></Button>
    </template>
```
:::

#### 类 class-name
---
在组件外层容器上添加一个类，优先级会导致某些样式不生效，参考CSS优先级提权。

::: demo
``` html
    <template>
        <Button class-name="usr-btn-class"></Button>
    </template>
    
    <style>
         .demo-content>div>button.usr-btn-class{
          background: red;
        }
    </style>
```
:::

#### 覆盖类 prefix
---
覆盖组件的所有类名，重写定义组件的样式
::: demo
``` html
    <template>
        <Button prefix="usr"></Button>
    </template>
    <style>
      .usr-btn-primary{
        background: red;
      }
    </style>
```
:::

::: warning
类前缀会覆盖类中所有的样式
:::

#### 回调 click
---
::: demo
``` html
    <template>
        <Button @click="clickHandle"></Button>
    </template>
    <script>
    export default {
        methods: {
            clickHandle(){
                alert("Hello World!");
            }
        }
    }
    </script>
```
:::

