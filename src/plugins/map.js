export default {
    install(Vue) {
        Vue.prototype.$map = {
            mapInstances: [],
            projection: null,
            getInstanceById(id) {
                return this.mapInstances.find((i) => i.getTarget() === id);
            },
            addInstance(instance) {
                const exist = this.mapInstances.some((i) => i.getTarget() === instance.getTarget());
                if (!exist) this.mapInstances.push(instance);
            },
            removeInstanceById(id) {},
            removeInstances() {
                this.mapInstances = [];
            },
        };
    },
};
