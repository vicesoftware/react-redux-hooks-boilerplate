import { buildActionType } from '../../infrastructure/reduxHelpers'

export const SHOW = buildActionType('modal', 'SHOW')
export const HIDE = buildActionType('modal', 'HIDE')
