import React, { Component } from 'react'
import { Link } from 'react-router';


import { Nav, Footer } from './components/Common';

export default class App extends Component {
	state = {
		previousLocation: {},
		authority_level: 10000,
		
	}

	render() {
		const {
			children
		} = this.props

		console.log('App', this);

		return (
			<div>
				<div>
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
					<Link to="/profile"><button>Profile</button></Link>
					{' '}
					<Link to="/sponsors"><button>Sponsors</button></Link>
					{' '}
					<Link to="/test1"><button>Test1</button></Link>
					{' '}
					<Link to="/test2"><button>Test2</button></Link>
					{' '}
					<Link to="/test3"><button>Test3</button></Link>
				</div>

				<Nav></Nav>

				{ children }

				<Footer></Footer>
			</div>
		)
	}
}
