<template>
    <span class="checkbox-wrap">
        <label v-for="item in listData"
               :key="item[reflectKey['value']]"
               :style="{
                   display: useNative?'inline':'none'
               }"
        >
            <input type="checkbox" :value="item[reflectKey['value']]" v-model="checkboxValue">
            {{ item[reflectKey['key']] }}
        </label>
        <span v-if="!useNative">
            <span :class="getItemClass"
                  v-for="item in listData"
                  :key="item[reflectKey['value']]"
                  @click="selectHandle(item)"
            >
                <span :class="getFakeIconClass"
                      :style="{
                        width: width +'px',
                        height: height +'px',
                        cursor: item.disabled?'not-allowed':'pointer'
                      }"
                >
                    <CIcon v-if="item.checked || checkboxValue.includes(item[reflectKey['value']])" icon-name="choas-selected"
                           color="#006ab3"
                           :width="`${width/1 + 8}`"
                           :height="`${height/1 + 8}`"
                           :style="{
                            position: 'absolute',
                            top: `-${8/2}px`,
                            left: `-${8/2}px`,
                           }"
                    />
                    <template v-else>
                        <span v-if="item.halfChecked"
                              :style="{
                                position: 'absolute',
                                top: `${4/2-1}px`,
                                left: `${4/2-1}px`,
                                display: 'inline-block',
                                width:`${width/1 - 4}px`,
                                height:`${height/1 - 4}px`,
                                background: `radial-gradient(#1890ffee 40%, #1890ffcc 20%, #fff)`
                           }"
                        ></span>
                    </template>
                </span>
                <span class="checkbox-item-title"
                      :style="{
                         display: 'inline-block',
                         height:`${height}px`,
                         lineHeight:`${height}px`,
                      }"
                >
                    {{item[reflectKey['value']]}}
                </span>
            </span>
        </span>
    </span>
</template>

<script>
    import classNames from 'classnames'

    export default {
        name: 'CCheckbox',
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
                checkboxValue: []
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
            selectHandle(item){
                if(item.disabled){
                    return
                }
                const index = this.checkboxValue.findIndex(v=>v ===item[this.reflectKey['value']])
                if(index>-1){
                    this.checkboxValue.splice(index, 1)
                    this.$set(item, 'checked', false)
                }else{
                    this.checkboxValue.push(item[this.reflectKey['value']])
                    this.$set(item, 'checked', true)
                    this.$set(item, 'halfChecked', false)
                }
            }
        },
        watch: {
            value: {
                handler(v) {
                    this.checkboxValue = v
                },
                deep: true,
                immediate: true
            },
            checkboxValue: {
                handler(v) {
                    this.$emit('input', v)
                },
                deep: true
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
