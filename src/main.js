// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { i18n } from './i18n';

import './parse';
import './log';
import Vuelidate from 'vuelidate';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(Vuelidate);
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
});
