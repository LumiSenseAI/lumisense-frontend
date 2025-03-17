<template>
  <button @click="$emit('click')" class="submit-btn">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Envoyer"
    }
  }
}
</script>

<style scoped>
.submit-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #369970;
}
</style>
