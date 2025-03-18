import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useObjectStore = defineStore('objectStore', () => {
  const objects = ref([])
  const loading = ref(false)
  const error = ref(null)

  // 🔥 Fonction pour récupérer les objets en envoyant automatiquement le cookie
  const fetchObjects = async () => {
    loading.value = true
    try {
      const response = await fetch('http://localhost:3000/api/object', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // ✅ Envoie automatiquement le cookie
      })

      if (!response.ok) throw new Error('Erreur lors de la récupération des objets')

      objects.value = await response.json()
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
