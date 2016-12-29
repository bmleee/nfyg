import React, { Component } from 'react'
import { Link } from 'react-router'

const Tab = () => {
	return (
		<div>
			<Link to="/profile/admin"><button>메인</button></Link>
			<Link to="/profile/admin/project"><button>프로젝트</button></Link>
			<Link to="/profile/admin/product"><button>프로덕트</button></Link>
			<Link to="/profile/admin/user"><button>유저</button></Link>
			<Link to="/profile/admin/sponsor"><button>스폰서</button></Link>
		</div>
	)
}

export default Tab
