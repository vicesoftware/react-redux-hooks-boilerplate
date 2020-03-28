import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetUser, useGetScreenTimeReports } from '../user.effects'

export default function UserDetailsPage() {
	const { id } = useParams()

	const user = useGetUser(id)

	const reports = useGetScreenTimeReports(id)

	return (
		<React.Fragment>
			<h1>User Details for User {user.name}</h1>
			<ul>
				{reports.map((report) => (
					<li key={report.id}>{report.date}</li>
				))}
			</ul>
			<Link to='/users'>Back</Link>
		</React.Fragment>
	)
}
