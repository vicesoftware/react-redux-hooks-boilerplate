export const getAll{{pascalCase name}} = (state) => state.{{camelCase name}}.all{{pascalCase name}}
export const get{{pascalCase name}}ById = ({{camelCase name}}Id) => (state) => state.{{camelCase name}}.all{{pascalCase name}}.find(item => item.id === {{camelCase name}}Id)
