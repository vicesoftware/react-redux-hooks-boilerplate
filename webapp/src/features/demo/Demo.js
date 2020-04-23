import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllDemo, selectDemoFilter } from './demo.selectors'
import { actions } from './demo.slice'
import { fetchAllDemo } from './demo.asyncActions'
import BusyIndicator from '../../widgets/busyIndicator'

const { updateFilter } = actions

export default function Demo() {
	const demo = useSelector(selectAllDemo)
	const filter = useSelector(selectDemoFilter)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAllDemo())
	}, [dispatch])

	return (
		<div>
			<h2>Demo</h2>
			<input
				type='text'
				value={filter}
				onChange={(e) => dispatch(updateFilter(e.target.value))}
				placeholder='Filter by...'
			/>
			<BusyIndicator>
				<ul>
					{demo &&
						demo
							.filter((item) => (filter ? item.includes(filter) : true))
							.map((item) => <li key={item}>{item}</li>)}
				</ul>
			</BusyIndicator>
		</div>
	)
}
