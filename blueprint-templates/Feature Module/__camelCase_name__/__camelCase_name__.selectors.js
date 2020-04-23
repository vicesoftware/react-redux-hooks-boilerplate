import slice from './{{camelCase name}}.slice'

export const selectSlice = (state) => state[slice.name]

export const selectAll{{pascalCase name}} = (state) => selectSlice(state).all{{pascalCase name}} 

export const select{{pascalCase name}}Filter = (state) => selectSlice(state).filter