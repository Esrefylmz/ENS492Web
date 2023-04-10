<template>
    <div class="devices">
      <h1>Devices</h1>
      <div v-if="localStorageMail">
        <button  class="logout-button" @click="logout">Logout</button>
      </div>
      <ul>
        <li v-for="(device, index) in devices" :key="index" class="device">
          <div class="device-info">
            <div class="building-room">
              <div class="building-name">{{ device.buildingName }}</div>
              <div class="room-name">{{ device.roomName }}</div>
            </div>
            <div class="location-info">{{ device.locationInfo }}</div>
            <div class="device-buttons">
              <button class="edit-button" @click="editDevice(index)">Edit</button>
              <button class="delete-button" @click="deleteDevice(index)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        devices: []
      }
    },
    created() {
      
      if (localStorage.getItem('mail') == null){
        this.$router.push('/');
      }
      else{
        //console.log("mail var")
      }
      this.fetchDevices()
    },
    computed: {
      localStorageMail() {
        return localStorage.getItem("mail");
      },
    },
    methods: {
      fetchDevices() {
        const companyId = localStorage.getItem('companyID');  
        
        fetch(`http://localhost:5063/api/CompanySensors/GetCompanySensorById?Id=${companyId}`)
          .then(response => response.json())
          .then(data => {
            this.devices = data
          })
          .catch(error => {
            console.error('Error fetching devices:', error)
          })
      },
      editDevice(index) {
        console.log(`Editing devices ${index}`)
      },
      deleteDevice(index) {
        console.log(`Deleting devices ${index}`)
      },
      logout() {
        localStorage.removeItem("mail");
        this.$router.push("/");
      },
    }
  }
  </script>
  
  <style>
  .devices {
    padding: 20px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
  }
  .device {
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 10px;
  }
  .device-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .device-name {
    font-size: 20px;
    font-weight: bold;
  }
  .building-room {
  display: flex;
  align-items: center;
  font-size: 24px;
}
.building-name {
  font-weight: bold;
  margin-right: 10px;
}
.room-name {
  font-style: italic;
}
.location-info {
  font-size: 16px;
  margin-top: 5px;
}
.device-buttons {
  display: flex;
}
.edit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
}
.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}


  </style>
  