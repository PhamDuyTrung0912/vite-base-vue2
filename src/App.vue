<template>
    <v-app>
        <router-view></router-view>
        <loader />
    </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import Loader from '@/modules/loader/Loader.vue';

export default defineComponent({
    name: 'App',
    components: { Loader },
});
</script>

<style lang="scss">
::-webkit-scrollbar {
    width: 5px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #f9cede;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #e4003a;
}
</style>
;
