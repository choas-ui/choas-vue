### 树形弹窗
---

#### 双向绑定 v-model
---
  <ul>
    <li>选定值双向绑定返回。</li>
  </ul>
  
::: demo
```html
    <template>
        <p>选中的值: {{selectedData}}</p>   
        <CButton @click="isModalShow = !isModalShow">打开</CButton>
        <CTreeModal
            v-model="selectedData"

            :list-data="listData"
            :isShow="isModalShow"
            @toggleShow="v => isModalShow= v"
            :reflectKey="{
                key: 'name',
                value: 'id'
            }"
            width="800"
            height="600"
            mask
            controllerColor="#fff"
            activeColor="#fff"
            ></CTreeModal>
    </template>
    <script>
    export default {
        name: 'SomeComponent',
        props: {},
        data(){
            return {
                isModalShow: false,
                selectedData:[
                    {
                        id: '014557484S-1-0017',
                        name: '尼古拉斯.赵',
                    }
                ],
                listData:[
                    {
                        id: '014557484S',
                        name: '特殊事务部',
                        expand: true,
                        children:[
                            {
                                id: '014557484S-1',
                                name: '后勤',
                                children: [
                                    {
                                        id: '014557484S-1-0017',
                                        name: '尼古拉斯.赵',
                                    }
                                ],
                            },
                            {
                                id: '014557484S-2',
                                name: '业务部',
                                expand: true,
                                children:[
                                    {
                                        id: '014557484S-2-1',
                                        name: '一组',
                                    },
                                    {
                                        id: '014557484S-2-2',
                                        name: '二组',
                                        expand: true,
                                        children: [
                                             {
                                                id: '014557484S-2-2-0017',
                                                name: '谢广坤',
                                             },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],

            }           
        }
    }
    </script>
```
:::

#### 显示隐藏 isShow
---
  <ul>
    <li>isShow控制组件显隐。</li>
    <li>toggleShow方法配合切换isShow。</li>
  </ul>

::: demo
```html
    <template>
        <p>选中的值: {{selectedData}}</p>   
        <CButton @click="isModalShow = !isModalShow">打开</CButton>
        <CTreeModal
            :list-data="listData"
            v-model="selectedData"

            :isShow="isModalShow"
            @toggleShow="v => isModalShow= v"

            :reflectKey="{
                key: 'name',
                value: 'id'
            }"
            width="800"
            height="600"
            mask
            controllerColor="#fff"
            activeColor="#fff"
            ></CTreeModal>
    </template>
    <script>
    export default {
        name: 'SomeComponent',
        props: {},
        data(){
            return {
                isModalShow: false,
                selectedData:[
                    {
                        id: '014557484S-1-0017',
                        name: '尼古拉斯.赵',
                    }
                ],
                listData:[
                    {
                        id: '014557484S',
                        name: '特殊事务部',
                        expand: true,
                        children:[
                            {
                                id: '014557484S-1',
                                name: '后勤',
                                children: [
                                    {
                                        id: '014557484S-1-0017',
                                        name: '尼古拉斯.赵',
                                    }
                                ],
                            },
                            {
                                id: '014557484S-2',
                                name: '业务部',
                                expand: true,
                                children:[
                                    {
                                        id: '014557484S-2-1',
                                        name: '一组',
                                    },
                                    {
                                        id: '014557484S-2-2',
                                        name: '二组',
                                        expand: true,
                                        children: [
                                             {
                                                id: '014557484S-2-2-0017',
                                                name: '谢广坤',
                                             },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],

            }           
        }
    }
    </script>
```
:::

#### title&titleImg 标题与背景
---
  <ul>
    <li>提供自定义标题。</li>
    <li>如需修改样式可以使用class-name。</li>
    <li>提供标题背景，默认为墨蓝色条形科技背景。</li>
  </ul>

::: demo
```html
    <template>
        <p>选中的值: {{selectedData}}</p>   
        <CButton @click="isModalShow = !isModalShow">打开</CButton>
        <CTreeModal
            :list-data="listData"
            v-model="selectedData"
            :isShow="isModalShow"

            :title="title"

            @toggleShow="v => isModalShow= v"
            :reflectKey="{
                key: 'name',
                value: 'id'
            }"
            width="800"
            height="600"
            mask
            controllerColor="#fff"
            activeColor="#fff"
            ></CTreeModal>
    </template>
    <script>
    export default {
        name: 'SomeComponent',
        props: {},
        data(){
            return {
                isModalShow: false,
                title:'请选择人员',
                selectedData:[
                    {
                        id: '014557484S-1-0017',
                        name: '尼古拉斯.赵',
                    }
                ],
                listData:[
                    {
                        id: '014557484S',
                        name: '特殊事务部',
                        expand: true,
                        children:[
                            {
                                id: '014557484S-1',
                                name: '后勤',
                                children: [
                                    {
                                        id: '014557484S-1-0017',
                                        name: '尼古拉斯.赵',
                                    }
                                ],
                            },
                            {
                                id: '014557484S-2',
                                name: '业务部',
                                expand: true,
                                children:[
                                    {
                                        id: '014557484S-2-1',
                                        name: '一组',
                                    },
                                    {
                                        id: '014557484S-2-2',
                                        name: '二组',
                                        expand: true,
                                        children: [
                                             {
                                                id: '014557484S-2-2-0017',
                                                name: '谢广坤',
                                             },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],

            }           
        }
    }
    </script>
```
:::

