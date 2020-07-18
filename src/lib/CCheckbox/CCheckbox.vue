<template>
    <span>
        <label :style="{
                   display: useNative?'inline':'none'
               }"
        >
            <input type="checkbox" :value="value" v-model="checkedArr" :checked="checkedArr.includes(value)">
            {{ value }}
        </label>
        <template v-if="!useNative">
            <span :class="getItemClass"
                  :key="value"
                  @click="selectHandle(value)"
            >
                <span :class="getFakeIconClass"
                      :style="{
                        width: width +'px',
                        height: height +'px',
                        cursor: disabled?'not-allowed':'pointer'
                      }"
                >
                    <template v-if="checkedArr.includes(value)">
                        <slot v-if="$slots['selected-icon']" name="selected-icon"></slot>
                        <CIcon v-else icon-name="choas-selected"
                               color="#006ab3"
                               :width="`${width/1 + 8}`"
                               :height="`${height/1 + 8}`"
                               :style="{
                                    position: 'absolute',
                                    top: `-${8/2}px`,
                                    left: `-${8/2}px`,
                                }"
                        />

                    </template>
                    <template v-else>
                        <slot v-if="disabled"
                              name="disabled-icon"
                        >
                            <CIcon :style="{
                                position: 'absolute',
                                top: `-1px`,
                                left: `-1px`,
                                display: 'inline-block',
                                background: `radial-gradient(#888 40%, #aaa 60%)`
                           }"
                                   icon-name="choas-close"
                                   color="#fff"
                            ></CIcon>
                        </slot>
                        <template v-else>
                            <slot v-if="halfChecked"
                                  name="half-checked-icon"
                            >
                                <span :style="{
                                        position: 'absolute',
                                        top: `${4/2-1}px`,
                                        left: `${4/2-1}px`,
                                        display: 'inline-block',
                                        width:`${width/1 - 4}px`,
                                        height:`${height/1 - 4}px`,
                                        background: `radial-gradient(#1890ffee 40%, #1890ffcc 20%, #fff)`
                                    }"
                                ></span>
                            </slot>
                        </template>
                    </template>
                </span>
                <span class="checkbox-item-title"
                      :style="{
                         display: 'inline-block',
                         height:`${height}px`,
                         lineHeight:`${height}px`,
                      }"
                >
                    {{value}}
                </span>
            </span>
        </template>
    </span>
</template>

<script>
    import classNames from 'classnames'

    export default {
        name: 'CCheckbox',
        props: {
            checkedData: {
                type: Array,
                default() {
                    return []
                }
            },
            value: {
                type: String,
                default() {
                    return ''
                }
            },
            useNative: {
                type: Boolean
            },
            disabled: {
                type: Boolean
            },
            halfChecked: {
                type: Boolean
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
            prefix: {
                type: String,
                default() {
                    return ''
                }
            },
            classNames: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        model: {
            prop: 'checkedData',
            event: 'checkedDataChange'
        },
        data() {
            return {
                checkedArr: []
            }
        },
        computed: {
            getFakeIconClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}checkbox-item-fake-icon`]: true
                    }
                )
            },
            getItemClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}checkbox-item`]: true
                    }
                )
            }
        },
        methods: {
            selectHandle(value) {
                if (this.disabled) {
                    return
                }
                const index = this.checkedArr.findIndex(v => v === value)
                if (index > -1) {
                    this.checkedArr.splice(index, 1)
                } else {
                    this.checkedArr.push(value)
                }
            }
        },
        watch: {
            checkedData: {
                handler(v) {
                    this.$set(this, 'checkedArr', v)
                },
                deep: true,
                immediate: true
            },
            checkedArr: {
                handler(v) {
                    this.$set(this, 'checkedData', v)
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";

    .checkbox-item {
        ::selection {
            background: none;
        }

        display: inline-flex;

        &-fake-icon {
            border: 1px solid $darkLineColor;
            border-radius: 2px;
            display: inline-block;
            position: relative;
            box-shadow: 0 0 10px $lineColor;
            box-sizing: border-box;
            vertical-align: middle;

            &:hover {
                box-shadow: 0 0 10px $primary;
            }
        }

        &-title {
            margin: 0 addPX($ssm-margin);
        }
    }
</style>
