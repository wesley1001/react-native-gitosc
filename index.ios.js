/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require("react-native");
const LoginComponent = require("./components/LoginComponent");
const OnBoardComponent = require("./components/OnBoardComponent");
const RootTab = require("./components/RootTab");
const CommonComponents = require("./common/CommonComponents");
const OSCService = require("./service/OSCService");
const L = require('./common/Log');

const {
    AppRegistry,
    } = React;

const LoginState = {
  pending: 0,
  onBoard: 1,
  unOnBoard: 2,
  needLogin: 3,
}

const OSCGit = React.createClass({
  getInitialState() {
    return {loginState: LoginState.pending}
  },

  componentWillMount() {
    OSCService.getUserFromCache()
        .then(u => {
          let state = OSCService.isOnBoard() ? LoginState.onBoard : LoginState.unOnBoard;
          this.setState({loginState: state});
        })

    OSCService.addListener('didLogout', () => {
      console.log("didLogout listenered.");
      this.setState({
        loginState: LoginState.unOnBoard,
      });
    });
  },

  componentDidMount() {

  },

  componentWillUnmount: function() {
    console.log("componentWillUnmount didLogout remove.");
    OSCService.removeListener('didLogout');
  },

  didOnBoard(o, needLogin){
    let lst = o == null ? LoginState.unOnBoard : LoginState.onBoard;
    if (needLogin) lst = LoginState.needLogin;
    this.setState({
      loginState: lst,
    });
  },

  render() {
    let cp;
    //L.info("render:{}", this.state.loginState)
    switch (this.state.loginState) {
      case LoginState.pending:
        cp = CommonComponents.renderLoadingView();
        break;
      case LoginState.onBoard:
        cp = <RootTab />;
        break;
      case LoginState.unOnBoard:
        //cp = <RootTab forceSelectedTab={0} />;
        cp = <OnBoardComponent didOnBoard={this.didOnBoard}/>;
        break;
      case LoginState.needLogin:
        cp = <LoginComponent didLogin={() => {
                    this.setState({loginState: LoginState.onBoard});
                    }}
        />;
        break;
    }
    return cp;
  }
});
AppRegistry.registerComponent('OSCGit', () => OSCGit);