#### 键值映射 reflectKey
---
  <ul>
    <li>控制映射键值。</li>
  </ul>

::: demo
```html
    <template>
        <p>选中的值: {{selectedData}}</p>   
        <CButton @click="isModalShow = !isModalShow">打开</CButton>
        <CTreeModal
            :list-data="listData"
            v-model="selectedData"
            :isShow="isModalShow"
            @toggleShow="v => isModalShow= v"
            :title="title"

            :reflectKey="{
                key: 'name',
                value: 'id'
            }"

            width="800"
            height="600"
            mask
            controllerColor="#fff"
            activeColor="#fff"
            ></CTreeModal>
    </template>
    <script>
    export default {
        name: 'SomeComponent',
        props: {},
        data(){
            return {
                isModalShow: false,
                title:'请选择什么',
                selectedData:[
                    {
                        id: '014557484S-1-0017',
                        name: '尼古拉斯.赵',
                    }
                ],
                listData:[
                    {
                        id: '014557484S',
                        name: '特殊事务部',
                        expand: true,
                        children:[
                            {
                                id: '014557484S-1',
                                name: '后勤',
                                children: [
                                    {
                                        id: '014557484S-1-0017',
                                        name: '尼古拉斯.赵',
                                    }
                                ],
                            },
                            {
                                id: '014557484S-2',
                                name: '业务部',
                                expand: true,
                                children:[
                                    {
                                        id: '014557484S-2-1',
                                        name: '一组',
                                    },
                                    {
                                        id: '014557484S-2-2',
                                        name: '二组',
                                        expand: true,
                                        children: [
                                             {
                                                id: '014557484S-2-2-0017',
                                                name: '谢广坤',
                                             },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],

            }           
        }
    }
    </script>
```
:::

#### 新增节点 addTreeNode
---
  <ul>
    <li>提供新增节点的方法，以<b>属性</b>方式传入。</li>
    <li>显示新增按钮及一个级联。</li>
    <li>需要使用conditionProps指定可添加项的真值。</li>
    <li>返回当前reflectKey对应的value和输入框中填入的值。</li>
    <li>返回当前reflectKey对应的value和输入框中填入的值。</li>
  </ul>

::: demo
```html
    <template>
        <p>选中的值: {{selectedData}}</p>   
        <CButton @click="isModalShow = !isModalShow">打开</CButton>
        <CTreeModal
            :list-data="listData"
            v-model="selectedData"
            :isShow="isModalShow"
            @toggleShow="v => isModalShow= v"
            :title="title"
            :reflectKey="{
                key: 'name',
                value: 'id'
            }"
            
            :add-tree-node="addTreeNode"
            condition-props="node"
            
            width="800"
            height="600"
            mask
            controllerColor="#fff"
            activeColor="#fff"
            ></CTreeModal>
    </template>
    <script>
    export default {
        name: 'SomeComponent',
        props: {},
        data(){
            return {
                isModalShow: false,
                title:'请选择什么',
                selectedData:[
                    {
                        id: '014557484S-1-0017',
                        name: '尼古拉斯.赵',
                    }
                ],
                listData:[
                    {
                        id: '014557484S',
                        name: '特殊事务部',
                        expand: true,
                        node: 1,
                        children:[
                            {
                                id: '014557484S-1',
                                name: '后勤',
                                node: 1,
                                children: [
                                    {
                                        id: '014557484S-1-0017',
                                        name: '尼古拉斯.赵',
                                    }
                                ],
                            },
                            {
                                id: '014557484S-2',
                                name: '业务部',
                                expand: true,
                                node: 1,
                                children:[
                                    {
                                        id: '014557484S-2-1',
                                        name: '一组',
                                        node: 1,
                                    },
                                    {
                                        id: '014557484S-2-2',
                                        name: '二组',
                                        expand: true,
                                        node: 1,
                                        children: [
                                             {
                                                id: '014557484S-2-2-0017',
                                                name: '谢广坤',
                                             },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],
            }           
        },
        methods:{
            addTreeNode(a){console.log(a)}
        }
    }
    </script>
```
:::


