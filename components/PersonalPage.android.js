/*
	Personal Page
*/
'use strict'

var React = require('react-native');

var {
	ListView,
	View,
	Text,
	PixelRatio,
	TouchableHighlight,
	StyleSheet,
} = React;

var PersonalPage = React.createClass({
	getInitialState: function(){
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => false
		});
		var options = ['好友分享','消息中心', '我的玩乐', '推送资讯', '积分活动', '我的收藏'];
		return {
			dataSource: dataSource.cloneWithRows(options)
		};
	},
	renderHeader: function(){
		return (
			<View style={styles.headerContainer}>
				<View style={styles.headerLogoContainer} >
					<View style={styles.headerLogoInnerTop}/>
					<View style={styles.headerLogoInnerBottom}/>

				</View>
				<View style={{
					marginTop: 10,
					marginBottom: 30
				}}>
					<Text style={{
						color: 'white',
						fontSize: 16
					}}>登录体验更多功能</Text>	
				</View>
			</View>
		);
	},
	renderRow: function(row){
		return(
			<TouchableHighlight underlayColor='#e8e8e8'>
				<View style={styles.rowContainer}>
					<Text style={{
						color: '#5b5b5b'
					}}>{row}</Text>
				</View>
			</TouchableHighlight>
		);
	},
	render: function(){
		return (
			<View style={{
				flex: 1,
			}} {...this.props}>
				<ListView
			          ref="personallistview"
			          dataSource={this.state.dataSource}
			          renderRow={this.renderRow}
			          renderHeader={this.renderHeader}
			          style={{flex:1, backgroundColor: 'white'}}
			   	/>
			</View>		
		);
	}
});

var styles = StyleSheet.create({
	headerContainer: {
		flex: 1,
		backgroundColor: '#fb4746',
		flexDirection: 'column',
		alignItems: 'center',
	},
	headerLogoContainer: {
		width: 64,
		height: 64,
		borderRadius: 100,
		backgroundColor: '#fde291',
		marginTop: 60,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	headerLogoInnerTop: {
		width: 20,
		height: 20,
		borderRadius: 100,
		backgroundColor: '#fef7db',
	},
	headerLogoInnerBottom: {
		width: 30,
		height: 30,
		borderRadius: 50,
		backgroundColor: '#fef7db',
	},
	rowContainer: {
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		borderBottomWidth: 1 / PixelRatio.get(),
		borderBottomColor: '#e8e8e8',
	}
});

module.exports = PersonalPage;