import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import users from './features/users'
import Page from './widgets/Page/Page'
import { About } from './features/About'
import { Home } from './features/Home'

const {
	components: { Users },
} = users

export default function Routes() {
	return (
		<Container>
			<Switch>
				<PageRoute path='/about'>
					<About />
				</PageRoute>
				<PageRoute path='/users'>
					<Users />
				</PageRoute>
				<PageRoute path='/'>
					<Home />
				</PageRoute>
			</Switch>
		</Container>
	)
}

function PageRoute({ children, ...rest }) {
	return (
		<Route {...rest}>
			<Page>{children}</Page>
		</Route>
	)
}
