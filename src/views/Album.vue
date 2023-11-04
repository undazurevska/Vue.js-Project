<template>
    <div id="album-view">
      <div class="wrapper-header">
        <h1>ALBUMS</h1>
        <div class="settings">
          <button id="btn-grid" @click="setGridLayout('grid')"><IconGrid></IconGrid></button>
          <button id="btn-list" @click="setGridLayout('list')"><IconList></IconList></button>
        </div>
      </div>
      <ul id="list-albums" :class="{ grid: isGridLayoutActive }">
        <li
          class="album"
          v-for="album in albums"
          :key="album.id"
          @click="selectAlbum(album)"
          :class="{ active: album.id ===  playerStore.getNowPlayingAlbumID }"
        >
          <img id="img-album" :src="album.coverImage" />
          <div class="album-info">
            <h4 id="txt-album-name">{{ album.name }}</h4>
            <p id="txt-album-artists">{{ album.artists }}</p>
            <div class="album-year">
              <p id="txt-album-year">{{ getYear(album.releaseDate) }}</p>
              <p id="txt-album-tracks">{{ getTrackCount(album.tracks) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import songs from '../data/songs.js';
  import IconGrid from '../components/icons/IconGrid.vue';
  import IconList from '../components/icons/IconList.vue';
  import { usePlayerStore } from '@/stores/player'

  export default {
    components: {IconGrid, IconList},
    data() {
      return {
        isGridLayoutActive: false,
        currentAlbumId: null,
        playerStore: usePlayerStore(),
      };
    },
    computed: {
      albums() {
        const albumMap = new Map();
        songs.forEach((song) => {
          const albumId = song.album.id;
          if (!albumMap.has(albumId)) {
            albumMap.set(albumId, {
              id: albumId,
              name: song.album.name,
              artists: song.album.artists.map(artist => artist.name).join(', '),
              releaseDate: this.getYear(song.album.release_date),
              coverImage: song.album.images[0].url,
              tracks: [],
            });
          }
          albumMap.get(albumId).tracks.push(song);
        });
        return Array.from(albumMap.values());
      },
    },
    methods: {
      selectAlbum(album) {
            if (this.lastClicked !== album) {
                this.doubleClick = 0;
                this.lastClicked = album;
            }
            this.doubleClick++;
            if (this.doubleClick === 1) {
                this.timer = setTimeout(() => {
                    this.doubleClick = 0;
                }, 500);
            } else {
                clearTimeout(this.timer);
                this.playerStore.setPlaylist(album.tracks);
                this.playerStore.setNowPlaying(album.tracks[0]);
                this.doubleClick = 0;
            }
        },
      setGridLayout(layout) {
        this.isGridLayoutActive = layout === 'grid';
      },
      getYear(date) {
        return new Date(date).getFullYear();
      },
      getTrackCount(tracks) {
        return `${tracks.length} song${tracks.length !== 1 ? 's' : ''}`;
      },
    },
  };
  </script>
  