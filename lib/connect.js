/**
 * Created by yangxun on 16/12/6.
 */
"use strict";

var _createStore = require('./createStore');

var PAGE_STATICS = {
    'setProps': true
};

module.exports = function (stateMap, propsMap) {
    stateMap = stateMap || function (state, props) {
        return {};
    };
    propsMap = propsMap || function (dispatch) {
        return {};
    };

    function copyFunction(target, source, name) {
        target[name] = function () {
            var _source$name;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            (_source$name = source[name]).call.apply(_source$name, [this].concat(args));
        };
    }

    return function (Page) {
        var page = new Page();

        var connect = {
            onUnload: function onUnload() {
                this._unsubscribe();

                page.onUnload && page.onUnload.call(this);
            },
            onLoad: function onLoad(options) {
                var _this = this;

                var props = stateMap(_createStore.Store.store.getState(), options);
                var actions = propsMap(_createStore.Store.store.dispatch);
                //this.data.props = Object.assign({}, props, actions);
                this.setData({ props: Object.assign({}, props, actions) });
                this._unsubscribe = _createStore.Store.store.subscribe(function () {
                    _this.setProps(stateMap(_createStore.Store.store.getState(), options));
                });
                page.onLoad && page.onLoad.call(this, options);
            },
            setProps: function setProps(props) {
                this.setData({ props: Object.assign({}, this.data.props || {}, props || {}) });
            }
        };

        var keys = Object.getOwnPropertyNames(page);

        for (var i = 0; i < keys.length; ++i) {
            if (keys[i] == 'data') {
                connect[keys[i]] = page[keys[i]];
            } else if (!PAGE_STATICS[keys[i]]) {
                try {
                    //connect[keys[i]] = page[keys[i]];
                    copyFunction(connect, page, keys[i]);
                } catch (error) {}
            }
        }

        return connect;
    };
};