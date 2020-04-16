import * as demoActions from './demo.actionsTypes'
import useAsync from '../../infrastructure/useAsync'

export function useGetAllDemo(dependencies) {
	useAsync({
		url: 'demo',
		actionType: demoActions.GET_ALL_DEMO,
		stubSuccess: ['Dummy Result 1', 'Dummy Result 2'], // Delete dummyResponse to have live api called or update it to have dummy data you want to fake
	})
}

export function useGetDemoById(demoId) {
	useAsync({
		url: 'demo/' + demoId, // We have to do a string conncat for now because I can't figure out how to escape a string template properly. Issue: https://github.com/reesemclean/blueprint/issues/69#issuecomment-605670252
		actionType: demoActions.GET_DEMO_BY_ID,
		dependencies: [demoId],
	})
}
