import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import _ from 'lodash';

import 'babel-polyfill';

const borderStyle = {
	border: '1px solid gray'
}

class Ranking extends Component {

	render() {
		const {
			ranking : {
				recent3DirectSupporters,
				recent3IndirectSupporters,
				selectOptions,
			},
			directSupporters,
			indirectSupporters,
			_onSelectOptionChange,
	 	} = this.props;

		const directInfo = (
			<div className="project-detail-ranking-info" style={borderStyle} >
				{
					recent3DirectSupporters.map( (fbId, index) =>
						// border-width: 1px; border-style: solid; border-color: rgb(75, 112, 154); border-radius: 100px; margin-bottom: 5px !important;
						<img key={index} width={50} height={50}
							src={`https://graph.facebook.com/${fbId}/picture`} />
					)
				}
				외 { directSupporters.length - recent3DirectSupporters.length }명이 직접 후원함
			</div>
		)

		const indirectInfo = (
			<div className="project-detail-ranking-info" style={borderStyle} >
				{
					recent3IndirectSupporters.map( (fbId, index) =>
						// border-width: 1px; border-style: solid; border-color: rgb(75, 112, 154); border-radius: 100px; margin-bottom: 5px !important;
						<img key={index} width={50} height={50}
							src={`https://graph.facebook.com/${fbId}/picture`} />
					)
				}
				외 { indirectSupporters.length - recent3IndirectSupporters.length }명이 간접 후원함
			</div>
		)

		const rankToCaption = rank => {
			let base = <span>예술 후원자</span>
			let special = null

			switch(rank) {
				case 1 :
					special = 'top 1'
					break;
				case 2 :
					special = 'top 2'
					break;
				case 3 :
					special = 'top 3'
					break;
				default :
					base = null
			}

			return <div className="project-detail-ranking-best"> { special } { base } </div>
		}

		const rankingDetail = indirectSupporters.map( ({
			fbId,
			name,
			money,
			support_at,
			message,
			likes,
			comments,
			shares,
			rank,
		}, index) => (
			<div key={index} className="project-detail-ranking-item" style={borderStyle} >
				<div>
					<img key={index} width={50} height={50}
						src={`https://graph.facebook.com/${fbId}/picture`} />
					<span>{name}{' '}{money}원을 후원함</span>
					<span>{String(new Date(support_at)) /* TODO: Date to string... */}</span>
				</div>
				<span>{message}</span>
				{ rankToCaption(rank) }
				<div>
					<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/likes.png" scale="0" />
					{ likes }
					<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/comment.png" scale="0" />
					{ comments }
					<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/share.png" scale="0" />
					{ shares }
				</div>
			</div>
		))

		return (
			<div className="project-detail-ranking">
				{ directInfo }
				{ indirectInfo }

				<Select name="project-detail-ranking-select"
				 	value="support_at"
					options={selectOptions}
					onChange={_onSelectOptionChange} />

				<div className="project-detail-ranking-container">
					{ rankingDetail }
				</div>

				<button>공유로 예술 후원하기(열람하기)</button>
			</div>
		)
	}

}

Ranking.contextTypes = {
	ranking: PropTypes.shape({
		recent3DirectSupporters: PropTypes.arrayOf(
			PropTypes.string.isRequired,
		).isRequired,
		recent3IndirectSupporters: PropTypes.arrayOf(
			PropTypes.string.isRequired,
		).isRequired,
		selectOptions: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})).isRequired,
	}).isRequired,
	directSupporters: PropTypes.arrayOf(PropTypes.shape({
		fbId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		money: PropTypes.number.isRequired,
		support_at: PropTypes.number.isRequired,
	}).isRequired).isRequired,
	indirectSupporters: PropTypes.arrayOf(PropTypes.shape({
		fbId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		money: PropTypes.number.isRequired,
		support_at: PropTypes.number.isRequired,
		message: PropTypes.string.isRequired,
		likes: PropTypes.number.isRequired,
		comments: PropTypes.number.isRequired,
		shares: PropTypes.number.isRequired,
		rank: PropTypes.number.isRequired,
	}).isRequired).isRequired,
	_onSelectOptionChange: PropTypes.func.isRequired,
}

export default Ranking;