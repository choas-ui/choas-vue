<template>
    <div
            v-if='visiable'
            :class="getModalWrapClass"
            :style="{
                width: mask? '100vw' : `${width}px`,
                height: mask? '100vh' : `${height}px`,
                top: mask? 0 : top? `${top}px`: `calc(40vh - ${height/2}px)`,
                left: mask? 0 : top? `${left}px`: `calc(50vw - ${width/2}px)`,
            }"
            @click="() =>  !(mask && cancel)|| removeModal()"
    >

        <div
                :class="getModalBoxClass"
                :style="{
                    width: `${width}px`,
                    height: `${height}px`,
                    top: !mask? 0 : top? `${top}px`: `calc(40vh - ${height/2}px)`,
                    left: !mask? 0 : left? `${left}px`: `calc(50vw - ${width/2}px)`,
                }"
                @click="($event) => $event.stopPropagation()"
        >
            <div :class="getTitleBox">
                <slot name="header">
                    <div :class="getTitleHeader">{{ title }}</div>
                </slot>
                <div :class="getTitleControllers">
                    <span>-</span>
                    <span
                            @click="removeModal"
                    >
                        X
                    </span>
                </div>
            </div>
            <slot>
            </slot>
            <slot name="footer">
                <div :class="getFooter">
                   <div>
                       <Button type="danger">关 闭</Button>
                       <Button type="success">确 认</Button>
                   </div>
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
    import classNames from 'classnames'
    export default {
        name: 'Modal',
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
            mask: {
                type: Boolean
            },
            cancel: {
                type: Boolean
            },
            title: {
                type: String,
                default() {
                    return ''
                }
            },
            width: {
                type: Number,
                default() {
                    return 500
                }
            },
            height: {
                type: Number,
                default() {
                    return 400
                }
            },
            top: {
                type: Number,
                default() {
                    return NaN
                }
            },
            left: {
                type: Number,
                default() {
                    return NaN
                }
            },
            value: {
                type: Boolean
            }
        },
        data() {
            return {
                visiable: this.value
            }
        },
        model:{
            event: 'change'
        },
        methods:{
          removeModal() {
              this.visiable = false
          }
        },
        computed: {
            getFooter() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-box-footer']: true,
                })
            },
            getTitleControllers() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-box-title-controllers']: true,
                })
            },
            getTitleHeader() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-box-title-header']: true,
                })
            },
            getTitleBox() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-box-title']: true,
                })
            },
            getModalBoxClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-box']: true,
                })
            },
            getModalWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-wrap']: true,
                    [prefix + 'modal-wrap-mask']: this.mask,
                    [prefix + 'mask']: this.mask,
                })
            }
        },
        watch:{
            value(v){
                this.visiable = v
            },
            visiable(v){
                this.$emit('change', this.visiable)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../scss/functions";
    @import "../scss/normal-bg";
    @import "../scss/size";
    .modal {
        &-wrap {
            position: fixed;
            z-index: 999;
            &-mask {
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
        }
        &-box{
            position: absolute;
            background: #fff;
            border-radius: addPX($df-radius);
            box-sizing: border-box;
            padding-bottom: addPX($lg-height);
            border: 1px solid $lineColor;
            box-shadow: 1px 1px 5px $shadowCr;
            &-title{
                position: relative;
                height: addPX($df-height + $sm-padding*2 + 1);
                line-height: addPX($df-height);
                font-size: addPX($lg-fs);
                border-bottom: 1px solid $lineColor;
                &-header{
                    padding:addPX($sm-padding) addPX($df-padding);
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    font-weight: bold;
                    letter-spacing: addPX($df-letterSp);
                    border-radius: addPX($df-radius) addPX($df-radius) 0 0;
                    box-sizing: border-box;
                    left: 0;
                    right: 0;
                }
                &-controllers{
                    position: absolute;
                    height: 100%;
                    display: flex;
                    text-align: center;
                    right: addPX($df-padding);
                }
            }
            &-footer{
                height: addPX($lg-height);
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                display: flex;
                justify-content: flex-end;
                & button{
                    margin-right: addPX($lg-padding);
                }
            }
        }

    }
</style>
