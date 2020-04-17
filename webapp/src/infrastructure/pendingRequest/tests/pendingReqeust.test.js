import pendingRequest from '../../../infrastructure/pendingRequest'
import buildCacheKey from '../../../infrastructure/buildCacheKey'

const {
	reducer,
	actions,
	selectors: { selectPendingRequest },
	constants: { STATE_NAME },
} = pendingRequest

const buildDummnyCacheKey = (name) => {
	const url = `expectedUrl${name}`
	const httpMethod = `expectedMethod${name}`
	return {
		url,
		httpMethod,
		key: buildCacheKey({ url, httpMethod }),
	}
}

describe('Given we have no pending request', () => {
	it('When we add a new pending request Then its added to new state', () => {
		const cacheKey = buildDummnyCacheKey()
		expect(reducer(null, actions.addPendingRequest(cacheKey))).toEqual({
			[cacheKey.key]: {
				turnSpinnerOff: false,
			},
		})
	})
})

describe('Given we have pending request', () => {
	it('When we add a new pending request Then its added to new state', () => {
		const expected = buildDummnyCacheKey('expected')
		const existing = buildDummnyCacheKey('existing')

		expect(
			reducer(
				{
					[existing.key]: {
						turnSpinnerOff: false,
					},
				},
				actions.addPendingRequest(expected)
			)
		).toEqual({
			[existing.key]: {
				turnSpinnerOff: false,
			},
			[expected.key]: {
				turnSpinnerOff: false,
			},
		})
	})

	it('When we delete an existing pending request Then its removed from new state', () => {
		const existing = buildDummnyCacheKey('existing')

		expect(
			reducer(
				{
					[existing.key]: {
						turnSpinnerOff: false,
					},
				},
				actions.deletePendingRequest(existing)
			)
		).toEqual({})
	})
})

describe('Given we have pending requested ', () => {
	it('Then calling getRequest with an actionType that is pending returns the correct request', () => {
		const existing1 = buildDummnyCacheKey('1')
		const existing2 = buildDummnyCacheKey('2')

		const pendingRequest = {
			[existing1.key]: {
				turnSpinnerOff: true,
			},
			[existing2.key]: {
				turnSpinnerOff: false,
			},
		}

		expect(
			selectPendingRequest({ [STATE_NAME]: pendingRequest }, existing1)
		).toEqual({
			turnSpinnerOff: true,
		})
	})
	it('Then calling getRequest with an actionType that is not pending returns undefined', () => {
		const existing1 = buildDummnyCacheKey('1')
		const existing2 = buildDummnyCacheKey('2')

		const pendingRequest = {
			[existing1.key]: {
				turnSpinnerOff: true,
			},
			[existing2.key]: {
				turnSpinnerOff: false,
			},
		}

		expect(
			selectPendingRequest(
				{ [STATE_NAME]: pendingRequest },
				'notPendingActionType'
			)
		).toBe(undefined)
	})
})
