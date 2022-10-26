import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.use(FloatingVue)

app.mount('#app')
