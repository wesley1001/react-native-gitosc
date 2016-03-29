/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const CommonStyles = require('../common/CommonStyles');
const DXRNUtils = require('../utils/DXRNUtils');
const ObjUtils = require('../utils/Utils').ObjUtils;
const OSCService = require('../service/OSCService');

const {
    StyleSheet,
    ActivityIndicatorIOS,
    View,
    Text,
    TouchableHighlight,
    TextInput,
    ProgressBarAndroid
    } = React;

const LoginComponent = React.createClass({
    PropTypes: {
        nextPromise: React.PropTypes.object.isRequired,
        didLogin: React.PropTypes.func,
    },

    getInitialState() {
        return {
            username:"rplees.i.ly@gmail.com",
            password:"**",
            logining:false,
            loginError:"",
        }
    },

    onUserNameChanged (text){
        this.setState({username: text});
    },

    onPwdChanged(text) {
        this.setState({password: text});
    },

    doLogin() {
        DXRNUtils.trackClick('clickUserLogin', {name: 'login页面用户登录'});
        if (this.state.logining) return;
        if(this.state.username.length == 0 || this.state.password.length == 0) {
            this.setState({logining: false, loginError: "Please input valid word."});
            return;
        }

        this.setState({
            logining: true,
            loginError: null,
        });

        OSCService.login(this.state.username, this.state.password)
        .then(user => {
            console.log("login :" + ObjUtils.toString(user));
            this.setState({
                logining: false,
                loginError: "",
            });

            this.props.navigator && this.props.navigator.pop();
            this.props.didLogin && this.props.didLogin();

            let nextPromise = this.props.nextPromise && this.props.nextPromise();
            return nextPromise;
        }).catch(err => {
            console.log('login error', err.message);

            this.setState({
                logining: false,
                loginError: err.message,
            });

            console.log('login state' + this.state.loginError);
        }).done(() => {
            console.log('login done');
            this.setState({
                logining: false,
            });
        });
    },

    render() {
        let signIndicator;
        let introComponent;

        if(this.state.logining) {
            if (Platform.OS === "android") {
                signIndicator = (<ProgressBarAndroid style={styles.indicator} styleAttr="Small"/>);
            } else if (Platform.OS == "ios") {
                signIndicator = (<ActivityIndicatorIOS style={styles.indicator} size="small"/>);
            }
        }

        if(this.state.loginError) {
            introComponent = <Text style = {[styles.introText, {color:Colors.red}]}>{this.state.loginError}</Text>;
        } else {
            introComponent =  <Text style = {styles.introText}>Sign in to Git OSC</Text>;
        }

        return (
        <View style = {styles.container}>
            <View style = {[styles.loginContainer]}>
                <View style = {[styles.top]}>
                    {introComponent}
                    {signIndicator}
                </View>

                <View style = {[styles.down]}>
                    <Text style = {[styles.textNP]}>Username</Text>
                    <TextInput
                        returnKeyType={'next'}
                        defaultValue={this.state.username}
                        style = {CommonStyles.textInput}
                        placeholder={'username'}
                        onChangeText={this.onUserNameChanged}
                    />
                    <Text style = {[styles.textNP]}>Password</Text>
                    <TextInput
                        returnKeyType={'done'}
                        onSubmitEditing={this.doLogin}
                        defaultValue={this.state.password}
                        style = {CommonStyles.textInput}
                        secureTextEntry={true}
                        placeholder={'password!)'}
                        onChangeText={this.onPwdChanged}
                    />

                    <TouchableHighlight style = {[CommonStyles.btn, {marginTop:10}]}
                                        onPress={this.doLogin}
                                        underlayColor = {Colors.backGray}
                        >
                        <Text style={[{textAlign:"center", color: Colors.white, fontWeight: "bold"}]}> Sign </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        backgroundColor:Colors.white,
    },

    loginContainer: {
        height: 270,
        marginTop: 64,
        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.blue,
    },

    indicator: {
        position:"absolute",
        right: 10,
        top: 10,
    },
    top: {
        backgroundColor:Colors.blue,
        flexDirection:"row",
        height: 38.0,
        alignItems:"center",
        borderRadius: 6,
    },

    introText:{
        fontSize: 18,
        fontWeight:'bold',
        marginLeft:18,
    },

    down: {
        margin:20,
        flexDirection:"column",
    },
    textNP: {
        fontSize:18,
        fontWeight:'bold',
        color:Colors.black,
    },
    textInput: {
        fontSize: 15,
        borderWidth: 1,
        height: 38,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 4,
        padding: 3,
        borderColor: Colors.blue,
    }
});
module.exports = LoginComponent;