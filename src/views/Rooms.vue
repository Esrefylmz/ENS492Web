<template>
  <div>
    <h2>{{ buildingName }}'s Rooms</h2>

    <div v-if="isAdmin">
      <div class="add-building">
        <router-link to="/addroom">

          <button class="add-building-button">Add A New Room</button>
        </router-link> 
        
        
      </div>
    </div>

    <div v-if="localStorageMail">
      <button  class="logout-button" @click="logout">Logout</button>
    </div>
    <ul>
      <li v-for="(room) in rooms" :key="room.name" class="building">
        <div class="building-info">
          <div class="device-name">{{ room.name }}</div>
          
          
          <div class="building-buttons">

            <div v-if="isAdmin">
              <button class="edit-button" @click="editRoom()">Edit</button>
              <button class="delete-button" @click="deleteRoom()">Delete</button>
            </div>


          </div>
        </div>
      </li>
    </ul>

    <!-- Display building information based on the buildingName -->
  </div>
</template>

<script>
export default {
  name: 'Rooms',
  data() {
    return {
      buildingName: this.$route.params.buildingName,
      rooms: [
        { name: 'Room 1' },
        { name: 'Room 2' },
        { name: 'Room 3' }
      ]
    };
  },
  created() {
    //this.buildingName = this.$route.params.buildingName;
    //this.buildingID = this.$route.params.buildingId;
    this.fetchRooms()
  },
  computed: {
    localStorageMail() {
      return localStorage.getItem("mail");
    },

    isAdmin(){
      if (localStorage.getItem("userType") == "admin"){
        return true;
      }
      else{
        return false;
      }
    },
  },
  methods: {
    fetchRooms() {
      const buildingID = localStorage.getItem("bID");
      console.log("bID local storage eşitttir  ",buildingID)
      //const companyId = localStorage.getItem('companyID');
      fetch(`http://localhost:5063/api/Rooms/GetRoomsByBuildingId?buildingId=${buildingID}`)
        .then(response => response.json())
        .then(data => {
          this.rooms = data
        })
        .catch(error => {
          console.error('Error fetching rooms:', error)
        })
    },
    editRoom() {
      //localStorage.setItem('bID', buildingId)
      //localStorage.setItem('bName', name)
      this.$router.push('/editbuilding')


    },
    deleteRoom() {
    const confirmed = window.confirm("Are you sure you want to delete this building?");
    if (confirmed) {
      fetch(`http://localhost:5063/api/CRUD/DeleteBuilding${buildingID}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //console.log(`Building ${buildingId} was deleted`);
        this.fetchRooms();
      })
      .catch(error => {
        console.error('Error deleting building:', error);
      });
    }
  },


    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  }
};
</script>

<style>
.buildings {
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
.building {
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}
.building-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.building-name {
  font-size: 20px;
  font-weight: bold;
}
.building-buttons {
  display: flex;
}
.edit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  width: 60px;
  height: 40px;
  font-size: 14px;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
}
.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  width: 60px;
  height: 40px;
  font-size: 14px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.logout-button {
  position: absolute;
  top: 120px;
  right: 50px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: red;
  color: white;
  border: none;
  border-radius: 20px;
  width: 100px;
  height: 50px;
  font-size: 24px;
}

.logout-button:hover {
  transform: scale(1.1);
}

.add-building {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.add-building-button {
  background-color: green;
  color: white;
  border: none;
  border-radius: 20px;
  width: 400px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  margin-right: 15px;
  margin-bottom: 15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.add-building-button:hover {
  transform: scale(1.1);
}



</style>

