<template>
  <div class="blog">
    <p class="blog-title">{{title}}</p>
    <div class="blog-article" v-html="article"></div>
    <div class="blog-comment">
      <p style="border-top: 1px dashed #15ffa7;">留言区</p>
      <ol>
        <li v-for="(comment,index) in commentList.slice(0,10)" :key="comment.id">
          <span class="position" v-backGround>
            <span>{{comment.position.slice(0,comment.position.indexOf("省"))}}</span>
            <span>{{comment.position.slice(comment.position.indexOf("省")+1,-1)}}</span>
          </span>
          <span class="comment-text" :title="comment.comment_text">{{comment.comment_text}}</span>
          <span class="comment-time">{{comment.comment_time}}</span>
        </li>
      </ol>
      <textarea placeholder="请留下您的宝贵建议..." rows="6" ></textarea>
      <span class="wj-button" style="margin: 0 auto;" @click="postComment()">提交评论</span>
    </div>
  </div>
</template>

<script>
  import {addStyle} from "../../assets/js/common";
  var marked = require('marked');
  export default {
    name: "Blog",
    data() {
      return {
        title: '',
        article: '',
        commentList:[]
      }
    },
    created() {
      this.getBlog();
      this.getComment()
    },
    methods: {
      getBlog() {
        this.$get('/blog/getArticle?id=' + this.$route.query.id).then((res) => {
          this.title = res.data.title;
          this.article = addStyle(res.data.content);
        });
      },
      getComment() {
        this.$get('/blog/getComment?articleId=' + this.$route.query.id).then((res) => {
          this.commentList=res.data.reverse()
        })
      },
      postComment(){
        let commentText=document.querySelector("textarea").value;
        if (commentText.trim()===''){
          this.$message.warning("请填写评论内容!");
          return
        }
        this.$post('/blog/postComment',{
          position :JSON.parse(sessionStorage.getItem("position")),
          articleId:this.$route.query.id,
          commentText:commentText
        }).then(res=>{
          this.$message.success("评论成功!");
          document.querySelector("textarea").value="";
          this.getComment()
        })
      }
    },

  }

</script>

<style scoped lang="less">
  .blog {
    padding: 2vw;
    height: 100vh;
    overflow: auto;
  }

  .blog-title {
    text-shadow: 1px 1px 1px @c4;
    font-size: 2rem;
    color: @c0;
    text-align: center;
  }

  .blog-comment {
    p {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    & textarea {
      width: 100%;
      border-radius: 5px;
      /*resize: both;*/
    }
  }
  ol>li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .position{
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 14px;
    color: #ffffff;
  }
  .comment-text{
    width: 500px;
    height: 20px;
    color: #263238;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .comment-time{
    color: #78909c;
  }
</style>
