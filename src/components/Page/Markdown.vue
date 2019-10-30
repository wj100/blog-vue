<template>
  <div class="markdown">
    <el-button><router-link to="/index">返回主页</router-link></el-button>
    <el-form  :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="标题"></el-input>
      </el-form-item>
     <div style="display: flex;">
       <el-form-item label="作者:">
         <el-input v-model="formInline.author" placeholder="审批人"></el-input>
       </el-form-item>
       <el-form-item label="分类:">
         <el-select v-model="formInline.type" placeholder="文章分类">
           <el-option label="CSS" value="css"></el-option>
           <el-option label="JS" value="js"></el-option>
           <el-option label="VUE" value="vue"></el-option>
         </el-select>
       </el-form-item>
     </div>
      <el-form-item>
        <mavonEditor v-model="formInline.content" ref="md" @imgAdd="$imgAdd" @change="changeMavon" @save="onSubmit"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "Markdown",
    components: {
      mavonEditor
    },
    data() {
      return {
        formInline:{
          title:"",
          content: '',
          author: "汪骏",
          type:""
        }
      }
    },
    methods: {
      changeMavon() {
      },
      $imgAdd() {
        //  alert('图片')
      },
      onSubmit(){
        console.log(this.$refs.md.d_value);
        console.log(this.$refs.md.d_render);
        this.$post('/blog/postText', {
          title: this.formInline.title,
          content: this.$refs.md.d_value,
          author:this.formInline.author,
          type:this.formInline.type,
        }).then((res) => {
          if (res && res.code == 200) {
              this.$message.success("发布成功!");
              this.$router.push('/index');
              this.$forceUpdate()
          } else {
            // 提示登录失败原因
            this.$message.warning(res.data.data);
          }
        })
          .catch((err) => {
            console.log('fail', err);
            //提示登录失败
            this.$message.warning("登录失败！请重试！");
          });
      }
    }

  }
</script>

<style scoped lang="less">
  .title{
    width: 100%;
    margin: 30px auto;
    border: none;
  }

</style>
