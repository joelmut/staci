"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vuex = require("vuex");
exports.createGetters = (state, rootState) => (getters) => getters;
exports.createActions = (state, getters, mutations, rootState) => (actions) => actions;
exports.createMutations = (state) => (mutations) => mutations;
class Store {
    constructor(store, name = '') {
        this.store = store;
        this.name = name;
        this.replaceState = state => this.store.replaceState(state);
        this.subscribe = (fn) => this.store.subscribe(fn);
        this.watch = (getter, cb, options) => this.store.watch(getter, cb, options);
        this.registerModule = (path, module, options) => this.store.registerModule(path, module, options);
        this.unregisterModule = path => this.store.unregisterModule(path);
        this.hotUpdate = options => this.store.hotUpdate(options);
    }
    get state() {
        const state = this.store.state;
        const keys = Object.keys(state).filter(e => e.startsWith(this.name));
        if (this.name) {
            return keys.reduce((result, key) => (Object.assign({}, result, { [key.replace(`${this.name}/`, '')]: state[key] })), {});
        }
        else {
            return state;
        }
    }
    get getters() {
        const getters = this.store.getters;
        const keys = Object.keys(getters).filter(e => e.startsWith(this.name));
        if (this.name) {
            return keys.reduce((result, key) => (Object.assign({}, result, { [key.replace(`${this.name}/`, '')]: getters[key] })), {});
        }
        else {
            return getters;
        }
    }
    dispatch(type, payload, options) {
        return typeof type === 'string'
            ? this.store.dispatch(this.name ? `${this.name}/${type}` : type, payload, options)
            : this.store.dispatch(this.name ? Object.assign({}, type, { type: `${this.name}/${type}` }) : type, options);
    }
    commit(type, payload, options) {
        return typeof type === 'string'
            ? this.store.commit(name ? `${name}/${type}` : type, payload, options)
            : this.store.commit(name ? Object.assign({}, type, { type: `${name}/${type}` }) : type, options);
    }
}
const _createStore = (store, vuexStore, name) => {
    return {
        store: new Store(vuexStore, name),
        mapState(state) {
            const _state = state;
            return name ? Vuex.mapState(name, _state) : Vuex.mapState(_state);
        },
        mapGetters(getters) {
            const _getters = getters;
            return name ? Vuex.mapGetters(name, _getters) : Vuex.mapGetters(_getters);
        },
        mapMutations(mutations) {
            const _mutations = mutations;
            return name
                ? Vuex.mapMutations(name, _mutations)
                : Vuex.mapMutations(_mutations);
        },
        mapActions(actions) {
            const _actions = actions;
            return name ? Vuex.mapActions(name, _actions) : Vuex.mapActions(_actions);
        },
        namespace(namespace) {
            return _createStore(store['modules'][namespace], vuexStore, namespace);
        },
    };
};
exports.createStore = (store, vuexStore) => _createStore(store, vuexStore);
const Staci = {
    createStore: exports.createStore,
    createActions: exports.createActions,
    createGetters: exports.createGetters,
    createMutations: exports.createMutations,
};
exports.default = Staci;
//# sourceMappingURL=index.js.map