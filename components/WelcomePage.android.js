/*
	welcome page
	@date 20151227
*/
'use strict'

var React = require('react-native');
var Storage = require('./Storage');

var {
	Component,
	Image,
	Dimensions,
	StyleSheet,
	Text,
	Animated,
	View,
} = React;

//get device width
var WINDOW_WIDTH = Dimensions.get('window').width;

//webcome page component
var WelcomePage = React.createClass({
	
	//animate & start image setting
	getInitialState: function(){
		return {
			bounceValue: new Animated.Value(0),
			startImage: 'http://i.imgur.com/XMKOH81.jpg', //default start image
			imageText: '@voladorzhang',
		};
	},

	//update start image & start animate
	componentDidMount: function(){
		
		//fetch start image
		Storage.load({
		    key: 'startImage',
		}).then( imgObj => {
			this.setState({
				startImage: imgObj.img,
				imageText: imgObj.text,
			});
		}).catch( err => {
			//do nothing, use default setting
		});

		//start animated
		this.state.bounceValue.setValue(1);
		Animated.timing(
			this.state.bounceValue,
			{
				toValue: 1.3,
				duration: 10000
			}
		).start(this.props.onFinish);
	},

	//go~
	render: function(){
		return (
			<View style={styles.container}>
				<Animated.Image
					source={{uri: this.state.startImage}}
					style={[
						styles.background, 
						{transform: [
							{scale: this.state.bounceValue}
						]}
					]}/>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{this.state.imageText}</Text>
				</View>
			</View>
		);
	}

});

//component styles
var styles = StyleSheet.create({
	container: {
	    flex: 1,
	    flexDirection: 'column',
	},
	textContainer: {
		position: 'absolute',
		bottom: 0,
		flex: 1,
		height: 100,
		width: WINDOW_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',			
	},
	background: {
		flex: 1,
		width: WINDOW_WIDTH,
		height: 1,
	},
	text: {
		color: '#fff',
		fontSize: 26,
		fontStyle: 'italic',
	}
});

module.exports = WelcomePage;