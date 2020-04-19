import { createAction, nanoid } from '@reduxjs/toolkit'
const commonProperties = ['name', 'message', 'stack', 'code']
class RejectWithValue {
	constructor(value) {
		this.value = value
	}
}
// Reworked from https://github.com/sindresorhus/serialize-error
export const miniSerializeError = (value) => {
	if (typeof value === 'object' && value !== null) {
		const simpleError = {}
		for (const property of commonProperties) {
			if (typeof value[property] === 'string') {
				simpleError[property] = value[property]
			}
		}
		return simpleError
	}
	return { message: String(value) }
}
/**
 *
 * @param type
 * @param payloadCreator
 *
 * @public
 */
export function createAsyncThunk(type, payloadCreator) {
	const fulfilled = createAction(
		type + '/fulfilled',
		(result, requestId, arg) => {
			return {
				payload: result,
				meta: { arg, requestId },
			}
		}
	)
	const pending = createAction(type + '/pending', (requestId, arg) => {
		return {
			payload: undefined,
			meta: { arg, requestId },
		}
	})
	const rejected = createAction(
		type + '/rejected',
		(error, requestId, arg, payload) => {
			const aborted = !!error && error.name === 'AbortError'
			return {
				payload,
				error: miniSerializeError(error || 'Rejected'),
				meta: {
					arg,
					requestId,
					aborted,
				},
			}
		}
	)
	let displayedWarning = false
	const AC =
		typeof AbortController !== 'undefined'
			? AbortController
			: class {
					constructor() {
						this.signal = {
							aborted: false,
							addEventListener() {},
							dispatchEvent() {
								return false
							},
							onabort() {},
							removeEventListener() {},
						}
					}

					abort() {
						if (process.env.NODE_ENV !== 'production') {
							if (!displayedWarning) {
								displayedWarning = true
								console.info(`This platform does not implement AbortController. 
If you want to use the AbortController to react to \`abort\` events, please consider importing a polyfill like 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'.`)
							}
						}
					}
			  }

	function actionCreator(arg) {
		return (dispatch, getState, extra) => {
			console.log('called')

			const requestId = nanoid()
			const abortController = new AC()
			let abortReason

			const abortedPromise = new Promise((resolve, reject) =>
				abortController.signal.addEventListener('abort', () =>
					// eslint-disable-next-line prefer-promise-reject-errors
					reject({ name: 'AbortError', message: abortReason || 'Aborted' })
				)
			)
			function abort(reason) {
				abortReason = reason
				abortController.abort()
			}
			const promise = (async function () {
				let finalAction
				try {
					dispatch(pending(requestId, arg))
					finalAction = await Promise.race([
						abortedPromise,
						Promise.resolve(
							payloadCreator(arg, {
								dispatch,
								getState,
								extra,
								requestId,
								signal: abortController.signal,
								rejectWithValue(value) {
									return new RejectWithValue(value)
								},
							})
						).then((result) => {
							if (result instanceof RejectWithValue) {
								return rejected(null, requestId, arg, result.value)
							}
							return fulfilled(result, requestId, arg)
						}),
					])
				} catch (err) {
					finalAction = rejected(err, requestId, arg)
				}
				// We dispatch the result action _after_ the catch, to avoid having any errors
				// here get swallowed by the try/catch block,
				// per https://twitter.com/dan_abramov/status/770914221638942720
				// and https://redux-toolkit.js.org/tutorials/advanced-tutorial#async-error-handling-logic-in-thunks
				dispatch(finalAction)
				return finalAction
			})()

			return Object.assign(promise, { abort })
		}
	}

	return Object.assign(actionCreator, {
		pending,
		rejected,
		fulfilled,
	})
}
/**
 * @public
 */
export function unwrapResult(returned) {
	if ('error' in returned) {
		throw returned.error
	}
	return returned.payload
}
