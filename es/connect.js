/**
 * Created by yangxun on 16/12/6.
 */
"use strict";

import { store } from './createStore';

const PAGE_STATICS = {
    'onUnload': true,
    'setProps': true
};

const PROTECT_STATICS = {
    'onLoad': true,
    'onUnload': true
};

module.exports = function (stateMap, propsMap) {
    stateMap = stateMap || function (state, props) {
        return {};
    };
    propsMap = propsMap || function (dispatch) {
        return {};
    };

    function copyFunction(target, source, name) {
        target[name] = function (...args) {
            source[name].call(this, args);
        };
    }

    return function (Page) {
        let page = new Page();

        let connect = {
            onUnload: function () {
                this._unsubscribe();

                page.onUnload && page.onUnload.call(this);
            },
            onLoad(options) {
                var props = stateMap(store.getState(), options);
                var actions = propsMap(store.dispatch);
                //this.data.props = Object.assign({}, props, actions);
                this.setData({ props: Object.assign({}, props, actions) });
                this._unsubscribe = store.subscribe(() => {
                    this.setProps(stateMap(store.getState(), options));
                });
                page.onLoad && page.onLoad.call(this, options);
            },
            setProps(props) {
                this.setData({ props: Object.assign({}, this.data.props || {}, props || {}) });
            }
        };

        let keys = Object.getOwnPropertyNames(page);

        for (let i = 0; i < keys.length; ++i) {
            if (!PAGE_STATICS[keys[i]] && !PROTECT_STATICS[keys[i]] && /event$/.test(keys[i])) {
                try {
                    //connect[keys[i]] = page[keys[i]];
                    copyFunction(connect, page, keys[i]);
                } catch (error) {}
            }
        }

        return connect;
    };
};