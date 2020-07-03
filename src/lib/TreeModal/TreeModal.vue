<template>
  <div :class="{ inputWrap: canBeEdited }" class="tablecell">
    <template v-if="!canBeEdited">
      <div class="input-like">
        <template v-if="value.length">
          <span
                  v-for="(item, index) of value"
                  :key="index + item.title"
                  :class="multiple ? 'tag-span' : 'content-span'"
          >
            {{ item.title }}
          </span>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="input-like" @click="openModel">
        <template v-if="value.length">
          <span
                  v-for="(item, index) of value"
                  :key="index + item.title"
                  :class="multiple ? 'tag-span' : 'content-span'"
          >
            {{ item.title }}
          </span>
        </template>
        <template v-else>
          <span class="placeholder-span">{{ placeholder }}</span>
        </template>
      </div>
      <Modal
              v-model="showDialog"
              :transfer="false"
              width="1100"
              @close="closeModule"
      >
        <div slot="header" class="dialogHeader">
          <span>{{ title }}</span>
        </div>
        <div style="text-align:center">
          <div class="selectBox">
            <div class="fn-inline">
              <label class="fn-inline">
                <Input v-model="searchValue" placeholder="请输入名称或者机构代码……" />
              </label>
              <Button type="primary" @click="searchHandle">搜索</Button>
              <Button @click="setInitValue">重置</Button>
            </div>
          </div>
          <div class="transferWrap">
            <div class="alternative">
              <div class="title">
                <span>备选项目</span>
              </div>
              <div class="selectTree">
                <Tree
                        ref="tree"
                        :data="selfTreeData"
                        :check-directly="multiple"
                        :show-checkbox="multiple"
                        @on-select-change="selectChange"
                        @on-check-change="selectMultiple"
                />
              </div>
            </div>
            <div class="Selected">
              <div class="title">
                <span>已选择项</span>
              </div>
              <div class="select-p-box">
                <p
                        v-for="(selectItem, index) of selectData"
                        :key="index"
                        class="tree-select"
                >
                  {{ selectItem.title }}
                  <i
                          class="ivu-icon ivu-icon-ios-close"
                          @click="multiple ? multipleRemove(selectItem) : singleRemove(selectItem)"
                  ></i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="determine">
          <Button type="error" long @click="closeModule">取消</Button>
          <Button type="success" long @click="determineMsg">确定</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'TreeModal',
    components: {
    },
    props: {
      multiple: {
        type: Boolean
      },
      prop: {
        type: String,
        default() {
          return ''
        }
      },
      title: {
        type: String,
        default() {
          return ''
        }
      },
      propname: {
        type: String,
        default() {
          return ''
        }
      },
      value: {
        type: Array,
        default() {
          return []
        }
      },
      placeholder: {
        type: String,
        default() {
          return ''
        }
      },
      canBeEdited: {
        type: Boolean
      },
      onchange: {
        type: Function,
        default () {
          return (value) => value
        }
      },
      singleIndex: {
        type: String,
        default() {
          return '0'
        }
      },
      treeData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        showDialog: false,
        searchValue: '',
        keyName: 'checked',
        hasSelectedTree: [],
        selectData: [],
        selfTreeData: []
      }
    },
    mounted () {
      this.setInitValue()
    },
    methods: {
      openModel() {
        this.setInitValue()
        this.showDialog = true
      },
      determineMsg() {
        this.$emit('onchange', { value: this.selectData, propname: this.propname, singleIndex: this.singleIndex })
        this.showDialog = false
      },
      closeModule () {
        this.setInitValue()
        this.showDialog = false
      },
      searchHandle () {
        let arr = []
        const f = (treeData) => {
          const len = (treeData.children || []).length
          if (!len && treeData.title.indexOf(this.searchValue) > -1) {
            arr.push(treeData)
          } else {
            for (let i = 0; i < len; ++i) {
              f(treeData.children[i])
            }
          }
        }
        this.selfTreeData.forEach(treeData => {
          f(treeData)
        })
        this.selfTreeData = arr
      },
      selectChange() {
        let allSelectedValue = this.$refs.tree.getSelectedNodes()
        let arr = allSelectedValue.filter(item => (item.children || []) < 1)
        if (arr.length) {
          this.selectData = [...arr]
        }
      },
      singleRemove() {
        const thatItem = this.selectData[0]
        this.resetTreeData(thatItem)
        this.selectData = []
        this.selfTreeData = [...this.selfTreeData]
      },
      selectMultiple() {
        let allSelectedValue = this.$refs.tree.getCheckedNodes()
        let arr = allSelectedValue.filter(item => (item.children || []) < 1)
        if (arr.length || !allSelectedValue.length) {
          this.selectData = [...arr]
        }
      },
      multipleRemove(thatItem) {
        this.selectData = [...this.selectData.filter(item => item.nodeKey !== thatItem.nodeKey)]
        this.resetTreeData(thatItem)
        this.selfTreeData = [...this.selfTreeData]
      },
      resetTreeData(treeData) {
        let posLen = treeData.positionInfo.length
        let parentPosition = treeData.positionInfo.slice(0, posLen - 2)
        let parentObj = _.get(this.selfTreeData, parentPosition.split('.').join('.children.'), {})
        let childrenFalseNum = ((parentObj.children || []).filter(item => item.checked)).length
        treeData[this.keyName] = false
        if ((parentObj.children || []).length <= 1 || childrenFalseNum === 1) {
          parentObj[this.keyName] = false
        } else {
          return this.resetTreeData(parentObj)
        }
      },
      registerPositionInfo(treeData, hasSelectedTree = [], positionInfo = '') {
        for (let i = 0; i < treeData.length; ++i) {
          treeData[i].positionInfo = positionInfo ? positionInfo + '.' + i : positionInfo + i
          if ((hasSelectedTree || []).includes(treeData[i].title)) {
            treeData[i][this.keyName] = true
          }
          if ((treeData[i].children || []).length) {
            this.registerPositionInfo(treeData[i].children, hasSelectedTree, treeData[i].positionInfo)
          }
        }
      },
      setInitValue() {
        this.searchValue = ''
        this.selfTreeData = JSON.parse(JSON.stringify(this.treeData))
        this.registerPositionInfo(this.selfTreeData, this.value.map(item => item.title), '')
        this.selfTreeData = [...this.selfTreeData]
        this.selectData = [...this.value]
        this.keyName = this.multiple ? 'checked' : 'selected'
        this.hasSelectedTree = this.value.map(item => item.title)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .selectBox{
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    margin: 20px 0;
    >div{
      width: 50%;
      margin: 0 10px;
      display: flex;
      align-items: center;
      &:nth-of-type(3){
        width: 100px;
        >button{
          width: 100%;
        }
      }
      >label{
        flex: 1;
      }
      > button{
        margin-left: 20px;
      }
    }
  }
  .determine{
    display: flex;
    justify-content: flex-end;
    >button{
      margin: 0 20px;
      width: 80px;
    }
  }
  .transferWrap {
    height: calc(100% - 130px);
    padding: 20px 15px;
    margin-top: 20px;
    display: flex;
    >div {
      width: 48%;
      height: 100%;
      background:rgba(255,255,255,1);
      border:1px solid rgba(203,203,203,1);
      &:not(:last-child) {
        margin-right: 30px;
      }
      .title {
        font-size:14px;
        font-family:SourceHanSansCN-Bold,SourceHanSansCN,sans-serif;
        font-weight:bold;
        color:rgba(27,129,255,1);
        line-height:46px;
        border-bottom: 1px solid #DEE5EF;
      }
      .selectTree {
        height: 405px;
        overflow: auto;
        padding: 20px;
        text-align: left;
        >*{
          outline: none;
        }
      }
      .selectList {
        height: 405px;
        overflow: auto;
        padding: 20px;
        text-align: left;
        .nameLabel {
          line-height: 30px;
          text-align: center;
          color: #19be6b;
        }
        .selectItemList {
          height:34px;
          background:rgba(244,242,245,1);
          border-radius:2px;
          padding: 0 15px 0 10px;
          margin-bottom: 20px;
          span {
            font-size:14px;
            font-family:SourceHanSansCN-Normal,SourceHanSansCN,sans-serif;
            font-weight:400;
            color:#333;
            line-height: 34px;
          }
          i {
            width: 12px;
            height: 12px;
            background-image: url('./imgs/deleteList.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-top: 11px;
            cursor: pointer;
          }
          &:hover {
            background: #1B81FF;
            span {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .select-p-box{
    height: 405px;
    .tree-select{
      margin-bottom: 20px;
      background: #1890FF;
      color: #fff;
      text-align: left;
      height: 45px;
    ;line-height: 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 20px;
      >i{
        font-size: 30px;
        cursor: pointer;
      }
    }
  }
  .input-like{
    width: 100%;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    line-height: 36px;
    min-height: 36px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    cursor: pointer;
    .tag-span{
      height: 28px;
      line-height: 28px;
      display: inline-block;
      margin-right: 5px;
      padding: 0 10px;
      background: #ccc;
      border-radius: 4px;
      color: #fff;
    }
    .content-span{
      color: #666;
    }
    .placeholder-span{
      color: #ccc;
    }
  }
  .ivu-tree-arrow {
    width: 17px;
  }
  .ivu-modal-close .ivu-icon-ios-close {
    color: #fff;
    font-weight: bold;
  }
  .ivu-modal-header .dialogHeader {
    height: 48px;
    line-height: 48px;
    background-image: url('./imgs/header.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: left;
    span {
      margin-left: 20px;
      font-size:18px;
      font-family:SourceHanSansCN-Bold,SourceHanSansCN,sans-serif;
      font-weight:bold;
      color:rgba(255,255,255,1);
    }
  }
  .ditail-table .tablecell{
    margin: 0;
  }
</style>
<style lang="scss">
  /* 关闭图标样式调账 */
  .ivu-modal-close {
    right: 14px;
    top: 3px;
    line-height: 40px;
    i.ivu-icon-ios-close{
      color: #fff;
      top: 5px;
    }
  }
  /* 展开图标 禁止旋转 */
  .ivu-tree-arrow-open i {
    transform: none;
    vertical-align: text-top;
  }
</style>
