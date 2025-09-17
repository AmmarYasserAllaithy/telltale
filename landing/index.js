
import { qs, on } from "../_utils/dompico.client.js"
import { autoLoginByToken, register } from "../_utils/api/users_service.js"
import { hash } from "../_utils/api/utils_service.js"


autoLoginByToken()

///

const firstEl = qs('#firstInp')
const lastEl = qs('#lastInp')
const emailEl = qs('#emailInp')
const pwdEl = qs('#pwdInp')
const confPwdEl = qs('#confPwdInp')


on('submit', qs('form'), e => {

  e.preventDefault()

  let first = firstEl.value.trim()
  let last = lastEl.value.trim()
  let email = emailEl.value.trim().toLowerCase()
  let password = pwdEl.value
  let confPass = confPwdEl.value

  if (password != confPass) {
    alert('Passwords are NOT identical')
    return
  }

  hash(
    password,
    resp => register(first, last, email, resp.md5)
  )

})



if (location.host.includes('netlify')) {
  const footer = qs('footer')

  footer.innerHTML = 'Developed with &hearts; by Ammar Yaser'
  footer.classList.remove('flex-sb')
  footer.style.textAlign = 'center'
}
