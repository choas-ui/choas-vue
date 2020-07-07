### 树形弹窗
---

::: demo
```html
    <template>
        <TreeModal :list-data="listData"
            :reflectKey="{
                key: 'name',
                value: 'id'
            }"></TreeModal>
    </template>
    <script>
    export default {
        name: 'SomeComponent',
        props: {},
        data(){
            return {
                listData:{
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
                },

            }           
        },
    }
    </script>
```
:::
