import * as pendingRequestSelectors from './pendingRequest.selectors'
import slice from './pendingRequest.slice'

export const {
	name,
	actions: { addPendingRequest, setBusySpinner, deletePendingRequest },
	reducer,
} = slice

export const { selectPendingRequest } = pendingRequestSelectors
