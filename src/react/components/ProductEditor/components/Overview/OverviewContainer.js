import React, { Component } from 'react'

import Overview from './Overview'

class OverviewContainer extends Component {
	state = {
		intro:'',
		part1: '',
		part2: ''
	}

	render() {

		console.log('Test2.rendering...');
		console.log('Test2.part1', this.state.part1);

		return (
			<Overview
				{...this.state}
				_onIntroSubmit={this._onIntroSubmit}
				_onPart1Submit={this._onPart1Submit}
				_onPart2Submit={this._onPart2Submit}
				parent={this}
			/>
		)
	}

	_onIntroSubmit = (intro) => this.setState({intro})
	_onPart1Submit = (value) => this.setState({part1: value.toString('html')})
	_onPart2Submit = (value) => this.setState({part2: value.toString('html')})

}

export default OverviewContainer
