<template>
    <div>
        <div>
            <v-container>
                <v-row no-gutters class="d-flex justify-start">
                    <v-btn elevation="2" large class="pa-2 " outlined color="secondary">
                        <v-icon class="px-1">mdi-plus-circle-outline</v-icon
                        ><span class="text_primary_darken--text text-subtitle-1 px-2"> Créer </span>
                    </v-btn>

                    <v-btn elevation="2" large class="pa-2 mx-5" outlined color="secondary">
                        <v-icon class="px-1">mdi-download</v-icon
                        ><span class="text_primary_darken--text text-subtitle-1 px-2"> Importer </span>
                    </v-btn>

                    <v-btn elevation="2" large class="pa-2" outlined color="secondary">
                        <v-icon class="px-1">mdi-upload</v-icon
                        ><span class="text_primary_darken--text text-subtitle-1 px-2"> Exporter </span>
                    </v-btn>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PlaceListAction',
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
