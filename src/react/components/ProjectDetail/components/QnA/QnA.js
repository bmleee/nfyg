import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import { createQnA, createCommentOnQnA, deleteQnA, deleteComment, createContactQnA } from '~/src/react/api/AppAPI'

import { PostComments } from '../Post/';

import { SelectOptions } from '../../../../constants'
import { date2string, newLinedString } from '~/src/react/lib/utils'
import Collapsible from 'react-collapsible';
import SweetAlert from 'sweetalert-react';
import Modal from '~/src/react/components/react-awesome-modal';

import update from 'immutability-helper'
import { Link } from 'react-router';

const selectOptions = SelectOptions.QnA


// TODO: 입력 폼. 글만 올릴거 아닌데...
class QnA extends Component {

	state = {
		numProjects: 0,
		count: 5,
		windowSize: 5
	}

	expandList = () => {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}

	_onClickAddQnA = async () => {
		try {
			let text = document.getElementById("qna_text").value
			let projectName = this.props.abstract.projectName
			let productName = this.props.abstract.productName
			let { response } = await createQnA({text, projectName, productName})
			this.props._newQnA(response)
			document.getElementById("qna_text").value = ''
		} catch (e) {
			// console.error(e);
		}
	}

	_onClickAddQnAComment = (index, _id) => {
		return async () => {
			try {
				let text = document.getElementById(`qna_${index}_comment`).value
				let { response } = await createCommentOnQnA({text, qna_id: _id})
				this.props._newCommentOnQnA(_id, response)
				document.getElementById(`qna_${index}_comment`).value = ''
			} catch (e) {
				// console.error(e);
			}
		}
	}

	_onClickDeleteQnA = (qna_id) => {
		return async () => {
			try {
				const r = await deleteQnA({ qna_id })
				this.props._deleteQnA(qna_id)
			} catch (e) {
				alert('삭제할 수 없습니다.')
				// console.error(e);
			}
		}
	}

	_onClickDeleteComment = (qna_id, comment_index) => {
		return async () => {
			try {
				const r = await deleteComment({ qna_id, comment_index })
				this.props._deleteCommentOnQnA(qna_id, comment_index)
			} catch (e) {
				// console.error(e);
				alert('삭제할 수 없습니다.')
			}
		}
	}

	componentDidMount() {
		this.setState({
			numProjects: this.props.qna.posts.length
		})
	}

	render() {
		let { 
			qna: { posts },
			creator,
			authorizedUser,
			athor_user
		} = this.props;
		
		let author_link = ""
		
		if(authorizedUser.indexOf("@7pictures.co.kr") == -1) {
			author_link = "/user/" +  athor_user.id.toString()
		}
		
		let {
			isLoggedIn,
			displayName,
			image,
		} = appUtils.getUser()

		const item = posts.map( ({
			_id,
			opened,
			author,
			title,
			created_at,
			created_at_new=date2string(created_at),
			numSupporters,
			likes,
			text,
			comments,
			content
		}, index) => (
			<div className="project-detail-qna-item" key={index}>
					<div className="qna-item-container">
						<p className="sharing-fb-icon-list">
							<img className="qna-form-user-icon" src={author.iconSrc} alt="" width={80} height={80}/>
						</p>

							<p className="sharing-summary">
								<span>
									<p className="sharing-name">{author.name}</p>{created_at_new}
									<button className="comment-delete-button" onClick={this._onClickDeleteQnA(_id)}/>
								</span>
								<span className="qna-detail-text">{text}</span>

							{/* 대댓글 */}

								{
									comments.map(({
										author,
										title,
										text,
										created_at,
										created_at_comment_new=date2string(created_at),
									}, index) => (
										// div 로 한번 더 감쌌어요!
										<div className="qna-item-container">
											<p className="sharing-fb-icon-list">
												<img className="qna-form-user-icon-sub" src={author.iconSrc} alt="" width={70} height={70}/>
											</p>
											<p className="sharing-summary">
												<span>
													<p className="sharing-name">{author.name}</p>
													{created_at_comment_new}
													<button className="comment-delete-button" onClick={this._onClickDeleteComment(_id, index)}/>
												</span>
												<span>{text}
												</span>
											</p>
										</div>
									))
								}


							<Collapsible trigger="댓글 남기기" transitionTime="0">
							<div className="project-detail-qna-form">
								<div className="qna-form-textarea-container">
								{/* <img className="qna-form-user-icon" src="/assets/images/user_default.png" alt="" width={80} height={80} /> */}
									<textarea className="qna-form-textarea" cols="30" rows="4" id={`qna_${index}_comment`} placeholder=""></textarea>
								</div>
								<div className="qna-form-submit-container">
									{ !isLoggedIn ?
									<button className="qna-form-submit" onClick={() => this.openModal2()}>댓글 남기기</button>
									:
									<button className="qna-form-submit" onClick={this._onClickAddQnAComment(index, _id)}>댓글 남기기</button>
									}
								</div>
							</div>
							</Collapsible>
							{/* 대댓글 */}
						</p>

					</div>
			</div>
		))

		return (
			<div className="project-detail-qna">
				<div className="project-creator">
					{ authorizedUser.indexOf("@7pictures.co.kr") == -1
					?
					<div className="project-creator-img-container">
						{ creator.creatorImgSrc == "" ? 
						<Link to={author_link}><img className="project-creator-img" src="/assets/images/user_default.png" /></Link>
						:
						<Link to={author_link}><img className="project-creator-img" src={creator.creatorImgSrc} /></Link>
						}
					</div>
					:
					<div className="project-creator-img-container">
						{ creator.creatorImgSrc == "" ? 
						<img className="project-creator-img" src="/assets/images/user_default.png" />
						:
						<img className="project-creator-img" src={creator.creatorImgSrc} />
						}
					</div>
					}
					{ authorizedUser.indexOf("@7pictures.co.kr") == -1
					?
					<div className="project-creator-info-container">
						<Link to={author_link}>
							<div className="project-creator-name">
								{creator.creatorName}
							</div>
						</Link>
						<Link to={author_link}>
							<div className="project-creator-description">
								{creator.creatorDescription}
							</div>
						</Link>
						<Link to={author_link}>
							<div className="project-creator-email">
								{authorizedUser}
							</div>
						</Link>
					</div>
					:
					<div className="project-creator-info-container">
						<div className="project-creator-name">
							{creator.creatorName}
						</div>
						<div className="project-creator-description">
							{creator.creatorDescription}
						</div>
					</div>
					}
				</div>
				<div className="project-detail-qna-form">
					<div className="qna-form-textarea-container">
						<img className="qna-form-user-icon" src={image} alt="" width={80} height={80} />
						<textarea className="qna-form-textarea" name="" id="qna_text" cols="30" rows="4" placeholder="궁금하신 점을 댓글로 남겨주세요."></textarea>
					</div>
					<div className="qna-form-submit-container">
						<p className="qna-form-submit-empty"/>
						{ !isLoggedIn ?
						<button className="qna-form-submit" onClick={() => this.openModal2()}>댓글 남기기</button>
						:
						<button className="qna-form-submit" onClick={this._onClickAddQnA}>댓글 남기기</button>
						}
					</div>
				</div>
				<div>
					{ item.slice(0, this.state.count) }
				</div>
				<div>
					{
						this.state.numProjects > 5 && this.state.numProjects > this.state.count
							? <button className="post-more-button" onClick={this.expandList.bind(this)}>댓글 더보기</button>
							: null
					}
				 </div>
				 
				 
			</div>
		)
	}

}



export default QnA;
