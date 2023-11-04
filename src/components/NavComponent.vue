<template>
    <nav id="nav-main" class="wrapper-navigation">
      <ol>
        <li v-for="link in links" :key="link.to">
          <router-link :to="link.to">{{ link.label }}</router-link>
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        links: [
          { to: '/', label: 'SONGS' },
          { to: '/albums', label: 'ALBUMS' },
          { to: '/about', label: 'ABOUT' },
        ],
      };
    },
  };
  </script>
  