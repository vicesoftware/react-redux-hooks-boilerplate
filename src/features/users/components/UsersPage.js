import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import UserList from './UserList'
import UserDetailsPage from './UserDetailsPage'

function UsersPage() {
	const { path } = useRouteMatch()

	return (
		<React.Fragment>
			<h1>Users</h1>
			<Switch>
				<Route path={path}>
					<UserList />
				</Route>
				<Route path={`${path}/:id`}>
					<UserDetailsPage />
				</Route>
			</Switch>
		</React.Fragment>
	)
}

export default UsersPage
