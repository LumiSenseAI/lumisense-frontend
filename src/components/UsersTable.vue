<template>
  <div class="table-container">
    <div class="table-out">
      <h3>Liste des Utilisateurs</h3>
      <ButtonAddUser />
    </div>
    <table v-if="users.length" class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Nom d'utilisateur</th>
          <th>Rôle</th>
          <th>Date de création</th>
          <th>Actions</th>
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
            <button @click="deleteUser(user._id)" class="delete-btn">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun utilisateur trouvé.</p>
  </div>
</template>

<script>
import { useUserStore } from "../store/usersStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import ButtonAddUser from "./ButtonAddUser.vue";

export default {
  components: {
    ButtonAddUser,
  },
  setup() {
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);

    onMounted(() => {
      userStore.fetchUsers();
    });

    function getCookie(name) {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    }

    const deleteUser = async (id) => {
      if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
      const token = getCookie("token");
      try {
        const response = await fetch(`http://localhost:3000/api/user/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Échec de la suppression");

        userStore.fetchUsers();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    };

    return { users, deleteUser };
  },
};
</script>

<style scoped>
.table-out {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  display: flex; 
  width: 60%;
  justify-content: space-between;
}

.table-container {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
  background-color: #2d2d2d;
  border-radius: 10px;
  width: 100%;
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  max-width: 90%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 3px solid #66bfbf;
}

.custom-table th,
.custom-table td {
  padding: 1vw;
  text-align: left;
  font-size: 1rem;
  border-bottom: 1px solid black;
}

.custom-table th {
  background: #66bfbf;
  color: black;
  border-bottom: 2px solid black;
}

.custom-table tr:hover {
  background: #e0ffff;
}

.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 0.5vw 1vw;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
}

.delete-btn:hover {
  background-color: darkred;
}

@media screen and (max-width: 768px) {
  .custom-table {
    font-size: 0.8rem;
  }

  .custom-table th,
  .custom-table td {
    padding: 1vw;
  }

  .delete-btn {
    font-size: 0.8rem;
    padding: 0.3vw 0.6vw;
  }
}
</style>
