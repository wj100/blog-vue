<template>
  <div class="articleList">
    <div class="noData" v-if="list.length===0">
      <i class="el-icon-document"></i>
      <p>该分类下暂无文章</p>
    </div>
    <div v-else class="article-list-item" v-for="item in list" :key="item.id">
      <p class="article-list-item-title" @click="goToArticle(item.id)"> {{item.title}}</p>
      <p class="edit-del" v-if="isAdmin">
        <!--<i class="el-icon-edit" @click="editArticle(item.id)"></i>-->
        <i class="el-icon-delete" @click="deleteArticle(item.id)"></i>
      </p>
      <div class="article-list-item-info">
        <p><i class="el-icon-s-custom"></i>作者: {{item.author}}</p>
        <p><i class="el-icon-s-opportunity"></i>分类: {{item.type}}</p>
        <p><i class="el-icon-s-promotion"></i>发表于: {{item.time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ArticleList",
    data() {
      return {}
    },
    methods: {
      //删除文章
      deleteArticle(id) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('/blog/delArticle?id=' + id).then((res) => {
            this.$store.commit("setList", res.newList)
            if (res.message === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }

          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //编辑文章
      editArticle(id) {
        this.$get('/blog/getArticle?id=' + id).then((res) => {
          console.log(res.data.content);
          this.$store.commit("setContent", res.data.content);
          this.$router.push('/markdown');
        })
      },
      //文章详情
      goToArticle(id) {
        this.$router.push({path: "index/blog/", query: {"id": id}});
        // this.$router.push({path:"/blog/"+id});
      },
    },
    computed: {
      list() {
        return this.$store.state.articleList
      },
      isAdmin() {
        return this.$store.state.isAdmin
      }
    }
  }
</script>

<style scoped lang="less">
.articleList{
  height: 100vh;
  overflow: auto;
}
  .article-list-item {
    padding: 2vmin;
    border-bottom: 1px solid #eee;

    & .article-list-item-title {
      color: @c4;
      font-size: 20px;
      opacity: .9;
      text-align: center;
    }


    & p:nth-of-type(1):hover {
      cursor: pointer;
      text-decoration: underline;
      opacity: 1;
    }

    & .article-list-item-info {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      color: @c3;
    }
  }

  .noData {
    text-align: center;
    font-size: 2vh;
    color: #b0bec5;

    & i {
      font-size: 10vh;
      color: #eceff1;
    }

    & p > span > a {
      color: @c0;
      opacity: .8;
    }

    & p > span > a:hover {
      opacity: 1;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 768px) {
    .article-list-item-title {
      font-size: 14px;
    }

    .article-list-item-info {
      font-size: 12px;
    }

  }

  .edit-del > i {
    color: #666;
    margin-left: 20px;
  }

  .edit-del > i:hover {
    color: red;
  }

  .edit-del > i:active {
    opacity: .3;
  }
</style>
