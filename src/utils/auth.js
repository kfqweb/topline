const localStorage = window.localStorage
const USER_KEY = 'users'

export const getUser = () => {
  return JSON.parse(localStorage.getItem('users'))
}

export const setUser = data => {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export const removeUser = () => {
  localStorage.removeItem(USER_KEY)
}
