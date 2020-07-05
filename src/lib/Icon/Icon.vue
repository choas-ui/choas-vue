<template>
    <span :class="getWrapClass" :style="getWrapStyle">
        <template v-if="type === 'ft'">
            <template v-if="iconName">
                <i :style="getFTStyle" :class="iconName" />
            </template>
            <template v-else>
                <i :style="getFTStyle" :class="icon">{{iconContent}}</i>
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
                <path :fill="color" :d="svgLib.default[iconName]" />
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
            }
        },
        data() {
            return {
                xlinkHref: "xlink:href",
                svgLib
            }
        },
        mounted() {
        },
        computed: {
            getFTStyle() {
                return {
                    fontSize: this.fontSize + 'px',
                    color: this.color
                }
            },
            getWrapStyle() {
                return {
                    width: this.width + 'px',
                    height: this.height + 'px',
                    lineHeight: this.height + 'px',
                }
            },
            getWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames({
                    [`${prefix}icon-wrap`]: true,
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../scss/functions";
    @import "../scss/size";
    @import "../scss/normal-bg";
    @import "../scss/variable";
    .icon {
        &-wrap {
            display: inline-block;
            overflow: hidden;
            > i, svg, img {
                display: inline-block;
                width: 100%;
                height: 100%;
                text-align: center;
                font-style: normal;
                vertical-align: middle;
            }
        }
    }
</style>