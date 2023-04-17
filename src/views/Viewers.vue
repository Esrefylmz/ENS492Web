<template>
  <div class="devices">
    <h1>Viewers</h1>

    <div v-if="localStorageMail">
      <button  class="logout-button" @click="logout">Logout</button>
    </div>
    <ul>
      <li v-for="(viewer) in viewers" :key="viewer.usermail" class="device">
        <div class="device-info">
          <div class="device-name">{{ viewer.usermail }}</div>
          <div class="device-buttons">
            <div v-if="isAdmin">
              <button class="edit-button" @click="editViewer(viewer.userId)">Make Admin</button>
              <button class="delete-button" @click="deleteViewer(viewer.userId)">Delete</button>
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
    editViewer(uID) {
      const confirmed = window.confirm("Are you sure you want to promote this user?");
      if (confirmed) {
        fetch(`http://localhost:5063/api/CompanyUsers/PromoteViewerToAdmin?userId=${uID}`, {
          method: 'PUT',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(`User ${uID} was promoted`);
          // Update the viewers list after a successful response
          this.fetchViewer();
        })
        .catch(error => {
          console.error('Error promoting user:', error);
        });
      }
    },
    deleteViewer(uID) {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        fetch(`http://localhost:5063/api/CompanyUsers/DisapprovePendingViewer/${uID}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(`User ${uID} was deleted`);
            this.fetchViewer();
          })
          .catch(error => {
            console.error('Error deleting user:', error);
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
  width: auto;
  border-radius: 5px;
  padding: 5px auto;
  margin-right: 10px;
  cursor: pointer;
}
.delete-button {
  background-color: #f44336;
  color: white;
  width: auto;
  border: none;
  border-radius: 5px;
  padding: 5px auto;
  cursor: pointer;
}
</style>
