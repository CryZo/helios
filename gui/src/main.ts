import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import i18n from './i18n'

import '@/assets/styles/index.scss';

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

import { MQTTConnection } from "connector/connection";
import { RestParser } from "connector/";

window.backendConnection = new MQTTConnection('ws://10.0.3.11:9001');
let rp = new RestParser(window.backendConnection);
setInterval(() => {
    window.rooms = rp.ParseModel(window.backendConnection.data);
}, 500);

createApp(App).use(i18n)
    .use(router)
    .use(i18n)
    .use(mdiVue, {icons: mdijs})
    .mount('#app');
