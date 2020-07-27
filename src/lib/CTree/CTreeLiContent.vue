<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    export default {
        name: 'CTreeLiContent',
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
                    return 'red'
                }
            },
            prefix: {
                type: String,
                default() {
                    return ''
                }
            },
            // 多选模式
            multiple: {
                type: Boolean
            },
            // 显示checkbox
            checkbox: {
                type: Boolean
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
            _c_tree_parent_id: {
                type: String,
                default() {
                    return ''
                }
            },
            // 本条数据
            selfData: {
                type: Object,
                default() {
                    return {}
                }
            },
            setParentNodeValue: {
                type: Function,
            },
            // 在编辑数据
            editItemId: {
                type: String,
                default() {
                    return ''
                }
            },
            markIconWidth:{
                type: Number,
                default(){
                    return 18
                }
            },
            markIconHeight:{
                type: Number,
                default(){
                    return 18
                }
            },
            fixedPrefix:{
                type: String,
                default(){
                    return ''
                }
            }
        },
        model: {
            props: 'value',
            event: 'change'
        },
        data() {
            return {
                copyListData: {},
                copySelectedData: {},
                isControllersShow: false,
                isEditModel: false,
                editContent: '',
                addContent: ''
            }
        },
        methods: {
            // 创建标题
            createTitle(h, data) {
                const content = data[this.reflectKey['key']] || ''
                const index = this.searchStr ? content.indexOf(this.searchStr) : -1
                const childrenVnode = []
                if (index > -1) {
                    childrenVnode.push(
                        h('span', {
                                style: {
                                    color: this.markColor,
                                }
                            },
                            [content.slice(0, index + this.searchStr.length)]
                        )
                    )
                    childrenVnode.push(
                        h('span',
                            [content.slice(index + this.searchStr.length)]
                        )
                    )
                } else {
                    childrenVnode.push(
                        h('span',
                            {
                                style: {
                                    display: 'inline-flex',
                                    alignItem: 'center'
                                }
                            },
                            [content]
                        )
                    )
                }
                if (this.isEditModel) {
                    return h('input',
                        {
                            attrs:{
                                value: content
                            }
                        }
                        )
                }
                return h('span', {
                        style: {
                            marginLeft: this.markIconWidth / 4 + 'px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            cursor: "pointer"
                        },
                        attrs: {
                            title: content,
                        },
                        class: classNames({
                            'active': (this.$attrs.value || []).find(item => data[this.reflectKey['value']] && (item[this.reflectKey['value']] === data[this.reflectKey['value']])),
                            [`${this.fixedPrefix}tree-title-wrap`]: true
                        }),
                        on: {
                            click: () => {
                                this.$set(data, 'checked', !data.checked)
                                this.clickHandle(data)
                            }
                        },

                    }, [

                        this.multiple && this.checkbox && h('CCheckbox',
                            {
                                props: {
                                    value: _.cloneDeep(data),
                                    reflectKey: this.reflectKey,
                                    width: '16',
                                    height: '16',
                                    noText: true,
                                },
                                attrs: {
                                    checkedData: [_.cloneDeep(data)],
                                },
                                style: {
                                    marginRight: '8px',
                                }
                            },
                        ),
                        childrenVnode
                    ]
                )
            },
            // 创建文件图标
            createControllersIcon(h, data) {
                if (!this.controllers && !this.$slots['controllers']) {
                    return null
                }
                // 用户插槽
                if (this.$slots['controllers']) {
                    return this.$slots['controllers'].map((item) => {
                        const {tag, listeners = {}, propsData} = item.componentOptions || {}
                        const _listeners = {}
                        Object.keys(listeners).forEach(key => {
                            _listeners[key] = (e) => {
                                return listeners[key].call(this, data, e)
                            }
                        })
                        if (!tag) {
                            return null
                        }
                        return h(tag,
                            {
                                props: {
                                    ...propsData
                                },
                                ...item.data,
                                slot: 'controllers',
                                on: _listeners
                            }
                        )
                    }).filter(Boolean)
                }
                if (!this.controllers) {
                    return null
                }
                return [
                    h('CIcon',
                        {
                            props: {
                                color: '#333',
                                iconName: 'choas-edit',
                            },
                            slot: 'controllers',
                            on: {
                                click: () => {
                                    this.$emit('changeEditItemId', data._c_tree_self_id)
                                    console.log('CTreeLiContent edit')
                                }
                            }
                        },
                    ),
                    h('CIcon',
                        {
                            props: {
                                color: '#333',
                                iconName: 'choas-add',
                            },
                            slot: 'controllers',
                            on: {
                                click: () => {
                                    this.$emit('changeEditItemId', '')
                                    console.log('CTreeLiContent add')
                                }
                            }
                        }
                    ),
                    h('CIcon',
                        {
                            props: {
                                color: '#333',
                                iconName: 'choas-delete',
                            },
                            slot: 'controllers',
                            on: {
                                click: () => {
                                    this.$emit('changeEditItemId', '')
                                    console.log('CTreeLiContent remove')
                                }
                            }
                        }
                    )
                ]
            },
            // 点击关联元素
            clickHandle(data) {
                let {value} = this.$attrs
                let res = []
                if (!data.disabled) {
                    // 点击尾端结点
                    if (!data[this.conditionProps]) {
                        if (this.multiple) {
                            // 多选模式,点击由尾节点(当前值)向上递归父节点
                            this.setParentNodeValue(this.copyListData, this._c_tree_parent_id, !data.checked)
                        } else {
                            // 单选模式
                            const path = _.get(value, '0._c_tree_self_id', '').split('-').join('.children.')
                            const lastData = _.get(this.copyListData, path, null)
                            // 取消上次选中
                            lastData && this.$set(lastData, 'checked', false)
                            // 隔离数据
                            res = _.cloneDeep(data)
                            delete res.children
                            // 本次选中
                            res = [res]
                        }
                    } else {
                        // 多选模式,点击包含子节点的父节点
                        if (this.multiple) {
                            // 设置子节点值
                            this.setAllChildrenNodeValue(data, !data.checked)
                            // 设置父节点值
                            this.setParentNodeValue(this.copyListData, this._c_tree_parent_id, !data.checked)
                        } else {
                            res = [...this.$attrs.value]
                        }
                    }
                }
                // 减少更新频率
                if (this.multiple) {
                    this.getAllCheckedValue(_.cloneDeep(this.copyListData), res)
                }
                this.$emit('change', res.filter(item => item.checked))
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
                            delete item.children
                            res.push(item)
                        }
                    }
                })
                return res
            },
        },
        watch: {
            listData: {
                handler(v) {
                    if (!_.isEqual(v, this.copyListData)) {
                        this.$set(this, 'copyListData', v)
                    }
                },
                deep: true,
                immediate: true
            },
            editItemId: {
                handler(v){
                    this.isEditModel = v === this.selfData._c_tree_self_id;
                    this.isControllersShow = false;
                    this.editContent = ''
                    this.addContent = ''
                },
                deep: true,
                immediate: true
            }
        },
        render(h) {
            return h('span',
                {
                    style: {
                        display: "inline-flex",
                        justifyContent: 'space-between',
                        alignItems: "center",
                        flex: 1
                    },
                    on: {
                        mouseenter: () => {
                            this.isControllersShow = true
                        },
                        mouseleave: () => {
                            if (!this.isEditModel) {
                                this.isControllersShow = false
                            }
                        },
                    }
                },
                [
                    this.createTitle(h, this.selfData),
                    this.isControllersShow && !this.isEditModel && h('span',
                        [
                            this.createControllersIcon(h, this.selfData),
                        ]
                    ),
                    this.isControllersShow && this.isEditModel && h('span',
                        [
                            h('CIcon',
                                {
                                    props: {
                                        iconName: 'choas-selected',
                                        color: 'green',
                                        activeColor: 'green',
                                        key: 'selected'
                                    },
                                    on: {
                                        click: () => {
                                            this.$emit('changeEditItemId', '')
                                            // 数据更新请求完成后 自动更新数据
                                            this.clickHandle(this.selfData)
                                        }
                                    },
                                }
                            ),
                            h('CIcon',
                                {
                                    props: {
                                        iconName: 'choas-close',
                                        color: 'red',
                                        activeColor: 'red',
                                        key: 'close'
                                    },
                                    on: {
                                        click: () => {
                                            this.$emit('changeEditItemId', '')
                                        }
                                    },
                                }
                            ),
                        ]
                    )
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

    .tree {
        &-title-wrap {
            flex: 1;

            &:hover {
                color: $primary;
            }
        }

        &-title-wrap.active {
            color: $primary;
            font-weight: bold;
        }
    }
</style>
