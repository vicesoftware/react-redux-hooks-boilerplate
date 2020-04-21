import { createAsyncThunk } from '@reduxjs/toolkit'
import doAsync from '../../infrastructure/doAsync'

export const fetchAll{{pascalCase name}} = createAsyncThunk(
	'{{camelCase name}}/getAll',
	async ({ useCaching, noBusySpinner } = {}, thunkArgs) =>
		await doAsync({
			url: '{{kebabCase name}}',
			useCaching,
			noBusySpinner,
			successMessage: '{{pascalCase name}} loaded',
			errorMessage: 'Unable to load {{camelCase name}}. Please try again later.',
			stubSuccess: ['Dummy item 1', 'Dummy item 2'],
			...thunkArgs,
		})
)