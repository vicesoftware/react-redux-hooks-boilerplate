import { buildAsyncActionType } from '../../infrastructure/reduxHelpers'

export const GET_ALL_{{upperSnakeCase name}} = buildAsyncActionType('users', 'GET_ALL_{{upperSnakeCase name}}_ASYNC')
export const GET_{{upperSnakeCase name}}_BY_ID = buildAsyncActionType('users', 'GET_{{upperSnakeCase name}}_ASYNC')
