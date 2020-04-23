import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
	selectAll{{pascalCase name}}, 
	select{{pascalCase name}}Filter,
 } from './{{camelCase name}}.selectors'
import { actions } from './{{camelCase name}}.slice'
import { fetchAll{{pascalCase name}} } from './{{camelCase name}}.asyncActions'
import BusyIndicator from '../../widgets/busyIndicator'

const {	updateFilter } = actions

export default function {{pascalCase name}}() {
	const {{camelCase name}} = useSelector(selectAll{{pascalCase name}})
	const filter = useSelector(select{{pascalCase name}}Filter)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAll{{pascalCase name}}())
	}, [dispatch])

	return (
		<div>
			<h2>{{pascalCase name}}</h2>
			<input
				type='text'
				value={filter}
				onChange={(e) => dispatch(updateFilter(e.target.value))}
				placeholder='Filter by...'
			/>
			<BusyIndicator>
				<ul>
					{ {{camelCase name}} && 
						{{camelCase name}}
							.filter((item) => (filter ? item.includes(filter) : true))
							.map((item) => <li key={item}>{item}</li>)}
				</ul>
			</BusyIndicator>
		</div>
	)
}