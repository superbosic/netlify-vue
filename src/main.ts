import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarUserOptions from '@/quasar-user-options';
import App from '@/App.vue';
import router from '@/router';
import { init } from '@/api';
import { createHttpErrorHook, noneAuthorizeHook } from '@/api/hooks';

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
  .use(router)
  .mount('#app');
