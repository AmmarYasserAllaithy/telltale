autoLoginIfApplicable()

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

  md5(password, hashed => register(first, last, email, hashed))
})