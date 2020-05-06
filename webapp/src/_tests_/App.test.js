import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

it('renders welcome message', () => {
	const store = createStore(combineReducers({}))

	const { getByText } = render(
		<Provider store={store}>
			<h1>hi</h1>
		</Provider>
	)

	expect(getByText('hi')).toBeInTheDocument()
})
