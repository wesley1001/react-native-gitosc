/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Color');

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
    render() {
        let signIndicator;
        if (Platform.OS === "android") {
            signIndicator = (<ProgressBarAndroid style={styles.indicator} styleAttr="Small"/>);
        } else if (Platform.OS == "ios") {
            signIndicator = (<ActivityIndicatorIOS style={styles.indicator} size="small"/>);
        }

        return (
            <View style = {styles.container}>
                <View style = {[styles.loginContainer, {marginTop: 64}]}>
                    <View style = {[styles.top]}>
                        <Text style = {styles.introText}>Sign in to Git OSC</Text>
                        {signIndicator}
                    </View>

                    <View>
                        <Text>Username</Text>
                        <TextInput
                        />
                        <Text>password</Text>
                        <TextInput
                            secureTextEntry={true}
                        />

                        <TouchableHighlight>
                            <Text style={[{textAlign:"center"}]}>Sign</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    indicator: {
        position:"absolute",
        right: 10,
        top: 10,
    },
    top: {
        backgroundColor:Colors.blue,
        flexDirection:"row",
        height: 38.0,
        borderRadius: 2,
        alignItems:"center",
    },
    introText:{
        fontSize: 18,
        fontWeight:'bold',
        marginLeft:18,
    },

    container: {
        backgroundColor:Colors.white,
    },

    loginContainer: {
        height: 250,
        marginTop: 64,
        margin: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: Colors.borderColor,
    },
});
module.exports = LoginComponent;