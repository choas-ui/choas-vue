### 按钮 Button
---
响应用户点击操作

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

#### 插槽 slot
---
在按钮前提供两个插槽,推荐图标

|键|值|类型|位置|
|-|-|-|-|
| slot|left|String|左|
| slot|right|String|右|


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

#### 提示 placeholder
---
覆盖组件的所有类名，重写定义组件的样式
::: demo
``` html
    <template>
        <Button placeholder="按钮被禁用" type="disabled"></Button>
    </template>
```
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

#### 属性列表 props
---
|属性|值|类型|默认值|说明|
|:-:|:---:|---|---|:---|
|block|truthy falsy|Boolean|false|是否将按钮转化为块|
|size|'small' 'default' 'large'| String | 'default'|按钮内边距|
|type|'primary''success''warning''danger'……| String| 'primary'|按钮样式|
|slot|'left' 'right'| String | 无 |插入左|右图标插槽|
|class-name|无|String|''|组件最外层添加一个新的类名|
|prefix|无|String|无|是否在该组件所有类前加前缀|
|placeholder|无|String|无|提供一个悬停时的说明文字|
|click|()=>{}|Function|无|回调|
|||||

#### 问答 QAQ
---
<h5>
    <ul>
        <li><b>Q:</b> 圆形按钮？</li>
        <li><b>A:</b> 暂未提供圆形按钮。</li>
        <li><b>Q:</b> 有ButtonGroup的组件吗？</li>
        <li><b>A:</b> 有计划，但不是最优先。</li>
    </ul>
</h5>

#### 归类 Answer
---
<h5>
    <ul>
        <li><b>Q:</b></li>
    </ul>
</h5>