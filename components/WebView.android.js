/*
	export native webview ui component
*/
'use strict'

var React = require('react-native');

var {
	requireNativeComponent,
	PropTypes,
	View,
} = React;

var ReactNativeViewAttributes = require('ReactNativeViewAttributes');

var WebView = React.createClass({
	propTypes: {
		...View.propTypes,  //extends view proptypes
		url: PropTypes.string,
		html: PropTypes.string,
		css: PropTypes.string,
		onScrollChange: PropTypes.func,
	},
	onChange: function(event){
		if(this.props.onScrollChange){
			this.props.onScrollChange(event.nativeEvent.ScrollX,event.nativeEvent.ScrollY);
		}
	},
	render: function(){
		return (
			<ReactWebView {...this.props} onChange={this.onChange}/>
		);
	}
});

var ReactWebView = requireNativeComponent('ReactWebView', WebView, {
	nativeOnly: {onChange: true}
});

module.exports = WebView;