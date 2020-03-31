import { buildAsyncActionType } from '../../infrastructure/reduxHelpers'

export const GET_ALL_SCREEN_TIME_REPORTS = buildAsyncActionType(
	'screenTimeReports',
	'GET_ALL_SCREEN_TIME_REPORTS'
)
export const GET_SCREEN_TIME_REPORTS_BY_ID = buildAsyncActionType(
	'screenTimeReports',
	'GET_SCREEN_TIME_REPORTS_BY_ID'
)
export const GET_SCREEN_TIME_REPORTS_BY_USER_ID = buildAsyncActionType(
	'screenTimeReports',
	'GET_SCREEN_TIME_REPORTS_BY_USER_ID'
)
export const GET_SCREEN_TIME_REPORTS_CONFIG = buildAsyncActionType(
	'screenTimeReports',
	'GET_SCREEN_TIME_REPORTS_CONFIG'
)
