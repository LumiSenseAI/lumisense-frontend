import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

// 🔥 Fonction pour récupérer le token depuis les cookies (Uniquement si `HttpOnly` est désactivé)
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

export const useUserStore = defineStore('userStore', () => {
  const users = ref([]) // ✅ Renommé pour correspondre à "users"
  const loading = ref(false)
  const error = ref(null)

  // 🔥 Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    loading.value = true
    try {
      // ✅ Vérifie si le token est accessible (mais il est normalement envoyé via le cookie)
      const token = getCookie('token')
      console.log("🔐 Token récupéré :", token)

      const response = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          // ✅ Pas besoin d'`Authorization` si le token est en `HttpOnly`
        },
        credentials: 'include' // ✅ Envoie automatiquement le cookie
      })

      if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs')

      users.value = await response.json()
      console.log("✅ Utilisateurs récupérés :", users.value)

    } catch (err) {
      console.error("❌ Erreur fetchUsers :", err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchUsers()
  })

  return { users, loading, error, fetchUsers }
})
