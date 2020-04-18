import React from 'react'
import { connect } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import * as actions from '../notificationPopup.actions'
import { getError } from '../notificationPopup.selectors'

class NotificationPopupContainer extends React.Component {
	render() {
		const { errorMessage, successMessage, closePopup, title } = this.props
		const message = errorMessage || successMessage

		return (
			<>
				{message && (
					<Toast
						show={!!message}
						variant={`${errorMessage ? 'danger' : 'info'}`}
						onClose={closePopup}
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
}

const mapStateToProps = (state) => ({
	...getError(state),
})

const mapDispatchToProps = {
	closePopup: actions.closePopup,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotificationPopupContainer)
