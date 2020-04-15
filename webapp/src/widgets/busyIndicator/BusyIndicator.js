import React from 'react'
import { useSelector } from 'react-redux'
import { getGlobalBusyIndicator } from './busyIndicator.selectors'
import './busyIndicator.css'

export default function BusyIndicator({ children }) {
	const show = useSelector(getGlobalBusyIndicator)

	const hasContentToDisplay =
		!show && children && (children.length === undefined || children.length > 0)

	return (
		<React.Fragment>
			{show ? (
				<div id='floatBarsG'>
					<div id='floatBarsG_1' className='floatBarsG'></div>
					<div id='floatBarsG_2' className='floatBarsG'></div>
					<div id='floatBarsG_3' className='floatBarsG'></div>
					<div id='floatBarsG_4' className='floatBarsG'></div>
					<div id='floatBarsG_5' className='floatBarsG'></div>
					<div id='floatBarsG_6' className='floatBarsG'></div>
					<div id='floatBarsG_7' className='floatBarsG'></div>
					<div id='floatBarsG_8' className='floatBarsG'></div>
				</div>
			) : (
				<React.Fragment>
					{hasContentToDisplay ? children : <ContentNotFound />}
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

function ContentNotFound() {
	return <p>No content found</p>
}
