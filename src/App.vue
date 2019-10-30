<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Login from './components/Login'

  export default {
  name: 'App',
  methods:{

  },
    components:{
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

html{
  font-size: 62.5%;
}
  #app {
    overflow: hidden;
    /*min-width: 1300px;*/
    height: 100vh;
    width: 100vw;
  }

</style>
