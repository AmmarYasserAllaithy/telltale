/**
 * constants
 */

const IP = 'http://127.0.0.1';
const PORT = '5555';
const HOST = join(IP, ':', PORT);
const API = join(HOST, '/api');

const TELLTALER_KEY = 'TELLTALER';

/**
 * api endpoints
 */

const usersApi = (...endpoints) => join(API, '/users/', join(...endpoints));

const talesApi = (...endpoints) => join(API, '/tales/', join(...endpoints));

/**
 * Build post requests
 */

const buildReq = (body, method = 'POST') => ({
  method: method,
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(body)
});

/**
 * md5
 */

const md5 = (plain, onSuccess, onFailure = err) => {
  fetch(join(HOST, '/util/md5'), buildReq({ plain }))
    .then(rsp => rsp.text().then(onSuccess))
    .catch(onFailure);
};

/**
 * User cookies
 */

const setUserCookie = (user, htl = 24) =>
  setCookie(TELLTALER_KEY, JSON.stringify(user), htl);

const getUserCookie = () => {
  let cookie = getCookie(TELLTALER_KEY);
  return cookie ? JSON.parse(cookie) : null;
};

const clearUserCookie = () => setUserCookie({}, 0);

/**
 * Api from
 */

const getFrom = (url, onSuccess = tale => { }, onFailure = err) =>
  fetch(url)
    .then(rsp => {
      if (rsp.status == 200) rsp.json().then(onSuccess);
      else rsp.text().then(alert);
    })
    .catch(onFailure);

const deleteFrom = (url, onSuccess = () => { }, onFailure = err) =>
  fetch(url, { method: 'DELETE' })
    .then(rsp => {
      if (rsp.status == 200) onSuccess();
      else rsp.text().then(alert);
    })
    .catch(onFailure);

/**
 *  _   _
 * | | | |___  ___ _ __ ___
 * | | | / __|/ _ \ '__/ __|
 * | |_| \__ \  __/ |  \__ \
 *  \___/|___/\___|_|  |___/
 *
 */

/**
 * Authenticate
 */

const authenticate = (
  email,
  password,
  onSuccess = user => { },
  onFailure = err
) => {
  fetch(
    usersApi('auth'),
    buildReq({
      email,
      password
    })
  )
    .then(rsp => {
      if (rsp.status == 200) rsp.json().then(onSuccess);
      else rsp.text().then(onFailure);
    })
    .catch(err);
};

/**
 * Login
 */

const login = (email, password, fireErr = true) => {
  authenticate(
    email,
    password,
    user => {
      setUserCookie(user);
      location.replace('./tales/');
    },
    msg => {
      if (fireErr) alert(msg);
    }
  );
};

/**
 * Auto login
 */

const autoLoginIfApplicable = () => {
  let telltaler = getUserCookie()

  if (telltaler) login(telltaler.email, telltaler.password, false)
}

/**
 * Create new user
 */

const register = (first, last, email, password) => {
  fetch(
    usersApi(),
    buildReq({
      first,
      last,
      email,
      password
    })
  )
    .then(rsp => {
      if (rsp.status == 200)
        rsp.json().then(user => {
          login(user.email, user.password);
        });
      else rsp.text().then(alert);
    })
    .catch(err);
};

/**
 * Logout
 */

const logout = () => {
  clearUserCookie();
  location.replace('./signin/');
};

/**
 * Delete
 */

const deleteUserById = (id, onSuccess = () => { }, onFailure = err) =>
  deleteFrom(usersApi(id), onSuccess, onFailure);

/**
 *  _____     _
 * |_   _|_ _| | ___  ___
 *   | |/ _` | |/ _ \/ __|
 *   | | (_| | |  __/\__ \
 *   |_|\__,_|_|\___||___/
 *
 */

const getTaleById = (id, onSuccess = tale => { }, onFailure = err) =>
  getFrom(talesApi(id), onSuccess, onFailure);

const getTalesByAuthorId = (id, onSuccess = tales => { }, onFailure = err) =>
  getFrom(talesApi('byauthor/', id), onSuccess, onFailure);

const deleteTaleById = (id, onSuccess = () => { }, onFailure = err) =>
  deleteFrom(talesApi(id), onSuccess, onFailure);

const deleteTalesByAuthorId = (id, onSuccess = () => { }, onFailure = err) =>
  deleteFrom(talesApi('byauthor/', id), onSuccess, onFailure);
