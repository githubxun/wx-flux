/**
 * Created by yangxun on 16/12/6.
 */
"use strict";

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = exports.connect = undefined;

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _createStore = require('./createStore');

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.connect = _connect2['default'];
exports.createStore = _createStore.createStore;
exports.combineReducers = _redux.combineReducers;
exports.bindActionCreators = _redux.bindActionCreators;
exports.applyMiddleware = _redux.applyMiddleware;
exports.compose = _redux.compose;