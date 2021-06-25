import { createApp } from 'vue'
import router from '/@/router/index'
import App from './App.vue'
import SvgIcon from '/@cp/svg-icon.vue'

import "tailwindcss/tailwind.css"
import '/@style/global.css'

const app = createApp(App);

app.use(router).component('svg-icon', SvgIcon).mount('#app');
