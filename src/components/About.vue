<template>
    <div id="about-view">
      <div class="wrapper-header">
        <h1>ABOUT ME</h1>
        <div class="settings">
          <button id="btn-edit" @click="toggleEditForm">{{ isEditing ? 'Cancel' : 'Edit Form' }}</button>
          <button id="btn-save" @click="saveForm" v-show="isEditing">Save Form</button>
        </div>
      </div>
      <form>
        <div class="wrapper-input">
          <label>NAME</label>
          <input id="input-name" v-model="formData.name" v-show="isEditing" />
          <p id="txt-name" v-show="!isEditing">{{ name }}</p>
        </div>
        <div class="wrapper-input">
          <label>SURNAME</label>
          <input id="input-surname" v-model="formData.surname" v-show="isEditing" />
          <p id="txt-surname" v-show="!isEditing">{{ surname }}</p>
        </div>
        <div class="wrapper-input">
          <label>STUDENT CODE</label>
          <input id="input-code" v-model="formData.code" v-show="isEditing" />
          <p id="txt-code" v-show="!isEditing">{{ code }}</p>
        </div>
        <div class="wrapper-songs">
          <label>FAVORITE SONGS</label>
          <ul>
  <li v-for="song in favoriteSongs" :key="song.id">
    <img id="img-album" :src="song.album && song.album.images ? song.album.images[0].url : ''" />
    <div class="song-info">
      <p id="txt-song" class="song-name">{{ song.name }}</p>
      <p id="txt-artist" class="song-artists">{{ song.artists }}</p>
    </div>
  </li>
</ul>

           <div id="txt-empty" class="empty" v-show="favoriteSongs.length === 0">NO SONGS FOUND</div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../auth.js';
  
  export default {
    computed: {
      name() {
        return useAuthStore().user.name;
      },
      surname() {
        return useAuthStore().user.surname;
      },
      code() {
        return useAuthStore().user.code;
      },
      isEditing() {
        return this.$data.editingForm;
      },
      favoriteSongs() {
        const songs = useAuthStore().getFavoriteSongs();
        console.log(songs);
        return songs;
        },

    },
    data() {
      return {
        editingForm: false,
        formData: {
          name: '',
          surname: '',
          code: '',
        },
      };
    },
    methods: {
      toggleEditForm() {
        if (this.isEditing) {
          // If editing is canceled, reset the form data to the original values
          this.formData.name = this.name;
          this.formData.surname = this.surname;
          this.formData.code = this.code;
        }
        this.editingForm = !this.editingForm;
      },
      saveForm() {
        // Get the auth store instance directly
        const authStore = useAuthStore();
  
        // Save the edited form data from the formData object
        authStore.setUserData(this.formData.name, this.formData.surname, this.formData.code);
  
        // Disable editing after saving
        this.editingForm = false;
      },
     
    },
  };
  </script>
  