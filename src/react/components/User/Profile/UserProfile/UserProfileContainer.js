import React, { Component, PropTypes } from 'react'
import update from 'immutability-helper'

import UserProfilecardsetting from './UserProfilecardsetting'
import UserProfileAddressSetting from './UserProfileAddressSetting'

import { fetchUserProfile, updateUserProfile, upload_file } from '../../../../api/AppAPI'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MetaTags from 'react-meta-tags';

export default class UserProfileContainer extends Component {

  state = {
    profile: {
      fb_id: '',
      local_email: '',
      sub_email: '',
      name: '',
      display_name: '',
      image: '',
      intro: '',
    },
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
    
    try {
      const {
        user,
        data: {
          profile
        }
      } = await fetchUserProfile()

      appUtils.setUser(user)
      this.setState({ profile })

      const {
        fb_id = '',
        local_email = '',
        sub_email = '',
        name,
        display_name,
        image = '',
        intro = '',
        contact = ''
      } = profile


    } catch (e) {
      // console.error(e);
    }
  }


	render() {
		let { profile } = this.state

    if (!profile) return <div>Loading...</div>
    
    const {
      displayName,
      display_name,
    } = appUtils.getUser()
    
		let {
      fb_id,
      local_email,
      image,
      intro,
      contact,
      sub_email
    } = profile
    
    let new_contact = profile.contact && profile.contact.split("-")
    let real_email = !profile && profile.sub_email ? profile && profile.local_email : profile && profile.sub_email
    
    let name = displayName || display_name

		const info = profile && (
			<div className="mypage-info-container">
				<div className="mypage-thumbnail-container">
					<img className="profile-user-thumbnail" src={image} alt=""/>
					<h3>{name}</h3>
				</div>
			</div>
		)

		const profilesetting =  (
			<div className="profile-setting-container">
				<form>
				<div className="profile-setting-detail">
  				<p className="profile-small-title">프로필 사진</p>
  				<div className="profile-user-img-setting-container">
    				<div className="profile-user-img-setting">
              <img className="profile-user-img" src={image} alt=""/>
    				</div>
    				<div className="profile-user-img-uploade">
      				<input className="profile-setting-file" type="file" accept="image/*" onChange={this._onClickUploadFile} />
      				<p className="profile-setting-file-text">사이즈는 가로 200px, 세로 200px에 최적화 되어 있으며 jpg, gif, png파일을 지원합니다.</p>
    				</div>
  				</div>
				</div>

				<div className="profile-setting-detail-m">
  				<p className="profile-small-title">이 름</p>
  				<input className="profile-setting-text" value={profile.display_name} onChange={this._onChangeName} type="text" id="user-name"/>
				</div>

				<div className="profile-setting-detail-m">
				<p className="profile-small-title">연락처</p>
  				<input className="profile-setting-text" type="text" value={profile.contact} onChange={this._onChangeContact} id="user-contact"/>
				</div>

				<div className="profile-setting-detail">
				      <p className="profile-small-title">이메일</p>
				    <input className="profile-setting-text" type="text" value={profile.sub_email || profile.local_email} onChange={this._onChangeSubemail} id="user-email"/>
				</div>
        
        {/*
				<div className="profile-setting-detail-m">
  				<p className="profile-small-title">페이스북 주소</p>
  				<input className="profile-setting-text" type="text" value={`www.facebook.com/${fb_id}`} readOnly/>
				</div>
				*/}

				<div className="profile-setting-detail">
  				<p className="profile-small-title">자기소개</p>
  				<textarea className="project-setting-textarea" value={intro} onChange={this._onChangeIntro} type="textarea" id="user-intro"/>
				</div>

				{/* <input className="profile-setting-checkbox" type="checkbox" />
				<p className="profile-checkbox-title">이메일 수신여부</p> */}

				<div className="profile-setting-submit-container">
          <button className="profile-setting-submit" onClick={this._onClickUpdateProfile}>프로필 수정</button>
				</div>

				</form>
			</div>
		)

		if(!profile)
			return <div>Profile is loading..</div>
		else
			return (
				<div className="profile">
				  <MetaTags>
		            <title>프로필 설정 - 7Pictures</title>
		      </MetaTags>
					{info}

					<Tabs onSelect={this.handleSelect} selectedIndex={0}>
					<TabList>
						{/* <Tab>후원 내역</Tab> */}
						<Tab><div className="profile_tab1">프로필</div></Tab>
						<Tab><div className="profile_tab2">결제카드</div></Tab>
						<Tab><div className="profile_tab3">배송지</div></Tab>
					</TabList>

					<TabPanel>
					 {profilesetting}
					</TabPanel>

					<TabPanel>
            <UserProfilecardsetting />
					</TabPanel>
					<TabPanel>

            <UserProfileAddressSetting />
					</TabPanel>
					</Tabs>

				</div>
			)
	}

	_onClick = () => {
		new daum.Postcode({
            oncomplete: function(data) {

                var fullAddr = '';
                var extraAddr = '';


                if (data.userSelectedType === 'R') {
                    fullAddr = data.roadAddress;

                } else {
                    fullAddr = data.jibunAddress;
                }


                if(data.userSelectedType === 'R'){

                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }

                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }

                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }


                document.getElementById('postcode').value = data.zonecode;
                document.getElementById('address1').value = fullAddr;
                document.getElementById('address2').focus();
            }
        }).open();
	}

  _onClickUploadFile = async (e) => {

    let file = e.target.files[0]

    // console.log('file to upload', file);
    const { sourceURL } = await upload_file(file)

    this.setState(update(this.state, {
      profile: {
        image: { $set: sourceURL }
      }
    }))
  }
  
  _onChangeName = (e) => {
    let n = e.target.value
    this.setState(update(this.state, {
      profile: {
        display_name: { $set: n }
      }
    }))
  }
  
  _onChangeSubemail = (e) => {
    let n = e.target.value
    this.setState(update(this.state, {
      profile: {
        sub_email: { $set: n }
      }
    }))
  }
  
  _onChangeContact = (e) => {
    let n = e.target.value
    this.setState(update(this.state, {
      profile: {
        contact: { $set: n }
      }
    }))
  }
  
  _onChangeIntro = (e) => {
    let n = e.target.value
    this.setState(update(this.state, {
      profile: {
        intro: { $set: n }
      }
    }))
  }

  _onClickUpdateProfile = async () => {
    let body = {
      sub_email: document.getElementById('user-email').value || '',
      display_name: document.getElementById('user-name').value || '',
      image: this.state.profile.image,
      intro: document.getElementById('user-intro').value || '',
      contact: document.getElementById('user-contact').value || ''
    }

    alert('프로필이 성공적으로 변경되었습니다.')

    try {
      let r = await updateUserProfile(body)
      // console.log(r)
    } catch (e) {
      // console.error(e);
    }
  }
}
