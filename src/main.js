import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Vérifie si Vue Router est bien importé (si utilisé)

const app = createApp(App)

app.use(router) // Active le router si tu l’utilises
app.mount('#app') // Monte l'application sur l'élément #app
