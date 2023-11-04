import {createRouter, createWebHistory} from 'vue-router';
import Songs from '../components/Songs.vue';
import Album from '../components/Album.vue';
import About from '../components/About.vue';
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

// LV
// Tiek izveidots middleware / starpprogrammatūra kura katru reizi veiks pārbaudi pirms tiks nomainīta rūtera adrese
// arguments to glabā adresi uz kurieni gribam iet
// arguments from glabā adresi no kurienes mēs nākam

// ENG
// Middleware is a function that is executed before the route is changed
// argument "to" stores the address where we want to navigate/go
// argument "from" stores the address from where we're coming from


router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.path === '/login') {
      if (authStore.is_authenticated) {
        // If the user is authenticated, prevent them from accessing /login
        next('/');
      } else {
        // Allow unauthenticated users to access /login
        next();
      }
    } else {
      // For other routes, check if the user is authenticated
      if (authStore.is_authenticated) {
        next();
      } else {
        // If not authenticated, redirect to /login
        next('/login');
      }
    }
  });

export default router
