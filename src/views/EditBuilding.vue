<template>
    <div class="edit-building-form">
      <h1>Edit Building "{{ localStorageName }}"</h1>
  
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="buildingName">New Building Name:</label>
          <input type="text" id="buildingName" v-model="buildingName" required>
        </div>
  
        <div class="form-group">
          <button type="submit">Confirm</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buildingName: '',
        //buildingName: localStorage.getItem("bName"),
        //buildingID: localStorage.getItem("bID"),
      };
    },
    computed: {
    localStorageName() {
      return localStorage.getItem("bName");
    },
    localStorageBuildingID() {
      return localStorage.getItem("bID");
    },
    },
    methods: {
        
      submit() {
        const companyId = localStorage.getItem('companyID');
        const buildID = localStorage.getItem('bID');
        fetch('http://localhost:5063/api/CRUD/PutBuilding', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            buildingId: buildID,
            name: this.buildingName,
            companyId: companyId,
          }),
        })
        .then((data) => {
            // Handle success response here
            this.$router.push('/companies')
          })
      },
    },
    created() {
      // Example: fetchBuildingData();
    },
  };
  </script>
  
  <style>
  .edit-building-form {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type='text'] {
    width: 60%;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button[type='submit'] {
    background-color: green;
    color: white;
    border: none;
    border-radius: 20px;
    width: 30%;
    height: 60px;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
  
  button[type='submit']:hover {
    transform: scale(1.1);
  }
  </style>
  