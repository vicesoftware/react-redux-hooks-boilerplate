import React from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../users.selectors'
import { useGetAllUsers } from '../users.effects'

export default function Users() {
	const users = useSelector(getAllUsers)

	useGetAllUsers()

	return (
		<div>
			<h1>Users</h1>
			{users.length === 0 ? (
				'Loading...'
			) : (
				<ul>
					{users.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ul>
			)}
		</div>
	)
}
