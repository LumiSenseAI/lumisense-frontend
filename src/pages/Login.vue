<template>
    <FormComponent />
  </template>
  
  <script>
  import FormComponent from '../components/FormComponent.vue'
  
  export default {
    components: {
      FormComponent
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
  