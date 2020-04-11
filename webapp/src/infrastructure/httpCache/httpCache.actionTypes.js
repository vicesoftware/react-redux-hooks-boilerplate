import { buildActionType } from '../reduxHelpers'

export const RESET = buildActionType('httpCache', 'RESET')

export const ADD = buildActionType('httpCache', 'ADD')

export const DELETE = buildActionType('httpCache', 'DELETE')
