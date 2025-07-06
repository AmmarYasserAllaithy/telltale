

/**
 * constants
 */

const BASE_URL = location.hostname.match(/netlify|github/gi)
    ? 'https://telltaleom.ammarpnyasser.workers.dev'
    : 'http://localhost:8787'

const TELLTALE_TOKEN_KEY = 'TELLTALE_TOKEN'


/**
 * api endpoints
 */

const authApi = (...endpoints) => join(BASE_URL, '/api/auth', join(...endpoints));

const usersApi = (...endpoints) => join(BASE_URL, '/api/users', join(...endpoints));

const talesApi = (...endpoints) => join(BASE_URL, '/api/tales', join(...endpoints));

const utilsApi = (...endpoints) => join(BASE_URL, '/api/utils', join(...endpoints));


/**
 * Request builer
 */

const optionsBuilder = (method = 'GET', body = '') => {

    const request = {
        method,
        headers: {
            'content-type': 'application/json',
            'auth-token': localStorage.getItem(TELLTALE_TOKEN_KEY) ?? '',
        },
    }

    if (body) request.body = JSON.stringify(body)

    return request
}


const requestBuilder = (
    url,
    method = 'GET',
    body = '',
    onSuccess,
    onFailure = {}
) => {

    fetch(url, optionsBuilder(method, body))
        .then(rsp => {

            if (rsp.status == 200)
                rsp.json().then(onSuccess)
            else
                rsp.json().then(e => {
                    console.error(e)
                    alert(e.message ?? e)
                })

        })
        .catch(onFailure)

}



/**
 * export
 */

export {
    TELLTALE_TOKEN_KEY,
    authApi,
    usersApi,
    talesApi,
    utilsApi,
    requestBuilder,
}
