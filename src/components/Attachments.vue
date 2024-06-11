<template>
    <v-card flat :height="height">
        <input class="pt-10" ref="fileInput" type="file" accept="image/*" @change="onFileChange" style="display: none" />
        <v-card
            rounded="xxl"
            v-if="!previewImage"
            style="height: 100%; width: 100%"
            class="file-input-container d-flex align-center justify-center secondary"
            @click="triggerFileInput">
            <div>
                <span class="white--text text-h6">{{ label }}</span>
            </div>
        </v-card>
        <div v-else @click="triggerFileInput" class="file-input-container">
            <v-img style="border-radius: 24px" :src="previewImage" aspect-ratio="1" :height="height"></v-img>
            <v-btn
                v-if="previewImage"
                class="mt-2"
                style="transform: translateX(20px); z-index: 10"
                x-small
                absolute
                top
                right
                color="error"
                fab
                @click="removeAttachments">
                <v-icon>mdi-minus</v-icon>
            </v-btn>
        </div>
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
    },
    data() {
        return {
            file: null,
            previewImage: null,
        };
    },
    methods: {
        onFileChange(event) {
            const files = event.target.files || event.dataTransfer.files;
            if (!files.length) return;
            this.file = files[0];
            this.previewImage = URL.createObjectURL(this.file);
            this.$emit('upload', this.file);
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        removeAttachments() {
            this.file = null;
            this.previewImage = null;
            this.$refs.fileInput.value = null;
            this.$emit('upload', this.file);
        },
    },
};
</script>

<style scoped>
.file-input-container {
    cursor: pointer;
}
</style>
