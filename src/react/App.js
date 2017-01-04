import React, { Component } from 'react'
import { Link } from 'react-router';
import { Nav, Footer, NotFound, Header } from './components/Common';
import update from 'immutability-helper'

import axios from 'axios'

import { fetchUserAndData } from './api/AppAPI'
import { canUseDOM } from '~/src/lib/utils'

let previousLocation = ''

export default class App extends Component {

	state = {
		modal: {}, // { type, message, }
		flashs: [], // { type?, message, level, ... }
		user: {
			isLoggedIn: false,
			isAuthorized: true, // can see this page?
		}
	}

	constructor(props) {
		super(props)

		if(canUseDOM){
			console.log('constructor.previousLocation', document.URL);
			previousLocation = document.URL
		}

	}

	render() {
		const children = this.props.children && React.cloneElement(this.props.children, {
			...this.modalHandlers,
			...this.flashHandlers,
			setUser: this.setUser,
		})


		if(typeof window !== 'undefined') window.setFlash = this.flashHandlers.setFlash

		return (
			<div>
				{
					process.env.NODE_ENV !== 'production'
						? <div>
							Test Links:
							{' '}
							<Link to="/"><button>Home</button></Link>
							{' '}
							<Link to="/"><button>Project</button></Link>
							{' '}
							<Link to="/exhibitions"><button>Exhibitions</button></Link>
							{' '}
							<Link to="/magazines"><button>Magazines</button></Link>
							{' '}
							<Link to="/project-editor"><button>Project Editor</button></Link>
							{' '}
							<Link to="/exhibition-editor"><button>Exhibition Editor</button></Link>
							{' '}
							<Link to="/magazine-editor"><button>Magazine Editor</button></Link>
							{' '}
							<Link to="/sponsor-editor"><button>Sponsor Editor</button></Link>
							{' '}
							<Link to="/login"><button>Login</button></Link>
							{' '}
							<Link to="/signup"><button>Signup</button></Link>
							{' '}
							<Link to="/profile/admin"><button>Admin Profile</button></Link>
							{' '}
							<Link to="/profile/artist"><button>Artist Profile</button></Link>
							{' '}
							<Link to="/profile/editor"><button>Editor Profile</button></Link>
							{' '}
							<Link to="/profile/user"><button>User Profile</button></Link>
							{' '}
							<Link to="/sponsors"><button>Sponsors</button></Link>
							{' '}
							<Link to="/test1"><button>Test1</button></Link>
							{' '}
							<Link to="/test2"><button>Test2</button></Link>
							{' '}
							<Link to="/test3"><button>Test3</button></Link>
						</div>
						: null
				}

				<Header
					{...this.state}
					{...this.modalHandlers}
					{...this.flashHandlers}
				/>

				<Nav></Nav>

				{ children }

				<Footer></Footer>
			</div>
		)
	}

	// propagate to children...!
	setUser = (user) => {
		console.log('setUser.user', user);
		this.setState(update(this.state, {
			user: {
				isLoggedIn: { $set: user.isLoggedIn },
				isAuthorized: { $set: user.isAuthorized },
			}
		}))
	}

	modalHandlers = {
		setModal: (modal) => { this.setState({ modal }) },
		unsetModal: () => { this.setState({ modal: { isOpen: false } }) }
	}

	flashHandlers = {
		// https://www.npmjs.com/package/react-notification-system
		setFlash: (flash) => { // flash = { type?, message, level, ... }
			this.setState(update(this.state, {
				flashs: {
					$push: [{...flash}]
				}
			}))
		},

		clearFlash: () => {
			this.setState(update(this.state, {
				flashs: { $set: [] }
			}))
		}
	}

}
