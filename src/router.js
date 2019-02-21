import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

let routess = [];

// const routerContext = require.context('./', true, /index\.js$/);
// routerContext.keys().forEach(route => {
//   if (route.startsWith('./index')) {
//     return
//   };

//   const routerModule = routerContext(route);
//   /**
//    * 兼容 import export 和 require module.export 两种规范
//    */
//   routess = [...routess, ...(routerModule.default || routerModule)]
// })


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "home" */ './views/fresh/Index.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "detail" */ './views/fresh/Detail.vue')
    }
  ]
})
