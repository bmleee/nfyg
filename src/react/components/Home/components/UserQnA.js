import React, { Component, PropTypes } from 'react'
import MetaTags from 'react-meta-tags'

import update from 'immutability-helper'
import { Link } from 'react-router'

import { date2string } from '~/src/react/lib/utils'
import { fetchUserAndData, fetchContactQna, deleteQnA, createCommentOnQnA, deleteContactComment  } from '../../../api/AppAPI'
import Collapsible from 'react-collapsible';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class UserQnA extends Component {
    state = {
        userType: '',
        qnas: {},
	}
	
	_onClickCancel = (qna_id) => {
    return async () => {
      if (confirm('답변이 되셨나요? 질문을 삭제할까요? :)')) {
        try {
          const r = await deleteQnA({ qna_id })
          this.componentDidMount()
          console.log(`Purchase ${qna_id} cancel result`)
          console.log(r)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
  
  _onClickAddQnAComment = (index, _id) => {
		return async () => {
			try {
				let text = document.getElementById(`qna_${index}_comment`).value
				let { response } = await createCommentOnQnA({text, qna_id: _id})
				
				this.componentDidMount()
				document.getElementById(`qna_${index}_comment`).value = ''
				
				this.props._newCommentOnQnA(_id, response)
				
			} catch (e) {
				console.error(e);
			}
		}
	}
	
	_onClickDeleteComment = (qna_id, contact_comment_index) => {
		return async () => {

				const r = await deleteContactComment({ qna_id, contact_comment_index })
				
				this.componentDidMount()
				this.props._deleteCommentOnQnA(qna_id, contact_comment_index)
			
		}
	}
    
    async componentDidMount () {
  		const {
              user,
              data: {
                userType,
                qnas,
              }
            } = await fetchContactQna();
            
      console.log('qnas', qnas)
  		this.props.appUtils.setUser(user)
  		this.setState({
              userType,
              qnas
      })
    }
      
    render() {
        let {
          userType,
          qnas
        } = this.state
        
        const {
          displayName,
          display_name,
          image,
        } = appUtils.getUser()
        
        let name = displayName || display_name
    
        return (
          <div>
            {
              userType === 'admin' ?
            <div className="user-qna-head-container">
      				<div className="user-qna-head">
      					<div className="user-qna-title">사용자 문의내역</div>
      				</div>
      			</div>
      			: userType === 'store' ?
    		    <div className="user-qna-head-container">
      				<div className="user-qna-head">
      					<div className="user-qna-title">문의내역</div>
      				</div>
      			</div>
    		    :
    		    <div className="user-qna-head-container">
      				<div className="user-qna-head">
      					<div className="user-qna-title">문의내역</div>
      				</div>
      			</div>
            }
            {
              userType === 'admin' ? this._renderAdmin(qnas) : userType === 'store' ? this._renderStore(qnas) : this._renderUser(qnas)
            }
          </div>
        )  
    }
    
    _renderAdmin(qnas) {
        var {
          qnas 
        } = qnas
        
        qnas && qnas.sort(function(a, b) {
    			return a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0		
    		})
    
        return (
          <div className="admin-profile-wrapper">
			    <div className="contact-list-container">
                    <div className="contact-list-title-empty"></div>
                    { 
                      qnas && qnas.map(({
                          _id,
                          user,
                          title,
                          text,
                          comments,
                          author,
                          created_at,
                          created_at_new=date2string(created_at),
                        }, index) => {
                          return (
                            <div className="contact-list-item" key={index}>
                                <div className="contact-item-title-container">
                                  <div className="contact-item-title">{title}-{author.name}</div>
                                  <div className="contact-item-created_at">{created_at_new}</div>
                                </div>
                                <div className="contact-item-delete-container">
                                  <button className="contact-item-delete" onClick={this._onClickCancel(_id)}>삭제하기</button>
                                </div>
                                <div className="contact-item-text">Q. {text}</div>
                                
                                {
									comments && comments.map(({
										author,
										title,
										text,
										created_at,
									}, index) => (
										<div className="contact-comment-container">
											<div className="contact-comment-icon"></div>
											<div className="contact-comment">
												<div className="contact-comment-top">
													<div className="contact-comment-name">{author.name}</div>
													{/* <button className="contact-comment-delete" onClick={this._onClickDeleteComment(_id, index2)}/> */}
												</div>
												<div className="contact-comment-text">{text}</div>
											</div>
										</div>
									))
								}
								<Collapsible trigger="답변하기" transitionTime="0">
								<div className="contact-comment-form">
									<div className="contact-comment-textarea-container">
									  <textarea className="contact-comment-textarea" cols="30" rows="4" id={`qna_${index}_comment`} placeholder=""/>
									</div>
									<div className="contact-comment-submit-container">
										<button className="contact-comment-submit" onClick={this._onClickAddQnAComment(index, _id)}>답변하기</button>
									</div>
								</div>
								</Collapsible>
                            </div>
                          )
                        }) 
                    }
              </div>
          </div>
        )
      }
      
      _renderStore(qnas) {
        var {
          storeQnas,
          productQnas,
          contactQnas
        } = qnas
        
        storeQnas && storeQnas.sort(function(a, b) {
    			return a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0		
    		})
    		
    		productQnas && productQnas.sort(function(a, b) {
    			return a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0		
    		})
    		
    		contactQnas && contactQnas.sort(function(a, b) {
    			return a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0		
    		})
    		
    		var receivedQnas = storeQnas.concat(productQnas); 
    
        return (
          <div className="admin-profile-wrapper">
            <Tabs>
			          <TabList>
			            <Tab>받은 문의내역</Tab>
			            <Tab>보낸 문의내역</Tab>
			          </TabList>
			          
			          <TabPanel>
    			      <div className="contact-list-container">
                        <div className="contact-list-title-empty"></div>
                        { 
                          receivedQnas && receivedQnas.map(({
                              _id,
                              user,
                              title,
                              text,
                              comments,
                              created_at,
                              created_at_new=date2string(created_at),
                              author
                            }, index) => {
                              return (
                                <div className="contact-list-item" key={index}>
                                    <div className="contact-item-title-container">
                                      <div className="contact-item-title">{title}-{author.name}</div>
                                      <div className="contact-item-created_at">{created_at_new}</div>
                                    </div>
                                    <div className="contact-item-delete-container">
                                      <button className="contact-item-delete" onClick={this._onClickCancel(_id)}>삭제하기</button>
                                    </div>
                                    <div className="contact-item-text">Q. {text}</div>
                                    
                                    {
    									comments && comments.map(({
    										author,
    										title,
    										text,
    										created_at,
    									}, index) => (
    										<div className="contact-comment-container">
    											<div className="contact-comment-icon"></div>
    											<div className="contact-comment">
    												<div className="contact-comment-top">
    													<div className="contact-comment-name">{author.name}</div>
    													{/* <button className="contact-comment-delete" onClick={this._onClickDeleteComment(_id, index2)}/> */}
    												</div>
    												<div className="contact-comment-text">{text}</div>
    											</div>
    										</div>
    									))
    								}
    								<Collapsible trigger="답변하기" transitionTime={0}>
    								<div className="contact-comment-form">
    									<div className="contact-comment-textarea-container">
    									  <textarea className="contact-comment-textarea" cols="30" rows="4" id={`qna_${index}_comment`} placeholder=""/>
    									</div>
    									<div className="contact-comment-submit-container">
    										<button className="contact-comment-submit" onClick={this._onClickAddQnAComment(index, _id)}>답변하기</button>
    									</div>
    								</div>
    								</Collapsible>
                                </div>
                              )
                            }) 
                        }
                  </div>
                  </TabPanel>
                  
                  <TabPanel>
                    <div className="contact-list-container">
                        <div className="contact-list-title-empty"></div>
                        { 
                          contactQnas && contactQnas.map(({
                              _id,
                              user,
                              title,
                              text,
                              comments,
                              created_at,
                              created_at_new=date2string(created_at),
                            }, index) => {
                              return (
                                <div className="contact-list-item" key={index}>
                                    <div className="contact-item-title-container">
                                      <div className="contact-item-title">{title}</div>
                                      <div className="contact-item-created_at">{created_at_new}</div>
                                    </div>
                                    
                                    <div className="contact-item-delete-container">
                                      <button className="contact-item-delete" onClick={this._onClickCancel(_id)}>삭제하기</button>
                                    </div>
                                    
                                    <div className="contact-item-text">Q. {text}</div>
                                    
                                    {
    									comments && comments.map(({
    										author,
    										title,
    										text,
    										created_at,
    									}, index) => (
    										<div className="contact-comment-container">
    											<div className="contact-comment-icon"></div>
    											<div className="contact-comment">
    												<div className="contact-comment-top">
    													<div className="contact-comment-name">{author.name}</div>
    													{/* <button className="contact-comment-delete" onClick={this._onClickDeleteComment(_id, index2)}/> */}
    												</div>
    												<div className="contact-comment-text">{text}</div>
    											</div>
    										</div>
    									))
    								}
    								<Collapsible trigger="댓글 남기기" transitionTime="0">
    								<div className="contact-comment-form">
    									<div className="contact-comment-textarea-container">
    									  <textarea className="contact-comment-textarea" cols="30" rows="4" id={`qna_${index}_comment`} placeholder=""/>
    									</div>
    									<div className="contact-comment-submit-container">
    										<button className="contact-comment-submit" onClick={this._onClickAddQnAComment(index, _id)}>댓글 남기기</button>
    									</div>
    								</div>
    								</Collapsible>
                                </div>
                              )
                            }) 
                        }
                  </div>
                  </TabPanel>
                  
              </Tabs>
          </div>
        )
      }
      
      _renderUser(qnas) {
        const {
          contactQnas,
          productQnas,
          // storeQnas
        } = qnas
        
        contactQnas && contactQnas.sort(function(a, b) {
    			return a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0		
    		})
    		
    		productQnas && productQnas.sort(function(a, b) {
    			return a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0		
    		})
    		
    		/*
    		storeQnas && storeQnas.sort(function(a, b) {
    			return a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0		
    		})
    		*/
    		
    		// var receivedQnas = storeQnas.concat(productQnas); 
    
        return (
          <div className="admin-profile-wrapper">
			      <Tabs>
			          <TabList>
			            <Tab>보낸 문의내역</Tab>
			            <Tab>받은 문의내역</Tab>
			          </TabList>
			          
			          <TabPanel>
    			      <div className="contact-list-container">
                        <div className="contact-list-title-empty"></div>
                        { 
                          contactQnas && contactQnas.map(({
                              _id,
                              user,
                              title,
                              text,
                              comments,
                              created_at,
                              created_at_new=date2string(created_at),
                              author
                            }, index) => {
                              return (
                                <div className="contact-list-item" key={index}>
                                    <div className="contact-item-title-container">
                                      <div className="contact-item-title">{title}</div>
                                      <div className="contact-item-created_at">{created_at_new}</div>
                                    </div>
                                    <div className="contact-item-delete-container">
                                      <button className="contact-item-delete" onClick={this._onClickCancel(_id)}>삭제하기</button>
                                    </div>
                                    <div className="contact-item-text">Q. {text}</div>
                                    
                                    {
    									comments && comments.map(({
    										author,
    										title,
    										text,
    										created_at,
    									}, index) => (
    										<div className="contact-comment-container">
    											<div className="contact-comment-icon"></div>
    											<div className="contact-comment">
    												<div className="contact-comment-top">
    													<div className="contact-comment-name">{author.name}</div>
    													{/* <button className="contact-comment-delete" onClick={this._onClickDeleteComment(_id, index2)}/> */}
    												</div>
    												<div className="contact-comment-text">{text}</div>
    											</div>
    										</div>
    									))
    								}
    								<Collapsible trigger="답변하기" transitionTime={0}>
    								<div className="contact-comment-form">
    									<div className="contact-comment-textarea-container">
    									  <textarea className="contact-comment-textarea" cols="30" rows="4" id={`qna_${index}_comment`} placeholder=""/>
    									</div>
    									<div className="contact-comment-submit-container">
    										<button className="contact-comment-submit" onClick={this._onClickAddQnAComment(index, _id)}>답변하기</button>
    									</div>
    								</div>
    								</Collapsible>
                                </div>
                              )
                            }) 
                        }
                  </div>
                  </TabPanel>
                  
                  <TabPanel>
                    <div className="contact-list-container">
                        <div className="contact-list-title-empty"></div>
                        { 
                          productQnas && productQnas.map(({
                              _id,
                              user,
                              title,
                              text,
                              comments,
                              created_at,
                              created_at_new=date2string(created_at),
                              author
                            }, index) => {
                              return (
                                <div className="contact-list-item" key={index}>
                                    <div className="contact-item-title-container">
                                      <div className="contact-item-title">{title}-{author.name}</div>
                                      <div className="contact-item-created_at">{created_at_new}</div>
                                    </div>
                                    
                                    <div className="contact-item-delete-container">
                                      <button className="contact-item-delete" onClick={this._onClickCancel(_id)}>삭제하기</button>
                                    </div>
                                    
                                    <div className="contact-item-text">Q. {text}</div>
                                    
                                    {
    									comments && comments.map(({
    										author,
    										title,
    										text,
    										created_at,
    									}, index) => (
    										<div className="contact-comment-container">
    											<div className="contact-comment-icon"></div>
    											<div className="contact-comment">
    												<div className="contact-comment-top">
    													<div className="contact-comment-name">{author.name}</div>
    													{/* <button className="contact-comment-delete" onClick={this._onClickDeleteComment(_id, index2)}/> */}
    												</div>
    												<div className="contact-comment-text">{text}</div>
    											</div>
    										</div>
    									))
    								}
      								<Collapsible trigger="댓글 남기기" transitionTime="0">
      								<div className="contact-comment-form">
      									<div className="contact-comment-textarea-container">
      									  <textarea className="contact-comment-textarea" cols="30" rows="4" id={`qna_${index}_comment`} placeholder=""/>
      									</div>
      									<div className="contact-comment-submit-container">
      										<button className="contact-comment-submit" onClick={this._onClickAddQnAComment(index, _id)}>댓글 남기기</button>
      									</div>
      								</div>
      								</Collapsible>
                                  </div>
                                )
                              }) 
                          }
                    </div>
                  </TabPanel>
                  
              </Tabs>
          </div>
        )
      }
    
}

export default UserQnA;