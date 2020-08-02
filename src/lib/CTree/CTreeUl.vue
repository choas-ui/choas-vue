<script>
    import classNames from 'classnames'
    import _ from 'lodash'
    import CTreeLiContent from "./CTreeLiContent";

    export default {
        name: 'CTreeUl',
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
            markIconFixMarginRight: {
                type: Number,
                default() {
                    return 0
                }
            },
            // 文件标识图标左间距
            fileIconFixMarginRightRight: {
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
            },
            setParentNodeValue:{
                type:Function
            },
            // 在添加数据位置
            editItemId:{
                type: String,
                default(){
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
                fixedPrefix: '',
                markIconWidth: 18,
                markIconHeight: 18
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
                                            editItemId: this.editItemId, // 记录编辑数据位置
                                            changeEditItemId: this.changeEditItemId, // 设置编辑数据位置
                                            addItemId: this.addItemId, //  记录添加数据位置
                                            changeAddItemId: this.changeAddItemId, // 设置编辑数据位置
                                            editTreeNode: this.editTreeNode, // 编辑节点
                                        },
                                        on: {
                                            ...this.$listeners,
                                            changeEditItemId:(v)=>{
                                                this.$emit('changeEditItemId', v)
                                            },
                                            changeAddItemId:(v)=>{
                                                this.$emit('changeAddItemId', v)
                                            }
                                        }
                                    },
                                    [
                                        ...Object.keys(this.$slots).map((key) => {
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
                });
                if (!data.expand && this.$slots['expand-icon']) {
                    return h('span', {
                            class: className,
                            style: {
                                marginRight: `${this.markIconFixMarginRight}px`
                            },
                            on: {
                                click: () => {
                                    this.$set(data, 'expand', true)
                                }
                            }
                        },
                        this.$slots['expand-icon']
                    )
                }
                if (data.expand && this.$slots['pick-up-icon']) {
                    return h('span', {
                            class: className,
                            style: {
                                marginRight: `${this.markIconFixMarginRight}px`
                            },
                            on: {
                                click: () => {
                                    this.$set(data, 'expand', false)
                                }
                            }
                        },
                        this.$slots['pick-up-icon']
                    )
                }
                return h('CIcon', {
                    props: {
                        'icon-name': "choas-fill-arrow-right",
                    },
                    class: className,
                    style: {
                        transform: data.expand || !(data.children || []).length ? 'rotate(90deg)' : 'rotate(0)',
                        marginRight: `${this.markIconFixMarginRight}px`
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
                                        // 两倍展开图标长
                                        width: (this.markIconWidth * 2) + 'px',
                                    }
                                }
                            )
                        } else if (index >= (this.lineStartLv-1)*2) {
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
                                margin: `0 ${this.fileIconFixMarginRight}px`
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
                    return h('CTreeUl',
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
                                fileIconFixMarginRight: this.fileIconFixMarginRight,
                                markIconFixMarginRight: this.markIconFixMarginRight,
                                multiple: this.multiple, // 多选
                                checkbox: this.checkbox, // 显示选择框
                                conditionProps: this.conditionProps, // 不可选条件
                                editItemId: this.editItemId, // 记录编辑数据位置
                                changeEditItemId: this.changeEditItemId, // 设置编辑数据位置
                                addItemId: this.addItemId, // 记录添加数据位置
                                changeAddItemId: this.changeAddItemId, // 设置添加数据位置
                                setParentNodeValue: this.setParentNodeValue, // 设置父节点属性
                                editTreeNode: this.editTreeNode, // 编辑节点

                            },
                            on: {
                                changeEditItemId:(v)=>{
                                    this.$emit('changeEditItemId', v)
                                },
                                changeAddItemId:(v)=>{
                                    this.$emit('changeAddItemId', v)
                                },
                                ...this.$listeners
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
                return null
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
        },
        render(h) {
            const path = this._c_tree_parent_id;
            let theLvListData = this.copyListData || [];
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
                    &:nth-of-type(2){
                        flex: 1;
                    }
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
