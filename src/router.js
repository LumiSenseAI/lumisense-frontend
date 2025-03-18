import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import AdminPanel from './pages/AdminPanel.vue'
import { useAuthStore } from './store/authStore'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/admin', component: AdminPanel, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Vérifier si le cookie `token` existe
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

// 🔐 Vérifie l'authentification avant d'accéder aux routes protégées
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const token = getCookie('token') // ✅ Vérifie directement le cookie

  if (to.meta.requiresAuth && !token) {
    next('/login') // ❌ Redirection vers login si pas de cookie
  } else {
    next() // ✅ Continue normalement
  }
})

export default router
