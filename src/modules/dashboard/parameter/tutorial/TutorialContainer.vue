<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <list-card-data-tutorial
                        :dataTypes="dataTypes"
                        :dataAssets="dataAssets"
                        @handleReorder="handleReorder"
                        @insertItem="insertItem"
                        @clearPosition="clearPosition" />
                </v-col>
                <v-col cols="12">
                    <v-btn small height="44" :loading="loading" color="secondary" width="100%" class="my-2 mt-5" @click="save">
                        <v-icon class="px-5">mdi-content-save</v-icon>
                        Sauvegarder</v-btn
                    >
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import eventBus from '@/eventBus';
import { v4 as uuidv4 } from 'uuid';
import { defineComponent } from 'vue';
import ListCardDataTutorial from './ListCardDataTutorial.vue';

export default defineComponent({
    components: { ListCardDataTutorial },
    name: 'TutorialContainer',
    props: {},
    data() {
        return {
            loading: false,
            dataTypes: [
                { text: 'Texte', value: 1 },
                { text: 'Entier', value: 2 },
                { text: 'Décimal', value: 3 },
                { text: 'Booléen', value: 4 },
                { text: 'Date', value: 5 },
                { text: 'Date et heure', value: 6 },
            ],
            dataAssets: [],
            modelDataAsset: {
                name: null,
                url: null,
                isDefault: true,
            },
        };
    },
    watch: {},
    computed: {
        validDataAssets() {
            const itemCheck = this.dataAssets.find((e) => !e.name);
            if (itemCheck) return false;
            return true;
        },
    },
    methods: {
        addDataAsset() {
            this.dataAssets.push({ uid: uuidv4(), isDefault: true, ...this.modelDataAsset, position: this.dataAssets.length + 1 });
        },
        //Emit
        handleReorder(sk) {
            sk.apply(this.dataAssets);
        },
        insertItem(event) {
            this.dataAssets.splice(event.index, 0, event.data);
        },

        clearPosition(item) {
            const index = this.dataAssets.indexOf(item);
            this.dataAssets.splice(index, 1);
        },
        removeDataAsset(uid) {
            if (uid) {
                const itemToRemoveIndex = this.dataAssets.findIndex((el) => el.uid === uid);
                this.dataAssets.splice(itemToRemoveIndex, 1);
            }
        },
        removeDataAsset(uid) {
            if (uid) {
                const itemToRemoveIndex = this.dataAssets.findIndex((el) => el.uid === uid);
                this.dataAssets.splice(itemToRemoveIndex, 1);
            }
        },
        toggleActiveDataAsset(uid) {
            if (uid) {
                this.dataAssets = this.dataAssets.map((e) => {
                    if (e.uid === uid)
                        return {
                            ...e,
                            is_filter: !e.is_filter,
                        };
                    return e;
                });
            }
        },

        updatePositionDataAsset() {
            this.dataAssets = [...this.dataAssets].map((item, index) => ({ ...item, position: index + 1 }));
        },
        updateFormDataAsset(data) {
            const itemToUpdate = this.dataAssets.findIndex((el) => el.uid === data.uid);
            if (this.checkItem('name', data) || this.checkItem('name_user', data)) {
                if (itemToUpdate > -1) {
                    this.dataAssets.splice(itemToUpdate, 1, {
                        ...data,
                        name: null,
                    });
                }
            } else if (itemToUpdate > -1) this.dataAssets.splice(itemToUpdate, 1, data);
            this.addDataAsset();
        },
        checkItem(input, data) {
            if (input === 'name' || input === 'name_user') {
                const itemCheck = this.dataAssets.find(
                    (e) =>
                        e[input] &&
                        e[input]?.toLowerCase() &&
                        data[input]?.toLowerCase() &&
                        e[input].toLowerCase() === data[input].toLowerCase() &&
                        e.uid !== data.uid,
                );
                if (itemCheck) {
                    let message = '';
                    if (input === 'name') {
                        message = 'Le nom de la propriété existait';
                    } else if (input === 'name_user') {
                        message = 'Le nom de la technique existait';
                    }

                    eventBus.$emit('displaySnackbar', {
                        message,
                        color: 'error',
                        timeout: 4000,
                    });
                    return true;
                }
            }
            return false;
        },
        save() {
            if (this.$refs.form.validate()) {
                console.log('log.form', this.form);
            }
        },
    },
    mounted() {},
    created() {
        this.addDataAsset();
        eventBus.$on('removeDataAsset', this.removeDataAsset);
        eventBus.$on('updateFormDataAsset', this.updateFormDataAsset);
        eventBus.$on('updatePositionDataAsset', this.updatePositionDataAsset);
    },
    beforeDestroy() {
        eventBus.$off('removeDataAsset', this.removeDataAsset);
        eventBus.$off('updateFormDataAsset', this.updateFormDataAsset);
        eventBus.$off('updatePositionDataAsset', this.updatePositionDataAsset);
    },
});
</script>

<style lang="scss" scoped>
.ct_btn_add {
    border: 1px dashed rgb(192, 192, 192);
}
</style>
