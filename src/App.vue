<template>
  <div id="app">
    <template>
      <Tree
              fileIcon
              line
              :list-data="listData"
              :selectData="selectData"
      >
        <Icon
                slot="icon-mark"
                type="svg"
                icon-name="choas-square-add"
        />
        <Icon
                slot="tail"
                type="svg"
                icon-name="choas-square-add"
        />
      </Tree>
    </template>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      listData:{
        title: '0',
        value: '0',
        children:[
          {
            title: '0-0',
            value: '0-0',
          },
          {
            title: '0-1',
            value: '0-1',
            children:[
              {
                title: '0-1-0',
                value: '0-1-1',
              }
            ]
          },
        ]
      },
      selectData:[],
    }
  },
  methods: {
    clickHandle(){
      console.log(123)
    }
  }
}
</script>

<style lang="scss" scoped>
  body{
    margin: 0;
  }
  button.usr-btn-class{
    background: red;
  }
</style>
