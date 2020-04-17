import slice from './pendingRequest.slice'
import buildCacheKey from '../buildCacheKey'

export const selectSlice = (state) => state[slice.name]

export const selectPendingRequest = (state, { url, httpMethod }) =>
	selectSlice(state)[buildCacheKey({ url, httpMethod })]
