import * as reactReduxMock from 'react-redux'
import http from '../http'
import mockFetch from '../../../infrastructure/test/mockFetch'

jest.mock('react-redux')
jest.mock('../http.constants', () => ({
	API_URL: 'http://expectedHostName/api',
}))

let getState

beforeEach(() => {
	getState = reactReduxMock.useStore().getState
	global.fetch = jest.fn()
})

afterEach(() => {
	getState.mockReset()
})

describe('When we call get on a resource with a config', () => {
	it('Then we get the expected result from server', (done) => {
		try {
			const calls = []
			const expectedUrl = 'expectedUrl'
			const expectedResult = { result: 'expectedResult' }

			fetch.mockImplementation(
				mockFetch(
					[
						{
							url: expectedUrl,
							response: () => expectedResult,
						},
					],
					{ calls }
				)
			)

			getState.mockReturnValue({
				userContext: {},
			})

			const expectedConfig = { sampleConfig: 'sample' }

			const p = http.get(expectedUrl, expectedConfig)

			setTimeout(() => {
				p.then((r) => {
					expect(calls.length).toBe(1)

					expect(calls[0].url).toEqual(`${expectedUrl}`)

					expect(calls[0].config).toEqual(expectedConfig)

					expect(r.result).toBe(expectedResult.result)
				})
					.then(() => done())
					.catch(done.fail)
			})
		} catch (e) {
			done.fail(e)
		}
	})

	it('When we get a failure response Then we get rejected promise with error', async () => {
		fetch.mockImplementation(
			mockFetch([
				{
					url: 'url',
					errorResponse: true,
					response: () => ({ error: 'whoops' }),
				},
			])
		)
		getState.mockReturnValue({
			userContext: {},
		})

		await http
			.get('url', { sampleConfig: 'sample' })
			.then((r) => expect(r.result))
			.catch((e) => e.json((r) => expect(r.error).toBe('whoops')))
	})
})

describe('When we call post on a resource with a config', () => {
	it('Then we get the expected result from server and config.method set to POST', (done) => {
		callApiAndExpect('post', done)
	})
})

describe('When we call put on a resource with a config', () => {
	it('Then we get the expected result from server and config.method set to POST', (done) => {
		callApiAndExpect('put', done)
	})
})

function callApiAndExpect(httpMethod, done) {
	try {
		const calls = []
		const expectedUrl = 'expectedUrl'
		const expectedResult = { result: 'expectedResult' }

		fetch.mockImplementation(
			mockFetch(
				[
					{
						url: expectedUrl,
						method: httpMethod.toUpperCase(),
						response: () => expectedResult,
					},
				],
				{ calls }
			)
		)

		getState.mockReturnValue({
			userContext: {},
		})

		const expectedConfig = { sampleConfig: 'sample' }

		const p = http[httpMethod](expectedUrl, expectedConfig)

		setTimeout(() => {
			p.then((r) => {
				expect(calls.length).toBe(1)

				expect(calls[0].url).toEqual(`${expectedUrl}`)

				expect(calls[0].config).toEqual({
					...expectedConfig,
					method: httpMethod.toUpperCase(),
				})

				expect(r.result).toBe(expectedResult.result)
			})
				.then(() => done())
				.catch(done.fail)
		})
	} catch (e) {
		done.fail(e)
	}
}
