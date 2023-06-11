<template>
    <div class="add-building-form">
      <h1>Add Admin</h1>
  
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="buildingName">Admin Usermail:</label>
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
      };
    },
    methods: {
      submit() {
        const companyId = localStorage.getItem('companyID');
        if (!companyId) {
          console.error('Company ID not found in local storage');
          return;
        }
        fetch('http://uskumru.sabanciuniv.edu:5063/api/CRUD/PostBuilding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.buildingName,
            companyId: companyId,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error submitting form data');
            }
            return response.json();
          })
          .then((data) => {
            // Handle success response here
            this.$router.push('/buildings')
          })
          .catch((error) => {
            console.error('Error submitting form data:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  .add-building-form {
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
  