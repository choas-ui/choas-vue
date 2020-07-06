<template>
    <span :class="getWrapClass"
          :style="getWrapStyle"
          @click="clickHandle"
          @mouseenter="turnColor"
          @mouseleave="turnColor"
          :title="placeholder"
    >
        <template v-if="type === 'ft'">
            <template v-if="iconName">
                <i :class="iconName" />
            </template>
            <template v-else>
                <i :class="icon">{{iconContent}}</i>
            </template>
        </template>
        <template v-if="type === 'svg'">
            <svg v-if="Object.keys(svgLib.default).includes(iconName)"
                 :width="width+'px'"
                 :height="height+'px'"
                 viewBox="0 0 1024 1024"
                 version="1.1"
                 aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg">
                <path v-for="(d,i) in svgLib.default[iconName]" :key="d+iconName+i" :fill="cl" :d="d" />
            </svg>
            <svg v-else aria-hidden="true">
                <use :[xlinkHref]="`#${iconName}`"></use>
            </svg>
        </template>
        <template v-if="type==='img'">
            <img :src="src"/>
        </template>
    </span>
</template>
<script>
    import * as svgLib from '../iconLib'
    import classNames from 'classnames'

    export default {
        name: 'Icon',
        props: {
            type: {
                type: String,
                validator(value) {
                    return !value || ['svg', 'ft', 'img'].includes(value)
                },
                default() {
                    return ''
                }
            },
            iconName: {
                type: String,
                default() {
                    return ''
                }
            },
            iconContent: {
                type: String,
                default() {
                    return ''
                }
            },
            color: {
                type: String || Array,
                default() {
                    return ''
                }
            },
            activeColor: {
                type: String || Array,
                default() {
                    return ''
                }
            },
            width: {
                type: String,
                default() {
                    return '18'
                }
            },
            height: {
                type: String,
                default() {
                    return '18'
                }
            },
            fontSize: {
                type: String,
                default() {
                    return '18'
                }
            },
            src: {
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
            placeholder: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        data() {
            return {
                xlinkHref: "xlink:href",
                svgLib,
                cl: this.color
            }
        },
        mounted() {
        },
        computed: {
            getWrapStyle() {
                return {
                    width: this.width + 'px',
                    height: this.height + 'px',
                    lineHeight: this.height + 'px',
                    fontSize: this.fontSize + 'px',
                    color: this.cl
                }
            },
            getWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                   this.className,
                    {
                        "pointer-cursor": this.$listeners.click,
                    },
                    {
                        [`${prefix}icon-wrap`]: true,
                    }
                )
            }
        },
        methods: {
            clickHandle(){
                this.$listeners.click && this.$emit('click')
            },
            turnColor(){
                this.cl = this.$listeners.click && this.cl === this.color? this.activeColor: this.color
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../scss/functions";
    @import "../scss/size";
    @import "../scss/normal-bg";
    @import "../scss/variable";
    @import "../scss/comm-class";
    .icon {
        *{
            box-sizing: border-box;
            overflow:hidden;
        }
        &-wrap {
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            > i, svg, img {
                box-sizing: border-box;
                display: inline-block;
                width: 100%;
                height: 100%;
                text-align: center;
                font-style: normal;
            }
        }
    }
</style>
