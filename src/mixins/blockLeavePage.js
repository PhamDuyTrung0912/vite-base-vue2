export default {
    methods: {
        handleBeforeUnload(event) {
            event.preventDefault();
            event.returnValue = true;
        },
    },

    created() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    },

    beforeDestroy() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
};
