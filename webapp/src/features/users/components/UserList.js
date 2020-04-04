import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as userSelectors from '../user.selectors'
import { useGetUsers } from '../user.effects'
import './UserList.css'
import { BusyIndicator } from '../../../widgets/busyIndicator/'

export default function UserList() {
	const users = useSelector(userSelectors.getAllUsers)

	useGetUsers()

	return (
		<React.Fragment>
			<ul className='user-list'>
				<BusyIndicator>
					{users.map((user) => (
						<UserItem key={user.id} user={user} />
					))}
				</BusyIndicator>
			</ul>
		</React.Fragment>
	)
}

function UserItem({ user }) {
	const { url } = useRouteMatch()
	const to = `${url}/${user.id}`

	return (
		<li className='user'>
			<Link to={to}>{user.name}</Link>
		</li>
	)
}
