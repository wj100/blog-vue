<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Login from './components/Login'
  export default {
    name: 'App',
    created(){

    },
    methods: {


    },
    components: {
      // Login
    }
  }
</script>

<style scoped lang="less">
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }


  #app {
    height: 100vh;
    width: 100vw;
    overflow: hidden;  }

</style>
