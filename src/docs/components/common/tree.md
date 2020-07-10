#### 树形组件
---
  <small>
    层次分明的可选择控件。
  </small>

#### 数据 listData
---
  <ul>
    <li>listData 数组。</li>
    <li>expand 默认展开。</li>
  </ul>

:::demo
```html
    <template>
        <Tree
            fileIcon
            :list-data="listData"
        >
        </Tree>
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
   <small>
     数据中的expand控制默认展开。
   </small> 

:::demo
```html
    <template>
        <Tree
            fileIcon
            :list-data="listData"
        >
        </Tree>
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
   <small>
     <p>双向绑定的数据。</p>
     <p>返回的数据格式与初始值一致。</p>
     <p>返回的值与reflectKey相关。</p>
   </small> 
   
:::demo
```html
    <template>
        <p>{{ selectData }}</p>
        <Tree
            fileIcon
            :list-data="listData"
            v-model="selectData"
        >
        </Tree>
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
   <small>
     用于指定映射键、值关联。
   </small> 

:::demo
```html
    <template>
        <Tree
            :list-data="listData"
            :reflectKey="{
                key: 'name',
                value: 'id'
            }"
        >
        </Tree>
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
   <small>
     显示数据间的层级连线。
   </small> 
   
:::demo
```html
    <template>
        <Tree
            line
            :list-data="listData"
            v-model="selectData"
        >
        </Tree>
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
   <small>
     <p>作为属性出现的fileIcon会显示默认图标。</p>
     <p>作为插槽出现的file-icon会替换默认图标。</p>
     <p>目前不支持多种Icon。</p>
   </small> 
   
:::demo
```html
    <template>
        <Tree
            fileIcon
            :list-data="listData"
            v-model="selectData"
        >
        </Tree>
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
        <Tree
            fileIcon
            :list-data="listData"
            v-model="selectData"
        >
            <Icon
                slot="file-icon"
                icon-name="choas-lists"/>
        </Tree>
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

#### 搜索 searchStr
---
   <small>
     <p>可搜索的tree。</p>
     <p>给定markColor标注搜索到的字体颜色。</p>
   </small> 
   
:::demo
```html
    <template>
        <input v-model="searchStr"/>
        <Tree
            fileIcon
            :list-data="listData"
            v-model="selectData"
            :search-str="searchStr"
        >
        </Tree>
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



完成后删除示例↓↓↓↓↓
:::demo
```html
    <template>
        <Tree
            fileIcon
            line
            :list-data="listData"
            :selectData="selectData"
        >
            <Icon
                slot="icon-mark"
                icon-name="choas-square-add"
            />
            <Icon
                slot="file-icon"
                icon-name="choas-file-icon"/>
            <Icon
                slot="tail"
                color="red"
                icon-name="choas-square-add"
            />
        </Tree>
    </template>
<script>
export default {
    data(){
        return {
            listData:[
                 {
                    title: '0',
                    value: '0',
                    children:[
                        {
                            title: '0-0',
                            value: '0-0',
                        },
                        {
                            title: '0-1',
                            value: '0-1',
                            children:[
                                {
                                    title: '0-1-0',
                                    value: '0-1-0',
                                },
                                {
                                    title: '0-1-1',
                                    value: '0-1-1',
                                    children: [
                                         {
                                            title: '0-1-1-0',
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
