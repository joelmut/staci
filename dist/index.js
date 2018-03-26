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
exports.createStore = function (store) {
    var vuexStore = new Vuex.Store(store);
    return {
        store: new Store(vuexStore),
        mapState: function (state) {
            return Vuex.mapState(state);
        },
        mapGetters: function (getters) {
            return Vuex.mapGetters(getters);
        },
        mapMutations: function (mutations) {
            return Vuex.mapMutations(mutations);
        },
        mapActions: function (actions) {
            return Vuex.mapActions(actions);
        },
        namespace: function (namespace) {
            return exports.createStore(store['modules'][namespace]);
        },
    };
};
exports.install = function (Vue) { return Vue.use({ install: Vuex.install }); };
exports.default = {
    install: exports.install,
    createStore: exports.createStore,
    createActions: exports.createActions,
    createGetters: exports.createGetters,
    createMutations: exports.createMutations,
};
