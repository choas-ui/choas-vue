### 弹窗
---
<ul>
    <li>默认宽高为300*150，默认条件下只显示content,没有遮罩</li>
    <li>不提供默认的header与footer</li>
</ul>


:::demo
```html
    <template>
        <Button @click="isShow = true">showModal</Button>
        <Modal v-model="isShow"></Modal>
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
mask控制弹窗有无遮罩
::: demo
``` html
    <template>
        <Button @click="isShow = true">showModal</Button>
        <Modal
            mask
            v-model="isShow"
            >
            <div class="usr-content">
                该配置下点击遮罩无法关闭弹窗
            </div> 
        </Modal>
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

#### 遮罩控制 cancel
---
设置cancel时候，点击遮罩时候Modal可以关闭
::: demo
``` html
    <template>
        <Button @click="isShow = true">showModal</Button>
        <Modal
            mask
            cancel
            v-model="isShow"
            >
                <div class="usr-content">
                    该配置下点击遮罩可以关闭弹窗
                </div>
            </Modal>
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

#### 控制图标 controller
---
默认值为false
::: demo
``` html
    <template>
        <Button @click="isShow = true">showModal</Button>
        <Modal
            mask
            cancel
            controller
            v-model="isShow"
            >
                <div class="usr-content">
                    如果没有cancel,该弹窗无法关闭。
                </div>
            </Modal>
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
    <li>不使用插槽时，弹窗的header和footer自动隐藏</li>
</ul>

::: demo
``` html
    <template>
        <Button @click="isShow = true">showModal</Button>
        <Modal
            mask
            cancel
            v-model="isShow"
            >
                <div slot="header">header</div>
                <div slot="footer">footer</div>
            </Modal>
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
::: demo
``` html
    <template>
        <Button @click="isShow = true">showModal</Button>
        <Modal
            mask
            cancel
            v-model="isShow"
            title="弹层头部"
            >
            </Modal>
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
提供type用来快速生成提醒弹框。

::: demo
``` html
    <template>
        <Button type='success' @click="isShow = true">success</Button>
        <Button type='warning' @click="isShow1 = true">warning</Button>
        <Button type='danger' @click="isShow2 = true">danger</Button>
        <Modal
            v-model="isShow"
            type='success'
            >
        </Modal>
        <Modal
            v-model="isShow1"
            type='warning'
            >
        </Modal>
        <Modal
            v-model="isShow2"
            type='danger'
            >
        </Modal>
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


#### 宽度 width
#### 高度 height
---
::: demo
``` html
    <template>
        <Button @click="isShow = true">showModal</Button>
        <Modal
            v-model="isShow"
            width='800'
            height='600'
            >
        </Modal>
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



#### 顶距 top
#### 左边距 left
---
::: demo
``` html
    <template>
        <Button @click="isShow = true">showModal</Button>
        <Modal
            v-model="isShow"
            top='200'
            left='200'
            >
        </Modal>
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
::: demo
``` html
    <template>
        <Button @click="isShow = true">showModal</Button>
        <Modal
            v-model="isShow"
            width='200'
            height='200'
            top='200'
            left='200'
            draggable
            >
        </Modal>
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
|v-modal|无|Boolean|false|是否显示弹窗|
|mask|truthy falsy | Boolean|false |是否显示遮罩|
|cancel|truthy falsy | Boolean|false |有遮罩时点击遮罩是否能关闭弹窗|
|slot|'header' 'controller' 'footer'|String|无|是否显示header与footer及替换controller的内容|
|controller|truthy falsy | Boolean |false |是否显示关闭图标|
|title|无| String | 无 |单一文字title组件|
|class-name|无|String|''|组件最外层添加一个新的类名|
|prefix|无|String|无|是否在该组件所有类前加前缀|
|draggable|truthy falsy|Boolean|false|是否可以拖拽弹框|
|||||

#### 问答 QAQ
---
<h5>
    <ul>
        <li><b>Q:</b></li>
        <li><b>A:</b></li>
    </ul>
</h5>

#### 归类 Answer
---
<h5>
    <ul>
        <li><b>Q:</b> header 、footer 的默认样式。</li>
        <li><b>A:</b> 尽可能少的提供样式，因此header默认文字居中，footer默认组件整体居右。</li>
        <li><b>Q:</b> 注意controller与header、footer的区别。</li>
        <li><b>A:</b> 为避免因无法关闭弹窗的问题，controller默认显示,而header与footer默认关闭。</li>
    </ul>
</h5>  
