<template>
    <div :class="getInputWrapClass">
        <label hidden>
            <input :type="type" :value="inputValue">
        </label>
        <div>
            <slot name="prefix-icon"></slot>
            <div :class="getInputClass"
                 :style="getInputStyle"
            >
                <CIcon v-if="clearable && type ==='text'"
                       icon-name="choas-fill-danger"
                       :class-name="getClearableClass"
                       :style="getClearableStyle"
                       @click="clearHandle"
                       color="#aaa"
                />
                <CIcon v-if="type ==='password'"
                       :icon-name="canPasswordSee ?'choas-close-eye':'choas-eye'"
                       :class-name="getClearableClass"
                       :style="getClearableStyle"
                       @click="seePasswordHandle"
                       color="#aaa"
                />
            </div>
            <slot name="behind-icon"></slot>
        </div>

    </div>
</template>

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
            // 高度
            size: {
                validate(v) {
                    return !v || ['ssmall', 'small', 'default', 'large', 'llarge'].includes(v)
                },
                default() {
                    return 'default'
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
            // 自动完成格式 用于生成自动完成的列表
            autocompleteFormat: {
                validate(v) {
                    return typeof v === "function" || typeof v === 'string';
                },
            },
            // 输入框类型
            type: {
                validate(v) {
                    return ['text', 'password'].includes(v)
                },
                default() {
                    return 'text'
                }
            },
            // 是否显示清除按钮
            clearable: {
                type: Boolean
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
            value: {}
        },
        model: {
            prop: 'value',
            event: 'changeValue'
        },
        data() {
            return {
                inputFocus: false,
                inputValue: '',
                canPasswordSee: false
            };
        },
        mounted() {
            const obj = this.$refs.div;
            // 禁止复制富文本
            obj.addEventListener('paste', e => {
                // 阻止默认的复制事件
                e.preventDefault();
                // 获取页面文本选区
                let txt = e.clipboardData.getData('text/plain');
                // 获取复制的文本
                let range = window.getSelection().getRangeAt(0);
                // 删除默认选中文本
                range.deleteContents();
                // 创建一个文本节点，用于替换选区文本
                let pasteTxt = document.createTextNode(txt);
                // 插入文本节点
                range.insertNode(pasteTxt);
                // 将焦点移动到复制文本结尾
                range.collapse(false);
            });
            // 设置密码样式
            this.setInputDomValue(obj)
        },
        computed: {
            getClearableStyle() {
                return {
                    top: `calc(50% - 8px)`,
                    right: paddingNum[this.size || 'default'] + 'px',
                }
            },
            getClearableClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames({
                    [prefix + 'input-clearable']: true
                })
            },
            getPlaceholderStyle() {
                return {
                    position: 'absolute',
                    left: paddingNum[this.size || 'default'] + 'px',
                    top: 0,
                    color: '#aaa'
                }
            },
            getContentStyle() {
                return {
                    marginRight: this.clearable ? 18 + 'px' : 0
                }
            },
            // input外框样式
            getInputStyle() {
                let padding = `0 ${paddingNum[this.size || 'default']}px`;
                if (this.$slots['prefix-icon'] && this.$slots['behind-icon']) {
                    padding = `0`;
                }
                if (this.$slots['prefix-icon'] && !this.$slots['behind-icon']) {
                    padding = `0 ${paddingNum[this.size || 'default']}px 0 0`;
                }
                if (!this.$slots['prefix-icon'] && this.$slots['behind-icon']) {
                    padding = `0 0 0 ${paddingNum[this.size || 'default']}px`;
                }
                return {
                    border: `1px solid ${this.inputFocus ? "#1890ff" : "#aaa"}`,
                    position: 'relative',
                    padding,
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
            // 输入
            inputHandle(e) {
                const obj = this.$refs.div;
                if (e.inputType === 'insertCompositionText') {
                    return
                }
                if (e.inputType === 'insertParagraph') {
                    // 回车键时阻止创建新的一行
                }
                if (e.inputType === 'deleteContentBackward') {
                    let slicePos = this.inputValue.length - 1;
                    slicePos = slicePos > 0 ? slicePos : 0;
                    // 防止副文本删除导致的光标上移问题
                    this.inputValue = slicePos ? this.inputValue.slice(0, slicePos) : '';
                }
                if (e.inputType === 'insertText') {
                    this.inputValue += e.data;
                }
                this.setInputDomValue(obj);
                this.setEndTextPos(obj);
                if (this.value !== this.inputValue) {
                    // 触发input事件
                    this.$emit('input', this.inputValue)
                }

            },
            // 中文输入
            changeHandleEnd(e) {
                const obj = this.$refs.div;
                if (this.type === 'text') {
                    this.inputValue += e.data;
                } else {
                    this.setInputDomValue(obj);
                    this.setEndTextPos(obj)
                }
            },
            // 焦点
            focusHandle() {
                // 设置焦点
                this.inputFocus = true;
                let obj = this.$refs.div;
                this.setEndTextPos(obj)
            },
            // 失焦
            blurHandle() {
                // 取消焦点
                this.inputFocus = false;
                // 触发change事件
                if (this.value !== this.inputValue) {
                    this.$emit('change', this.inputValue)
                }
            },
            // 清除
            clearHandle() {
                let obj = this.$refs.div;
                this.inputValue = '';
                obj.innerHTML = '&#8203';
                this.setEndTextPos(obj)
            },
            // 设置值
            setInputDomValue(obj) {
                if (this.inputValue) {
                    if (this.type === 'text') {
                        obj.innerHTML = this.inputValue
                    }
                    if (this.type === 'password') {
                        obj.innerHTML = this.inputValue.replace(/./ig, '&bull;')
                    }
                } else {
                    obj.innerHTML = "&#8203";

                }
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
            // 设置光标位置
            setEndTextPos(obj) {
                // 解决浏览器的兼容问题，做如下条件判断
                if (window.getSelection) {
                    obj.focus();
                    let range = window.getSelection();
                    range.selectAllChildren(obj);
                    range.collapseToEnd();//光标移至最后
                } else if (document.selection) {
                    let range = document.selection.createRange();
                    range.moveToElementText(obj);
                    range.collapse(false);//光标移至最后
                    range.select();
                }
            }
        },
        watch: {
            value: {
                handler(v) {
                    // 初始化值
                    if (typeof v !== "undefined" && !_.isEqual(v, this.inputValue)) {
                        this.inputValue = v
                    }
                },
                immediate: true
            },
            // 内部维护值
            inputValue: {
                handler(v) {
                    if (!_.isEqual(v, this.value)) {
                        this.$emit('changeValue', v)
                    }
                },
                immediate: true
            },
            // 监听密码可见值 修改现实区内容
            canPasswordSee: {
                handler(v) {
                    const obj = this.$refs.div;
                    if (obj) {
                        if (v) {
                            obj.innerHTML = this.inputValue
                        } else {
                            this.setInputDomValue(obj)
                        }
                        this.setEndTextPos(obj)
                    }
                },
                immediate: true
            }

        },
        render(h) {
            return h('div',
                {
                    class: this.getWrapBoxClass()
                },
                [
                    h('label',
                        {
                            style: {
                                display: 'none'
                            }
                        },
                        [
                            h('input',
                                {
                                    props: {
                                        type: this.type
                                    },
                                    domProps: {
                                        value: this.inputValue
                                    }
                                }
                            ),
                            h('div',
                                [
                                    this.$slots['prefix-icon'] && h('CIcon',
                                        {
                                            props: this.$slot['prefix-icon'].propsData,
                                            style: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 0
                                            }
                                        },
                                    ),
                                    h('div',
                                        {
                                            class: this.getInputClass,
                                            style: this.getInputStyle,
                                        },
                                        []
                                    ),
                                    // 主输入框
                                    h('div',
                                        {
                                            style: this.getContentStyle,
                                            ref: 'div',
                                            props: {
                                                placeholder: this.placeholder,
                                            },
                                            domProps: {
                                                contenteditable: true,
                                            },
                                            on: {
                                                input: (e) => {
                                                    this.inputHandle(e)
                                                },
                                                compositionend: (e) => {
                                                    this.changeHandleEnd(e)
                                                },
                                                focus: (e) => {
                                                    this.focusHandle(e)
                                                },
                                                blur: (e) => {
                                                    this.blurHandle(e)
                                                },

                                            }
                                        }
                                    ),
                                    // 输入提示
                                    !this.inputValue && h('span', {
                                            style: this.getPlaceholderStyle,
                                            on: {
                                                click: (e) => {
                                                    this.focusHandle(e)
                                                }
                                            }
                                        },
                                        [this.placeholder]
                                    ),
                                    this.clearable && this.type === 'text' && h('CIcon',
                                        {
                                            props: {
                                                iconName: 'choas-fill-danger',
                                                color: '#aaa'
                                            },
                                            class: this.getClearableClass,
                                            style: this.getClearableStyle,
                                            on: {
                                                click: (e) => {
                                                    this.clearHandle(e)
                                                }
                                            }
                                        }),
                                    // 查看密码按钮
                                    this.type === 'password' && h('CIcon',
                                        {
                                            props: {
                                                iconName: this.canPasswordSee ? 'choas-close-eye' : 'choas-eye',
                                                color: '#aaa'
                                            },
                                            class: this.getClearableClass,
                                            style: this.getClearableStyle,
                                            on: {
                                                click: (e) => {
                                                    this.seePasswordHandle(e)
                                                }
                                            }
                                        }),
                                    // 后置图标
                                    this.$slots['behind-icon'] && h('CIcon',
                                        {
                                            props: this.$slot['behind-icon'].propsData,
                                            style: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 0
                                            }
                                        },
                                    ),
                                    // 下拉列表
                                    (this.listData || []).length && h('ul',
                                        {},
                                        [
                                            h('li', ['li'])
                                        ]
                                    )
                                ]
                            )
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

    .input-wrap {
        display: inline-block;
    }

    .input {
        border: 1px solid $lineColor;
        outline: none;
        box-sizing: border-box;
        width: 300px;
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
            line-height: addPX($llg-height);
            font-size: addPX($llg-fs);
        }

        &-large {
            height: addPX($lg-height);
            line-height: addPX($lg-height);
            font-size: addPX($lg-fs);
        }

        &-default {
            height: addPX($df-height);
            line-height: addPX($df-height);
            font-size: addPX($df-fs);
        }

        &-small {
            height: addPX($sm-height);
            line-height: addPX($sm-height);
            font-size: addPX($sm-fs);
        }

        &-ssmall {
            height: addPX($ssm-height);
            line-height: addPX($ssm-height);
            font-size: addPX($ssm-fs);
        }

        &-clearable {
            position: absolute;
        }
    }
</style>
