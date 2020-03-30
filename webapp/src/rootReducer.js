import { combineReducers } from 'redux'
import users from './features/users'
import busyIndicator from './widgets/busyIndicator'

export default combineReducers({
	[users.constants.STATE_NAME]: users.reducer,
	[busyIndicator.constants.STATE_NAME]: busyIndicator.reducer,
})
