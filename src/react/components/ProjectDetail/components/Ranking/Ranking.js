import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import {date2string} from '~/src/react/lib/utils';
import {ReadMore} from 'react-read-more';

import _ from 'lodash';

 

const borderStyle = {
	border: '1px solid gray'
}

class Ranking extends Component {
	
	constructor() {
		super(...arguments);

		this.state = {
			numProjects: 0,
			count: 10,
			windowSize: 20,
		}
	}
	
	expandList() {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}
	
	componentDidMount() {
		this.setState({
			numProjects: this.props.indirectSupporters.length
		})
	}
	
	render() {
		const {
			ranking : {
				recent3DirectSupporters,
				recent3IndirectSupporters,
			},
			directSupporters,
			indirectSupporters,
			selectValue,
			selectOptions,
			_onSelectOptionChange,
	 	} = this.props;

		const directInfo = (
			<div className="project-detail-ranking-info">
				{
					recent3DirectSupporters.map( (fbId, index) =>
						// border-width: 1px; border-style: solid; border-color: rgb(75, 112, 154); border-radius: 100px; margin-bottom: 5px !important;
						<img className="ranking-fb-icon" key={index} width={40} height={40}
							src={`https://graph.facebook.com/${fbId}/picture`} />
					)
				}
				외 { directSupporters.length - recent3DirectSupporters.length }명이 직접 후원함
			</div>
		)

		const indirectInfo = (
			<div className="project-detail-ranking-info">
				{
					recent3IndirectSupporters.map( (fbId, index) =>
						// border-width: 1px; border-style: solid; border-color: rgb(75, 112, 154); border-radius: 100px; margin-bottom: 5px !important;
						<img className="ranking-fb-icon" key={index} width={40} height={40}
							src={`https://graph.facebook.com/${fbId}/picture`} />
					)
				}
				외 <p className="sharing-number">{ indirectSupporters.length - recent3IndirectSupporters.length }명</p>이 공유로 후원함
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
			<div key={index} className="project-detail-ranking-item">
				<div className="project-ranking-th">
			    	<p className="sharing-fb-icon-list">
						<img className="ranking-fb-icon-list" key={index} width={50} height={50}
							src={`https://graph.facebook.com/${fbId}/picture`}  />
					</p>

					<p className="sharing-summary">
				    <span><p className="sharing-name">{name}</p>{' '}{date2string(support_at) /* TODO: Date to string... */}</span>
				    <ReadMore lines={1} onShowMore={this.props.onChange} text="더보기">
                		{message}
            		</ReadMore>
				    <span><p className="sharing-money">{money.toLocaleString()}원</p>을 후원함</span>
	        		</p>
	        		<div className="sharing-icon-summary">
		        	<p className="likes-num">
			        	{ likes.toLocaleString() }
						<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/likes.png" scale="0" />
					</p>
					<p className="likes-num">
						{ comments.toLocaleString() }
						<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/comment.png" scale="0" />
					</p>
					<p className="likes-num">
						{ shares.toLocaleString() }
						<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/share.png" scale="0" />
					</p>
					</div>
				</div>

				{/* rankToCaption(rank) */}

					{/* <img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/comment.png" scale="0" />
					{ comments }
					<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/share.png" scale="0" />
					{ shares } */}

			</div>
		))

		return (
			<div className="project-detail-ranking">
				{/* directInfo */}
				{ indirectInfo }

				<Select name="project-detail-ranking-select"
				 	value={selectValue}
					options={selectOptions}
					onChange={_onSelectOptionChange} />

				<div className="project-detail-ranking-container">
					{ rankingDetail.slice(0, this.state.count) }
				</div>
				<div>
					{
						this.state.numProjects > 1 && this.state.numProjects > this.state.count
							? <button className="post-more-button" onClick={this.expandList.bind(this)}>더보기</button>
							: null
					}	
				 </div>
			</div>
		)
	}

}


export default Ranking;
