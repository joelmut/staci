import * as VuexTypes from 'vuex/types';
import { Store as IStore, MapGetter, MapAction, MapMutation } from './staci-types';
export declare const createGetters: <S, RS = any>(state: S, rootState?: RS) => <G>(getters: MapGetter<S, G, RS> | VuexTypes.GetterTree<S, RS>) => MapGetter<S, G, RS>;
export declare const createActions: <S, G, M, RS = any>(state: S, getters: G, mutations: M, rootState?: RS) => <A>(actions: MapAction<S, G, A, M, RS> | VuexTypes.ActionTree<S, RS>) => MapAction<S, G, A, M, RS>;
export declare const createMutations: <S>(state: S) => <M>(mutations: VuexTypes.MutationTree<S> | MapMutation<S, M>) => MapMutation<S, M>;
export declare type Values<T> = {
    [K in keyof T]: T[K];
};
export declare type Key<T> = keyof T;
export interface Mappers<Store extends Values<Store>> {
    store: IStore<Store['state'], Store['getters'], Store['actions'], Store['mutations']>;
    mapState(state: Key<Store['state']>[]): VuexTypes.Dictionary<VuexTypes.Computed>;
    mapGetters(getters: Key<Store['getters']>[]): VuexTypes.Dictionary<VuexTypes.Computed>;
    mapMutations(mutations: Key<Store['mutations']>[]): VuexTypes.Dictionary<VuexTypes.MutationMethod>;
    mapActions(actions: Key<Store['actions']>[]): VuexTypes.Dictionary<VuexTypes.ActionMethod>;
    namespace<N extends Key<Store['modules']>>(namespace: N): Mappers<Store['modules'][N]>;
}
export declare const createStore: <S extends Values<S>>(store: S) => Mappers<S>;
export declare const install: (Vue: any) => any;
