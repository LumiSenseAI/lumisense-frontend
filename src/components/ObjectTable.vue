<template>
  <div class="table-container">
    <h3 class="table-out">Liste des Objets</h3>
    <table v-if="objects.length" class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Type</th>
          <th>État</th>
          <th>Utilisateur</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="object in objects" :key="object._id">
          <td>{{ object._id }}</td>
          <td>{{ object.nom }}</td>
          <td>{{ object.type }}</td>
          <td>{{ object.state ? "Activé" : "Désactivé" }}</td>
          <td>{{ object.idUser ? object.idUser.username : "Aucun" }}</td>
          <td>
            <button @click="deleteObject(object._id)" class="delete-btn">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun objet trouvé.</p>
  </div>
</template>

<script>
import { useObjectStore } from "../store/objectStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const objectStore = useObjectStore();
    const { objects } = storeToRefs(objectStore);

    const token = ref(null);

    function getCookie(name) {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    }

    onMounted(() => {
      token.value = getCookie("token");
      objectStore.fetchObjects();
    });

    const deleteObject = async (id) => {
      if (!confirm("Voulez-vous vraiment supprimer cet objet ?")) return;

      try {
        const response = await fetch(`http://localhost:3000/api/object/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Échec de la suppression");
        objectStore.fetchObjects();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    };

    return { objects, deleteObject, token };
  },
};
</script>

<style scoped>
.table-out {
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  text-align: center;
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
  border: 3px solid #75CACC;
}

.custom-table th, .custom-table td {
  padding: 1vw;
  text-align: left;
  font-size: 1rem;
  border-bottom: 1px solid #303030;
}

.custom-table th {
  background: #75CACC;
  color: #303030;
  border-bottom: 2px solid #303030;
}

.custom-table tr:hover {
  background: #FFF;
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

  .custom-table th, .custom-table td {
    padding: 1vw;
  }

  .delete-btn {
    font-size: 0.8rem;
    padding: 0.3vw 0.6vw;
  }
}
</style>