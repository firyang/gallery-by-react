require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var imgDatas = require('../data/data.json');

/*
 * 利用自执行函数获取图片信息
 */
imgDatas = function(imgArr) {
	for(var i=0, l=imgArr.length; i<l; i++){
		var img = imgArr[i];
		img.imgUrl = require("../images/" + img.fileName);
		imgArr[i] = img; 
	};
	return imgArr;
}(imgDatas);

/*
 * ImgFigure组件
 */
class ImgFigure extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return (
			<figure className="img_figure">
				<img src={this.props.data.imgUrl} alt=""/>
				<figcaption>
					<h2 className="img_title">{this.props.data.caption}</h2>
					<div className="img_back"><p>{this.props.data.desc}</p></div>
				</figcaption>				
			</figure>
		);
	}
}

/*
 * AppComponent组件
 */
class AppComponent extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {
  	var imgFigures = [];
  	imgDatas.forEach(function(value, index) {
  		imgFigures.push(<ImgFigure data={value} key={'img_' + index} />);
  	});

    return (
      <section className="stage">
      	<section className="img_sec">{imgFigures}</section>
      </section>
    );
  }
}

AppComponent.defaultProps = {	
};

export default AppComponent;
