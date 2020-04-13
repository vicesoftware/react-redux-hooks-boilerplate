import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

export default function NavBar() {
	return (
		<Navbar bg='dark' variant='dark'>
			<LinkContainer to='/'>
				<Navbar.Brand>Vice Software</Navbar.Brand>
			</LinkContainer>
			<Nav>
				<LinkContainer to='/users'>
					<Nav.Link>Users</Nav.Link>
				</LinkContainer>
			</Nav>
			<Nav>
				<LinkContainer to='/settings'>
					<Nav.Link>Settings</Nav.Link>
				</LinkContainer>
			</Nav>
			<Nav className='mr-auto'>
				<LinkContainer to='/about'>
					<Nav.Link>About</Nav.Link>
				</LinkContainer>
			</Nav>
		</Navbar>
	)
}
