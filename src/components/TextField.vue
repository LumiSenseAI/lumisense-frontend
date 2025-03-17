<template>
  <div class="text-field">
    <label :for="id">{{ label }}</label>
    <input :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    type: {
      type: String,
      default: "text"
    },
    modelValue: String
  }
}
</script>

<style scoped>
.text-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
