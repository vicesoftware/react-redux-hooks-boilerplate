import * as userActions from './user.actionsTypes'
import useAsync from '../../infrastructure/useAsync'

export function useGetUsers(dependencies) {
	useAsync({
		url: '/users',
		actionType: userActions.GET_ALL_ASYNC,
		dummyResponse: [
			{
				id: 'faad5fff-01d8-46e2-8370-15f8946a0381',
				name: 'Dylan Vice',
			},
			{
				id: 'df363826-4488-4f52-bfbb-2f5496d81e03',
				name: 'Grace Vice',
			},
			{
				id: '051a1ab5-c5f8-400f-968f-41585cfce4ae',
				name: 'Noah Vice',
			},
		],
	})
}

export function useGetUser(userId) {
	useAsync({
		url: `/users/${userId}`,
		actionType: userActions.GET_USER_ASYNC,
		dependencies: [userId],
		dummyResponse: [
			{
				id: 'faad5fff-01d8-46e2-8370-15f8946a0381',
				name: 'Dylan Vice',
			},
			{
				id: 'df363826-4488-4f52-bfbb-2f5496d81e03',
				name: 'Grace Vice',
			},
			{
				id: '051a1ab5-c5f8-400f-968f-41585cfce4ae',
				name: 'Noah Vice',
			},
		].filter((user) => user.id === userId),
	})
}
