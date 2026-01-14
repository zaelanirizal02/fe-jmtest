import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

import PrimeVue from 'primevue/config';

import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { registerPrimeVueComponents } from './plugins/primevue';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
registerPrimeVueComponents(app);
app.use(router);

app.mount('#app');
