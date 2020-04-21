import isEqual from 'lodash/isEqual'
import buildCacheKey from '../buildCacheKey'
import slice from './httpCache.slice'

export const selectSlice = (state) => state[slice.name]

export const CACHE_TIMEOUT = 900000

const isExpired = (item) => {
	const currentTime = Date.now()
	return currentTime - item.createdAt > CACHE_TIMEOUT
}

const getRequestCache = (state) => selectSlice(state)

export const tryToFindRequestInCache = (state, url, httpMethod, body) => {
	const cacheKey = buildCacheKey({ url, httpMethod })
	const item = getRequestCache(state)[cacheKey]

	if (
		item &&
		(httpMethod.toLowerCase() === 'post' ||
			httpMethod.toLowerCase() === 'put') &&
		body
	) {
		if (!isEqual(item.body, body)) {
			return false
		}
	}

	if (!item) {
		return item
	}

	if (isExpired(item)) {
		// TODO: ryan - remove this as it's now mutating state
		// getRequestCache[cacheKey] = undefined;
		return false
	}

	return item
}
