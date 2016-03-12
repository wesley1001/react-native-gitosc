/**
 * Created by rplees on 3/10/16.
 */
const config = require("../config");
const {EventEmitter} = require("events");
const React = require('react-native');
const DXRNUtils = require('../common/DXRNUtils');
const base64 = require('base-64');
const Utils = require('../common/Utils');
const L = require('../common/Log');
const User = require('../entity/User');

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

const GLOBAL_USER = Object.create(User);
class OSCService extends EventEmitter {

    constructor() {
        super();
    }
    onBoard(name) {
        Object.assign(GLOBAL_USER, {name:name, username: name});
        this.__saveUser2Disk();
        //TODO:获取用户的基本信息(头像-用户名等)
        return new Promise(function(resolve){
            resolve(GLOBAL_USER);
        })
    }
    login(name, pwd) {
        pwd = "qwe6583381";
        let param = {email: name, password: pwd};
        console.log(Utils.JsonUtils.encode(param));

        let encoded = base64.encode(name.trim() + ':' + pwd.trim());

        let loginUrl = BASE_URL + "session?" + Utils.JsonUtils.encode(param);
        return fetch(loginUrl, {
            method: 'POST',
            headers: {
                'authorization': 'Basic ' + encoded,
                'user-agent': config.userAgent,
                'content-type': 'application/json; charset=utf-8'
            },
        }).then(response => {
            const isValid = response.status < 400;
            const json = JSON.parse(response._bodyInit);

            if (isValid) {
                Object.assign(GLOBAL_USER, json);
                this.__saveUser2Disk();
                return GLOBAL_USER;
            } else {
                throw new Error(json.message, response.status);
            }
        });
    }

    getUserFromCache() {
        //AsyncStorage.removeItem("_osc_user_");
        return AsyncStorage.getItem("_osc_user_")
            .then((result) => {
                if (result) {
                    L.info("getUserFromCache>OSC user:{}", result);
                    Object.assign(GLOBAL_USER, JSON.parse(result));
                }
                return GLOBAL_USER;
            }).catch(err => {
                L.info('getUserFromCache err is: ' + err);
            });
    }

    //如果用户没登陆,但输入了用户名 则user.username也会有值的.
    isOnBoard() {
        return GLOBAL_USER.username.length > 0;
    }

    isLogined() {
        return this.isOnBoard() && GLOBAL_USER.private_token.length > 0;
    }

    __saveUser2Disk() {
        L.info("__saveUser2Disk:{}", GLOBAL_USER)
        AsyncStorage.setItem("_osc_user_", JSON.stringify(GLOBAL_USER));
    }
}

const _OSCService = new OSCService();
module.exports = _OSCService;