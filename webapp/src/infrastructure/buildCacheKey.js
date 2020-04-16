const buildCacheKey = ({ url, httpMethod }) => `${httpMethod}|${url}`

export default buildCacheKey
