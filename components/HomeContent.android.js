/*
	Home Content
*/
'use strict'

var React = require('react-native');
var ViewPager = require('react-native-viewpager');
var Storage = require('./Storage');
var Loading = require('./LoadingPage');

var {
	ListView,
	View,
	ToastAndroid,
	Dimensions,
	Image,
	Text,
	PixelRatio,
	TouchableHighlight,
	TouchableOpacity,
	StyleSheet,
} = React;

var DEVICE_WIDTH = Dimensions.get('window').width;
var DEVICE_HEIGHT = Dimensions.get('window').height;
var DEVICE_SMALLEST_WIDTH = 1 / PixelRatio.get();

//轮播图
var HeaderPage = React.createClass({
	getInitialState: function(){
		var headerData = this.props.topStories;

		var headerDataSource = new ViewPager.DataSource({
			pageHasChanged: (page1, page2) => page1 !== page2
		});

		return {
			headerDataSource: headerDataSource.cloneWithPages(headerData),
		};
	},

	//on click item, jump to detail page
  	selectStory: function(story) {
		this.props.navigator.push({
			name: 'StoryDetailPage',
			story: story,
		});
	},

	//header img pager
	renderHeaderPage: function(pageData, pageId){
		return (
			<TouchableOpacity 
				style={{flex: 1}} 
				onPress={() => {this.selectStory(pageData)}}>
		     <Image
		        source={{uri: pageData.image}}
		        style={headerStyles.backgroundImage} >
			        <View style={headerStyles.textContainer}>
			        		<Text style={headerStyles.text}>{pageData.title}</Text>
			        </View>
		        	
		     </Image>
		     </TouchableOpacity>
		);
	},
	render: function(){
		return (
			<View {...this.props}>
		          <ViewPager
		            dataSource={this.state.headerDataSource}
		            renderPage={this.renderHeaderPage}
		            isLoop={true}
		            autoPlay={true} />
	        	</View>
        	);
	},
});

var headerStyles = StyleSheet.create({
  backgroundImage: {
  	flex: 1,
	width: DEVICE_WIDTH,
  },
  textContainer: {
  	flex: 1,
	justifyContent: 'flex-end',
	alignItems: 'flex-start',
	padding: 20,
  },
  text: {
  	color: 'white',
	fontSize: 18,
  }
});

var EACH_CARD_WIDTH = Dimensions.get('window').width/3;

//main content component
var HomeContent = React.createClass({
	
	//init state
	getInitialState: function(){
		var dataSource = new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			});

		return {
			dataSource: dataSource,
			topStories: [],
			loading: true,
		};
	},

	//loading data
	componentDidMount: function(){
		Storage.getBatchData([
		    { key: 'themes' },
		    { key: 'topStories' },
		]).then(results => {

			var themes = results[0];
			var topStories = results[1];

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(themes),
				loading: false,
				topStories: topStories,
			});
		}).catch(function(err){
			this.setState({
				loading: false,
			});
		}).done();
	},

	//on theme click, jump to theme view page
	selectTheme: function(theme){
		this.props.navigator.push({
			name: 'StoryListPage',
			theme: theme,
		});
	},

	//render each row
	renderRow: function(theme){
		return (
			<TouchableHighlight
				key={theme.id}
				onPress={()=>{this.selectTheme(theme)}}
				underlayColor='#e6e6e6'>
				<View style={styles.cardContainer}>
					<Text style={{
						fontSize: 16,
					}}>{theme.name}</Text>
				</View>
			</TouchableHighlight>
		);
	},

	render: function () {

		//loading page
		if(this.state.loading){
			return <Loading/>;
		}

		return (
			<View style={{
				height: DEVICE_HEIGHT - 80,
			}}>
				<HeaderPage
					navigator={this.props.navigator}
					topStories={this.state.topStories} 
					style={{
						height: 200,
					}}/>
				<ListView
					contentContainerStyle={{
						flexDirection: 'row',
						flexWrap: 'wrap',
					}}
					ref="homecontentlistview"
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}/>
			</View>
			
		);
	}
});

var styles = StyleSheet.create({
  cardContainer: {
  	width: EACH_CARD_WIDTH,
	height: EACH_CARD_WIDTH,
	borderWidth: DEVICE_SMALLEST_WIDTH,
	borderColor: '#e6e6e6',
	justifyContent: 'center',
	alignItems: 'center',
  }
});

module.exports = HomeContent;