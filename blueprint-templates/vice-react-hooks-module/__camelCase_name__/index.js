import {{pascalCase name}} from './{{pascalCase name}}'
import * as selectors from './{{camelCase name}}.selectors'
import * as actions from './{{camelCase name}}.actions'
import slice from './{{camelCase name}}.slice'

export const {
	name,
	actions: { updateFilter },
	reducer,
} = slice

export const { fetchAll{{pascalCase name}} } = actions

// we prefix all selectors with the the "select" prefix
export const { selectAll{{pascalCase name}}, select{{pascalCase name}}Filter } = selectors

// we export the component most likely to be desired by default
export default {{pascalCase name}}
