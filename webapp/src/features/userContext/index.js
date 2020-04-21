import * as selectors from './userContext.selectors'
import * as actions from './userContext.actions'
import slice from './userContext.slice'
import WithRestrictedAccess from './WithRestrictedAccess'

export const { name, reducer } = slice

export const { signIn } = actions

export const {
	selectIsAuthenticated,
	selectCurrentUserHasPermissions,
} = selectors

export { WithRestrictedAccess }
