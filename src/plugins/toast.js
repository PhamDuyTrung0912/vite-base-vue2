import Vue from 'vue';
import Toast from '@/modules/toast/Toast.vue';

const initToast = () => {
    const ToastConstructor = Vue.extend(Toast);
    const toastInstance = new ToastConstructor();
    toastInstance.$mount(document.createElement('div'));
    document.body.appendChild(toastInstance.$el);
    toastInstance.$el.hidden = true;
    toastInstance.$on('clearToast', () => {
        toastInstance.$el.hidden = true;
    });
    return toastInstance;
};

const updatePropsData = (toastInstance, newPropsData) => {
    for (const prop in newPropsData) {
        if (Object.prototype.hasOwnProperty.call(newPropsData, prop)) {
            toastInstance.$props[prop] = newPropsData[prop];
        }
    }
};

const ToastPlugin = {
    install(Vue) {
        const toastInstance = initToast();

        Vue.prototype.$toast = {
            success(options) {
                toastInstance.$el.hidden = false;
                const newPropsData = { ...options, type: 'success', icon: 'mdi-check-circle', duration: 3000 };
                updatePropsData(toastInstance, newPropsData);
                toastInstance.showToast(() => {
                    toastInstance.$el.hidden = true;
                });
            },

            error(options) {
                toastInstance.$el.hidden = false;
                const newPropsData = { ...options, type: 'error', icon: 'mdi-alert-circle', duration: 3000 };
                updatePropsData(toastInstance, newPropsData);
                toastInstance.showToast(() => {
                    toastInstance.$el.hidden = true;
                });
            },

            warning(options) {
                toastInstance.$el.hidden = false;
                const newPropsData = { ...options, type: 'warning', icon: 'mdi-shield-alert', duration: 3000 };
                updatePropsData(toastInstance, newPropsData);
                toastInstance.showToast(() => {
                    toastInstance.$el.hidden = true;
                });
            },

            info(options) {
                toastInstance.$el.hidden = false;
                const newPropsData = { ...options, type: 'info', icon: 'mdi-information-slab-circle', duration: 3000 };
                updatePropsData(toastInstance, newPropsData);
                toastInstance.showToast(() => {
                    toastInstance.$el.hidden = true;
                });
            },
        };
    },
};

export default ToastPlugin;
