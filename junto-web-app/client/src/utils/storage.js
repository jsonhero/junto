export function setToken({ token }) {
  window.localStorage.setItem('token', token)
}


export function getToken() {
  return window.localStorage.getItem('token')
}
export function clearToken() {
  window.localStorage.removeItem('token')
}
