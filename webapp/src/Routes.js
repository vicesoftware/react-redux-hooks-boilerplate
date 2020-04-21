import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Page from './widgets/Page/Page'
import Home from './features/Home'
import Authenticated from './features/Authenticated'
import Authorized from './features/Authorized'
import Users from './features/users'
import Settings from './features/settings'
import SignIn from './features/SignIn'

export default function Routes() {
	return (
		<Switch>
			<PageRoute path='/users'>
				<Users />
			</PageRoute>
			<PageRoute path='/settings'>
				<Settings />
			</PageRoute>
			<PageRoute path='/authenticated'>
				<Authenticated />
			</PageRoute>
			<PageRoute path='/authorized'>
				<Authorized />
			</PageRoute>
			<PageRoute path='/sign-in'>
				<SignIn />
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
