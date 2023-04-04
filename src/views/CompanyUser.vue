<template>
    <div class="position-relative">
      <button class="btn btn-primary position-absolute top-0 start-0" @click="fetchData">Fetch Data</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      async fetchData() {
        try {
          const response = await fetch('http://localhost:5063/api/CompanyUsers');
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
  </script>
  