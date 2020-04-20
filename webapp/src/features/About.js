import React from 'react'
// Left these here because they are simple and this is just to provide example for routing
export default function About() {
	return (
		<>
			<h2>About</h2>
			<p>
				Created by{' '}
				<a href='http://www.vicesoftware.com' target='new'>
					Vice Software, LLC
				</a>{' '}
				to enable high velocity developement and easy maintenace. See details{' '}
				<a
					href='https://github.com/vicesoftware/react-redux-hooks-boilerplate'
					target='new'
				>
					here
				</a>
				.
			</p>
		</>
	)
}
