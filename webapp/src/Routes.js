import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Page from './widgets/Page/Page'
import { About } from './features/About'
import { Home } from './features/Home'
import Users from './features/users'
import Settings from './features/settings'

export default function Routes() {
	return (
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
