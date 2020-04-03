import * as screenTimeReportsActions from './screenTimeReports.actionsTypes'
import useAsync from '../../infrastructure/useAsync'
import { v4 as uuidv4 } from 'uuid'
import dispatchAsync from '../../infrastructure/dispatchAsync'
import { useDispatch } from 'react-redux'

export function useGetAllScreenTimeReports() {
	useAsync({
		url: '/screen-time-reports',
		actionType: screenTimeReportsActions.GET_ALL_SCREEN_TIME_REPORTS,
		dummyResponse: ['Dummy Result 1', 'Dummy Result 2'], // Delete dummyResponse to have live api called or update it to have dummy data you want to fake
	})
}

export function useGetScreenTimeReportByUserId(userId) {
	useAsync({
		url: `/ScreenTimeReports/${userId}`,
		actionType: screenTimeReportsActions.GET_SCREEN_TIME_REPORTS_BY_USER_ID,
		dependencies: [userId],
		dummyResponse: getDummyScreenTimeReports().filter(
			(report) => report.userId === userId
		),
	})
}

export function useGetScreenTimeReportById(reportId) {
	useAsync({
		url: `/ScreenTimeReports/${reportId}`,
		actionType: screenTimeReportsActions.GET_SCREEN_TIME_REPORTS_BY_ID,
		dependencies: [reportId],
		dummyResponse: getDummyScreenTimeReports().find(
			(report) => report.id === reportId
		),
	})
}

export function useGetScreenTimeReportsConfig() {
	useAsync({
		url: '/screen-time-reports-config',
		actionType: screenTimeReportsActions.GET_SCREEN_TIME_REPORTS_CONFIG,
		dummyResponse: {
			activities: [
				{
					type: 'bikeWithHills',
					description: 'Bike Riding with Hills',
					conversion: 100,
				},
				{
					type: 'trampoline',
					description: 'Trampoline',
					conversion: 100,
				},
				{
					type: 'poolTime',
					description: 'Pool Time/Water Games',
					conversion: 100,
				},
				{
					type: 'bikeOnflat',
					description: 'Bike Riding on Flat',
					conversion: 75,
				},
				{
					type: 'trails',
					description: 'Hiking Trails',
					conversion: 75,
				},
				{
					type: 'basketball',
					description: 'Driveway Basket Ball / Scooter',
					conversion: 50,
				},
				{
					type: 'walking',
					description: 'Walking',
					conversion: 50,
				},
				{
					type: 'toys',
					description: 'Playing with Toys',
					conversion: 25,
				},
				{
					type: 'outsidePlaytime',
					description: 'Outside Playtime',
					conversion: 25,
				},
			],
			mustComplete: [
				{
					description: 'Reading',
				},
				{ description: 'Chores' },
			],
		},
	})
}

export function useCreateActivity() {
	const dispatch = useDispatch()

	return (activity, userId) =>
		dispatchAsync({
			url: '/activities',
			method: 'post',
			body: { ...activity, userId },
			actionType: screenTimeReportsActions.CREATE_ACTIVITY,
			dispatch,
			dummyResponse: {
				id: uuidv4(),
				userId,
				...activity,
				date: Date.now(),
			},
		})
}

function getDummyScreenTimeReports() {
	return [
		{
			id: '666f827f-bd02-432a-981f-0fa5a75ed39d',
			userId: 'faad5fff-01d8-46e2-8370-15f8946a0381',
			date: '3/27/2020',
			activeMinutes: [
				{ id: uuidv4(), type: 'bikeWithHills', duration: 20 },
				{ id: uuidv4(), type: 'trampoline', duration: 30 },
				{ id: uuidv4(), type: 'poolTime', duration: 20 },
				{ id: uuidv4(), type: 'bikeOnflat', duration: 0 },
				{ id: uuidv4(), type: 'trails', duration: 45 },
				{ id: uuidv4(), type: 'basketball', duration: 20 },
				{ id: uuidv4(), type: 'walking', duration: 20 },
				{ id: uuidv4(), type: 'outsidePlaytime', duration: 20 },
				{ id: uuidv4(), type: 'toys', duration: 30 },
			],
			requiredActivites: {
				reading: true,
				chores: true,
			},
		},
		{
			id: '607f31a7-cfb4-4fee-b93b-a8835fae7151',
			userId: 'df363826-4488-4f52-bfbb-2f5496d81e03',
			date: '3/28/2020',
			activeMinutes: [
				{ id: uuidv4(), type: 'bikeWithHills', duration: 20 },
				{ id: uuidv4(), type: 'trampoline', duration: 30 },
				{ id: uuidv4(), type: 'poolTime', duration: 20 },
				{ id: uuidv4(), type: 'bikeOnflat', duration: 0 },
				{ id: uuidv4(), type: 'trails', duration: 45 },
				{ id: uuidv4(), type: 'basketball', duration: 20 },
				{ id: uuidv4(), type: 'walking', duration: 20 },
				{ id: uuidv4(), type: 'outsidePlaytime', duration: 20 },
				{ id: uuidv4(), type: 'toys', duration: 30 },
			],
			requiredActivites: {
				reading: true,
				chores: true,
			},
		},
		{
			id: '2bb22811-2990-4927-9f2d-364ce4097e3a',
			userId: '051a1ab5-c5f8-400f-968f-41585cfce4ae',
			date: '3/28/2020',
			activeMinutes: [
				{ id: uuidv4(), type: 'bikeWithHills', duration: 20 },
				{ id: uuidv4(), type: 'trampoline', duration: 30 },
				{ id: uuidv4(), type: 'poolTime', duration: 20 },
				{ id: uuidv4(), type: 'bikeOnflat', duration: 0 },
				{ id: uuidv4(), type: 'trails', duration: 45 },
				{ id: uuidv4(), type: 'basketball', duration: 20 },
				{ id: uuidv4(), type: 'walking', duration: 20 },
				{ id: uuidv4(), type: 'outsidePlaytime', duration: 20 },
				{ id: uuidv4(), type: 'toys', duration: 30 },
			],
			requiredActivites: {
				reading: true,
				chores: true,
			},
		},
	]
}
