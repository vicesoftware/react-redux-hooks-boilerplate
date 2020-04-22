import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { fetchAllUsers } from './users.asyncActions'
import { selectAllUsers } from './users.selectors'
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
					<h2>Users</h2>
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
					<Help />
				</Col>
			</Row>
		</div>
	)
}

function Help() {
	return (
		<Card>
			<Card.Body>
				<Card.Title>About</Card.Title>
				<Card.Text>
					This app demonstrates three features of the boilerplate:
				</Card.Text>
				<div
					style={{
						maxHeight: '400px',
						overflowY: 'auto',
						paddingTop: '5px',
					}}
				>
					<Card.Subtitle className='mb-2 text-muted'>useCaching</Card.Subtitle>
					<span>
						doAsync takes a useCaching argument which will avoid trips to the
						API for data that is already in Redux. To see this
						<ol>
							<li>go to settings page and turn on useCaching</li>
							<li>
								navigate back to the users page and the API will be called again
								but the call will be recorded by the httpCache module (you can
								see all this happen in Redux DevTools)
							</li>
							<li>
								{' '}
								navigate away from users and come back and then you won&apos;t
								see a busy indicator as the users will now be in the redux cache
							</li>
						</ol>
					</span>
					<Card.Subtitle className='mb-2 text-muted'>
						nBusySpinner
					</Card.Subtitle>
					<span>
						doAsync takes a noBusySpinner argument which will avoid trips to the
						API for data that is already in Redux. To see this
						<ol>
							<li>navigate to settings page</li>
							<li>refresh the browser on the settings page</li>
							<li>
								after the settings page reloads turn check the noBusySpinner
								option
							</li>
							<li>
								{' '}
								navigate back to users page and you won&apos;t see a busy
								indicator while the data is loading
							</li>
							<li>
								repeate these steps and then quickly click the &quot;Reload with
								Busy Spinner&quot; which will call doAsync again but with the
								noBusySpinner option set to true. This will
								<ol>
									<li>
										determine there is already a request in progress so it
										won&apos;t call the API again
									</li>
									<li>
										determine that the busyIndicator isn&apos;t being showed but
										should be so will turn the busy indicator on
									</li>
								</ol>
							</li>
						</ol>
					</span>
					<Card.Subtitle className='mb-2 text-muted'>
						NotificationPopups integration with doAsync
					</Card.Subtitle>
					<p>
						This page is configured with both a success message and an
						errorMessage when it calls doAsync. The successMessages causes a
						popup notification to be shown with &quot;Users loaded&quot; in it
						after the users load. If you want to see the errorMessage,
						disconnect from the internet and refresh the page. You will see that
					</p>
				</div>
			</Card.Body>
		</Card>
	)
}
