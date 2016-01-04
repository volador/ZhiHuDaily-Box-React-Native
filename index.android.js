/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackAndroid,
  Navigator,
} = React;

var WelcomePage = require('./components/WelcomePage');
var HomePage = require('./components/HomePage');
var StoryListPage = require('./components/StoryListPage');
var StoryDetailPage = require('./components/StoryDetailPage');

//handle hardware back btn
var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var ZhihuBox = React.createClass({
  
  //init state, check if show webcome page
  getInitialState: function(){
    return {
        showWelcomePage: false
    };
  },

  //welcome page animate finish
  onFinishWelcomePage: function(){
    this.setState({showWelcomePage: false});
  },

  //router setting
  router: function(route, navigator){
    _navigator = navigator;
    switch(route.name){
      case 'Home':
        return <HomePage navigator={navigator} />;
      break;
      case 'StoryListPage':
        return <StoryListPage theme={route.theme} navigator={navigator} />;
      break;
      case 'StoryDetailPage':
        var theme = route.theme ? route.theme : {name: '今日看点'};
        return <StoryDetailPage theme={theme} story={route.story} navigator={navigator} />;
      break;
      default: //404
        return <Text>unknow page :(</Text>;
      break;
    }
  },

  //go~
  render: function() {
    if(this.state.showWelcomePage){
      //show welcome page
      return <WelcomePage onFinish={this.onFinishWelcomePage}/>;
    }else{
      //ok,let navigator to control
      return <Navigator
        initialRoute={{name: "Home"}}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this.router}/>;
    }
  }
});

AppRegistry.registerComponent('ZhihuBox', () => ZhihuBox);