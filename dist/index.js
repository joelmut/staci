"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vuex = require("vuex");
exports.createGetters = function (state, rootState) { return function (getters) { return getters; }; };
exports.createActions = function (state, getters, mutations, rootState) { return function (actions) {
    return actions;
}; };
exports.createMutations = function (state) { return function (mutations) { return mutations; }; };
var Store = /** @class */ (function () {
    function Store(store) {
        var _this = this;
        this.store = store;
        this.replaceState = function (state) { return _this.store.replaceState(state); };
        this.subscribe = function (fn) { return _this.store.subscribe(fn); };
        this.watch = function (getter, cb, options) {
            return _this.store.watch(getter, cb, options);
        };
        this.registerModule = function (path, module, options) {
            return _this.store.registerModule(path, module, options);
        };
        this.unregisterModule = function (path) { return _this.store.unregisterModule(path); };
        this.hotUpdate = function (options) { return _this.store.hotUpdate(options); };
    }
    Object.defineProperty(Store.prototype, "state", {
        get: function () {
            return this.store.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "getters", {
        get: function () {
            return this.store.getters;
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.dispatch = function (type, payload, options) {
        return typeof type === 'string'
            ? this.store.dispatch(type, payload, options)
            : this.store.dispatch(type, options);
    };
    Store.prototype.commit = function (type, payload, options) {
        return typeof type === 'string'
            ? this.store.commit(type, payload, options)
            : this.store.commit(type, options);
    };
    return Store;
}());
var _createStore = function (store, name) {
    return {
        store: new Store(new Vuex.Store(store)),
        mapState: function (state) {
            var _state = state;
            return name ? Vuex.mapState(name, _state) : Vuex.mapState(_state);
        },
        mapGetters: function (getters) {
            var _getters = getters;
            return name ? Vuex.mapGetters(name, _getters) : Vuex.mapGetters(_getters);
        },
        mapMutations: function (mutations) {
            var _mutations = mutations;
            return name
                ? Vuex.mapMutations(name, _mutations)
                : Vuex.mapMutations(_mutations);
        },
        mapActions: function (actions) {
            var _actions = actions;
            return name ? Vuex.mapActions(name, _actions) : Vuex.mapActions(_actions);
        },
        namespace: function (namespace) {
            return _createStore(store['modules'][namespace], namespace);
        },
    };
};
exports.createStore = function (store) {
    return _createStore(store);
};
var Staci = {
    createStore: exports.createStore,
    createActions: exports.createActions,
    createGetters: exports.createGetters,
    createMutations: exports.createMutations,
};
exports.default = Staci;
