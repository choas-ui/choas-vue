<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    export default {
        name: 'CSelection',
        props: {
            listData: {
                type: Array,
                default() {
                    return []
                }
            },
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            multiple: {
                type: Boolean
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
            // 高度
            size: {
                validate(v) {
                    return !v || ['ssmall', 'small', 'default', 'large', 'llarge'].includes(v)
                },
                default() {
                    return 'default'
                }
            },
            splitText:{
                type: String,
                default(){
                    return ' '
                }
            },
            splitHandle:{
                type: Function,
            },
        },
        data() {
            return {
                isDropUlShow: false,
                copyValue: [],
                newOptionStr: '',
            };
        },
        computed: {
            getSelectWrapStyle() {
                if (this.multiple) {
                    return {
                        border: `1px solid ${this.isDropUlShow ? '#1890ff' : '#aaa'}`,
                        padding: '0 7px'
                    }
                }
                return null
            },
            getSelectWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames(
                    {
                        [prefix + 'selection-llarge']: this.size==='llarge',
                        [prefix + 'selection-large']: this.size==='large',
                        [prefix + 'selection-default']: this.size==='default',
                        [prefix + 'selection-small']: this.size==='small',
                        [prefix + 'selection-ssmall']: this.size==='ssmall',
                        [prefix + 'selection-wrap']: true,
                    }
                );
            },
            getSelectedValue() {
                return _.get(this.value, '0.' + [this.reflectKey['value']], '');
            }
        },
        mounted() {
            this.$nextTick(() => {
                document.addEventListener('click', ({target}) => {
                    if (this.$refs.selection && !this.$refs.selection.contains(target)) {
                        this.isDropUlShow = false
                    }
                })
            })
        },
        methods: {
            showDropDown() {
                this.isDropUlShow = true
            },
            iconClick() {
                this.isDropUlShow = !this.isDropUlShow
            },
            multipleSelected(data) {
                const keyOfValue = this.reflectKey['value'];
                if (this.multiple) {
                    const index = this.value.findIndex(v => v[keyOfValue] === data[keyOfValue]);
                    index > -1 ?
                        this.copyValue.splice(index, 1) :
                        this.copyValue.push(data);
                } else {
                    this.$set(this, 'copyValue', [data]);
                }
            }
        },
        watch: {
            value: {
                handler(v) {
                    if (!_.isEqual(v, this.copyValue)) {
                        this.$set(this, 'copyValue', _.cloneDeep(v));
                        // 单选条件下 选择框初始化
                        if(!this.multiple){
                            this.newOptionStr= v[0][this.reflectKey['key']]
                        }
                    }
                },
                deep: true,
                immediate: true
            },
            copyValue: {
                handler(v) {
                    if (!_.isEqual(v, this.value)) {
                        this.$emit('input', v)
                    }
                    this.isDropUlShow = true
                },
                deep: true
            },
        },
        render(h) {
            return h('div',
                {
                    class: this.getSelectWrapClass,
                    style: this.getSelectWrapStyle,
                    ref: 'selection'
                },
                [
                    this.multiple && this.copyValue.map(item => {
                        return h('CTag',
                            {
                                props: {
                                    size: this.size,
                                    key: item[this.reflectKey['value']],
                                },
                                on: {
                                    close: () => {
                                        this.multipleSelected(item);
                                    }
                                }
                            },
                            [
                                item[this.reflectKey['key']]
                            ]
                        )
                    }),
                    h('span',
                        {
                            class: 'selection-input-wrap'
                        },
                        [
                            h('CInput',
                                {
                                    props: {
                                        type: 'text',
                                        placeholder: this.placeholder,
                                        noBorder: this.multiple,
                                        size: 'small'
                                    },
                                    attrs:{
                                        value: this.newOptionStr
                                    },
                                    ref: 'cInput',
                                    style: {
                                        border: this.multiple ? 'none' : null,
                                    },
                                    on: {
                                        focus: this.showDropDown,
                                        input: (v)=>{
                                            this.newOptionStr = v
                                        },
                                        keyup: (keyCode)=>{
                                            if(keyCode === 'Enter' && this.newOptionStr){
                                                if(this.multiple){
                                                    if(this.splitText){
                                                        this.copyValue.push(...this.newOptionStr.split(this.splitText).map(v=>{
                                                            return {
                                                                [this.reflectKey['key']]: v,
                                                                [this.reflectKey['value']]: v,
                                                            };
                                                        }));
                                                    }else if(typeof this.splitHandle === 'function'){
                                                        const arr = this.splitHandle(this.newOptionStr);
                                                        this.copyValue.push(...arr);
                                                    }
                                                }else{
                                                    this.$set(this, 'copyValue',[
                                                        {
                                                            [this.reflectKey['key']]: this.newOptionStr,
                                                            [this.reflectKey['value']]: this.newOptionStr,
                                                        }
                                                    ])
                                                }
                                                this.newOptionStr = ''
                                            }
                                        }
                                    }
                                }
                            ),
                            h('CIcon',
                                {
                                    props: {
                                        iconName: 'choas-arrow-down'
                                    },
                                    style: {
                                        position: 'absolute',
                                        right: '10px',
                                        top: '10px',
                                        transform: this.isDropUlShow ? 'rotate(180deg)' : 'rotate(0)',
                                        transition: 'all 0.3s'
                                    },
                                    on: {
                                        click: (e) => {
                                            e.preventDefault();
                                            this.iconClick(e);
                                        }
                                    }
                                }
                            )
                        ]
                    ),
                    h('ul',
                        {
                            style: {
                                display: this.isDropUlShow ? 'inline-block' : 'none',
                                top: `calc(100% + 4px)`
                            },
                            ref: 'dropUl',
                        },
                        [
                            this.listData.length && this.listData.map(item => {
                                return h('li',
                                    {
                                        key: item[this.reflectKey['value']],
                                        class: item[this.reflectKey['value']] === this.getSelectedValue ? 'active' : '',
                                        on: {
                                            click: () => {
                                                this.multipleSelected(item)
                                            }
                                        }
                                    },
                                    [
                                        item[this.reflectKey['key']]
                                    ]
                                )
                            }),
                            !this.listData.length && h('li', ['暂无数据'])
                        ]
                    )
                ]
            )
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";

    .selection {
        &-wrap {
            display: flex;
            flex-wrap: wrap;
            line-height: addPX($df-height);
            position: relative;
            box-sizing: content-box;
            align-items: center;
            ul {
                position: absolute;
                left: 0;
                width: 100%;
                border: 1px solid $lineColor;
                box-sizing: border-box;
                margin: 0;
                z-index: 999;
                background: #fff;
                padding: addPX($sm-padding) 0;
                text-align: left;
                max-height: addPX($lg-height*5);
                overflow-y: auto;

                > li {
                    list-style: none;
                    height: addPX($df-height);
                    line-height: addPX($df-height);
                    font-size: addPX($df-fs);
                    cursor: pointer;
                    box-sizing: border-box;
                    padding-left: addPX($lg-padding);

                    &:hover {
                        background: $info;
                        color: #fff;
                    }

                    .active {
                        background: $info;
                        color: #fff;
                    }
                }
            }
        }
        &-input-wrap {
            display: block;
            flex: 1;
            position: relative;
            > input {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid $lineColor;
                border-radius: addPX($sm-radius);
                padding: 0 0 0 addPX($sm-padding);

                &:focus {
                    outline: none;
                    border: 1px solid $primary;
                }
            }
        }
        &-llarge{
            line-height: addPX($llg-height);
            border-radius: addPX($sm-radius);
        }
        &-large{
            line-height: addPX($lg-height);
            border-radius: addPX($sm-radius);
        }
        &-default{
            line-height: addPX($df-height);
            border-radius: addPX($sm-radius);
        }
        &-small{
            line-height: addPX($sm-height);
            border-radius: addPX($sm-radius);
        }
        &-ssmall{
            line-height: addPX($ssm-height);
            border-radius: addPX($ssm-radius);
        }

    }
</style>
