const telltaler = getUserCookie();

if (!telltaler) location.replace('../tales/');

const headerEl = qs('header');
const titleEl = qs('.title');
const dateEl = qs('.date');
const contentEl = qs('.content');
const catEl = qs('.cat');

const id = new URLSearchParams(location.search).get('id');

const CENTER = 'center';

let fontSize = parseInt(getComputedStyle(contentEl).fontSize);
let isAlignedCenter = false;

///

const fill = (el, html) => (el.innerHTML = html.replace(/\n/g, '<br>'));

const updateContentFontSize = n => {
  fontSize += n;

  if (fontSize < 10) fontSize = 10;

  contentEl.style.fontSize = join(fontSize, 'px');
};

///

const renderTale = tale => {
  document.title += ' - ' + tale.title.substr(0, 32)

  if (window.innerWidth >= 768)
    document.querySelector('html').style.background = `#${tale.color}55`;

  let locale = (tale.title.charAt(0).search(/\w/) > -1 ? 'en' : 'ar') + '-gb';

  fill(titleEl, tale.title);
  fill(contentEl, tale.content);
  fill(catEl, tale.category);
  fill(dateEl, new Date(tale.created_at).toLocaleString(locale));
}

getTaleById(id, renderTale)

///

/// Maximize font listener
onClick(qs('.ctrl.max'), () => updateContentFontSize(1));

/// Minimize font listener
onClick(qs('.ctrl.min'), () => updateContentFontSize(-1));

/// Align listener
onClick(qs('.ctrl.align'), () => {
  if (isAlignedCenter) contentEl.classList.remove(CENTER);
  else contentEl.classList.add(CENTER);

  isAlignedCenter = !isAlignedCenter;
});

/// Copy listener
onClick(qs('.ctrl.copy'), () =>
  navigator.clipboard
    .writeText(contentEl.innerText)
    .then(txt => alert('Tale copied'))
);

/// Edit listener
onClick(qs('.ctrl.edit'), () => location.assign(join('../compose/?id=', id)));

/// Delete listener
onClick(qs('.ctrl.delete'), () => {
  if (!confirm('Delete tale?', false)) return;

  deleteTaleById(id, () => location.replace('../tales/'));
});
