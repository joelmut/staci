import * as VuexTypes from 'vuex/types';
import { MapGetter, MapAction, MapMutation, Values, Mappers, Staci } from './staci-types';
export declare const createGetters: <S, RS = any>(state: S, rootState?: RS) => <G>(getters: MapGetter<S, G, RS> | VuexTypes.GetterTree<S, RS>) => MapGetter<S, G, RS>;
export declare const createActions: <S, G, M, RS = any>(state: S, getters: G, mutations: M, rootState?: RS) => <A>(actions: MapAction<S, G, A, M, RS> | VuexTypes.ActionTree<S, RS>) => MapAction<S, G, A, M, RS>;
export declare const createMutations: <S>(state: S) => <M>(mutations: VuexTypes.MutationTree<S> | MapMutation<S, M>) => MapMutation<S, M>;
export declare const createStore: <S extends Values<S>>(store: S, vuexStore: VuexTypes.Store<S>) => Mappers<S>;
declare const Staci: Staci;
export default Staci;
