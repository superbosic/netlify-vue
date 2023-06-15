import { Notify, Dialog, LocalStorage } from 'quasar';
import 'quasar/src/css/index.sass';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';

// console.log(iconSet);
export default {
  config: {},
  // iconSet,
  plugins: {
    Notify,
    Dialog,
    LocalStorage,
  },
};
