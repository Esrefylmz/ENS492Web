<template>
  <div class="devices">
    <h1>Admins</h1>

    <div v-if="localStorageMail">
      <button class="logout-button" @click="logout">Logout</button>
    </div>
    <ul>
      <li v-for="(admin) in admins" :key="admin.usermail" class="device">
        <div class="device-info">
          <div class="device-name">{{ admin.usermail }}</div>
          <div class="device-buttons">
            <div v-if="isAdmin">
              <button class="delete-button" @click="deleteAdmin(admin.userId)">Delete</button>
            </div>
          </div>
        </div>
      </li>
    </ul>


  </div>
</template>

<script>
export default {
  name: 'Admins',
  data() {
    return {
      admins: [
        { name: 'Admin1' },
        { name: 'Admin2' },
        { name: 'Admin3' }
      ],
      showPopup: false
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
    this.fetchAdmins()
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
    fetchAdmins() {
      console.log(localStorage.getItem("companyID"))
      const companyId = localStorage.getItem('companyID');
      fetch(`http://uskumru.sabanciuniv.edu:5063/api/CompanyUsers/GetCompanyAdminsByCompanyId?id=${companyId}`)
        .then(response => response.json())
        .then(data => {
          this.admins = data
        })
        .catch(error => {
          console.error('Error fetching admins:', error)
        })
    },
    deleteAdmin(uID) {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        fetch(`http://uskumru.sabanciuniv.edu:5063/api/CompanyUsers/DisapprovePendingViewer/${uID}`, {
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
            this.fetchAdmins();
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
      }
    },
    addAdmin() {
      // Code to add admin here
      // ...
      this.showPopup = false;
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
  margin-bottom: 10px

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
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
}

.popup-form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.popup-form label {
  margin-bottom: 5px;
  font-weight: bold;
}

.popup-form input {
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.confirm-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
}

</style>
