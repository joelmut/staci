import * as Vuex from 'vuex';
import { Store as IStore, MapGetter, MapAction, MapMutation } from './staci-types';
export declare const createGetters: <S, RS = any>(state: S, rootState?: RS) => <G>(getters: MapGetter<S, G, RS> | Vuex.GetterTree<S, RS>) => MapGetter<S, G, RS>;
export declare const createActions: <S, G, M, RS = any>(state: S, getters: G, mutations: M, rootState?: RS) => <A>(actions: MapAction<S, G, A, M, RS> | Vuex.ActionTree<S, RS>) => MapAction<S, G, A, M, RS>;
export declare const createMutations: <S>(state: S) => <M>(mutations: Vuex.MutationTree<S> | MapMutation<S, M>) => MapMutation<S, M>;
export declare const createStore: <S extends {
    [K in keyof S]: S[K];
}>(store: S) => {
    store: IStore<S["state"], S["getters"], S["actions"], S["mutations"]>;
    mapState(state: {
        [x: string]: keyof S["state"];
    } | (keyof S["state"])[]): {
        [key: string]: () => any;
    };
    mapGetters(getters: {
        [x: string]: keyof S["getters"];
    } | (keyof S["getters"])[]): {
        [key: string]: () => any;
    };
    mapActions(actions: {
        [x: string]: keyof S["actions"];
    } | (keyof S["actions"])[]): {
        [key: string]: (...args: any[]) => Promise<any>;
    };
    mapMutations(mutations: {
        [x: string]: keyof S["mutations"];
    } | (keyof S["mutations"])[]): {
        [key: string]: (...args: any[]) => void;
    };
    mapModule<N extends keyof S["modules"]>(namespace: N): any;
};
export declare const install: (Vue: any) => any;
