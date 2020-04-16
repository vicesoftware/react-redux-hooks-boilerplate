import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Page from './widgets/Page/Page'
import { About } from './features/About'
import { Home } from './features/Home'
import Users from './features/users'
import Settings from './features/settings'
import demo from './features/demo'

const {
	components: { Demo },
} = demo

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
				<PageRoute path='/settings'>
					<Settings />
				</PageRoute>
				<PageRoute path='/demo'>
					<Demo />
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
