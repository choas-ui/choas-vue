<template>
    <span class="checkbox-group-wrap">

        <template v-if="isDataModel">
            <template v-if="type==='button'">
                <CButtonGroup/>
                <CButton v-for="list in listData" :key="list[reflectKey['value']]" >{{list[reflectKey['key']]}}</CButton>
            </template>
            <template v-else>
                <CCheckbox v-for="(list, index) in listData"
                           v-model="copySelectedData"
                           :value="list"
                           :key="index"
                           :reflectKey="reflectKey"
                />
            </template>
        </template>
        <slot v-else></slot>
    </span>
</template>

<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    export default {
        name: 'CCheckboxGroup',
        props: {
            listData: {
                type: Array,
                default() {
                    return []
                }
            },
            value: {
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
            type: {
                variable(value){
                  return value ==='button'
                },
                default(){
                    return ''
                }
            }
        },
        data() {
            return {
                copySelectedData: [],
                midValue: [],
                isDataModel: true
            };
        },
        computed: {
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
        created() {

        },
        watch: {
            value: {
                handler(v) {
                    if(!_.isEqual(v, this.copySelectedData)){
                        this.$set(this, 'copySelectedData', _.cloneDeep(v))
                    }
                },
                deep: true,
                immediate: true
            },
            copySelectedData: {
                handler(v) {
                    this.$emit('input', v)
                },
                deep: true
            }
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
