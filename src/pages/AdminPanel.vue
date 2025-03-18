<template>
    <div>
      <h1>Panneau Admin</h1>
      <ObjectTable />
      <UsersTable/>

    </div>
  </template>
  
  <script>
  import ObjectTable from '../components/ObjectTable.vue'
  import UsersTable  from '../components/UsersTable.vue';
  
  export default {
    components: {
      ObjectTable,
      UsersTable
    }
  }
  </script>
  