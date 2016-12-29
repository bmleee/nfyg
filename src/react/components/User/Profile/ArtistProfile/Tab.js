import React, { Component } from 'react'
import { Link } from 'react-router'

const Tab = () => {
	return (
		<div>
			<Link to="/profile/artist"><button>메인</button></Link>
			<Link to="/profile/artist/project"><button>프로젝트</button></Link>
			<Link to="/profile/artist/product"><button>프로덕트</button></Link>
		</div>
	)
}

export default Tab
