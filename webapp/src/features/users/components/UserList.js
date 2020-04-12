import React from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import * as userSelectors from '../user.selectors'
import { useGetUsers } from '../user.effects'
import './UserList.css'
import { BusyIndicator } from '../../../widgets/busyIndicator/'
import { UserItem } from './UserItem'
import screenTimeReports from '../../screenTimeReports'

const {
	selectors: { getScreenTimeReportsConfig },
	effects: { useGetScreenTimeReportsConfig },
} = screenTimeReports

export default function UserList() {
	const users = useSelector(userSelectors.getAllUsers)

	useGetScreenTimeReportsConfig()

	const config = useSelector(getScreenTimeReportsConfig)

	useGetUsers()

	return (
		<React.Fragment>
			<BusyIndicator>
				<Row>
					{users.map((user) => (
						<UserItem
							key={user.id}
							user={user}
							activities={config.activities}
						/>
					))}
				</Row>
			</BusyIndicator>
		</React.Fragment>
	)
}
