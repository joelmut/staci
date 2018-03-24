import Vue from 'vue';

import Series from './Series.vue';
import store from './store';

new Vue({
  render: h => h(Series),
  store: store.store,
  components: { Series },
}).$mount('#app');
