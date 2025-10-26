import App from '@/App.vue';
import { registerPlugins } from '@core/utils/plugins';
import { createApp } from 'vue';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// Styles
import '@core-scss/template/index.scss';
import '@layouts/styles/index.scss';
import '@styles/styles.scss'; 
import i18n from './plugins/i18n'; 
import VueSimpleAlert from "vue3-simple-alert";

const options = {
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
};
// Create vue app
const app = createApp(App)

// Register Vue Toastification
app.use(Toast, options) 
app.use(VueSimpleAlert, {
  reverseButtons: true, 
});

// Register plugins 
registerPlugins(app)

// Mount vue app
app.mount('#app') 
