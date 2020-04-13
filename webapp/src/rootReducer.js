import { combineReducers } from 'redux'
import busyIndicator from './widgets/busyIndicator'
import modal from './widgets/modal'
import pendingRequest from './infrastructure/pendingRequest'
import httpCache from './infrastructure/httpCache'
import notificationPopup from './infrastructure/notificationPopup'
import users from './features/users'
import { name, reducer } from './features/settings'

export default combineReducers({
	[busyIndicator.constants.STATE_NAME]: busyIndicator.reducer,
	[modal.constants.STATE_NAME]: modal.reducer,
	[pendingRequest.constants.STATE_NAME]: pendingRequest.reducer,
	[httpCache.constants.STATE_NAME]: httpCache.reducer,
	[notificationPopup.constants.STATE_NAME]: notificationPopup.reducer,
	[users.constants.STATE_NAME]: users.reducer,
	[name]: reducer,
})
