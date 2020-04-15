import http from '../http'
import httpCache from '../httpCache'
import { REDUX_CACHE_HIT_RECEIVED_ASYNC } from './doAsync.actionTypes'
import {
	buildHeaders,
	cleanUpPendingRequests,
	handleError,
	logError,
	// processHttpResult,
	requestIsAlreadyPending,
	validateInput,
} from './doAsyncLogic'
import { actions as busyIndicatorActions } from '../../widgets/busyIndicator'
import notificationPopup from '../../infrastructure/notificationPopup'

const {
	actions: { addRequestToCache },
	selectors: { tryToFindRequestInCache },
} = httpCache

const {
	actions: { notifySuccess },
} = notificationPopup

export const cacheHit = (url, method, noBusySpinner) => ({
	type: REDUX_CACHE_HIT_RECEIVED_ASYNC,
	payload: {
		url,
		method,
		noBusySpinner,
	},
})

const doAsync = ({
	// actionType,
	url,
	httpMethod = 'get',
	// mapResponseToPayload,
	errorMessage = 'Unable to process request. Please try again later.',
	httpConfig,
	onError,
	successMessage,
	noBusySpinner,
	busyIndicatorName,
	useCaching = false,
	stubSuccess,
	stubError,
	dispatch,
	getState,
} = {}) => {
	if (!getState || typeof getState !== 'function') {
		throw new Error(
			'getState is required and must have a getState method defined on it'
		)
	}

	if (!dispatch || typeof dispatch !== 'function') {
		throw new Error('dispatch is required and must be a function')
	}

	try {
		// actionType,

		validateInput(url, httpMethod)

		// dispatch({
		// 	type: actionType.REQUESTED,
		// 	payload: { noBusySpinner, useCaching },
		// })

		// actionType,
		if (
			requestIsAlreadyPending({
				noBusySpinner,
				url,
				httpMethod,
				httpConfig,
				dispatch,
				getState,
			})
		) {
			return Promise.resolve()
		}

		if (useCaching) {
			if (
				tryToFindRequestInCache(
					getState(),
					url,
					httpMethod,
					httpConfig && httpConfig.body
				)
			) {
				// actionType.RECEIVED,
				dispatch(cacheHit(url, httpMethod, noBusySpinner))
				// actionType,
				cleanUpPendingRequests(dispatch, getState)
				return Promise.resolve()
			}

			const requestConfig = {}

			if (
				httpMethod.toLowerCase() === 'post' ||
				httpMethod.toLowerCase() === 'put'
			) {
				requestConfig.body = httpConfig.body
			}

			dispatch(addRequestToCache({ url, httpMethod, config: requestConfig }))
		}

		if (!noBusySpinner) {
			dispatch(busyIndicatorActions.incrementBusyIndicator(busyIndicatorName))
		}

		httpConfig = {
			...httpConfig,
			...buildHeaders(url, httpConfig),
		}

		return http[httpMethod](url, httpConfig, { stubSuccess, stubError })
			.then((body) => {
				// processHttpResult({
				// 	body,
				// 	dispatch,
				// 	// mapResponseToPayload,
				// 	successMessage,
				// 	// noBusySpinner,
				// 	// actionType,
				// 	httpMethod,
				// 	url,
				// 	// httpConfig,
				// 	// errorMessage,
				// 	getState,
				// })

				if (successMessage) {
					dispatch(notifySuccess(successMessage))
				}

				return Promise.resolve(body)
			})
			.catch((exception) => {
				handleError(
					exception,
					onError,
					dispatch,
					// actionType,
					httpMethod,
					url,
					httpConfig,
					errorMessage
				)
			})
			.then((response) => {
				// actionType,
				cleanUpPendingRequests(url, httpMethod, dispatch, getState)
				if (!noBusySpinner) {
					dispatch(
						busyIndicatorActions.decrementBusyIndicator(busyIndicatorName)
					)
				}
				return response
			})
	} catch (exception) {
		// actionType,
		logError(dispatch, httpMethod, url, httpConfig, {
			exception,
		})
		throw exception
	}
}

export default doAsync
