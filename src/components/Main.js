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
		img.imgUrl = require('../images/' + img.fileName);
		imgArr[i] = img;
	}
	return imgArr;
}(imgDatas);

/*
 * 随机生成一个数值
 * @param 范围数组, [min, max]
 */
function random(range) {
	var max = Math.ceil(Math.max(range[0], range[1])),
		min = Math.ceil(Math.min(range[0], range[1])),
		dif = max - min;
	var num = Math.ceil(Math.random() * dif + min);
	return num;
}

/*
 * ImgFigure组件
 */
class ImgFigure extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var styleObj = {};
		styleObj = this.props.imgArangeArr.pos;

		return (
			<figure className="img_figure" style={styleObj}>
				<img src={this.props.data.imgUrl} alt=""/>
				<figcaption>
					<h2 className="img_title">{this.props.data.caption}</h2>
					<div className="img_back">{this.props.data.desc}</div>
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

  	this.stage = null;
  	this.setStageRef = el => {
  		this.stage = el;
  	};

  	/*
  	 * Constant 存储图片布局信息
  	 */
  	this.Constant = {
  		centerPos: {
  			left: 0,
  			top: 0
  		},
  		hPosRange: {
  			leftX: [0, 0],
  			rightX: [0, 0],
  			y: [0, 0]
  		},
  		vPosRange: {
  			x: [0, 0],
  			topY: [0, 0]
  		}
  	};

  	this.state = {
  		imgArangeArr: [
	  		/*{
	  			pos: {
	  				left: 0,
	  				top: 0
	  			}
	  		}*/
  		]
  	}
  }

  /*
   * 计算图片位置信息，存储到Constant
   */
  componentDidMount() {
  	//获取舞台大小
  	var stageDom = this.stage,
  		stageW = stageDom.scrollWidth,
  		stageH = stageDom.scrollHeight,
  		stageWhalf = Math.ceil(stageW / 2),
  		stageHhalf = Math.ceil(stageH / 2);

  	//获取图片大小
  	var imgDom = document.getElementsByClassName('img_figure')[0],
  		imgW = imgDom.scrollWidth,
  		imgH = imgDom.scrollHeight,
  		imgWhalf = Math.ceil(imgW / 2),
  		imgHhalf = Math.ceil(imgH / 2);

  	this.Constant.centerPos.left = stageWhalf - imgWhalf;
  	this.Constant.centerPos.top = stageHhalf - imgHhalf;
  	this.Constant.hPosRange.leftX[0] = -imgWhalf;
  	this.Constant.hPosRange.leftX[1] = stageWhalf - imgWhalf*3;
  	this.Constant.hPosRange.rightX[0] = stageWhalf + imgWhalf;
  	this.Constant.hPosRange.rightX[1] = stageW - imgWhalf;
  	this.Constant.hPosRange.y[0] = -imgHhalf;
  	this.Constant.hPosRange.y[1] = stageH - imgHhalf;
  	this.Constant.vPosRange.x[0] = stageWhalf - imgW;
  	this.Constant.vPosRange.x[1] = stageWhalf - imgWhalf;
  	this.Constant.vPosRange.topY[0] = -imgHhalf;
  	this.Constant.vPosRange.topY[1] = stageHhalf - imgHhalf*3;

  	this.rearange(0);

  }

  /*
   * 布局图片函数
   */
  rearange(index) {
  	var constant = this.Constant,
  		centerPos = constant.centerPos,
  		hPosRangeLeftX = constant.hPosRange.leftX,
  		hPosRangeRightX = constant.hPosRange.rightX,
  		hPosRangeY = constant.hPosRange.y,
  		vPosRangeX = constant.vPosRange.x,
  		vPosRangeTopY = constant.vPosRange.topY;

  	var imgArangeArr = this.state.imgArangeArr;

  	//布局居中图片
  	var imgCenterArr = imgArangeArr.splice(index, 1);
  	imgCenterArr[0] = {
  		pos: centerPos
  	};

  	//布局上侧图片，取1张或0张
  	var num = Math.floor(Math.random() * 2),
  		selectIndex =  Math.ceil(Math.random() * imgArangeArr.length),
  		imgTopArr = [];
  	imgTopArr = imgArangeArr.splice(selectIndex, num);

  	imgTopArr.forEach(function(value, ind) {
  		imgTopArr[ind] = {
  			pos: {
  				left: random(vPosRangeX),
  				top: random(vPosRangeTopY)
  			}
  		}
  	});

  	//布局左右两侧图片
  	for(var i=0, j=imgArangeArr.length, k=j/2; i<j; i++) {
  		var hPosRangeLOR = [];

		//i<k 表示左侧部分图片
  		if(i<k) {
  			hPosRangeLOR = hPosRangeLeftX;
  		} else {
  			hPosRangeLOR = hPosRangeRightX;
  		}
  		
		imgArangeArr[i] = {
			pos: {
				left: random(hPosRangeLOR),
				top: random(hPosRangeY)
			}
		}
  	}

  	if(imgTopArr && imgTopArr[0]) {
  		imgArangeArr.splice(selectIndex, 0, imgTopArr[0]);
  	}

  	imgArangeArr.splice(index, 0, imgCenterArr[0]);

  	this.setState({
  		imgArangeArr: imgArangeArr
  	});
  }

  render() {
  	var imgFigures = [];

  	imgDatas.forEach(function(value, index) {
  	  var imgArangeArr = this.state.imgArangeArr;

	  if(!imgArangeArr[index]) {
	  	imgArangeArr[index] = {
	  		pos: {
	  			left: '0px',
	  			top: '0px'
	  		}
	  	}
	  }

  	  imgFigures.push(
  		<ImgFigure data={value}
  				   imgArangeArr= {imgArangeArr[index]}
  				   key={'img_' + index}
  		/>);
  	}.bind(this));

    return (
      <section className="stage" ref={this.setStageRef}>
      	<section className="img_sec">{imgFigures}</section>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
