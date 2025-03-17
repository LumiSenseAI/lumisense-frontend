<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="submitForm">
      <TextField id="email" label="Email" type="email" v-model="email" />
      <TextField id="password" label="Mot de passe" type="password" v-model="password" />
      <SubmitButton label="Se connecter" />
    </form>
  </div>
</template>

<script>
import TextField from '../components/TextField.vue'
import SubmitButton from '../components/SubmitButton.vue'

export default {
  components: {
    TextField,
    SubmitButton
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      alert(`Email: ${this.email}, Mot de passe: ${this.password}`);
    }
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
</style>
