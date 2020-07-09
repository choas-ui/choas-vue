<template>
    <ul>
        <li>
            <div>
                <template v-if="line && lineStartLv">
                    <template v-for="(item, index) in (new Array((lineStartLv - 1)*2).fill(1))">
                        <span v-if="!(index%2)" :key="index"  class="tree-vertical-line" :style="getLineStyle">
                            <span></span>
                        </span>
                        <span v-if="(index%2)" :key="index"  class="tree-vertical-line" :style="getLineStyle">
                        </span>
                    </template>
                    <span  class="tree-vertical-line" :style="getLineStyle">
                        <span></span>
                    </span>
                    <span class="tree-align-line" :style="getLineStyle">
                        <span></span>
                    </span>
                </template>
                <span :class="getMarkIconClass">
                    <slot name="icon-mark">
                        <Icon type="svg" icon-name="choas-fill-arrow-right"/>
                    </slot>
                </span>
                <slot v-if="'file-icon' in $scopedSlots" name="file-icon">
                </slot>
                <span style="display: inline-block; align-items: center">{{listData.title}}</span>
                <span v-if="'tail' in $scopedSlots">
                    <slot name="tail"></slot>
                </span>
            </div>
            <template v-if="(listData.children || []).length">
                <Tree v-for="(item, index) in listData.children"
                      :line-start-lv="lineStartLv+1"
                      :key="index"
                      :list-data="item"
                      :line="line"
                />
            </template>
        </li>
    </ul>
</template>
<script>
    import classNames from 'classnames'

    export default {
        name: 'Tree',
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
            fileIcon: {
                type: Boolean
            },
            line: {
                type: Boolean
            },
            lineStartLv:{
              type:Number,
              default(){
                  return 0
              }
            },
            listData: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                h: this.$createElement,
                markIconWidth: 0,
                markIconHeight: 0
            }
        },
        computed: {
            getLineStyle() {
                return {
                    width: parseInt(`${this.markIconWidth / 2}`, 10) + 'px',
                    height: this.markIconHeight + 'px',
                }
            },
            getMarkIconClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}tree-icon-mark-box`]: true
                    },
                    {
                        ["icon-mark"]: true
                    },
                )
            }
        },
        mounted() {
            const oMark = document.querySelector('.icon-mark')
            this.markIconWidth = oMark ? oMark.clientWidth : 0
            this.markIconHeight = oMark ? oMark.clientHeight : 0
        },
        updated() {
            const oMark = document.querySelector('.icon-mark')
            this.markIconWidth = oMark ? oMark.clientWidth : 0
            this.markIconHeight = oMark ? oMark.clientHeight : 0
        },
        methods:{
        }
    }
</script>

<style scoped lang="scss">
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    ul {
        padding: 0;
        margin: 0;
        line-height: 0;

        li{
            list-style: none;
            & > div {
                display: flex;
                align-items: center;
            }
        }
    }

    .tree {

    }

    .tree-icon-mark-box {
        display: inline-block;
    }

    .tree-vertical-line {
        display: inline-block;
        vertical-align: middle;
        text-align: right;

        & > span {
            display: inline-block;
            width: 1px;
            height: 100%;
            border-left: 1px dotted #888;
        }
    }

    .tree-align-line {
        vertical-align: middle;
        text-align: left;
        align-items: center;
        display: flex;
        & > span {
            display: flex;
            height: 1px;
            width: 60%;
            border-bottom: 1px dotted #888;
        }
    }
</style>

