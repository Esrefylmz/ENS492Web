<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <label for="mail">Mail:</label>
      <input type="text" id="mail" v-model="mail">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password">     
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      mail: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'logout']),
    async login() {
      try {
        const response = await axios.post('http://uskumru.sabanciuniv.edu:5063/api/CompanyUserAuth/LoginCompanyUser', { 
          mail: this.mail,
          password: this.password
        })
        if (response.status === 200) {
          //console.log(response.data)
          const userMail = response.data.usermail
          const uID = response.data.userId
          const userType = response.data.userType
          const userDomain = response.data.usermail.split('@')[1];
          const companyID = response.data.companyId;
          localStorage.setItem('mail', userMail)
          localStorage.setItem('userID', uID)
          localStorage.setItem('userType', userType)
          localStorage.setItem('userDomain', userDomain)
          localStorage.setItem('companyID', companyID)
          
          console.log(localStorage.getItem("userDomain"))
          console.log(localStorage.getItem("companyID"))
          
          console.log('Login Succesful')
          this.$router.push('/buildings')

        } else {
          alert('Incorrect Mail or password')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
}

label {
  margin-bottom: 10px;
}

input[type="text"],
input[type="password"] {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}


button {
  padding: 11%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 30px;
  width: auto;
  height: auto;
  cursor: pointer;
}
</style>
