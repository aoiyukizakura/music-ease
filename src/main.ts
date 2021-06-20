import { createApp } from 'vue'
import router from '/@/router/index'
import App from './App.vue'

import "tailwindcss/tailwind.css"
import '/@style/global.css'

const app = createApp(App);

app.use(router).mount('#app')
