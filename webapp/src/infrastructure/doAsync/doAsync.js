import http from '../http'
import httpCache from '../httpCache'
import { REDUX_CACHE_HIT_RECEIVED_ASYNC } from './doAsync.actionTypes'
import {
	buildHeaders,
	cleanUpPendingRequests,
	handleError,
	logError,
	processHttpResult,
	requestIsAlreadyPending,
	validateInput,
} from './doAsyncLogic'

const {
	actions: { addRequestToCache },
	selectors: { tryToFindRequestInCache },
} = httpCache

export const cacheHit = (cachedReceivedAction, noBusySpinner) => ({
	type: REDUX_CACHE_HIT_RECEIVED_ASYNC,
	payload: {
		cachedReceivedAction,
		noBusySpinner,
	},
})

const doAsync = ({
	actionType,
	url,
	httpMethod = 'get',
	mapResponseToPayload,
	errorMessage = 'Unable to process request. Please try again later.',
	httpConfig,
	onError,
	successMessage,
	noBusySpinner,
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
		validateInput(actionType, url, httpMethod)

		dispatch({
			type: actionType.REQUESTED,
			payload: { noBusySpinner, useCaching },
		})

		if (
			requestIsAlreadyPending({
				actionType,
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
				dispatch(cacheHit(actionType.RECEIVED, noBusySpinner))
				cleanUpPendingRequests(actionType, dispatch, getState)
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

		httpConfig = {
			...httpConfig,
			...buildHeaders(url, httpConfig),
		}

		return http[httpMethod](url, httpConfig, { stubSuccess, stubError })
			.then((body) =>
				processHttpResult({
					body,
					dispatch,
					mapResponseToPayload,
					successMessage,
					noBusySpinner,
					actionType,
					httpMethod,
					url,
					httpConfig,
					errorMessage,
					getState,
				})
			)
			.catch((exception) => {
				handleError(
					exception,
					onError,
					dispatch,
					actionType,
					httpMethod,
					url,
					httpConfig,
					errorMessage
				)
			})
			.then(() => {
				cleanUpPendingRequests(actionType, dispatch, getState)
			})
	} catch (exception) {
		logError(dispatch, actionType, httpMethod, url, httpConfig, { exception })
		throw exception
	}
}

export default doAsync
