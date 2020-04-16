import { STATE_NAME } from './pendingRequest.constants'
import buildCacheKey from '../buildCacheKey'

export const getPendingRequest = (state, url, httpMethod) =>
	state[STATE_NAME][buildCacheKey({ url, httpMethod })]
