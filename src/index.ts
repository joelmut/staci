import * as VuexTypes from 'vuex/types';
import * as Vuex from 'vuex';
import {
  Store as IStore,
  MapGetter,
  MapAction,
  MapMutation,
  Values,
  Mappers,
} from './staci-types';
import Vue, { VueConstructor } from 'vue';

export const createGetters = <S, RS = any>(state: S, rootState?: RS) => <G>(
  getters: MapGetter<S, G, RS> | VuexTypes.GetterTree<S, RS>,
) => getters as MapGetter<S, G, RS>;

export const createActions = <S, G, M, RS = any>(
  state: S,
  getters: G,
  mutations: M,
  rootState?: RS,
) => <A>(actions: MapAction<S, G, A, M, RS> | VuexTypes.ActionTree<S, RS>) =>
  actions as MapAction<S, G, A, M, RS>;

export const createMutations = <S>(state: S) => <M>(
  mutations: VuexTypes.MutationTree<S> | MapMutation<S, M>,
) => mutations as MapMutation<S, M>;

class Store<S, G, A, M> implements IStore<S, G, A, M> {
  constructor(private store: VuexTypes.Store<S>) {}

  get state() {
    return this.store.state;
  }

  get getters() {
    return this.store.getters;
  }

  replaceState = state => this.store.replaceState(state);

  dispatch(type, options?);
  dispatch(type, payload?, options?) {
    return typeof type === 'string'
      ? this.store.dispatch(type, payload, options)
      : this.store.dispatch(type, options);
  }

  commit(type, options?);
  commit(type, payload?, options?) {
    return typeof type === 'string'
      ? this.store.commit(type, payload, options)
      : this.store.commit(type, options);
  }

  subscribe = (fn: (mutation, state) => any) => this.store.subscribe(fn);

  watch = (getter: (state) => any, cb: (value, oldValue) => void, options?) =>
    this.store.watch(getter, cb, options);

  registerModule = (path, module, options?) =>
    this.store.registerModule(path, module, options);

  unregisterModule = path => this.store.unregisterModule(path);

  hotUpdate = options => this.store.hotUpdate(options);
}

export const _createStore = <S extends Values<S>>(
  store: S,
  name?: string,
): Mappers<S> => {
  type State = S['state'];
  type Getters = S['getters'];
  type Actions = S['actions'];
  type Mutations = S['mutations'];

  return {
    store: new Store<State, Getters, Actions, Mutations>(
      new Vuex.Store<State>(store),
    ),
    mapState(state) {
      return name ? Vuex.mapState(name, state) : Vuex.mapState(state);
    },
    mapGetters(getters) {
      return name ? Vuex.mapGetters(name, getters) : Vuex.mapGetters(getters);
    },
    mapMutations(mutations) {
      return name
        ? Vuex.mapMutations(name, mutations)
        : Vuex.mapMutations(mutations);
    },
    mapActions(actions) {
      return name ? Vuex.mapActions(name, actions) : Vuex.mapActions(actions);
    },
    namespace(namespace) {
      return _createStore(store['modules'][namespace], namespace);
    },
  };
};

export const createStore = <S extends Values<S>>(store: S): Mappers<S> =>
  _createStore(store);

export const install = Vue => Vue.use({ install: Vuex.install });

export default {
  install,
  createStore,
  createActions,
  createGetters,
  createMutations,
};
