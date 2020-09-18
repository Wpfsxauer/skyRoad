<template>
  <div class="side-setting">
    <setting-item :title="messages.theme.title">
      <img-checkbox-group
        @change="values => setTheme({...theme, mode: values[0]})"
        :default-values="[theme.mode]"
      >
        <img-checkbox
          :title="messages.theme.dark"
          img="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg"
          value="dark"
        />
        <img-checkbox
          :title="messages.theme.light"
          img="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg"
          value="light"
        />
        <img-checkbox
          :title="messages.theme.night"
          img="https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg"
          value="night"
        />
      </img-checkbox-group>
    </setting-item>
    <setting-item :title="messages.theme.color">
      <color-checkbox-group
        @change="(values, colors) => setTheme({...theme, color: colors[0]})"
        :defaultValues="[palettes.indexOf(theme.color)]"
        :multiple="false"
      >
        <color-checkbox
          v-for="(color, index) in palettes"
          :key="index"
          :color="color"
          :value="index"
        />
      </color-checkbox-group>
    </setting-item>
    <a-divider />
    <setting-item :title="messages.navigate.title">
      <img-checkbox-group @change="values => setLayout(values[0])" :default-values="[layout]">
        <img-checkbox
          :title="messages.navigate.side"
          img="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg"
          value="side"
        />
        <img-checkbox
          :title="messages.navigate.head"
          img="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg"
          value="head"
        />
        <img-checkbox
          :title="messages.navigate.mix"
          img="https://gw.alipayobjects.com/zos/antfincdn/x8Ob%26B8cy8/LCkqqYNmvBEbokSDscrm.svg"
          value="mix"
        />
      </img-checkbox-group>
    </setting-item>
    <setting-item>
      <a-list :split="false">
        <a-list-item>
          {{messages.navigate.content.title}}
          <a-select
            :getPopupContainer="getPopupContainer"
            :dropdown-style="{zIndex: 2001}"
            size="small"
            :defaultValue="pageWidth"
            @change="setPageWidth"
            slot="actions"
            style="width: 80px"
          >
            <a-select-option value="fluid">{{ messages.navigate.content.fluid }}</a-select-option>
            <a-select-option value="fixed">{{ messages.navigate.content.fixed }}</a-select-option>
          </a-select>
        </a-list-item>
        <a-list-item>
          {{ messages.navigate.fixedHeader}}
          <a-switch :checked="fixedHeader" slot="actions" size="small" @change="setFixedHeader" />
        </a-list-item>
        <a-list-item>
          {{messages.navigate.fixedSideBar}}
          <a-switch :checked="fixedSideBar" slot="actions" size="small" @change="setFixedSideBar" />
        </a-list-item>
      </a-list>
    </setting-item>
    <a-divider />
    <setting-item :title="messages.other.title">
      <a-list :split="false">
        <a-list-item>
          {{messages.other.weekMode}}
          <a-switch :checked="weekMode" slot="actions" size="small" @change="setWeekMode" />
        </a-list-item>
        <a-list-item>
          {{ messages.other.multiPages}}
          <a-switch :checked="multiPage" slot="actions" size="small" @change="setMultiPage" />
        </a-list-item>
        <a-list-item>
          {{ messages.other.hideSetting}}
          <a-switch :checked="hideSetting" slot="actions" size="small" @change="setHideSetting" />
        </a-list-item>
      </a-list>
    </setting-item>
    <a-divider />
    <setting-item :title="messages.animate.title">
      <a-list :split="false">
        <a-list-item>
          {{ messages.animate.disable}}
          <a-switch
            :checked="animate.disabled"
            slot="actions"
            size="small"
            @change="val => setAnimate({...animate, disabled: val})"
          />
        </a-list-item>
        <a-list-item>
          {{ messages.animate.effect}}
          <a-select
            :value="animate.name"
            :getPopupContainer="getPopupContainer"
            :dropdown-style="{zIndex: 2001}"
            @change="val => setAnimate({...animate, name: val})"
            class="select-item"
            size="small"
            slot="actions"
          >
            <a-select-option
              :key="index"
              :value="item.name"
              v-for="(item, index) in animates"
            >{{item.alias}}</a-select-option>
          </a-select>
        </a-list-item>
        <a-list-item>
          {{ messages.animate.direction}}
          <a-select
            :value="animate.direction"
            :getPopupContainer="getPopupContainer"
            :dropdown-style="{zIndex: 2001}"
            @change="val => setAnimate({...animate, direction: val})"
            class="select-item"
            size="small"
            slot="actions"
          >
            <a-select-option :key="index" :value="item" v-for="(item, index) in directions">{{item}}</a-select-option>
          </a-select>
        </a-list-item>
      </a-list>
    </setting-item>
    <a-alert
      style="max-width: 240px; margin: -16px 0 8px; word-break: break-all"
      type="warning"
      :message="messages.alert"
    ></a-alert>
    <a-button
      id="copyBtn"
      :data-clipboard-text="copyConfig"
      @click="copyCode"
      style="width: 100%"
      icon="copy"
    >{{messages.copy}}</a-button>
  </div>
