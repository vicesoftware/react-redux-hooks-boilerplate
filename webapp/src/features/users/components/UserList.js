import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { useGetUsers } from '../user.effects'
import * as userActions from '../user.actionsTypes'
import * as userSelectors from '../user.selectors'
import dispatchAsync from '../../../infrastructure/dispatchAsync'
import './UserList.css'

function useGetUsers() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatchAsync({
			url: 'https://jsonplaceholder.typicode.com/users',
			actionType: userActions.GET_ALL_ASYNC,
			dispatch,
		})
		// dispatch({ type: userActions.GET_ALL_ASYNC.REQUESTED })

		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then((response) => response.json())
		// 	.then((json) =>
		// 		dispatch({ type: userActions.GET_ALL_ASYNC.RECEIVED, payload: json })
		// 	)
		// 	.catch((e) =>
		// 		console.log({ type: userActions.GET_ALL_ASYNC.ERROR, payload: e })
		// 	)
	}, [dispatch])
}

export default function UserList() {
	const [filter, setFilter] = useState('')

	const users = useSelector(userSelectors.getAllUsers)

	useGetUsers()

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
