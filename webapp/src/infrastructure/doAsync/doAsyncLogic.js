import http from '../http'
import {
	REQUEST_ALREADY_PENDING_ASYNC,
	TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC,
} from './doAsync.actionTypes'
import {
	addPendingRequest,
	deletePendingRequest,
	setBusySpinner,
	selectPendingRequest,
} from '../pendingRequest'
import { notifyError } from '../notificationPopup'
import {
	decrementBusyIndicator,
	incrementBusyIndicator,
} from '../../widgets/busyIndicator'

export function cleanUpPendingRequests({
	url,
	httpMethod,
	busyIndicatorName,
	dispatch,
	getState,
}) {
	if (!getState || typeof getState !== 'function') {
		throw new Error('getState is required and must be a function')
	}

	if (!selectPendingRequest(getState(), { url, httpMethod })) {
		return
	}

	if (selectPendingRequest(getState(), { url, httpMethod }).turnSpinnerOff) {
		dispatch({ type: TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC })
		dispatch(decrementBusyIndicator(busyIndicatorName))
	}

	dispatch(deletePendingRequest({ url, httpMethod }))
}

export function handleError(
	exception,
	onError,
	dispatch,
	httpMethod,
	url,
	httpConfig,
	errorMessage
) {
	if (onError) {
		onError(exception)
	} else {
		logError(dispatch, httpMethod, url, httpConfig, {
			exception,
			errorMessage: `${errorMessage}.
      An error occurred when trying to dispatch results of ajax call to Redux.`,
		})
	}
}

export function getError(httpMethod, url, httpConfig, errorMessage) {
	return `${errorMessage && errorMessage + '. '}
    Unable to complete http request ${httpMethod}:${url} 
      with httpConfig: ${JSON.stringify(httpConfig)}.`
}

export function logError(
	dispatch,
	httpMethod,
	url,
	httpConfig,
	{ exception, errorMessage } = {}
) {
	console.log(
		`${getError(httpMethod, url, httpConfig, errorMessage)}
       Failed with error:`,
		exception
	)

	if (errorMessage) {
		dispatch(notifyError(errorMessage))
	}
}

export function requestIsAlreadyPending({
	noBusySpinner,
	url,
	httpMethod,
	httpConfig,
	busyIndicatorName,
	dispatch,
	getState,
} = {}) {
	if (!getState || typeof getState !== 'function') {
		throw new Error('get state is required and must be a function')
	}

	const pendingRequest = selectPendingRequest(getState(), { url, httpMethod })

	if (pendingRequest) {
		const currentRequestRequiresABusySpinner = !noBusySpinner

		if (!pendingRequest.turnSpinnerOff && !noBusySpinner) {
			dispatch(incrementBusyIndicator(busyIndicatorName))
		}

		dispatch(
			setBusySpinner({
				url,
				httpMethod,
				turnSpinnerOff: currentRequestRequiresABusySpinner,
			})
		)

		dispatch({
			type: REQUEST_ALREADY_PENDING_ASYNC,
			payload: {
				url,
				httpMethod,
				httpConfig,
				noBusySpinner,
			},
		})
		return true
	}

	// At this point we don't have a pending request and
	// the current request doesn't want a spinner so we
	// need to add it to the list of pending requests so
	// future request will know this request is pending
	if (noBusySpinner) {
		dispatch(addPendingRequest({ url, httpMethod }))
	}

	return false
}

export function buildHeaders(url, httpConfig) {
	const defaultHeadersObj = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}

	return httpConfig
		? {
				headers: {
					...defaultHeadersObj.headers,
					...httpConfig.headers,
				},
		  }
		: defaultHeadersObj
}

export function validateInput(url, httpMethod) {
	if (!url) {
		throw new Error('url is required.')
	}

	if (!httpMethod || !http[httpMethod]) {
		throw new Error(
			'httpMethod is required and must index the http service and resolve to a method.'
		)
	}
}
