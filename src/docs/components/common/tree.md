#### 树形组件
---
层次分明的可选择控件。

#### 数据 listData
---
  <ul>
    <li>listData 数组。</li>
    <li>expand 默认展开。</li>
  </ul>

:::demo
```html
    <template>
        <CTree
            fileIcon
            :list-data="listData"
        >
        </CTree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                 {
                      key: '颜色',
                      value: '0',
                      expand: true,
                      children:[
                          {
                              key: '冷色',
                              value: '0-0',
                              expand: true,
                          },
                          {
                              key: '暖色',
                              value: '0-1',
                              expand: true,
                              children:[
                                  {
                                      key: '红色',
                                      value: '0-1-0',
                                  },
                                  {
                                      key: '橙色',
                                      value: '0-1-1',
                                      expand: true,
                                      children: [
                                           {
                                              key: '橙红',
                                              value: '0-1-1-0',
                                           },
                                      ],
                                  },
                              ]
                          },
                      ]
                 }
            ]
        }
    }
}
</script>
```
:::

#### 展开 expand
---
  数据中的expand控制默认展开。

:::demo
```html
    <template>
        <CTree
            fileIcon
            :list-data="listData"
        >
        </CTree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                 {
                      key: '颜色',
                      value: '0',
                      expand: true,
                      children:[
                          {
                              key: '冷色',
                              value: '0-0',
                              expand: true,
                          },
                          {
                              key: '暖色',
                              value: '0-1',
                              expand: true,
                              children:[
                                  {
                                      key: '红色',
                                      value: '0-1-0',
                                  },
                                  {
                                      key: '橙色',
                                      value: '0-1-1',
                                      expand: true,
                                      children: [
                                           {
                                              key: '橙红',
                                              value: '0-1-1-0',
                                           },
                                      ],
                                  },
                              ]
                          },
                      ]
                 }
            ]
        }
    }
}
</script>
```
:::

#### 双向绑定 v-model  (未完成，目前不返回值)
---
  <p>双向绑定的数据。</p>
  <p>返回的数据格式与初始值一致。</p>
  <p>返回的值与reflectKey相关。</p>

   
:::demo
```html
    <template>
        <p>{{ selectData }}</p>
        <CTree
            fileIcon
            :list-data="listData"
            v-model="selectData"
        >
        </CTree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                 {
                      key: '颜色',
                      value: '0',
                      expand: true,
                      children:[
                          {
                              key: '冷色',
                              value: '0-0',
                              expand: true,
                          },
                          {
                              key: '暖色',
                              value: '0-1',
                              expand: true,
                              children:[
                                  {
                                      key: '红色',
                                      value: '0-1-0',
                                  },
                                  {
                                      key: '橙色',
                                      value: '0-1-1',
                                      expand: true,
                                      children: [
                                           {
                                              key: '橙红',
                                              value: '0-1-1-0',
                                           },
                                      ],
                                  },
                              ]
                          },
                      ]
                 }
            ],
            selectData:[],
        }
    }
}
</script>
```
:::

#### 数据关联 reflectKey
---
  用于指定映射键、值关联。


:::demo
```html
    <template>
        <CTree
            :list-data="listData"
            :reflectKey="{
                key: 'name',
                value: 'id'
            }"
        >
        </CTree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                {
                    id: '014557484S',
                    name: '特殊事务部',
                    expand: true,
                    children:[
                        {
                            id: '014557484S-1',
                            name: '后勤',
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
            selectData:[],
        }
    }
}
</script>
```
:::

#### 显示连线 line
---
  显示数据间的层级连线。
   
:::demo
```html
    <template>
        <CTree
            line
            :list-data="listData"
            v-model="selectData"
        >
        </CTree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                {
                    key: '颜色',
                    value: '0',
                    expand: true,
                    children:[
                        {
                            key: '冷色',
                            value: '0-0',
                        },
                        {
                            key: '暖色',
                            value: '0-1',
                            expand: true,
                            children:[
                                {
                                    key: '红色',
                                    value: '0-1-0',
                                },
                                {
                                    key: '橙色',
                                    value: '0-1-1',
                                    expand: true,
                                    children: [
                                         {
                                            key: '橙红',
                                            value: '0-1-1-0',
                                         },
                                    ],
                                },
                            ]
                        },
                    ]
                }
            ],
            selectData:[],
        }
    }
}
</script>
```
:::

