<template>
  <div class="devices">
    <h1>Viewers</h1>

    <div v-if="isAdmin">
      <div class="add-building">
        <router-link to="/addadmin">

          <button class="add-building-button">Add Viewer</button>
        </router-link> 
        
        
      </div>
    </div>
    <div v-if="localStorageMail">
      <button  class="logout-button" @click="logout">Logout</button>
    </div>
    <ul>
      <li v-for="(viewer) in viewers" :key="viewer.usermail" class="device">
        <div class="device-info">
          <div class="device-name">{{ viewer.usermail }}</div>
          <div class="device-buttons">
            <div v-if="isAdmin">
              <button class="edit-button" @click="editViewer()">Edit</button>
              <button class="delete-button" @click="deleteViewer()">Delete</button>
            </div>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Viewers',
  data() {
    return {
      viewers: [
        { name: 'Viwer1' },
        { name: 'Viwer11' },
        { name: 'Viwer111' }
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
    this.fetchViewer()
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
    fetchViewer() {
      console.log(localStorage.getItem("companyID"))
      const companyId = localStorage.getItem('companyID');
      fetch(`http://localhost:5063/api/CompanyUsers/GetCompanyViewersByCompanyId?id=${companyId}`)
        .then(response => response.json())
        .then(data => {
          this.viewers = data
        })
        .catch(error => {
          console.error('Error fetching admins:', error)
        })
    },
    editViewer() {
      // Implement edit device functionality
      
    },
    deleteViewer() {
      // Implement delete device functionality
      
    },
    logout() {
      localStorage.clear();
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
