// Import createApp dari Vue
import { createApp } from 'vue';
import App from './App.vue';

// Router
import router from './router';

// PrimeVue
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; // Tema bisa disesuaikan
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// PrimeVue Components Registration
import { registerPrimeVueComponents } from './plugins/primevue';

// Buat instance aplikasi Vue
const app = createApp(App);

// Gunakan PrimeVue dengan ripple effect
app.use(PrimeVue, { ripple: true });

// Registrasi komponen PrimeVue secara global
registerPrimeVueComponents(app);

// Gunakan router
app.use(router);

// Mount aplikasi ke DOM
app.mount('#app');
