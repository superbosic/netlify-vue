import { createApp } from 'vue';
import { Quasar } from 'quasar';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import stockInit from 'highcharts/modules/stock';
import quasarUserOptions from '@/quasar-user-options';
import App from '@/App.vue';
import router from '@/router';
import { init } from '@/api';
import { createHttpErrorHook, noneAuthorizeHook } from '@/api/hooks';
import '@/styles/index.sass';

stockInit(Highcharts);

init({
  retry: 1,
  timeout: 60000,
  hooks: {
    afterResponse: [
      noneAuthorizeHook,
      createHttpErrorHook,
    ],
  },
});

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(HighchartsVue as any)
  .use(router)
  .mount('#app');
