<template>
  <div>
    <h3>Liste des Objets</h3>
    <table v-if="objects.length" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Type</th>
          <th>État</th>
          <th>Utilisateur</th>
          <th>Actions</th> <!-- ✅ Colonne pour la suppression -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="object in objects" :key="object._id">
          <td>{{ object._id }}</td>
          <td>{{ object.nom }}</td>
          <td>{{ object.type }}</td>
          <td>{{ object.state ? 'Activé' : 'Désactivé' }}</td>
          <td>{{ object.idUser ? object.idUser.username : 'Aucun' }}</td>
          <td>
            <!-- ✅ Bouton de suppression -->
            <button @click="deleteObject(object._id)" class="delete-btn">
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun objet trouvé.</p>
  </div>
</template>

<script>
import { useObjectStore } from '../store/objectStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const objectStore = useObjectStore()
    const { objects } = storeToRefs(objectStore)

    const token = ref(null)

    // 🔐 Récupérer le token depuis les cookies (visible uniquement si `HttpOnly` est désactivé)
    function getCookie(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      return match ? match[2] : null
    }

    onMounted(() => {
      token.value = getCookie('token') // ✅ Récupère le token du cookie
      console.log("🔐 Token récupéré:", token.value)
      objectStore.fetchObjects()
    })

    const deleteObject = async (id) => {
      if (!confirm('Voulez-vous vraiment supprimer cet objet ?')) return

      try {
        const response = await fetch(`http://localhost:3000/api/object/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}` // ✅ Ajoute le token en header
          },
          credentials: 'include' // ✅ Envoie automatiquement le cookie
        })

        if (!response.ok) throw new Error('Échec de la suppression')

        objectStore.fetchObjects()
      } catch (error) {
        console.error('Erreur lors de la suppression :', error)
      }
    }

    return { objects, deleteObject, token }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.table, th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #42b983;
  color: white;
}
.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.delete-btn:hover {
  background-color: darkred;
}
</style>
