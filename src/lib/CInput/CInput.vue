<template>
    <div :class="getInputWrapClass">
        <label hidden>
            <input type="text" :value="inputValue">
        </label>
        <div>
            <div class="prefix-icon">
                前置图标
            </div>
            <div :class="getInputClass"
                 :style="getInputStyle"
            >
                <div contenteditable
                     ref="div"
                     :placeholder="placeholder"
                     @input="inputHandle"
                     @compositionend="changeHandleEnd"
                     @focus="inputFocus = true"
                     @blur="inputFocus = false"
                />
            </div>
            <div class="prefix-icon">
                后置图标
            </div>
        </div>
        <ul v-if="(listData || []).length">
            <li>列表</li>
        </ul>
    </div>
</template>

<script>
    import classNames from 'classnames'
    import _ from 'lodash'

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
                type: Function
            }
        },
        model: {
            prop: 'value',
            event: 'changeValue'
        },
        data() {
            return {
                inputFocus: false,
                inputValue: '',
            };
        },
        mounted() {
            document.addEventListener('paste', e => {
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
            })
        },
        computed: {
            getInputStyle(){
                return {
                    border: `1px solid ${this.inputFocus? "#1890ff" : "#aaa"}`
                }
            },
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
            inputHandle(e) {
                if (e.inputType === 'insertCompositionText') {
                    return
                }
                if (e.inputType === 'insertParagraph') {
                    // 回车键时阻止创建新的一行
                    let obj = this.$refs.div;
                    obj.innerHTML = this.inputValue || '&#8203';
                    this.setEndTextPos(obj)
                }
                if (e.inputType === 'deleteContentBackward') {
                    let slicePos = this.inputValue.length - 1;
                    let obj = this.$refs.div;
                    slicePos = slicePos > 0 ? slicePos : 0;
                    // 防止副文本删除导致的光标上移问题
                    this.inputValue = slicePos ?this.inputValue.slice(0, slicePos): '';
                    obj.innerHTML = this.inputValue || "&#8203";
                    this.setEndTextPos(obj);
                }
                if(e.inputType === 'insertText'){
                    this.inputValue += e.data;

                }
            },
            changeHandleEnd(e) {
                this.inputValue += e.data;
            },
            setEndTextPos(obj){
// 解决浏览器的兼容问题，做如下条件判断
                    if (window.getSelection) {
                        obj.focus();
                        let range = window.getSelection();
                        range.selectAllChildren(obj);
                        range.collapseToEnd();//光标移至最后
                    }
                    else if (document.selection) {
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
            inputValue: {
                handler(v) {
                    if (!_.isEqual(v, this.value)) {
                        this.$emit('changeValue', v)
                    }
                },
            },

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

        > div {
            outline: none;
            border: none;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            color: scale_color($lineColor, $lightness: -80%);

            &:empty::before {
                content: attr(placeholder);
                color: scale_color($lineColor, $lightness: 20%);
            }
        }

        &-llarge {
            height: addPX($llg-height);
            line-height: addPX($llg-height);
            border-radius: addPX($llg-radius);
            font-size: addPX($llg-fs);
            padding: 0 addPX($llg-padding);
        }

        &-large {
            height: addPX($lg-height);
            line-height: addPX($lg-height);
            border-radius: addPX($lg-radius);
            font-size: addPX($lg-fs);
            padding: 0 addPX($lg-padding);
        }

        &-default {
            height: addPX($df-height);
            line-height: addPX($df-height);
            border-radius: addPX($df-radius);
            font-size: addPX($df-fs);
            padding: 0 addPX($df-padding);
        }

        &-small {
            height: addPX($sm-height);
            line-height: addPX($sm-height);
            border-radius: addPX($sm-radius);
            font-size: addPX($sm-fs);
            padding: 0 addPX($sm-padding);
        }

        &-ssmall {
            height: addPX($ssm-height);
            line-height: addPX($ssm-height);
            border-radius: addPX($ssm-radius);
            font-size: addPX($ssm-fs);
            padding: 0 addPX($ssm-padding);
        }
    }
</style>
