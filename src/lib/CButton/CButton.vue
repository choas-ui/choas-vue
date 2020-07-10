<template>
    <button :class="buttonClass" @click="clickHandle" :title="placeholder">
        <span v-if="'left' in $scopedSlots" :class="iconClass"><slot name="left"></slot></span>
        <span :class="btnContentClass"><slot>button</slot></span>
        <span v-if="'right' in $scopedSlots" :class="iconClass"><slot name="right"></slot></span>
    </button>
</template>

<script>
    import classNames from 'classnames'
    export default {
        name: 'CButton',
        props:{
            prefix: {
                type: String,
                default(){
                    return ''
                }
            },
            className: {
                type: String,
                default(){
                    return ''
                }
            },
            block: {
                type: Boolean
            },
            type: {
                type: String,
                validator: function (value) {
                    // 这个值必须匹配下列字符串中的一个
                    return !value || ['primary' , 'success', 'warning', 'danger', 'disabled', 'ghost'].indexOf(value) !== -1
                },
                default(){
                    return 'primary'
                }
            },
            size: {
                type: String,
                validator: function (value) {
                    // 这个值必须匹配下列字符串中的一个
                    return !value || ['default' ,'large' , 'small'].indexOf(value) !== -1
                },
                default(){
                    return 'default'
                }
            },
            placeholder: {
                type: String,
                default(){
                    return ''
                }
            },
        },
        data() {
            return {
            };
        },
        computed:{
            buttonClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    this.className,
                    {
                        [`${prefix}btn-block`]: this.block,
                    },
                    {
                        [`not-allowed-cursor`]: this.type === 'disabled'
                    },
                    {
                        [`${prefix}btn-primary`]: this.type === 'primary' || !(this.type),
                        [`${prefix}btn-success`]: this.type === 'success',
                        [`${prefix}btn-warning`]: this.type === 'warning',
                        [`${prefix}btn-danger`]: this.type === 'danger',
                        [`${prefix}btn-disabled`]: this.type === 'disabled',
                        [`${prefix}btn-ghost`]: this.type === 'ghost'
                    },
                    {
                        [`${prefix}btn-lg`]: this.size === 'large',
                        [`${prefix}btn-df`]: this.size === 'default' || !(this.size),
                        [`${prefix}btn-sm`]: this.size === 'small',
                    },
                    {
                        [`${prefix}lg-radius`]: this.size === 'large',
                        [`${prefix}df-radius`]: this.size === 'default' || !(this.size),
                        [`${prefix}sm-radius`]: this.size === 'small',
                    },
                    {
                        [`${prefix}btn`]: true,
                    }
                )
            },
            iconClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    `${prefix}btn-icon`
                )
            },
            btnContentClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    `${prefix}btn-content`
                )
            }
        },
        methods: {
            clickHandle(){
                this.$emit('click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .btn{
        background: #fff;
        cursor: pointer;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        color: #666;
        line-height: normal;
        &-block{
            display: block;
            width: 100%;
        }
        &-lg{
            padding: addPX($sm-padding) addPX($lg-padding);
            border-radius: addPX($sm-radius);
            font-size: addPX($lg-fs);
        }
        &-df{
            padding: addPX($sm-padding) addPX($df-padding);
            border-radius: addPX($sm-radius);
            font-size: addPX($df-fs);
        }
        &-sm{
            padding: addPX($sm-padding) addPX($sm-padding);
            border-radius: addPX($sm-radius);
            font-size: addPX($sm-fs);
        }
        &-primary{
            background: $primary;
            color: $btnFtCr;
        }
        &-success{
            background: $success;
            color: $btnFtCr;
        }
        &-warning{
            background: $warning;
            color: $btnFtCr;
        }
        &-danger{
            background: $danger;
            color: $btnFtCr;
        }
        &-disabled{
            background: $disabled;
            color: $btnFtCr;
        }
        &-ghost{
            background: none;
            color: $info;
            border: 1px dashed $btnGstCr;
            &:hover{
                color: $btnFtCr;
                background: $btnGstCr;
            }
        }
    }
</style>
