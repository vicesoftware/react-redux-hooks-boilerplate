import { buildAsyncActionType } from '../../infrastructure/reduxHelpers'

export const SHOW = buildAsyncActionType('modal', 'SHOW')
export const HIDE = buildAsyncActionType('modal', 'HIDE')
