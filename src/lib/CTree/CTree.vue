<script>
    import _ from 'lodash'
    import CTreeUl from "./CTreeUl";

    export default {
        name: 'CTree',
        components: {
            CTreeUl
        },
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
            markIconFixMarginRight: {
                type: Number,
                default() {
                    return 0
                }
            },
            // 文件标识图标左间距
            fileIconFixMarginRight: {
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
            },
            value: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                copyValue: [],
                copyListData: [], // 用于渲染的list
                backupCopyListData: [], // list备份
                editItemId: '', // 在编辑元素位置编码
                addItemId: '', // 在添加元素位置编码
            }
        },
        methods: {
            // 改变列表值
            changeCopyListData(v){
                this.$set(this,'copyListData',v);
                this.$set(this,'backupCopyListData',_.cloneDeep(v));
            },
            // 记录在编辑位置
            changeEditItemId(v) {
                this.editItemId = v
            },
            // 记录在添加位置
            changeAddItemId(v) {
                this.addItemId = v
            },
            setParentNodeValue(data, path, isCancel) {
                const pathArr = path.split('-');
                while (pathArr.length) {
                    const parentNode = _.get(data, pathArr.join('.children.'), {children: []});
                    if (isCancel) {
                        this.$set(parentNode, 'checked', false);
                        if ((parentNode.children || []).some(item => item.checked || item.halfChecked)) {
                            this.$set(parentNode, 'halfChecked', true)
                        } else {
                            this.$set(parentNode, 'halfChecked', false)
                        }
                    } else {
                        if ((parentNode.children || []).length) {
                            if (parentNode.children.length === 1 || parentNode.children.every(item => item.checked)) {
                                this.$set(parentNode, 'checked', true);
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
            markIdentifyAndSyncData(data, selectData) {
                data.forEach((item, index) => {
                    if (selectData.length) {
                        const findIndex = selectData.findIndex(select => select[this.reflectKey['value']] === item[this.reflectKey['value']]);
                        if (findIndex > -1) {
                            const pPath = item._c_tree_parent_id;
                            this.$set(item, 'checked', true);
                            // 全选子元素
                            this.setAllChildrenNodeValue(item);
                            // 尽量减少重复次数
                            selectData.splice(index, 1);
                            if (pPath) {
                                this.setParentNodeValue(data, pPath, true)
                            }
                        }
                    }
                    if ((item.children || []).length) {
                        // 编辑数据结构
                        this.markIdentifyAndSyncData(item.children, selectData)
                    }
                })
            },
            // 标记数据层级
            markListDataIdentify(data, parentId = '') {
                data.forEach((item, index) => {
                    item._c_tree_parent_id = parentId;
                    item._c_tree_self_id = parentId ? parentId + '-' + index : +index + '';
                    // 设置父元素属性
                    if ((item.children || []).length) {
                        // 编辑数据结构
                        this.markListDataIdentify(item.children, item._c_tree_self_id)
                    }
                });
                return data
            },
            // 获取所有被选取的子节点
            setAllChildrenNodeValue(data, isCancel) {
                (data.children || []).forEach(item => {
                    this.$set(item, 'checked', true);
                    this.setAllChildrenNodeValue(item, isCancel)
                });
                // this.$set(data, 'checked', !isCancel);
                delete data.halfChecked
            },
            // 获取当前选择值 返回给双向绑定
            getAllCheckedValue(copyListData, res = []) {
                (copyListData || []).forEach(item => {
                    if (item.checked || item.halfChecked) {
                        this.getAllCheckedValue(item.children, res);
                        if (item.checked && !item[this.conditionProps]) {
                            res.push(item);
                        }
                    }
                });
                return res
            },
            // 筛选数据
            filterData(data, v) {
                let key = this.reflectKey['key'];
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    item.expand = true;
                    if ((item.children || []).length) {
                        this.filterData(item.children, v)
                    }
                    if (!(item.children || []).length) {
                        delete item.children;
                        if (item[key].indexOf(v) < 0) {
                            data.splice(i, 1);
                            i--
                        }
                    }
                }
                return data
            },
        },
        watch: {
            listData: {
                handler(v, old) {
                    // 父元素列表变化时
                    if (!_.isEqual(v, old)) {
                        const listDataOfIdentify = this.markListDataIdentify(_.cloneDeep(v));
                        // 拷贝列表用于操作
                        this.$set(this, 'copyListData', listDataOfIdentify);
                        // 备份数据用于还原
                        this.$set(this, 'backupCopyListData', _.cloneDeep(listDataOfIdentify));
                        // 拷贝数值加状态
                        this.markIdentifyAndSyncData(this.copyListData, _.cloneDeep(v));
                        // 备份数值加状态
                        this.markIdentifyAndSyncData(this.backupCopyListData, _.cloneDeep(v));
                    }
                },
                deep: true,
                immediate: true
            },
            searchStr(v) {
                if (v) {
                    this.$set(this, 'copyListData', this.filterData(this.copyListData, v))
                } else {
                    this.$set(this, 'copyListData', _.cloneDeep(this.listDataOfIdentify));
                }
            },
            value: {
                handler(v) {
                    // 防止无限次循环问题
                    if (!_.isEqual(v, this.copyValue)) {
                        // 外部数据更新更新内部数据
                        const res =[];
                        this.getAllCheckedValue(this.copyListData,res);
                        this.$set(this, 'copyValue', res);
                    }
                },
                deep: true,
                immediate: true
            },
            copyValue: {
                handler(v) {
                    this.$emit('input', v)
                },
                deep: true,
                immediate: true
            },
        },
        render(h) {
            return h('CTreeUl',
                {
                    props: {
                        value: this.value,
                        listData: this.copyListData,
                        line: this.line, // 线段
                        reflectKey: this.reflectKey, // 映射
                        searchStr: this.searchStr, // 搜索
                        controllers: this.controllers, // 是否显示编辑按钮
                        fileIconFixMarginRight: this.fileIconFixMarginRight, // 文件图标右边距
                        markIconFixMarginRight: this.markIconFixMarginRight, // 标记图标右边距
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
                        changeCopyListData:(v)=>{
                            this.$emit('changeCopyListData', v)
                        },
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
                        const {tag} = this.$slots[key][0].componentOptions || {};
                        if (key === 'controllers') {
                            return this.$slots[key].map(item => {
                                const {tag, listeners = {}, propsData} = item.componentOptions || {};
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
                                    );
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
