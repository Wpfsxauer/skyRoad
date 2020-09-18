<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script>
import { enquireScreen } from './utils/util'
import { mapState, mapMutations } from 'vuex'
import themeUtil from '@/utils/themeUtil';
export default {
  name: 'App',
  data () {
    return {
      locale: {
      }
    }
  },
  created () {
    this.setHtmlTitle()
    enquireScreen(isMobile => this.setDevice(isMobile))
  },
  mounted () {
    this.setWeekModeTheme(this.weekMode)
  },
  watch: {
    weekMode (val) {
      this.setWeekModeTheme(val)
    },
    $route () {
      this.setHtmlTitle()
    },
    'theme.mode': function (val) {
      let closeMessage = this.$message.loading(`您选择了主题模式 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(this.theme.color, val).then(() => {
        setTimeout(closeMessage, 1000)
      })
    },
    'theme.color': function (val) {
      let closeMessage = this.$message.loading(`您选择了主题色 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(val, this.theme.mode).then(() => {
        setTimeout(closeMessage, 1000)
      })
    }
  },
  computed: {
    ...mapState('setting', [
      'theme',
      'weekMode',
      'lang'
    ])
  },
  methods: {
    ...mapMutations('setting', ['setDevice']),
    setWeekModeTheme (weekMode) {
      if (weekMode) {
        document.body.classList.add('week-mode')
      } else {
        document.body.classList.remove('week-mode')
      }
    },
    setHtmlTitle () {
      document.title = this.$route.name
    }
  }
}
</script>
<style lang="less" scoped>
</style>
