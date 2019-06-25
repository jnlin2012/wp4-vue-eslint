<template>
  <p class="a">
    {{ test }}
  </p>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      test: 'Hello world!'
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style lang="less" scoped>
  .a {
    font-size: 24px;
  }
</style>
