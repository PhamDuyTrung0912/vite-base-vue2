<template>
    <v-card flat :height="height">
        <input ref="fileCsv" type="file" accept=".csv" @change="uploadFileCsv" class="d-none" />
        <v-card rounded="lg" elevation="0" class="file-input-container" @click="$refs.fileCsv.click()">
            <div v-if="!file" class="text-center">
                <div><v-icon color="text_primary" size="150">mdi-cloud-upload-outline</v-icon></div>
                <span class="text_primary--text text-h6">{{ label }}</span>
            </div>
            <v-card-title v-else><v-icon left>mdi-file-document-outline</v-icon>{{ file.name }}</v-card-title>
        </v-card>
    </v-card>
</template>

<script>
import { defineComponent } from 'vue';
import Papa from 'papaparse';

export default defineComponent({
    name: 'CsvUpload',
    props: {
        label: {
            default: 'Choisissez un fichier',
        },
        height: {
            default: '400px',
        },
    },
    data() {
        return {
            file: null,
            isUploaded: false,
        };
    },
    watch: {},
    computed: {},
    methods: {
        convertDataTypeImport(value) {
            if (value.trim() === 'TRUE') {
                return true;
            }
            if (value.trim() === 'FALSE') {
                return false;
            }
            if (/^\d+(\.\d+)?$/.test(value.trim())) {
                return parseFloat(value.trim());
            }

            if (this.$utils.isValidDateTimeFormat(value.trim())) {
                const formatDate = this.$utils.convertToFullFormat(value.trim());
                return this.$utils.convertToISOFormat(formatDate);
            }

            if (this.$utils.isValidDateFormat(value.trim())) {
                return this.$utils.convertDateFormat(value.trim());
            }
            return value.trim();
        },
        uploadFileCsv(event) {
            if (event.target.files) {
                this.file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = (e) => {
                    const csv = e.target.result;

                    Papa.parse(csv, {
                        header: true,
                        skipEmptyLines: true,
                        complete: (results) => {
                            const data = results.data;
                            results.data.forEach((item) => {
                                Object.keys(item).forEach((key) => {
                                    item[key] = this.convertDataTypeImport(item[key]);
                                });
                            });
                            const headers = Object.keys(data[0]);
                            const defaultImport = {};
                            headers.forEach((header, index) => {
                                defaultImport[index] = header;
                            });

                            this.isUploaded = true;
                            this.$emit('upload', {
                                headers,
                                data,
                            });
                        },
                    });
                };
                reader.readAsText(this.file);
            }
        },
    },
    mounted() {},
    created() {},
    beforeDestroy() {},
});
</script>

<style lang="scss" scoped>
.file-input-container {
    cursor: pointer;
    border: 1px dashed $text-black-color;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

