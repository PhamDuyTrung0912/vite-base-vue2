<template>
    <v-container>
        <c-table
            :totalPages="totalPages"
            :currentPage="currentPage"
            :totalItems="totalItems"
            :numberColumnFixed="3"
            :isCheckbox="true"
            :tableHeaders="tableHeaders"
            :tableDatas="tableDatas"
            @onSort="(v) => $emit('onSort', v)"
            @onChangePage="(toPage) => $emit('onChangePage', toPage)">
            <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center">
                    <div
                        :class="[
                            'status_item',
                            { status_item_draft: item.status === 'Draft' },
                            ,
                            { status_item_published: item.status === 'Published' },
                            ,
                            { status_item_archived: item.status === 'Archived' },
                        ]"></div>
                    <v-icon @click="onHandleEdit(item)" class="ml-3 mr-2" dense>mdi-pencil-outline</v-icon>
                    <v-icon @click="onHandleDelete(item)" dense>mdi-delete-outline</v-icon>
                </div>
            </template>
            <template v-slot:[`item.image`]="{ item }">
                <div>
                    <v-img
                        v-if="item.picture && item.picture.url"
                        width="40"
                        height="40"
                        style="object-fit: cover; border-radius: 100%"
                        :src="$utils.apiAsset(item.picture.url)"
                        alt="image" />
                </div>
            </template>

            <template v-slot:[`item.created_at`]="{ item }">
                <div>{{ $utils.getFullDate(item.created_at) }}</div>
            </template>

            <template v-slot:[`item.updated_at`]="{ item }">
                <div>{{ $utils.getFullDate(item.updated_at) }}</div>
            </template>

            <template v-slot:[`item.place`]="{ item }">
                <div v-if="item.place">
                    <v-chip small>{{ item.place.name }}</v-chip>
                </div>
            </template>

            <template v-slot:[`item.id`]="{ item }">
                <div class="text-truncate" style="max-width: 120px">{{ item.id }}</div>
            </template>
        </c-table>
        <!-- Dialog -->
        <confirm-place-dialog @accept="handleDeletePlace" :show="isConfirmDialog" @close="isConfirmDialog = false" />
    </v-container>
</template>

<script>
import CTable from '@/components/table/CTable.vue';
import eventBus from '@/eventBus';
import ConfirmPlaceDialog from '@/modules/dashboard/place/list/dialog/ConfirmPlaceDialog.vue';
import placeService from '@/apis/placeService/index';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CTable , ConfirmPlaceDialog},
    name: 'PlaceListTable',
    props: {
        totalPages: {
            type: Number,
            default: 0,
        },
        currentPage: {
            type: Number,
            default: 0,
        },
        totalItems: {
            type: Number,
            default: 0,
        },
        tableDatas: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isConfirmDialog: false,
            placeSelected: null,
            tableHeaders: [
                {
                    text: 'Image',
                    value: 'image',
                    width: 60,
                    sortable: false,
                },
                { text: 'ID externe', value: 'id', width: 120 },
                { text: 'Actions', value: 'action', width: 100, sortable: false },
                { text: 'Nom', value: 'name', width: 150 },
                { text: 'Catégorie', value: 'place', width: 250 },
                { text: 'Date de création', value: 'created_at', width: 200 },
                { text: 'Date de mise à jour', value: 'updated_at' },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        onHandleEdit(item) {},
        onHandleDelete(item) {
            this.placeSelected = item;
            this.isConfirmDialog = true;
        },
        handleDeletePlace() {
            if (this.placeSelected) {
                eventBus.$emit('isLoading');
                this.isConfirmDialog = false;
                placeService
                    .deletePlace(this.placeSelected.id)
                    .then(() => {
                        this.$emit('getPlaces');
                        eventBus.$emit('isLoaded');
                        this.$toast.success({
                            message: 'Supprimer la liste avec succès !',
                        });
                    })
                    .catch(() => {
                        eventBus.$emit('isLoaded');
                    });
            }
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.status_item {
    height: 15px;
    width: 15px;
    border-radius: 20px;
    &_draft {
        background-color: $text-white-color;
    }
    &_published {
        background-color: $toast_color_success;
    }
    &_archived {
        background-color: $toast_color_error;
    }
}
</style>
