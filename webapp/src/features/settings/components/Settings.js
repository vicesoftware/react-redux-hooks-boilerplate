import React from 'react'
import { useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { getAllSettings } from '../settings.selectors'
import { useUpdateSettings } from '../settings.effects'

export default function Settings() {
	const settings = useSelector(getAllSettings)

	const updateSettings = useUpdateSettings()

	return (
		<div>
			<h1>Settings</h1>
			<Form.Group controlId='formBasicCheckbox'>
				<Form.Check
					onChange={() => updateSettings({ useCaching: !settings.useCaching })}
					checked={settings.useCaching}
					type='checkbox'
					label='useCaching'
				/>
			</Form.Group>
		</div>
	)
}
