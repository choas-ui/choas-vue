<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    export default {
        name: 'CTreeLiContent',
        props: {
            itemData: {
                type: Object,
                default() {
                    return {}
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
            },
            // 总列表
            copyListData: {
                type: Array,
                default() {
                    return []
                }
            },
            changeChildrenNodeStatus: {
                type: Function,
            },
            changeParentNodeStatus: {
                type: Function,
            },
            copyValue: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                copySelectedData: {},
                isControllersShow: false,
                isEditModel: false,
                isDeleteModel: false,
                editContent: '',
                addContent: ''
            }
        },
        mounted() {
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
                            style: {
                                verticalAlign: 'middle'
                            },
                            on: {
                                input: (v) => {
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
                            [`${this.fixedPrefix}tree-title-wrap`]: true
                        }),
                        on: {
                            click: () => {
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
                        h('span',
                            {
                                class: classNames({
                                    'active': data.checked,
                                })
                            },
                            [
                                childrenVnode

                            ]
                        )
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
                    if (pNodeValue) {
                        pNodeValue.children.splice(last, 1);
                        this.$emit('changeAddItemId', '');
                        this.addContent = ''
                    }
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
                                click: (e) => {
                                    e.stopPropagation();
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
                                click: (e) => {
                                    e.stopPropagation();

                                    // 取消在编辑状态
                                    this.cancelEditValue();
                                    // 移除未添加的新增值
                                    this.removeNoAddNodeValue();
                                    // 生成子节点信息并记录子节点位置
                                    this.createNewNodeValue(data);
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
                                        id: this.itemData[this.reflectKey['value']],
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
                                        click: (e) => {
                                            e.stopPropagation();
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
                if (!data.disabled) {
                    if (!this.multiple) {
                        if (!data[this.conditionProps]) {
                            const v = _.get(this.copyListData, data._c_tree_self_id.split('-').join('.children.'), {});
                            delete v.halfChecked;
                            this.$set(v, 'checked', !data.checked);
                            if (this.copyValue.length) {
                                const v = _.get(this.copyListData, this.copyValue[0]._c_tree_self_id.split('-').join('.children.'), {});
                                delete v.halfChecked;
                                this.$set(v, 'checked', false)
                            }
                        }
                    } else {
                        const v = _.get(this.copyListData, data._c_tree_self_id.split('-').join('.children.'), {});
                        delete v.halfChecked;
                        this.$set(v, 'checked', !data.checked);
                        this.changeChildrenNodeStatus(data, data.checked);
                        this.changeParentNodeStatus(this.copyListData, data._c_tree_parent_id);
                    }
                }
            },
            async selfEditTreeNode(data, type) {
                if (typeof this.editTreeNode !== 'function') {
                    throw new TypeError('编辑类型错误函数!')
                }
                return this.editTreeNode({
                    [this.reflectKey['key']]: data[this.reflectKey['key']],
                    [this.reflectKey['value']]: data[this.reflectKey['value']],
                }, type).then((res) => {
                    if (parseInt(res.code, 10) === 200) {
                        // 取消在编辑状态
                        this.cancelEditValue();
                        // 移除未添加的新增值
                        this.removeNoAddNodeValue();
                        // 树形重选
                        this.clickHandle(data);
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
            itemData: {
                handler(v) {
                    if (!_.isEqual(v, this.itemData)) {
                        this.$set(this, 'itemData', v)
                    }
                },
                deep: true,
                immediate: true
            },
            editItemId: {
                handler() {
                    this.isEditModel = [this.editItemId, this.addItemId].includes(this.itemData._c_tree_self_id);
                    this.isControllersShow = false;
                    this.editContent = '';
                    this.addContent = ''
                },
                deep: true,
                immediate: true
            },
            addItemId: {
                handler() {
                    this.isEditModel = [this.editItemId, this.addItemId].includes(this.itemData._c_tree_self_id);
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
                    this.createTitle(h, this.itemData),
                    this.isControllersShow && !this.isEditModel && h('span',
                        [
                            this.createControllersIcon(h, this.itemData),
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
                                                type = 'add'
                                            } else {
                                                if (!this.editContent) {
                                                    // 取消在编辑状态
                                                    this.cancelEditValue();
                                                    // 移除未添加的新增值
                                                    this.removeNoAddNodeValue();
                                                    return
                                                }
                                                type = 'edit'
                                            }
                                            await this.selfEditTreeNode(this.itemData, type)
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

        &-title-wrap{
            .active {
                background: $primary;
                color: #fff;
                font-weight: bold;
            }
        }
    }
</style>
