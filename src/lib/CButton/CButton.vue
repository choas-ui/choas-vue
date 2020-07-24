<template>
    <button :class="buttonClass" @click="clickHandle($event)" :title="placeholder" type="button">
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
                    return !value || ['llarge', 'large', 'default', 'small', 'ssmall'].indexOf(value) !== -1
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
                        [`${prefix}btn-llg`]: this.size === 'llarge',
                        [`${prefix}btn-lg`]: this.size === 'large',
                        [`${prefix}btn-df`]: this.size === 'default' || !(this.size),
                        [`${prefix}btn-sm`]: this.size === 'small',
                        [`${prefix}btn-ssm`]: this.size === 'ssmall',
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
            clickHandle($event){
                this.$emit('click',$event)
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
        box-shadow: 1px 2px 10px $shadowCr;
        &:active{
            box-shadow: 0 0 4px $shadowCr inset;
        }
        &-block{
            display: block;
            width: 100%;
        }
        &-llg{
            height: addPX($llg-height);
            line-height: addPX($llg-height);
            padding: 0 addPX($llg-padding);
            border-radius: addPX($llg-radius);
            font-size: addPX($llg-fs);
            &.first-item{
                border-radius: addPX($llg-height) 0 0 addPX($llg-height);
            }
            &.last-item{
                border-radius: 0 addPX($llg-height)  addPX($llg-height) 0;
            }
        }
        &-lg{
            height: addPX($lg-height);
            line-height: addPX($lg-height);
            padding: 0 addPX($lg-padding);
            border-radius: addPX($lg-radius);
            font-size: addPX($lg-fs);
            &.first-item{
                border-radius: addPX($lg-height) 0 0 addPX($lg-height);
            }
            &.last-item{
                border-radius: 0 addPX($lg-height)  addPX($lg-height) 0;
            }
        }
        &-df{
            height: addPX($df-height);
            line-height: addPX($df-height);
            padding: 0 addPX($df-padding);
            border-radius: addPX($df-radius);
            font-size: addPX($df-fs);
            &.first-item{
                border-radius: addPX($df-height) 0 0 addPX($df-height);
            }
            &.last-item{
                border-radius: 0 addPX($df-height)  addPX($df-height) 0;
            }
        }
        &-sm{
            height: addPX($sm-height);
            line-height: addPX($sm-height);
            padding: 0 addPX($sm-padding);
            border-radius: addPX($sm-radius);
            font-size: addPX($sm-fs);
            &.first-item{
                border-radius: addPX($sm-height) 0 0 addPX($sm-height);
            }
            &.last-item{
                border-radius: 0 addPX($sm-height)  addPX($sm-height) 0;
            }
        }
        &-ssm{
            height: addPX($ssm-height);
            line-height: addPX($ssm-height);
            padding: 0 addPX($ssm-padding);
            border-radius: addPX($ssm-radius);
            font-size: addPX($ssm-fs);
            &.first-item{
                border-radius: addPX($ssm-height) 0 0 addPX($ssm-height);
            }
            &.last-item{
                border-radius: 0 addPX($ssm-height)  addPX($ssm-height) 0;
            }
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
            border: addPX($ssm-borderWt) dashed $btnGstCr;
            &:hover{
                color: $btnFtCr;
                background: $btnGstCr;
            }
        }
    }
</style>
