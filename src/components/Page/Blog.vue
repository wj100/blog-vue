<template>
    <div class="blog" >
      <div class="artilce" v-html="blog"></div>
    </div>
</template>

<script>
    export default {
        name: "Blog",
      data(){
          return {
            blog:''
          }
      },
      created(){
          this.getBlog()
      },
      methods:{
          getBlog(){
            this.$get('/blog/getArticle?id=' + this.$route.query.id).then((res) => {
              if (res && res.code == 200) {
                console.log(res.data);
                 this.blog = res.data.content
              } else {
                this.$message.warning(res.message);
              }
            }).catch((err) => {
              this.$message.warning("参数异常,请重试!");
            });
          }
      }
    }
</script>

<style scoped>
.ql-syntax{
  background: red;
}
h1{
  color: green;
}
  .lang-language{
    background: red;
  }
  button{
    background: red;
  }
</style>
