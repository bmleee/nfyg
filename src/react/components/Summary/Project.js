import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {
  Abstract,
  AuthorizedUsers,
  Creator,
  Funding,
  Posts,
  QnAs,
  SharingInfo,
  PurchaseInfo,
  Sponsor
} from './_Common'

import { fetchSummary } from '~/src/react/api/AppAPI'

export default class ProjectSummary extends Component {
  state = {
    userType: '',
    project_summary: {
      abstract: null,
      authorizedUsers: null,
      creator: null,
      funding: null,
      posts: null,
      qnas: null,
      sharing_info: null,
      purchase_info: null,
      sponsor: null,
    },
  }

  async componentDidMount() {
    try {
      const {
        user,
        data: {
          userType,
          project_summary
        }
      } = await fetchSummary({ projectName: this.props.params.projectName })

      appUtils.setUser(user)
      this.setState({ userType, project_summary })
      console.log(project_summary);
    } catch (e) {
      console.error(e);
    }
    
    window.scrollTo(0, 0)
  }

  render() {
    const {
      userType,
      project_summary: {
        abstract,
        authorizedUsers,
        creator,
        funding,
        posts,
        qnas,
        sharing_info,
        purchase_info,
        sponsor
      }
    } = this.state
    
    console.log(this)
    
    let infoBackground = {
			backgroundImage: `url("${ abstract && abstract.imgSrc }")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
    

    let isAdmin = userType === 'admin'

    return (
      <div className="summary-project-container">
        <div className="purchase-heading" style={infoBackground}>
          <div className="project-summary-header">
            {/* <div className="project-summary-sponsor-name">{ sponsor && sponsor.displayName }</div> */}
  					<h1 className="project-summary-title">{ abstract && abstract.longTitle }</h1>
  					<p className="project-summary-state">{ abstract && abstract.state }</p>
				  </div>
				</div>
				<div className="project-summary-body">
        <Tabs>
        
          <TabList>
            <Tab>후원자 명단</Tab>
            <Tab>소식 관리</Tab>
            <Tab>관리자</Tab>
          </TabList>

          <TabPanel>
            { false && purchase_info && <PurchaseInfo purchaseInfo={purchase_info} isAdmin={isAdmin} />}
            { false && sharing_info && <SharingInfo sharingInfo={sharing_info} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { posts && <Posts posts={posts} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { authorizedUsers && <AuthorizedUsers authorizedUsers={authorizedUsers} isAdmin={isAdmin} />}
          </TabPanel>
          
        </Tabs>
        </div>
      </div>
    )
  }
}
