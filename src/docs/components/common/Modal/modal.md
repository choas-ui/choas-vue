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

#### 拖拽 draggable
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

