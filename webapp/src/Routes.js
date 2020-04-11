import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import users from './features/users'
import Page from './widgets/Page/Page'
import { About } from './features/About'
import screenTimeReports from './features/screenTimeReports'

const {
	components: { UsersPage, UserDetailsPage },
} = users

const {
	components: { ScreenTimeReports },
} = screenTimeReports

export default function Routes() {
	return (
		<Container>
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
				<PageRoute path='/reports/:userid'>
					<ScreenTimeReports />
				</PageRoute>
				<PageRoute path='/'>
					<UsersPage />
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
