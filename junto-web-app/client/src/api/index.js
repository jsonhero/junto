import FetchApi from './fetchApi'

const api = new FetchApi('http://localhost:4100')

const endpoints = {
  login: (username, password) => (
    {
      endpoint: '/account/login',
      request: {
        method: 'POST',
        body: {
          username,
          password,
        }
      }
    }
  ),
  authCheck: () => (
    {
      authorization: true,
      endpoint: '/account/check',
    }
  )
}

export default api.mapToApi(endpoints)
