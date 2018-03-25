"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vuex_1 = require("vuex");
var VuexTypes = require("vuex/types");
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
    var vuexStore = new VuexTypes.Store(store);
    var st = new Store(vuexStore);
    return {
        store: st,
        mapState: function (state) {
            return name ? vuex_1.mapState(name, state) : vuex_1.mapState(state);
        },
        mapGetters: function (getters) {
            return name
                ? vuex_1.mapGetters(name, getters)
                : vuex_1.mapGetters(getters);
        },
        mapActions: function (actions) {
            return name
                ? vuex_1.mapActions(name, actions)
                : vuex_1.mapActions(actions);
        },
        mapMutations: function (mutations) {
            return name
                ? vuex_1.mapMutations(name, mutations)
                : vuex_1.mapMutations(mutations);
        },
        mapModule: function (namespace) {
            return exports.createStore(store['modules'][namespace]);
        },
    };
};
exports.install = function (Vue) { return Vue.use({ install: vuex_1.install }); };
