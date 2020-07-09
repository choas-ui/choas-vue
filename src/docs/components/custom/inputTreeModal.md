### 输入树形弹框
---
  <p>用以实现一个显示框与树形弹窗的互动。</p>
  <p>button-text</p>
  
#### 基本使用
----
:::demo
```html
    <InputTreeModal
           :list-data="listData"
           v-model="selectedData"
           :canBeEdited="canBeEdited"
           :reflectKey="reflectKey"
           placeholder="请选择机构"
           title="请选择机构"
           mask
    />
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
                    listData: {
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
                    },
                }
            },
            methods:{
                 addTreeList(){
                    return  new Promise(resolve => {
                        console.log(123)
                        resolve({})
                    })
                 },
                 getListData(v){
                    console.log(v)
                 },
            } 
        }
    </script>
```
:::

#### 双向绑定 selectedData
----
  <p>直接返回一个选定的值，不再需要传入路径。</p>
  
:::demo
```html
    <p>{{selectedData}}</p>
    <InputTreeModal
           :list-data="listData"
           v-model="selectedData"
           :canBeEdited="canBeEdited"
           :reflectKey="reflectKey"
           placeholder="请选择机构"
           title="请选择机构"
           mask
           :addTreeList="addTreeList"
           @getListData="getListData"
    />
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
                    listData: {
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
                    },
                }
            },
            methods:{
                 addTreeList(){
                    return  new Promise(resolve => {
                        console.log(123)
                        resolve({})
                    })
                 },
                 getListData(v){
                    console.log(v)
                 },
            } 
        }
    </script>
```
:::


#### 收束条件 conditionProps
---
  <p>用户不可选，不可见不满足条件的该项。</p>

----
:::demo
```html
    <InputTreeModal
           :canBeEdited="canBeEdited"
           :list-data="listData"
           :reflectKey="reflectKey"
           v-model="selectedData"
           placeholder="请选择机构"
           title="请选择机构"
           conditionProps="type"
           mask
           :addTreeList="addTreeList"
           @getListData="getListData"
    />
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
                    listData: {
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
                    },
                }
            },
            methods:{
                 addTreeList(){
                    return  new Promise(resolve => {
                        console.log(123)
                        resolve({})
                    })
                 },
                 getListData(v){
                    console.log(v)
                 },
            } 
        }
    </script>
```
:::

#### 修改树形 addTreeList
---
  <p>以属性的形式传入一个返回promise的请求函数。</p>
  <p>如果需要返回值，可以使用getListData获取。</p>

----
:::demo
```html
    <InputTreeModal
           :canBeEdited="canBeEdited"
           :list-data="listData"
           :reflectKey="reflectKey"
           v-model="selectedData"
           placeholder="请选择机构"
           title="请选择机构"
           mask
           :addTreeList="addTreeList"
           @getListData="getListData"
    />
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
                    listData: {
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
                    },
                }
            },
            methods:{
                 addTreeList(){
                    return  new Promise(resolve => {
                        console.log(123)
                        resolve({})
                    })
                 },
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
  <p>选择按钮互动。</p>
  <p>显示框不再直接控制弹窗，交由按钮控制弹窗。</p>

#### 基本使用
----
:::demo
```html
    <InputTreeModal
           :canBeEdited="canBeEdited"
           :list-data="listData"
           :reflectKey="reflectKey"
           v-model="selectedData"
           placeholder="请选择机构"
           title="请选择机构"
           mask
           button-txt="请选择机构"
           :addTreeList="addTreeList"
           @getListData="getListData"
    />
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
                    listData: {
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
                    },
                }
            },
            methods:{
                 addTreeList(){
                    return  new Promise(resolve => {
                        console.log(123)
                        resolve({})
                    })
                 },
                 getListData(v){
                    console.log(v)
                 },
            } 
        }
    </script>
```
:::  
