import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

export default function NavBar() {
	return (
		<Navbar bg='dark' variant='dark'>
			<Navbar.Brand>Vice Software</Navbar.Brand>
			<Nav className='mr-auto'>
				<LinkContainer exact to='/'>
					<Nav.Link href='home'>Home</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/users'>
					<Nav.Link href='users'>Users</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/about'>
					<Nav.Link href='about'>About</Nav.Link>
				</LinkContainer>
			</Nav>
		</Navbar>
	)
}
