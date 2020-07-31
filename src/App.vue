<template>
  <CButton @click="clickHandle"></CButton>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      x: 10
    }
  },
  mounted() {
  },
  methods: {
    clickHandle() {
      if (Math.random() > 0.5) {
        this.$cMessage.info({
          timeSpan: 2,
          message: 'INFO',
          callback: () => {
            console.log(this.x)
          }
        })
      } else {
        this.$cMessage.success({timeSpan: 2})
      }
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vh;

  & > div {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
