import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
	getScreenTimeReportById,
	getScreenTimeReportsConfig,
} from '../screenTimeReports.selectors'
import {
	useGetScreenTimeReportById,
	useGetScreenTimeReportsConfig,
} from '../screenTimeReports.effects'
import { BusyIndicator } from '../../../widgets/busyIndicator'
import modal from '../../../widgets/modal'

const {
	actions: { useShowModal, useHideModal },
} = modal

export default function ScreenTimeReports() {
	const { id } = useParams()

	useGetScreenTimeReportById(id)

	useGetScreenTimeReportsConfig()

	const screenTimeReport = useSelector(getScreenTimeReportById(id))

	const config = useSelector(getScreenTimeReportsConfig)

	const hasReportDataToDisplay =
		screenTimeReport &&
		config &&
		config.activities &&
		screenTimeReport.activeMinutes

	return (
		<Container>
			<Row>
				<Col>
					<h1>Screen Time Reports</h1>
				</Col>
			</Row>
			<Row>
				<Col>
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
									{hasReportDataToDisplay &&
										screenTimeReport.activeMinutes.map((activity) => (
											<tr key={activity.type + activity.duration}>
												<td>{getConfig(activity.type, config).description}</td>
												<td>{getConfig(activity.type, config).conversion}</td>
												<td>
													<Form.Control
														type='number'
														value={activity.duration}
													/>
												</td>
												<td>120</td>
											</tr>
										))}
								</tbody>
							</Table>
						</Form>
					</BusyIndicator>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button onClick={useShowModal}>Add New Activity</Button>
				</Col>
			</Row>
			<AddActivityModal />
		</Container>
	)
}

function getConfig(activityType, config) {
	return config.activities.find((activity) => activity.type === activityType)
}

function AddActivityModal() {
	return (
		<modal.components.Modal>
			<Modal.Header closeButton>
				<Modal.Title>Add Activity</Modal.Title>
			</Modal.Header>
			<Modal.Body>Hi there</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={useHideModal}>
					Close
				</Button>
				<Button variant='primary' onClick={useHideModal}>
					Save Changes
				</Button>
			</Modal.Footer>
		</modal.components.Modal>
	)
}
