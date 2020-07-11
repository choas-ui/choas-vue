<template>
    <div :class="getSelectWrapClass">
        <label>
            <input type="text"
                   :placeholder="placeholder"
                   @focus="isDropUlShow = true"
                   :value="getSelectedTitle"
            />
            <CIcon class-name="cascade-icon"
                   icon-name="choas-arrow-down"
                   :style="{
                       transform: isDropUlShow? 'rotate(180deg)': 'rotate(0)',
                       transition: 'all 0.3s'
                  }"
                   @click="iconClick($event)"
            />
        </label>
        <div v-if="isDropUlShow"
             class="collapse-box"
             :style="{
            minWidth: '100%',
            height: '400%',
            overflowX:'visible',
             }"
        >
            <CIcon :style="{
                position: 'absolute',
                 top: '-5px',
                  right: '-5px'
            }" width="40" height="40" icon-name="choas-close" @click="iconClick" active-color="#ff5e5c"/>
            <div :style="{
                height: '100%',
                overflowY:'auto',
                overflowX:'visible',
                position: 'relative',
             }"
            >
                <div v-if="copyData.length"
                     :style="{
                                width: 80+ (150* floorX) +'px',
                                height: 60+ (40* floorY) +'px',
                                }"
                >
                    <CCascadeItem
                            v-for="(item,index) in copyData"
                            :key="index"
                            :item-data="item"
                            :reflect-key="reflectKey"
                            @change="change"
                            :lv="0"
                            :conditionProps="conditionProps"/>
                </div>
                <div v-else>
                    暂无数据
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import classNames from 'classnames'
    import _ from 'lodash'
    import CCascadeItem from "../CCascadeItem/CCascadeItem";

    export default {
        name: 'CCascade',
        components: {
            CCascadeItem
        },
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
                        timer: null,
                        key: 'title',
                        value: 'value'
                    }
                }
            },
            placeholder: {
                type: String,
                default() {
                    return '请要新增到的机构'
                }
            },
            conditionProps: {
                type: String,
                default() {
                    return 'node'
                }
            }
        },
        data() {
            return {
                isDropUlShow: false,
                copyData: [],
                floorX: 1,
                floorY: 1,
                result: []
            };
        },
        mounted() {},
        computed: {
            getSelectWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [prefix + 'cascade-wrap']: true
                    }
                )
            },
            getSelectedTitle() {
                return this.value.reduce((a, b) => {
                    return a = b[this.reflectKey['key']] + (a ? ' / ' + a : '')
                }, '')
            }
        },
        methods: {
            addInfo(data, parentId) {
                data.forEach((item, index) => {
                    if (!item[this.conditionProps]) {
                        data[index] = undefined
                    }
                    item._c_cascade_parentId = parentId;
                    item._c_cascade_id = parentId + '-' + index;
                    if ((item.children || []).length) {
                        this.addInfo(item.children, item._c_cascade_id)
                        item.children = item.children.filter(Boolean)
                    }
                })
                return data
            },
            iconClick(e) {
                e.preventDefault()
                this.floorX = this.listData.length
                this.floorY = 1
                this.isDropUlShow = !this.isDropUlShow
                if (!this.isDropUlShow) {
                    this.operateCopyData(this.copyData)
                }
            },
            operateCopyData(data){
                data.forEach((item, index) => {
                    this.$set(data, index, {...item, isOpen: false})
                    if ((item.children || []).length) {
                        this.operateCopyData(item.children)
                    }
                })
            },
            change(item) {
                const path = item._c_cascade_id.slice(2).split('-').join('.children.').split('.')
                const parentPath = item._c_cascade_parentId.slice(2).split('-').join('.children.').split('.')
                // 获取父元素值
                const parentValue = parentPath !== '' ? _.get(this.copyData, parentPath, {}) : this.copyData
                // 获取自身序数
                const selfIndex = parseInt(item._c_cascade_id.slice(item._c_cascade_id.length - 1), 10)
                // 关闭所有同级及子集目录
                const fClose = (data, selfIndex) => {
                    (data || []).forEach((item, index) => {
                        if (selfIndex !== null) {
                            if (index !== selfIndex) {
                                data.splice(index, 1, {...item, isOpen: false})
                            }
                        } else {
                            data.splice(index, 1, {...item, isOpen: false})
                        }
                        if ((item.children || []).length) {
                            fClose(item.children, null)
                        }
                    })
                }
                fClose(parentValue.children, selfIndex)
                // 打开自身
                this.$set(item, 'isOpen', true)
                // 动态调整宽度
                this.floorX = item._c_cascade_id.split('-').length
                // 没有子集，动态调整
                if (!(item.children || []).length) {
                    this.floorX--
                }
                // 动态调整高度
                let pathStr = path.join('.')
                this.floorY = this.listData.length
                let count = 0
                do {
                    const children = _.get(this.copyData, pathStr + '.children', [])
                    this.floorY = this.floorY + (children.length ? children.length - 1 : 0)
                    count += 2;
                    pathStr = path.slice(0, path.length - count).join('.')
                } while (pathStr)
                const p = _.get(this.copyData, path.splice(0, path.length - 2).join('.'), {})
                // 筛选父级所在序号 父级以后所有数值删除
                let findIndex = 0
                if (Object.keys(p).length) {
                    findIndex = this.result.findIndex((res) => {
                        return res[this.reflectKey['value']] === p[this.reflectKey['value']]
                    })
                    this.result.splice(findIndex + 1, this.result.length)
                } else {
                    this.result.splice(findIndex, this.result.length)
                }
                // 添加结果集
                const key = this.reflectKey['key']
                const value = this.reflectKey['value']
                this.result.push({[key]: item[key], [value]: item[value]})
            }
        },
        watch: {
            result: {
                handler(v) {
                    this.$emit('input', v)
                },
                deep: true
            },
            listData: {
                handler(v) {
                    this.floorY = v.length
                    this.copyData = this.addInfo(_.clone(v), '0').filter(Boolean)
                    this.copyData.forEach((item, index) => {
                        this.$set(this.copyData, index, {...item, isOpen: true})
                    })
                    this.operateCopyData(this.copyData)
                },
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

    .cascade-wrap {
        display: flex;
        height: addPX($sm-height);
        position: relative;
        width: 90%;
        background: #fff;
        padding: addPX($lg-padding) 0;

        > label {
            display: block;
            flex: 1;

            > input {
                width: 100%;
                height: addPX($sm-height);
                padding-left: addPX($lg-padding);
                box-sizing: border-box;
                border: 1px solid $lineColor;
                border-radius: addPX($sm-radius);

                &:focus {
                    outline: none;
                    border: 1px solid $primary;
                }
            }

            .cascade-icon {
                position: absolute;
                right: 10px;
                top: addPX($lg-padding+5);
            }
        }

        .collapse-box {
            position: absolute;
            top: addPX($df-height+$lg-padding*2);
            z-index: 999;
            background: #fff;
            box-sizing: border-box;
            border: 1px solid #ccc;
            padding: addPX($lg-padding*2);
            box-shadow: 1px 1px 3px $shadowCr;
            border-radius: addPX($sm-radius);
        }
    }
</style>
