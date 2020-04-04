import React from 'react'
import { useSelector } from 'react-redux'
import { getAllFfl } from '../ffl.selectors'
import { useGetAllFfl } from '../ffl.effects'

export default function Ffl() {
	const ffl = useSelector(getAllFfl)

	useGetAllFfl()

	return (
		<div>
			<h1>Ffl</h1>
			{ffl.length === 0 ? (
				'Loading...'
			) : (
				<ul>
					{ffl.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			)}
		</div>
	)
}
