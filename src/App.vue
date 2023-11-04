<template>
    <!--  HEADER  -->
    <Header v-if="isAuthenticated"></Header>
    <!--  HEADER END  -->

    <!--  BODY  -->
    <div id="section-body">
        <NavComponent v-if="isAuthenticated"></NavComponent>
        <router-view class="section-router"></router-view>
    </div>
    <!--  BODY END  -->

    <!--  PLAYER  -->
    <div id="section-player">
        <AudioPlayer v-if="isAuthenticated"/>
    </div>
    <!--  PLAYER END  -->
</template>

<script>
import Header from '@/components/HeaderComponent.vue';
import AudioPlayer from '@/components/AudioPlayerComponent.vue';
import NavComponent from '@/components/NavComponent.vue';
import { useAuthStore } from './auth.js';

export default {
    components: {
        Header,
        AudioPlayer,
        NavComponent
    },
    computed: {
        isAuthenticated() {
            return useAuthStore().is_authenticated;
        }
    }
}
</script>
