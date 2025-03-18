<template>
    <div>
      <!-- ✅ Bouton pour ouvrir la popup -->
      <button @click="showModal = true" class="add-btn">
        ➕ Ajouter un Objet
      </button>
  
      <!-- ✅ Popup pour ajouter un nouvel objet -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h3>Ajouter un Objet</h3>
  
          <label>Nom :</label>
          <input v-model="newObject.nom" type="text" placeholder="Nom de l'objet" />
  
          <label>Type :</label>
          <input v-model="newObject.type" type="text" placeholder="Type d'objet" />
  
          <label>État :</label>
          <select v-model="newObject.state">
            <option value="true">Activé</option>
            <option value="false">Désactivé</option>
          </select>
  
          <label>ID Utilisateur :</label>
          <input v-model="newObject.idUser" type="text" placeholder="ID de l'utilisateur" />
  
          <div class="modal-buttons">
            <button @click="createObject">Créer</button>
            <button @click="showModal = false" class="cancel-btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useObjectStore } from '../store/objectStore'
  import { ref } from 'vue'
  
  export default {
    setup() {
        function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}
      const objectStore = useObjectStore()
      const showModal = ref(false) // ✅ Contrôle l'affichage de la popup
      const token = getCookie('token')
      // ✅ Pré-remplissage des champs
      const newObject = ref({
        nom: 'test5',
        type: 'lampe5',
        state: 'false', // ✅ Sélectionne par défaut "Désactivé"
        idUser: '67d806ddea3af74209d318e9'
      })
  
      const createObject = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/object', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            credentials: 'include', // ✅ Envoie le cookie d'authentification automatiquement
            body: JSON.stringify({
              nom: newObject.value.nom,
              type: newObject.value.type,
              state: newObject.value.state, // ✅ "true" ou "false"
              idUser: newObject.value.idUser
            })
          })
  
          if (!response.ok) throw new Error('Erreur lors de la création')
  
          console.log("✅ Objet ajouté :", await response.json())
  
          // ✅ Réinitialisation après création
          newObject.value = {
            nom: '',
            type: '',
            state: 'false',
            idUser: ''
          }
  
          showModal.value = false
          objectStore.fetchObjects()
          
        } catch (error) {
          console.error("❌ Erreur lors de l'ajout :", error)
        }
      }
  
      return { showModal, newObject, createObject }
    }
  }
  </script>
  
  <style scoped>
  /* ✅ Bouton Ajouter */
  .add-btn {
    background-color: green;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .add-btn:hover {
    background-color: darkgreen;
  }
  
  /* ✅ Popup (modale) */
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
  
  .modal input, .modal select {
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
  