import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { actions } from './settings.slice'
import { selectAllSettings } from './settings.selectors'

const { setUseCaching, setNoBusySpinner } = actions

export default function Settings() {
	const settings = useSelector(selectAllSettings)

	const dispatch = useDispatch()

	return (
		<div>
			<h2>Settings</h2>
			<Form.Group controlId='useCaching'>
				<Form.Check
					onChange={() => dispatch(setUseCaching(!settings.useCaching))}
					checked={settings.useCaching}
					type='checkbox'
					label='useCaching'
				/>
			</Form.Group>
			<Form.Group controlId='noBusySpinner'>
				<Form.Check
					onChange={() => dispatch(setNoBusySpinner(!settings.noBusySpinner))}
					checked={settings.noBusySpinner}
					type='checkbox'
					label='noBusySpinner'
				/>
			</Form.Group>
		</div>
	)
}
