import * as userActions from './user.actionsTypes'
import useAsync from '../../infrastructure/useAsync'

export function useGetUsers(dependencies) {
	useAsync({
		url: 'https://jsonplaceholder.typicode.com/users',
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

export function useGetScreenTimeReports(userId) {
	useAsync({
		url: `/ScreenTimeReports/${userId}`,
		actionType: userActions.GET_SCREEN_TIME_REPORTS_ASYNC,
		dependencies: [userId],
		dummyResponse: [
			{
				id: '666f827f-bd02-432a-981f-0fa5a75ed39d',
				userId: 'faad5fff-01d8-46e2-8370-15f8946a0381',
				date: '3/27/2020',
				activeMinutes: {
					bikeWithHills: 20,
					trampoline: 30,
					bikeOnflat: 0,
					trails: 45,
					basketball: 15,
					walking: 45,
					outsidePlaytime: 15,
				},
				requiredActivites: {
					reading: true,
					chores: true,
				},
			},
			{
				id: '607f31a7-cfb4-4fee-b93b-a8835fae7151',
				userId: 'df363826-4488-4f52-bfbb-2f5496d81e03',
				date: '3/28/2020',
				activeMinutes: {
					bikeWithHills: 20,
					trampoline: 30,
					bikeOnflat: 0,
					trails: 45,
					basketball: 15,
					walking: 45,
					outsidePlaytime: 15,
				},
				requiredActivites: {
					reading: true,
					chores: true,
				},
			},
			{
				id: '2bb22811-2990-4927-9f2d-364ce4097e3a',
				userId: '051a1ab5-c5f8-400f-968f-41585cfce4ae',
				date: '3/28/2020',
				activeMinutes: {
					bikeWithHills: 20,
					trampoline: 30,
					bikeOnflat: 0,
					trails: 45,
					basketball: 15,
					walking: 45,
					outsidePlaytime: 15,
				},
				requiredActivites: {
					reading: true,
					chores: true,
				},
			},
		].filter((report) => report.userId === userId),
	})
}
