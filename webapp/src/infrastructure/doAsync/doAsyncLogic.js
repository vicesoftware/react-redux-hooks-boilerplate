import * as notificationActions from '../notificationPopup/notificationPopup.actions'
import http from '../http'
import {
	REQUEST_ALREADY_PENDING_ASYNC,
	TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC,
} from './doAsync.actionTypes'
import pendingRequest from '../pendingRequest'
// import { tryToFindRequestInCache } from '../httpCache/httpCache.selectors'
import { setBusySpinner } from '../pendingRequest/pendingRequest.actions'
// import { actions as busyIndicatorActions } from '../../widgets/busyIndicator'

const {
	actions: { addPendingRequest, deletePendingRequest },
	selectors: { getPendingRequest },
} = pendingRequest

export function cleanUpPendingRequests(url, method, dispatch, getState) {
	if (!getState || typeof getState !== 'function') {
		throw new Error('getState is required and must be a function')
	}

	if (!getPendingRequest(getState(), url, method)) {
		return
	}

	if (getPendingRequest(getState(), url, method).turnSpinnerOff) {
		dispatch({ type: TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC })
	}

	dispatch(deletePendingRequest(url, method))
}

export function handleError(
	exception,
	onError,
	dispatch,
	// actionType,
	httpMethod,
	url,
	httpConfig,
	errorMessage
) {
	if (onError) {
		onError(exception)
	} else {
		// actionType,
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

// actionType,
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

	// Handled by createThunk
	// const { message, stack } = exception
	// dispatch(
	// 	notificationActions.handleError(actionType.ERROR, {
	// 		errorMessage,
	// 		message,
	// 		stack,
	// 	})
	// )
}

export function processHttpResult({
	body,
	dispatch,
	// mapResponseToPayload,
	successMessage,
	// noBusySpinner,
	// actionType,
	httpMethod,
	url,
	// httpConfig,
	// errorMessage,
	getState,
} = {}) {
	if (!getState || typeof getState !== 'function') {
		throw new Error('getState is required and must be a function')
	}

	// Todo: Ryan - do we need this?
	// const cachedRequest = tryToFindRequestInCache(
	// 	getState(),
	// 	url,
	// 	httpMethod,
	// 	body
	// )
	// if (cachedRequest && cachedRequest.cancelled) {
	// 	return Promise.resolve()
	// }

	if (successMessage) {
		dispatch(notificationActions.notifySuccess(successMessage))
	}

	// TODO: Ryan - do we still need this?
	// const payload = mapResponseToPayload ? mapResponseToPayload(body) : body

	// if (noBusySpinner) {
	// 	payload.noBusySpinner = noBusySpinner
	// }

	// if (body && !payload) {
	// 	throw new Error(
	// 		getError(
	// 			httpMethod,
	// 			url,
	// 			httpConfig,
	// 			errorMessage,
	// 			"doAsync was not able to map ajax call's body to a response payload."
	// 		)
	// 	)
	// }

	// dispatch({
	// 	type: actionType.RECEIVED,
	// 	payload,
	// })

	return Promise.resolve(body)
}

export function requestIsAlreadyPending({
	noBusySpinner,
	url,
	httpMethod,
	httpConfig,
	dispatch,
	getState,
} = {}) {
	if (!getState || typeof getState !== 'function') {
		throw new Error('get state is required and must be a function')
	}

	const thereIsAPendingRequest = getPendingRequest(getState(), url, httpMethod)

	if (thereIsAPendingRequest) {
		const currentRequestRequiresABusySpinner = !noBusySpinner

		dispatch(
			setBusySpinner(url, httpMethod, currentRequestRequiresABusySpinner)
		)

		// actionType,
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
		// actionType.REQUESTED
		dispatch(addPendingRequest(url, httpMethod))
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

// actionType,
export function validateInput(url, httpMethod) {
	// if (!actionType) {
	// 	throw new Error('actionType is required')
	// }

	// if (!actionType.REQUESTED || !actionType.RECEIVED || !actionType.ERROR) {
	// 	throw new Error(
	// 		'actionType must implement the tripples pattern. ' +
	// 			'Note you can use buildAsyncActionType() to easily generate the need action types.'
	// 	)
	// }

	if (!url) {
		throw new Error('url is required.')
	}

	if (!httpMethod || !http[httpMethod]) {
		throw new Error(
			'httpMethod is required and must index the http service and resolve to a method.'
		)
	}
}
