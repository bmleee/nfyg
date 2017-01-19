import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {
  Abstract,
  AuthorizedUsers,
  Funding,
  QnAs,
  PurchaseInfo,
} from './_Common'

import { fetchSummary } from '~/src/react/api/AppAPI'

export default class Product extends Component {
  state = {
    userType: '',
    product_summary: {
      abstract: null,
      authorizedUsers: null,
      funding: null,
      qnas: null,
      purchase_info: null,
    },
  }

  async componentDidMount() {
    try {
      const {
        user,
        data: {
          userType,
          product_summary
        }
      } = await fetchSummary({ productName: this.props.params.productName })

      appUtils.setUser(user)
      this.setState({ userType, product_summary })
      console.log(product_summary);
    } catch (e) {
      console.error(e);
    }

  }

  render() {
    const {
      userType,
      product_summary: {
        abstract,
        authorizedUsers,
        funding,
        qnas,
        purchase_info,
      }
    } = this.state

    let isAdmin = userType === 'admin'

    return (
      <div className="summary-project-container" style={{ marginTop: '200px' }}>
        <Tabs>
          <TabList>
            <Tab>Abstract</Tab>
            <Tab>Funding</Tab>
            <Tab>Authorized Users</Tab>
            <Tab>QnAs</Tab>
            <Tab>Purchase Info</Tab>
          </TabList>

          <TabPanel>
            { abstract && <Abstract abstract={abstract} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { funding && <Funding funding={funding} stat={purchase_info.stat} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { authorizedUsers && <AuthorizedUsers authorizedUsers={authorizedUsers} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { qnas && <QnAs qnas={qnas} isAdmin={isAdmin} />}
          </TabPanel>
          <TabPanel>
            { purchase_info && <PurchaseInfo purchaseInfo={purchase_info} isAdmin={isAdmin} />}
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}
