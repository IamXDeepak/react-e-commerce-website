import apiGet from './apiGet'
const apiCurrentUser = async() => {
    const user = JSON.parse(localStorage.getItem('login data'))
    const userId = user[0].id
    const userData = await apiGet(`http://localhost:3500/loginCredentials/${userId}`)
    return userData
}

export default apiCurrentUser

