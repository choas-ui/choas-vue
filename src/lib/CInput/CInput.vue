<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    const paddingNum = {
        llarge: 32,
        large: 26,
        default: 20,
        small: 14,
        ssmall: 8,
    };

    export default {
        name: 'CInput',
        props: {
            value: {
                validate(v) {
                    return typeof v === 'string' || typeof v === 'number'
                },
                default() {
                    return ''
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
            width: {
                type: String,
                default() {
                    return ''
                }
            },
            // 提示
            placeholder: {
                type: String,
                default() {
                    return ''
                }
            },
            // 列表
            listData: {
                type: Array,
                default() {
                    return [];
                }
            },
            // 列表映射
            reflectKey: {
                type: Object,
                default() {
                    return {
                        key: 'key',
                        value: 'value'
                    };
                }
            },
            // 输入框类型
            type: {
                validate(v) {
                    return ['text', 'password', 'number', 'search'].includes(v)
                },
                default() {
                    return 'text'
                }
            },
            maxLength: {
                validate(v) {
                    return typeof v === "number" && v >= 0
                }
            },
            min: {
                type: Number,
            },
            max: {
                type: Number
            },
            correctionTimeSpan: {
                type: Number,
                default() {
                    return 1
                }
            },
            // 是否显示清除按钮
            clearable: {
                type: Boolean
            },
            rows: {
                type: String,
                default() {
                    return '3'
                }
            },
            lineHeight: {
                type: String,
                default() {
                    return null
                }
            },
            // 类名
            className: {
                type: String,
                default() {
                    return ''
                }
            },
            // 前缀名
            prefix: {
                type: String,
                default() {
                    return ''
                }
            },
            // 不显示searchBtn
            noSearchBtn: {
                type: Boolean
            },
            // 生成自定义搜索按钮
            renderSearchBtn: {
                type: Function
            },
            // 取消边框
            noBorder:{
                type: Boolean
            }
        },
        data() {
            return {
                inputFocus: false,
                inputValue: '',
                canPasswordSee: false,
                timer: null
            };
        },
        mounted() {
            this.$nextTick(() => {
                document.addEventListener('click', ({target}) => {
                    if (this.$refs.label && !this.$refs.label.contains(target)) {
                        this.inputFocus = false;
                    }
                });
            });
        },
        computed: {
            getClearableStyle() {
                let right = paddingNum[this.size || 'default'] / 2;
                if (this.type === 'number') {
                    right = right + 18;
                } else {
                    if (this.$slots['behind-icon']) {
                        const {propsData: {width: behindWidth}} = this.$slots['behind-icon'][0].componentOptions;
                        right = right + behindWidth / 1 + 2;
                    }
                }
                return {
                    top: `calc(50% - 8px)`,
                    right: (right).toFixed() + 'px',
                };
            },
            // 清除按钮的类
            getClearableClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames({
                    [prefix + 'input-clearable']: true
                });
            },
            // input外框样式
            getInputStyle() {
                // 默认值
                let paddingRight = (paddingNum[this.size || 'default'] / 2);
                let paddingLeft = (paddingNum[this.size || 'default'] / 2);
                let border= `1px solid ${this.inputFocus ? "#1890ff" : "#aaa"}`;

                if (this.$slots['prefix-icon'] && (this.$slots['behind-icon'])) {
                    const {propsData: {width: prefixWidth}} = this.$slots['prefix-icon'][0].componentOptions;
                    const {propsData: {width: behindWidth}} = this.$slots['behind-icon'][0].componentOptions;
                    paddingRight = behindWidth / 1 + 4;
                    paddingLeft = prefixWidth / 1 + 6;
                }
                if (this.$slots['prefix-icon'] && !this.$slots['behind-icon']) {
                    const {propsData: {width: prefixWidth}} = this.$slots['prefix-icon'][0].componentOptions;
                    paddingRight = paddingNum[this.size || 'default'] / 2;
                    paddingLeft = prefixWidth / 1 + 6;
                }
                if (!this.$slots['prefix-icon'] && this.$slots['behind-icon']) {
                    const {propsData: {width: behindWidth}} = this.$slots['behind-icon'][0].componentOptions;
                    paddingRight = behindWidth / 2;
                    paddingLeft = paddingNum[this.size || 'default'] / 2;
                }
                if (this.clearable) {
                    paddingRight = paddingRight + 22
                }
                if (this.type === 'password') {
                    paddingRight = paddingRight + 22
                }
                if(this.noBorder){
                    border ='none'
                }
                return {
                    border,
                    position: 'relative',
                    padding: `0 ${paddingRight.toFixed()}px 0 ${paddingLeft.toFixed()}px`,
                    borderBottomRightRadius: this.type === 'search' && !this.noSearchBtn ? 0 : null,
                    borderTopRightRadius: this.type === 'search' && !this.noSearchBtn ? 0 : null,
                }
            },
            // input外框类
            getInputClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames(
                    {
                        [prefix + 'input-llarge']: this.size === 'llarge',
                        [prefix + 'input-large']: this.size === 'large',
                        [prefix + 'input-default']: this.size === 'default',
                        [prefix + 'input-small']: this.size === 'small',
                        [prefix + 'input-ssmall']: this.size === 'ssmall',
                        [prefix + 'input']: true,
                    }
                )
            },
            getInputWrapStyle() {
                return {
                    width: this.width ? this.width + 'px' : '100%',
                }
            },
            // 组件外壳
            getInputWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames(
                    {
                        [prefix + 'input-wrap']: true
                    }
                )
            }
        },
        methods: {
            // 清除
            clearHandle() {
                this.inputValue = '';
            },
            // 查看密码
            seePasswordHandle() {
                let timer = 0;
                if (this.canPasswordSee) {
                    this.canPasswordSee = false
                } else {
                    this.canPasswordSee = true;
                    timer && clearInterval(timer);
                    timer = setTimeout(() => {
                        this.canPasswordSee = false
                    }, 2000)
                }
            },
            // 前置图标
            createPrefixIcon(h) {
                if (!this.$slots['prefix-icon']) {
                    return null
                }
                const {propsData, propsData: {height}, listeners} = this.$slots['prefix-icon'][0].componentOptions;
                return h('CIcon',
                    {
                        props: {
                            ...propsData,
                        },
                        style: {
                            position: 'absolute',
                            left: '6px',
                            top: `calc(50% - ${(height / 2 + 1).toFixed(0)}px)`,
                            zIndex: 10
                        },
                        on: listeners
                    },
                )
            },
            // 后置图标
            createBehindIcon(h) {
                if (this.type === 'password') {
                    return h('CIcon',
                        {
                            props: {
                                iconName: this.canPasswordSee ? 'choas-close-eye' : 'choas-eye',
                                color: '#aaa'
                            },
                            class: this.getClearableClass,
                            style: this.getClearableStyle,
                            on: {
                                click: (e) => {
                                    this.seePasswordHandle(e);
                                }
                            }
                        })
                }
                if (this.type === 'number') {
                    let width = (paddingNum[this.size || 'default'] * 0.6).toFixed();
                    let height = (paddingNum[this.size || 'default'] * 0.6).toFixed();
                    width = width > 8 ? width : '8';
                    height = height > 8 ? height : '8';
                    return [
                        h('CIcon',
                            {
                                props: {
                                    iconName: 'choas-add',
                                    width,
                                    height,
                                },
                                style: {
                                    position: 'absolute',
                                    right: `${paddingNum[this.size || 'default'] / 2}px`,
                                    top: `calc(50% - ${height / 1 + 1}px)`,
                                    background: '#eee',
                                    width: `${width < 16 ? 16 : width}px`
                                },
                                on: {
                                    click: () => {
                                        this.inputValue = this.inputValue / 1 + 1;
                                        if (this.max !== undefined && this.inputValue >= this.max) {
                                            this.inputValue = this.max
                                        }
                                    }
                                },
                            }
                        ),
                        h('CIcon',
                            {
                                props: {
                                    iconName: 'choas-min',
                                    width,
                                    height,
                                },
                                style: {
                                    position: 'absolute',
                                    right: `${paddingNum[this.size || 'default'] / 2}px`,
                                    bottom: `calc(50% - ${height / 1 + 1}px)`,
                                    background: '#eee',
                                    width: `${width < 16 ? 16 : width}px`
                                },
                                on: {
                                    click: () => {
                                        this.inputValue = this.inputValue / 1 - 1;
                                        if (this.min !== undefined && this.inputValue <= this.min) {
                                            this.inputValue = this.min
                                        }
                                    }
                                },
                            }
                        )
                    ]
                }
                if (!this.$slots['behind-icon']) {
                    return null
                }
                const {propsData, propsData: {height}, listeners} = this.$slots['behind-icon'][0].componentOptions;
                return h('CIcon',
                    {
                        props: propsData,
                        style: {
                            position: 'absolute',
                            right: `${paddingNum[this.size || 'default'] / 2}px`,
                            top: `calc(50% - ${(height / 2).toFixed(0)}px)`
                        },
                        on: listeners
                    },
                )
            },
            createSearchBtn(h) {
                if (this.type !== 'search') {
                    return null
                }
                if (this.type === 'search' && this.noSearchBtn) {
                    return null
                }
                if (typeof this.renderSearchBtn === 'function') {
                    return this.renderSearchBtn(h);
                }
                return h('CButton',
                    {
                        props: {
                            size: this.size
                        },
                        style: {
                            borderBottomLeftRadius: !this.noSearchBtn ? 0 : null,
                            borderTopLeftRadius: !this.noSearchBtn ? 0 : null,
                            display: 'inline-flex'
                        },
                        on: {
                            click: (e) => {
                                this.$emit('search', e)
                            }
                        }
                    },
                    [
                        h('CIcon',
                            {
                                slot: 'left',
                                props: {
                                    iconName: 'choas-search',
                                    color: '#fff',
                                }
                            }
                        ),
                        '搜 索'
                    ]
                )
            }
        },
        watch: {
            value: {
                handler(v) {
                    this.inputValue = v
                },
                immediate: true
            },
            // 内部维护值
            inputValue: {
                handler(v) {
                    if (!_.isEqual(v, this.value)) {
                        this.$emit('input', v);
                    }
                },
                immediate: true
            },
        },
        render(h) {
            return h('label',
                {
                    class: this.getInputWrapClass,
                    style: this.getInputWrapStyle,
                    ref: 'label',
                    on: {
                        click: () => {
                            this.inputFocus = true
                        }
                    }
                },
                [
                    // 前置图标
                    this.createPrefixIcon(h),
                    ['search', 'text', 'number', 'password'].includes(this.type) && h('input',
                        {
                            class: this.getInputClass,
                            style: this.getInputStyle,
                            ref: 'input',
                            attrs: {
                                type: ['search', 'text',].includes(this.type) ?
                                    'text' : ['number'].includes(this.type) ?
                                        this.type : this.canPasswordSee ?
                                            'text' : 'password'
                            },
                            domProps: {
                                value: this.inputValue,
                                placeholder: this.placeholder,
                                maxLength: this.maxLength
                            },
                            on: {
                                paste: (e) => {
                                    this.inputValue = e.target.value
                                },
                                cut: (e) => {
                                    this.inputValue = e.target.value;
                                },
                                input: (e) => {
                                    this.inputValue = e.target.value;
                                    if (this.type === 'number') {

                                        clearTimeout(this.timer);
                                        this.timer = setTimeout(() => {
                                            if (this.max !== undefined && this.inputValue >= this.max) {
                                                this.inputValue = this.max
                                            }
                                            if (this.min !== undefined && this.inputValue <= this.min) {
                                                this.inputValue = this.min
                                            }
                                        }, this.correctionTimeSpan * 1000);
                                    }
                                },
                                change: (e) => {
                                    this.inputValue = e.target.value
                                },
                                keyup: (e) => {
                                    this.$emit('keyup', e.code)
                                },
                                focus:(e)=>{
                                  this.$emit('focus', e)
                                },
                                blur: (e) => {
                                    this.inputValue = e.target.value
                                },

                            }
                        }
                    ),
                    ['textArea'].includes(this.type) && h('textArea',
                        {
                            class: this.getInputClass,
                            style: {
                                ...this.getInputStyle,
                                height: 'auto',
                                lineHeight: this.lineHeight ? `${this.lineHeight}px` : null
                            },
                            ref: 'input',
                            domProps: {
                                value: this.inputValue,
                                placeholder: this.placeholder,
                                rows: this.rows,
                            },
                            on: {
                                paste: (e) => {
                                    this.inputValue = e.target.value
                                },
                                cut: (e) => {
                                    this.inputValue = e.target.value
                                },
                                input: (e) => {
                                    this.inputValue = e.target.value
                                },
                                change: (e) => {
                                    this.inputValue = e.target.value
                                },
                                focus:(e)=>{
                                    this.$emit('focus', e)
                                },
                                blur: (e) => {
                                    this.inputValue = e.target.value
                                },

                            }
                        }
                    ),
                    // 清除输入按钮 仅仅在文本模式显示
                    this.clearable &&
                    h('CIcon',
                        {
                            props: {
                                iconName: 'choas-fill-danger',
                                color: '#aaa'
                            },
                            class: this.getClearableClass,
                            style: this.getClearableStyle,
                            on: {
                                click: (e) => {
                                    this.clearHandle(e);
                                }
                            }
                        }),
                    // 后置图标
                    this.createBehindIcon(h),
                    this.createSearchBtn(h)
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

    .input-wrap {
        display: inline-flex;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .input {
        outline: none;
        box-sizing: border-box;
        width: 100%;
        border-radius: addPX($ssm-radius);

        > div {
            outline: none;
            border: none;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            color: scale_color($lineColor, $lightness: -80%);
        }

        &-llarge {
            height: addPX($llg-height);
            line-height: addPX($llg-height - 2);
            font-size: addPX($llg-fs);
        }

        &-large {
            height: addPX($lg-height);
            line-height: addPX($lg-height - 2);
            font-size: addPX($lg-fs);
        }

        &-default {
            height: addPX($df-height);
            line-height: addPX($df-height - 2);
            font-size: addPX($df-fs);
        }

        &-small {
            height: addPX($sm-height);
            line-height: addPX($sm-height - 2);
            font-size: addPX($sm-fs);
        }

        &-ssmall {
            height: addPX($ssm-height);
            line-height: addPX($ssm-height - 2);
            font-size: addPX($ssm-fs);
        }

        &-clearable {
            position: absolute;
        }
    }
    // 移除input number的加减样式
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
    }
    // 移除input number的加减样式
    /* chrome */
    input[type="number"] {
        -moz-appearance: textfield; /* firefox */

    }
</style>
