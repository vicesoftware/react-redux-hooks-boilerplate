import React from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUser, useGetScreenTimeReports } from '../user.effects'
import * as userSelectors from '../user.selectors'
import './UserList.css'

export default function UserDetailsPage() {
	const { id } = useParams()

	const user = useSelector(userSelectors.getUser(id))

	useGetUser(id)

	const reports = useSelector(userSelectors.getScreenTimeReports(id))

	console.log(reports)

	useGetScreenTimeReports(id)

	return (
		<React.Fragment>
			<h1>Screen Time Reports for {user.name}</h1>
			<ul className='user-list'>
				{reports.map((report) => (
					<ReportItem key={report.id} report={report} />
				))}
			</ul>
			<Link to='/users'>Back</Link>
		</React.Fragment>
	)
}

function ReportItem({ report }) {
	const routeMatch = useHistory()

	console.log(routeMatch)

	const to = `/reports/${report.id}`

	return (
		<li className='user'>
			<Link to={to}>{report.date}</Link>
		</li>
	)
}
