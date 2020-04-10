import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import classnames from 'classnames'
import { TimerButton } from './TimerButton'
import { useTimer } from './useTimer'
import { useToggleTimer } from './useToggleTimer'
import screenTimeReports from '../../screenTimeReports'

const {
	effects: { useCreateActivity },
} = screenTimeReports

export function UserItem({ user, activities }) {
	const { isTimerOn, toggleTimer } = useToggleTimer()
	const [currentActivity, setCurrentActivity] = useState()

	const { content, hours, minutes, seconds } = useTimer({
		isTimerOn,
		children: '',
	})

	const createActivity = useCreateActivity()

	function tryTurnOffTimer() {
		if (isTimerOn) {
			toggleTimer()
			setCurrentActivity('')
			createActivity(
				{
					type: currentActivity.type,
					duration: convertToMinutes(hours, minutes, seconds),
				},
				user.id
			)
		}

		function convertToMinutes(hours, minutes, seconds) {
			const hoursAsMinutes = hours ? Math.ceil(hours / 60) : 0

			const secondsAsMinutes = seconds > 0 ? 1 : 0

			return hoursAsMinutes + minutes + secondsAsMinutes
		}
	}

	function tryTurnOnTimer(activity) {
		if (!isTimerOn) {
			toggleTimer()
			setCurrentActivity(activity)
		}
	}

	const to = `/reports/${user.id}`
	return (
		<Col>
			<Card style={{ width: '18rem' }}>
				<Card.Header>{user.name}</Card.Header>
				<Card.Img variant='top' src={user.imageUrl} />
				{isTimerOn && (
					<Card.ImgOverlay
						className={classnames({ 'active-timer-image': isTimerOn })}
						style={{ color: 'white' }}
					>
						<h1 style={{ marginTop: '30px' }}>{content}</h1>
						<h2>{currentActivity ? currentActivity.description : ''}</h2>
					</Card.ImgOverlay>
				)}
				<Card.Body>
					<Card.Title>Points: 30</Card.Title>
					<Card.Subtitle>
						<h3> </h3>
						<Link to={to}>Details</Link>
						<br />
						<br />
					</Card.Subtitle>
					<Dropdown onClick={tryTurnOffTimer}>
						<Dropdown.Toggle variant='info'>
							{isTimerOn ? 'Stop Activity' : 'Start Activity'}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{activities.map((activity) => (
								<Dropdown.Item
									key={activity.type}
									onClick={() => tryTurnOnTimer(activity)}
									href='#'
								>
									{activity.description}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>{' '}
					<TimerButton variant='warning'>Use Points</TimerButton>{' '}
				</Card.Body>
			</Card>
		</Col>
	)
}
