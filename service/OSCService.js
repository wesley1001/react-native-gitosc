/**
 * Created by rplees on 3/10/16.
 */
const config = require("../config");
const {EventEmitter} = require("events");
const React = require('react-native');
const DXRNUtils = require('../utils/DXRNUtils');
const base64 = require('base-64');
const Utils = require('../utils/Utils');
const L = require('../utils/Log');
const User = require('../entity/User');
//const crypto = require('crypto');
//const Buffer = require('Buffer');
const {
    AsyncStorage,
    Navigator,
    Alert,
    } = React;

const HTTP = "http://";
const HOST = "git.oschina.net/";
const API_VERSION = "api/v3/";// API版本
const BASE_URL = HTTP + HOST + API_VERSION;
const NO_API_BASE_URL = HTTP + HOST;
const PROJECTS = BASE_URL + "projects/";
const USER = BASE_URL + "user/";
const EVENT = BASE_URL + "events/";

var GLOBAL_USER = Object.create(User);
class OSCService extends EventEmitter {

    constructor() {
        super();
    }

    isSelf(id) {
        return GLOBAL_USER.id === id;
    }
    /**
     * 获取语言列表
     * {
     * "created_at": "2013-08-01T22:39:56+08:00",
        "detail": null,
        "id": 5,
        "ident": "Java",
        "name": "Java",
        "order": 4,
        "parent_id": 1,
        "projects_count": 43479,
        "updated_at": "2013-08-01T22:39:56+08:00"
     * }
     */
    getLanguageList() {
        return this.fetchPromise(PROJECTS + "languages");
    }
    /**
     * 根据语言的ID获得项目的列表
     */
    getLanguageProjectList(languageId, page) {
        let url = PROJECTS + "languages/" + languageId + "?page=" + page;
        return this.fetchPromise(url);
    }

    getRandomProject() {
        return this.fetchPromise(PROJECTS + "random", "GET", {luck: 1})
    }
    getPersonalProjects(uId, page) {
        return this.fetchPromise(USER + uId + "/" + "projects?page=" + page);
    }
    getPersonalEvents(uId, page) {
        return this.fetchPromise(EVENT + "user" + "/" + uId + "?page=" + page);
    }

    getMyEvents(page) {
        return this.fetchPromise(EVENT + "?page=" + page);
    }

    getPersonalStarProjects(uId, page) {
        return this.fetchPromise(USER + uId + "/stared_projects?page=" + page);
    }
    getPersonalWatchProjects(uId, page) {
        return this.fetchPromise(USER + uId + "/watched_projects?page=" + page);
    }


    starProject(projectId){
        return this.fetchPromise(PROJECTS + projectId + "/star", "POST");
    }
    unStarProject(projectId){
        return this.fetchPromise(PROJECTS + projectId + "/unstar", "POST");
    }
    watchProject(projectId){
        return this.fetchPromise(PROJECTS + projectId + "/watch", "POST");
    }
    unWatchProject(projectId){
        return this.fetchPromise(PROJECTS + projectId + "/unwatch", "POST");
    }

    getExploreLatestProject(page = 1) {
        return this.fetchPromise(PROJECTS + "latest?page=" + page);
    }
    getExploreFeaturedProject(page = 1) {
        return this.fetchPromise(PROJECTS + "featured?page=" + page);
    }
    getExplorePopularProject(page = 1) {
        return this.fetchPromise(PROJECTS + "popular?page=" + page);
    }
    getProject(id) {
        return this.fetchPromise(PROJECTS + id);
    }

    feedback(title, message) {
        let param = {
            description : message,
            title : title,
            assignee_id : 355540,
            milestone_id : "",
        };

        return this.fetchPromise(PROJECTS + "142148/issues", "GET", param);
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
        return this.fetchPromise(BASE_URL + "session", "POST", param)
            .then(json => {
                Object.assign(GLOBAL_USER, json);
                this.__saveUser2Disk();
                return GLOBAL_USER;
            });
    }

    packagePathWithToken(path) {
        if(this.isLogined()) {
            let split = path.indexOf("?") > -1 ? "&": "?";
            path += split + "private_token=" + GLOBAL_USER.private_token;
        }

        return path;
    }
    fetchPromise(path, method="GET", param) {
        if(param) {
            path += (path.indexOf("?") > -1 ? "&" : "?");
            path += Utils.JsonUtils.encode(param);
        }
        let url = this.packagePathWithToken(path);
        L.debug("准备请求地址:{}", url);
        return fetch(url, {
            method: method,
            headers: {
                'User-Agent': config.userAgent,
                'Accept': 'application/json; charset=utf-8'
            },
        }).then(response => {
            const isValid = response.status < 400;
            L.debug("请求地址:{}, 返回值:{},是否成功:{}-{}", path, response._bodyInit, response.status,isValid);
            const json = JSON.parse(response._bodyInit);
            if (isValid) {
                return json;
            } else {
                if(json.message.indexOf("Unauthorized") > -1) {
                    Alert.alert(
                        "Oops",
                        '鉴权失败,请先重新登陆'
                    );
                }
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

    logout(cb) {
        GLOBAL_USER = Object.create(User);
        AsyncStorage.removeItem("_osc_user_");

        cb && cb();

        this.emit('didLogout');//TODO Test
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

    checkNeedLoginWithPromise(promiseFunc, navigator) {
        if (!this.isLogined()) {
            navigator.push({
                id: 'login',
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                title: 'Action need login',
                nextPromiseFunc: promiseFunc,
            });
        } else {
            return promiseFunc();
        }
    }
}

const _OSCService = new OSCService();
module.exports = _OSCService;
module.exports.GLOBAL_USER = GLOBAL_USER;