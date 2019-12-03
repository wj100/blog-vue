import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Page/Index'
import Blog from "@/components/Page/Blog";
import Markdown from "@/components/Page/Markdown";
import ArticleList from "@/components/Page/ArticleList";
import RichText from "@/components/Page/RichText";


Vue.use(Router);

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'Login',
      redirect: '/index'//重定向
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children:[
        {
          path: '/index/blog',
          name: 'Blog',
          component: Blog
        },
        {
          path: '/index',
          name: 'ArticleList',
          component: ArticleList
        },
      ]
    },

    {
      path: '/markdown',
      name: 'Markdown',
      component: Markdown
    },
    {
      path: '/richText',
      name: 'richText',
      component: RichText
    }
  ]
})
