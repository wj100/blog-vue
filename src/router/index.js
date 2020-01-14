import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      redirect: '/index'//重定向
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/components/Page/Index'),
      children:[
        {
          path: '/index/blog',
          name: 'Blog',
          component: () => import('@/components/Page/Blog'),
        },
        {
          path: '/index',
          name: 'ArticleList',
          component: () => import('@/components/Page/ArticleList'),
        },
      ]
    },

    {
      path: '/markdown',
      name: 'Markdown',
      component: () => import('@/components/Page/Markdown'),
    },
    {
      path: '/richText',
      name: 'richText',
      component: () => import('@/components/Page/RichText'),
    }
  ]
})
