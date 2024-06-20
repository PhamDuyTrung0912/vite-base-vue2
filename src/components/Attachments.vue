<template>
    <v-card flat :height="height">
        <input class="pt-10" ref="fileInput" type="file" accept="image/*" @change="onFileChange" style="display: none" />
        <v-card
            v-if="!previewImage"
            flat
            rounded="lg"
            class="file-input-container file-input-container_preview d-flex align-center justify-center"
            @click="$refs.fileInput.click()">
            <div class="text-center">
                <div><v-icon color="text_primary lighten-1" size="75">mdi-image-outline</v-icon></div>
                <span class="text-h6">{{ label }}</span>
            </div>
        </v-card>
        <v-card v-else @click="$refs.fileInput.click()">
            <v-img
                v-if="previewDefault"
                style="border-radius: 5px"
                :src="$utils.apiAsset(previewImage)"
                aspect-ratio="1"
                :height="height"
                width="100%"></v-img>
            <v-img v-else style="border-radius: 5px" :src="previewImage" aspect-ratio="1" :height="height" width="100%"></v-img>
        </v-card>
        <v-btn
            v-if="previewImage"
            style="transform: translateX(30px); z-index: 10"
            x-small
            absolute
            top
            right
            color="error"
            fab
            @click="removeAttachments">
            <v-icon>mdi-minus</v-icon>
        </v-btn>
    </v-card>
</template>

<script>
export default {
    props: {
        label: {
            default: 'Cliquez pour ajouter une image',
        },
        height: {
            default: '250px',
        },
        previewProp: {
            default: null,
        },
    },
    data() {
        return {
            file: null,
            previewImage: null,
            previewDefault: null,
        };
    },
    watch: {
        previewProp: {
            immediate: true,
            handler() {
                if (this.previewProp) {
                    this.previewDefault = this.previewProp;
                    this.previewImage = this.previewDefault;
                }
            },
        },
    },
    methods: {
        onFileChange(event) {
            this.previewDefault = null;
            const files = event.target.files || event.dataTransfer.files;
            if (!files.length) return;
            this.file = files[0];
            this.previewImage = URL.createObjectURL(this.file);
            this.$emit('upload', this.file);
        },
        removeAttachments() {
            this.file = null;
            this.previewImage = null;
            this.$refs.fileInput.value = null;
            this.$emit('upload', this.file);
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
.file-input-container {
    cursor: pointer;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    &_preview {
        border: 1px dashed $text-black-color;
    }
}
</style>
