
### 图标
---
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <small>
    示例中字体图标库引用了<a href="https://fontawesome.dashgame.com/"> fontawesome </a> 图标库。
  </small>
  <br>
  <small>
    仅内置了少量的svg图标，以后会慢慢新增。
  </small>


#### 类型 type
---
  <small>
    <ul>
      <li>ft 字体图标</li>
      <li>svg 字体图标</li>
      <li>img 字体图标</li>
      </ul>
  </small>
  <small>
    默认图标宽高均为24px,行高也为24px。
  </small>

:::demo
```html
<template>
    <Icon
        type="ft"
        iconName="fa fa-clipboard"
        color="#666"
    />
    <Icon
        type="svg"
        iconName="choas-close"
        color="red"
    />
    <Icon
        type="img"
        src="/assets/img/iconExp/snowman.jpg"
    />
</template>
```
:::

#### 宽与高 width&height
---
  <small>
    设置图标的宽和高。
  </small>

:::demo
```html
<template>
    <Icon
        type="ft"
        iconName="fa fa-wpexplorer"
        width="40"
        height="40"
        color="#666"
    />
    <Icon
        type="svg"
        iconName="choas-forbid"
        width="40"
        height="40"
        color="red"
    />
    <Icon
        type="img"
        width="80"
        height="80"
        src="/assets/img/iconExp/earth.jpg"
    />
</template>
```
:::

#### 名称 iconName
---
  <small>
    字体图标(ft)、svg图标(svg)时fontName指定图标对应名称。
  </small>

:::demo
```html
<template>
    <Icon
        type="ft"
        iconName="fa fa-bicycle"
        width="110"
        height="80"
        font-size="80"
        color="#c3ff0d"
    />
    <Icon
        type="svg"
        iconName="choas-more"
        width="80"
        height="80"
    />
</template>
```
:::

#### 字体图标大小 fontSize
---
  <small>
    仅在type为ft时生效
  </small>

:::demo
```html
<template>
    <Icon
        type="ft"
        iconName="fa fa-chrome"
        color="green"
        width="40"
        height="40"
        font-size="30"
    />
    <Icon
        type="ft"
        iconName="fa fa-medkit"
        color="red"
        width="40"
        height="40"
        font-size="30"
    />
    <Icon
        type="ft"
        iconName="fa fa-telegram"
        color="#ff3677"
        width="40"
        height="40"
        font-size="30"
    />
</template>
```
:::

#### 来源 src
---
  <small>
    仅在type为img时生效。
  </small>

:::demo
```html
<template>
    <Icon
        type="img"
        width="80"
        height="80"
        src="/assets/img/iconExp/tl.jpg"
    />
</template>
```
:::

#### 颜色 Color
---
  <small>
    一般情况下的颜色。
  </small>

:::demo
```html
<template>
    <Icon
        type="ft"
        iconName="fa fa-spotify"
        color="#23b320"
        width="40"
        height="40"
        font-size="30"
    />
</template>
```
:::

#### 悬停颜色 activeColor
---
  <small>
    鼠标hover变色, 仅在绑定点击事件时可以触发。
  </small>

:::demo
```html
<template>
    <Icon
        type="ft"
        iconName="fa fa-yelp"
        color="#ff3677"
        activeColor="green"
        width="40"
        height="40"
        font-size="30"
    />
    <Icon
        type="ft"
        iconName="fa fa-yelp"
        color="#ff3677"
        activeColor="green"
        width="40"
        height="40"
        font-size="30"
        @click="clickHandle"
    />
</template>
<script>
export default {
    methods: {
        clickHandle(){
            alert("Hello World！")
        }
    }
}
</script>
```
:::

#### 点击 click
---
  <small>
    点击事件。
  </small>

:::demo
```html
<template>
    <Icon
        type="ft"
        iconName="fa fa-yelp"
        color="#ff3677"
        activeColor="green"
        width="40"
        height="40"
        font-size="30"
        @click="clickHandle"
    />
</template>
<script>
export default {
    methods: {
        clickHandle(){
            alert("Hello World！")
        }
    }
}
</script>
```
:::

#### 引入 importSrc
---
  <small>
    某些时候你需要引入额外的资源。
  </small>

```js
    // 提供importSrc 函数用于引入资源
    // Icon.importSrc(type, setting)
    /**
    * @name importSrc
    * @param type 'iconFont' 'iconClass' 'svg'
    * @param setting  
    *                iconFont 引入时
    *                 { 
    *                     familyName: '', 
    *                     eotSrc: '',
    *                     iEEotSrc: '',
    *                     woffUrl: '',
    *                     ttfUrl: '',
    *                     svgUrl: '',
    *                 }
    *                 iconClass 引入时
    *                 { 
    *                     href: '',
    *                 }
    *                 svg 引入时
    *                 { 
    *                     src: '',
    *                 }
    **/
    import {Icon} from 'choas-vue'

    Icon.importSrc(type, setting)
```



#### 属性列表 props
---
  |名称|值|类型|默认值|说明|
  |:-:|:---:|---|---|:---|
  |type|'ft' 'svg' 'img'|String|无|指定图标渲染类型|
  |width|无| String | '16'|图标宽|
  |height|无| String | '16'|图标高|
  |iconName|无| String | 无|提供图标名称|
  |fontSize|无| String| '16'|控制字体图标大小|
  |src|无| String | 无 |图片图标路径|
  |color|无| String | 无 |字体及svg图标的颜色|
  |activeColor|无| String | 无 |字体及svg图标的激活颜色,仅在绑定事件后触发|
  |class-name|无|String|''|组件最外层添加一个新的类名|
  |prefix|无|String|无|是否在该组件所有类前加前缀|
  |placeholder|无|String|无|提供一个悬停时的说明文字|
  |click|()=>{}|Function|无|点击|

#### 附加 addition
  |名称|类型|说明|
  |:-:|---|:---|
  |importSrc|Function|导入外部的字体资源及文字资源|

#### 问答 QAQ
---
  <small>
    <ul>
      <li><b>Q:</b> 圆形按钮？</li>
      <li><b>A:</b> 暂未提供圆形按钮。</li>
    </ul>
  </small>

#### 归类 Answer
---
  <small>
    <ul>
      <li><b>Q:</b></li>
    </ul>
  </small>