import { buildAsyncActionType } from '../../infrastructure/reduxHelpers'

export const GET_ALL_{{upperSnakeCase name}} = buildAsyncActionType('{{camelCase name}}', 'GET_ALL_{{upperSnakeCase name}}')
export const GET_{{upperSnakeCase name}}_BY_ID = buildAsyncActionType('{{camelCase name}}', 'GET_{{upperSnakeCase name}}_BY_ID')
