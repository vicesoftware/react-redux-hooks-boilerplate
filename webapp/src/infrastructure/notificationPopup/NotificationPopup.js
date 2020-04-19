import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import { getNotification, closePopup } from './index'

export default function NotificationPopupContainer() {
	const { errorMessage, successMessage, title } = useSelector(getNotification)
	const dispatch = useDispatch()
	const message = errorMessage || successMessage

	return (
		<>
			{message && (
				<Toast
					show={!!message}
					variant={`${errorMessage ? 'danger' : 'info'}`}
					onClose={() => dispatch(closePopup())}
				>
					<Toast.Header>
						<strong className='mr-auto'>
							{title || (errorMessage ? 'Error' : 'Status')}
						</strong>
					</Toast.Header>
					<Toast.Body>{message}</Toast.Body>
				</Toast>
			)}
		</>
	)
}
