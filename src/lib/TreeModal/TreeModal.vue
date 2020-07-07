<template>
    <Modal v-model="isModalShow"
           width="900"
           height="700"
           mask
           draggable
           controllerColor="#fff"
    >
        <slot slot="header">
            <div class="modal-header">
                树形弹框
            </div>
        </slot>
        <div class="select-box">
            <div class="search-box">
                <input type="text" v-model="searchStr">
                <Button size="large">新&nbsp;&nbsp;增</Button>
            </div>
            <div class="cascade-box">
                <div v-show="isAddSelectShow">
                    <input type="text"><input type="text"> <input type="text">
                </div>
            </div>
        </div>
        <div class="tree-box-wrap">
            <div class="tree-box">
                <Tree fileIcon
                      line
                      :list-data="listData"
                      :reflect-key="reflectKey"
                      v-model="selectData"
                      :search-str="searchStr"
                ></Tree>
            </div>
            <div class="selected-box">
                {{selectData}}
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
            }
        },
        data() {
            return {
                isModalShow: true,
                isAddSelectShow: false,
                selectData: [],
                searchStr: ''
            }
        },
        mounted() {
            console.log(this.listData)
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .modal-header {
        width: 100%;
        height: 50px;
        background: url("./imgs/header.png") left center/100% 100%;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
    }

    .select-box {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

        & > div {
            width: 100%;
        }

        .search-box {
            text-align: center;
            padding: 20px 0;

            > input {
                width: 300px;
                margin-right: 20px;
                border: 1px solid #1094f5;
                border-radius: 4px;

                &:focus {
                }
            }
        }

        .cascade-box {
            height: 50px;
        }
    }

    .tree-box-wrap {
        height: calc(100% - 125px);
        display: flex;

        .tree-box {
            flex: 2;
            padding: 0 20px 20px 20px;
        }

        .selected-box {
            flex: 1;
            padding: 0 20px 20px 0;
        }

        .selected-box {
        }
    }
</style>
