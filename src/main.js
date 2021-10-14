import Vue from 'vue'
// import VConsole from 'vconsole'
// const vConsole = new VConsole()
// Vue.use(vConsole)
// console.info("vconsole-info-测试")
// eruda.init()
import App from './App'
import store from './store/index.js'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,store
})
app.$mount()
