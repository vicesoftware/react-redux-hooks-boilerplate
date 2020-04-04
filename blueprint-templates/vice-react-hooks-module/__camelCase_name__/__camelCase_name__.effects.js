import * as {{camelCase name}}Actions from './{{camelCase name}}.actionsTypes'
import useAsync from '../../infrastructure/useAsync'

export function useGetAll{{pascalCase name}}(dependencies) {
	useAsync({
		url: '/{{kebabCase name}}',
		actionType: {{camelCase name}}Actions.GET_ALL_{{upperSnakeCase name}},
		dummyResponse: ['Dummy Result 1', 'Dummy Result 2'], // Delete dummyResponse to have live api called or update it to have dummy data you want to fake
	})
}

export function useGet{{pascalCase name}}ById({{camelCase name}}Id) {
	useAsync({
		url: '/{{kebabCase name}}/' + {{camelCase name}}Id,  // We have to do a string conncat for now because I can't figure out how to escape a string template properly. Issue: https://github.com/reesemclean/blueprint/issues/69#issuecomment-605670252
		actionType: {{camelCase name}}Actions.GET_{{upperSnakeCase name}}_BY_ID,
		dependencies: [{{camelCase name}}Id],
	})
}