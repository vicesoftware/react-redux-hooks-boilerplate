import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import {
	getScreenTimeReportById,
	getScreenTimeReportsConfig,
} from '../screenTimeReports.selectors'
import {
	useGetScreenTimeReportById,
	useGetScreenTimeReportsConfig,
} from '../screenTimeReports.effects'
import { BusyIndicator } from '../../../widgets/busyIndicator'

export default function ScreenTimeReports() {
	const { id } = useParams()

	const screenTimeReport = useSelector(getScreenTimeReportById(id))

	useGetScreenTimeReportById(id)

	useGetScreenTimeReportsConfig()

	const config = useSelector(getScreenTimeReportsConfig)

	console.log(screenTimeReport)
	console.log(config)

	return (
		<div>
			<h1>Screen Time Reports</h1>
			<BusyIndicator>
				<Form>
					<Table striped bordered hover variant='dark'>
						<thead>
							<tr>
								<th>Activity Type</th>
								<th>Conversion Rate</th>
								<th>Minutes Spent</th>
								<th>Screen Minutes</th>
							</tr>
						</thead>
						<tbody>
							{screenTimeReport &&
								screenTimeReport.activities &&
								screenTimeReport.activities.map((activity) => (
									<tr>
										<td>activity.description</td>
										<td>activity.conversion</td>
										<td>
											<Form.Control type='number' />
										</td>
										<td>120</td>
									</tr>
								))}
						</tbody>
					</Table>
				</Form>
			</BusyIndicator>
		</div>
	)
}
