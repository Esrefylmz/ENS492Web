<template>
  <div class="buildings">
    <h1>Buildings</h1>

    <div v-if="isAdmin">
      <div class="add-building">
        <router-link to="/addbuilding">

          <button class="add-building-button">Add A New Building</button>
        </router-link> 
        
        
      </div>
    </div>

    <div v-if="localStorageMail">
      <button  class="logout-button" @click="logout">Logout</button>
    </div>
    <ul>
      <li v-for="(building) in buildings" :key="building.name" class="building">
        <div class="building-info">
          
          <router-link :to="'/buildings/' + building.name">
            <span @click="goRoom(building)">{{ building.name }}</span>
          </router-link>


          <!--<router-link :to="'/buildings/' + building.name"  >{{ building.name }}</router-link>-->
          <!--
          <router-link :to="{ name: 'building', params: { buildingName: building.name, buildingId: building.buildingId } }">
            {{ building.name }}
          </router-link>
          -->

          
          <div class="building-buttons">

            <div v-if="isAdmin">
              <button class="edit-button" @click="editBuilding(building.buildingId, building.name)">Edit</button>
              <button class="delete-button" @click="deleteBuilding(building.buildingId)">Delete</button>
            </div>


          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Buildings',
  data() {
    return {
      buildings: [
        { name: 'Building 1' },
        { name: 'Building 2' },
        { name: 'Building 3' }
      ]
    }
  },
  created() {
    // Call API to fetch buildings here
    
    if (localStorage.getItem('mail') == null){
      this.$router.push('/');
    }
    else{
      //console.log("mail var")
    }
    this.fetchBuildings()
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
    fetchBuildings() {
      console.log(localStorage.getItem("userType"))
      console.log(localStorage.getItem("companyID"))
      // Replace the API call with your own implementation to fetch buildings
      // Example implementation using fetch() API:
      const companyId = localStorage.getItem('companyID');
      fetch(`http://uskumru.sabanciuniv.edu:5063/api/CRUD/GetBuildingByCompanyId?Id=${companyId}`)
      //fetch('http://localhost:5063/api/CompanyContoller')
        .then(response => response.json())
        .then(data => {
          this.buildings = data
        })
        .catch(error => {
          console.error('Error fetching buildings:', error)
        })
    },
    goRoom(building) {
      localStorage.setItem('bID', building.buildingId);
    },
    editBuilding(buildingId, name) {
      localStorage.setItem('bID', buildingId)
      localStorage.setItem('bName', name)
      this.$router.push('/editbuilding')


    },
    deleteBuilding(buildingId) {
    const confirmed = window.confirm("Are you sure you want to delete this building?");
    if (confirmed) {
      fetch(`http://uskumru.sabanciuniv.edu:5063/api/CRUD/DeleteBuilding${buildingId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(`Building ${buildingId} was deleted`);
        this.fetchBuildings();
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
}
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
