<template>
  <div class="articleList">
    <div v-if="list.length===0">该分类下暂无文章</div>
    <div v-else class="article-list-item" v-for="item in list" :key="item.id">
      <p class="article-list-item-title" @click="goToArticle(item.id)"> {{item.title}}</p>
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
        data(){
          return {

          }
        },
      methods:{
        //文章详情
        goToArticle(id){
          this.$router.push({path:"index/blog/",query:{"id":id}});
          // this.$router.push({path:"/blog/"+id});
        },
      },
      computed:{
          list(){
            return this.$store.state.articleList
        }
      }
    }
</script>

<style scoped lang="less">
  .article-list-item {
    padding: 20px;
    border-bottom: 1px solid #eee;

    & .article-list-item-title {
      width: 50%;
      margin: auto;
      color: @title;
      font-size: 2rem;
      opacity: .9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
      color: @info;
    }
  }

</style>
