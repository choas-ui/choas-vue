<!--suppress JSAnnotator -->
<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    export default {
        name: 'Tree',
        function: true,
        props: {
            prefix: {
                type: String,
                default() {
                    return ''
                }
            },
            className: {
                type: String,
                default() {
                    return ''
                }
            },
            fileIcon: {
                type: Boolean
            },
            line: {
                type: Boolean
            },
            multiple: {
                type: Boolean
            },
            lineStartLv: {
                type: Number,
                default() {
                    return 0
                }
            },
            itemKey: {
                type: String,
                default() {
                    return '0'
                }
            },
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
            searchStr: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        model:{
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
        methods: {},
        watch: {
            searchStr(v) {
                // 筛选
                const key = this.reflectKey['key']
                const filterTree = (data) => {
                   data.forEach((item)=>{
                       if(item.children){
                           filterTree(item.children)
                       }
                       if(item[key].indexOf(v)>-1 || (item.children||[]).some(item=>item.expand)){
                           this.$set(item,'expand', true)
                       }else{
                           this.$set(item,'expand', false)
                       }
                   })
                    return data
                }
                let res = null
                if (v) {
                    res = filterTree(_.cloneDeep(this.listData)).filter(item=>item.expand)
                } else {
                    res = _.cloneDeep(this.listData)
                }
                this.$set(this,'copyListData', res)
            },
            listData:{
                handler(v){
                    this.copyListData = _.cloneDeep(v)
                },
                deep: true,
                immediate: true
            }
        },
        render(h) {
            const markIconWidth = _.get(this.$slots, "icon-mark.0.propsData.width", 0) ||
                _.result(this.$slots, "'icon-mark'.0.componentOptions.Ctor.extendOptions.props.width.default", 0) || 18
            const markIconHeight = _.get(this.$slots, "icon-mark.0.propsData.height", 0) ||
                _.result(this.$slots, "'icon-mark'.0.componentOptions.Ctor.extendOptions.props.height.default", 0) || 18
            const prefix = this.prefix ? `${this.prefix}-` : ''
            let path = this.itemKey.slice(2).split('-').join('.children.')
            let selfPath = ''
            if (path) {
                selfPath = 'children.' + path
            } else {
                selfPath = ''
            }
            const data = path ? _.get(this.copyListData, selfPath, []) : this.copyListData

            // 展开图标
            const createIconMark = (data) => {
                if (!(data.children || []).length) {
                    return null
                }
                if (this.$slots['icon-mark']) {
                    return h('span', {
                        class: [],
                        style: {
                            transform: data.expand || !(data.children || []).length ? 'rotate(90deg)' : ''
                        },
                        on: {
                            click: () => {
                                this.$set(data, 'expand', !data.expand)
                            }
                        }
                    }, this.$slots['icon-mark'])
                }
                return h('CIcon', {
                    props: {
                        'icon-name': "choas-fill-arrow-right",
                    },
                    style: {
                        transform: data.expand || !(data.children || []).length ? 'rotate(90deg)' : 'rotate(0)'
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
                                        width: (markIconWidth / 2) + markIconWidth * 1.5 - 1 + 'px',
                                    }
                                },
                                [
                                ]
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
            const createFileIcon = (data) => {
                if (!this.fileIcon && !this.$slots['file-icon']) {
                    return null
                }
                if (this.$slots['file-icon']) {
                    return h(
                        'span',
                        {},
                        [this.$slots['file-icon']]
                    )
                }
                return h('CIcon', {
                    props: {
                        'icon-name': "choas-file-icon",
                    },
                    attrs: {
                        style: {
                            transform: data.expand && 'rotate(90deg)'
                        }
                    }
                })
            }
            // 文件图标
            const createTailIcon = () => {
                if (!this.$slots['tail']) {
                    return null
                }
                if (this.$slots['tail']) {
                    return h('div', this.$slots['tail'])
                }
            }
            // 标题
            const createTitle = (data) => {
                const content = data[this.reflectKey['key']] || ''
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
                                content.slice(index+this.searchStr.length,)
                            ]
                        )
                    )
                }else{
                    childrenVnode.push(
                        h(
                            'span',
                            {},
                            [
                                content
                            ]
                        )
                    )
                }
                return h('span', {
                    style: {
                        marginLeft: markIconWidth / 4 + 'px',
                        display: 'flex',
                    },
                    attrs: {
                        title: content,
                    },
                    class: [
                        ...classNames(
                            {
                              'active': data[this.reflectKey['value']] === _.get(this.$attrs.value, '0.'+this.reflectKey['value'], '')
                            },
                            {
                                [prefix + 'tree-title-wrap']: true
                            }
                        ).split(' ')
                    ],
                    on: {
                        click: () => {
                            if(!this.multiple && !data.disable && !(data.children || []).length){
                                this.value = [data]
                                this.$emit('change', this.value)
                            }
                        }
                    },

                }, [
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
                if(data.expand){
                    return h('CTree',
                        {
                            attrs: {
                                ...this.$attrs
                            },
                            props: {
                                ...obj,
                                lineStartLv: this.lineStartLv + 1,
                                listData: data.children,
                                line: this.line,
                                fileIcon: this.fileIcon,
                                reflectKey: this.reflectKey,
                                searchStr: this.searchStr,
                            },
                            on: this.$listeners
                        },
                        [
                            ...Object.keys(this.$slots).map((key) => {
                                const {tag} = this.$slots[key][0].componentOptions
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
                {},
                [
                    (data).map(item=>{
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
                                                        createTitle(item)
                                                    ]
                                                ),
                                                h(
                                                    'div',
                                                    {},
                                                    [
                                                        createTailIcon(item),
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
        font-size: addPX($lg-fs);

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
            padding-left: addPX($sm-padding);
            flex: 1;

            &:hover {
                background: $info;
                color: #fff;
            }
        }

        &-title-wrap.active {
            background: $info;
            color: #fff;
        }

        &-icon-mark-box {
            display: inline-block;
        }

        &-vertical-line {
            display: inline-block;
            text-align: right;

            & > span {
                display: inline-block;
                width: 1px;
                height: 100%;
                border-right: 1px solid #c2c2c2;
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
                border-bottom: 1px solid #c2c2c2;
            }
        }
    }
</style>

