import React from 'react'
import './page.css'

export default function Page({ children }) {
	return (
		<div className='App'>
			<header className='App-header'>{children}</header>
		</div>
	)
}
