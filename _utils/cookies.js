
import { setCookie, getCookie } from './dompico.client.js'
import { TELLTALE_TOKEN_KEY } from "./api/base.js"


const saveTokenToCookies = (token, htl = 24 * 7) =>
    setCookie(TELLTALE_TOKEN_KEY, token, htl)


const getTokenFromCookies = () =>
    getCookie(TELLTALE_TOKEN_KEY)


const clearToken = () =>
    saveTokenToCookies('', 0)



export {
    saveTokenToCookies,
    getTokenFromCookies,
    clearToken,
}