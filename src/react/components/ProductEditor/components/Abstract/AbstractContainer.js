import React, { Component } from 'react'
import Abstract from './Abstract'

export default class AbstractContainer extends Component {
	state = {
		longTitle: '',     //
		shortTitle: '',    //
		imgSrc: '',         //
		category: '',       // 건강, 라이프, ...
		productName: '',   // products/:product_name
	}

	render() {

		return (
			<Abstract
				{...this.state}
				_onLongTitleSubmit={this._onLongTitleSubmit}
				_onShortTitleSubmit={this._onShortTitleSubmit}
				_onImgSrcSubmit={this._onImgSrcSubmit}
				_onCategorySubmit={this._onCategorySubmit}
				_onProductNameSubmit={this._onProductNameSubmit}
			 />
		)
	}

	_onLongTitleSubmit = (longTitle) => this.setState({longTitle})
	_onShortTitleSubmit = (shortTitle) => this.setState({shortTitle})
	_onImgSrcSubmit = (imgSrc) => this.setState({imgSrc})
	_onCategorySubmit = (category) => this.setState({category})
	_onProductNameSubmit = (productName) => this.setState({productName})
}
