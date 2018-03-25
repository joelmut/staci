import * as Vuex from 'vuex';

// Global Types
type Values<T> = { [K in keyof T]: T[K] };

interface Payload<T> {
  type: keyof T;
}

interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}

// Getters

type Getters<T> = { [K in keyof T]: any };

export type GetterTree<S, G, RS = any> = {
  [P in keyof G]: (
    state: S,
    getters: G,
    rootState: RS,
    rootGetters: any,
  ) => G[P]
};

type MapGetter<S, G, RS = any> = {
  [P in keyof G]: (
    state: S,
    getters: Values<G>,
    rootState: RS,
    rootGetters: any,
  ) => G[P]
};

// Actions

interface ActionContext<S, RS, G, A, M> {
  dispatch: Dispatch<A>;
  commit: Commit<M>;
  state: S;
  getters: Getters<G>;
  rootState: RS;
  rootGetters: any;
}

type ActionHandler<S, RS, G, A, M> = {};

interface ActionObject<S, RS, G, A, M> {
  root?: boolean;
  handler: ActionHandler<S, RS, G, A, M>;
}

export type ActionTree<S, G, A, M, RS = any> = MapAction<S, G, A, M, RS>;

type MapAction<S, G, A, M, RS = any> = {
  [P in keyof A]: (
    injectee: ActionContext<S, RS, G, A, M>,
    payload: any,
  ) => A[P]
};

// Mutations
export type MutationTree<S, M> = MapMutation<S, M>;

type MapMutation<S, M> = { [P in keyof M]: (state: S, payload: any) => M[P] };

interface Dispatch<T> {
  (type: Payload<T>, options?: Vuex.DispatchOptions): Promise<any>;
  (type: keyof T, payload?: any, options?: Vuex.DispatchOptions): Promise<any>;
}

interface Commit<T> {
  (type: Payload<T>, options?: Vuex.CommitOptions): void;
  (type: keyof T, payload?: any, options?: Vuex.CommitOptions): void;
}

interface MutationPayload<T> extends Payload<T> {
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
