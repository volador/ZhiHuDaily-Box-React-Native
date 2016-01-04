/*
	Story Page
*/
'use strict'

var React = require('react-native');

var ViewPage = require('react-native-viewpager');
var OnePage = require('./OnePage');
var Loading = require('./LoadingPage');
var Storage = require('./Storage');

var {
	Text,
	ListView,
	View,
	StyleSheet,
} = React;

var StoryListPage = React.createClass({
	getInitialState: function(){
		var pageDataSource = new ViewPage.DataSource({
			pageHasChanged: (p1, p2) => p1 !== p2
		});

		return {
			pageDataSource: pageDataSource,
			currentPage: 1,
			loading: true,
		}
	},

	/*
		from: 
			['1','2','3','4','5','6']
		maybe to
			[
				'1',
				['2','3'],
				'4',
				['5','6']
			]
		or maybe to
			[
				['1','2'],
				'3',
				'4',
				['5','6']
			]
	*/
	restructContentData: function(originContentData){

		var fixedContentData = [];
		var pickNumArr = [1,1,2,2].sort((a,b)=>Math.random()>.5 ? -1 : 1);
		var showImgArr = [1,0].sort((a,b)=>Math.random()>.5 ? -1 : 1);

		while(originContentData.length > 0){
			var pickNum = pickNumArr.shift();
			if(pickNum == 1){
				//check if show img
				var needShowImg = showImgArr.shift();
				var pickData = originContentData.shift();
				if(needShowImg){
					pickData.showImg = true;
				}else{
					pickData.showImg = false;
				}
				fixedContentData.push(pickData);
			}else if(pickNum == 2){
				var pickDataOne = originContentData.shift();
				var pickDataTwo = originContentData.shift();
				var pairContent = [pickDataOne, pickDataTwo];
				fixedContentData.push(pairContent);
			}
		}

		return fixedContentData;
	},
	renderPage: function(pageData, pageId){
		return (
			<OnePage navigator={this.props.navigator} theme={this.props.theme} contentData={pageData}/>
		);
	},
	onChangePage: function(page){
		page = page + 1;
		this.setState({currentPage: page});
	},

	//prepare theme data
	componentDidMount: function(){
		var themeId = this.props.theme.id;
		Storage.load({
		    key: 'theme',
		    id: themeId,
		  }).then( themeDetail => {
		  	var stories = themeDetail.stories;
		  	//group it, six items per group
		  	var group = [];
		  	var perGroup = [];
		  	var index = 0;
		  	var defaultImage = 'http://p1.zhimg.com/d3/7b/d37b38d5c82b4345ccd7e50c4ae997da.jpg';
		  	stories.map(function(story){
		  		//rstruct story
		  		story.from = '我们都爱折腾网';
		  		if('images' in story && story.images.length > 0){
		  			story.image = story.images[0];	
		  		}else{
		  			story.image = defaultImage;
		  		}

		  		if(index <= 5){
		  			perGroup.push(story);
		  			index = index + 1;
		  		}else{
		  			var clonePerGroup = perGroup;
		  			group.push(clonePerGroup);
		  			perGroup = [];
		  			perGroup.push(story);
		  			index = 1;
		  		}
		  	});
		  	if(perGroup.length > 0){
		  		group.push(perGroup);
		  	}

		  	//restruct group
		  	var restructFun = this.restructContentData;
			var restructData = group.map(function(item){
				return restructFun(item);
			});
			group = null;

			//reset state
			this.setState({
				pageDataSource: this.state.pageDataSource.cloneWithPages(restructData),
				totalPage: restructData.length,
				loading: false,
			});

		  }).catch( err => {          
		    console.warn(err);
		  });
	},

	render: function(){

		if(this.state.loading){
			return <Loading />;
		}

		//onChangePage={this.onChangePage}
		var pageString = this.state.currentPage + '/' + this.state.totalPage;
		return (
			<View style={{
				flex: 1,
			}}>
				<ViewPage 
					dataSource={this.state.pageDataSource}
					renderPage={this.renderPage}
					isLoop={false}
					autoPlay={false}
					renderPageIndicator={false}
					onChangePage={this.onChangePage}/>
				<View style={styles.pageContainer}>
					<Text style={styles.pageText}>{pageString}</Text>
				</View>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		position: "absolute",
		bottom: 0,
		right: 0,
		padding: 10,
	},
	pageText: {
		color: '#bcbcbc',
	}
});

module.exports = StoryListPage;