#### 类型图标 fileIcon
---
  <p>作为属性出现的fileIcon会显示默认图标。</p>
  <p>作为插槽出现的file-icon会替换默认图标。</p>
  <p>目前不支持多种Icon。</p>
   
:::demo
```html
    <template>
        <CTree
            fileIcon
            :list-data="listData"
            v-model="selectData"
        >
        </CTree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                 {
                    key: '颜色',
                    value: '0',
                    expand: true,
                    children:[
                        {
                            key: '冷色',
                            value: '0-0',
                        },
                        {
                            key: '暖色',
                            value: '0-1',
                            expand: true,
                            children:[
                                {
                                    key: '红色',
                                    value: '0-1-0',
                                },
                                {
                                    key: '橙色',
                                    value: '0-1-1',
                                    expand: true,
                                    children: [
                                         {
                                            key: '橙红',
                                            value: '0-1-1-0',
                                         },
                                    ],
                                },
                            ]
                        },
                    ]
                }
            ],
            selectData:[],
        }
    }
}
</script>
```
:::

:::demo
```html
    <template>
        <CTree
            fileIcon
            :list-data="listData"
            v-model="selectData"
        >
            <CIcon
                slot="file-icon"
                icon-name="choas-lists"
            />
        </CTree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                {
                    key: '颜色',
                    value: '0',
                    expand: true,
                    children:[
                        {
                            key: '冷色',
                            value: '0-0',
                        },
                        {
                            key: '暖色',
                            value: '0-1',
                            expand: true,
                            children:[
                                {
                                    key: '红色',
                                    value: '0-1-0',
                                },
                                {
                                    key: '橙色',
                                    value: '0-1-1',
                                    expand: true,
                                    children: [
                                         {
                                            key: '橙红',
                                            value: '0-1-1-0',
                                         },
                                    ],
                                },
                            ]
                        },
                    ]
                }
            ],
            selectData:[],
        }
    },
}
</script>
```
:::

#### 搜索 searchStr
---
  <p>可搜索的tree。</p>
  <p>给定markColor标注搜索到的字体颜色。</p>
   
:::demo
```html
    <template>
        <input v-model="searchStr"/>
        <CTree
            fileIcon
            :list-data="listData"
            v-model="selectData"
            :search-str="searchStr"
        >
        </CTree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                {
                    key: '颜色',
                    value: '0',
                    expand: true,
                    children:[
                        {
                            key: '冷色',
                            value: '0-0',
                        },
                        {
                            key: '暖色',
                            value: '0-1',
                            expand: true,
                            children:[
                                {
                                    key: '红色',
                                    value: '0-1-0',
                                },
                                {
                                    key: '橙色',
                                    value: '0-1-1',
                                    children: [
                                         {
                                            key: '橙红',
                                            value: '0-1-1-0',
                                         },
                                    ],
                                },
                            ]
                        },
                    ]
                }
            ],
            selectData:[],
            searchStr:'',
        }
    }
}
</script>
```
:::

#### 后置操作按钮组 tail
---
  <p>后置操作按钮组。</p>
  <p>返回当前行数据及event。</p>

:::demo
```html
    <template>
        <CTree
            fileIcon
            :list-data="listData"
            v-model="selectData"
        >
            <CIcon
                slot="icon-mark"
                icon-name="choas-square-add"
            />
            <CIcon
                slot="file-icon"
                icon-name="choas-lists"/>
            <template slot="tails">
                <CIcon
                    color="red"
                    icon-name="choas-square-add"
                    @click="logs"
                />
                <CIcon
                    color="red"
                    icon-name="choas-delete"
                    @click="logs"
                />
            </template>
        </CTree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                {
                    key: '颜色',
                    value: '0',
                    expand: true,
                    children:[
                        {
                            key: '冷色',
                            value: '0-0',
                        },
                        {
                            key: '暖色',
                            value: '0-1',
                            expand: true,
                            children:[
                                {
                                    key: '红色',
                                    value: '0-1-0',
                                },
                                {
                                    key: '橙色',
                                    value: '0-1-1',
                                    children: [
                                         {
                                            key: '橙红',
                                            value: '0-1-1-0',
                                         },
                                    ],
                                },
                            ]
                        },
                    ]
                }
            ],
            selectData:[],
            searchStr:'',
        }
    },
    methods:{
        logs(a,b,c){console.log(a,b,c)}
    },
}
</script>
```
:::

#### 旋转参数 rotateSetting
---

#### 新增
---

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
