const React = require('react-native');
const L = require('../common/Log');
const CommonComponents = require('../common/CommonComponents');
const RefreshListView = require('../common/RefreshListView');
const PropTypes = React.PropTypes;
const OSCService = require('../service/OSCService');
const ErrorPlaceholder = require('../common/ErrorPlacehoderComponent');
const Platform = require('Platform');

const {
    Navigator,
    StyleSheet,
    } = React;
const LISTVIEW_REF = 'listview';

const OSCRefreshListView = React.createClass({
    propTypes: {
        renderRow: PropTypes.func,
        reloadPromise: PropTypes.func,
        renderErrorPlaceholder: PropTypes.func,
    },
    getInitialState() {
        return {lastError: {isReloadError: false, error: ""}};
    },

    listViewOnRefresh(page, callback) {
        this.props.reloadPromise(page)
            .then(data => {
                let allLoaded = data && data.length < 1;
                callback(data, {allLoaded: allLoaded});
            }).catch(err => {
            const needLogin = err.message.indexOf('rate') != -1;
            if (needLogin) {
                this.props.navigator.push({
                    id: 'login',
                    title: 'API rate need login',
                    sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                });
            }

            this.setState({lastError: {isReloadError: true, error: err.message}});
        });
    },


    render() {
        if (this.state.lastError.isReloadError) {
            const error = this.state.lastError.error;
            if (this.props.renderErrorPlaceholder) {
                return this.props.renderErrorPlaceholder(error);
            } else {
                return (
                    <ErrorPlaceholder
                        title={error.message}
                        desc={'Oops, tap to reload'}
                        onPress={() => {
                  L.info("ErrorPlaceholder onPress 事件.{}", this.refs[LISTVIEW_REF]);
                  this.setState({lastError: {isReloadError: false, error: ""}});
                  //this.refs[LISTVIEW_REF].handleRefresh();
                }}/>
                );
            }
        }

        return <RefreshListView renderRow={this.renderRow}
                                ref={LISTVIEW_REF}
                                onRefresh={(page, callback) => this.listViewOnRefresh(page, callback)}
                                style={styles.listview}
                                {...this.props}
        />
    }

});

var styles = StyleSheet.create({
    listview: {
        marginBottom: 49,
    },
});

module.exports = OSCRefreshListView;