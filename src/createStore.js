/**
 * Created by yangxun on 16/12/7.
 */
"use strict";
import {createStore} from 'redux';


class Store{
    constructor(){
        this.store = null;
    }

    init(...args){
        //this.store = store;
        this.store = createStore(...args);
    }

    subscribe(callback){
        return this.store.subscribe(callback);
    }
}

var store = new Store();

function _createStore(...args){
    store.init(...args);
}

exports.createStore = _createStore;
exports.Store = store;



