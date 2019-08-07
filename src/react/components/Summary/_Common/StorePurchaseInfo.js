import React, { Component } from 'react'
import { Link } from 'react-router'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { updatePurchaseState, sendInvoiceSMSandEmail } from '../../../api/AppAPI'

import { value2link, value2label } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'

const userLinkFormatter = (cell, row) => {
	return <Link to={`/purchases/${row._id}/summary`}>{cell}</Link>;
}
const detailFormatter = (cell, row) => {
	return <Link to={`/purchases/${row._id}/summary`}>{cell}</Link>;
}

export default class StorePurchaseInfo extends Component {
  state = {
		_id : '',
		invoice_number : ''
	}
  
  render() {
    const {
      purchaseInfo: {
			purchases
		},
      isAdmin,
      title,
      reflashState
    } = this.props
    
    const shippingCompanyFormatter = (cell, row) => {
			return <div>
					{row.state == "배송완료" ? 
					<div>
						<input type="text" id={row._id} className='input-invoice-number' placeholder="송장번호를 입력해주세요." onChange={() => this.Invoice_Number_change(row._id)} />
						<button className='input-shippingCompany-save' onClick={() => this.shippingCompanyupdate2(row._id, row.email, row.addressee_number_new, row.result_description, row.addressee_name)}>저 장</button>
					</div>
					:
					<div>
						<button className='input-shippingCompany-save' onClick={() => this.shippingCompanyupdate(row._id)}>배송완료</button>
					</div>
					}
				</div>
	}
    
    this.options = {
      defaultSortName: 'result_description',
      defaultSortOrder: 'desc'
    };
    
    let purchases_scheduled = new Array;
    for(var e in purchases) {
    	if(purchases[e].purchase_info.purchase_state == "scheduled") {
    		purchases_scheduled.push(purchases[e])
    	}
    }
    
    let purchases_shipping = new Array;
    for(var e in purchases) {
    	if(purchases[e].purchase_info.purchase_state == "shipping") {
    		purchases_shipping.push(purchases[e])
    	}
    }

    let csv_title_1 = title + '-구매자 명단(결제완료).csv'
    let csv_title_2 = title + '-구매자 명단(배송완료).csv'

		let purchase_info_1 = purchases_scheduled.map(({
			_id,
			created_at,
			address: {
				addressee_name,
				addressee_number,
				real_email,
				address1,
				address2,
				zipcode,
			},
			purchase_info: {
				amount,
				purchase_state,
			},
			user: {
				display_name,
				local_email,
				id,
			},
			result_price,
			result_description,
			shippingCompany,
			invoice_number
		}) => ({
			_id,
			addressee_name,
			addressee_number_new : addressee_number == null ? null : addressee_number.substring(3, 4) == '-' ?  addressee_number : addressee_number.substring(0, 3) + '-' + addressee_number.substring(3, 7) + '-' + addressee_number.substring(7, 11),
			email : real_email ? real_email : local_email,
			address: `${address1} ${address2}`,
			zipcode,
			created_at,
			state: purchase_state == 'scheduled' ? '결제완료' : purchase_state == 'shipping' ? '배송완료' : '기 타',
			display_name,
			amount,
			result_price,
			result_description,
			shippingCompany,
			invoice_number
		}))
		
		let purchase_info_2 = purchases_shipping.map(({
			_id,
			created_at,
			address: {
				addressee_name,
				addressee_number,
				real_email,
				address1,
				address2,
				zipcode,
			},
			purchase_info: {
				amount,
				purchase_state,
			},
			user: {
				display_name,
				local_email,
				id,
			},
			result_price,
			result_description,
			shippingCompany,
			invoice_number
		}) => ({
			_id,
			addressee_name,
			addressee_number_new : addressee_number == null ? null : addressee_number.substring(3, 4) == '-' ?  addressee_number : addressee_number.substring(0, 3) + '-' + addressee_number.substring(3, 7) + '-' + addressee_number.substring(7, 11),
			email : real_email ? real_email : local_email,
			address: `${address1} ${address2}`,
			zipcode,
			created_at,
			state: purchase_state == 'scheduled' ? '결제완료' : purchase_state == 'shipping' ? '배송완료' : '기 타',
			display_name,
			amount,
			result_price,
			result_description,
			invoice_number
		}))
		

    return (
      <div className="store-purchase-info-wrapper">
      	<Tabs>
            <TabList>
              <Tab>결제완료</Tab>
              <Tab>배송완료</Tab>
            </TabList>
            <TabPanel>
		        <div className="purchase-info-container">
		          <BootstrapTable data={purchase_info_1} exportCSV={true} csvFileName={csv_title_1} options={this.options}
		              search
		              columnFilter
		              hover
		              pagination >
								<TableHeaderColumn width='50' dataSort={true} dataFormat={userLinkFormatter} dataField="_id" isKey hidden>_id</TableHeaderColumn>
								<TableHeaderColumn width='88' dataSort={true} dataFormat={shippingCompanyFormatter} dataField="invoice_number">배송처리</TableHeaderColumn>
								<TableHeaderColumn width='75' dataSort={true} dataFormat={userLinkFormatter} dataField="state" >상 태</TableHeaderColumn>
								<TableHeaderColumn width='300' dataSort={true} dataFormat={userLinkFormatter} dataField="result_description" >물품 명</TableHeaderColumn>
								<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="addressee_name" >수취인 명</TableHeaderColumn>
								<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="display_name" >닉네임</TableHeaderColumn>
								<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="addressee_number_new" >연락처</TableHeaderColumn>
								<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="email" >메일주소</TableHeaderColumn>
								<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="address" >주 소</TableHeaderColumn>
								<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="zipcode" >우편번호</TableHeaderColumn>
								<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="amount" >결제금액</TableHeaderColumn>
								<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="created_at" >결제일시</TableHeaderColumn>
		            </BootstrapTable>
		        </div>
	        </TabPanel>
	        <TabPanel>
		        <div className="purchase-info-container">
		          <BootstrapTable data={purchase_info_2} exportCSV={true} csvFileName={csv_title_2} options={this.options}
		              search
		              columnFilter
		              hover
		              pagination >
						<TableHeaderColumn width='50' dataSort={true} dataFormat={userLinkFormatter} dataField="_id" isKey hidden>_id</TableHeaderColumn>
						<TableHeaderColumn width='75' dataSort={true} dataFormat={userLinkFormatter} dataField="state" >상 태</TableHeaderColumn>
						<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="invoice_number" >송장번호</TableHeaderColumn>
						<TableHeaderColumn width='249' dataSort={true} dataFormat={shippingCompanyFormatter} dataField="invoice_number" editable={ false }>송장번호입력</TableHeaderColumn>
						<TableHeaderColumn width='300' dataSort={true} dataFormat={userLinkFormatter} dataField="result_description" >물품 명</TableHeaderColumn>
						<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="addressee_name" >수취인 명</TableHeaderColumn>
						<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="display_name" >닉네임</TableHeaderColumn>
						<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="addressee_number_new" >연락처</TableHeaderColumn>
						<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="email" >메일주소</TableHeaderColumn>
						<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="address" >주 소</TableHeaderColumn>
						<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="zipcode" >우편번호</TableHeaderColumn>
						<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="amount" >결제금액</TableHeaderColumn>
						<TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="created_at" >결제일시</TableHeaderColumn>
		            </BootstrapTable>
		        </div>
	        </TabPanel>
        </Tabs>
      </div>
    )
  }
  
