
import {
  message, 
  notification, 
  Modal,
  Form,
  ConfigProvider,
  Tabs, 
  Alert,
  Button,
  Input,
  Checkbox,
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Badge,
  Tooltip,
  AutoComplete,
  Select,
  List,
  Switch,
  Divider,
  Breadcrumb,
  Icon
} from 'ant-design-vue'

const components = [
  Form,
  ConfigProvider,
  Tabs,
  Alert,
  Button,
  Input,
  Checkbox,
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Badge,
  Tooltip,
  AutoComplete,
  Select,
  List,
  Switch,
  Divider,
  Breadcrumb,
  Icon
]

const Antd = function (Vue) {
  components.forEach(component => {
    Vue.use(component);
  });

  Vue.prototype.$message = message;
  Vue.prototype.$notification = notification;
  Vue.prototype.$info = Modal.info;
  Vue.prototype.$success = Modal.success;
  Vue.prototype.$error = Modal.error;
  Vue.prototype.$warning = Modal.warning;
  Vue.prototype.$confirm = Modal.confirm;
  Vue.prototype.$destroyAll = Modal.destroyAll;
};

export default Antd