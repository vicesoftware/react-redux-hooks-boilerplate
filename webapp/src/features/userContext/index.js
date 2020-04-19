import * as selectors from './userContext.selectors'
import * as actions from './userContext.actions'
import slice from './userContext.slice'

export const { name, reducer } = slice

export const { signIn } = actions

export const {
	selectIsAuthenticated,
	selectCurrentUserHasPermissions,
} = selectors
