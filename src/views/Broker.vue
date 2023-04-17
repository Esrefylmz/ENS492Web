<template>
    <div class="configure">
      <h1>Configure Company</h1>
  
      <form class="configure-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="companyName">Company Name:</label>
          <input type="text" id="companyName" v-model="companyName" required>
        </div>

        <div class="form-group">
          <label for="ssid">SSID:</label>
          <input type="text" id="ssid" v-model="ssid" required>
        </div>
  
        <div class="form-group">
          <label for="broker">Broker:</label>
          <input type="text" id="broker" v-model="broker" required>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="text" id="password" v-model="password" required>
        </div>
  
        <button type="submit" class="configure-button">Configure</button>
      </form>
    </div>
  </template>
  
  <script>
import axios from 'axios';
console.log(localStorage.getItem("companyID"));
export default {
    name: 'Configure',
    data() {
    return {
        companyName: '',
        ssid: '',
        broker: '',
        password: '',
    }
    },
    methods: {
        async submitForm() {
            const url = 'http://localhost:5063/api/CompanyContoller/UpdateCompany';
            const body = {
                companyId: localStorage.getItem("companyID"),
                name: this.companyName,
                domain: localStorage.getItem("userDomain"),
                ssid: this.ssid,
                broker: this.broker,
                password: this.password,
            };
            
            try {
                const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                });
                //console.log(response);
                this.companyName = '';
                this.ssid = '';
                this.broker = '';
                this.password = '';
                alert('Configuration successful');

            } catch (error) {
                console.error(error);
            }
        },

    },
}

  </script>
  
  <style>
  .configure {
    padding: 20px;
    width: 30%;
    margin: 0 auto;
  }
  .configure-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-group {
    margin-bottom: 20px;
    width: 100%;
  }
  label {
    font-size: 18px;
    margin-bottom: 10px;
    display: block;
  }
  input {
    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
  }
  .configure-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    
  }

  </style>
  