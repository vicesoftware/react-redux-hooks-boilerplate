import React from 'react'
import { useSelector } from 'react-redux'
import { getAllDemo } from '../demo.selectors'
import { useGetAllDemo } from '../demo.effects'

export default function Demo() {
	const demo = useSelector(getAllDemo)

	useGetAllDemo()

	return (
		<div>
			<h1>Demo</h1>
			{demo.length === 0 ? (
				'Loading...'
			) : (
				<ul>
					{demo.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			)}
		</div>
	)
}
