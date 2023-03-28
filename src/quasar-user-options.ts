import { Notify, Dialog, Cookies } from 'quasar';
// import './styles/quasar.scss';
import lang from 'quasar/lang/ru';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

export default {
  config: {},
  plugins: {
    Notify,
    Dialog,
    Cookies,
  },
  lang,
};
