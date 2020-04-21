import slice from './userContext.slice'
import isEmpty from 'lodash/isEmpty'

export const selectSlice = (state) => state[slice.name]

export const selectUserContext = (state) => selectSlice(state)

export const selectIsAuthenticated = (state) =>
	!isEmpty(selectUserContext(state))

export const selectCurrentUserHasPermissions = (permissions) => (state) =>
	userHasPermissions(permissions, state)

function userHasPermissions(permissions, state) {
	if (!permissions || !permissions.length) {
		return true
	}

	const userContext = selectUserContext(state)

	if (
		!userContext ||
		!userContext.permissions ||
		!userContext.permissions.length
	) {
		return false
	}

	return !!userContext.permissions.find((userPermission) =>
		permissions.find(
			(requiredPermission) => requiredPermission === userPermission
		)
	)
}
