import React from 'react'
import { Switch, Route } from 'react-router-dom'
import users from './features/users'
import Page from './widgets/Page/Page'

const {
	components: { UsersPage, UserDetailsPage },
} = users

export default function Routes() {
	return (
		<Switch>
			<PageRoute path='/about'>
				<About />
			</PageRoute>
			<PageRoute path='/users/:id'>
				<UserDetailsPage />
			</PageRoute>
			<PageRoute path='/users'>
				<UsersPage />
			</PageRoute>
			<PageRoute path='/'>
				<Home />
			</PageRoute>
		</Switch>
	)
}

function PageRoute({ children, ...rest }) {
	return (
		<Route {...rest}>
			<Page>{children}</Page>
		</Route>
	)
}

// Left these here because they are simple and this is just to provide example for routing
function About() {
	return <h2>About</h2>
}

function Home() {
	return <h2>Home</h2>
}
