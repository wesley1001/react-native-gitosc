/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require("react-native");
const LoginComponent = require("./components/LoginComponent");
const OnBoardComponent = require("./components/OnBoardComponent");
const CommonComponents = require("./common/CommonComponents");
const OSCService = require("./service/OSCService");

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
    OSCService.addListener('didLogout', () => {
      this.setState({
        userState: LoginState.unOnBoard,
      });
    });
  },
  componentDidMount() {

  },

  componentWillUnmount: function() {
    OSCService.removeListener('didLogout');
  },
  didOnBoard(){

  },
  render() {
    let cp;
    switch (this.state.loginState) {
      case LoginState.pending:
          cp = CommonComponents.renderLoadingView();
            break;
      case LoginState.onBoard:
        //TODO main
        break;
      case LoginState.unOnBoard:
        cp = <OnBoardComponent didOnBoard={this.didOnBoard} />;
        break;
      case LoginState.needLogin:
        cp = <LoginComponent />;
        break;
    }
    return cp;
  }
});
AppRegistry.registerComponent('OSCGit', () => OSCGit);
