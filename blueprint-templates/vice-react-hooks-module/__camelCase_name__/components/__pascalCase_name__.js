import React from 'react'
import { useSelector } from 'react-redux'
import { getAll{{pascalCase name}} } from '../{{camelCase name}}.selectors'
import { useGetAll{{pascalCase name}} } from '../{{camelCase name}}.effects'

export default function {{pascalCase name}}() {
	const {{camelCase name}} = useSelector(getAll{{pascalCase name}})

	useGetAll{{pascalCase name}}()

	return (
		<div>
			<h1>{{pascalCase name}}</h1>
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