import React from 'react'
import { useSelector } from 'react-redux'
import { getAll{{pascalCase name}} } from '../{{camelCase name}}.selectors'
import { useGetAll{{pascalCase name}} } from '../{{camelCase name}}.effects'

export default function Reports() {
	const {{camelCase name}} = useSelector(getAll{{pascalCase name}})

	useGetAll{{pascalCase name}}()

	// return <div>{ {{camelCase name}}.lenght }</div>
	return (
		<div>
			{ {{camelCase name}}.length === 0 ? (
				'Loading...'
			) : (
				<ul>
					{ {{camelCase name}}.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			)}
		</div>
	)
}