import * as selectors from './httpCache.selectors'
import slice from './httpCache.slice'

export const {
	name,
	actions: { addRequestToCache, deleteRequestFromCache },
	reducer,
} = slice

export const { isExpired, getRequestCache, tryToFindRequestInCache } = selectors

export const CACHE_TIMEOUT = 900000
