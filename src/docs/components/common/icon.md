
### 图标
---
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <p>
    示例中字体图标库引用了<a href="https://fontawesome.dashgame.com/"> fontawesome </a> 图标库，使用时需自行添加。
  </p>
  
  <span class="icon-lib">
    <p><CIcon icon-name="choas-more" width="20" height="20"/></p>
    <p>choas-more</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-forbid" width="20" height="20"/></p>
    <p>choas-forbid</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-close" width="20" height="20"/></p>
    <p>choas-close</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-fill-close" width="20" height="20"/></p>
    <p>choas-fill-close</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-search" width="20" height="20"/></p>
    <p>choas-search</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-delete" width="20" height="20"/></p>
    <p>choas-delete</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-arrow-top" width="20" height="20"/></p>
    <p>choas-arrow-top</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-arrow-right" width="20" height="20"/></p>
    <p>choas-arrow-right</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-arrow-down" width="20" height="20"/></p>
    <p>choas-arrow-down</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-arrow-left" width="20" height="20"/></p>
    <p>choas-arrow-left</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-fill-arrow-top" width="20" height="20"/></p>
    <p>choas-fill-arrow-top</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-fill-arrow-right" width="20" height="20"/></p>
    <p>choas-fill-arrow-right</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-fill-arrow-down" width="20" height="20"/></p>
    <p>choas-fill-arrow-down</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-fill-arrow-left" width="20" height="20"/></p>
    <p>choas-fill-arrow-left</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-file-icon" width="20" height="20"/></p>
    <p>choas-file-icon</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-square-min" width="20" height="20"/></p>
    <p>choas-square-min</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-square-add" width="20" height="20"/></p>
    <p>choas-square-add</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-lists" width="20" height="20"/></p>
    <p>choas-lists</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-add" width="20" height="20"/></p>
    <p>choas-add</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-min" width="20" height="20"/></p>
    <p>choas-min</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-edit" width="20" height="20"/></p>
    <p>choas-edit</p>
  </span> 
  <span class="icon-lib">
    <p><CIcon icon-name="choas-confirm" width="20" height="20"/></p>
    <p>choas-confirm</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-error" width="20" height="20"/></p>
    <p>choas-error</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-download" width="20" height="20"/></p>
    <p>choas-download</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-save" width="20" height="20"/></p>
    <p>choas-save</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-home" width="20" height="20"/></p>
    <p>choas-home</p>
  </span> 
  <span class="icon-lib">
    <p><CIcon icon-name="choas-fill-home" width="20" height="20"/></p>
    <p>choas-fill-home</p>
  </span>
  <span class="icon-lib">
    <p><CIcon icon-name="choas-eye" width="20" height="20"/></p>
    <p>choas-eye</p>
  </span> 
  <span class="icon-lib">
    <p><CIcon icon-name="choas-close-eye" width="20" height="20"/></p>
    <p>choas-close-eye</p>
  </span>

  
  <style>
    .icon-lib{
        display: inline-block;
        width: 130px;
        margin-left: 10px;
        text-align: center;
    }
    .icon-lib p{
        font-size: 10px;
        width: 100%;
    }
  </style>

#### 类型 type
---
  <ul>
    <li>fontClass 字体图标。</li>
    <li>iconName  svg字体图标。</li>
    <li>src 图片图标。</li>
    <li>s默认图标宽高均为18px,行高也为18px。</li>
  </ul>

:::demo
```html
<template>
    <CIcon
        font-class="fa fa-clipboard"
        color="#666"
    />
    <CIcon
        iconName="choas-close"
        color="red"
    />
    <CIcon
        src="/assets/img/iconExp/snowman.jpg"
    />
</template>
```
:::

#### 宽与高 width&height
---
  <p>
    设置图标的宽和高。
  </p>

:::demo
```html
<template>
    <CIcon
        font-class="fa fa-wpexplorer"
        width="40"
        height="40"
        color="#666"
    />
    <CIcon
        iconName="choas-forbid"
        width="40"
        height="40"
        color="red"
    />
    <CIcon
        width="80"
        height="80"
        src="/assets/img/iconExp/earth.jpg"
    />
</template>
```
:::

#### 名称 iconName
---
  <p>
    字体图标(ft)、svg图标(svg)时fontName指定图标对应名称。
  </p>

:::demo
```html
<template>
    <CIcon
        font-class="fa fa-bicycle"
        width="110"
        height="80"
        font-size="80"
        color="#c3ff0d"
    />
    <CIcon
        iconName="choas-more"
        width="80"
        height="80"
    />
</template>
```
:::

#### 字体图标大小 fontSize
---
  <p>
    仅在type为ft时生效
  </p>

:::demo
```html
<template>
    <CIcon
        font-class="fa fa-chrome"
        color="green"
        width="40"
        height="40"
        font-size="30"
    />
    <CIcon
        font-class="fa fa-medkit"
        color="red"
        width="40"
        height="40"
        font-size="30"
    />
    <CIcon
        font-class="fa fa-telegram"
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
  <p>
    仅在type为img时生效。
  </p>

:::demo
```html
<template>
    <CIcon
        width="80"
        height="80"
        src="/assets/img/iconExp/tl.jpg"
    />
</template>
```
:::

#### 颜色 Color
---
  <p>
    一般情况下的颜色。
  </p>

:::demo
```html
<template>
    <CIcon
        font-class="fa fa-spotify"
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
  <p>
    鼠标hover变色, 仅在绑定点击事件时可以触发。
  </p>

:::demo
```html
<template>
    <CIcon
        font-class="fa fa-yelp"
        color="#ff3677"
        activeColor="green"
        width="40"
        height="40"
        font-size="30"
    />
    <CIcon
        font-class="fa fa-yelp"
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
  <p>
    点击事件。
  </p>

:::demo
```html
<template>
    <CIcon
        font-class="fa fa-yelp"
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
  <p>
    某些时候你需要引入额外的资源。
  </p>

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
  |width|无| String | '16'|图标宽|
  |height|无| String | '16'|图标高|
  |fontClass|无| String | 无|提供字体图标名称|
  |iconName|无| String | 无|提供图标名称|
  |src|无| String | 无 |图片图标路径|
  |fontSize|无| String| '16'|控制字体图标大小|
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
  <ul>
    <li><b>Q:</b> 圆形按钮？</li>
    <li><b>A:</b> 暂未提供圆形按钮。</li>
  </ul>

#### 归类 Answer
---
  <ul>
    <li><b>Q:</b></li>
  </ul>
