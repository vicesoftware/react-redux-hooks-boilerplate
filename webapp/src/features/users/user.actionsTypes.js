import { buildAsyncActionType } from '../../infrastructure/reduxHelpers'

export const GET_ALL_ASYNC = buildAsyncActionType('users', 'GET_ALL_ASYNC')
export const GET_USER_ASYNC = buildAsyncActionType('users', 'GET_USER_ASYNC')
export const GET_SCREEN_TIME_REPORTS_ASYNC = buildAsyncActionType(
	'users',
	'GET_SCREEN_TIME_REPORTS_ASYNC'
)
