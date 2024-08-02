import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')