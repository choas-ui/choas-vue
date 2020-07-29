### 输入树形弹框 InputTreeModal
---
  <ul>
     <li><p>用以实现一个显示框与树形弹窗的互动。</p></li>
     <li><p>复合Tree,Cascade,Modal,Input,Icon组件,以上组件的大多数属性均可在本组件中使用。</p></li>
  </ul>
  
#### 基础 basic
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
               mask
               cancel
        />
    </template>
    <script>
        export default {
            data(){
                return{
                    canBeEdited: true,
                    selectedData:[{
                        id: '014557484S-2-2-0017',
                        name: '谢广坤',
                    }],
                    reflectKey: {
                        key: 'name',
                        value: 'id'
                    },
                    listData: [
                        {
                            id: '014557484S',
                            name: '特殊事务部',
                            expand: true,
                            node: 1,
                            children: [
                                {
                                    id: '014557484S-0',
                                    name: '指挥部',
                                    expand: true,
                                    node: 1,
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
                                    node: 1,
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
                                    node: 1,
                                    children: [
                                        {
                                            id: '014557484S-2-1',
                                            name: '一组',
                                            node: 1,
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
                                                    id: '014557484S-2-2-0019',
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

#### 多选 multiple
----
  <ul>
     <li>multiple 多选功能。</li>
     <li>condition-props控制树形和级联的不可选条件，condition-props为truthy树形列表用户不可选。</li>
     <li>多选时，点击父节点将会添加其子节点，现已实现正选反选功能。</li>
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
               mask
               cancel
               multiple
        />
    </template>
    <script>
        export default {
            data(){
                return{
                    canBeEdited: true,
                    selectedData: [{
                        id: '014557484S-2-2-0017',
                        name: '谢广坤',
                    }],
                    reflectKey: {
                        key: 'name',
                        value: 'id'
                    },
                    listData: [
                        {
                            id: '014557484S',
                            name: '特殊事务部',
                            expand: true,
                            node: 1,
                            children: [
                                {
                                    id: '014557484S-0',
                                    name: '指挥部',
                                    expand: true,
                                    node: 1,
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
                                    node: 1,
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
                                    node: 1,
                                    children: [
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
                                                {
                                                    id: '014557484S-2-2-0018',
                                                    name: '王小蒙',
                                                },
                                                {
                                                    id: '014557484S-2-2-0019',
                                                    name: '刘能',
                                                },
                                            ],
                                        },
                                    ]
                                },
                            ]
                        },
                    ],
                }
            },
        }
    </script>
```
:::

  <ul>
    <li>显示多选框。</li>
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
               mask
               cancel
               multiple
               checkbox
        />
    </template>
    <script>
        export default {
            data(){
                return{
                    canBeEdited: true,
                    selectedData: [{
                        id: '014557484S-2-2-0017',
                        name: '谢广坤',
                    }],
                    reflectKey: {
                        key: 'name',
                        value: 'id'
                    },
                    listData: [
                        {
                            id: '014557484S',
                            name: '特殊事务部',
                            expand: true,
                            node: 1,
                            children: [
                                {
                                    id: '014557484S-0',
                                    name: '指挥部',
                                    expand: true,
                                    node: 1,
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
                                    node: 1,
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
                                    node: 1,
                                    children: [
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
                                                {
                                                    id: '014557484S-2-2-0018',
                                                    name: '王小蒙',
                                                },
                                                {
                                                    id: '014557484S-2-2-0019',
                                                    name: '刘能',
                                                },
                                            ],
                                        },
                                    ]
                                },
                            ]
                        },
                    ],
                }
            },
        }
    </script>
```
:::


#### 新增树形节点 addTreeNode
---
  <ul>
     <li>addTreeNode新增树形节点。</li>
     <li>有时树形和级联的不可选条件可能不同，我们提供cascade-condition-props控制级联的不可选条件。cascade-condition-props为truthy级联中显示该项。</li>
     <li>placeholder新增树形节点的提示。</li>
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
               cascade-condition-props="type"
               @addTreeNode="addTreeNode"
        />
    </template>
    <script>
        export default {
            data(){
                return{
                    canBeEdited: true,
                    selectedData: [
                        {
                            label: '干燥箱',
                            value: "2",
                        }
                    ],
                    reflectKey: {
                        key: 'label',
                        value: 'value'
                    },
                    listData: [{"title":"十万分之一天平","label":"十万分之一天平","value":"1","type":1},{"title":"干燥箱","label":"干燥箱","value":"2","type":1},{"title":"生化培养箱","label":"生化培养箱","value":"3","type":0},{"title":"马弗炉","label":"马弗炉","value":"4","type":0},{"title":"高压灭菌器","label":"高压灭菌器","value":"5","type":0},{"title":"超净工作台","label":"超净工作台","value":"6","type":0},{"title":"离心机","label":"离心机","value":"7","type":0},{"title":"翻转振荡器","label":"翻转振荡器","value":"8","type":0},{"title":"PH计","label":"PH计","value":"0","type":0},{"title":"水平振荡器","label":"水平振荡器","value":"9","type":0},{"title":"球磨机","label":"球磨机","value":"10","type":0},{"title":"土壤筛分机","label":"土壤筛分机","value":"11","type":0},{"title":"消解器","label":"消解器","value":"12","type":0},{"title":"电热板","label":"电热板","value":"13","type":0},{"title":"旋转蒸发仪","label":"旋转蒸发仪","value":"14","type":0},{"title":"凝胶色谱净化仪","label":"凝胶色谱净化仪","value":"15","type":0},{"title":"氮吹仪","label":"氮吹仪","value":"16","type":0},{"title":"水质采样器","label":"水质采样器","value":"17","type":0},{"title":"空气采样器","label":"空气采样器","value":"18","type":0},{"title":"离子计","label":"离子计","value":"1","type":0},{"title":"烟尘（气）测试仪","label":"烟尘（气）测试仪","value":"19","type":0},{"title":"多路气体采样器","label":"多路气体采样器","value":"20","type":0},{"title":"综合烟气分析仪","label":"综合烟气分析仪","value":"21","type":0},{"title":"烟尘（气）测试校准仪","label":"烟尘（气）测试校准仪","value":"22","type":0},{"title":"孔口流量校准器","label":"孔口流量校准器","value":"23","type":0},{"title":"电子流量计","label":"电子流量计","value":"24","type":0},{"title":"声校准器","label":"声校准器","value":"25","type":0},{"title":"声级计","label":"声级计","value":"26","type":0},{"title":"环境振动分析仪","label":"环境振动分析仪","value":"27","type":0},{"title":"烟度计","label":"烟度计","value":"28","type":0},{"title":"浊度仪","label":"浊度仪","value":"2","type":0},{"title":"pH计","label":"pH计","value":"29","type":0},{"title":"离子计","label":"离子计","value":"30","type":0},{"title":"浊度仪","label":"浊度仪","value":"31","type":0},{"title":"电导率仪","label":"电导率仪","value":"32","type":0},{"title":"溶解氧仪","label":"溶解氧仪","value":"33","type":0},{"title":"水质采样器","label":"水质采样器","value":"34","type":0},{"title":"空气采样器","label":"空气采样器","value":"35","type":0},{"title":"烟尘（气）测试仪","label":"烟尘（气）测试仪","value":"36","type":0},{"title":"多路气体采样器","label":"多路气体采样器","value":"37","type":0},{"title":"综合烟气分析仪","label":"综合烟气分析仪","value":"38","type":0},{"title":"电导率仪","label":"电导率仪","value":"3","type":0},{"title":"烟尘（气）测试校准仪","label":"烟尘（气）测试校准仪","value":"39","type":0},{"title":"孔口流量校准器","label":"孔口流量校准器","value":"40","type":0},{"title":"电子流量计","label":"电子流量计","value":"41","type":0},{"title":"可见光分光光度计","label":"可见光分光光度计","value":"42","type":0},{"title":"紫外可见分光光度计","label":"紫外可见分光光度计","value":"43","type":0},{"title":"水质快速测定仪","label":"水质快速测定仪","value":"44","type":0},{"title":"原子荧光光度计","label":"原子荧光光度计","value":"45","type":0},{"title":"原子吸收分光光度计","label":"原子吸收分光光度计","value":"46","type":0},{"title":"气相色谱仪(ECD检测器)","label":"气相色谱仪(ECD检测器)","value":"47","type":0},{"title":"气相色谱仪(FID检测器)","label":"气相色谱仪(FID检测器)","value":"48","type":0},{"title":"气相色谱仪(NPD检测器)","label":"气相色谱仪(NPD检测器)","value":"49","type":0},{"title":"气相色谱仪(FPD检测器)","label":"气相色谱仪(FPD检测器)","value":"50","type":0},{"title":"气相色色谱-质质谱联用仪","label":"气相色色谱-质质谱联用仪","value":"51","type":0},{"title":"电杆耦合等离子体质谱仪","label":"电杆耦合等离子体质谱仪","value":"52","type":0},{"title":"ICP光谱仪","label":"ICP光谱仪","value":"53","type":0},{"title":"离子色谱仪","label":"离子色谱仪","value":"54","type":0},{"title":"测汞仪","label":"测汞仪","value":"55","type":0},{"title":"冷原子吸收测汞仪","label":"冷原子吸收测汞仪","value":"56","type":0},{"title":"液相色谱仪","label":"液相色谱仪","value":"57","type":0},{"title":"液相色谱质谱仪","label":"液相色谱质谱仪","value":"58","type":0},{"title":"红外分光测油仪","label":"红外分光测油仪","value":"59","type":0},{"title":"测硫仪","label":"测硫仪","value":"60","type":0},{"title":"总有机碳测定仪","label":"总有机碳测定仪","value":"61","type":0},{"title":"可吸附有机卤素","label":"可吸附有机卤素","value":"62","type":0},{"title":"离子色谱仪","label":"离子色谱仪","value":"63","type":0},{"title":"X射线荧光光谱仪","label":"X射线荧光光谱仪","value":"64","type":0},{"title":"全自动烷基汞测定仪","label":"全自动烷基汞测定仪","value":"65","type":0},{"title":"气相分子吸收光谱仪","label":"气相分子吸收光谱仪","value":"66","type":0},{"title":"空气微生物采样器","label":"空气微生物采样器","value":"67","type":0},{"title":"显微镜","label":"显微镜","value":"68","type":0},{"title":"原子荧光形态分析仪","label":"原子荧光形态分析仪","value":"69","type":0},{"title":"红外气体分析仪","label":"红外气体分析仪","value":"70","type":0},{"title":"激光测距仪","label":"激光测距仪","value":"71","type":0},{"title":"面积/流速流量仪","label":"面积/流速流量仪","value":"72","type":0},{"title":"傅立叶红外气体测定仪","label":"傅立叶红外气体测定仪","value":"73","type":0},{"title":"酶底物封口机","label":"酶底物封口机","value":"74","type":0},{"title":"土壤水份测定仪","label":"土壤水份测定仪","value":"75","type":0},{"title":"jaibc","label":"jaibc","value":"0","type":0},{"title":"非得喝功夫茶","label":"非得喝功夫茶","value":"0","type":0},{"title":"万分之一天平","label":"万分之一天平","value":"0","type":0}],
                }
            },
            methods:{
                 addTreeNode(v){
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
               line
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
                            node: true,
                            children: [
                                {
                                    id: '014557484S-0',
                                    name: '指挥部',
                                    expand: true,
                                    node: true,
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
                                    node: true,
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
                                    node: true,
                                    children: [
                                        {
                                            id: '014557484S-2-1',
                                            name: '一组',
                                            node: true,
                                        },
                                        {
                                            id: '014557484S-2-2',
                                            name: '二组',
                                            expand: true,
                                            node: true,
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
                                                    id: '014557484S-2-2-0019',
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

#### 标题与背景图 title&titleImg
---
  <ul>
     <li>提供可变的标题与标题背景。</li>
  </ul>

:::demo
```html
    <template>
        <CInputTreeModal
               :canBeEdited="canBeEdited"
               :list-data="listData"
               :reflectKey="reflectKey"
               v-model="selectedData"
               title="可变的标题"
    
               mask
               line
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
                            node: true,
                            children: [
                                {
                                    id: '014557484S-0',
                                    name: '指挥部',
                                    expand: true,
                                    node: true,
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
                                    node: true,
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
                                    node: true,
                                    children: [
                                        {
                                            id: '014557484S-2-1',
                                            name: '一组',
                                            node: true,
                                        },
                                        {
                                            id: '014557484S-2-2',
                                            name: '二组',
                                            expand: true,
                                            node: true,
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
                                                    id: '014557484S-2-2-0019',
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

