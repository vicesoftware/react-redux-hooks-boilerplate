import React from 'react'
import Container from 'react-bootstrap/Container'
import './page.css'

export default function Page({ children }) {
	return (
		<div className='App'>
			<Container>{children}</Container>
		</div>
	)
}
