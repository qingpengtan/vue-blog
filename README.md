
# 搭建Vue-cli 3.0 环境

### 项目创建
  vue create project
### 图标引用处理
1、svg方式引用图标  
2、class类名引用图标
### axios封装
### vuex封装
### route封装
### 组件封装
全局组件自动注册
```js
// components/index.js
import Vue from 'vue'

// 自动加载 global 目录下的 .js 结尾的文件
const componentsContext = require.context('./global', true, /\.js$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  /**
  * 兼容 import export 和 require module.export 两种规范
  */
  const ctrl = componentConfig.default || componentConfig
  Vue.component(ctrl.name, ctrl)
})

```
### 生产环境和开发环境命令配置

### GZIP和CDN使用
  
  
  
  
  ```js
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.3.0",
     "@vue/cli-plugin-eslint": "^3.3.0",
    "@vue/cli-service": "^3.3.0",
     "@vue/eslint-config-standard": "^4.0.0",
     "babel-eslint": "^10.0.1",
     "eslint": "^5.8.0",
     "eslint-plugin-vue": "^5.0.0",
    "node-sass": "^4.9.0",
    "sass-loader": "^7.0.1",
    "svg-sprite-loader": "^4.1.3",
    "vue-template-compiler": "^2.5.21"
  }
  ```