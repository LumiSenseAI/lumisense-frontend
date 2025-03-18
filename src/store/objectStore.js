import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useObjectStore = defineStore('objectStore', () => {
  const objects = ref([])
  const loading = ref(false)
  const error = ref(null)

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? match[2] : null
  }
  // 🔥 Fonction pour récupérer les objets en envoyant automatiquement le cookie
  const fetchObjects = async () => {
    const token = getCookie('token') 
    console.log(token.value)
    loading.value = true
    try {
      const response = await fetch('http://localhost:3000/api/object', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}) // ✅ Ajoute le token si dispo
        },
        credentials: 'include' // ✅ Envoie automatiquement le cookie
      })
      if (!response.ok) throw new Error('Erreur lors de la récupération des objets')

      objects.value = await response.json()
      console.log(objects.value)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchObjects()
  })

  return { objects, loading, error, fetchObjects }
})