  shippingCompanyupdate = async (id) => {
	    let body = {
	    	"purchase_info.purchase_state" : 'shipping'
	    }
	    let purchase_id = id
	    const {
	    	reflashState
	    } = this.props
	    
	    if(confirm('배송완료처리 하시겠습니까?')) {
		    try {
		      let r = await updatePurchaseState({ purchase_id, body })
		      reflashState();
		    } catch (e) {
		      // console.log('e.messagee.messagee.message', e.message);
		    }
	    }
		
		document.getElementById('shippingCompany').value = ''
	}
	
	Invoice_Number_change = (id) => {
		let sc = document.getElementById(id)
	
		this.setState({
			invoice_number : sc.value,
	    });
	  }
	
	shippingCompanyupdate2 = async (id, email, number, items, name) => {
	    let body = {
	    	"invoice_number" : this.state.invoice_number
	    }
	    let purchase_id = id
	    const {
	    	reflashState,
	    	title,
	    	shippingCompany
	    } = this.props
	    
	    let shippingCompany_name = value2label(SelectOptions.ShippingCompanyList, shippingCompany)
	    let shippingCompany_link = value2link(SelectOptions.ShippingCompanyList, shippingCompany)
	    
	    if(!this.state.invoice_number) {
	    	alert('송장번호를 입력해주세요!')
	    }
	    else {
		    try {
		      let r = await updatePurchaseState({ purchase_id, body })
		      reflashState();
		      
		      let r2 = await sendInvoiceSMSandEmail(title, shippingCompany_name, shippingCompany_link, email, number, items, this.state.invoice_number, name);
		    } catch (e) {
		      // console.log('e.messagee.messagee.message', e.message);
		    }
	    }
		
		document.getElementById(id).value = ''
	}
  
}
