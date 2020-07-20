### 按钮 Button
---
  <ul>
    <li>响应用户点击操作。</li>
  </ul>

#### 大小 size
---
  <ul>
    <li>控制按钮大小。</li>
  </ul>

:::demo
```html
  <template>
    <CButton size="ssmall">ssmall</CButton>
    <CButton size="small">small</CButton>
    <CButton size="default">default</CButton>
    <CButton></CButton>
    <CButton size="large">large</CButton>
    <CButton size="llarge">llarge</CButton>
  </template>
```
:::

#### 块 block
---
  <ul>
    <li>button转化为块。</li>
  </ul>

:::demo
```html
  <template>
    <CButton size="ssmall" block>ssmall</CButton>
    <br/>
    <CButton type="success" size="small" block>small</CButton>
    <br/>
    <CButton type="warning" size="default" block>default</CButton>
    <br/>
    <CButton type="danger" size="large" block>large</CButton>
    <br/>
    <CButton type="disabled" size="llarge" block>llarge</CButton>
  </template> 
```
:::

#### 类型 type 
---
  <ul>
    <li>提供六种基础类型。</li>
  </ul>

:::demo
```html
  <template>
    <CButton type="primary">primary</CButton>
    <CButton type="success">success</CButton>
    <CButton type="warning">warning</CButton>
    <CButton type="danger">danger</CButton>
    <CButton type="disabled">disabled</CButton>
    <CButton type="ghost">ghost</CButton>
  </template> 
```
:::

#### 插槽 slot
---
  <ul>
    <li>在按钮前提供两个插槽,插入图标(多)或其他。</li>
  </ul>

  |键|值|类型|位置|
  |-|-|-|-|
  | slot|left|String|左|
  | slot|right|String|右|

:::demo
```html
  <template>
    <CButton>
      <CIcon
        slot="left"
        color="#fff"
        iconName="choas-search"
       />
      搜 索
    </CButton>
    <CButton>
      <CIcon
        slot="right"
        color="#fff"
        iconName="choas-delete"
       />
      删 除
    </CButton>
  </template>
```
:::

#### 类 class-name
---
  <ul>
    <li>在组件外层容器上添加一个类，优先级会导致该类的某些样式不生效，参考CSS优先级提权。</li>
  </ul>

:::demo
```html
  <template>
    <CButton class-name="usr-btn-class"></CButton>
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
  <ul>
    <li>覆盖组件的所有类名，重写定义组件的样式。</li>
  </ul>

:::demo
```html
  <template>
    <CButton prefix="usr"></CButton>
  </template>
  <style>
    .usr-btn-primary{
      background: red;
    }
  </style>
```
:::

:::danger  请注意
  <ul>
    <li>prefix 会覆盖该组件下几乎所有的类，过去所有的样式均不再生效。</li>
  </ul>   
:::

#### 提示 placeholder
---
  <ul>
    <li>鼠标悬浮的提醒。</li>
  </ul>

:::demo
```html
  <template>
    <CButton placeholder="按钮被禁用" type="disabled"></CButton>
  </template>
```
:::

#### 点击 click
---
  <ul>
    <li>点击操作。</li>
  </ul>

:::demo
```html
  <template>
    <CButton @click="clickHandle"></CButton>
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

---
---

### 按钮组 CButtonGroup
---
  <ul>
    <li>一组按钮。</li>
    <li>返回当前的选中的按钮值。</li>
  </ul>

#### 基本使用
---

:::demo
```html
  <template>
    <p>{{selectData}}</p>
    <CButtonGroup :list-data="listData"
                  v-model="selectData"
                  @click="clickHandle"
                  :reflect-key="{key: 'btnTxt', value: 'key'}"
    ></CButtonGroup>
  </template>
  <script>
  export default {
    data(){
        return {
            selectData:[
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn1'
                },
            ],
            listData: [
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn1',
                },
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn2',
                },
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn3',
                }
            ]
        }
    },
    methods: {
      clickHandle(key,data,e){
        console.log(key,data,e)
      }
    }
  }
  </script>
```
:::

#### 多选 multiple
---
  <ul>
    <li>checked控制是否选中。</li>
  </ul>

:::demo
```html
  <template>
    <p>{{selectData}}</p>
    <CButtonGroup :list-data="listData"
                  v-model="selectData"
                  @click="clickHandle"
                  multiple
                  :reflect-key="{key: 'btnTxt', value: 'key'}"
    ></CButtonGroup>
  </template>
  <script>
  export default {
    data(){
        return {
            selectData:[
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn1',
                    checked: true
                },
            ],
            listData: [
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn1',
                },
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn2',
                },
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn3',
                }
            ]
        }
    },
    methods: {
      clickHandle(key,data,e){
        console.log(key,data,e)
      }
    }
  }
  </script>
```
:::

#### 高亮 activeStyle
---

:::demo
```html
  <template>
    <p>{{selectData}}</p>
    <CButtonGroup :list-data="listData"
                  v-model="selectData"
                  @click="clickHandle"
                  multiple
                  :normal-style="{background: '#fff', color: '#333'}"
                  :active-style="{background: 'green'}"
                  :reflect-key="{key: 'btnTxt', value: 'key'}"
    ></CButtonGroup>
  </template>
  <script>
  export default {
    data(){
        return {
            selectData:[
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn1',
                    checked: true
                },
            ],
            listData: [
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn1',
                },
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn2',
                },
                {
                    btnTxt: '按钮',
                    type: 'primary',
                    key: 'btn3',
                }
            ]
        }
    },
    methods: {
      clickHandle(key,data,e){
        console.log(key,data,e)
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
  |size|'ssmall' 'small' 'default' 'large' 'llarge'| String | 'default'|按钮内边距|
  |type|'primary''success''warning'<br/>'danger''disabled''ghost'| String| 'primary'|按钮样式|
  |slot|'left' 'right'| String | 无 |插入左/右图标插槽|
  |class-name|无|String|''|组件最外层添加一个新的类名|
  |prefix|无|String|无|是否在该组件所有类前加前缀|
  |placeholder|无|String|无|提供一个悬停时的说明文字|
  |click|()=>{}|Function|无|点击|

#### 问答 QAQ
---
  <ul>
    <li><b>Q:</b> 圆形图标？</li>
    <li><b>A:</b> 暂未提供圆形图标。</li>
  </ul>

#### 归类 Answer
---
  <ul>
    <li><b>Q:</b></li>
  </ul>
