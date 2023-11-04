<template>
  <div id="main-header" class="active">
    <div class="wrapper-logo">
      <img src="@/assets/logo.svg" alt="logo" />
      <h2>KRAKEN.FM</h2>
    </div>
    <div class="wrapper-profile">
      <div class="section-user">
        <span class="avatar"></span>
        <h3 id="txt-full-name">{{ fullName }}</h3>
      </div>
      <button id="btn-logout" @click="logout">LOGOUT</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from '../auth.js'; 

export default {
  computed: {
    fullName() {
      const authStore = useAuthStore();
      return `${authStore.user.name} ${authStore.user.surname}`;
    },
  },
  methods: {
    logout() {
      // Call the authenticate method from your useAuthStore
      useAuthStore().logout();
    },
  },
};
</script>
