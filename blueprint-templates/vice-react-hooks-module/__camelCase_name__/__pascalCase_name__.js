import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
	selectAll{{pascalCase name}}, 
	fetchAll{{pascalCase name}}, 
	select{{pascalCase name}}Filter,
	updateFilter
 } from './index'
import BusyIndicator from '../../widgets/busyIndicator'

export default function {{pascalCase name}}() {
	const {{camelCase name}} = useSelector(selectAll{{pascalCase name}})
	const filter = useSelector(select{{pascalCase name}}Filter)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAll{{pascalCase name}}())
	}, [dispatch])

	return (
		<div>
			<h1>{{pascalCase name}}</h1>
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