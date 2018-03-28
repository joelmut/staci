import * as Vuex from 'vuex/types';
import { Vue, VueConstructor } from 'vue/types/vue';
import { createStore, createGetters, createMutations, createActions } from '.';

// Global Types
export type Values<T> = { [K in keyof T]: T[K] };
export type Key<T> = keyof T;
export type KeyValue<T> = { [x: string]: Key<T> };

export interface Payload<T> {
  type: keyof T;
}

export interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}

// Getters

export type Getters<T> = { [K in keyof T]: any };

export type GetterTree<S, G, RS = any> = {
  [P in keyof G]: (
    state: S,
    getters: G,
    rootState: RS,
    rootGetters: any,
  ) => G[P]
};

export type MapGetter<S, G, RS = any> = {
  [P in keyof G]: (
    state: S,
    getters: Values<G>,
    rootState: RS,
    rootGetters: any,
  ) => G[P]
};

// Actions

export interface ActionContext<S, RS, G, A, M> {
  dispatch: Dispatch<A>;
  commit: Commit<M>;
  state: S;
  getters: Getters<G>;
  rootState: RS;
  rootGetters: any;
}

export type ActionHandler<S, RS, G, A, M> = {};

export interface ActionObject<S, RS, G, A, M> {
  root?: boolean;
  handler: ActionHandler<S, RS, G, A, M>;
}

export type ActionTree<S, G, A, M, RS = any> = MapAction<S, G, A, M, RS>;

export type MapAction<S, G, A, M, RS = any> = {
  [P in keyof A]: (
    injectee: ActionContext<S, RS, G, A, M>,
    payload: any,
  ) => A[P]
};

// Mutations
export type MutationTree<S, M> = MapMutation<S, M>;

export type MapMutation<S, M> = {
  [P in keyof M]: (state: S, payload: any) => M[P]
};

export interface Dispatch<T> {
  (type: Payload<T>, options?: Vuex.DispatchOptions): Promise<any>;
  (type: keyof T, payload?: any, options?: Vuex.DispatchOptions): Promise<any>;
}

export interface Commit<T> {
  (type: Payload<T>, options?: Vuex.CommitOptions): void;
  (type: keyof T, payload?: any, options?: Vuex.CommitOptions): void;
}

export interface MutationPayload<T> extends Payload<T> {
  payload: any;
}

export interface Store<S, G, A, M> {
  readonly state: S;
  readonly getters: Getters<G>;

  replaceState(state: S): void;

  dispatch(type: Payload<A>, options?: Vuex.DispatchOptions): Promise<any>;
  dispatch(
    type: keyof A,
    payload?: any,
    options?: Vuex.DispatchOptions,
  ): Promise<any>;

  commit(type: Payload<M>, options?: Vuex.DispatchOptions): void;
  commit(type: keyof M, payload?: any, options?: Vuex.DispatchOptions): void;

  subscribe<P extends MutationPayload<M>>(
    fn: (mutation: P, state: S) => any,
  ): () => void;
  watch<T>(
    getter: (state: S) => T,
    cb: (value: T, oldValue: T) => void,
    options?: WatchOptions,
  ): () => void;

  registerModule<T>(
    path: string,
    module: Vuex.Module<T, S>,
    options?: Vuex.ModuleOptions,
  ): void;
  registerModule<T>(
    path: string[],
    module: Vuex.Module<T, S>,
    options?: Vuex.ModuleOptions,
  ): void;

  unregisterModule(path: string): void;
  unregisterModule(path: string[]): void;

  hotUpdate(options: {
    actions?: Vuex.ActionTree<S, S>;
    mutations?: Vuex.MutationTree<S>;
    getters?: Vuex.GetterTree<S, S>;
    modules?: Vuex.ModuleTree<S>;
  }): void;
}

export interface Mappers<Store2 extends Values<Store2>> {
  store: Store<
    Store2['state'],
    Store2['getters'],
    Store2['actions'],
    Store2['mutations']
  >;
  mapState(
    state: Key<Store2['state']>[] | KeyValue<Store2['state']>,
  ): Vuex.Dictionary<Vuex.Computed>;
  mapGetters(
    getters: Key<Store2['getters']>[] | KeyValue<Store2['getters']>,
  ): Vuex.Dictionary<Vuex.Computed>;
  mapMutations(
    mutations: Key<Store2['mutations']>[] | KeyValue<Store2['mutations']>,
  ): Vuex.Dictionary<Vuex.MutationMethod>;
  mapActions(
    actions: Key<Store2['actions']>[] | KeyValue<Store2['actions']>,
  ): Vuex.Dictionary<Vuex.ActionMethod>;
  namespace<N extends Key<Store2['modules']>>(
    namespace: N,
  ): Mappers<Store2['modules'][N]>;
}

export interface Staci {
  createStore: typeof createStore;
  createGetters: typeof createGetters;
  createMutations: typeof createMutations;
  createActions: typeof createActions;
}
