import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { selectAllUsers, fetchAllUsers } from './index'
import BusyIndicator from '../../widgets/busyIndicator'
import { selectAllSettings, setNoBusySpinner } from '../settings'

export default function Users() {
	const users = useSelector(selectAllUsers)

	const dispatch = useDispatch()

	const settings = useSelector(selectAllSettings)

	useEffect(() => {
		dispatch(
			fetchAllUsers({
				useCaching: settings.useCaching,
				noBusySpinner: settings.noBusySpinner,
			})
		)
	}, [dispatch, settings.useCaching, settings.noBusySpinner])

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
							onClick={() => dispatch(setNoBusySpinner(false))}
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
