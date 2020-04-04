import * as fflActions from './ffl.actionsTypes'
import useAsync from '../../infrastructure/useAsync'

export function useGetAllFfl(dependencies) {
	useAsync({
		url: '/ffl',
		actionType: fflActions.GET_ALL_FFL,
		dummyResponse: ['Dummy Result 1', 'Dummy Result 2'], // Delete dummyResponse to have live api called or update it to have dummy data you want to fake
	})
}

export function useGetFflById(fflId) {
	useAsync({
		url: '/ffl/' + fflId, // We have to do a string conncat for now because I can't figure out how to escape a string template properly. Issue: https://github.com/reesemclean/blueprint/issues/69#issuecomment-605670252
		actionType: fflActions.GET_FFL_BY_ID,
		dependencies: [fflId],
	})
}
