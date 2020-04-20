import { createAsyncThunk } from '@reduxjs/toolkit'
import doAsync from '../../infrastructure/doAsync'

export const NOT_FOUND = 404
export const BAD_REQUEST = 400

export const signIn = createAsyncThunk(
	'userContext/signIn',
	async ({ email, password, useCaching, noBusySpinner } = {}, thunkArgs) => {
		const { stubSuccess, stubError } = fakeAuthentication(email, password)
		return await doAsync({
			url: 'sign-in',
			httpConfig: {
				body: JSON.stringify({ userName: email, password }),
			},
			useCaching,
			noBusySpinner,
			successMessage: 'Sign In successful',
			errorMessage: `Unable to sign in user. Error: ${
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
function fakeAuthentication(email, password) {
	const response = {}

	let stubError
	let permissions = []
	let displayName

	if (email === 'ryan@vicesoftware.com') {
		displayName = 'Ryan Vice'
		permissions = ['can-do-anything']
	} else if (email === 'heather@vicesoftware.com') {
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
			userName: email,
			displayName,
			permissions,
		}
	}

	return response
}
