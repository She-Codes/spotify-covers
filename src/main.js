import { createApp } from 'vue'
import Root from './App.vue'
import { firestorePlugin } from 'vuefire'

const app = createApp(Root)
//app.use(firestorePlugin)
app.mount('#app')