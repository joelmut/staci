import {
  createStore,
  createGetters,
  createMutations,
  createActions,
} from '../src';

import { ActionTree } from '../src/index.d';

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
  getSeries(context) {
    context.commit('loadSeries');
    context.dispatch('getSeries');
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

export default createStore(mainStore);
