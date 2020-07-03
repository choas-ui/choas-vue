### 按钮 Button

#### 大小 size

<template>
<br/>
<Button :size="'small'">small</Button>
<Button :size="'default'">default</Button>
<Button></Button>
<Button :size="'large'">large</Button>
</template>

::: details 点击查看代码
``` js
<Button :size="'small'">small</Button>
<Button size="'default'">default</Button>
<Button>no-size</Button>
<Button size="'large'">large</Button>

```
:::

#### 块 block

默认呈现内联块

<template>
<br/>
<Button :size="'small'" block>small</Button>
<br/>
<Button type="success" :size="'default'" block>default</Button>
<br/>
<Button type="danger" :size="'large'" block>large</Button>
</template>    

::: details 点击查看代码
``` js
<Button :size="'small'" block>small</Button>
<Button :size="'default'" block>default</Button>
<Button :size="'large'" block>large</Button>
```
:::

#### 类型 type 

<template>
    <br/>
    <Button :type="'primary'">
        primary
    </Button>
    <Button :type="'success'">success</Button>
    <Button :type="'warning'">warning</Button>
    <Button type="danger">danger</Button>
    <Button type="disabled">disabled</Button>
    <Button type="ghost">ghost</Button>
</template> 


::: details 点击查看代码
``` js
<Button :type="'primary'">primary</Button>
<Button :type="'success'">success</Button>
<Button :type="'warning'">warning</Button>
<Button :type="'danger'">danger</Button>
<Button :type="'disabled'">disabled</Button>
<Button :type="'ghost'">ghost</Button>
```
:::

#### 图标 icon

为图标在按钮前后两个地方提供两个插槽

|键|值|类型|位置|
|-|-|-|-|
| v-slot|left-icon|string|左|
| v-slot|right-icon|string|右|

<Button><template slot="left">ico</template></Button>

::: details 点击查看代码
``` js
<Button><template slot="left">ico</template></Button>
```
:::
<Button><template slot="right">ico</template></Button>
::: details 点击查看代码
``` js
<Button><template slot="right">icon</template></Button>
```
:::

#### 类 class-name

在组件外层容器上添加一个类，优先级会导致某些样式不生效，参考CSS优先级提权。

<template>
    <Button class-name="usr-btn-class"></Button>
</template>

<style>
    .page>div>button.usr-btn-class{
      background: red;
    }
</style>

::: details 点击查看代码
``` js
<Button class-name="usr-btn-class"></Button>
<style lang="scss" scoped>
  button.usr-btn-class{
    background: red;
  }
</style>
```
:::
::: danger
尽可能少的使用important
:::

#### 覆盖 prefix

覆盖组件的所有类名，重写定义组件的样式

<template>
    <br>
    <Button prefix="usr"></Button>
</template>
<style>
  .usr-btn-primary{
    background: red;
  }
</style>

::: details 点击查看代码
``` js
<Button prefix="usr"></Button>
<style lang="scss" scoped>
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

<script>
export default {
    methods: {
        clickHandle(){
            console.log('click')
        }
    }
}
</script>

<template>
    <br>
    <Button @click="clickHandle"></Button>
</template>


::: details 点击查看代码
``` js
<template>
    <Button @click="clickHandle"></Button>
</template

export default {
    methods: {
        clickHandle(){
            console.log('click')
        }
    }
}
</script>
```
:::

