import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
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
							{users &&
								users.map((user) => <li key={user.id}>{user.login}</li>)}
						</ul>
					</BusyIndicator>
				</Col>

				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Options</Card.Title>
							<Container>
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
							</Container>
						</Card.Body>
					</Card>
					<Card>
						<Card.Body>
							<Card.Title>About</Card.Title>
							<Card.Text
								style={{
									'max-height': '400px',
									'overflow-y': 'auto',
								}}
							>
								This app allow demonstrating a few features of the boilerplate.
								Things to try.
								<ol>
									<li>
										Go to settings page and turn on useCaching setting to
										doAsync. After you come back to users the server will be
										called again and you will see a busy indicator but if you
										navigate away from users again and come back then you won't
										see a busy indicator as the users will now be in the redux
										cache
									</li>
									<li>
										Go to settings page, refresh the settings page and after it
										reloads turn on noBusySpinner setting to doAsync. Next
										navigate back to this page and you will not see a busy
										indicator but if you look at the network tab you will see
										that the data is being fetched. If you click the "Reload
										with Busy Spinner" button then a second call will be made to
										get users. Under the hood doAsync will not make this call as
										one is already being made but it will turn on the busy
										indicator. This is useful when you want to load data ahead
										of time that a user might want, say in a details pane. You
										can start loading the data in the background with
										noBusySpinner set to true.
									</li>
									<li>
										Disconnect from the internet (turn off your wifi) and reload
										to see errors
									</li>
								</ol>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
