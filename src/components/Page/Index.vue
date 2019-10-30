<template>
  <div class="index">
    <div class="line"></div>
    <!--主体-->
    <div class="wrap">
      <nav>
        <div class="nav-info">
          <p><router-link to="/markdown">发布文章</router-link></p>
        </div>
        <!--<div class="wrap-title">-->
        <!--<h3>WJUNE211</h3>-->
        <!--<AnalogClock-->
        <!--borderColor="#546e7a"-->
        <!--backgroundColor="#FFF"-->
        <!--scaleType="roman"-->
        <!--scaleColor="#455a64"-->
        <!--hourColor="#607d8b"-->
        <!--handType="line"-->
        <!--hourHandColor="#263238"-->
        <!--minuteHandColor="#37474f"-->
        <!--secondHandColor="#455a64"-->
        <!--/>-->
        <!--</div>-->
        <el-menu
          default-active="1"
          unique-opened
          @select="selectMenu"
          class="nav-menu"
          background-color="#263238"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>前端</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="css">CSS</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="js">JS</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="vue">VUE</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>后台</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-3">选项4</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">散文</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">生活随笔</span>
          </el-menu-item>
        </el-menu>
      </nav>
      <!--文章列表-->
      <div class="article-list">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import {AnalogClock} from 'vue-analog-clock'

  export default {
    components: {AnalogClock},
    name: 'Index',
    data() {
      return {

      }
    },
    created() {
      this.getList()
    },
    computed: {},
    methods: {
      selectMenu(v) {
        console.log(v);
        this.getList(v)
      },
      //获取列表
      getList(t = "") {
        this.$get('/blog/getList?type=' + t).then((res) => {
          if (res && res.code == 200) {
            this.$store.commit("setList",res.data)
          } else {
            // 提示登录失败原因
            this.$message.warning(res.message);
          }
        }).catch((err) => {
          this.$message.warning("参数异常,请重试!");
        });
      },
      }
  }
</script>

<style scoped lang="less">
  .index {
    width: 100%;
    height: 100%;
    background: @bgc;

    & .line {
      height: 5px;
      background: @black;
    }
  }

  .wrap {
    width: 1200px;
    height: 100%;
    /*background: #fff;*/
    margin: auto;
    display: flex;
    justify-content: space-between;

    & nav {
      width: 20%;
      /*border: 1px solid #000;*/
      background: #fff;

      & .nav-info {
        height: 100px;
        width: 100%;
      }

      & .nav-menu {
        background: red;
      }
    }

    & .article-list {
      width: 75%;
      background: #fff;
      height: 100%;
      overflow-y: auto;
    }
  }

</style>
