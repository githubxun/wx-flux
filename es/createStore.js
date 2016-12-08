/**
 * Created by yangxun on 16/12/7.
 */
"use strict";

import { createStore } from 'redux';

class Store {
    constructor() {
        this.store = null;
    }
    createStore(...args) {
        this.store = createStore(args);
    }

    subscribe(callback) {
        return this.store.subscribe(callback);
    }
}

module.exports = new Store();