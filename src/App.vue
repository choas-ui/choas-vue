<template>
  <div id="app">
    <template>
      <Button class-name="usr-btn-class"></Button>
    </template>
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
