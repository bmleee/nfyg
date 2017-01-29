import React, { Component, PropTypes } from 'react'
import update from 'immutability-helper'

import UserProfilecardsetting from './UserProfilecardsetting'
import UserProfileAddressSetting from './UserProfileAddressSetting'

import { fetchUserProfile, updateUserProfile, upload_file } from '../../../../api/AppAPI'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class UserProfileContainer extends Component {

  state = {
    profile: {
      fb_id: '',
      local_email: '',
      name: '',
      image: '',
      intro: '',
    },
  }

  async componentDidMount() {
    try {
      const {
        user,
        data: {
          profile
        }
      } = await fetchUserProfile()

      console.log('fetched profile', profile);

      appUtils.setUser(user)
      this.setState({ profile })

      const {
        fb_id = '',
        local_email = '',
        name,
        image = '',
        intro = '',
        contact = ''
      } = profile

      document.getElementById('user-email').value = local_email
      document.getElementById('user-name').value = name
      document.getElementById('user-intro').value = intro
      contact && contact.split('-').forEach((c, i) => {
        document.getElementById(`user-contact-${i}`).value = c
      })

    } catch (e) {
      console.error(e);
    }
  }


	render() {
		const { profile } = this.state

    if (!profile) return <div>Loading...</div>

		const {
      fb_id,
      local_email,
      name,
      image,
      intro,
    } = profile

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
  				<input className="profile-setting-text" type="text" id="user-name"/>
				</div>

				<div className="profile-setting-detail-m">
				<p className="profile-small-title">연락처</p>
  				<div className="profile-setting-num-container-1">
			      <input className="profile-setting-num-1" type="number" maxLength="3" id="user-contact-0"/>
  				</div>

  				<div className="profile-setting-num-container-2">
			      <input className="profile-setting-num-2" type="number" maxLength="4" id="user-contact-1"/>
  				</div>

  				<div className="profile-setting-num-container-3">
			      <input className="profile-setting-num-3" type="number" maxLength="4" id="user-contact-2"/>
  				</div>
				</div>

				<div className="profile-setting-detail-m">
				      <p className="profile-small-title">이메일</p>
				    <input className="profile-setting-text" type="text" id="user-email" />
				</div>

				<div className="profile-setting-detail-m">
  				<p className="profile-small-title">페이스북 주소</p>
  				<input className="profile-setting-text" type="text" value={`www.facebook.com/${fb_id}`}/>
				</div>

				<div className="profile-setting-detail">
  				<p className="profile-small-title">자기소개</p>
  				<textarea className="project-setting-textarea" type="textarea" id="user-intro"/>
				</div>

				<input className="profile-setting-checkbox" type="checkbox" />
				<p className="profile-checkbox-title">이메일 수신여부</p>

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
					{info}

					<Tabs onSelect={this.handleSelect} selectedIndex={0}>
					<TabList>
						{/* <Tab>후원 내역</Tab> */}
						<Tab>프로필 설정</Tab>
						<Tab>결제카드 등록</Tab>
						<Tab>배송지 등록</Tab>
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

    console.log('file to upload', file);
    const { sourceURL } = await upload_file(file)

    this.setState(update(this.state, {
      profile: {
        image: { $set: sourceURL }
      }
    }))
  }

  _onClickUpdateProfile = async () => {
    let body = {
      local_email: document.getElementById('user-email').value || '',
      name: document.getElementById('user-name').value || '',
      image: this.state.profile.image,
      intro: document.getElementById('user-intro').value || '',
      contact: [0,1,2].map( (i) => document.getElementById(`user-contact-${i}`).value || '' ).join('-')
    }

    console.log(body)

    alert('!@#')

    try {
      let r = await updateUserProfile(body)
      console.log(r)
    } catch (e) {
      console.error(e);
    }
  }
}
