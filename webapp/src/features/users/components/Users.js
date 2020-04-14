import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { getAllUsers } from '../users.selectors'
import { useGetAllUsers } from '../users.effects'
import { BusyIndicator } from '../../../widgets/busyIndicator'
import * as settings from '../../settings'

const {
	selectors: { getAllSettings },
	actions: { setNoBusySpinner },
} = settings

export default function Users() {
	const users = useSelector(getAllUsers)

	const dispatch = useDispatch()

	const settings = useSelector(getAllSettings)

	useGetAllUsers({
		useCaching: settings.useCaching,
		noBusySpinner: settings.noBusySpinner,
		dependecies: [settings.noBusySpinner],
	})

	return (
		<div>
			<Row>
				<Col>
					<h1>Users</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<BusyIndicator>
						<ul>
							{users.map((user) => (
								<li key={user.id}>{user.login}</li>
							))}
						</ul>
					</BusyIndicator>
				</Col>

				<Col>
					<Row>
						<Button
							onClick={() => dispatch(setNoBusySpinner(true))}
							variant='info'
						>
							Reload with Busy Spinnner
						</Button>
					</Row>
					<Row>
						<strong>{`noBusySpinner: ${settings.noBusySpinner}`}</strong>
					</Row>
					<Row>
						<strong>{`useCaching: ${settings.useCaching}`}</strong>
					</Row>
				</Col>
			</Row>
		</div>
	)
}
