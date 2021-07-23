import { createApp } from 'vue'
import router from '/@/router/index'
import App from './App.vue'
import { store, key } from '/@/store/index'
import SvgIcon from '/@cp/svg-icon.vue'
import vImg from './directives/v-img'

import "tailwindcss/tailwind.css"
import '/@style/global.css'
import '/@style/transition.css'

const app = createApp(App);

app.use(store, key)
  .use(router)
  .directive('img', vImg)
  .component('svg-icon', SvgIcon)
  .mount('#app');
