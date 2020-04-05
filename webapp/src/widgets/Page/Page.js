import React from 'react'
import Container from 'react-bootstrap/Container'
import './page.css'

export default function Page({ children }) {
	return (
		<div>
			<Container style={{ marginTop: '20px' }}>{children}</Container>
		</div>
	)
}
