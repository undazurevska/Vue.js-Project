<template>
  <div id="songs-view" @scroll="handleScroll">
    <div class="wrapper-header">
      <h1>SONGS</h1>
      <div class="wrapper-search">
        <input id="input-search" placeholder="Search by title..." v-model="searchText" />
      </div>

      <div class="wrapper-settings">
        <button
          id="btn-show-favorites"
          @click="toggleShowFavorites"
          :class="{ active: showFavorites }"
        >
          Show Favorites
        </button>
      </div>
    </div>
    <div class="wrapper-songs">
      <table cellspacing="0" cellpadding="0">
        <tr ref="header">
          <th id="th-id">#</th>
          <th id="th-title" @click="sortBy('title')" :class="{ active: sortBy === 'title', 'flip-vertical': sortBy === 'title' && sortDirection === -1 }">
            Title
            <IconCaretUp v-if="sortBy === 'title'" :class="{ 'flip-vertical': sortDirection === -1 }" />
          </th>
          <th id="th-artist">Artist</th>
          <th id="th-album">Album</th>
          <th id="th-duration" @click="sortBy('duration_ms')" :class="{ active: sortBy === 'duration_ms', 'flip-vertical': sortBy === 'duration_ms' && sortDirection === -1 }">
          Duration
          <IconCaretUp v-if="sortBy === 'duration_ms'" :class="{ 'flip-vertical': sortDirection === -1 }" />
        </th>
        <th id="th-duration">
          Like
        </th>
        </tr>
        <!-- Loop through song data -->
        <tr class="song" v-for="(song, index) in filteredSongs" :key="song.id">
          <td id="td-index" @dblclick="playSong(song)" @click="toggleFavorite(song)">
            <span id="txt-index">{{ index + 1 }}</span>
          </td>
          <td id="td-title">
            <img :src="song.album.images[0].url" />
            {{ song.name }}
          </td>
          <td id="td-artist">{{ getArtistsNames(song.artists) }}</td>
          <td id="td-album">{{ song.album.name }}</td>
          <td id="td-duration">
            {{ formatDuration(song.duration_ms) }}        
        </td>
        <td>
          <IconHeart @click="toggleFavorite(song)" :class="{ 'green-heart': isFavorite(song) }" />
        </td>

        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import songs from '../data/songs.js';
import IconPlay from './icons/IconPlay.vue';
import IconHeart from './icons/IconHeart.vue';
import IconCaretUp from './icons/IconCaretUp.vue';
import { useAuthStore } from '../auth.js';



export default {
  components: { IconPlay, IconHeart, IconCaretUp},
  data() {
    return {
      songs: songs,
      sortBy: null,
      sortDesc: false,
      searchText: '',
      showFavorites: false,
    };
  },
  computed: {
    filteredSongs() {
      const search = this.searchText.toLowerCase();
      let filtered = this.songs.filter(song => song.name.toLowerCase().includes(search));

      // If showFavorites is true, only show favorite songs
      if (this.showFavorites) {
        filtered = filtered.filter(song => this.favoriteSongs.includes(song.id));
      }

      // Sort the filtered songs
      if (this.sortBy) {
        filtered.sort((a, b) => {
          const propA = a[this.sortBy];
          const propB = b[this.sortBy];
          return (propA > propB ? 1 : -1) * this.sortDirection;
        });
      }

      return filtered;
    },
    
    favoriteSongs() {
      return useAuthStore().getFavoriteSongs();
    },
  },


  methods: {
    handleScroll(event) {
      this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
    },
    getArtistsNames(artists) {
      return artists.map(artist => artist.name).join(', ');
    },
    formatDuration(durationMs) {
      // Convert milliseconds to a human-readable format (e.g., "3:07")
      const minutes = Math.floor(durationMs / 60000);
      const seconds = ((durationMs % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
    playSong(song) {
      // Handle playing the song on double-click
      // You can implement your audio player logic here.
      // For example, you can use the Web Audio API to play the song.
    },

    toggleFavorite(song) {
      // Get the song's ID
      const songID = song.id;

      // Access the auth store
      const authStore = useAuthStore();

      // Check if the song is already a favorite
      const isFavorite = authStore.getFavoriteSongs().includes(songID);

      if (isFavorite) {
        // If the song is a favorite, remove it
        authStore.toggleFavorite(songID);
      } else {
        // If the song is not a favorite, add it
        authStore.toggleFavorite(songID);
      }
    },
    isFavorite(song) {
  const authStore = useAuthStore();
  const favoriteSongs = authStore.getFavoriteSongs();

  const isFavorite = favoriteSongs.includes(song.id);
  return isFavorite;
},


    toggleShowFavorites() {
      this.showFavorites = !this.showFavorites;


    },
  },
};
</script>



