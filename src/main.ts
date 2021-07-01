import { createApp } from 'vue'
import router from '/@/router/index'
import App from './App.vue'
import { store, key } from '/@/store/index'
import SvgIcon from '/@cp/svg-icon.vue'

import "tailwindcss/tailwind.css"
import '/@style/global.css'

const app = createApp(App);

app.use(store, key)
  .use(router)
  .component('svg-icon', SvgIcon)
  .mount('#app');
