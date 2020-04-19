import { createAsyncThunk } from '@reduxjs/toolkit'
import doAsync from '../../infrastructure/doAsync'

export const signIn = createAsyncThunk(
	'userContext/signIn',
	async ({ useCaching, noBusySpinner } = {}, thunkArgs) => {
		const { stubSuccess, stubError } = fakeAuthentication(userName, password)
		return await doAsync({
			url: 'sign-in',
			httpConfig: {
				body: JSON.stringify({ userName, password }),
			},
			useCaching,
			noBusySpinner,
			successMessage: 'UserContext loaded',
			errorMessage: `Unable to retrieve log in user. Error: ${
				stubError && stubError.statuscode
			}`,
			stubSuccess,
			stubError,
			...thunkArgs,
		})
	}
)

// Will create a request with either
// (1) stubSuccess property to fake a successful server authentication
// (2) stubError property to fake a server authentication error
function fakeAuthentication(userName, password) {
	const response = {}

	let stubError
	let permissions = []
	let displayName

	if (userName === 'ryan@vicesoftware.com') {
		displayName = 'Ryan Vice'
		permissions = ['can-do-anything']
	} else if (userName === 'heather@vicesoftware.com') {
		displayName = 'Heather Vice'
	} else {
		stubError = {
			statusCode: NOT_FOUND,
		}
	}

	if (password !== 'password') {
		stubError = {
			statusCode: BAD_REQUEST,
		}
	}

	if (stubError) {
		response.stubError = stubError
	} else {
		response.stubSuccess = {
			userName,
			displayName,
			permissions,
		}
	}

	return response
}
