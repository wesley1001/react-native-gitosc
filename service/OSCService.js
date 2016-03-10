/**
 * Created by rplees on 3/10/16.
 */
const config = require("../config");
const {EventEmitter} = require("events");
const React = require('react-native');
const DXRNUtils = require('../common/DXRNUtils');
const base64 = require('base-64');

const {
    AsyncStorage,
    Navigator,
    } = React;
const HTTP = "http://";
const HOST = "git.oschina.net/";
const API_VERSION = "api/v3/";// API版本
const BASE_URL = HTTP + HOST + API_VERSION;
const NO_API_BASE_URL = HTTP + HOST;
const PROJECTS = BASE_URL + "projects/";
const USER = BASE_URL + "user/";
const EVENT = BASE_URL + "events/";

class OSCService extends EventEmitter {
    constructor() {
        super();
    }

    baseApi() {
        return BASE_URL;
    }

    login(name, pwd) {
        name = "rplees.i.ly@gmail.com";
        pwd = "qwe6583381";

        let bytes = name.trim() + ':' + pwd.trim();
        let encoded = base64.encode(bytes);

        let loginUrl = BASE_URL + "session" + "?email=" + name +"&password=" + pwd;
        return fetch(loginUrl, {
            method: 'POST',
            headers: {
                'authorization': 'Basic ' + encoded,
                'user-agent': config.userAgent,
                'content-type': 'application/json; charset=utf-8'
            },
        }).then(response => {
            const isValid = response.status < 400;
            const body = response._bodyInit;

            console.log(isValid + ":" + body);
            return body;
        });
    }
}

const _OSCService = new OSCService();
module.exports = _OSCService;