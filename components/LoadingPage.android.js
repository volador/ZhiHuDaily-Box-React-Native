'use strict'

var React = require('react-native');

var {
	View,
	Image,
} = React;

var LoadingPage = React.createClass({
	render: function(){
		return (
			<View style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<Image 
				source={require('image!loading')}/>
			</View>
		);
	}
});

module.exports = LoadingPage;