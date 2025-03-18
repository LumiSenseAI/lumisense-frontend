<template>
  <div>
    <!-- ✅ Bouton pour ouvrir la popup -->
    <button @click="showModal = true" class="add-btn">
      Ajouter un Utilisateur
    </button>

    <!-- ✅ Popup pour ajouter un utilisateur -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Ajouter un Utilisateur</h3>

        <label>Nom d'utilisateur :</label>
        <input
          v-model="newUser.username"
          type="text"
          placeholder="Nom d'utilisateur"
        />

        <label>Email :</label>
        <input
          v-model="newUser.email"
          type="email"
          placeholder="Email de l'utilisateur"
        />

        <label>Mot de passe :</label>
        <input
          v-model="newUser.password"
          type="password"
          placeholder="Mot de passe"
        />

        <label>Rôle :</label>
        <select v-model="newUser.role">
          <option value="admin">Admin</option>
          <option value="user">Utilisateur</option>
        </select>

        <div class="modal-buttons">
          <button @click="createUser" class="login-btn">Créer</button>
          <button @click="showModal = false" class="cancel-btn">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../store/usersStore";
import { ref } from "vue";

export default {
  setup() {
    function getCookie(name) {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    }

    const UserStore = useUserStore();
    const showModal = ref(false); // ✅ Contrôle l'affichage de la popup
    const token = getCookie("token");

    // ✅ Pré-remplissage des champs
    const newUser = ref({
      username: "",
      email: "",
      password: "",
      role: "user", // ✅ "admin" ou "user"
    });

    const createUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
          body: JSON.stringify(newUser.value),
        });

        if (!response.ok) throw new Error("Erreur lors de la création");

        console.log("✅ Utilisateur ajouté :", await response.json());

        // ✅ Réinitialisation après création
        newUser.value = {
          username: "",
          email: "",
          password: "",
          role: "user",
        };

        showModal.value = false;
        UserStore.fetchUsers();
      } catch (error) {
        console.error("❌ Erreur lors de l'ajout :", error);
      }
    };

    return { showModal, newUser, createUser };
  },
};
</script>

<style scoped>

body {
  background-color: #303030; 
}

.add-btn {
  background-color: #92FDFF;
  color: #303030;
  border: 2px solid #92FDFF;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 15px;
  transition: 0.3s;
}
.add-btn:hover {
  background-color: #303030;
  color: #92FDFF;
  border: 2px solid #92FDFF;
}


.modal-overlay {
  position: fixed;
  z-index: 2;
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
  background: #303030;
  padding: 20px;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  border: 2px solid #92FDFF;
}

.modal input,
.modal select {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #92FDFF;
  border-radius: 25px;
  background: transparent;
  color: white;
  outline: none;
  text-align: center;
  font-size: 16px;
  appearance: none; 
  cursor: pointer;
}

.modal select option {
  background: black; 
  color: #92FDFF; 
}


.modal select {
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23ffffff' d='M2 0L0 2h4zM2 5l2-2H0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  padding-right: 30px;
}

.modal label {
  color: white;
  font-weight: bold;
  display: block;
  margin-top: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.login-btn {
  background: #92FDFF;
  color: #303030;
  padding: 10px 20px;
  border: 2px solid #92FDFF;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
}

.login-btn:hover {
  background: #303030;
  color: #92FDFF;
  border: 2px solid #92FDFF;
}

.cancel-btn {
  background: red;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  border: 2px solid red;
  transition: 0.3s;
  font-size: 16px;
}

.cancel-btn:hover {
  background: #303030;
  color: red;
  border: 2px solid red;
}
</style>
