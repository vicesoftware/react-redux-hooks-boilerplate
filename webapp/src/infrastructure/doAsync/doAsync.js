import http from '../http'
import { addRequestToCache, tryToFindRequestInCache } from '../httpCache'
import { REDUX_CACHE_HIT_RECEIVED_ASYNC } from './doAsync.actionTypes'
import {
	buildHeaders,
	cleanUpPendingRequests,
	handleError,
	logError,
	requestIsAlreadyPending,
	validateInput,
} from './doAsyncLogic'
import {
	incrementBusyIndicator,
	decrementBusyIndicator,
} from '../../widgets/busyIndicator'
import { notifySuccess } from '../../infrastructure/notificationPopup'

export const cacheHit = (url, method, noBusySpinner) => ({
	type: REDUX_CACHE_HIT_RECEIVED_ASYNC,
	payload: {
		url,
		method,
		noBusySpinner,
	},
})

const doAsync = ({
	url,
	httpMethod = 'get',
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
	rejectWithValue,
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
		validateInput(url, httpMethod)

		if (
			requestIsAlreadyPending({
				noBusySpinner,
				url,
				httpMethod,
				httpConfig,
				busyIndicatorName,
				dispatch,
				getState,
			})
		) {
			return rejectWithValue('Request is already pending.')
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
				dispatch(cacheHit(url, httpMethod, noBusySpinner))
				cleanUpPendingRequests({
					url,
					httpMethod,
					busyIndicatorName,
					dispatch,
					getState,
				})
				return rejectWithValue('Request found in cache.')
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
			dispatch(incrementBusyIndicator(busyIndicatorName))
		}

		httpConfig = {
			...httpConfig,
			...buildHeaders(url, httpConfig),
		}

		return http[httpMethod](url, httpConfig, { stubSuccess, stubError })
			.then((body) => {
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
					httpMethod,
					url,
					httpConfig,
					errorMessage
				)
			})
			.then((response) => {
				cleanUpPendingRequests({
					url,
					httpMethod,
					busyIndicatorName,
					dispatch,
					getState,
				})
				if (!noBusySpinner) {
					dispatch(decrementBusyIndicator(busyIndicatorName))
				}
				return response
			})
	} catch (exception) {
		logError(dispatch, httpMethod, url, httpConfig, {
			exception,
		})
		throw exception
	}
}

export default doAsync
