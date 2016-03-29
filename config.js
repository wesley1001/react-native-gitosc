/**
 * Created by rplees on 3/10/16.
 */
var config = {
    'userAgent': 'ReactNative GIT@OSC',
}

const constant = {
    code_push: {
        STAGING_KEY : "dLhV8nYL7syV0OPIOrCwbnKSwNEY4k55Guhpl",
        PRODUCTION_KEY : "bpmwzaJmrsqlu_pMHgmzdep8no7b4k55Guhpl",
    },
    scene: {
        project: {key: "project", value: "项目"},
        famous: {key: "famous", value: "发现"},
        personal: {key: "personal", value: "Me"},
        login: {key: "login", value: "登陆"},
        search: {key: "search", value: "搜索项目"},
        create_issue: {key: "create_issue", value: "创建Issue"},
        shake: {key: "shake", value: "摇一摇"},
        feedback: {key: "feedback", value: "意见反馈"},
        settings: {key: "settings", value: "设置"},
        my_profile: {key: "my_profile", value: "我的资料"},
        repo_detail: {key: "repo_detail", value: "项目详情"},
        web: {key: "web", value: "web"},
    }
}
module.exports = config;
module.exports.constant = constant;
