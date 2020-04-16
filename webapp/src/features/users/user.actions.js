import { createAsyncThunk } from '@reduxjs/toolkit'
import doAsync from '../../infrastructure/doAsync'
import { getAllUsers } from './users.selectors'

export const fetchAllUsers = createAsyncThunk(
	'users/getAll',
	async (
		{ useCaching, cachingSelector = getAllUsers, noBusySpinner },
		thunkArgs
	) =>
		await doAsync({
			url: 'users?page=1&per_page=100',
			useCaching,
			cachingSelector,
			noBusySpinner,
			...thunkArgs,
		})
)
