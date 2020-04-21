import * as selectors from './userContext.selectors'
import * as asyncActions from './userContext.asynActions'
import slice from './userContext.slice'
import WithRestrictedAccess from './WithRestrictedAccess'

export const {
	name,
	actions: { logout },
	reducer,
} = slice

export const { signIn } = asyncActions

export const {
	selectIsAuthenticated,
	selectCurrentUserHasPermissions,
	selectUserContext,
} = selectors

export { WithRestrictedAccess }
