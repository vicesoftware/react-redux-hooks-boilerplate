import { ACTION_TYPE_PREFIX } from '../config'

export const mergeTypes = { UNION: 'UNION', INTERSECT: 'INTERSECT' }

export const buildAsyncActionType = (module, actionType) => {
	const asyncStates = ['REQUESTED', 'RECEIVED', 'ERROR']

	return asyncStates.reduce((accumulator, asyncState) => {
		accumulator[asyncState] = `${buildActionType(
			module,
			actionType
		)}_${asyncState}_ASYNC`
		return accumulator
	}, {})
}

export const buildActionType = (module, actionType) =>
	`${ACTION_TYPE_PREFIX}/${module}/${actionType}`

export const mergeCollections = (
	elements,
	newElements,
	idProperty = 'id',
	mergeType = mergeTypes.INTERSECT
) => {
	newElements = wrapInArrayIfNeeded(newElements)

	return mergeType === mergeTypes.INTERSECT
		? intersectCollections(elements, newElements, idProperty)
		: unionCollections(elements, newElements, idProperty)
}

const unionCollections = (elements, newElements, idProperty) => {
	newElements = wrapInArrayIfNeeded(newElements)

	return [...elements, ...newElements].reduce((acc, cur) => {
		const foundIndex = acc.findIndex((a) => a[idProperty] === cur[idProperty])

		const NOT_FOUND = -1

		if (foundIndex === NOT_FOUND) {
			acc.push(cur)
			return acc
		}

		acc[foundIndex] = { ...acc[foundIndex], ...cur }

		return acc
	}, [])
}

const intersectCollections = (elements, newElements, idProperty) => {
	newElements = wrapInArrayIfNeeded(newElements)

	return [...elements, ...newElements].reduce((acc, cur) => {
		const foundIndex = acc.findIndex((a) => a[idProperty] === cur[idProperty])

		const NOT_FOUND = -1

		if (foundIndex === NOT_FOUND) {
			if (
				newElements.map((newEl) => newEl[idProperty]).includes(cur[idProperty])
			) {
				acc.push(cur)
			}
			return acc
		}

		acc[foundIndex] = { ...acc[foundIndex], ...cur }

		return acc
	}, [])
}

function wrapInArrayIfNeeded(elements) {
	if (elements && !elements.length) {
		return [elements]
	}

	return elements
}
