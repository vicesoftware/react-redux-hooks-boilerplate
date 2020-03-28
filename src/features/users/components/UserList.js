import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useGetUsers } from '../user.effects'
import './UserList.css'

export default function UserList() {
	const [filter, setFilter] = useState('')

	const users = useGetUsers()

	return (
		<React.Fragment>
			<input
				type='text'
				onChange={(e) => setFilter(e.target.value)}
				placeholder='Search...'
			/>

			<ul className='user-list'>
				{users
					.filter((user) =>
						user.name.toLowerCase().includes(filter.toLowerCase())
					)
					.map((user) => (
						<UserItem key={user.id} user={user} />
					))}
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
