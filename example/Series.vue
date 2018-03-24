<template>
  <div id="app">
    <div v-for="serie in series" v-bind:key="serie.name">
      <h1>{{serie.name}}</h1>    
      <h2>S{{serie.season}}E{{serie.episode}}</h2>    
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import store from './store';

const { store: serieStore, mapGetters } = store.mapModule('series');

export default Vue.extend({
  name: 'Series',
  mounted() {
    serieStore.dispatch('getSeries');
  },
  computed: {
    ...mapGetters(['series']),
  },
});
</script>