#### 多选 multiple
---
  <ul>
    <li>多选。</li>
    <li>如果只想选子节点，需要配合conditionProps,并在节点中指明可添加节点类型，真值时不可选中。</li>
  </ul>

::: demo
```html
    <template>
        <p>选中的值: {{selectedData}}</p>   
        <CButton @click="isModalShow = !isModalShow">打开</CButton>
        <CTreeModal
            :list-data="listData"
            v-model="selectedData"
            :isShow="isModalShow"
            @toggleShow="v => isModalShow= v"
            :title="title"
            :reflectKey="{
                key: 'name',
                value: 'id'
            }"
            multiple

            width="800"
            height="600"
            mask
            controllerColor="#fff"
            activeColor="#fff"
            ></CTreeModal>
    </template>
    <script>
    export default {
        name: 'SomeComponent',
        props: {},
        data(){
            return {
                isModalShow: false,
                title:'请选择什么',
                selectedData:[
                    {
                        id: '014557484S-1-0017',
                        name: '尼古拉斯.赵',
                    }
                ],
                listData:[
                    {
                        id: '014557484S',
                        name: '特殊事务部',
                        expand: true,
                        children:[
                            {
                                id: '014557484S-1',
                                name: '后勤',
                                children: [
                                    {
                                        id: '014557484S-1-0017',
                                        name: '尼古拉斯.赵',
                                    }
                                ],
                            },
                            {
                                id: '014557484S-2',
                                name: '业务部',
                                expand: true,
                                children:[
                                    {
                                        id: '014557484S-2-1',
                                        name: '一组',
                                    },
                                    {
                                        id: '014557484S-2-2',
                                        name: '二组',
                                        expand: true,
                                        children: [
                                             {
                                                id: '014557484S-2-2-0017',
                                                name: '谢广坤',
                                             },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],

            }           
        }
    }
    </script>
```
:::

  <ul>
    <li>显示多选框。</li>
  </ul>

::: demo
```html
    <template>
        <p>选中的值: {{selectedData}}</p>   
        <CButton @click="isModalShow = !isModalShow">打开</CButton>
        <CTreeModal
            :list-data="listData"
            v-model="selectedData"
            :isShow="isModalShow"
            @toggleShow="v => isModalShow= v"
            :title="title"
            :reflectKey="{
                key: 'name',
                value: 'id'
            }"
            multiple
            checkbox

            width="800"
            height="600"
            mask
            controllerColor="#fff"
            activeColor="#fff"
            ></CTreeModal>
    </template>
    <script>
    export default {
        name: 'SomeComponent',
        props: {},
        data(){
            return {
                isModalShow: false,
                title:'请选择什么',
                selectedData:[
                    {
                        id: '014557484S-1-0017',
                        name: '尼古拉斯.赵',
                    }
                ],
                listData:[
                    {
                        id: '014557484S',
                        name: '特殊事务部',
                        expand: true,
                        children:[
                            {
                                id: '014557484S-1',
                                name: '后勤',
                                children: [
                                    {
                                        id: '014557484S-1-0017',
                                        name: '尼古拉斯.赵',
                                    }
                                ],
                            },
                            {
                                id: '014557484S-2',
                                name: '业务部',
                                expand: true,
                                children:[
                                    {
                                        id: '014557484S-2-1',
                                        name: '一组',
                                    },
                                    {
                                        id: '014557484S-2-2',
                                        name: '二组',
                                        expand: true,
                                        children: [
                                             {
                                                id: '014557484S-2-2-0017',
                                                name: '谢广坤',
                                             },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],

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
  |isShow|truthy falsy|Boolean|false|显示|
  |title|String| String | ''|自定义标题|
  |titleImg|Object| Object | null|自定义标题背景|
  |reflectKey| Object | Object| {key: 'title', value: 'value'}|映射对象|
  |addTreeNode|Function| Function | null |显示新增按钮|
  |multiple|Boolean| Boolean | false |是否多选|
  |conditionProps|String| String | 'node' | 用于筛选节点中的值 |
  |class-name|无|String|''|组件最外层添加一个新的类名|
  |width|无|String|无|是否在该组件所有类前加前缀|
  |height|无|String|无|是否在该组件所有类前加前缀|
  |mask|无|String|无|是否在该组件所有类前加前缀|
  |prefix|无|String|无|是否在该组件所有类前加前缀|
  |prefix|无|String|无|是否在该组件所有类前加前缀|
  |prefix|无|String|无|是否在该组件所有类前加前缀|

#### 问答 QAQ
---
  <ul>
    <li><b>Q:</b> 可以多选吗？</li>
    <li><b>A:</b> 暂未提供多选功能，但该功能已在开发列表中。</li>
  </ul>

#### 归类 Answer
---
  <ul>
    <li><b>Q:</b></li>
  </ul>
