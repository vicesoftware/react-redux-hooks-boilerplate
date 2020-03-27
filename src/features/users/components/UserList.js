import React, { useEffect, useState } from 'react'
import './UserList.css'
import { Link, useRouteMatch } from 'react-router-dom'

const intialUsers = []

export default function UserList() {
	const [filter, setFilter] = useState('')
	const [users, setUsers] = useState(intialUsers)

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((json) => setUsers(json))
	}, [setUsers])

	console.log(users)

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
