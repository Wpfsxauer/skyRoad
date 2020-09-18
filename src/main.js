import Vue from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import './theme/index.less'
import '@/mock'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import bootstrap from '@/bootstrap'
const router = initRouter(store.state.setting.asyncRoutes)
Vue.config.productionTip = false
Vue.use(Plugins)
bootstrap({
  router,
  store,
  message: Vue.prototype.$message
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
