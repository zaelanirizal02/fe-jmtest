import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Components
import { registerPrimeVueComponents } from './plugins/primevue'

const app = createApp(App)

app.use(PrimeVue, { ripple: true })
registerPrimeVueComponents(app)
app.use(router)

app.mount('#app')
