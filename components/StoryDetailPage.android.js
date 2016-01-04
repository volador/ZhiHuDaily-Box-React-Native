'use strict'

var React = require('react-native');

var WebView = require('./WebView');
var DetailToolbar = require('./DetailToolbar');
var LoadingPage = require('./LoadingPage');
var Storage = require('./Storage');

var {
	View,
	Text,
	StyleSheet,
	Image,
} = React;

var StoryDetailPage = React.createClass({
	getInitialState: function() {
		return({
			loading: true,
			detail: null,
		});
	},
	componentDidMount: function() {
		var storyId = this.props.story.id;
    		this.fetchStroyDetail(storyId);
  	},
	fetchStroyDetail: function(storyId) {
		
		Storage.load({
		    key: 'story',
		    id: storyId,
		    syncInBackground: false
		}).then( ret => {
		    //如果找到数据，则在then方法中返回
		    this.setState({
		     	loading: false,
		     	detail: ret,
		    });
		}).catch( err => {          
		    //如果没有找到数据且没有同步方法，
		    //或者有其他异常，则在catch中返回
		    console.warn(err);
		});

	},
	generateDetailHtml: function(detail){
		var styles = detail.css;
		var themeName = this.props.theme.name;
		console.log(detail);
		if(!('body' in detail) || detail.body == ''){
			detail.body = 'No data, 404 page should be here. :(';
		}

		return (
"<!DOCTYPE html>"+
"<html>"+
" <head>"+
styles.map(function(css_href){
return " 	<link rel='stylesheet' type='text/css' href='"+css_href+"'/>";
})+
" 	<style type='text/css'>"+
" 		body{"+
" 			background: #f9f9f9;"+
" 		}"+
" 		.headline{"+
" 			display: none;"+
" 		}"+
" 		.native-header-line{"+
" 			background: #405376;"+
"    		height: 3px;"+
" 		}"+
" 		.native-header{"+
" 			padding: 0 20px!important;"+
" 			position: relative;"+
" 		}"+
" 		.native-header .title{"+
" 			border-bottom: 1px solid #e8e8e8;"+
" 			padding-top: 35px;"+
"    		padding-bottom: 15px;"+
" 		}"+
" 		.native-header .title span{"+
" 			color: #444;"+
" 			font-weight: 700;"+
" 			font-size: 24px;"+
" 		}"+
" 		.native-header .theme{"+
" 			position: absolute;"+
"		    top: 0;"+
"		    left: 20px;"+
"		    font-size: 14px;"+
"		    padding: 2px 10px;"+
"		    background: #405376;"+
"		    color: white;"+
" 		}"+
" 	</style>"+
" </head>"+
" <body>"+
"	<div class='native-header-line'></div>"+
"	<div class='native-header'>"+
"			<div class='title'>"+
"				<span>"+detail.title+"</span>"+
"			</div>"+
"			<span class='theme'>"+themeName+"</span>"+
"	</div>"+
detail.body+
" </body>"+
"</html>"
		);
	},
	render: function(){

		if(this.state.loading){
			return <LoadingPage/>
		}

		var html = this.generateDetailHtml(this.state.detail);
		return (
		  <View style={{
		  	flex: 1,
		  }}>
		    	<WebView
			     style={styles.content}
			     html={html}/>
		     <DetailToolbar
		      	navigator={this.props.navigator} 
		      	style={styles.detailToolbar}/>
		  </View>
		);
	}
});

var styles = StyleSheet.create({
	content: {
      	flex: 1,
      	position: "absolute",
      	top: 0,
      	left: 0,
      	right: 0,
      	bottom: 42,
     },
     detailToolbar: {
	      	flex: 1,
	      	position: "absolute",
	      	left: 0,
	      	right: 0,
	      	bottom: 0,
	      	backgroundColor: "#405376",
      }
});

module.exports = StoryDetailPage;
