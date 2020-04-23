import { createAsyncThunk } from '@reduxjs/toolkit'
import doAsync from '../../infrastructure/doAsync'

export const fetchAllDemo = createAsyncThunk(
	'demo/getAll',
	async ({ useCaching, noBusySpinner } = {}, thunkArgs) =>
		await doAsync({
			url: 'demo',
			useCaching,
			noBusySpinner,
			successMessage: 'Demo loaded',
			errorMessage: 'Unable to load demo. Please try again later.',
			stubSuccess: ['Dummy item 1', 'Dummy item 2'],
			...thunkArgs,
		})
)
