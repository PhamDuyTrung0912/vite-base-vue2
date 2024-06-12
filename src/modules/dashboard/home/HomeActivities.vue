<template>
    <v-container style="overflow-y: auto; height: 700px">
        <v-card>
            <v-timeline dense clipped v-for="(activite, index) in activites" :key="index">
                <v-timeline-item fill-dot :color="getColorByAction(activite.action)" large>
                    <template v-slot:icon>
                        <v-avatar>
                            <img src="https://i.pravatar.cc/64" />
                        </v-avatar>
                    </template>
                    <span> {{ activite.userName }} </span>
                    <br />
                    <span class="font-weight-bold" :class="getTextByAction(activite.action)"> {{ activite.title }} </span>
                    <v-row justify="">
                        <v-col cols="6" class="text-subtitle-2"> {{ activite.description }}</v-col>
                        <v-col class="text-left text-subtitle-2 primary--text" cols="5"> {{ $utils.getFullDate(activite.created_at) }} </v-col>
                    </v-row>
                </v-timeline-item>
            </v-timeline>
        </v-card>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeActivities',
    props: {},
    data() {
        return {
            activites: [
                {
                    id: 1,
                    userName: 'John Doe',
                    action: 'create',
                    title: 'a créé ABC',
                    created_at: '2024-04-15 05:00:02',
                    description:
                        'Vestibulum sagittis augue molestie tortor congue semper. Integer pharetra purus eget libero ultrices, sed ultrices ligula luctus',
                },
                {
                    id: 2,
                    userName: 'Cong Anh',
                    action: 'update',
                    title: 'a modifié ABC',
                    created_at: '2024-04-14 04:00:02',
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget iaculis risus. Sed sapien sem, auctor ac dignissim at, tempus in urna. Mauris in sem magna. Vestibulum sagittis augue molestie tortor congue semper. Integer pharetra purus eget libero ultrices, sed ultrices ligula luctus. Fusce eleifend dui vitae ligula venenatis sodales.',
                },
                {
                    id: 3,
                    userName: 'Pham Trung',
                    action: 'delete',
                    title: 'a supprimer ABC',
                    created_at: '2024-04-13 09:00:02',
                    description:
                        'Vestibulum sagittis augue molestie tortor congue semper. Integer pharetra purus eget libero ultrices, sed ultrices ligula luctus',
                },
                {
                    id: 4,
                    userName: 'John Doe',
                    action: 'delete',
                    title: 'a supprimer ABC',
                    created_at: '2024-04-12 07:00:02',
                    description:
                        'Vestibulum sagittis augue molestie tortor congue semper. Integer pharetra purus eget libero ultrices, sed ultrices ligula luctus',
                },
                {
                    id: 5,
                    userName: 'Cong Anh',
                    action: 'update',
                    title: 'a modifié ABC',
                    created_at: '2024-04-01 04:00:02',
                    description: '',
                },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        getColorByAction(action) {
            if (action === 'create') return 'secondary';
            if (action === 'delete') return 'color_rejected';
            return 'draft';
        },
        getTextByAction(action) {
            if (action === 'create') return 'secondary--text';
            if (action === 'delete') return 'color_rejected--text';
            return 'draft--text';
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped></style>
