<template>
    <div>
      <!-- ✅ Bouton pour ouvrir la popup -->
      <button @click="showModal = true" class="add-btn">
        ➕ Ajouter un Utilisateur
      </button>
  
      <!-- ✅ Popup pour ajouter un utilisateur -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h3>Ajouter un Utilisateur</h3>
  
          <label>Nom d'utilisateur :</label>
          <input v-model="newUser.username" type="text" placeholder="Nom d'utilisateur" />
  
          <label>Email :</label>
          <input v-model="newUser.email" type="email" placeholder="Email de l'utilisateur" />
  
          <label>Mot de passe :</label>
          <input v-model="newUser.password" type="password" placeholder="Mot de passe" />
  
          <label>Rôle :</label>
          <select v-model="newUser.role">
            <option value="admin">Admin</option>
            <option value="user">Utilisateur</option>
          </select>
  
          <div class="modal-buttons">
            <button @click="createUser">Créer</button>
            <button @click="showModal = false" class="cancel-btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '../store/usersStore'
  import { ref } from 'vue'
  
  export default {
    setup() {
      function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
        return match ? match[2] : null
      }
  
      const UserStore = useUserStore()
      const showModal = ref(false) // ✅ Contrôle l'affichage de la popup
      const token = getCookie('token')
  
      // ✅ Pré-remplissage des champs
      const newUser = ref({
        username: '',
        email: '',
        password: '',
        role: 'user' // ✅ "admin" ou "user"
      })
  
      const createUser = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            credentials: 'include', // ✅ Envoie le cookie d'authentification automatiquement
            body: JSON.stringify(newUser.value)
          })
  
          if (!response.ok) throw new Error('Erreur lors de la création')
  
          console.log("✅ Utilisateur ajouté :", await response.json())
  
          // ✅ Réinitialisation après création
          newUser.value = {
            username: '',
            email: '',
            password: '',
            role: 'user'
          }
  
          showModal.value = false
          UserStore.fetchUsers()
        } catch (error) {
          console.error("❌ Erreur lors de l'ajout :", error)
        }
      }
  
      return { showModal, newUser, createUser }
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
  