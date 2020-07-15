### 弹窗
---
  <p>
    重提醒，用来提醒或选择（多）区域，打断交互流。
  </p>

#### 默认
---
  <ul>
    <li>默认宽高为300*150，默认条件下只显示content,没有遮罩。</li>
    <li>不提供默认的header与footer。</li>
  </ul>

:::demo
```html
    <template>
        <CButton @click="isShow = true">showModal</CButton>
        <CModal v-model="isShow"></CModal>
    </template>
    <script>
        export default {
            data(){
                return {
                    isShow: false,
                }
            }
        }
    </script>
```
:::

#### 遮罩 mask
---
  <ul>
    <li>mask控制弹窗有无遮罩。</li>
  </ul>

:::demo
```html
    <template>
        <CButton @click="isShow = true">showModal</CButton>
        <CModal
            mask
            v-model="isShow"
            >
        </CModal>
    </template>
    <script>
        export default {
            data(){
                return {
                    isShow: false,
                }
            }
        }
    </script>
```
:::

#### 遮罩控制 cancel
---
  <ul>
    <li>设置cancel，遮罩可以关闭弹层。</li>
  </ul>

:::demo
```html
    <template>
        <CButton @click="isShow = true">showModal</CButton>
        <CModal
            mask
            cancel
            v-model="isShow"
            >
                <div class="usr-content">
                    该配置下点击遮罩可以关闭弹窗
                </div>
            </CModal>
    </template>
    <script>
        export default {
            data(){
                return {
                    isShow: false
                }
            }
        }
    </script>
    <style>
        .usr-content{
              height: 100%;
              display: flex;
              align-items: center;
              padding: 10px;
              box-sizing: border-box;
              text-indent: 28px
         }
    </style>
```
:::

#### 控制图标 controller
---
  <ul>
    <li>设置controller值，右上默认按钮消失。</li>
  </ul>


:::demo
```html
    <template>
        <CButton @click="isShow = true">showModal</CButton>
        <CModal
            mask
            cancel
            controller
            v-model="isShow"
            >
                <div class="usr-content">
                    如果没有cancel,该弹窗无法关闭。
                </div>
            </CModal>
    </template>
    <script>
    export default {
        data(){
            return {
                isShow: false
            }
        }
    }
    </script>
```
:::

#### 插槽 slot
---
  <ul>
    <li>提供了三个可以自由定制的插槽:header、controller、footer</li>
    <li>不使用插槽时，弹窗的header和footer不显示</li>
  </ul>

:::demo
```html
    <template>
        <CButton @click="isShow = true">showModal</CButton>
        <CModal
            mask
            cancel
            v-model="isShow"
            >
                <div slot="header">header</div>
                <div slot="footer">footer</div>
            </CModal>
    </template>
    <script>
    export default {
        data(){
            return {
                isShow: false
            }
        }
    }
    </script>
```
:::

#### 标题 Title
---
  <ul>
    <li>弹框标题。</li>
  </ul>

:::demo
```html
    <template>
        <CButton @click="isShow = true">showModal</CButton>
        <CModal
            mask
            cancel
            v-model="isShow"
            title="弹层头部"
            >
            </CModal>
    </template>
    <script>
    export default {
        data(){
            return {
                isShow: false
            }
        }
    }
    </script>
```
:::

#### 类型 type
---
  <ul>
    <li>快速生成提醒弹框。</li>
  </ul>

:::demo
```html
    <template>
        <CButton type='success' @click="isShow = true">success</CButton>
        <CButton type='warning' @click="isShow1 = true">warning</CButton>
        <CButton type='danger' @click="isShow2 = true">danger</CButton>
        <CModal
            v-model="isShow"
            type='success'
            >
        </CModal>
        <CModal
            v-model="isShow1"
            type='warning'
            >
        </CModal>
        <CModal
            v-model="isShow2"
            type='danger'
            >
        </CModal>
    </template>
    <script>
    export default {
        data(){
            return {
                isShow: false,
                isShow1: false,
                isShow2: false,
            }
        }
    }
    </script>
```
:::


#### 宽与高 width&height
---
  <ul>
    <li>指定弹框的初始宽高。</li>
  </ul>

:::demo
```html
    <template>
        <CButton @click="isShow = true">showModal</CButton>
        <CModal
            v-model="isShow"
            width='800'
            height='600'
            >
        </CModal>
    </template>
    <script>
    export default {
        data(){
            return {
                isShow: false,
            }
        }
    }
    </script>
```
:::



#### 顶与左 top&left
---
  <ul>
    <li>指定弹框的顶部及左边初始距离。</li>
  </ul>

:::demo
```html
    <template>
        <CButton @click="isShow = true">showModal</CButton>
        <CModal
            v-model="isShow"
            top='200'
            left='200'
            >
        </CModal>
    </template>
    <script>
    export default {
        data(){
            return {
                isShow: false,
            }
        }
    }
    </script>
```
:::

#### 拖动 draggable
---
  <ul>
    <li>弹框是否可以拖动。</li>
  </ul>

:::demo
```html
    <template>
        <CButton @click="isShow = true">showModal</CButton>
        <CModal
            v-model="isShow"
            width='200'
            height='200'
            top='200'
            left='200'
            draggable
            >
        </CModal>
    </template>
    <script>
    export default {
        data(){
            return {
                isShow: false,
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
  |width|String| String | 350 |弹窗大小|
  |height|String| String | 150 |弹窗宽度|
  |top|String| String | '' |上边距|
  |left|String| String | '' |左边距|
  |title|无| String | 无 |单一文字title组件|
  |mask|truthy falsy | Boolean|false |是否显示遮罩|
  |cancel|truthy falsy | Boolean|false |有遮罩时点击遮罩是否能关闭弹窗|
  |draggable|truthy falsy | Boolean|true |有遮罩时点击遮罩是否能关闭弹窗|
  |slot|'header' 'controller' 'footer'|String|无|是否显示header与footer及替换controller的内容|
  |controller|truthy falsy | Boolean |false |是否显示关闭图标|
  |title|无| String | 无 |单一文字title组件|
  |class-name|无|String|''|组件最外层添加一个新的类名|
  |prefix|无|String|无|是否在该组件所有类前加前缀|
  |draggable|truthy falsy|Boolean|false|是否可以拖拽弹框|

#### 问答 QAQ
---
  <ul>
    <li><b>Q:</b></li>
    <li><b>A:</b></li>
  </ul>

#### 归类 Answer
---
  <ul>
    <li><b>Q:</b> header 、footer 的默认样式。</li>
    <li><b>A:</b> 尽可能少的提供样式，因此header默认文字居中，footer默认组件整体居右。</li>
    <li><b>Q:</b> 注意controller与header、footer的区别。</li>
    <li><b>A:</b> 为避免因无法关闭弹窗的问题，controller默认显示,而header与footer默认关闭。</li>
  </ul>
