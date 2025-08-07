import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import Swal from 'sweetalert2';

loadFonts();

const app = createApp(App);

// Register Swal globally
app.config.globalProperties.$Swal = Swal;

app.use(router)
  .use(store)
  .use(vuetify)
  .mount('#app'); 

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import vuetify from './plugins/vuetify'
// import { loadFonts } from './plugins/webfontloader'
// import Swal from 'sweetalert2'

// loadFonts()

// createApp(App)
//   .use(router)
//   .use(store)
//   .use(vuetify)
//   .use(Swal)
//   .mount('#app')