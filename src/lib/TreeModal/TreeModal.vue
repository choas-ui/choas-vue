<template>
    <Modal v-model="isModalShow"
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
                    <input type="text" v-model="searchStr" placeholder="搜索">
                    <template v-if="addTreeList">
                        <Button v-show="!isCascadeShow" @click="isCascadeShow = true">新增</Button>
                        <Button v-show="isCascadeShow" @click="addTreeListHandle">保存</Button>
                        <Button v-show="isCascadeShow" type="danger" @click="isCascadeShow = false">取消</Button>
                    </template>
                </div>
                <div v-if="addTreeList"
                     class="cascade-box"
                >
                    <Cascade v-model="cascadeData"
                             v-if="isCascadeShow"
                             :list-data="list_data"
                             :reflectKey="reflectKey"
                             :placeholder="placeholder"
                             :conditionProps="conditionProps"
                    />
                </div>
                <div class="content-box">
                    <div>
                        <Tree
                                line
                                file-icon
                                v-model="selectData"
                                :list-data="list_data"
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
                       <Icon icon-name="choas-close"
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
                <Button size="large" type="danger" @click="cancelHandle">取&nbsp;&nbsp;消</Button>
                <Button size="large" @click="confirmHandle">确&nbsp;&nbsp;认</Button>
            </div>
        </slot>
    </Modal>
</template>

<script>
    import _ from 'lodash'
    export default {
        name: 'TreeModal',
        components: {},
        props: {
            // 收束条件
            conditionProps:{
                type:String,
                default(){
                    return 'node'
                }
            },
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
            isShow:{
                type: Boolean
            },
            width:{
                type:String,
                default(){
                    return '800'
                }
            },
            height:{
                type:String,
                default(){
                    return '600'
                }
            },
            addTreeList:{
                type:Function
            },
            title:{
                type:String,
                default(){
                    return ''
                }
            },
            placeholder:{
                type:String,
                default(){
                    return ''
                }
            },
            controllerColor:{
                type:String,
                default(){
                    return ''
                }
            },
            activeColor:{
                type:String,
                default(){
                    return ''
                }
            },
            mask:{
                type: Boolean
            },
            draggable:{
                type: Boolean
            },
            value: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        data() {
            return {
                isCascadeShow: false,
                isModalShow: this.isShow,
                selectData: this.value,
                searchStr: '',
                list_data: {},
                cascadeData:[]
            }
        },
        mounted() {
            this.list_data=_.cloneDeep(this.listData)
        },
        methods: {
            confirmHandle(){
                this.$emit('toggleShow', false)
                this.$emit('input', this.selectData)
            },
            cancelHandle(){
                this.$emit('toggleShow', false)
                this.selectData = this.value
            },
            addTreeListHandle(){
                const {fn, args,key}= this.addTreeList()
                fn({...args,[key]: this.cascadeData[0][this.reflectKey['value']]}).then(res=>{
                    if(res.code===200){
                        this.$set(this,'list_data', res.data)
                        if(this.$listeners['getListData']){
                            this.$emit('getListData',  res.data)
                        }
                        this.isCascadeShow = false
                    }else{
                        alert('添加失败')
                    }
                })
            }
        },
        watch:{
            isShow(v){
                this.isModalShow =  v
            },
            isModalShow(v){

                if(!v){
                    this.$emit('toggleShow', false)
                }
            },
            isCascadeShow(){
                this.$set(this,'cascadeData', [])
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
    .modal-footer{
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
                    height: addPX($sm-height);
                    box-sizing: border-box;
                    border-radius:  addPX($df-radius) ;
                    padding-left: addPX($lg-padding);
                    &:focus {
                        outline: none;
                        border: 1px solid $primary;
                    }
                }
            }
            .cascade-box{
                padding: addPX($lg-padding)  addPX($lg-padding) 0  0;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                text-align: center;
            }
            .content-box{
                margin: addPX($lg-padding* 1.5) 0;
                width: 100%;
                flex: 1;
                box-sizing: border-box;
                overflow-y: auto;
                display: flex;
            }
        }
        .selected-box{
            flex: 2;
            word-break: break-all;
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
            text-indent: addPX($df-fs * 2);
            letter-spacing: addPX($df-letterSp);
            padding-right: addPX($lg-padding);
            box-sizing: border-box;
        }
    }
</style>
