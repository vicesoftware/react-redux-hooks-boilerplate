import { buildAsyncActionType } from '../../infrastructure/reduxHelpers'

export const GET_ALL_DEMO = buildAsyncActionType('demo', 'GET_ALL_DEMO')
export const GET_DEMO_BY_ID = buildAsyncActionType('demo', 'GET_DEMO_BY_ID')
