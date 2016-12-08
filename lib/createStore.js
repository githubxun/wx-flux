/**
 * Created by yangxun on 16/12/7.
 */
"use strict";

var _redux = require("redux");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
    function Store() {
        _classCallCheck(this, Store);

        this.store = null;
    }

    Store.prototype.init = function init() {
        //this.store = store;
        this.store = _redux.createStore.apply(undefined, arguments);
    };

    Store.prototype.subscribe = function subscribe(callback) {
        return this.store.subscribe(callback);
    };

    return Store;
}();

var store = new Store();

function _createStore() {
    store.init.apply(store, arguments);
}

exports.createStore = _createStore;
exports.Store = store;