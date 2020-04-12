import { useState } from 'react'
export function useToggleTimer() {
	const [isTimerOn, setTimerOn] = useState(false)
	function toggleTimer() {
		console.log(isTimerOn)
		if (isTimerOn) {
			setTimerOn(false)
		} else {
			setTimerOn(true)
		}
	}
	return { isTimerOn, toggleTimer }
}
