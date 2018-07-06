require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var imgDatas = require('../data/data.json');

imgDatas = function(imgArr) {
	for(var i=0, l=imgArr.length; i<l; i++){
		var img = imgArr[i];
		img.imgUrl = require("../images/" + img.fileName);
		imgArr[i] = img; 
	};
	return imgArr;
}(imgDatas);

class ImaFigure extends React.Component {
	constructor(props) {
		super(props);		
	}
	render() {
		return (
			<figure className="figure figure_front">
				<div className="imgs front">
					<img src={this.props.data.imgUrl} alt=""/>
					<figcaption>
						<h2>{this.props.data.caption}</h2>
					</figcaption>
				</div>
				<div className="imgs back">
					<p className="desc">{this.props.data.desc}</p>
				</div>
			</figure>
		);
	}
}

class AppComponent extends React.Component {
  render() {
  	var imgFigures = [];
  	imgDatas.forEach(function(value, index) {
  		imgFigures.push(<ImaFigure data={value} key={'img_' + index} />);
  	});

    return (
      <section className="stage">
      	<section className="imgFigure">{imgFigures}</section>
      </section>
    );
  }
}

AppComponent.defaultProps = {	
};

export default AppComponent;
