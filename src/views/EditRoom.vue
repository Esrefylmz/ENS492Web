<template>
    <div class="edit-building-form">
        <h1>Editing Room "{{ roomName }}"</h1>

        <form @submit.prevent="submit">
        <div class="form-group">
            <label for="buildingName">New Room Name:</label>
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
            roomId: this.$route.params.roomId,
            roomName: this.$route.params.roomName,
            buildingName: this.$route.params.buildingName,
            room: {}
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
        //console.log(roomId);
        console.log("companyID", localStorage.getItem('companyID'));
        const companyId = localStorage.getItem('companyID');
        //const buildID = localStorage.getItem('bID');
        fetch('http://localhost:5063/api/Rooms/PutRoom', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId: this.$route.params.roomId,
            name: this.buildingName,
            buildingId: companyId,
          }),
        })
        .then((data) => {
            // Handle success response here
            //localStorage.removeItem("bID");
            this.$router.push('/buildings')
          })
      },
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
  