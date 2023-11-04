import {createRouter, createWebHistory} from 'vue-router';
import Songs from '../views/Songs.vue';
import Album from '../views/Album.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import { useAuthStore } from '../auth.js';

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/',
            name: 'Songs',
            component: Songs,
        },
        {
            path: '/albums',
            name: 'Album',
            component: Album,
        },
        {
            path: '/about',
            name: 'About',
            component: About,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.path === '/login') {
      if (authStore.is_authenticated) {
        next('/');
      } else {
        next();
      }
    } else {
      if (authStore.is_authenticated) {
        next();
      } else {
        next('/login');
      }
    }
  });

export default router
