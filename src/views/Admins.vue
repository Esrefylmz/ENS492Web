<template>
    <div class="devices">
      <h1>Devices</h1>
      <ul>
        <li v-for="(device, index) in devices" :key="index" class="device">
          <div class="device-info">
            <div class="device-name">{{ device.name }}</div>
            <div class="device-buttons">
              <button class="edit-button" @click="editDevice(index)">Edit</button>
              <button class="delete-button" @click="deleteDevice(index)">Delete</button>
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
        devices: [
          { name: 'Admin1' },
          { name: 'Admin2' },
          { name: 'Admin3' }
        ]
      }
    },
    methods: {
      editDevice(index) {
        // Implement edit device functionality
        console.log(`Editing device ${index}`)
      },
      deleteDevice(index) {
        // Implement delete device functionality
        console.log(`Deleting device ${index}`)
      }
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
  