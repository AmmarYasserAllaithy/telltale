
import { clearToken, getTokenFromCookies, saveTokenToCookies } from "../cookies.js"
import { authApi, deleteRequestBuilder, postRequestBuilder, usersApi } from "./base.js"


const USER_ID_KEY = 'TLT_USER_ID'
const USER_NAME_KEY = 'TLT_USER_NAME'


/**
 * Authenticate
 */

const authByEmailAndPassword = (email, password, onSuccess, onFailure = {}) => {

    postRequestBuilder(
        authApi('/email-pwd'),
        {
            email,
            password
        },
        onSuccess,
        onFailure
    )

}


/**
 * Login
 */

const login = (email, password, fireErr = true) => {

    authByEmailAndPassword(
        email,
        password,
        data => {
            saveTokenToCookies(data.token)

            localStorage.setItem(USER_ID_KEY, data.user.id)
            localStorage.setItem(USER_NAME_KEY, data.user.first_name)

            location.replace('../../my-tales/')
        },
        message => {
            if (fireErr) alert(message)
        }
    )

}


/**
 * Create new user
 */

const register = (first, last, email, password) => {

    postRequestBuilder(
        usersApi(),
        {
            first_name: first,
            last_name: last,
            email,
            password
        },
        user => {
            login(user.email, user.password)
        },
        e => {
            console.error(e)
            alert(e.message)
        }
    )

}


/**
 * Logout
 */

const logout = () => {
    clearToken()
    location.replace('../../')
}


/**
 * Auto login
 */

const autoLoginByToken = () => {

    let token = getTokenFromCookies()

    if (token) {
        console.log('autoLoginByToken: NOT implemented yet')

        // TODO:
        //   login(telltaler.email, telltaler.password, false)
    }

}



/**
 * Delete
 */

const deleteUserById = (id, onSuccess, onFailure = {}) => {

    deleteRequestBuilder(
        usersApi('/', id),
        onSuccess,
        onFailure
    )

}



/**
 * export
 */

export {
    USER_ID_KEY,
    USER_NAME_KEY,
    authByEmailAndPassword,
    login,
    register,
    logout,
    autoLoginByToken,
    deleteUserById,
}