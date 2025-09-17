
import { qs, on } from "../_utils/dompico.client.js"
import { autoLoginByToken, login } from "../_utils/api/users_service.js"
import { hash } from "../_utils/api/utils_service.js"



autoLoginByToken()

///

const emailEl = qs('#emailInp')
const passEl = qs('#pwdInp')

on('submit', qs('form'), e => {

  e.preventDefault()

  let email = emailEl.value.trim().toLowerCase()

  hash(
    passEl.value,
    resp => login(email, resp.md5)
  )

})
