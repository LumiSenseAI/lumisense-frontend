<template>
    <div>
      <h3>Liste des Utilisateurs</h3>
      <table v-if="users.length" class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nom d'utilisateur</th>
            <th>Rôle</th>
            <th>Date de création</th>
            <th>Actions</th> <!-- ✅ Colonne pour la suppression -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user._id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>{{ new Date(user.createdAt).toLocaleString() }}</td>
            <td>
              <!-- ✅ Bouton de suppression -->
              <button @click="deleteUser(user._id)" class="delete-btn">
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Aucun utilisateur trouvé.</p>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '../store/usersStore'
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'
  
  export default {
    setup() {
      const userStore = useUserStore()
      const { users } = storeToRefs(userStore)
  
      onMounted(() => {
        console.log("🔄 Chargement des utilisateurs...")
        userStore.fetchUsers()
      })
  
      const deleteUser = async (id) => {
        if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return
  
        try {
          const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include' // ✅ Envoie automatiquement le cookie
          })
  
          if (!response.ok) throw new Error('Échec de la suppression')
  
          console.log(`✅ Utilisateur supprimé : ${id}`)
          userStore.fetchUsers() // 🔄 Rafraîchit la liste des utilisateurs
        } catch (error) {
          console.error('❌ Erreur lors de la suppression :', error)
        }
      }
  
      return { users, deleteUser }
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
  