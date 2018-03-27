import * as VuexTypes from 'vuex/types';
import { MapGetter, MapAction, MapMutation, Values, Mappers } from './staci-types';
export declare const createGetters: <S, RS = any>(state: S, rootState?: RS) => <G>(getters: MapGetter<S, G, RS> | VuexTypes.GetterTree<S, RS>) => MapGetter<S, G, RS>;
export declare const createActions: <S, G, M, RS = any>(state: S, getters: G, mutations: M, rootState?: RS) => <A>(actions: MapAction<S, G, A, M, RS> | VuexTypes.ActionTree<S, RS>) => MapAction<S, G, A, M, RS>;
export declare const createMutations: <S>(state: S) => <M>(mutations: VuexTypes.MutationTree<S> | MapMutation<S, M>) => MapMutation<S, M>;
export declare const _createStore: <S extends Values<S>>(store: S, name?: string) => Mappers<S>;
export declare const createStore: <S extends Values<S>>(store: S) => Mappers<S>;
export declare const install: (Vue: any) => any;
declare const _default: {
    install: (Vue: any) => any;
    createStore: <S extends Values<S>>(store: S) => Mappers<S>;
    createActions: <S, G, M, RS = any>(state: S, getters: G, mutations: M, rootState?: RS) => <A>(actions: MapAction<S, G, A, M, RS> | VuexTypes.ActionTree<S, RS>) => MapAction<S, G, A, M, RS>;
    createGetters: <S, RS = any>(state: S, rootState?: RS) => <G>(getters: MapGetter<S, G, RS> | VuexTypes.GetterTree<S, RS>) => MapGetter<S, G, RS>;
    createMutations: <S>(state: S) => <M>(mutations: VuexTypes.MutationTree<S> | MapMutation<S, M>) => MapMutation<S, M>;
};
export default _default;
