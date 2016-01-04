'use strict'

var React = require('react-native');

var {
	View,
	Text,
	Image,
	Dimensions,
	PixelRatio,
	TouchableHighlight,
	TouchableOpacity,
	ToastAndroid,
	StyleSheet,
} = React;

var DEVICE_SMALLEST_WIDTH = 1/PixelRatio.get();
var DEVICE_WIDTH = Dimensions.get('window').width;

var OnePage = React.createClass({
	renderHeader: function(){
		return (
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>{this.props.theme.name}</Text>
				<View style={styles.headerLine}/>
			</View>
		);
	},

	_renderTextItem: function(itemData){
		return (
			<View 
 				style={styles.textItemContainer}>
 				<Text 
	 				numberOfLines={2}
	 				style={styles.textItemTitle}>{itemData.title}</Text>
 				<Text style={styles.textItemSubTitle}>{itemData.from}</Text>
 			</View>
		);
	},
	_renderImageItem: function(itemData){
		return (
			<Image
		        source={{uri: itemData.image}}
		        style={{
		        		width: DEVICE_WIDTH,
		        		flex: 1,
		        }} >
			        <View style={styles.imageItemContainer}>
			        		<Text 
				        		numberOfLines={2}
				        		style={styles.imageItemTitle}>{itemData.title}</Text>
			        </View>
		     </Image>
		);
	},

	selectStory: function(story){
		this.props.navigator.push({
			name: 'StoryDetailPage',
			story: story,
			theme: this.props.theme,
		});
	},

	_renderItem: function(itemData){
		if(itemData.showImg){
			return (
				<TouchableOpacity 
					style={{flex: 1}} 
					onPress={() => {this.selectStory(itemData)}}>
					{this._renderImageItem(itemData)}
				</TouchableOpacity>
			);
		}else{
			return (
				<TouchableHighlight
					onPress={()=>{this.selectStory(itemData)}} 
					style={{
						flex: 1,
					}}
					underlayColor='#e8e8e8'>
						{this._renderTextItem(itemData)}
				</TouchableHighlight>
			);
		}
	},

	//rowData maybe obj or array
	_renderRow: function(rowData){
		if(rowData instanceof Array){

			//generate row list
			var rowKey = 'row-';
			var RowItems = rowData.map(itemData => {
				rowKey = rowKey + itemData.id;
				return (
     				<View 
     					key={itemData.id}
	     				style={{
	     					flex: 1,
	     				}}>
     					{this._renderItem(itemData)}
     				</View>
     			);
			});

			return (
				<View 
					key={rowKey}
					style={{
						flex: 1,
			        		width: DEVICE_WIDTH,
			        		flexDirection: 'row',
			     	}}>
			     	{RowItems}
			     </View>
			);
		}else{
			var flexNum = rowData.showImg ? 2 : 1;
			return (
				<View 
					key={rowData.id}
					style={{
						flex: flexNum,
					}}>
					{this._renderItem(rowData)}
				</View>
			);
		}
	},

	/*
		maybe
			[
				'1',
				['2','3'],
				'4',
				['5','6']
			]
		or maybe
			[
				['1','2'],
				'3',
				'4',
				['5','6']
			]
	*/
	renderContent: function(contentData){
		return (
			<View style={{
				flex: 1,
				backgroundColor: 'white',
			}}>
				{
					contentData.map(this._renderRow)
				}
			</View>
		);
	},
	render: function(){
		var PageHeader = this.renderHeader();
		var PageContent = this.renderContent(this.props.contentData);
		return (
			<View style={{
				flex: 1,
			}}>
				{PageHeader}
				{PageContent}
			</View>
		);
	}
});

var styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: 'white',
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '3a4e74',
	},
	headerLine: {
		flex: 1,
		borderColor: '3a4e74',
		borderWidth: 1.5,
		marginTop: 12,
		marginLeft: 20,
	},
	textItemContainer: {
		flex: 1,
		borderBottomWidth: DEVICE_SMALLEST_WIDTH,
		borderRightWidth: DEVICE_SMALLEST_WIDTH,
		borderColor: 'efefef',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
	},
	textItemTitle: {
		fontSize: 18,
		color: '#333333',
	},
	textItemSubTitle: {
		color: '#bcbcbc'
	},
	imageItemContainer: {
    		flex: 1,
    		justifyContent: 'flex-end',
    		alignItems: 'flex-start',
    		padding: 15,
    },
    imageItemTitle: {
			color: 'white',
			fontSize: 18,
	}
});

module.exports = OnePage;