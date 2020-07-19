<template>
    <span class="checkbox-group-wrap">
        <template v-if="isDataModel">
            isDataModel
        </template>
        <slot v-else></slot>
    </span>
</template>

<script>
    import classNames from 'classnames'

    export default {
        name: 'CCheckboxGroup',
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            listData: {
                type: Array,
                default() {
                    return []
                }
            },
            reflectKey: {
                type: Object,
                default() {
                    return {
                        key: 'key',
                        value: 'value'
                    }
                }
            },
            useNative: {
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
            }
        },
        data() {
            return {
                checkboxValue: [],
                isDataModel: true
            };
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
            getWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}checkbox-group-wrap`]: true
                    }
                )
            }
        },
        methods: {
        },
        watch: {
            $slot: {
                handler(v) {
                    this.isDataModel = !v
                },
                deep: true,
                immediate: true
            },
            selectData: {
                handler() {
                },
                deep: true,
                immediate: true
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .checkbox-wrap{
        .checkbox-item{
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
            &-title{
                margin: 0 addPX($ssm-margin);
            }
        }
    }
</style>
