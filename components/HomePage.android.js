/*
	HomePage
*/
'use strict'

var React = require('react-native');
var PersonalPage = require('./PersonalPage');
var HomeContent = require('./HomeContent');

var {
	ToolbarAndroid,
	StyleSheet,
	View,
	ToastAndroid,
	Text,
	DrawerLayoutAndroid,
	Dimensions,
} = React;

var toolbarActions = [
  {title: '搜索', show: 'always', icon: require('image!search_icon')},
  {title: '个人', show: 'always', icon: require('image!person_icon')},
];

var DRAWER_WIDTH_LEFT = 56;
var DEVICE_WIDTH = Dimensions.get('window').width;

//home page component
var HomePage = React.createClass({
	
	//show drawer page
	renderPersonView: function(){
		return <PersonalPage />;
	},

	//on toobar item click
	onActionSelected: function(position){
		switch(position){
			case 1:
				this.drawer.openDrawer();
			break;
			default:
				var item = toolbarActions[position];
				ToastAndroid.show(item.title, ToastAndroid.SHORT);		
			break;
		}
	},

	//go~
	render: function(){
		return (
		<DrawerLayoutAndroid
		   ref={(_drawer) => {this.drawer = _drawer;}}
	        drawerWidth={DEVICE_WIDTH - DRAWER_WIDTH_LEFT}
	        keyboardDismissMode="on-drag"
	        drawerPosition={DrawerLayoutAndroid.positions.Right}
	        renderNavigationView={this.renderPersonView}>	
			<View style={styles.container}>
				<ToolbarAndroid
		            title="ZhihuBox"
		            titleColor="white"
		            style={styles.toolbar}
		            actions={toolbarActions}
		            onActionSelected={this.onActionSelected} />
				<HomeContent navigator={this.props.navigator}/>
			</View>
		</DrawerLayoutAndroid>
		);
	}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  toolbar: {
    backgroundColor: '#fb4746',
    height: 50,
  },
});

module.exports = HomePage;