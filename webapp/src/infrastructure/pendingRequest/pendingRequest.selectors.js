import { STATE_NAME } from './pendingRequest.constants'

export const getPendingRequest = (state, url, method) =>
	state[STATE_NAME][`${method}|${url}`]
