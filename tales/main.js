const telltaler = getUserCookie();
const usernameEl = qs('.username');
const searchFieldEl = qs('.search-bar');
const talesContainerEl = qs('.tales-container');

let tales = [];

///

const renderTale = tale =>
  creator({
    tag: 'section',
    cls: 'mg-auto tale',
    style: {
      background: `#${tale.color}55`
    },

    childs: [
      creator({
        tag: 'h3',
        cls: 'title',
        html: tale.title
      }),

      creator({
        tag: 'article',
        cls: 'max-lines-4',
        html: tale.content
      })
    ],

    onClick: () => location.assign(join('/tale/?id=', tale.id))
  });

const populate = list => {
  talesContainerEl.innerHTML = '';
  talesContainerEl.appendAll(...list.map(renderTale));
};

///

if (telltaler) {
  usernameEl.textContent = '@' + telltaler.first;

  getTalesByAuthorId(telltaler.id, list => populate((tales = list)));
} else logout();

///
/// Search

const check = (txt, query) => txt.search(new RegExp(query, 'gi')) > -1;

const matchCriteria = query => tale =>
  check(tale.title, query) ||
  check(tale.content, query) ||
  check(tale.cat, query);

on('input', searchFieldEl, () =>
  populate(tales.filter(matchCriteria(searchFieldEl.value.trim())))
);

/// Logout
onClick(qs('.logout'), () => {
  if (confirm('Do you want to logout from your account?', false)) logout();
});

/// Delete telltaler with his tales
onClick(usernameEl, () => {
  if (!confirm('Do you want to DELETE your account permanently?', false))
    return;

  deleteTalesByAuthorId(
    telltaler.id,
    () => deleteUserById(telltaler.id, logout, alert),
    alert
  );
});
