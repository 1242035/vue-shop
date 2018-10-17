import Vue from 'vue';
import VueI18n from 'vue-i18n';

import messages from './lang';

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: 'vi', // set locale
    messages, // set locale messages
});