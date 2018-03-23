import * as Vuex from 'vuex';
import { Store as IStore, MapGetter, MapAction, MapMutation } from './index.d';

export const mapStore = <S, G = any, M = any, RS = any>() => ({
  getters: <G>(getters: Vuex.GetterTree<S, RS> | MapGetter<S, G, RS>) =>
    getters as MapGetter<S, G, RS>,
  actions: <A>(actions: Vuex.ActionTree<S, RS> | MapAction<S, G, A, M, RS>) =>
    actions as MapAction<S, G, A, M, RS>,
  mutations: <M>(mutations: Vuex.MutationTree<S> | MapMutation<S, M>) =>
    mutations as MapMutation<S, M>,
});

class Store<S, G, A, M> implements IStore<S, G, A, M> {
  constructor(private store: Vuex.Store<S>) {}

  get state() {
    return this.store.state;
  }

  get getters() {
    return this.store.getters;
  }

  replaceState = state => this.store.replaceState(state);

  private getType = type => (type.type ? type.type : type);

  dispatch(payloadWithType, options?);
  dispatch(type, payload?, options?) {
    return this.store.dispatch(this.getType(type), payload, options);
  }

  commit(payloadWithType, options?);
  commit(type, payload?, options?) {
    return this.store.commit(this.getType(type), payload, options);
  }

  subscribe = (fn: (mutation, state) => any) => this.store.subscribe(fn);

  watch = (getter: (state) => any, cb: (value, oldValue) => void, options?) =>
    this.store.watch(getter, cb, options);

  registerModule = (path, module, options?) =>
    this.store.registerModule(path, module, options);

  unregisterModule = path => this.store.unregisterModule(path);

  hotUpdate = options => this.store.hotUpdate(options);
}

type Values<T> = { [K in keyof T]: T[K] };

export const createStore = <S extends Values<S>>(store: S) => {
  type State = S['state'];
  type Getters = S['getters'];
  type Actions = S['actions'];
  type Mutations = S['mutations'];
  type Modules = S['modules'];
  type StateKeys = keyof State;
  type GettersKeys = keyof Getters;
  type ActionsKeys = keyof Actions;
  type MutationsKeys = keyof Mutations;
  type ModulesKeys = keyof Modules;
  type KeyValue<T> = { [x: string]: T };

  const vuexStore = new Vuex.Store<State>(store);
  const st = new Store<State, Getters, Actions, Mutations>(vuexStore) as IStore<
    State,
    Getters,
    Actions,
    Mutations
  >;
  return {
    store: st,
    mapState: (state: StateKeys[] | KeyValue<StateKeys>) =>
      name ? Vuex.mapState(name, state as any) : Vuex.mapState(state as any),
    mapGetters(getters: GettersKeys[] | KeyValue<GettersKeys>) {
      return name
        ? Vuex.mapGetters(name, getters as any)
        : Vuex.mapGetters(getters as any);
    },
    mapActions(actions: ActionsKeys[] | KeyValue<ActionsKeys>) {
      return name
        ? Vuex.mapActions(name, actions as any)
        : Vuex.mapActions(actions as any);
    },
    mapMutations: (mutations: MutationsKeys[] | KeyValue<MutationsKeys>) =>
      name
        ? Vuex.mapMutations(name, mutations as any)
        : Vuex.mapMutations(mutations as any),
    mapModule: <N extends ModulesKeys>(namespace: N) =>
      createStore(store['modules'][namespace] as Modules[N]),
  };
};
