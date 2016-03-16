/**
 * Created by rplees on 3/16/16.
 */
const React = require('react-native');
const Icon = require('react-native-vector-icons/Ionicons');
const Colors = require('../common/Colors');
const Platform = require('Platform');

const {
    StyleSheet,
    WebView,
    View,
    TouchableOpacity,
    Text,
    Image,
    ActionSheetIOS,
    ProgressBarAndroid,
    ActivityIndicatorIOS
    } = React;


const WebComponent = React.createClass({
    _debugTime: 0,

    PropTypes: {
        webURL: React.PropTypes.string,
        param: React.PropTypes.object,
    },

    getInitialState() {
        let url = this.props.webURL;
        if (url && !url.match(/^[a-zA-Z]+:\/\//)) {
            url = 'http://' + url;
        }

        return {
            URL: url,
            backAble: false,
            forwardAble: false,
            refreshAble: false,
        }
    },

    onNavigationStateChange(e) {
        console.log(e.url + 'loading takes' + (Date.now() - this._debugTime) / 1000 + 's');
        this._debugTime = Date.now();

        const title = e.title;
        let url = e.url;
        this.setState({
            URL: url,
            backAble: e.canGoBack,
            forwardAble: e.canGoForward,
            refreshAble: !e.loading && title.length > 0
        });
    },

    onShare() {
        DXRNUtils.trackClick('clickWebShare', {name: 'web 点击分享:' + this.state.URL});
        const message = '';

        ActionSheetIOS.showShareActionSheetWithOptions({
                message: message,
                url: this.state.URL,
            },
            () => {},
            () => {});
    },

    componentWillMount() {
        this._debugTime = Date.now();

        this.props.route.onShare = this.onShare;
    },

    renderLoading() {
        if (Platform.OS === 'android') {
            return (
                <View style={styles.container}>
                    <ProgressBarAndroid styleAttr="Inverse" style='Large'/>
                </View>
            )
        } else if (Platform.OS === 'ios') {
            return (
                <View style={styles.container}>
                    <ActivityIndicatorIOS size="large" />
                </View>
            );
        }
    },

    render() {
        console.log('render web');
        let topInset = 64;
        let webToolBar;
        if (this.state.backAble || this.state.forwardAble) {
            webToolBar = (
                <WebToolBar
                    goBack={() => this.webView.goBack()}
                    goForward={() => this.webView.goForward()}
                    onRefresh={() => this.webView.reload()}
                    backAble={this.state.backAble}
                    forwardAble={this.state.forwardAble}
                    refreshAble={this.state.refreshAble}
                />
            )
        }

        return (
            <View style={{flex: 1}}>
                <WebView
                    ref={(webView) => this.webView = webView}
                    styles={{flex: 1}}
                    source={{uri: this.state.URL}}
                    onNavigationStateChange={this.onNavigationStateChange}
                    //injectedJavaScript={hideJS}
                    automaticallyAdjustContentInsets={false}
                    contentInset={{top: topInset, left: 0, bottom: 49, right: 0}}
                    renderLoading={this.renderLoading}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}>
                </WebView>
                {webToolBar}
            </View>
        )
    },
});


const iconSize = 30;
const WebToolBar = React.createClass({
    PropTypes: {
        goBack: React.PropTypes.func,
        goForward: React.PropTypes.func,
        onRefresh: React.PropTypes.func,
        backAble: React.PropTypes.bool,
        forwardAble: React.PropTypes.bool,
        refreshAble: React.PropTypes.bool,
    },

    goBack() {
        this.props.backAble && this.props.goBack && this.props.goBack();
    },

    goForward() {
        this.props.forwardAble && this.props.goForward && this.props.goForward();
    },

    onRefresh() {
        this.props.refreshAble && this.props.onRefresh && this.props.onRefresh();
    },

    render() {
        const backOpacity = this.props.backAble ? 0.5 : 1.0;
        const backColor = this.props.backAble ? Colors.blue : 'lightGray';

        const forwardOpacity = this.props.forwardAble ? 0.5 : 1.0;
        const forwardColor = this.props.forwardAble ? Colors.blue : 'lightGray';

        const refreshOpacity = this.props.refreshAble ? 0.5 : 1.0;
        const refreshColor = this.props.refreshAble ? Colors.blue : 'lightGray';

        let bottom = 49;
        if (Platform.OS === 'android') {
            bottom = 0;
        }

        return (
            <View style={[styles.webViewToolBar, {bottom: bottom}]}>
                <View style={styles.webLeft}>
                    <TouchableOpacity
                        style={{marginRight: 15}}
                        onPress={this.props.goBack}
                        activeOpacity={backOpacity}>
                        <Icon
                            name='android-arrow-back'
                            size={iconSize}
                            style={styles.icon}
                            color={backColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginLeft: 15}}
                        onPress={this.props.goForward}
                        activeOpacity={forwardOpacity}>
                        <Icon
                            name='android-arrow-forward'
                            size={iconSize}
                            style={styles.icon}
                            color={forwardColor}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{marginRight: 15}}
                    onPress={this.props.onRefresh}
                    activeOpacity={refreshOpacity}>
                    <Icon
                        name='android-refresh'
                        size={iconSize}
                        style={styles.icon}
                        color={refreshColor}
                    />
                </TouchableOpacity>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    leftAction: {
        padding: 3,
        backgroundColor: "#F2F2F2",
        flexDirection: 'row'
    },
    rightAction: {
        padding: 3,
        backgroundColor: "white",
    },
    actionText: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    webViewToolBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: 40,
        position: 'absolute',
        left: 0,
        bottom: 49,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    webLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    icon: {
        width: iconSize,
        height: iconSize,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = WebComponent;