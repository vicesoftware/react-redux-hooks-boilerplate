import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../../../rootReducer'
import { fetchAllUsers } from '../../../features/users/users.asyncActions'
import { CACHE_TIMEOUT } from '../../httpCache'

const users = [{ id: 1, login: 'octocat' }]

const failedResponse = () =>
	Promise.resolve({ ok: false, status: 503, headers: { get: () => null } })

const okResponse = () =>
	Promise.resolve({
		ok: true,
		headers: { get: () => null },
		json: () => Promise.resolve(users),
	})

let store

beforeEach(() => {
	store = configureStore({ reducer: rootReducer })
	global.fetch = jest.fn()
	jest.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
	jest.restoreAllMocks()
	delete global.fetch
})

describe('Given useCaching is true', () => {
	describe('When a request fails', () => {
		it('Then the next request for the same url goes to the network', async () => {
			global.fetch
				.mockImplementationOnce(failedResponse)
				.mockImplementationOnce(okResponse)

			await store.dispatch(fetchAllUsers({ useCaching: true }))
			expect(store.getState().httpCache).toEqual({})

			await store.dispatch(fetchAllUsers({ useCaching: true }))

			expect(global.fetch).toHaveBeenCalledTimes(2)
			expect(store.getState().users.allUsers).toEqual(users)
		})
	})

	describe('When a request succeeds', () => {
		it('Then repeat requests are served from the cache until CACHE_TIMEOUT', async () => {
			const start = 1588000000000
			const now = jest.spyOn(Date, 'now').mockReturnValue(start)
			global.fetch.mockImplementation(okResponse)

			await store.dispatch(fetchAllUsers({ useCaching: true }))
			now.mockReturnValue(start + CACHE_TIMEOUT)
			await store.dispatch(fetchAllUsers({ useCaching: true }))
			expect(global.fetch).toHaveBeenCalledTimes(1)

			now.mockReturnValue(start + CACHE_TIMEOUT + 1)
			await store.dispatch(fetchAllUsers({ useCaching: true }))
			expect(global.fetch).toHaveBeenCalledTimes(2)
		})
	})
})
