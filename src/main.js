import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) // 🔥 Ajout de Pinia
app.use(router)
app.mount('#app')
