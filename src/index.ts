import * as VuexTypes from 'vuex/types';
import * as Vuex from 'vuex';
import {
  Store as IStore,
  MapGetter,
  MapAction,
  MapMutation,
  Values,
  Mappers,
  Staci,
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

const _createStore = <S extends Values<S>>(
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
      const _state = state as any;
      return name ? Vuex.mapState(name, _state) : Vuex.mapState(_state);
    },
    mapGetters(getters) {
      const _getters = getters as any;
      return name ? Vuex.mapGetters(name, _getters) : Vuex.mapGetters(_getters);
    },
    mapMutations(mutations) {
      const _mutations = mutations as any;
      return name
        ? Vuex.mapMutations(name, _mutations)
        : Vuex.mapMutations(_mutations);
    },
    mapActions(actions) {
      const _actions = actions as any;
      return name ? Vuex.mapActions(name, _actions) : Vuex.mapActions(_actions);
    },
    namespace(namespace) {
      return _createStore(store['modules'][namespace], namespace);
    },
  };
};

export const createStore = <S extends Values<S>>(store: S): Mappers<S> =>
  _createStore(store);

const Staci: Staci = {
  createStore,
  createActions,
  createGetters,
  createMutations,
};

export default Staci;
