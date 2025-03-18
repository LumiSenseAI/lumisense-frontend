<template>
  <div>
    <MyHeader />

    <!-- Toggle switch -->
    <!-- 🔀 Interrupteur pour afficher soit les objets, soit les utilisateurs -->
    <div class="toggle-container">
      <div class="toggle-background">
        <div class="toggle-slider" :class="{ 'slide-right': currentView === 'users' }"></div>
        <button 
          class="toggle-button left" 
          :class="{ active: currentView === 'objects' }"
          @click="currentView = 'objects'"
        >
          Objets
        </button>
        <button 
          class="toggle-button right" 
          :class="{ active: currentView === 'users' }"
          @click="currentView = 'users'"
        >
          Users
        </button>
      </div>
    </div>

    <!-- Affichage conditionnel -->
    <ObjectTable v-if="currentView === 'objects'" />
    <UsersTable v-else />
  </div>
</template>

<script>
import { ref } from "vue";
import ObjectTable from "../components/ObjectTable.vue";
import UsersTable from "../components/UsersTable.vue";
import MyHeader from "../components/MyHeader.vue";

export default {
  components: {
    ObjectTable,
    UsersTable,
    MyHeader,
  },
  setup() {
    const currentView = ref("objects");  // ✅ Vue par défaut : objets

    return { currentView };
  },
};
</script>

<style scoped>
.toggle-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}


.toggle-background {
  position: relative;
  width: 450px;
  height: 50px;
  background: #66bfbf;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}


.toggle-slider {
  position: absolute;
  width: 50%;
  height: 100%;
  background: #a4fcff;
  border-radius: 25px;
  transition: transform 0.3s ease-in-out;
}
.slide-right {
  transform: translateX(100%);
}

.toggle-button {
  width: 50%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s ease;
}

.toggle-button.active {
  color: black;
}

.toggle-button:not(.active) {
  color: white;
}
</style>
