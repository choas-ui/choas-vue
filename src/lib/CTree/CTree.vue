<script>
    import classNames from 'classnames'
    import _ from 'lodash'
    import CTreeLiContent from "./CTreeLiContent";

    export default {
        name: 'CTree',
        components: {
            CTreeLiContent
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
                    return 'red'
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
            // 内部标线层级
            lineStartLv: {
                type: Number,
                default() {
                    return 0
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
            _c_tree_parent_id: {
                type: String,
                default() {
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
                fixedPrefix: '',
                markIconWidth: 18,
                markIconHeight: 18,
            }
        },
        mounted() {
            this.fixedPrefix = this.prefix ? `${this.prefix}-` : '';
            this.markIconWidth = _.get(this.$slots, "mark-icon.0.propsData.width", 0) ||
                _.result(this.$slots, "'mark-icon'.0.componentOptions.Ctor.extendOptions.props.width.default", 0) || 18;
            this.markIconHeight = _.get(this.$slots, "mark-icon.0.propsData.height", 0) ||
                _.result(this.$slots, "'mark-icon'.0.componentOptions.Ctor.extendOptions.props.height.default", 0) || 18;
        },
        methods: {
            // 创建关联id
            createdId(index) {
                return this._c_tree_parent_id ? this._c_tree_parent_id + '-' + index : index + ''
            },
            createdLiContent(h, item, index) {
                return h('div',
                    [
                        h('div',
                            {
                                style: {
                                    height: this.markIconHeight * 1.5 + 'px'
                                }
                            },
                            this.createLine(h)
                        ),
                        h('div',
                            {
                                style: {
                                    display: 'flex',
                                    flex: 1,
                                }
                            },
                            [
                                this.createIconMark(h, item),
                                this.createFileIcon(h, item),
                                h('CTreeLiContent',
                                    {
                                        attrs: {
                                            ...this.$attrs
                                        },
                                        props: {
                                            lineStartLv: this.lineStartLv + 1,
                                            _c_tree_parent_id: this.createdId(index),
                                            selfData: item,
                                            listData: this.listData,
                                            reflectKey: this.reflectKey,
                                            searchStr: this.searchStr,
                                            controllers: this.controllers,
                                            multiple: this.multiple, // 多选
                                            checkbox: this.checkbox, // 显示选择框
                                            conditionProps: this.conditionProps, // 不可选条件
                                            setParentNodeValue: this.setParentNodeValue, // 设置父元素属性函数
                                        },
                                        on: this.$listeners
                                    },
                                    [
                                        ...Object.keys(this.$slots).map((key) => {
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
                                        }).filter(Boolean)
                                    ]
                                ),
                            ]
                        ),
                    ]
                )
            },
            // 创建展开图标
            createIconMark(h, data) {
                if (!(data.children || []).length) {
                    return null
                }
                const className = classNames({
                    [`${this.fixedPrefix}tree-mark-icon`]: true
                })
                if (this.$slots['mark-icon']) {
                    return h('span', {
                            class: className,
                            style: {
                                transform: data.expand || !(data.children || []).length ? 'rotate(90deg)' : '',
                                marginLeft: this.lineStartLv ? `${this.markIconFixMarginLeft}px` : '0'
                            },
                            on: {
                                click: () => {
                                    this.$set(data, 'expand', !data.expand)
                                }
                            }
                        },
                        this.$slots['mark-icon']
                    )
                }
                return h('CIcon', {
                    props: {
                        'icon-name': "choas-fill-arrow-right",
                    },
                    class: className,
                    style: {
                        transform: data.expand || !(data.children || []).length ? 'rotate(90deg)' : 'rotate(0)',
                        marginLeft: this.lineStartLv ? `${this.markIconFixMarginLeft}px` : '0'
                    },
                    on: {
                        click: () => {
                            this.$set(data, 'expand', !data.expand)
                        }
                    }
                })
            },
            // 创建树形连线
            createLine(h) {
                if (!this.lineStartLv) {
                    return []
                }
                return new Array((this.lineStartLv) * 2).fill(1).map((item, index, arr) => {
                    if (!index) {
                        // 竖线
                        return h('span',
                            {
                                class: classNames({
                                    [`${this.fixedPrefix}tree-vertical-line-hidden`]: !this.line,
                                    [`${this.fixedPrefix}tree-vertical-line`]: this.line
                                }),
                                style: {
                                    width: this.markIconWidth / 2 + 'px',
                                }
                            },
                            [h('span', [])]
                        )
                    } else if (index === arr.length - 1) {
                        // 水平线
                        return h('span',
                            {
                                class: classNames({
                                    [`${this.fixedPrefix}tree-align-line-hidden`]: !this.line,
                                    [`${this.fixedPrefix}tree-align-line`]: this.line
                                }),
                                style: {
                                    width: (this.markIconWidth / 2) + this.markIconWidth + 'px',
                                }
                            },
                            [h('span')]
                        )
                    } else {
                        if (index % 2) {
                            // 父元素水平线
                            return h('span',
                                {
                                    class: classNames({
                                        [`${this.fixedPrefix}tree-align-line-hidden`]: !this.line,
                                        [`${this.fixedPrefix}tree-align-line`]: this.line
                                    }),
                                    style: {
                                        // 两倍展开图标长 + 展开图标左间距（6）-竖线宽（1）
                                        width: (this.markIconWidth * 2) + (this.markIconFixMarginLeft - 1) + 'px',
                                    }
                                }
                            )
                        } else if (index >= this.lineStartLv) {
                            // 子元素竖线
                            return h('span',
                                {
                                    class: classNames({
                                        [`${this.fixedPrefix}tree-vertical-half-line`]: true,
                                        [`${this.fixedPrefix}tree-vertical-line-hidden`]: !this.line,
                                        [`${this.fixedPrefix}tree-vertical-line`]: this.line
                                    }),
                                    style: {
                                        width: '1px',
                                    }
                                },
                                [h('span')]
                            )
                        }
                    }
                })
            },
            // 创建文件图标
            createFileIcon(h) {
                if (this.$slots['file-icon']) {
                    return h('span',
                        {
                            slot: 'file-icon',
                            style: {
                                margin: `0 ${this.fileIconFixMargin}px`
                            }
                        },
                        [this.$slots['file-icon']]
                    )
                }
                return h('CIcon', {
                    props: {
                        'icon-name': "choas-file-icon",
                    }
                })
            },
            // 创建递归树形
            createTree(h, data, index) {
                if (data.expand) {
                    return h('CTree',
                        {
                            attrs: {
                                ...this.$attrs
                            },
                            props: {
                                lineStartLv: this.lineStartLv + 1,
                                _c_tree_parent_id: this.createdId(index),
                                listData: this.listData,
                                line: this.line,
                                reflectKey: this.reflectKey,
                                searchStr: this.searchStr,
                                controllers: this.controllers,
                                fileIconFixMargin: this.fileIconFixMargin,
                                markIconFixMarginLeft: this.markIconFixMarginLeft,
                                multiple: this.multiple, // 多选
                                checkbox: this.checkbox, // 显示选择框
                                conditionProps: this.conditionProps, // 不可选条件
                            },
                            on: this.$listeners
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
                return null
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
            }
        },
        watch: {
            listData: {
                handler(v) {
                    if (!_.isEqual(v, this.copyListData)) {
                        // 同步已选值统一设置checked属性
                        this.$emit('change', this.$attrs.value.map(item => ({...item, checked: true})))
                        // 同步listData已选值设置checked属性,向上递归设置父节点属性
                        // TODO 该操作比较耗费性能 以后优化
                        this.markIdentifyAndSyncData(v, v, _.cloneDeep(this.$attrs.value))
                        this.$set(this, 'copyListData', v)
                    }
                },
                deep: true,
                immediate: true
            },
        },
        render(h) {
            const path = this._c_tree_parent_id
            let theLvListData = this.copyListData || []
            if (path !== '') {
                theLvListData = _.get(this.copyListData, path.split('-').join('.children.') + '.children', [])
            }
            if (!theLvListData.length) {
                return null
            }
            return h('ul',
                [
                    theLvListData.map((item, index) => {
                        return h('li',
                            {
                                class: classNames({
                                    [`${this.fixedPrefix}tree-li`]: true
                                }),
                            },
                            [
                                this.createdLiContent(h, item, index),
                                this.createTree(h, item, index)
                            ]
                        )
                    })
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

    ul {
        padding: 0;
        margin: 0;
        font-size: addPX($df-fs);
        li {
            list-style: none;
            & > div {
                display: flex;
                align-items: center;
            }
        }
    }
    .tree {
        &-li {
            display: flex;
            flex-wrap: wrap;
            & > div {
                width: 100%;
                display: flex;
                & > div {
                    display: flex;
                }
            }
            & > ul {
                width: 100%;
            }
            span {
                height: 100%;
            }
        }
        &-mark-icon-box {
            display: inline-block;
        }
        &-vertical-line {
            display: inline-block;
            text-align: right;
            & > span {
                display: inline-block;
                width: addPX($ssm-borderWt);
                height: 100%;
                border-right: addPX($ssm-borderWt) solid #c2c2c2;
            }
        }
        &-vertical-half-line {
            & > span {
                height: 50%;
                vertical-align: top;
            }
        }
        &-align-line {
            text-align: left;
            align-items: center;
            display: flex;
            & > span {
                display: flex;
                height: 1px;
                width: 100%;
                border-bottom: addPX($ssm-borderWt) solid #c2c2c2;
            }
        }
    }
</style>
