import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { getAllUsers } from '../users.selectors'
import { useGetAllUsers } from '../users.effects'
import { BusyIndicator } from '../../../widgets/busyIndicator'
import settings from '../../settings'

const {
	selectors: { getAllSettings },
} = settings

export default function Users() {
	const users = useSelector(getAllUsers)
	const [noBusySpinner, setNoBusySpinner] = useState(false)

	const settings = useSelector(getAllSettings)

	console.log(users)

	useGetAllUsers({
		useCaching: settings.useCaching,
		noBusySpinner,
		dependecies: [noBusySpinner],
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
					<Form.Group controlId='formBasicCheckbox'>
						<Form.Check
							onChange={() => setNoBusySpinner(!noBusySpinner)}
							checked={noBusySpinner}
							type='checkbox'
							label='noBusySpiner'
						/>
					</Form.Group>
				</Col>
			</Row>
		</div>
	)
}
