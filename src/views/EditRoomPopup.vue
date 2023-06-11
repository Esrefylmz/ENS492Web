<template>
    <div class="edit-room-popup">
      <h2>Edit Room</h2>
      <form>
        <label for="name">Room Name:</label>
        <input type="text" id="name" v-model="roomName">
        <button type="submit" @click.prevent="saveChanges">Save Changes</button>
        <button type="button" @click="closePopup">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditRoomPopup',
    props: {
      roomId: {
        type: String,
        required: true
      },
      roomName: {
        type: String,
        required: true
      },
      showPopup: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      saveChanges() {
        // Code to update the room with the new name
        // ...
        // Close the popup
        this.$emit('close-popup');
      },
      closePopup() {
        this.$emit('close-popup');
      }
    }
  }
  </script>
  
  <style scoped>
  .edit-room-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  label {
    font-weight: bold;
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  button {
    padding: 10px 20px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
  }
  button[type="submit"] {
    background-color: green;
    color: white;
    border: none;
  }
  button[type="button"] {
    background-color: red;
    color: white;
    border: none;
  }
  </style>
  