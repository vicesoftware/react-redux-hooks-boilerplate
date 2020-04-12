import { buildAsyncActionType } from '../../infrastructure/reduxHelpers'

export const GET_ALL_USERS = buildAsyncActionType('users', 'GET_ALL_USERS')
export const GET_USERS_BY_ID = buildAsyncActionType('users', 'GET_USERS_BY_ID')
