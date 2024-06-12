<template>
    <div>
        <div>
            <v-container>
                <v-row no-gutters class="d-flex justify-start">
                    <v-btn @click="changeRouteChild('CategoryCreatePage')" elevation="0" text large class="pa-2" outlined color="primary">
                        <v-icon class="px-1" size="20">mdi-plus-circle-outline</v-icon
                        ><span class="text_primary--text text-subtitle-2 font-weight-bold px-2"> Créer </span>
                    </v-btn>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PlaceCategoryAction',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {
        changeRouteChild(route) {
            if (this.$route.name !== route) this.$router.push({ name: route });
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
