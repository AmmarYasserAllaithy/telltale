autoLoginIfApplicable()

///

const emailEl = qs('#emailInp')
const passEl = qs('#pwdInp')

on('submit', qs('form'), e => {
  e.preventDefault()

  let email = emailEl.value.trim().toLowerCase()

  md5(passEl.value, hashed => login(email, hashed))
})