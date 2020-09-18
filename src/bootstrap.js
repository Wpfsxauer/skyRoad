import { loadRoutes, loadGuards } from '@/utils/routerUtil'
import guards from '@/router/guards'

/**
 * 启动引导方法
 * 应用启动时需要执行的操作放在这里
 * @param router 应用的路由实例
 * @param store 应用的 vuex.store 实例
 */
function bootstrap ({
  router, store, message 
}) {
  // 加载路由
  loadRoutes({
    router,
    store 
  })
  // 加载路由守卫
  loadGuards(guards, {
    router,
    store,
    message 
  })
}

export default bootstrap
