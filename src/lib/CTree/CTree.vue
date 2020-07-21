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
                default(){
                    return 'node'
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
        mounted() {
            this.copyListData = _.cloneDeep(this.listData)
        },
        watch: {
            listData: {
                handler(v, old) {
                    if(!_.isEqual(v, old)) {
                        this.$set(this, 'copyListData', _.cloneDeep(v))
                    }
                },
                deep: true,
                immediate: true
            }
        },
        render(h) {
            const markIconWidth = _.get(this.$slots, "mark-icon.0.propsData.width", 0) ||
                _.result(this.$slots, "'mark-icon'.0.componentOptions.Ctor.extendOptions.props.width.default", 0) || 18
            const markIconHeight = _.get(this.$slots, "mark-icon.0.propsData.height", 0) ||
                _.result(this.$slots, "'mark-icon'.0.componentOptions.Ctor.extendOptions.props.height.default", 0) || 18
            const prefix = this.prefix ? `${this.prefix}-` : ''
            const rfKey = this.reflectKey['key']
            const rfValue = this.reflectKey['key']
            // 展开图标
            const createIconMark = (data) => {
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
            }
            // 树形连线
            const createLine = () => {
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
            }
            // 文件图标
            const createFileIcon = () => {
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
                    attrs: {},
                    style: {
                        margin: '0 6px'
                    }
                })
            }
            // 文件图标
            const createControllersIcon = (data) => {
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
            }
            // 标题
            const createTitle = (data) => {
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
                                style:{
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
                const  checkboxData = _.cloneDeep(data)
                delete checkboxData.children
                console.log(checkboxData)
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
                        click: () => {
                            // 单选仅能选根结点
                            if (!this.multiple && !data.disabled && !data[this.conditionProps]) {
                                this.$set(data,'checked', true)
                                this.value = [data]
                                this.$emit('change', this.value)
                            }
                            // 多选, 点击根结点
                            if (this.multiple && !data.disabled && !data[this.conditionProps]) {
                                const {value} = this.$attrs
                                const index = (value || []).findIndex(item => item[rfValue] === data[rfValue])
                                if (index > -1) {
                                    value.splice(index, 1)
                                } else {
                                    value.push(data)
                                }
                                this.$set(data,'checked', true)
                                this.value = [data]
                                this.$emit('change', value)
                            }
                            // 多选, 点击父节点
                            if (this.multiple && !data.disabled && data[this.conditionProps]) {
                                const getAllChildren = (data, res)=> {
                                    (data.children || []).forEach(item=>{
                                        getAllChildren(item,res)
                                    })
                                    data.checked =true
                                    if((data.children || []).length){
                                        data.halfChecked = false
                                    }
                                    if(!data[this.conditionProps]){
                                        res.push(data)
                                    }
                                    return res
                                }
                                const flatObj = getAllChildren(data, [])
                                let {value} = this.$attrs
                                if(flatObj.every(item=>(value || []).findIndex(v=> v[rfValue] === item[rfValue])>-1)){
                                    value =  (value || []).filter(item=> !flatObj.some(ele => ele[rfValue] === item[rfValue]))
                                }else{
                                    value = (value || []).filter(item=> !flatObj.some(ele => ele[rfValue] === item[rfValue]))
                                    value = (value || []).concat(flatObj)
                                }
                                this.$emit('change', value)
                            }

                        }
                    },
                }, [
                    h(
                        'CCheckbox',
                        {
                          props:{
                              value: data,
                              checkedData: [data],
                              reflectKey: this.reflectKey,
                              width: '16',
                              height: '16'
                          }
                        },
                    ),
                    childrenVnode
                ])
            }
            // 递归树形图标
            const createTree = (data) => {
                const obj = Object.keys(this.$props).map(key => {
                    return {
                        [key]: this.$props[key]
                    }
                })
                if (data.expand) {
                    return h('CTree',
                        {
                            attrs: {
                                ...this.$attrs
                            },
                            props: {
                                // ...obj,
                                lineStartLv: this.lineStartLv + 1,
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
                                return h(
                                    tag,
                                    {
                                        props: {
                                            ...this.$slots[key][0].componentOptions.propsData
                                        },
                                        ...this.$slots[key][0].data
                                    }
                                )

                            })
                        ]
                    )
                }
                return null
            }
            if (!this.copyListData.length) {
                return null
            }
            return h(
                'ul',
                [
                    (this.copyListData).map((item) => {
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
                                            [...createLine()]
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
                                                        createIconMark(item),
                                                        createFileIcon(item),
                                                        createTitle(item),
                                                    ]
                                                ),
                                                h(
                                                    'span',
                                                    {},
                                                    [
                                                        createControllersIcon(item),
                                                    ]
                                                )
                                            ]
                                        ),
                                    ]
                                ),
                                createTree(item)
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

