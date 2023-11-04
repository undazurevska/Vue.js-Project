<template>
    <div id="login-view">
      <form class="login-form" @submit.prevent="login">
        <div class="wrapper-logo">
          <img src="@/assets/logo.svg" />
          <div>KRAKEN.FM</div>
        </div>
        <input id="input-email" placeholder="E-mail" v-model="email" />
        <input id="input-password" type="password" placeholder="Password" v-model="password" />
        <button id="btn-submit" type="submit" :disabled="!isButtonEnabled">LOGIN</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '../auth.js'; 

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    computed: {
      isButtonEnabled() {
        return this.email && this.password.length >= 6;
      },
    },
    methods: {
      login() {
        if (this.isButtonEnabled) {
          useAuthStore().authenticate(this.email, this.password);
        }
      },
    },
  };
  </script>
  