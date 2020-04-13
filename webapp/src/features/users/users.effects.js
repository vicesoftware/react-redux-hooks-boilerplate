import * as usersActions from './users.actionsTypes'
import useAsync from '../../infrastructure/useAsync'

export function useGetAllUsers({
	useCaching,
	noBusySpinner,
	dependencies,
} = {}) {
	useAsync({
		url: 'users?page=1&per_page=1000',
		actionType: usersActions.GET_ALL_USERS,
		useCaching,
		noBusySpinner,
		dependencies,
	})
}

export function useGetUsersById(usersId) {
	useAsync({
		url: 'users/' + usersId, // We have to do a string conncat for now because I can't figure out how to escape a string template properly. Issue: https://github.com/reesemclean/blueprint/issues/69#issuecomment-605670252
		actionType: usersActions.GET_USERS_BY_ID,
		dependencies: [usersId],
	})
}
