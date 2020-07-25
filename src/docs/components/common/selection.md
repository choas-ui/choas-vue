#### 下拉框
---
  <ul>
    <li>点击收起逻辑指令化。</li>
  </ul>

:::demo
```html
    <template>
        <p>{{selectedValue}}</p>   
        <div>
            <CSelection :list-data="listData" v-model="selectedValue" />
        </div>   
    </template>
    <script>
        export default {
            name: 'SomeComponent',
            data(){
                return {
                    listData: [
                        {title: '苹果', value: '0'},
                        {title: '橘子', value: '1'},
                        {title: '香蕉', value: '2'},
                    ],
                    selectedValue: [{title: '苹果', value: '0'}],
                }
            }
        }
    </script>
```
:::
