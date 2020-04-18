import {
	NOTIFY_SUCCESS,
	NOTIFY_ERROR,
	RESET,
	CLOSE,
} from './notificationPopup.actionTypes'

// We are using let so that we can assign fakes in tests. Might be a better way to do this :P
export const notifyError = ({
	errorMessage,
	message,
	stack,
	componentStack,
}) => {
	console.log(`${errorMessage}:${message}:${stack}
      ${componentStack ? 'componentStack: ' + componentStack : ''}
      `)

	return {
		type: NOTIFY_ERROR,
		payload: {
			errorMessage,
			message,
			stack,
		},
	}
}

export const notifySuccess = (successMessage, { title, config } = {}) => ({
	type: NOTIFY_SUCCESS,
	payload: {
		successMessage,
		config: {
			...config,
			title,
		},
	},
})

export const resetError = () => ({
	type: RESET,
})

export const closePopup = () => ({
	type: CLOSE,
})
