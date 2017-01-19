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

export default class Project extends Component {
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

    let isAdmin = userType === 'admin'

    return (
      <div className="summary-project-container" style={{ marginTop: '200px' }}>
        <Tabs>
          <TabList>
            <Tab>Abstract</Tab>
            <Tab>Creator</Tab>
            <Tab>Funding</Tab>
            <Tab>Authorized Users</Tab>
            <Tab>Posts</Tab>
            <Tab>QnAs</Tab>
            <Tab>Sharing Info</Tab>
            <Tab>Purchase Info</Tab>
            <Tab>Sponsor</Tab>
          </TabList>

          <TabPanel>
            { abstract && <Abstract abstract={abstract} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { creator && <Creator creator={creator} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { funding && <Funding funding={funding} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { authorizedUsers && <AuthorizedUsers authorizedUsers={authorizedUsers} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { posts && <Posts posts={posts} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { qnas && <QnAs qnas={qnas} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { sharing_info && <SharingInfo sharingInfo={sharing_info} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { purchase_info && <PurchaseInfo purchaseInfo={purchase_info} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { sponsor && <Sponsor sponsor={sponsor} isAdmin={isAdmin} />}
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}
