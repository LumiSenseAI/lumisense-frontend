import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue' // Vérifie que ce fichier existe

const routes = [
  { path: '/', redirect: '/login' }, // 🔥 Redirige `/` vers `/login`
  { path: '/login', component: Login } // Page de connexion
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
