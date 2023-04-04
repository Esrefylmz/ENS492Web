<template>
  <div class="register-container">
    <form @submit.prevent="register">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password">
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword">
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register() {
      // Call register API with this.username, this.email, this.password, and this.confirmPassword
    }
  }
}
</script>

<style scoped>
.register-container {
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

input {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
