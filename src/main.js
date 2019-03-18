import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import WeiboEmoji from 'weibo-emoji'

// require styles
import hljs from 'highlight.js/lib/highlight';
// import 'highlight.js/styles/atelier-dune-light.css';
import 'highlight.js/styles/atelier-estuary-light.css';
import 'highlight.js/lib';
// import 'animate.css'
import * as filters from './filter' // global filters


Vue.config.productionTip = false
Vue.use(WeiboEmoji)

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre');
      blocks.forEach((block)=>{
      hljs.highlightBlock(block)
  })
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
