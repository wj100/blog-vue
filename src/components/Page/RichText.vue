<template>
  <div class="index">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
    <button v-on:click="saveHtml">保存</button>
  </div>
</template>

<script>
  export default {
    name: 'FullText',
    data(){
      return {
        content: '',
        editorOption: {}
      }
    },computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },methods: {
      onEditorReady(editor) { // 准备编辑器
      },
      onEditorBlur(){}, // 失去焦点事件
      onEditorFocus(){}, // 获得焦点事件
      onEditorChange(){}, // 内容改变事件
      saveHtml:function(event){
        alert(this.content);
        this.$post('/test2/postText', {
          title: "this.ruleForm.name",
          content: this.content
        }).then((res) => {
          if (res && res.code == 200) {

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

</style>
