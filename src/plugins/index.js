import AuthorityPlugin from './authority-plugin'
import TabsPagePlugin from './tabs-page-plugin'
import Antd from './antd'

const Plugins = {
  install (Vue) {
    Vue.use(AuthorityPlugin)
    Vue.use(TabsPagePlugin)
    Vue.use(Antd)
  }
}

export default Plugins
