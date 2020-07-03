# 按钮

## 形状

<p></p>

<Button :size="'small'">small</Button>
<Button :size="'default'">default</Button>
<Button></Button>
<Button :size="'large'">large</Button>

::: details 点击查看代码
``` js
<Button :size="'small'">small</Button>

<Button :size="'default'">default</Button>

<Button>no-size</Button>

<Button :size="'large'">large</Button>

```
:::

## 颜色

颜色

<template>
    <Button :type="'primary'">
        primary
    </Button>
</template> 
<Button :type="'success'">success</Button>
<Button :type="'warning'">warning</Button>
<Button :type="'danger'">danger</Button>
<Button :type="'disabled'">disabled</Button>
<Button :type="'ghost'">ghost</Button>


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

## 图标

<p></p>

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

---
添加类
在组件外层容器上添加一个类，优先级会导致某些样式不生效，参考CSS优先级提权。

::: danger
尽可能少的使用important
:::

<Button class-name="usr-btn-class"></Button>

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



---
类前缀
::: warning
类前缀会覆盖类中所有的样式
:::
<Button prefix="usr"></Button>

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


---
click

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
<Button @click="clickHandle"></Button>
</template>


