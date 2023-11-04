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
          <th id="th-title"  @click="applyFilter('Title')" :class="{ active: activeFilter === 'Title' }">
            Title
            <IconCaretUp v-if="sortBy === 'title'" :class="{ 'flip-vertical': sortDirection === -1 }" />
          </th>
          <th id="th-artist">Artist</th>
          <th id="th-album">Album</th>
          <th id="th-duration"   @click="applyFilter('Duration')" :class="{ active: activeFilter === 'Duration' }">
          Duration
          <IconCaretUp v-if="sortBy === 'duration_ms'" :class="{ 'flip-vertical': sortDirection === -1 }" />
        </th>
        <th id="th-duration">
          Like
        </th>
        </tr>
        <tr class="song" v-for="(song, index) in filteredSongs" :key="song.id" @click="playSong(song)" :class="{ active: playerStore.getNowPlaying === song }">
          <td id="td-index" @dblclick="playSong(song)" @click="toggleFavorite(song)">
            <IconPlay v-if="playerStore.getNowPlaying === song" color="var(--c-accent-secondary)" />
            <span id="txt-index" v-else>{{ index + 1 }}</span>
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
import IconPlay from '../components/icons/IconPlay.vue';
import IconHeart from '../components/icons/IconHeart.vue';
import IconCaretUp from '../components/icons/IconCaretUp.vue';
import { useAuthStore } from '../auth.js';
import { usePlayerStore } from '@/stores/player';

export default {
  components: { IconPlay, IconHeart, IconCaretUp },
  data() {
    return {
      songs: songs,
      sortDesc: false,
      searchText: '',
      showFavorites: false,
      playerStore: usePlayerStore(),
      sortBy: '',
      sortDirection: 1,
      activeFilter: 'None',
      doubleClick: 0,
      lastClicked: null,
    };
  },
  computed: {
    filteredSongs() {
      const search = this.searchText.toLowerCase();
      let filtered = this.songs.filter((song) => song.name.toLowerCase().includes(search));

      if (this.showFavorites) {
        filtered = filtered.filter((song) => this.favoriteSongs.includes(song.id));
      }

      if (this.sortBy) {
        filtered.sort((a, b) => {
          const propA = a[this.sortBy];
          const propB = b[this.sortBy];
          return (propA > propB ? 1 : -1) * this.sortDirection;
        });
      }
      filtered = filtered.filter((song, index, self) => {
        return self.findIndex((s) => s.id === song.id) === index;
      });
    

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
    applyFilter(filter) {
      if (filter === this.activeFilter) {
        this.sortDirection = -this.sortDirection;
      } else {
        this.sortDirection = 1;
      }

      this.activeFilter = filter;
      this.sortBy = filter === 'Title' ? 'name' : filter === 'Duration' ? 'duration_ms' : '';
    },
    getArtistsNames(artists) {
      return artists.map((artist) => artist.name).join(', ');
    },
    formatDuration(durationMs) {
      const minutes = Math.floor(durationMs / 60000);
      const seconds = ((durationMs % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },

    toggleFavorite(song) {
      const songID = song.id;

      const authStore = useAuthStore();
      const isFavorite = authStore.getFavoriteSongs().includes(songID);

      if (isFavorite) {
        authStore.toggleFavorite(songID);
      } else {
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
    playSong(song) {
      if (this.lastClicked !== song) {
        this.doubleClick = 0;
        this.lastClicked = song;
      }
      this.doubleClick++;
      if (this.doubleClick === 1) {
        this.timer = setTimeout(() => {
          this.doubleClick = 0;
        }, 500);
      } else {
        clearTimeout(this.timer);
        this.playerStore.setNowPlaying(song);
        this.doubleClick = 0;
      }
    },
  },

  mounted() {
    this.playerStore.setPlaylist(this.songs);
  },
};
</script>