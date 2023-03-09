import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { defineCustomElements } from '@ionic/pwa-elements/loader';

createApp(App).mount('#app')

// Call the element loader after the app has been rendered the first time
defineCustomElements(window);