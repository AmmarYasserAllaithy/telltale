
import { qs, creator, on, onClick, join } from "../_utils/dompico.client.js"
import { logout, USER_NAME_KEY } from "../_utils/api/users_service.js";
import { deleteAuthorTales, getAuthorTales } from "../_utils/api/tales_service.js";
import { getTokenFromCookies } from "../_utils/cookies.js"


const token = getTokenFromCookies()
const usernameEl = qs('.username');
const searchFieldEl = qs('.search-bar');
const talesContainerEl = qs('.tales-container');

let tales = [];

///

const renderTale = tale => creator({
  tag: 'section',
  cls: 'mg-auto tale',
  style: {
    background: `#${tale.color}22`,
  },

  childs: [
    creator({
      tag: 'h3',
      cls: 'max-lines-2 title',
      style: {
        background: `#${tale.color}33`,
      },
      html: tale.title
    }),

    creator({
      tag: 'article',
      cls: 'max-lines-4',
      html: tale.content
    })
  ],

  onClick: () => location.assign(join('../tale/?id=', tale.id))
})


const populate = list => {
  talesContainerEl.innerHTML = '';
  talesContainerEl.appendAll(...list.map(renderTale));
}

///

// window.onload = () => {
if (token) {
  usernameEl.textContent = localStorage.getItem(USER_NAME_KEY)

  getAuthorTales(list => populate((tales = list)))

} else logout()
// }


///
/// Search

const check = (txt, query) => txt.search(new RegExp(query, 'gi')) > -1;

const matchCriteria = query => tale =>
  check(tale.title, query) ||
  check(tale.content, query) ||
  check(tale.category, query);


on('input', searchFieldEl, () =>
  populate(tales.filter(matchCriteria(searchFieldEl.value.trim())))
)


/// Logout

onClick(qs('.logout'), () => {
  if (confirm('Logout ?', false)) logout();
})


/// Delete token with his tales

onClick(usernameEl, () => {
  if (!confirm('DELETE your account permanently ?', false))
    return;

  if (!confirm('Do you REALLY want to \n\n\nDELETE \n\n\nyour account permanently?', false))
    return;

  deleteAuthorTales(
    token.id,
    () => deleteUserById(token.id, logout, alert),
    alert
  )
})
