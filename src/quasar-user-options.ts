import { Notify, Dialog, LocalStorage } from 'quasar';
import 'quasar/src/css/index.sass';
import lang from 'quasar/lang/ru';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

export default {
  config: {},
  plugins: {
    Notify,
    Dialog,
    LocalStorage,
  },
  lang,
};
