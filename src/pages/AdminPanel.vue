<template>
  <div>
    <h1>Panneau Admin</h1>

    <!-- 🔀 Interrupteur pour afficher soit les objets, soit les utilisateurs -->
    <div class="toggle-container">
      <button 
        :class="{ active: currentView === 'objects' }"
        @click="currentView = 'objects'">
        📦 Objets
      </button>
      <button 
        :class="{ active: currentView === 'users' }"
        @click="currentView = 'users'">
        👥 Utilisateurs
      </button>
    </div>

    <!-- 🔀 Affichage conditionnel -->
    <ObjectTable v-if="currentView === 'objects'" />
    <UsersTable v-else />

  </div>
</template>

<script>
import { ref } from 'vue'
import ObjectTable from '../components/ObjectTable.vue'
import UsersTable from '../components/UsersTable.vue'

export default {
  components: {
    ObjectTable,
    UsersTable
  },
  setup() {
    const currentView = ref('objects') // ✅ Vue par défaut : objets

    return { currentView }
  }
}
</script>

<style scoped>
/* ✅ Style du bouton pour le toggle */
.toggle-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background 0.3s;
}

button.active {
  background-color: #42b983;
  color: white;
}

button:hover {
  background-color: #35976a;
}
</style>
