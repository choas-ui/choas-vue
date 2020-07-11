### 输入树形弹框
---
  <p>用以实现一个显示框与树形弹窗的互动。</p>
  <p>复合Tree,Cascade,Modal,Input,Icon组件,以上组件的大多数属性均可在本组件中使用。</p>
  
#### 基础用法
----
  <ul>
     <li>v-model <span>实现双向绑定。</span></li>
     <li>reflect-key <span>键值映射。</span></li>
     <li>can-be-edited <span>模式切换。</span></li>
     <li>title <span>标题更换。</span></li>
  </ul>

:::demo
```html
    <template>
        <CInputTreeModal
               :list-data="listData"
               v-model="selectedData"
               :can-be-edited="canBeEdited"
               :reflect-key="reflectKey"
               title="请选择机构"
        />
    </template>
    <script>
        export default {
            data(){
                return{
                    canBeEdited: true,
                    selectedData: [
                        {
                            id: '014557484S-2-2-0017',
                            name: '谢广坤',
                        }
                    ],
                    reflectKey: {
                        key: 'name',
                        value: 'id'
                    },
                    listData: [
                        {
                            id: '014557484S',
                            name: '特殊事务部',
                            expand: true,
                            children: [
                                {
                                    id: '014557484S-0',
                                    name: '指挥部',
                                    expand: true,
                                    children: [
                                        {
                                            id: '014557484S-0-007',
                                            name: '谢永强',
                                        },
                                        {
                                            id: '014557484S-0-008',
                                            name: '谢大脚',
                                        },
                                    ],
                                },
                                {
                                    id: '014557484S-1',
                                    name: '后勤',
                                    expand: true,
                                    children: [
                                        {
                                            id: '014557484S-1-0017',
                                            name: '尼古拉斯.赵',
                                        },
                                        {
                                            id: '014557484S-1-0019',
                                            name: '王常规',
                                        },
                                        
                                    ],
                                },
                                {
                                    id: '014557484S-2',
                                    name: '业务部',
                                    expand: true,
                                    children: [
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
                                                {
                                                    id: '014557484S-2-2-0018',
                                                    name: '王小蒙',
                                                },
                                                {
                                                    id: '014557484S-2-2-0018',
                                                    name: '刘能',
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
        }
    </script>
```
:::

#### 新增树形节点 getListData
---
  <ul>
     <li><p>getListData 新增树形节点。</p></li>
     <li><p>condition-props 用户不可选，不可见不满足条件的该项。</p></li>
     <li><p>placeholder 新增树形节点的提示。</p></li>
  </ul>
  
:::demo
```html
    <template>
        <CInputTreeModal
               :can-be-edited="canBeEdited"
               :list-data="listData"
               :reflect-key="reflectKey"
               v-model="selectedData"
               title="请选择机构"
    
               placeholder="请选择机构节点"
               condition-props="type"
               @getListData="getListData"
        />
    </template>
    <script>
        export default {
            data(){
                return{
                    canBeEdited: true,
                    selectedData: [
                        {
                            id: '014557484S-2-2-0017',
                            name: '谢广坤',
                        }
                    ],
                    reflectKey: {
                        key: 'name',
                        value: 'id'
                    },
                    listData: [
                        {
                            id: '014557484S',
                            name: '特殊事务部',
                            expand: true,
                            type: true,
                            children: [
                                {
                                    id: '014557484S-0',
                                    name: '指挥部',
                                    expand: true,
                                    type: true,
                                    children: [
                                        {
                                            id: '014557484S-0-007',
                                            name: '谢永强',
                                        },
                                        {
                                            id: '014557484S-0-008',
                                            name: '谢大脚',
                                        },
                                    ],
                                },
                                {
                                    id: '014557484S-1',
                                    name: '后勤',
                                    expand: true,
                                    type: true,
                                    children: [
                                        {
                                            id: '014557484S-1-0017',
                                            name: '尼古拉斯.赵',
                                        },
                                        {
                                            id: '014557484S-1-0019',
                                            name: '王常规',
                                        },
                                        
                                    ],
                                },
                                {
                                    id: '014557484S-2',
                                    name: '业务部',
                                    expand: true,
                                    type: true,
                                    children: [
                                        {
                                            id: '014557484S-2-1',
                                            name: '一组',
                                        },
                                        {
                                            id: '014557484S-2-2',
                                            name: '二组',
                                            expand: true,
                                            type: true,
                                            children: [
                                                {
                                                    id: '014557484S-2-2-0017',
                                                    name: '谢广坤',
                                                },
                                                {
                                                    id: '014557484S-2-2-0018',
                                                    name: '王小蒙',
                                                },
                                                {
                                                    id: '014557484S-2-2-0018',
                                                    name: '刘能',
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
                 getListData(v){
                    console.log(v)
                 },
            } 
        }
    </script>
```
:::

#### 按钮文字 buttonTxt
---
  <ul>
     <li><p>button-txt 改为按钮互动,显示框不再直接控制弹窗，交由按钮控制弹窗</p></li>
  </ul>

:::demo
```html
    <template>
        <CInputTreeModal
               :canBeEdited="canBeEdited"
               :list-data="listData"
               :reflectKey="reflectKey"
               v-model="selectedData"
               title="请选择机构"
    
               button-txt="选择机构"
               mask
        />
    </template>
    <script>
        export default {
            data(){
                return{
                    canBeEdited: true,
                    selectedData: [
                        {
                            id: '014557484S-2-2-0017',
                            name: '谢广坤',
                        }
                    ],
                    reflectKey: {
                        key: 'name',
                        value: 'id'
                    },
                    listData: [
                        {
                            id: '014557484S',
                            name: '特殊事务部',
                            expand: true,
                            children: [
                                {
                                    id: '014557484S-0',
                                    name: '指挥部',
                                    expand: true,
                                    children: [
                                        {
                                            id: '014557484S-0-007',
                                            name: '谢永强',
                                        },
                                        {
                                            id: '014557484S-0-008',
                                            name: '谢大脚',
                                        },
                                    ],
                                },
                                {
                                    id: '014557484S-1',
                                    name: '后勤',
                                    expand: true,
                                    children: [
                                        {
                                            id: '014557484S-1-0017',
                                            name: '尼古拉斯.赵',
                                        },
                                        {
                                            id: '014557484S-1-0019',
                                            name: '王常规',
                                        },
                                        
                                    ],
                                },
                                {
                                    id: '014557484S-2',
                                    name: '业务部',
                                    expand: true,
                                    children: [
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
                                                {
                                                    id: '014557484S-2-2-0018',
                                                    name: '王小蒙',
                                                },
                                                {
                                                    id: '014557484S-2-2-0018',
                                                    name: '刘能',
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
