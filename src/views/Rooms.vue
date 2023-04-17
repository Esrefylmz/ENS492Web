<template>
  <div>
    <h2>{{ buildingName }}'s Rooms</h2>

    <div v-if="isAdmin">
      <div class="add-building">
        <router-link to="/addroom">

          <button class="add-building-button" @click=setBuildingID(building.buildingId) >Add A New Room</button>
        </router-link> 
        
        
      </div>
    </div>

    <div v-if="localStorageMail">
      <button  class="logout-button" @click="logout">Logout</button>
    </div>
    <ul>
      <li v-for="(room) in rooms" :key="room.name" class="building">
        <div class="building-info">
          <div class="building-name">{{ room.name }}</div>
          
          
          <div class="building-buttons">

            <div v-if="isAdmin">
              <!--<button class="edit-button" @click="editRoom(room.roomId)">Edit</button>-->

              <button class="edit-button" @click="editRoom(room.roomId, buildingName, room.name)">Edit</button>


              <button class="delete-button" @click="deleteRoom(room.roomId)">Delete</button>
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
      //console.log("bID local storage eşitttir  ",buildingID)
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
    setBuildingID(building) {
      localStorage.setItem('bID', building);
    },
    editRoom(roomId, buildingName, roomName) {
      this.$router.push({ name: 'room', params: { buildingName: buildingName, roomName: roomName, roomId: roomId }});
    },
    deleteRoom(roomID) {
    const confirmed = window.confirm("Are you sure you want to delete this building?");
    if (confirmed) {
      fetch(`http://localhost:5063/api/Rooms/DeleteRoom${roomID}`, {
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
        console.error('Error deleting room:', error);
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
  top: 90px;
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

