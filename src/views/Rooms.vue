<template>
    <div>
      <h2>{{ buildingName }}</h2>
      <!-- Display building information based on the buildingName -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'Building',
    data() {
      return {
        buildingName: this.$route.params.buildingName
      };
    }
  };
  </script>
  