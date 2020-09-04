<template>
    <div :class="getSelectWrapClass" ref="cascade">
        <label>
            <input type="text"
                   ref="inputBox"
                   :placeholder="placeholder"
                   @focus="focusHandle"
                   :value="getSelectedTitle"
            />
            <CIcon class-name="cascade-icon"
                   icon-name="choas-arrow-down"
                   :style="{
                       transform: selectedArr.length? 'rotate(180deg)': 'rotate(0)',
                       transition: 'all 0.5s'
                  }"
                   @click.prevent="iconClick($event)"
            />
        </label>
        <div v-if="(selectedArr[0] || []).length && isDropUlShow">
            <template v-for="(selectedItem, index) in selectedArr">
                <ul :class="{
                    'cascade-drop-box': true,
                }"
                    :key="index"
                    :style="{
                        left: 151* index +'px',
                        top: $refs.cascade.clientHeight+10+'px',
                    }"
                >
                    <li v-for="(item, i) in selectedItem" :key="i" @click="addSelectedDataHandle(item)">
                        <p :class="{
                        'cascade-item-p': true,
                        active: result.some(res=>res[reflectKey['value']]===item[reflectKey['value']])
                    }"
                           :title="item[reflectKey['key']]"
                           :style="{
                           cursor: (item.children || []).length? 'pointer': 'normal'
                       }"
                        >
                            {{item[reflectKey['key']]}}
                        </p>
                        <CIcon v-if="(item.children || []).length"
                               ref="cascadeIcon"
                               icon-name="choas-arrow-right"
                               :color="result.some(res=>res[reflectKey['value']]===item[reflectKey['value']])?'#fff':''"
                               :style="{
                                position:'absolute',
                                right: 0,
                                top: '10px'
                           }"
                        />
                    </li>
                </ul>
            </template>
        </div>
        <div v-if="!(selectedArr[0] || []).length && isDropUlShow"
             class="no-data-box"
             :style="{
                top: $refs.cascade.clientHeight + 10 +'px',
             }"
        >
            暂无数据
        </div>
    </div>
</template>

<script>
  import classNames from 'classnames';
  import {reflectKeyProps, prefixProps} from "../../consts/mixins";
  import _ from 'lodash';

  export default {
    name: 'CCascade',
    mixins: [reflectKeyProps, prefixProps],
    components: {},
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
        selectedArr: [],
        result: []
      };
    },
    mounted() {
      this.$nextTick(() => {
        document.addEventListener('click', ({target}) => {
          if (this.$refs.cascade && !this.$refs.cascade.contains(target)) {
            this.isDropUlShow = false
            this.selectedArr = []
          }
        })
      })
    },
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
        return [...this.result].reverse().reduce((a, b) => {
          return b[this.reflectKey['key']] + (a ? ' / ' + a : '')
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
      iconClick() {
        if (this.selectedArr.length) {
          this.selectedArr = []
          this.isDropUlShow = false
        } else {
          this.selectedArr.push(this.copyData)
          this.isDropUlShow = true
        }
      },
      focusHandle() {
        if (!this.selectedArr.length) {
          this.selectedArr.push(this.copyData)
        }
        this.isDropUlShow = true
      },
      operateCopyData(data) {
        data.forEach((item, index) => {
          this.$set(data, index, {...item, isOpen: false})
          if ((item.children || []).length) {
            this.operateCopyData(item.children)
          }
        })
      },
      addSelectedDataHandle(data) {
        const index = data._c_cascade_parentId.split('-').length
        this.selectedArr.splice(index, this.selectedArr.length)
        if ((data.children || []).length) {
          this.selectedArr.push([...data.children])
        }
        this.result.splice(index - 1, this.result.length)
        this.result.push(data)
      }
    },
    watch: {
      result: {
        handler(v, old) {
          if (!_.isEqual(v, old)) {
            this.$emit('input', _.cloneDeep(v))
          }
        },
        deep: true,
        immediate: true
      },
      listData: {
        handler(v, old) {
          if (!_.isEqual(v, old)) {
            this.copyData = this.addInfo(_.clone(v), '0').filter(Boolean)
            this.copyData = this.addInfo(this.copyData, '0')
            this.copyData.forEach((item, index) => {
              this.$set(this.copyData, index, {...item, isOpen: true})
            })
            this.operateCopyData(this.copyData)
            this.$set(this, 'copyData', this.copyData)
          }
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
        height: addPX($df-height);
        position: relative;
        width: 90%;
        background: #fff;
        padding-top: addPX($lg-padding);
        box-sizing: content-box;

        > label {
            display: block;
            flex: 1;

            > input {
                width: 100%;
                height: addPX($df-height);
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
                top: addPX($lg-padding+10);
            }
        }

        .cascade-drop-box {
            position: absolute;
            z-index: 999;
            width: 150px;
            padding: 0;
            margin: 0;
            border: 1px solid $lineColor;
            border-radius: addPX($df-radius);
            background: #fff;
            max-height: addPX($lg-height*5);
            overflow-y: auto;

            & > li {
                height: addPX($df-height);
                list-style: none;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                position: relative;
                box-sizing: border-box;
                align-items: center;

                &:first-of-type {
                    border-radius: addPX($sm-radius) addPX($sm-radius) 0 0;
                }

                &:last-of-type {
                    border-radius: 0 0 addPX($sm-radius) addPX($sm-radius);
                }

                &:only-of-type {
                    border-radius: addPX($sm-radius);
                }

                > .cascade-item-p {
                    margin: 0;
                    height: addPX($df-height);
                    line-height: addPX($df-height);
                    font-size: addPX($df-fs);
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding: 0 addPX($df-padding);

                    &:hover {
                        background: $info;
                        color: #fff;
                    }

                    &.active {
                        background: $info;
                        color: #fff;
                    }
                }

                > span {
                    position: absolute;
                    right: 0;
                }
            }
        }

        .no-data-box {
            width: 150px;
            height: 100px;
            box-sizing: border-box;
            border: 1px solid $lineColor;
            position: absolute;
            border-radius: addPX($sm-radius);
            text-align: center;
            background: #fff;
            line-height: 100px;
            z-index: 999;
        }
    }
</style>
