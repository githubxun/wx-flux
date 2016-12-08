/**
 * Created by yangxun on 16/12/6.
 */
"use strict";
import {Store} from './createStore';

const PAGE_STATICS = {
    'setProps': true
};

module.exports = function(stateMap, propsMap){
    stateMap = stateMap || function(state, props){return {}};
    propsMap = propsMap || function(dispatch){return {}};

    function copyFunction(target, source, name){
        target[name] = function(...args){
            source[name].call(this, ...args);
        }
    }

    return function(Page){
        let page = new Page();

        let connect = {
            onUnload: function(){
                this._unsubscribe();

                page.onUnload && page.onUnload.call(this);
            },
            onLoad(options){
                var props = stateMap(Store.store.getState(), options);
                var actions = propsMap(Store.store.dispatch);
                //this.data.props = Object.assign({}, props, actions);
                this.setData(Object.assign({}, props, actions));
                this._unsubscribe = Store.store.subscribe(() =>{
                    this.setProps(stateMap(Store.store.getState(), options));
                });
                page.onLoad && page.onLoad.call(this, options);
            },
            setProps(props){
                this.setData(Object.assign({}, this.data.props||{}, props||{}));
            }
        };

        let keys = Object.getOwnPropertyNames(page);

        for (let i = 0; i < keys.length; ++i) {
            if(keys[i] == 'data'){
                connect[keys[i]] = page[keys[i]];
            }
            else if (!PAGE_STATICS[keys[i]]) {
                try {
                    //connect[keys[i]] = page[keys[i]];
                    copyFunction(connect, page, keys[i]);
                } catch (error) {

                }
            }
        }

        return connect;
    }
};