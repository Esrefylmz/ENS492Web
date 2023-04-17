<template>
    <div class="add-building-form">
      <h1>Add Room</h1>
  
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="buildingName">Room Name:</label>
          <input type="text" id="roomName" v-model="roomName" required>
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
        roomName: '',
      };
    },
    methods: {
      submit() {
        console.log(localStorage.getItem("bID"))
        const buildID = localStorage.getItem('bID');
        if (!buildID) {
          console.error('buildID not found in local storage');
          return;
        }
        fetch('http://localhost:5063/api/Rooms/PostRoom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.roomName,
            buildingId: buildID,
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
            this.$router.go(-1);
            
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
  