<template>
    <button :class="buttonClass" @click="clickHandle">
        <span :class="iconClass"><slot name="left"></slot></span>
        <span :class="btnContentClass"><slot>button</slot></span>
        <span :class="iconClass"><slot name="right"></slot></span>
    </button>
</template>

<script>
    import classNames from 'classnames'
    export default {
        name: 'Button',
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
            }
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
        cursor: pointer;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        &-lg{
            height: addPX($lg-height);
            padding: 0 addPX($lg-padding);
            border-radius: addPX($lg-radius);
            font-size: 16px;
        }
        &-df{
            height: addPX($df-height);
            padding: 0 addPX($df-padding);
            border-radius: addPX($df-radius);
            font-size: 14px;
        }
        &-sm{
            height: addPX($sm-height);
            padding: 0 addPX($sm-padding);
            border-radius: addPX($sm-radius);
            font-size: 12px;
        }
        &-primary{
            background: $primary;
            color: #fff;
        }
        &-success{
            background: $success;
            color: #fff;
        }
        &-warning{
            background: $warning;
            color: #fff;
        }
        &-danger{
            background: $danger;
            color: #fff;
        }
        &-disabled{
            background: $disabled;
            color: #fff;
            cursor: not-allowed;
        }
        &-ghost{
            background: none;
            color: $info;
            border: 1px dashed $info;
            &:hover{
                color: #fff;
                background: $ghost;
            }
        }
    }
</style>
