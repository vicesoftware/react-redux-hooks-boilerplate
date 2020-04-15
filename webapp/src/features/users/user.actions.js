import { createAsyncThunk } from '@reduxjs/toolkit'
// import { createAsyncThunk } from '../../infrastructure/createAsyncAction'
import doAsync from '../../infrastructure/doAsync'

export const fetchAllUsers = createAsyncThunk(
	'users/getAll',
	async (_, { dispatch, getState }) => {
		// dispatch(busyIndicatorActions.incrementBusyIndicator())

		const response = await doAsync({
			url: 'users?page=1&per_page=100',
			getState,
			dispatch,
		})

		// dispatch(busyIndicatorActions.decrementBusyIndicator())
		return response
	}
)

// export const fetchAllUsers = asyncAction(
// 	'users/getAll',
// 	'users?page=1&per_page=100',
// 	{
// 		doBefore: (dispatch) => console.log('before', dispatch),
// 		doAfter: (dispatch) => console.log('after', dispatch),
// 	}
// )

// function asyncAction(type, payloadCreator, { doBefore, doAfter } = {}) {
// 	const asyncThunk = createAsyncThunk(type, async () => {
// 		const response = await http.get(payloadCreator)
// 		return response
// 	})

// 	const asyncThunkCopy = asyncThunk

// 	const newAsyncThunk = (arg) => {
// 		return (dispatch, getState, extra) => {
// 			doBefore(dispatch, getState, extra)

// 			const actionCreatorResult = asyncThunkCopy(arg)

// 			const thunk = actionCreatorResult(dispatch, getState, extra)

// 			thunk.then((result) => {
// 				doAfter(dispatch, getState, extra)
// 				return result
// 			})

// 			return thunk
// 		}
// 	}

// 	const { pending, rejected, fulfilled } = asyncThunk

// 	const finalThunk = Object.assign(newAsyncThunk, {
// 		pending,
// 		rejected,
// 		fulfilled,
// 	})

// 	return finalThunk
// }