</template>
<script>
import SettingItem from './SettingItem'
import { ColorCheckbox, ImgCheckbox } from '@/components/checkbox'
import Clipboard from 'clipboard'
import { mapState, mapMutations } from 'vuex'
import { formatConfig } from '@/utils/formatter'
import { setting } from '@/config/default'
import fastEqual from 'fast-deep-equal'
const ColorCheckboxGroup = ColorCheckbox.Group
const ImgCheckboxGroup = ImgCheckbox.Group
export default {
  name: 'Setting',
  components: {
    ImgCheckboxGroup,
    ImgCheckbox,
    ColorCheckboxGroup,
    ColorCheckbox,
    SettingItem 
  },
  data () {
    return {
      copyConfig: 'Sorry, you have copied nothing O(∩_∩)O~',
      messages: {
        theme: {
          title: '整体风格设置',
          light: '亮色菜单风格',
          dark: '暗色菜单风格',
          night: '深夜模式',
          color: '主题色'
        },
        navigate: {
          title: '导航设置',
          side: '侧边导航',
          head: '顶部导航',
          mix: '混合导航',
          content: {
            title: '内容区域宽度',
            fluid: '流式',
            fixed: '定宽'
          },
          fixedHeader: '固定Header',
          fixedSideBar: '固定侧边栏'
        },
        other: {
          title: '其他设置',
          weekMode: '色弱模式',
          multiPages: '多页签模式',
          hideSetting: '隐藏设置抽屉'
        },
        animate: {
          title: '页面切换动画',
          disable: '禁用动画',
          effect: '动画效果',
          direction: '动画方向'
        },
        alert: '拷贝配置后，直接覆盖文件 src/config/config.js 中的全部内容，然后重启即可。（注意：仅会拷贝与默认配置不同的项）',
        copy: '拷贝配置'
      }
    }
  },
  computed: {
    directions () {
      return this.animates.find(item => item.name == this.animate.name).directions
    },
    ...mapState('setting', [
      'theme',
      'layout',
      'animate',
      'animates',
      'palettes',
      'multiPage',
      'weekMode',
      'fixedHeader',
      'fixedSideBar',
      'hideSetting',
      'pageWidth'
    ])
  },
  watch: {
    'animate.name': function (val) {
      this.setAnimate({
        name: val,
        direction: this.directions[0] 
      })
    }
  },
  methods: {
    getPopupContainer () {
      return this.$el.parentNode
    },
    copyCode () {
      let config = {
      }
      // 提取配置
      let mySetting = this.$store.state.setting
      Object.keys(mySetting).forEach(key => {
        const dftValue = setting[key], myValue = mySetting[key]
        // 只提取与默认配置不同的配置项
        if (dftValue != undefined && !fastEqual(dftValue, myValue)) {
          config[key] = myValue
        }
      })
      this.copyConfig = '// 自定义配置，参考 ./default/setting.config.js，需要自定义的属性在这里配置即可\n'
      this.copyConfig += 'module.exports = '
      this.copyConfig += formatConfig(config)
      let clipboard = new Clipboard('#copyBtn')
      const _this = this
      clipboard.on('success', function () {
        _this.$message.success(`复制成功，覆盖文件 src/config/config.js 然后重启项目即可生效`)
        clipboard.destroy()
      })
    },
    ...mapMutations('setting', [
      'setTheme',
      'setLayout',
      'setMultiPage',
      'setWeekMode',
      'setFixedSideBar',
      'setFixedHeader',
      'setAnimate',
      'setHideSetting',
      'setPageWidth'
    ])
  }
}
</script>
<style lang="less" scoped>
.side-setting {
  min-height: 100%;
  background-color: @base-bg-color;
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  position: relative;
  .flex {
    display: flex;
  }
  .select-item {
    width: 80px;
  }
}
</style>
