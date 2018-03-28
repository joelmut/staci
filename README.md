# Staci - [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/joelmut/staci/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/staci.svg)](https://www.npmjs.com/package/staci)

Staci is a library built on top of vuex that provide a simple way to get type checking

## Install

```bash
  npm install staci
  yarn add staci
```

## Preview

![](https://i.imgur.com/ttAYj2j.gif)

## Example (in example folder)

#### store.ts

```typescript
import {
  createStore,
  createGetters,
  createMutations,
  createActions,
} from 'staci';
import Staci from 'staci';

// Use it as a plugin, like always
Vue.use(Vuex);

// Data

const seriesData: Serie[] = [
  { name: 'The Flash', season: 4, episode: 6 },
  { name: 'Arrow', season: 5, episode: 2 },
  { name: 'Altered Carbon', season: 1, episode: 8 },
];

// Types

interface Serie {
  name: string;
  season: number;
  episode: number;
}

interface SerieState {
  series: Serie[];
}

// Store

const state: SerieState = {
  series: [],
};

const getters = createGetters(state)({
  series: state => state.series,
});

const mutations = createMutations(state)({
  loadSeries(state, series) {
    state.series = series;
  },
});

const actions = createActions(state, getters, mutations)({
  getSeries({ commit }) {
    commit('loadSeries');
    return seriesData;
  },
});

const seriesModule = {
  state,
  getters,
  actions,
  mutations,
};

const mainStore = {
  modules: {
    series: seriesModule,
  },
};

// Create the Vuex.Store to later register it in Vue

export const store = new Vuex.Store(mainStore);

// createStore returns all the functionality you need to interact with the store
export default createStore(mainStore);
```

#### index.ts

```typescript
import Vue from 'vue';

import Series from './Series.vue';
import { store } from './store';

new Vue({
  render: h => h(Series),
  // Register the store from Vuex.Store
  store,
  components: { Series },
}).$mount('#app');
```

#### Series.vue

```html
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
```

## Licence

MIT
