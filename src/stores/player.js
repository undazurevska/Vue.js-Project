import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        playlist   : [],
        now_playing: {}, // SONG OBJECT
    }),
    getters: {
        getNextSong(){
            const currentIndex = this.playlist.findIndex(
                (song) => song.id === this.now_playing.id
                );
        
                if (currentIndex === -1 || currentIndex === this.playlist.length - 1) {
                return null;
                } else {
                return this.playlist[currentIndex + 1];
                }
        },
        getPreviousSong() {
            const currentIndex = this.playlist.findIndex(
                (song) => song.id === this.now_playing.id
              );
        
              if (currentIndex <= 0) {
                return null;
              } else {
                return this.playlist[currentIndex - 1];
              }
        },
        getNowPlayingSongId() {
            return this.now_playing?.id;
        },
        getNowPlaying() {

        },
        getNowPlayingAlbumID() {
            return this.now_playing?.album?.id ?? null;
        },
        getNowPlayingSongName() {
            return this.now_playing?.name ?? '';
        },
        getNowPlayingSongImage() {
            return this.now_playing?.album?.images[1].url ?? '';
        },
        getNowPlayingArtists() {
            return this.now_playing?.artists?.map(artist => artist.name).join(', ');
        },
        getNowPlayingSongPreview() {
            return this.now_playing?.preview_url;
        }
    },
    actions: {
        setPlaylist(songs) {
            this.playlist = songs;
        },
        setNowPlaying(song) {
            this.now_playing = song;
        },
        resetNowPlaying() {
            this.now_playing = {};
        },
    }
})
