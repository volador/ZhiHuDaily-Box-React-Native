'use strict'

import Storage from 'react-native-storage';

var storage = new Storage({
  //最大容量，默认值1000条数据循环存储
  size: 1000,    

  //数据过期时间，默认一整天（1000 * 3600 * 24秒）
  defaultExpires: 1000 * 600,

  //读写时在内存中缓存数据。默认启用。
  enableCache: true,

  //如果storage中没有相应数据，或数据已过期，
  //则会调用相应的sync同步方法，无缝返回最新数据。
  sync : {

  	//story detail
  	story(params){
      let { id, resolve, reject } = params;
      fetch('http://news.at.zhihu.com/api/4/news/'+id).then( response => {
        return response.json();
      }).then( json => {
        if(json){  //no save
          resolve && resolve(json);
        }
        else{
          reject && reject('data parse error');
        }
      }).catch( err => {
        reject && reject(err);
      });
    },

  //home top stories
  	topStories(params){
  		let { resolve, reject } = params;
		fetch('http://news-at.zhihu.com/api/4/news/latest').then( response => {
			return response.json();
		}).then( json => {
			if(json && json.top_stories){
				storage.save({
					key: 'topStories',
					rawData: json.top_stories
				});
				resolve && resolve(json.top_stories);
			}
			else{
				reject && reject('data parse error');
			}
		}).catch( err => {
			console.warn(err);
			reject && reject(err);
		});
  	},

    //theme detail
  	theme(params){
      let { id, resolve, reject } = params;
      fetch('http://news-at.zhihu.com/api/4/theme/'+id).then( response => {
        return response.json();
      }).then( json => {
        //console.log(json);
        if(json){
          storage.save({
            key: 'theme',
            id,
            rawData: json
          });
          resolve && resolve(json);
        }
        else{
          reject && reject('data parse error');
        }
      }).catch( err => {
        console.warn(err);
        reject && reject(err);
      });
    },

    //start image
    startImage(params){
      let { resolve, reject } = params;
      fetch('http://news-at.zhihu.com/api/4/start-image/1080*1776').then( response => {
        return response.json();
      }).then( json => {
        //console.log(json);
        if(json){
          storage.save({
            key: 'startImage',
            rawData: json
          });
          resolve && resolve(json);
        }
        else{
          reject && reject('data parse error');
        }
      }).catch( err => {
        console.warn(err);
        reject && reject(err);
      });
    },

  	//home themes
  	themes(params){
		let { resolve, reject } = params;
		fetch('http://news-at.zhihu.com/api/4/themes').then( response => {
			return response.json();
		}).then( json => {
			if(json && json.others){
				storage.save({
					key: 'themes',
					rawData: json.others
				});
				resolve && resolve(json.others);
			}
			else{
				reject && reject('data parse error');
			}
		}).catch( err => {
			console.warn(err);
			reject && reject(err);
		});
  	}
  }
});

module.exports = storage;