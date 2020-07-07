<template>
    <Modal v-model="isModalShow"
           width="800"
           height="600"
           mask
           draggable
           controllerColor="#fff"
    >
        <slot slot="header">
            <div class="modal-header">
                树形弹框
            </div>
        </slot>

        <div class="tree-box-wrap">
            <div class="tree-box">
                <div class="footer-box"></div>
                <div class="search-box-wrap">
                    <input type="text" v-model="searchStr" placeholder="搜索"> <Button>新增</Button>
                </div>
                <div class="cascade-box">
                    <Cascade  v-if="isCascadeShow" />
                </div>
                <div class="content-box">
                    <div>
                        <Tree
                                line
                                file-icon
                                v-model="selectData"
                                :list-data="listData"
                                :reflect-key="reflectKey"
                                :search-str="searchStr"
                        ></Tree>
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
                       <Icon type="svg"
                             icon-name="choas-close"
                             color="#fff"
                             height="30"
                             width="30"
                             active-color="#ff5e5c"
                             @click="selectData = []"
                       ></Icon>
                   </p>
               </div>
            </div>
        </div>
        <slot slot="footer">
            <div class="modal-footer">
                <Button size="large" type="danger">取&nbsp;&nbsp;消</Button>
                <Button size="large">确&nbsp;&nbsp;认</Button>
            </div>
        </slot>
    </Modal>
</template>

<script>


    export default {
        name: 'TreeModal',
        components: {},
        props: {
            listData: {
                type: Object,
                default() {
                    return {}
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
            isModalShow:{
                type: Boolean
            }
        },
        data() {
            return {
                isAddSelectShow: true,
                isCascadeShow: false,
                selectData: [],
                searchStr: ''
            }
        },
        mounted() {
        },
        methods: {}
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

    .tree-box-wrap {
        height: 100%;
        display: flex;
        padding: addPX($lg-padding) addPX($lg-padding) 0 addPX($lg-padding);
        box-sizing: border-box;
        .tree-box {
            border-top: 1px solid $lineColor;
            flex: 1;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;


            .title-box{
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
                padding: addPX($lg-padding)  addPX($lg-padding) 0  0;
                width: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                input {
                    width: 60%;
                    border: 1px solid $lineColor;
                    height: addPX($sxx-height);
                    border-radius:  0 addPX($df-radius) 0 addPX($df-radius) ;
                    padding-left: addPX($sm-padding);
                    &:focus {
                        outline: none;
                        border: 1px solid $primary;
                    }
                }
            }
            .cascade-box{
                padding: addPX($lg-padding)  addPX($lg-padding) 0  0;
                display: flex;
                height: addPX($sm-height);
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                text-align: center;
            }
            .content-box{
                padding: addPX($lg-padding);
                width: 100%;
                flex: 1;
                box-sizing: border-box;
                overflow-y: auto;
            }

        }
        .selected-box{
            flex: 1;
            word-break: break-all;
            border-top: 1px solid $lineColor;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            flex-direction: column;
            &>.selected-content{
                width: 100%;
                height: 100%;
                flex: 1;
                padding-left :addPX($lg-padding);
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                border-left: 1px solid $lineColor;
                >p{
                    width: 100%;
                    height: addPX($sm-height);
                    line-height: addPX($sm-height);
                    box-sizing: border-box;
                    text-align: center;
                    margin: addPX($lg-padding) 0 0 0;
                    display: flex;
                    font-size: addPX($lg-fs);
                    >b{
                        flex: 1;
                        text-align: center;
                    }
                    &:hover{
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
            color: #fff;
            font-size: addPX($df-fs);
            text-indent: addPX($df-fs * 2);
            letter-spacing: addPX($df-letterSp);
            background: $info;
            padding-right: addPX($lg-padding);
            box-sizing: border-box;
        }
    }
</style>
