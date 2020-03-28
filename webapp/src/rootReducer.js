import { combineReducers } from 'redux'
import users from './features/users'

export default combineReducers({
	[users.constants.STATE_NAME]: users.reducer,
})
