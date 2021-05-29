import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Antd from 'ant-design-vue';

import resource from '../vue_resource'
Vue.prototype.$https = resource

import 'ant-design-vue/dist/antd.css';
import './utils/iconfont.css'
Vue.config.productionTip = false;

Vue.use(Antd);
router.afterEach(() => {
    window.scrollTo(0, 0);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
