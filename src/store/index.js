import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {          //状态
    showLoading: true,//显示loading标记
    articleList: [//文章列表
      {
        title: "css技术css技术css技术",
        time: "2015-5-2",
        class: "css",
        id: 18,
        author: "wang"
      },
      {
        title: "javajavajava",
        time: "2012-2-23",
        class: "java",
        id: 20,
        author: "wang"
      },
    ],
  },
  getters: {       //就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

  },
  mutations: {    //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
    setList(state,list){
      state.articleList=list
    }
  },
  actions: {        //actions不是必须的，但是在运用到异步时就要用到actions例如setTimeOut

  }
})
