/**
 * Created by rplees on 13-12-26.
 */
const Log = {
    log(m){
        if (arguments.length > 1) { //有参数
            for (var i = 1; i < arguments.length; i++) {
                if (m.indexOf("%s") > -1) {
                    m = m.replace("%s", arguments[i]);
                } else {
                    m = m.replace("{}", arguments[i]);
                }
            }
        }
        console.log(m);
    },

    info(m){
        if (arguments.length > 1) { //有参数
            for (var i = 1; i < arguments.length; i++) {
                if (m.indexOf("%s") > -1) {
                    m = m.replace("%s", arguments[i]);
                } else {
                    m = m.replace("{}", arguments[i]);
                }
            }
        }
        console.log(m);
    },

    debug(m){
        if (arguments.length > 1) { //有参数
            for (var i = 1; i < arguments.length; i++) {
                if (m.indexOf("%s") > -1) {
                    m = m.replace("%s", arguments[i]);
                } else {
                    m = m.replace("{}", arguments[i]);
                }
            }
        }
        console.debug(m);
    },

    warn(m){
        if (arguments.length > 1) { //有参数
            for (var i = 1; i < arguments.length; i++) {
                if (m.indexOf("%s") > -1) {
                    m = m.replace("%s", arguments[i]);
                } else {
                    m = m.replace("{}", arguments[i]);
                }
            }
        }
        console.log('[warn]' + m);
    },

    error(m){
        if (arguments.length > 1) { //有参数
            for (var i = 1; i < arguments.length; i++) {
                if (m.indexOf("%s") > -1) {
                    m = m.replace("%s", arguments[i]);
                } else {
                    m = m.replace("{}", arguments[i]);
                }
            }
        }
        console.log('[error]' + m);
    }
}

module.exports = Log;