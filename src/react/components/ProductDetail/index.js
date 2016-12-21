import React, { Component, PropTypes } from 'react'
import { fetchJSONFile, fetchUserAndData } from '../../api/AppAPI'

import { ProductDetail } from './components'

const selectOptions = [
	{
      value: "support_at",
      label: "최신순"
    },
    {
      value: "likes",
      label: "좋아요순"
    },
    {
      value: "money",
      label: "금액순"
    }
]

export default class ProductDetailContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			abstract: {},
			creator: {},
			sponsor: {},

			funding: {},
			directSupporters: [],
			indirectSupporters: [],

			overview: {},
			summary: {},

			post: {},
			ranking: {},

			qna:{},

			selectValue: selectOptions[0].value,
			selectOptions: selectOptions,
			loaded: false,
		}
	}

	async componentDidMount() {
		const res = await fetchUserAndData()
		console.log('fetchUserAndData', res);

		const {
			user,
			data: {
				product
			}
		} = res

		const {
			selectValue,
			selectOptions,
		} = this.state

		this.props.setUser(user)
		this.setState({
			...product,
			loaded: true,
			selectValue,
			selectOptions
		})
	}

	_onSelectOptionChange = (o) => {
		let { indirectSupporters } = this.state;

		this.setState({
			indirectSupporters: _.sortBy(indirectSupporters, o.value).reverse(),
			selectValue: o.value,
		})

		console.log(_.sortBy(indirectSupporters, o.value));
	}

	render() {
		let children = this.props.children
			&& React.cloneElement(this.props.children, {
				...this.state,
				_onSelectOptionChange: this._onSelectOptionChange,
			});

		return this.state.loaded
			?
				<ProductDetail
					{...this.state}
					_onSelectOptionChange={this._onSelectOptionChange}
				>
					{ children }
				</ProductDetail>
			:
				<div>Loading...</div>
	}
}
