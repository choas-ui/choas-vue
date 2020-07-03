<template>
  <div id="app">
    <Button @click="clickHandle" class-name="usr-btn-class"><template slot="right"><span>1231</span></template></Button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
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
