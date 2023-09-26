


import React from 'react'
import Home from './components/Home'
import About from './components/About'
import { Link, Outlet } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'


export default function Layout() {
	return (
		<div>

			<Menu>


				<Menu.Item><Link to='/'> <Icon name='home' /> Home</Link></Menu.Item>
				<Menu.Item><Link to='/about'> <Icon name='user' /> About</Link></Menu.Item>
				<Menu.Item><Link to='/contact'><Icon name='handshake outline' />Contact</Link></Menu.Item>
				<Menu.Item><Link to='/farook'><Icon name='globe' /> Farook</Link></Menu.Item>
				<Menu.Item><Link to='/Todolist'><Icon name='list' /> Todolist </Link></Menu.Item>

			</Menu>

			<Outlet />

		</div>
	)
}
