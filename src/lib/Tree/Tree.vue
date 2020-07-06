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
            lineStartLv: {
                type: Number,
                default() {
                    return 0
                }
            },
            listData: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {}
        },
        render(h) {
            const {
                listData,
                lineStartLv,
                line,
                fileIcon,
            } = this
            // 展开图标
            const createIconMark = () => {
                if (this.$slots['icon-mark']) {
                    return h('div', this.$slots['icon-mark'])
                }
                return h('Icon', {
                    props: {
                        type: 'svg',
                        'icon-name': "choas-fill-arrow-right"
                    }
                })
            }
            // 树形连线
            const createLine = () => {
                if (!line || !lineStartLv) {
                    return []
                }
                const markIconWidth = _.get(this.$slots, "icon-mark.0.propsData.width", 0) ||
                    _.result(this.$slots, "'icon-mark'.0.componentOptions.Ctor.extendOptions.props.width.default", 0) || 18
                const markIconHeight = _.get(this.$slots, "icon-mark.0.propsData.height", 0) ||
                    _.result(this.$slots, "'icon-mark'.0.componentOptions.Ctor.extendOptions.props.height.default", 0) || 18
                const prefix = this.prefix ? `${this.prefix}-`: ''
                const eleArr = []
                const countArr = new Array((lineStartLv) * 2).fill(1)
                for (let i = 0; i < countArr.length; i++) {
                    if (!(i % 2)) {
                        const ele = h(
                            'span',
                            {
                                class: [
                                    ...classNames(
                                        {
                                            [prefix+"tree-vertical-line"]: true
                                        }
                                    )
                                ],
                                style: {
                                    width: (markIconWidth / 2) + 'px',
                                    height: markIconHeight + 'px'
                                }
                            },
                            [
                                h('span'),
                            ]
                        )
                        eleArr.push(ele)
                    } else {
                        const ele = h(
                            'span',
                            {
                                class: [
                                    ...classNames(
                                        {
                                            [prefix+"tree-vertical-line"]: true
                                        }
                                    )
                                ],
                                style: {
                                    width: (markIconWidth / 2) + 'px',
                                    height: markIconHeight + 'px'
                                }
                            },
                            []
                        )
                        eleArr.push(ele)
                    }
                }
                eleArr.push(h(
                    'span',
                    {
                        class: [
                            ...classNames(
                                {
                                    [prefix+"tree-vertical-line"]: true
                                }
                            )
                        ],
                        style: {
                            width: (markIconWidth / 2) + 'px',
                            height: markIconHeight + 'px'
                        }
                    },
                    [
                        h('span')
                    ]
                ))
                eleArr.push(h(
                    'span',
                    {
                        class: [
                            ...classNames(
                                {
                                    [prefix+"tree-align-line"]: true
                                }
                            )
                        ],
                        style: {
                            width: (markIconWidth / 2) + 'px',
                            height: markIconHeight + 'px'
                        }
                    },
                    [
                        h('span')
                    ]
                ))
                return eleArr
            }
            // 文件图标
            const createFileIcon = () => {
                if (!fileIcon && !this.$slots['icon-icon']) {
                    return null
                }
                if (this.$slots['icon-icon']) {
                    return h('div', this.$slots['icon-icon'])
                }
                return h('Icon', {
                    props: {
                        type: 'svg',
                        'icon-name': "choas-file-icon"
                    }
                })
            }
            // 递归树形图标
            const createTree = () => {
                if (!(listData.children || []).length) {
                    return null
                }
                return (listData.children || []).map((item, index) => {
                    return h('Tree',
                        {
                            props: {
                                'line-start-lv': lineStartLv + 1,
                                key: index,
                                'list-data': item,
                                line,
                                fileIcon,
                            }
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
                })
            }
            return h(
                'ul',
                {},
                [
                    h(
                        'li',
                        {

                        },
                        [
                            h(
                                'div',
                                {

                                },
                                [
                                    ...createLine(),
                                    createIconMark(),
                                    createFileIcon(),
                                    h('span', {}, [listData.title])
                                ]
                            ),
                            createTree()
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

    ul {
        padding: 0;
        margin: 0;
        line-height: 0;

        li {
            list-style: none;

            & > div {
                display: flex;
                align-items: center;
            }
        }
    }

    .tree {
        &-icon-mark-box {
            display: inline-block;
        }
        &-vertical-line {
            display: inline-block;
            vertical-align: middle;
            text-align: right;

            & > span {
                display: inline-block;
                width: 1px;
                height: 100%;
                border-left: 1px dotted #888;
            }
        }
        &-align-line {
            vertical-align: middle;
            text-align: left;
            align-items: center;
            display: flex;

            & > span {
                display: flex;
                height: 1px;
                width: 60%;
                border-bottom: 1px dotted #888;
            }
        }
    }
</style>

