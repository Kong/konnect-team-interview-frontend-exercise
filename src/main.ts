import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/styles/variables.css'
import VueQueryClientPlugin from './lib/DataQuery/VueQueryClientPlugin'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryClientPlugin)
app.mount('#app')
