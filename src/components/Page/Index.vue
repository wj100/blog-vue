<template>
  <div class="index">
    <div class="cover-up" v-if="showCoverUp">
      <div>
        <input type="password" placeholder="请输入授权码,回车确认" v-model="passKey" @keydown.13="sureAuthority()">
      </div>
    </div>
    <div class="line"></div>
    <!--主体-->
    <div class="content">
      <nav>
        <div class="nav-info">
          <div class="wrap-title">
            <AnalogClock style="width: 160px;height: 160px;"
              borderColor="#546e7a"
              backgroundColor="#FFF"
              scaleType="roman"
              scaleColor="#455a64"
              hourColor="#607d8b"
              handType="line"
              hourHandColor="#263238"
              minuteHandColor="#37474f"
              secondHandColor="#455a64"
            />
          </div>
          <span class="wj-button-green" @click="gotoPublish()">发布文章</span>
          <div class="search">
            <input type="text" placeholder="请输入文章标题..." v-model="searchKey" @keyup.13="searchArticle(searchKey)">
            <i class="el-icon-search" @click="searchArticle(searchKey)"></i>
          </div>
        </div>
        <span class="wj-button search-all" @click="getList()">查找全部</span>
        <el-menu
          default-active="1"
          unique-opened
          @select="selectMenu"
          class="nav-menu"
          background-color="#263238"
          text-color="#fff"
          active-text-color="#4db6ac">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>前端开发</span>
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
              <i class="el-icon-basketball"></i>
              <span>服务端</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="network">网络协议</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="node">Node</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="dataBase">数据库</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="other">
            <i class="el-icon-zoom-in"></i>
            <span slot="title">其它技术</span>
          </el-menu-item>
          <el-menu-item index="life">
            <i class="el-icon-edit-outline"></i>
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
        passKey: "",
        showCoverUp: false,
        searchKey: "",
        screen: 0,//屏幕宽度
      }
    },
    created() {
      this.getList();
      this.screen = screen.width
    },
    computed: {},
    methods: {
      //验证身份去发布页
      sureAuthority() {
        if (this.passKey !== "jun") {
          alert("验证不通过!");
          this.passKey = "";
        } else {
          this.$router.push('/markdown');
          this.showCoverUp = false;
          localStorage.setItem("passKey", JSON.stringify(this.passKey))
        }
      },
      //点击发布按钮
      gotoPublish() {
        if (this.$store.state.isAdmin) {
          this.$router.push('/markdown');
        } else {
          this.showCoverUp = true
        }
      },
      //关键字搜索
      searchArticle(key) {
        this.$post('/blog/searchArticle', {
          keyWord: key
        }).then((res) => {
          this.$store.commit("setList", res.data)
        });
      },
      //选中菜单
      selectMenu(v) {
        console.log(v);
        this.getList(v);
        this.$router.push('/index')
      },
      //获取文章列表
      getList(t = "") {
        this.$router.push('/index')
        this.$get('/blog/getList?type=' + t).then((res) => {
          this.$store.commit("setList", res.data)
        })
      },
    }
  }
</script>

<style scoped lang="less">

  .index {
    width: 100%;
    height: calc(100%);
    background: @c2;
  }

  .content {
    width: 1200px;
    height: 100%;
    /*background: #fff;*/
    margin: auto;
    display: grid;
    grid-template-columns: 25% 70%;
    grid-column-gap: 5%;

    & nav {
      background: #fff;

      & .nav-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        & .me {
          & img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 3px solid @c0;
          }

        }

        & > span:nth-of-type(1) {
          a {
            color: #ffffff;
            text-decoration: none;
          }

          a:hover {
            color: @c0;
          }
        }

        & span:nth-of-type(2) {

        }

        & span:nth-of-type(2):hover {

        }

      }

      & .nav-menu {
        background: @c0;
      }
    }

    & .article-list {
      background: #fff;
      height: 100%;
      overflow-y: auto;
    }
  }

  @media screen and (max-width: 1200px) {
    .content {
      width: 100vw;
    }
  }

  @media screen and (max-width: 500px) {
    .article-list {
      background: #fff;
      height: 100%;
      overflow-y: auto;
    }
  }

  .cover-up {
    width: 100vw;
    height: 100vh;
    background: rgba(36, 73, 62, 0.5);
    position: absolute;
    z-index: 100;
    display: flex;

    & > div {
      margin: auto;

      & input {
        height: 22px;
      }

      & button {
        height: 22px;
      }
    }

  }

  .search-all {
    transform: translateX(-50%);
    margin-left: 50%;
    margin-bottom: 20px
  }
</style>
