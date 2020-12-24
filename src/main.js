
import Vue from 'vue'
import App from './App'
import router from './router' // 导入路由文件
import store from './store' // 导入vuex文件
import {get,post} from './axios/request'//导入请求
import './assets/styles/bttn.css'
import './assets/styles/scratch.css'
Vue.prototype.$get = get;
Vue.prototype.$post = post;

//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

// 和自定义过滤器一样,定义全局指令
Vue.directive('backGround',{
  inserted(el) {
    const colorArray=['#546e7a','#757575','#33691e','#00796b','#01579b','#5c6bc0','#7e57c2','#4a148c','#009688','#00bcd4'];
    el.style.backgroundColor=colorArray[Math.floor(Math.random()*10)]
  }
});
/*注册全局过滤器*/
Vue.filter('ellipsis', function (str) {
  if (str.length>12){
    return str.slice(0,12)+"..."
  }
  return str
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
