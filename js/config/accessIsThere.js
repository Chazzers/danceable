const accessIsThere = window.location.hash.includes('access_token') && window.location.hash.includes('callback') === false

export default accessIsThere