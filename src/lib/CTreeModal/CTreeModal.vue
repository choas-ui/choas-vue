<template>
    <CModal v-model="isModalShow"
            :width="width"
            :height="height"
            :mask="mask"
            :draggable="draggable"
            :controllerColor="controllerColor"
            :activeColor="activeColor"
    >
        <slot slot="header">
            <div class="modal-header">
                {{title}}
            </div>
        </slot>

        <div class="tree-box-wrap">
            <div class="tree-box">
                <div class="footer-box"></div>
                <div class="search-box-wrap">
                    <input type="text" v-model="searchStr" :placeholder="noticeTxt">
                    <CButton v-show="!isCascadeShow" @click="isCascadeShow = true">新增</CButton>
                    <CButton v-show="isCascadeShow" @click="addTreeListHandle">保存</CButton>
                    <CButton v-show="isCascadeShow" type="danger" @click="addBtnCancelHandle">取消</CButton>
                </div>
                <CCascade v-model="cascadeData"
                          v-if="isCascadeShow"
                          :list-data="cascadeList"
                          :reflectKey="reflectKey"
                          :placeholder="placeholder"
                          :conditionProps="conditionProps"
                />
                <div class="content-box">
                    <div>
                        <CTree
                                :line="line"
                                file-icon
                                v-model="selectData"
                                :list-data="list_data"
                                :reflect-key="reflectKey"
                                :search-str="searchStr"
                        ></CTree>
                    </div>
                </div>
            </div>
            <div class="selected-box">
                <div class="footer-box">
                    已选{{selectData.length? 1 : 0}}项
                </div>
                <div class="selected-content">
                    <p v-for="item of selectData"
                       :key="item[reflectKey['value']]"
                    >
                        <b>{{item[reflectKey['key']]}}</b>
                        <CIcon icon-name="choas-close"
                               color="#fff"
                               height="40"
                               width="40"
                               active-color="#ff5e5c"
                               :style="{
                                    lineHeight: '100%'
                               }"
                               @click="selectData = []"
                        ></CIcon>
                    </p>
                </div>
            </div>
        </div>
        <slot slot="footer">
            <div class="modal-footer">
                <CButton size="large" type="danger" @click="cancelHandle">取&nbsp;&nbsp;消</CButton>
                <CButton size="large" @click="confirmHandle">确&nbsp;&nbsp;认</CButton>
            </div>
        </slot>
    </CModal>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'CTreeModal',
        components: {},
        props: {
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
            line: {
                type: Boolean
            },
            isShow: {
                type: Boolean
            },
            width: {
                type: String,
                default() {
                    return '800'
                }
            },
            height: {
                type: String,
                default() {
                    return '600'
                }
            },
            title: {
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
            },
            controllerColor: {
                type: String,
                default() {
                    return ''
                }
            },
            activeColor: {
                type: String,
                default() {
                    return ''
                }
            },
            mask: {
                type: Boolean
            },
            draggable: {
                type: Boolean
            },
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            // 收束条件
            conditionProps: {
                type: String,
                default() {
                    return 'node'
                }
            },
        },
        data() {
            return {
                isCascadeShow: false,
                isModalShow: this.isShow,
                selectData: this.value,
                searchStr: '',
                list_data: [],
                cascadeData: [],
                cascadeList: [],
                noticeTxt: '搜索节点'
            }
        },
        mounted() {
            this.list_data = _.cloneDeep(this.listData)
            this.cascadeList = _.cloneDeep(this.listData)
        },
        methods: {
            confirmHandle() {
                this.$emit('toggleShow', false)
                this.$emit('input', this.selectData)
            },
            cancelHandle() {
                this.$emit('toggleShow', false)
                this.selectData = this.value
            },
            addTreeListHandle() {
                const pId = this.cascadeData[this.cascadeData.length-1]?this.cascadeData[this.cascadeData.length-1][this.reflectKey['value']]: ''
                this.$emit('addTreeNode', {pId: pId || '', value: this.searchStr})
            },
            addBtnCancelHandle() {
                this.isCascadeShow = false
                this.searchStr = ''
            }
        },
        watch: {
            isShow(v) {
                this.isModalShow = v
            },
            isCascadeShow(v) {
                if (v) {
                    this.noticeTxt = '请输入新增节点名称'
                } else {
                    this.noticeTxt = '搜索节点'
                }
            },
            isModalShow(v) {
                if (!v) {
                    this.cascadeData = []
                    this.isCascadeShow = false
                    this.$emit('toggleShow', false)
                }
            },
            searchStr(v) {
                if (!v) {
                    this.list_data = _.cloneDeep(this.listData)
                    this.cascadeList = _.cloneDeep(this.listData)
                }
            },
            listData: {
                handler(v) {
                    this.$set(this, 'list_data', _.cloneDeep(v))
                    this.$set(this, 'cascadeList', _.cloneDeep(v))
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/variable';
    @import '../scss/size';
    @import '../scss/functions';

    .modal-header {
        width: 100%;
        height: 50px;
        background: url("./imgs/header.png") left center/100% 100%;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
    }

    .modal-footer {
        height: addPX($lg-height*1.4);
        line-height: addPX($lg-height*1.4);
    }

    .tree-box-wrap {
        height: 100%;
        display: flex;
        padding: addPX($lg-padding) addPX($lg-padding) 0 addPX($lg-padding);
        box-sizing: border-box;

        .tree-box {
            flex: 3;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;


            .title-box {
                width: 100%;
                height: addPX($df-height);
                line-height: addPX($df-height);
                font-size: addPX($lg-fs);
                background: $info;
                color: #fff;
                text-indent: addPX($df-fs * 2);
                letter-spacing: addPX($df-letterSp);
                border-radius: addPX($sm-radius) addPX($sm-radius) 0 0;
            }

            .search-box-wrap {
                padding: addPX($lg-padding) addPX($lg-padding) 0 0;
                width: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;

                input {
                    width: 60%;
                    border: 1px solid $lineColor;
                    height: addPX($sm-height);
                    box-sizing: border-box;
                    border-radius: addPX($df-radius);
                    padding-left: addPX($lg-padding);

                    &:focus {
                        outline: none;
                        border: 1px solid $primary;
                    }
                }
            }

            .cascade-box {
                padding: addPX($lg-padding) addPX($lg-padding) 0 0;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                text-align: center;
            }

            .content-box {
                margin: addPX($lg-padding* 1.5) 0;
                width: 100%;
                flex: 1;
                box-sizing: border-box;
                overflow-y: auto;
                display: flex;
            }
        }

        .selected-box {
            flex: 2;
            word-break: break-all;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            flex-direction: column;

            & > .selected-content {
                width: 100%;
                height: 100%;
                flex: 1;
                padding-left: addPX($lg-padding);
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                border-left: 1px solid $lineColor;

                > p {
                    width: 100%;
                    line-height: addPX($sm-height);
                    box-sizing: border-box;
                    text-align: left;
                    margin: addPX($lg-padding) 0 0 0;
                    display: flex;
                    font-size: addPX($lg-fs);

                    > b {
                        flex: 1;
                        text-align: left;
                    }

                    &:hover {
                        background: $info;
                        color: white;
                    }
                }

            }
        }

        .footer-box {
            width: 100%;
            height: addPX($sm-height);
            text-align: right;
            line-height: addPX($sm-height);
            text-indent: addPX($df-fs * 2);
            letter-spacing: addPX($df-letterSp);
            padding-right: addPX($lg-padding);
            box-sizing: border-box;
        }
    }
</style>
