<template>
  <div class="buildings">
    <h1>Buildings</h1>
    <div v-if="localStorageMail">
      <button  class="logout-button" @click="logout">Logout</button>
    </div>
    <ul>
      <li v-for="(building, index) in buildings" :key="index" class="building">
        <div class="building-info">
          <div class="building-name">{{ building.name }}</div>
          <div class="building-buttons">
            <button class="edit-button" @click="editBuilding(index)">Edit</button>
            <button class="delete-button" @click="deleteBuilding(index)">Delete</button>
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
      buildings: []
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
  },
  methods: {
    fetchBuildings() {
      // Replace the API call with your own implementation to fetch buildings
      // Example implementation using fetch() API:
      fetch('http://localhost:5063/api/CompanyContoller')
        .then(response => response.json())
        .then(data => {
          this.buildings = data
        })
        .catch(error => {
          console.error('Error fetching buildings:', error)
        })
    },
    editBuilding(index) {
      // Implement edit building functionality
      console.log(`Editing building ${index}`)
    },
    deleteBuilding(index) {
      // Implement delete building functionality
      console.log(`Deleting building ${index}`)
    },
    logout() {
      localStorage.removeItem("mail");
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


</style>
