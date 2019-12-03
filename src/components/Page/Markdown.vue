<template>
  <div class="box">
    <div class="line"></div>
    <div class="content">
      <header>
        <div class="back">
          <i class="el-icon-arrow-left"></i>
          <router-link to="/index">返回主页</router-link>
        </div>
        <el-input v-model="formInline.title" placeholder="标题"></el-input>
        <div class="wj-button" type="primary" @click="onSubmit">提交</div>
      </header>

      <section>
        <span>作者:</span>
        <el-input v-model="formInline.author" placeholder="作者"></el-input>
        <span>
          <!--空-->
        </span>
        <span>分类:</span>
        <el-select v-model="formInline.type" placeholder="文章分类">
          <el-option style="padding-left: 20px;"
                     v-for="item in typeOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </section>
      <!--markdown编辑器-->
      <div class="mavonEditor">
        <mavonEditor
          v-model="formInline.content"
          ref="md"
          :toolbars="markdownOption"
          @imgAdd="$imgAdd"
          @change="changeMavon"
          @save="onSubmit"/>
      </div>
    </div>

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
        formInline: {
          title: "",
          content: '',
          author: "汪骏",
          type: ""
        },
        typeOptions: [
          {
            value: 'css',
            label: 'CSS'
          },
          {
            value: 'js',
            label: 'JS'
          },
          {
            value: 'vue',
            label: 'VUE'
          },
          {
            value: '网络协议',
            label: '网络协议'
          },
          {
            value: '信息安全',
            label: '信息安全'
          },
        ],
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: false, // 标记
          superscript: false, // 上角标
          subscript: false, // 下角标
          quote: false, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      }
    },
    created(){
      this.editContent()
    },
    methods: {
      editContent(){
        this.formInline.content=this.$store.state.content;
      },
      changeMavon() {
      },
      $imgAdd() {
        //  alert('图片')
      },
      onSubmit() {
        if (this.formInline.title.trim() === ""
          || this.$refs.md.d_render.trim() === ""
          || this.formInline.author.trim() === ""
          || this.formInline.type.trim() === "") {
          this.$message.error("请将表单填写完整!");
          return
        }
        this.$post('/blog/postArticle', {
          title: this.formInline.title,
          // this.$refs.editor.d_value  md         this.$refs.md.d_render  html
          content: this.$refs.md.d_render,
          author: this.formInline.author,
          type: this.formInline.type,
        }).then((res) => {
          this.$message.success("发布成功!");
          this.$router.push('/index');
          this.$forceUpdate()
        })
      }
    }

  }
</script>

<style scoped lang="less">
  .box {

  }

  .content {
    width: 1200px;
    margin: auto;

    & header {
      margin: 10px 0;
      display: grid;
      grid-template-columns: 100px auto 100px;
      grid-column-gap: 20px;

      & .back {
        height: 40px;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;

        & a {
          color: @c6;
          text-decoration: none;
        }
      }
    }

    & section {
      display: grid;
      margin: 10px 0;
      grid-template-columns: 1fr 1fr 6fr 1fr 1fr;

      & span {
        line-height: 40px;
        height: 40px;
        position: relative;
        left: 40%;
        color: @c6;
      }
    }
  }

  @media screen and (max-width: 1025px) {
    .content {
      width: 100vw;
    }
  }


  .title {
    width: 100%;
    margin: 30px auto;
    border: none;
  }

  .mavonEditor {
    border: 1px solid #000;
    height: 800px;
    overflow: auto;
  }
</style>
