import * as VuexTypes from 'vuex/types';
import * as Vuex from 'vuex';
import {
  Store as IStore,
  MapGetter,
  MapAction,
  MapMutation,
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

export type Values<T> = { [K in keyof T]: T[K] };

export type Key<T> = keyof T;

export interface Mappers<Store extends Values<Store>> {
  store: IStore<
    Store['state'],
    Store['getters'],
    Store['actions'],
    Store['mutations']
  >;
  mapState(
    state: Key<Store['state']>[],
  ): VuexTypes.Dictionary<VuexTypes.Computed>;
  mapGetters(
    getters: Key<Store['getters']>[],
  ): VuexTypes.Dictionary<VuexTypes.Computed>;
  mapMutations(
    mutations: Key<Store['mutations']>[],
  ): VuexTypes.Dictionary<VuexTypes.MutationMethod>;
  mapActions(
    actions: Key<Store['actions']>[],
  ): VuexTypes.Dictionary<VuexTypes.ActionMethod>;
  namespace<N extends Key<Store['modules']>>(
    namespace: N,
  ): Mappers<Store['modules'][N]>;
}

export const createStore = <S extends Values<S>>(store: S): Mappers<S> => {
  type State = S['state'];
  type Getters = S['getters'];
  type Actions = S['actions'];
  type Mutations = S['mutations'];

  const vuexStore = new Vuex.Store<State>(store);
  const st = new Store<State, Getters, Actions, Mutations>(vuexStore) as IStore<
    State,
    Getters,
    Actions,
    Mutations
  >;

  return {
    store: st,
    mapState(state) {
      return Vuex.mapState(state);
    },
    mapGetters(getters) {
      return Vuex.mapGetters(getters);
    },
    mapMutations(mutations) {
      return Vuex.mapMutations(mutations);
    },
    mapActions(actions) {
      return Vuex.mapActions(actions);
    },
    namespace(namespace) {
      return createStore(store['modules'][namespace]);
    },
  };
};

export const install = Vue => Vue.use({ install: Vuex.install });
