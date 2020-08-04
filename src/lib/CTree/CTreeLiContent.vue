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
                    return '#ff5e5c'
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
            // 在编辑数据位置
            editItemId: {
                type: String,
                default() {
                    return ''
                }
            },
            // 在添加数据位置
            addItemId: {
                type: String,
                default() {
                    return ''
                }
            },
            markIconWidth: {
                type: Number,
                default() {
                    return 18
                }
            },
            markIconHeight: {
                type: Number,
                default() {
                    return 18
                }
            },
            fixedPrefix: {
                type: String,
                default() {
                    return ''
                }
            },
            // 编辑节点
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
                copyListData: {},
                copySelectedData: {},
                isControllersShow: false,
                isEditModel: false,
                isDeleteModel: false,
                editContent: '',
                addContent: ''
            }
        },
        methods: {
            // 创建标题
            createTitle(h, data) {
                const content = data[this.reflectKey['key']] || '';
                const index = this.searchStr ? content.indexOf(this.searchStr) : -1;
                const childrenVnode = [];
                if (index > -1) {
                    childrenVnode.push(
                        h('span', {
                                style: {
                                    color: this.markColor,
                                    minHeight: this.markIconHeight + 'px',
                                    lineHeight: this.markIconHeight + 2 + 'px',
                                }
                            },
                            [content.slice(0, index + this.searchStr.length)]
                        )
                    );
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
                                    alignItem: 'center',
                                    minHeight: this.markIconHeight + 'px',
                                    lineHeight: this.markIconHeight + 2 + 'px',
                                }
                            },
                            [content]
                        )
                    )
                }
                if (this.isEditModel) {
                    return h('CInput',
                        {
                            attrs: {
                                value: content
                            },
                            props: {
                                width: '200',
                                size: 'ssmall'
                            },
                            style:{
                              verticalAlign: 'middle'
                            },
                            on: {
                                change: (v) => {
                                    if (this.addItemId) {
                                        this.addContent = v
                                    } else {
                                        this.editContent = v
                                    }
                                }
                            }
                        }
                    )
                }
                return h('span', {
                        style: {
                            marginLeft: this.markIconWidth / 4 + 'px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            cursor: "pointer",
                            minHeight: this.markIconHeight + 'px',
                            lineHeight: this.markIconHeight + 2 + 'px',
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
                                this.$set(data, 'checked', !data.checked);
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
            // 生成子节点并存储子节点位置
            createNewNodeValue(data) {
                const clickValue = _.get(this.copyListData, data._c_tree_self_id.split('-').join('.children.'), []);
                const _c_tree_self_id = data._c_tree_self_id + '-' + (data.children || []).length;
                clickValue.children = clickValue.children || [];
                clickValue.children.push({
                    [this.reflectKey['key']]: '',
                    [this.reflectKey['value']]: '',
                    _c_tree_self_id,
                });
                // 记录新增值的位置
                this.$emit('changeAddItemId', _c_tree_self_id)
            },
            // 移除未添加的新节点和值
            removeNoAddNodeValue() {
                if (this.addItemId) {
                    let path = this.addItemId.split('-');
                    const [last, ...others] = [...path].reverse();
                    path = [...others].reverse().join('.children.');
                    const pNodeValue = _.get(this.copyListData, path, null);
                    pNodeValue && pNodeValue.children.splice(last, 1);
                    this.$emit('changeAddItemId', '');
                    this.addContent = ''
                }
            },
            // 移除编辑状态和值
            cancelEditValue() {
                this.$emit('changeEditItemId', '');
                this.editContent = '';
            },
            // 创建文件图标
            createControllersIcon(h, data) {
                if (!this.controllers && !this.$slots['controllers']) {
                    return null
                }
                // 用户插槽
                if (this.$slots['controllers']) {
                    return this.$slots['controllers'].map((item) => {
                        const {tag, listeners = {}, propsData} = item.componentOptions || {};
                        const _listeners = {};
                        Object.keys(listeners).forEach(key => {
                            _listeners[key] = (e) => {
                                return listeners[key].call(this, data, e)
                            }
                        });
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
                                activeColor: '#1890ff',
                            },
                            style: {
                                marginRight: '4px'
                            },
                            on: {
                                click: () => {
                                    // 取消在编辑状态
                                    this.cancelEditValue();
                                    // 移除未添加的新增值
                                    this.removeNoAddNodeValue();
                                    // 生成子节点信息并记录子节点位置
                                    // 记录编辑行id,编辑行转为可编辑状态
                                    this.$emit('changeEditItemId', data._c_tree_self_id)
                                }
                            }
                        },
                    ),
                    data[this.conditionProps] && h('CIcon',
                        {
                            props: {
                                color: '#ccc',
                                activeColor: '#1ac756',
                                iconName: 'choas-add',
                                marginRight: '4px',
                            },
                            on: {
                                click: () => {
                                    // 取消在编辑状态
                                    this.cancelEditValue();
                                    // 移除未添加的新增值
                                    this.removeNoAddNodeValue();
                                    // 生成子节点信息并记录子节点位置
                                    this.createNewNodeValue(data)
                                }
                            }
                        }
                    ),
                    h('CPrompt',
                        {
                            props: {
                                dialog: '正在删除，请确认！'
                            },
                            on: {
                                confirm: async () => {
                                    let data = {
                                        id: this.selfData[this.reflectKey['value']],
                                        title: this.editContent
                                    };
                                    const type = 'delete';
                                    await this.selfEditTreeNode(data, type)
                                },
                                cancel: () => {
                                    this.isDeleteModel = false;
                                    this.isControllersShow = false
                                }
                            }
                        },
                        [
                            h('CIcon',
                                {
                                    props: {
                                        color: '#333',
                                        activeColor: '#ff5e5c',
                                        iconName: 'choas-delete',
                                    },
                                    on: {
                                        click: () => {
                                            this.isDeleteModel = true
                                        },
                                    }
                                }
                            )
                        ]),
                ]
            },
            // 点击关联元素
            clickHandle(data) {
                let {value} = this.$attrs;
                let res = [];
                if (!data.disabled) {
                    // 点击尾端结点
                    if (!data[this.conditionProps]) {
                        if (this.multiple) {
                            // 多选模式,点击由尾节点(当前值)向上递归父节点
                            this.setParentNodeValue(this.copyListData, this._c_tree_parent_id, !data.checked)
                        } else {
                            // 单选模式
                            const path = _.get(value, '0._c_tree_self_id', '').split('-').join('.children.');
                            const lastData = _.get(this.copyListData, path, null);
                            // 取消上次选中
                            lastData && this.$set(lastData, 'checked', false);
                            // 隔离数据
                            res = _.cloneDeep(data);
                            delete res.children;
                            // 本次选中
                            res = [res]
                        }
                    } else {
                        // 多选模式,点击包含子节点的父节点
                        if (this.multiple) {
                            // 设置子节点值
                            this.setAllChildrenNodeValue(data, !data.checked);
                            // 设置父节点值
                            this.setParentNodeValue(this.copyListData, this._c_tree_parent_id, !data.checked)
                        } else {
                            res = [...this.$attrs.value]
                        }
                    }
                }
                if (this.multiple) {
                    this.getAllCheckedValue(_.cloneDeep(this.copyListData), res)
                }
                this.$emit('change', res.filter(item => item.checked))
            },
            // 获取所有被选取的子节点
            setAllChildrenNodeValue(data, isCancel) {
                (data.children || []).forEach(item => {
                    this.$set(item, 'checked', !isCancel);
                    this.setAllChildrenNodeValue(item, isCancel)
                });
                delete data.halfChecked
            },
            // 获取当前选择值 返回给双向绑定
            getAllCheckedValue(copyListData, res = []) {
                (copyListData || []).forEach(item => {
                    if (item.checked || item.halfChecked) {
                        this.getAllCheckedValue(item.children, res);
                        if (item.checked && !item[this.conditionProps]) {
                            delete item.children;
                            delete item._c_tree_self_id;
                            res.push(item)
                        }
                    }
                });
                return res
            },
            async selfEditTreeNode(data, type) {
                if (typeof this.editTreeNode !== 'function') {
                    throw new Error('editTreeNode type Error!')
                }
                return this.editTreeNode(data, type).then((res) => {
                    if (parseInt(res.code, 10) === 200) {
                        // 取消在编辑状态
                        // 自动更新数据
                        this.cancelEditValue();
                        // 移除未添加的新增值
                        this.removeNoAddNodeValue();
                        // 树形重选
                        this.clickHandle(this.selfData);
                        this.isEditModel = false;
                        this.$cMessage.info({
                            message: '操作成功!',
                            timeSpan: 2,
                        });
                    } else {
                        this.$cMessage.error({
                            message: '操作失败!',
                            timeSpan: 2,
                        });
                    }
                })
            }
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
                handler() {
                    this.isEditModel = [this.editItemId, this.addItemId].includes(this.selfData._c_tree_self_id);
                    this.isControllersShow = false;
                    this.editContent = '';
                    this.addContent = ''
                },
                deep: true,
                immediate: true
            },
            addItemId: {
                handler() {
                    this.isEditModel = [this.editItemId, this.addItemId].includes(this.selfData._c_tree_self_id);
                    this.isControllersShow = false;
                    this.editContent = '';
                    this.addContent = '';
                },
                deep: true,
                immediate: true
            },
        },
        render(h) {
            return h('span',
                {
                    style: {
                        display: "inline-flex",
                        justifyContent: 'space-between',
                        alignItems: "center",
                        flex: 1,
                    },
                    on: {
                        mouseenter: () => {
                            this.isControllersShow = true
                        },
                        mouseleave: () => {
                            if (!this.isEditModel && !this.isDeleteModel) {
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

                            h('CPrompt',
                                {
                                    props: {
                                        dialog: this.editContent ? '正在修改数据，请确认！' : this.addContent ? '正在新增数据，请确认' : '当前未发生改变'
                                    },
                                    on: {
                                        confirm: async () => {
                                            let data = {};
                                            let type = '';
                                            if (this.addItemId) {
                                                // 需要获取父节点id
                                                if (!this.addContent) {
                                                    // 取消在编辑状态
                                                    this.cancelEditValue();
                                                    // 移除未添加的新增值
                                                    this.removeNoAddNodeValue();
                                                    return
                                                }
                                                const path = this.selfData._c_tree_self_id.split('-');
                                                const [, ...pPath] = [...path].reverse();
                                                const pNode = _.get(this.copyListData, pPath.reverse().join('.children.'), {});
                                                data = {
                                                    pId: pNode[this.reflectKey['value']],
                                                    value: this.addContent
                                                };
                                                type = 'add'
                                            } else {
                                                if (!this.editContent) {
                                                    // 取消在编辑状态
                                                    this.cancelEditValue();
                                                    // 移除未添加的新增值
                                                    this.removeNoAddNodeValue();
                                                    return
                                                }
                                                data = {
                                                    id: this.selfData[this.reflectKey['value']],
                                                    value: this.editContent
                                                };
                                                type = 'edit'
                                            }
                                            await this.selfEditTreeNode(data, type)
                                        },
                                        cancel: () => {
                                            this.isDeleteModel = false;
                                            this.isControllersShow = false
                                        }
                                    }
                                },
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
                                                click: async () => {
                                                }
                                            },
                                        }
                                    ),
                                ]
                            ),
                            h('CIcon',
                                {
                                    props: {
                                        iconName: 'choas-close',
                                        color: '#ff5e5c',
                                        activeColor: '#ff5e5c',
                                        key: 'close'
                                    },
                                    on: {
                                        click: () => {
                                            // 取消在编辑状态
                                            this.cancelEditValue();
                                            // 移除未添加的新增值
                                            this.removeNoAddNodeValue()
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
