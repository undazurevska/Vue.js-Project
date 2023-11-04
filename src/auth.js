import { defineStore } from 'pinia';
import router from './router/index.js'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: 'Unda',
      surname: 'Žurevska',
      code: 'IT1234',
      favorite_songs: [],
    },
    authenticated: false,
  }),

  getters: {
    is_authenticated() {
      return localStorage.getItem('is_authenticated') === 'true' || this.authenticated;
    },
    getFavoriteSongs: (state) => () => {
      return state.user.favorite_songs;
    },
  },

  actions: {
    setUserData(name, surname, code) {
      this.user.name = name;
      this.user.surname = surname;
      this.user.code = code;
    },

    authenticate(email, password) {
      if (email === 'unda' && password.length >= 6) {
        localStorage.setItem('is_authenticated', true);
        this.authenticated = true;
        router.push('/');
      }
    },

    logout() {
      localStorage.clear();
      this.authenticated = false;
      router.push('/login');
    },

    toggleFavorite(songID) {
      if (this.user.favorite_songs.includes(songID)) {
        this.user.favorite_songs = this.user.favorite_songs.filter((id) => id !== songID);
      } else {
        this.user.favorite_songs.push(songID);
      }
      localStorage.setItem('favorite_songs', JSON.stringify(this.user.favorite_songs));
    },
  },
});
