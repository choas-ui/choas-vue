### 级联
---
  <ul>
      <li>点击收起逻辑指令化。</li>
  </ul>


#### 数据源 listData
::: demo
```html
  <template>
    <CCascade :list-data="listData"
      v-model="selectedData"
      :reflectKey="{
          key: 'name',
          value: 'id'
      }"
      :placeholder="placeholder"
      :conditionProps="conditionProps"
      ></CCascade>
  </template>
    <script>
    export default {
        name: 'SomeComponent',
        props: {},
        data(){
            return {
                placeholder:'请选择机构',
                conditionProps:'node',
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
                                        node: 1,
                                        children: [
                                             {
                                                id: '014557484S-2-2-0017',
                                                name: '谢广坤',
                                                node: 1,
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
