<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    export default {
        name: 'CTree',
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
            multiple: {
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
            }
        },
        methods: {
            // 展开图标
            createIconMark(h, data) {
                // TODO: 重新整理 tree的逻辑 包括 InputTreeModal上的添加逻辑  双向绑定一个已选的节点列表
                const prefix = this.prefix ? `${this.prefix}-` : ''
                if (!(data.children || []).length) {
                    return null
                }
                const className = classNames({
                    [`${prefix}tree-mark-icon`]: true
                }).split(' ')
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
                    }, this.$slots['mark-icon'])
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
            // 树形连线
            createLine(h) {
                // TODO: 重新整理 tree的逻辑 包括 InputTreeModal上的添加逻辑  双向绑定一个已选的节点列表
                const markIconWidth = _.get(this.$slots, "mark-icon.0.propsData.width", 0) ||
                    _.result(this.$slots, "'mark-icon'.0.componentOptions.Ctor.extendOptions.props.width.default", 0) || 18
                const prefix = this.prefix ? `${this.prefix}-` : ''
                if (!this.lineStartLv) {
                    return []
                }
                const eleArr = []
                const countArr = new Array((this.lineStartLv) * 2).fill(1)
                for (let i = 0; i < countArr.length; i++) {
                    if (!i) {
                        let ele = h(
                            'span',
                            {
                                class: [
                                    ...classNames(
                                        {
                                            [prefix + "tree-vertical-line-hidden"]: !this.line
                                        },
                                        {
                                            [prefix + "tree-vertical-line"]: this.line
                                        }
                                    ).split(' ')
                                ],
                                style: {
                                    width: markIconWidth / 2 + 'px',
                                }
                            },
                            [
                                h('span'),
                            ]
                        )
                        eleArr.push(ele)
                    } else if (i === countArr.length - 1) {
                        eleArr.push(h(
                            'span',
                            {
                                class: [
                                    ...classNames(
                                        {
                                            [prefix + "tree-align-line-hidden"]: !this.line
                                        },
                                        {
                                            [prefix + "tree-align-line"]: this.line
                                        }
                                    ).split(' ')
                                ],
                                style: {
                                    width: (markIconWidth / 2) + markIconWidth + 'px',
                                }
                            },
                            [
                                h('span')
                            ]
                        ))
                    } else {
                        if (i % 2) {
                            eleArr.push(h(
                                'span',
                                {
                                    class: [
                                        ...classNames(
                                            {
                                                [prefix + "tree-align-line-hidden"]: !this.line
                                            },
                                            {
                                                [prefix + "tree-align-line"]: this.line
                                            }
                                        ).split(' ')
                                    ],
                                    style: {
                                        // 两倍展开图标长 + 展开图标左间距（6）-竖线宽（1）
                                        width: (markIconWidth * 2) + (this.markIconFixMarginLeft - 1) + 'px',
                                    }
                                },
                                []
                            ))
                        } else if (i >= this.lineStartLv) {
                            let ele = h(
                                'span',
                                {
                                    class: [
                                        ...classNames(
                                            {
                                                [prefix + "tree-vertical-half-line"]: true
                                            },
                                            {
                                                [prefix + "tree-vertical-line-hidden"]: !this.line
                                            },
                                            {
                                                [prefix + "tree-vertical-line"]: this.line
                                            }
                                        ).split(' ')
                                    ],
                                    style: {
                                        width: '1px',
                                    }
                                },
                                [
                                    h('span')
                                ]
                            )
                            eleArr.push(ele)
                        }
                    }

                }
                return eleArr
            },
            // 文件图标
            createFileIcon(h) {
                if (this.$slots['file-icon']) {
                    return h(
                        'span',
                        {
                            slot: 'file-icon',
                            attrs: {},
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
                    },
                    attrs: {}
                })
            },
            // 标题
            createTitle(h, data){
                const markIconWidth = _.get(this.$slots, "mark-icon.0.propsData.width", 0) ||
                    _.result(this.$slots, "'mark-icon'.0.componentOptions.Ctor.extendOptions.props.width.default", 0) || 18
                const prefix = this.prefix ? `${this.prefix}-` : ''
                const rfKey = this.reflectKey['key']
                const rfValue = this.reflectKey['key']
                const content = data[rfKey] || ''
                const index = this.searchStr ? content.indexOf(this.searchStr) : -1
                const childrenVnode = []
                if (index > -1) {
                    childrenVnode.push(
                        h('span', {
                            style: {
                                color: this.markColor,
                            }
                        }, [
                            content.slice(0, index + this.searchStr.length)
                        ])
                    )
                    childrenVnode.push(
                        h(
                            'span',
                            {},
                            [
                                content.slice(index + this.searchStr.length,)
                            ]
                        )
                    )
                } else {
                    childrenVnode.push(
                        h(
                            'span',
                            {
                                style: {
                                    display: 'inline-flex',
                                    alignItem: 'center'
                                }
                            },
                            [
                                content
                            ]
                        )
                    )
                }
                const checkboxData = _.cloneDeep(data)
                return h('span', {
                    style: {
                        marginLeft: markIconWidth / 4 + 'px',
                        display: 'inline-flex',
                        alignItems: 'center'
                    },
                    attrs: {
                        title: content,
                    },
                    class: [
                        ...classNames(
                            {
                                'active': (this.$attrs.value || []).findIndex(item => item[rfValue] === data[rfValue]) > -1
                            },
                            {
                                [prefix + 'tree-title-wrap']: true
                            }
                        ).split(' ')
                    ],
                    on: {
                        click: () => this.clickHandle(data)
                    },
                }, [
                    this.multiple && h(
                        'CCheckbox',
                        {
                            props: {
                                value: checkboxData,
                                reflectKey: this.reflectKey,
                                width: '16',
                                height: '16',
                                noText: true,
                            },
                            attrs: {
                                checkedData: [checkboxData],
                            },
                            style: {
                                marginRight: '8px',
                            },
                            nativeOn: {
                                click: (e) => {
                                    this.clickHandle(data)
                                    e.stopPropagation()
                                }
                            }
                        },
                    ),
                    childrenVnode
                ])
            },
            // 文件图标
            createControllersIcon(h, data){
                if (!this.controllers && !this.$slots['controllers']) {
                    return null
                }
                if (this.$slots['controllers']) {
                    return this.$slots['controllers'].map((item) => {
                        const {tag, listeners = {}, propsData} = item.componentOptions || {}
                        const _listeners = {}
                        Object.keys(listeners).forEach(key => {
                            _listeners[key] = (e) => {
                                return listeners[key].call(this, data, e)
                            }
                        })
                        if (tag)
                            return h(
                                tag,
                                {
                                    props: {
                                        ...propsData
                                    },
                                    ...item.data,
                                    slot: 'controllers',
                                    on: _listeners
                                }
                            )
                        return null
                    }).filter(Boolean)
                }
                if (!this.controllers) {
                    return null
                }
                return [
                    h(
                        'CIcon',
                        {
                            props: {
                                color: '#333',
                                iconName: 'choas-edit',
                            },
                            slot: 'controllers',
                            on: {
                                click() {
                                    console.log(data, 'default-controllers')
                                }
                            }
                        },
                    ),
                    h(
                        'CIcon',
                        {
                            props: {
                                color: '#333',
                                iconName: 'choas-add',
                            },
                            slot: 'controllers',
                            on: {
                                click() {
                                    console.log(data, 'default-controllers')
                                }
                            }
                        }
                    ),
                    h(
                        'CIcon',
                        {
                            props: {
                                color: '#333',
                                iconName: 'choas-delete',
                            },
                            slot: 'controllers',
                            on: {
                                click() {
                                    console.log(data, 'default-controllers')
                                }
                            }
                        }
                    )
                ]
            },
            // 递归树形图标
            createTree(h ,data, index){
                if (data.expand) {
                    return h('CTree',
                        {
                            attrs: {
                                ...this.$attrs
                            },
                            props: {
                                lineStartLv: this.lineStartLv + 1,
                                _c_tree_parent_id: this.createdId(index),
                                listData: data.children,
                                line: this.line,
                                reflectKey: this.reflectKey,
                                searchStr: this.searchStr,
                                controllers: this.controllers,
                                fileIconFixMargin: this.fileIconFixMargin,
                                markIconFixMarginLeft: this.markIconFixMarginLeft,
                                multiple: this.multiple, // 多选
                                conditionProps: this.conditionProps, // 多选
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
                                            return h(
                                                tag,
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
                                    return h(
                                        tag,
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


            removeAllChildrenStatusValue(data) {
                (data.children || []).forEach(item => {
                    this.$set(item, 'checked', false)
                    this.$set(item, 'halfChecked', false)
                    if ((item.children || []).length) {
                        this.removeAllChildrenStatusValue(item)
                    }
                })
            },
            clickHandle(data) {
                const rfValue = this.reflectKey['key']
                // TODO: 控制数据
                if (!data.disabled) {
                    if (this.multiple) {
                        // 多选
                        if (!data[this.conditionProps]) {
                            // 点击末端节点 点击末端结点,向上遍历父节点，父节点添加状态值。
                            const {value} = this.$attrs
                            // console.log(data._c_tree_self_id)
                            const index = (value || []).findIndex(item => item[rfValue] === data[rfValue])
                            if (index > -1) {
                                // 移除自身选取状态
                                this.$set(data, 'checked', false)
                                this.$set(data, 'halfChecked', false)
                                // 向下移除所有子元素选取状态
                                this.removeAllChildrenStatusValue(data)
                                // 向上修改父元素
                                value.splice(index, 1)
                            } else {
                                this.$set(data, 'checked', true)
                                // 向下修改子元素
                                // 向上修改父元素
                                const selectData = _.cloneDeep(data)
                                delete selectData.children
                                delete selectData._c_tree_self_id
                                value.push(selectData)
                            }
                            this.$emit('change', value)
                        } else {
                            // 点击非末端节点，父节点。双向遍历。
                            // 获取所有子节点
                            const flatObj = this.getAllChildren(data, [])
                            let copyValue = _.cloneDeep(this.$attrs.value || [])
                            if (flatObj.every(item => copyValue.findIndex(v => v[rfValue] === item[rfValue]) > -1)) {
                                data.checked = false
                                copyValue = copyValue.filter(item => !flatObj.some(ele => ele[rfValue] === item[rfValue]))
                            } else {
                                data.checked = true
                                // bug  需要递归的修改子元素的属性

                                copyValue = copyValue.filter(item => !flatObj.some(ele => ele[rfValue] === item[rfValue]))
                                console.log(flatObj)
                                copyValue = copyValue.concat(flatObj)
                            }
                            copyValue = copyValue.map(item => {
                                delete item.children
                                delete item._c_tree_self_id
                                return item
                            })
                            this.$emit('change', copyValue)
                        }
                    } else {
                        // 单选，选择所有非收束节点
                        if (!data[this.conditionProps]) {
                            // 点击非收束子节点
                            if (data.checked) {
                                this.$set(data, 'checked', false)
                                this.value = []
                                this.$emit('change', this.value)
                            } else {
                                this.$set(data, 'checked', true)
                                const selectData = _.cloneDeep(data)
                                delete selectData.children
                                delete selectData._c_tree_self_id
                                this.value = [selectData]
                                this.$emit('change', this.value)
                            }
                        }
                    }
                }
            },
            getAllChildren(data, res) {
                (data.children || []).forEach(item => {
                    this.getAllChildren(item, res)
                })
                this.$set(data, 'checked', true)
                if ((data.children || []).length) {
                    this.$set(data, 'halfChecked', false)
                }
                if (!data[this.conditionProps]) {
                    res.push(data)
                }
                return res
            },
            createdId(index) {
                return this._c_tree_parent_id === '' ? index + this._c_tree_parent_id : this._c_tree_parent_id + '-' + index
            },
        },
        watch: {
            listData: {
                handler(v) {
                    if (!_.isEqual(v, this.copyListData)) {
                        this.$set(this, 'copyListData', _.cloneDeep(v).map((item, index) => {
                            item._c_tree_self_id = this.createdId(index)
                            return item
                        }))
                    }
                },
                deep: true,
                immediate: true
            },
            copyListData: {
                handler(v) {
                    // 递归查找checked的选项，加入数组中
                    // 判断父元素是否是checked 或者  halfChecked, 否则直接跳出
                },
                deep: true,
                immediate: true
            }
        },
        render(h) {
            const markIconHeight = _.get(this.$slots, "mark-icon.0.propsData.height", 0) ||
                _.result(this.$slots, "'mark-icon'.0.componentOptions.Ctor.extendOptions.props.height.default", 0) || 18
            const prefix = this.prefix ? `${this.prefix}-` : ''

            if (!this.copyListData.length) {
                return null
            }
            return h(
                'ul',
                [
                    (this.copyListData).map((item, index) => {
                        return h(
                            'li',
                            {
                                class: [
                                    ...classNames({
                                        [prefix + 'tree-li']: true
                                    }).split(' ')
                                ],
                            },
                            [
                                h(
                                    'div',
                                    {
                                        class: []
                                    },
                                    [
                                        h(
                                            'div',
                                            {
                                                style: {
                                                    height: markIconHeight * 1.5 + 'px'
                                                }
                                            },
                                            this.createLine(h)
                                        ),
                                        h(
                                            'div',
                                            {
                                                style: {
                                                    display: 'flex',
                                                    flex: 1,
                                                }
                                            },
                                            [
                                                h(
                                                    'div',
                                                    {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            flex: 1
                                                        },
                                                    },
                                                    [
                                                        this.createIconMark(h, item),
                                                        this.createFileIcon(h, item),
                                                        this.createTitle(h, item),
                                                    ]
                                                ),
                                                h(
                                                    'span',
                                                    {},
                                                    [
                                                        this.createControllersIcon(h, item),
                                                    ]
                                                )
                                            ]
                                        ),
                                    ]
                                ),
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

        &-title-wrap {
            cursor: pointer;
            flex: 1;

            &:hover {
                color: $primary;
            }
        }

        &-title-wrap.active {
            color: $primary;
            font-weight: bold;
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

