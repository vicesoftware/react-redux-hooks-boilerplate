import React from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import { useGetUser } from '../user.effects'
import screenTimeReports from '../../screenTimeReports'
import * as userSelectors from '../user.selectors'
import './UserList.css'
import { BusyIndicator } from '../../../widgets/busyIndicator'

const {
	effects: { useGetScreenTimeReportByUserId },
	selectors: { getScreenTimeReportsByUserId },
} = screenTimeReports

export default function UserDetailsPage() {
	const { id } = useParams()

	const user = useSelector(userSelectors.getUser(id))

	useGetUser(id)

	const reports = useSelector(getScreenTimeReportsByUserId(id))

	console.log(reports)

	useGetScreenTimeReportByUserId(id)

	return (
		<React.Fragment>
			<h1>Screen Time Reports for {user.name}</h1>
			<BusyIndicator>
				<ul className='user-list'>
					{reports &&
						reports.map((report) => (
							<ReportItem key={report.id} report={report} />
						))}
				</ul>
			</BusyIndicator>
			<LinkContainer to='/users'>
				<Button>Back</Button>
			</LinkContainer>
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
