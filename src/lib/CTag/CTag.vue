<template>
    <span :style="getWrapStyle"
          :class="getWrapClass">
        <span>
            <slot></slot>
        </span>
        <CIcon v-if="$listeners.close"
               :color="color"
               :active-color="activeColor"
               :width="getIconSize+ ''"
               :height="getIconSize+ ''"
               icon-name="choas-close"
               class-name="ctag-icon"
               :style="{
                    lineHeight: getIconSize + 'px',
               }"
               @click="iconClickHandle"
        />
    </span>
</template>

<script>
    import classNames from 'classnames'
    export default {
        name: 'CTag',
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
            color: {
                type: String,
                default(){
                    return '#fff'
                }
            },
            activeColor: {
                type: String,
                default(){
                    return '#fff'
                }
            },
            bkg:{
                type: String,
                default(){
                    return '#8c8c8c'
                }
            },
            type: {
                type: String,
                validator: function (value) {
                    return !value || ['primary' , 'success', 'warning', 'danger'].indexOf(value) !== -1
                },
                default(){
                    return ''
                }
            },
            size: {
                type: String,
                validator: function (value) {
                    return !value || ['llarge', 'large', 'default', 'small', 'ssmall'].indexOf(value) !== -1
                },
                default(){
                    return 'default'
                }
            },
        },
        computed:{
            getIconSize(){
              return  {
                  'llarge': 24,
                  'large': 22,
                  'default': 20,
                  'small': 18,
                  'ssmall': 16,
              }[this.size || 'default']
            },
            getWrapClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    this.className,
                    {
                        [`${prefix}ctag-primary`]: this.type === 'primary',
                        [`${prefix}ctag-success`]: this.type === 'success',
                        [`${prefix}ctag-warning`]: this.type === 'warning',
                        [`${prefix}ctag-danger`]: this.type === 'danger',
                    },
                    {
                        [`${prefix}ctag-llg`]: this.size === 'llarge',
                        [`${prefix}ctag-lg`]: this.size === 'large',
                        [`${prefix}ctag-df`]: this.size === 'default' || !(this.size),
                        [`${prefix}ctag-sm`]: this.size === 'small',
                        [`${prefix}ctag-ssm`]: this.size === 'ssmall',
                    },
                    {
                        [`${prefix}ctag`]: true,
                    }
                )
            },
            getWrapStyle(){
                if(this.type){
                    return null
                }
                return {
                    color: this.color,
                    background: this.bkg
                }
            }
        },
        methods:{
            iconClickHandle(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .ctag{
        display: inline-block;
        &-llg{
            height: addPX($llg-height);
            line-height: addPX($llg-height);
            padding: 0 addPX($ssm-padding);
            border-radius: addPX($llg-radius);
            font-size: addPX($llg-fs);
        }
        &-lg{
            height: addPX($lg-height);
            line-height: addPX($lg-height);
            padding: 0 addPX($ssm-padding);
            border-radius: addPX($lg-radius);
            font-size: addPX($lg-fs);
        }
        &-df{
            height: addPX($df-height);
            line-height: addPX($df-height);
            padding: 0 addPX($ssm-padding);
            border-radius: addPX($df-radius);
            font-size: addPX($df-fs);
        }
        &-sm{
            height: addPX($sm-height);
            line-height: addPX($sm-height);
            padding: 0 addPX($ssm-padding);
            border-radius: addPX($sm-radius);
            font-size: addPX($sm-fs);
        }
        &-ssm{
            height: addPX($ssm-height);
            line-height: addPX($ssm-height);
            padding: 0 addPX($ssm-padding);
            border-radius: addPX($ssm-radius);
            font-size: addPX($ssm-fs);
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
    }
</style>
