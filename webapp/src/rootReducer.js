import { combineReducers } from 'redux'
import * as busyIndicator from './widgets/busyIndicator'
import * as modal from './widgets/modal'
import * as pendingRequest from './infrastructure/pendingRequest'
import * as notificationPopup from './infrastructure/notificationPopup'
import * as users from './features/users'
import * as httpCache from './infrastructure/httpCache'
import * as settings from './features/settings'
import * as userContext from './features/userContext'

export default combineReducers({
	[busyIndicator.name]: busyIndicator.reducer,
	[modal.name]: modal.reducer,
	[pendingRequest.name]: pendingRequest.reducer,
	[notificationPopup.name]: notificationPopup.reducer,
	[httpCache.name]: httpCache.reducer,
	[users.name]: users.reducer,
	[settings.name]: settings.reducer,
	[userContext.name]: userContext.reducer,
})
