import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function UserDetailsPage() {
	const { id } = useParams()

	return (
		<React.Fragment>
			<h1>User Details for User ID {id}</h1>
			<Link to='/users'>Back</Link>
		</React.Fragment>
	)
}
