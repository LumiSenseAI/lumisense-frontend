<template>
  <div>
    <h3>Liste des Objets</h3>
    <ButtonAddObject/>
    <table v-if="objects.length" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Type</th>
          <th>État</th>
          <th>Utilisateur</th>
          <th>Actions</th> <!-- ✅ Colonne pour la suppression et modification -->
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
            <!-- ✅ Bouton Modifier -->
            <button @click="openEditModal(object)" class="edit-btn">
              ✏️ Modifier
            </button>
            <!-- ✅ Bouton Supprimer -->
            <button @click="deleteObject(object._id)" class="delete-btn">
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun objet trouvé.</p>

    <!-- ✅ Modale d'édition -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Modifier l'objet</h3>
        <label>Nom :</label>
        <input v-model="editObject.nom" type="text" />

        <div class="modal-buttons">
          <button @click="updateObject">Modifier</button>
          <button @click="showModal = false" class="cancel-btn">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useObjectStore } from '../store/objectStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import ButtonAddObject from './ButtonAddObject.vue'

export default {
  components: {
    ButtonAddObject
  },
  setup() {
    const objectStore = useObjectStore()
    const { objects } = storeToRefs(objectStore)
    
    const showModal = ref(false) // ✅ Pour afficher/cacher la popup
    const editObject = ref({ _id: '', nom: '' }) // ✅ Stocke l'objet à modifier

    onMounted(() => {
      objectStore.fetchObjects()
    })
    function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

    const openEditModal = (object) => {
      editObject.value = { ...object } // ✅ Remplit la modale avec l'objet sélectionné
      showModal.value = true
    }

    const updateObject = async () => {
      const token = getCookie('token')
      try {
        const response = await fetch(`http://localhost:3000/api/object/${editObject.value._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          credentials: 'include',
          body: JSON.stringify({ nom: editObject.value.nom }) // ✅ Met à jour le nom
        })

        if (!response.ok) throw new Error('Erreur lors de la mise à jour')

        console.log(`✅ Objet mis à jour : ${editObject.value._id}`)
        showModal.value = false
        objectStore.fetchObjects() // 🔄 Rafraîchit la liste des objets
      } catch (error) {
        console.error('❌ Erreur lors de la mise à jour :', error)
      }
    }

    const deleteObject = async (id) => {
      const token = getCookie('token')
      if (!confirm('Voulez-vous vraiment supprimer cet objet ?')) return

      try {
        const response = await fetch(`http://localhost:3000/api/object/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          credentials: 'include'
        })

        if (!response.ok) throw new Error('Échec de la suppression')

        console.log(`✅ Objet supprimé : ${id}`)
        objectStore.fetchObjects() // 🔄 Rafraîchit la liste des objets
      } catch (error) {
        console.error('❌ Erreur lors de la suppression :', error)
      }
    }

    return { objects, deleteObject, openEditModal, updateObject, showModal, editObject }
  }
}
</script>

<style scoped>
/* ✅ Styles de la table */
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

/* ✅ Boutons */
.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}
.delete-btn:hover {
  background-color: darkred;
}

.edit-btn {
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.edit-btn:hover {
  background-color: darkblue;
}

/* ✅ Modale */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

.modal input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.cancel-btn {
  background: gray;
}
</style>
