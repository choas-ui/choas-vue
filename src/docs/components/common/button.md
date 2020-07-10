### 按钮 Button
---
  <small>
    响应用户点击操作。
  </small>

#### 大小 size
---
  <small>
    控制按钮大小。
  </small>

:::demo
```html
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
  <small>
    button转化为块
  </small>

:::demo
```html
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
  <small>
    提供六种基础类型
  </small>

:::demo
```html
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
  <small>
    在按钮前提供两个插槽,插入图标(多)或其他。
  </small>

  |键|值|类型|位置|
  |-|-|-|-|
  | slot|left|String|左|
  | slot|right|String|右|

:::demo
```html
    <template>
        <Button>
            <Icon
                slot="left"
                color="#fff"
                iconName="choas-search"
             />
            搜 索
        </Button>
        <Button>
            <Icon
                slot="right"
                color="#fff"
                iconName="choas-delete"
             />
            删 除
        </Button>
    </template>
```
:::

#### 类 class-name
---
  <small>
    在组件外层容器上添加一个类，优先级会导致该类的某些样式不生效，参考CSS优先级提权。
  </small>

:::demo
```html
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
  <small>
    覆盖组件的所有类名，重写定义组件的样式。
  </small>

:::demo
```html
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

:::danger  请注意
  <p>
    prefix 会覆盖该组件下几乎所有的类，过去所有的样式均不再生效。
  </p>   
:::

#### 提示 placeholder
---
  <small>
    鼠标悬浮的提醒。
  </small>

:::demo
```html
    <template>
        <Button placeholder="按钮被禁用" type="disabled"></Button>
    </template>
```
:::

#### 点击 click
---
  <small>
    点击操作。
  </small>

:::demo
```html
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
  |type|'primary''success''warning'<br/>'danger''disabled''ghost'| String| 'primary'|按钮样式|
  |slot|'left' 'right'| String | 无 |插入左/右图标插槽|
  |class-name|无|String|''|组件最外层添加一个新的类名|
  |prefix|无|String|无|是否在该组件所有类前加前缀|
  |placeholder|无|String|无|提供一个悬停时的说明文字|
  |click|()=>{}|Function|无|点击|

#### 问答 QAQ
---
  <small>
    <ul>
      <li><b>Q:</b> 圆形图标？</li>
      <li><b>A:</b> 暂未提供圆形图标。</li>
    </ul>
  </small>

#### 归类 Answer
---
  <small>
    <ul>
      <li><b>Q:</b></li>
    </ul>
  </small>
