### 图标
---
<small>仅内置了少量的svg图标</small>

示例中字体图标库引用了<a href="https://fontawesome.dashgame.com/"> fontawesome </a> 图标库。

#### 类型 type
---
<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<ul>
<li>ft 字体图标</li>
<li>svg 字体图标</li>
<li>img 字体图标</li>
</ul>
<small>默认图标宽高均为18px</small>

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
<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<ul>
<li>ft 字体图标</li>
<li>svg 字体图标</li>
<li>img 字体图标</li>
</ul>
<small>设置图标的宽度，可以让你使用更个性的图标。</small>

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
<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

<small>字体图标(ft)、svg图标(svg)时fontName指定图标对应名称。</small>


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
<small>仅在type为ft时生效</small> 
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
<small>仅在type为img时生效</small> 
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

#### 旋转 rotate


#### 点击 click







#### 属性列表 props
---
|属性|值|类型|默认值|说明|
|:-:|:---:|---|---|:---|
|type|'ft' 'svg' 'img'|String|无|指定图标渲染类型|
|size|'small' 'default' 'large'| String | 'default'|按钮内边距|
|type|'primary''success''warning'<br/>'danger''disabled''ghost'| String| 'primary'|按钮样式|
|slot|'left' 'right'| String | 无 |插入左|右图标插槽|
|class-name|无|String|''|组件最外层添加一个新的类名|
|prefix|无|String|无|是否在该组件所有类前加前缀|
|placeholder|无|String|无|提供一个悬停时的说明文字|
|click|()=>{}|Function|无|回调|
|||||

#### 问答 QAQ
---
<small>
    <ul>
        <li><b>Q:</b> 圆形按钮？</li>
        <li><b>A:</b> 暂未提供圆形按钮。</li>
        <li><b>Q:</b> 有ButtonGroup的组件吗？</li>
        <li><b>A:</b> 有计划，但不是最优先。</li>
    </ul>
</small>

#### 归类 Answer
---
<small>
    <ul>
        <li><b>Q:</b></li>
    </ul>
</small>