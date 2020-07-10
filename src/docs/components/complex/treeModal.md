### 树形弹窗
---

::: demo
```html
    <template>
        <p>选中的值: {{selectedData}}</p>   
        <CButton @click="isModalShow = !isModalShow">打开</CButton>
        <CTreeModal :list-data="listData"
            :title="title"
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
            draggable
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
                title:'机构',
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
