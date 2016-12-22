import React, { Component, PropTypes } from 'react';


class PostComments extends Component {

	state = {
		commentsOpend: false,
	}
	
	constructor() {
		super(...arguments);

		this.state = {
			numProjects: 0,
			count: 4,
			windowSize: 4,
		}
	}
	
	expandList() {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}
	
	componentDidMount() {
		this.setState({
			numProjects: this.props.comments.length
		})
	}

	render() {
		const {
			comments,
			postLikes,
		} = this.props;

		const item = comments.map( ({
			author: { name, iconSrc },
			numLikes,
			text
		}, index) => (
			<div className="project-detail-post-item-comments-item" key={index}>
				<div className="project-ranking-th">
					<p className="sharing-fb-icon-list">
					<img className="ranking-fb-icon-list" src={iconSrc} alt="" width={42} height={42}/>
					</p>
					<p className="sharing-summary">
					<span><p className="sharing-name">{name}</p></span>
					<span>{text}</span>
					</p>
				</div>
			</div>
		))


		return (
			<div className="project-detail-post-item-comments-container">
				<div>
					{ item.slice(0, this.state.count) }
				</div>
				<div>
					{
						this.state.numProjects > 4 && this.state.numProjects > this.state.count
							? <button className="post-more-button" onClick={this.expandList.bind(this)}>댓글 더보기(00개)</button>
							: null
					}	
				 </div>
			</div>
		)
	}

	_onClick() {
		this.setState({
			commentsOpend: !this.state.commentsOpend,
		});
	}
}

export default PostComments;
