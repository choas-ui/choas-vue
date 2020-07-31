<template>
  <CButton @click="clickHandle"></CButton>
</template>

<script>
export default {
  name: 'App',
  mounted() {
  },
  methods: {
    clickHandle() {
      this.$cMessage.success({timeSpan: 2})
      this.$cMessage.info({timeSpan: 2})

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
