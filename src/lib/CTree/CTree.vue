<script>
    import _ from 'lodash'
    import CTreeUl from "./CTreeUl";

    export default {
        name: 'CTree',
        components: {
            CTreeUl
        },
        function: true,
        props: {
            listData: {
                type: Array,
                default() {
                    return []
                }
            },
            reflectKey: {
                type: Object,
                default() {
                    return {
                        key: 'key',
                        value: 'value'
                    }
                }
            },
            markColor: {
                type: String,
                default() {
                    return '#ff5e5c'
                }
            },
            className: {
                type: String,
                default() {
                    return ''
                }
            },
            prefix: {
                type: String,
                default() {
                    return ''
                }
            },
            // 显示连线
            line: {
                type: Boolean
            },
            // 多选模式
            multiple: {
                type: Boolean
            },
            // 显示checkbox
            checkbox: {
                type: Boolean
            },
            // 展开图标左间距
            markIconFixMarginLeft: {
                type: Number,
                default() {
                    return 0
                }
            },
            // 文件标识图标左间距
            fileIconFixMargin: {
                type: Number,
                default() {
                    return 0
                }
            },
            // 是否显示尾部控制
            controllers: {
                type: Boolean,
            },
            searchStr: {
                type: String,
                default() {
                    return ''
                }
            },
            conditionProps: {
                type: String,
                default() {
                    return 'node'
                }
            },
            editTreeNode: {
                type: Function
            }
        },
        model: {
            props: 'value',
            event: 'change'
        },
        data() {
            return {
                copyListData: {}, // 备份数据
                treeUlData: {}, // 渲染list
                copySelectedData: {}, // 渲染已选数据
                editItemId: '', // 在编辑元素位置编码
                addItemId: '', // 在添加元素位置编码
            }
        },
        methods: {
            // 记录在编辑位置
            changeEditItemId(v) {
                this.editItemId = v
            },
            // 记录在添加位置
            changeAddItemId(v) {
                this.addItemId = v
            },
            setParentNodeValue(data, path, isCancel) {
                const pathArr = path.split('-')
                while (pathArr.length) {
                    const parentNode = _.get(data, pathArr.join('.children.'), {children: []})
                    if (isCancel) {
                        this.$set(parentNode, 'checked', false)
                        if ((parentNode.children || []).some(item => item.checked || item.halfChecked)) {
                            this.$set(parentNode, 'halfChecked', true)
                        } else {
                            this.$set(parentNode, 'halfChecked', false)
                        }
                    } else {
                        if ((parentNode.children || []).length) {
                            if (parentNode.children.length === 1 || parentNode.children.every(item => item.checked)) {
                                this.$set(parentNode, 'checked', true)
                                delete parentNode.halfChecked
                            } else {
                                this.$set(parentNode, 'halfChecked', true)
                            }
                        }
                    }
                    pathArr.pop()
                }
            },
            // 标记数据结构 同步数据 非常耗费时间
            markIdentifyAndSyncData(listData, data, selectData, parentId = '') {
                data.forEach((item, index) => {
                    const selfPath = parentId + index
                    item._c_tree_self_id = selfPath
                    // 设置父元素属性
                    if (selectData.length) {
                        const findIndex = selectData.findIndex(select => select[this.reflectKey['value']] === item[this.reflectKey['value']])
                        if (findIndex > -1) {
                            const length = selfPath.length - 2 > 0 ? selfPath.length - 2 : 0
                            const pPath = selfPath.slice(0, length)
                            this.$set(item, 'checked', true)
                            this.setAllChildrenNodeValue(item)
                            // 尽量减少重复次数
                            selectData.splice(index, 1)
                            if (pPath) {
                                this.setParentNodeValue(listData, pPath, true)
                            }
                        }
                    }
                    if ((item.children || []).length) {
                        // 编辑数据结构
                        this.markIdentifyAndSyncData(listData, item.children, selectData, item._c_tree_self_id + '-')
                    }
                })
            },
            // 获取所有被选取的子节点
            setAllChildrenNodeValue(data, isCancel) {
                (data.children || []).forEach(item => {
                    this.$set(item, 'checked', !isCancel)
                    this.setAllChildrenNodeValue(item, isCancel)
                })
                delete data.halfChecked
            },
            // 获取当前选择值 返回给双向绑定
            getAllCheckedValue(copyListData, res = []) {
                (copyListData || []).forEach(item => {
                    if (item.checked || item.halfChecked) {
                        this.getAllCheckedValue(item.children, res);
                        if (item.checked && !item[this.conditionProps]) {
                            res.push(item)
                        }
                    }
                })
                return res
            },
            // 筛选数据
            filterData(data,v){
                let key = this.reflectKey['key']
                for (let i = 0; i <data.length ; i++) {
                    let item = data[i]
                    item.expand= true
                    if((item.children || []).length){
                        this.filterData(item.children, v)
                    }
                    if(!(item.children || []).length){
                        delete item.children
                        if(item[key].indexOf(v)<0){
                            data.splice(i,1)
                            i--
                        }
                    }
                }
                return data
            },
        },
        watch: {
            listData: {
                handler(v) {
                    if (!_.isEqual(v, this.copyListData)) {
                        // 同步listData已选值设置checked属性,向上递归设置父节点属性
                        // TODO 该操作比较耗费性能 以后优化
                        this.markIdentifyAndSyncData(v, v, _.cloneDeep(this.$attrs.value))
                        this.$set(this, 'copyListData', _.cloneDeep(v))
                        this.$set(this, 'treeUlData', _.cloneDeep(v))
                        // 同步已选值统一设置checked属性
                        const value = _.cloneDeep(this.getAllCheckedValue(v))
                        value.forEach(item => {
                            delete item.children
                            delete item._c_tree_self_id
                        })
                        this.$emit('change', value)
                    }
                },
                deep: true,
                immediate: true
            },
            searchStr(v){
                if(v){
                    this.$set(this, 'treeUlData', this.filterData(this.treeUlData, v))
                }else{
                    this.$set(this, 'treeUlData', _.cloneDeep(this.copyListData))

                }
            }
        },
        render(h) {
            return h('CTreeUl',
                {
                    attrs: {
                        ...this.$attrs
                    },
                    props: {
                        lineStartLv: 0,
                        _c_tree_parent_id: '',
                        listData: this.treeUlData,
                        line: this.line,
                        reflectKey: this.reflectKey,
                        searchStr: this.searchStr,
                        controllers: this.controllers,
                        fileIconFixMargin: this.fileIconFixMargin,
                        markIconFixMarginLeft: this.markIconFixMarginLeft,
                        multiple: this.multiple, // 多选
                        checkbox: this.checkbox, // 显示选择框
                        conditionProps: this.conditionProps, // 不可选条件
                        setParentNodeValue: this.setParentNodeValue, // 设置父元素值
                        editTreeNode: this.editTreeNode, // 编辑节点
                        editItemId: this.editItemId, // 在编辑状态的id
                        addItemId: this.addItemId, // 在添加状态的id
                    },
                    on: {
                        ...this.$listeners,
                        changeEditItemId: (v) => {
                            this.changeEditItemId(v)
                        },
                        changeAddItemId: (v) => {
                            this.changeAddItemId(v)
                        },
                    }
                },
                /* 重新带入插槽 */
                [
                    ...Object.keys(this.$slots).map((key) => {
                        const {tag} = this.$slots[key][0].componentOptions || {}
                        if (key === 'controllers') {
                            return this.$slots[key].map(item => {
                                const {tag, listeners = {}, propsData} = item.componentOptions || {}
                                if (tag)
                                    return h(tag,
                                        {
                                            props: {
                                                ...propsData,
                                            },
                                            slot: 'controllers',
                                            ...item.data,
                                            on: listeners
                                        }
                                    )
                                return null
                            }).filter(Boolean)
                        }
                        if (this.$slots[key][0].componentOptions) {
                            return h(tag,
                                {
                                    props: {
                                        ...this.$slots[key][0].componentOptions.propsData
                                    },
                                    ...this.$slots[key][0].data
                                }
                            )
                        }
                    }).filter(Boolean)
                ]
            )
        }
    }
</script>
<style scoped lang="scss">
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
</style>
