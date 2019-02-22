import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons'
import './assets/styles/icon.css'
import './assets/styles/global.scss'

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib';
import * as filters from './filter' // global filters

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false



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
