import * as userActions from './user.actionsTypes'
import * as userSelectors from './user.selectors'
import useAsync from '../../infrastructure/useAsync'

export function useGetUsers() {
	return useAsync({
		url: '/users',
		actionType: userActions.GET_ALL_ASYNC,
		selector: userSelectors.getAllUsers,
	})
}
