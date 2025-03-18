import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(getCookie('token') || null)
  const error = ref(null)
  const router = useRouter()

  // ✅ Fonction pour récupérer un cookie
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? match[2] : null
  }

  // ✅ Fonction pour définir un cookie valide 1h
  function setCookie(name, value, hours = 1) {
    const expires = new Date()
    expires.setTime(expires.getTime() + hours * 60 * 60 * 1000) // 🔥 Expiration 1h
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=Lax`
  }

  // ✅ Fonction pour supprimer un cookie
  function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
  }

  // 🔐 Connexion
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        credentials: 'include', // ✅ Obligatoire pour gérer le cookie côté serveur
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) throw new Error('Identifiants incorrects')

      // ✅ Stocke le token uniquement en cookie
      token.value = true
      setCookie('token', 'authenticated', 1) // 🔥 Cookie qui expire en 1h

      router.push('/admin')
    } catch (err) {
      error.value = err.message
    }
  }

  // 🔐 Déconnexion
  const logout = () => {
    token.value = null
    deleteCookie('token')
    router.push('/login') // 🔥 Redirection vers login
  }

  return { token, error, login, logout }
})
