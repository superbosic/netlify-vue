import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarUserOptions from '@/quasar-user-options';
import App from '@/App.vue';
import router from '@/router';

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .mount('#app');
