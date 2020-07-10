<template>
    <div
            v-if='value'
            :class="getModalWrapClass"
            :style="{
                width: mask? '100vw' : `${width}px`,
                height: mask? '100vh' : `${height}px`,
                top: mask? 0 : top? `${top}px`: `calc(50vh - ${height/2}px)`,
                left: mask? 0 : top? `${left}px`: `calc(50vw - ${width/2}px)`,
            }"
            @click="() =>  !(mask && cancel)|| removeModal()"
            ref="modalWrap"
            @mousedown="!mask && dragStart($event)"
    >

        <div
                :class="getModalBoxClass"
                :style="{
                    width: `${width}px`,
                    height: `${height}px`,
                    top: !mask? 0 : top? `${top}px`: `calc(50vh - ${height/2}px)`,
                    left: !mask? 0 : left? `${left}px`: `calc(50vw - ${width/2}px)`,
                }"
                @click="($event) => $event.stopPropagation()"
                ref="modalBox"
                @mousedown="mask && dragStart($event)"
        >
            <div :class="getHeaderBox" v-if="'header' in $scopedSlots  || title">
                <slot name="header">
                    <div :class="getTitleHeader">
                        {{ title }}
                    </div>
                </slot>
            </div>
            <div v-if="!controller" :class="getTitleController">
                <slot name="controller">
                    <Icon icon-name="choas-close"
                          width="30"
                          height="30"
                          :color="controllerColor"
                          :activeColor="activeColor"
                          @click="removeModal" />
                </slot>
            </div>
            <div :class="getContent">
                <slot></slot>
            </div>
            <div v-if="'footer' in $scopedSlots || type" :class="getFooter">
                <slot name="footer">
                    <Button :type="type" @click="removeModal">确&nbsp;&nbsp;认</Button>
                </slot>
            </div>
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
            controller: {
                type: Boolean
            },
            controllerColor: {
                type: String,
                default(){
                    return ''
                }
            },
            activeColor: {
                type: String,
                default(){
                    return ''
                }
            },
            draggable: {
                type: Boolean
            },
            type: {
                type: String,
                validator(value) {
                    return ['success', 'warning', 'danger'].includes(value)
                }
            },
            title: {
                type: String,
                default() {
                    return ''
                }
            },
            width: {
                type: String,
                default() {
                    return '300'
                }
            },
            height: {
                type: String,
                default() {
                    return '150'
                }
            },
            top: {
                type: String,
                default() {
                    return ''
                }
            },
            left: {
                type: String,
                default() {
                    return ''
                }
            },
            value: {
                type: Boolean
            }
        },
        data() {
            return {
                visible: this.value,
            }
        },
        methods: {
            removeModal() {
                this.$emit('input', false)
            },
            dragStart($event) {
                $event.stopPropagation()
                if($event.button){
                    return
                }
                let dragFlag = true
                const draggedObj = this.mask? this.$refs.modalBox:this.$refs.modalWrap
                const x = $event.clientX
                const y = $event.clientY
                const left = draggedObj.offsetLeft
                const top = draggedObj.offsetTop
                const handler = (e) =>{
                    if(!dragFlag) {
                        return
                    }
                    const  nl = e.clientX - x + left;
                    const  nt = e.clientY - y + top;
                    draggedObj.style.cursor = 'move'
                    draggedObj.style.left = nl + 'px';
                    draggedObj.style.top = nt + 'px';
                }
                draggedObj.addEventListener('mousemove', handler)
                draggedObj.addEventListener('mouseout', () => {
                    dragFlag = false
                    draggedObj.style.cursor = 'default'
                    draggedObj.removeEventListener('mousemove', handler)
                })
                draggedObj.addEventListener('mouseup', () => {
                    dragFlag = false
                    draggedObj.style.cursor = 'default'
                    draggedObj.removeEventListener('mousemove', handler)
                })
            },
        },
        computed: {
            getFooter() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-box-footer']: true,
                })
            },
            getContent() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-box-content']: true,
                })
            },

            getTitleController() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-box-controller']: true,
                })
            },
            getTitleHeader() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [prefix + 'modal-box-title-header']: true
                })
            },
            getHeaderBox() {
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
                return classNames(
                    this.className,
                    {
                        [prefix + 'modal-wrap']: true,
                        [prefix + 'modal-wrap-mask']: this.mask,
                        [prefix + 'mask']: this.mask,
                    }
                    )
            }
        },
        watch: {
            visible(value) {
                this.$emit('change', value)
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

        &-box {
            position: absolute;
            background: #fff;
            border-radius: addPX($df-radius);
            box-sizing: border-box;
            border: 1px solid $lineColor;
            box-shadow: 1px 1px 5px $shadowCr;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            flex-direction: column;

            &-title {
                width: 100%;
                position: relative;
                min-height: addPX($df-height);
                line-height: addPX($df-height);
                text-align: center;
                font-size: addPX($lg-fs);
                border-bottom: 1px solid $lineColor;
                justify-items: flex-start;

                &-header {
                    position: absolute;
                    padding: addPX($sm-padding) addPX($df-padding);
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    letter-spacing: addPX($sm-letterSp);
                    border-radius: addPX($df-radius) addPX($df-radius) 0 0;
                    box-sizing: border-box;
                    left: 0;
                    right: 0;
                }
            }

            &-controller {
                position: absolute;
                display: flex;
                text-align: center;
                right: addPX($lg-padding);
                top: addPX($sm-padding);
            }

            &-content {
                flex: 1;
                min-height: 100px;
            }

            &-footer {
                width: 100%;
                min-height: addPX($df-height);
                display: flex;
                justify-content: flex-end;
                align-items: center;

                & button {
                    margin-right: addPX($lg-padding);
                }
            }
        }

    }
</style>
