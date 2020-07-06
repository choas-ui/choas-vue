#### 树形
---
使用双向绑定的树

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
                type="svg"
                icon-name="choas-square-add"
            />
            <Icon
                slot="file-icon"
                type="svg"
                icon-name="choas-file-lists"/>
            <Icon
                slot="tail"
                type="svg"
                icon-name="choas-square-add"
            />
        </Tree>
    </template>
<script>
export default {
    data(){
        return {
            listData:{
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
                                value: '0-1-1',
                            }
                        ]
                    },
                ]
            },
            selectData:[],
        }
    }
}
</script>
```
:::

#### 树形数据
---
#### 选中数据
---
选中数据双向绑定

#### 默认展开
---
#### 返回
---
#### 图标
---
#### 连接线 line
---
#### 旋转参数
---
#### 搜索
---
所有标签打开，内容标红
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
