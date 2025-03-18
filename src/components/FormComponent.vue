<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="submitForm">
      <TextField id="email" label="Email" type="email" v-model="email" />
      <TextField id="password" label="Mot de passe" type="password" v-model="password" />
      <SubmitButton label="Se connecter" />
    </form>
    <p v-if="error" class="error">{{ error }}</p> <!-- 🔥 Affichage des erreurs -->
  </div>
</template>

<script>
import TextField from './TextField.vue'
import SubmitButton from './SubmitButton.vue'
import { useAuthStore } from '../store/authStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default {
  components: {
    TextField,
    SubmitButton
  },
  setup() {
    const authStore = useAuthStore()
    const { error } = storeToRefs(authStore)

    const email = ref('')
    const password = ref('')

    const submitForm = async () => {
      console.log("Tentative de connexion...") // 🔍 Vérifier si la fonction est appelée
      console.log("Email:", email.value, "Mot de passe:", password.value)

      try {
        await authStore.login(email.value, password.value)
        console.log("Connexion réussie") // 🔥 Vérifier si la connexion est réussie
      } catch (err) {
        console.error("Erreur de connexion:", err)
      }
    }

    return { email, password, submitForm, error }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}
h2 {
  text-align: center;
  color: #333;
}
form {
  display: flex;
  flex-direction: column;
}
.error {
  color: red;
  text-align: center;
}
</style>
