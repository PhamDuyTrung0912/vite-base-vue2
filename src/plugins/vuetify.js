import Vue from 'vue';
import Vuetify from 'vuetify';
import fr from 'vuetify/es5/locale/fr';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { fr },
        current: 'fr',
    },
    theme: {
        themes: {
            light: {
                primary: '#ffd166',
                secondary: '#ffd166',
                published: '#413939',
                primary2: '#f2f0f0',
                draft: '#fcf8e3',
                color_rejected: '#d30628',
                color_under_investigation: '#F98C45',
            },
        },
    },
});
