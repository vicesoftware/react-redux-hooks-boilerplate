import { useState, useEffect } from 'react'

export function useTimer({ children, isTimerOn }) {
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)
	const [handle, setHandle] = useState()
	useEffect(() => {
		if (handle) {
			clearTimeout(handle)
		}
		if (isTimerOn) {
			setHandle(startTimer())
		}
		function startTimer() {
			return setTimeout(() => {
				console.log('timeout')
				if (seconds === 59) {
					setSeconds(0)
					if (minutes === 59) {
						setMinutes(0)
						if (hours === 59) {
							setHours(0)
						} else {
							setHours(hours + 1)
						}
					} else {
						setMinutes(minutes + 1)
					}
				} else {
					setSeconds(seconds + 1)
				}
			}, 1000)
		}
	}, [
		isTimerOn,
		setSeconds,
		seconds,
		// setMinutes,
		// minutes,
		// setHours,
		// hours,
		// handle,
	])
	const content = isTimerOn
		? `${
				(hours ? (hours > 9 ? hours : '0' + hours) : '00') +
				':' +
				(minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') +
				':' +
				(seconds > 9 ? seconds : '0' + seconds)
		  }`
		: children
	return content
}
