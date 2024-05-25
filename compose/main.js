const pageTitle = qs('.page-title');
const form = qs('form');
const titleEl = qs('.title');
const contentEl = qs('.content');
const categoryEl = qs('.category');
const autoSaveCheck = qs('#autosavecheck');
const autoSaveStatusP = qs('#save-status');
const saveBtn = qs('.btn');

///

const EMPTY = 'empty';
const GONE = 'gone';
const telltaler = getUserCookie();

let tId = new URLSearchParams(location.search).get('id');

let tale = null;
let isEditMode = false;
let isUpdated = false;

///

if (tId) {
  isEditMode = true;
  pageTitle.textContent = 'Edit tale';

  getTaleById(tId, _tale => {
    tale = _tale;

    titleEl.value = tale.title;
    contentEl.innerText = tale.content;
    categoryEl.value = tale.cat;

    updateEmptyClass();
  });
}

///

const save = (
  beforeSave = () => { },
  onSuccess = tale => history.back(),
  onFailure = err
) => {
  let title = titleEl.value.trim();
  let content = contentEl.innerText.trim();
  let cat = categoryEl.value.trim();
  let color = rndHexColor();

  if (!title || !content || !cat) return;

  beforeSave();

  let curTale = { ...tale };

  if (isEditMode)
    Object.assign(curTale, {
      title,
      content,
      cat
    });
  else
    curTale = {
      authorId: telltaler.id,
      title,
      content,
      cat,
      color
    };

  const req = buildReq(curTale, isEditMode ? 'PUT' : 'POST');

  fetch(talesApi(isEditMode ? tId : ''), req)
    .then(rsp => rsp.json())
    .then(onSuccess)
    .catch(onFailure);
};

const saveStatus = status => (autoSaveStatusP.textContent = status);

const autoSave = () => {
  if (isUpdated) {
    save(
      () => saveStatus('Saving'),
      tale => {
        saveStatus('Saved');
        isEditMode = true;
        tId = tale.id;
      },
      e => {
        saveStatus('');
        err(e);
      }
    );

    isUpdated = false;
  }
};

///

const updateEmptyClass = () => {
  if (contentEl.innerText == '') contentEl.classList.add(EMPTY);
  else contentEl.classList.remove(EMPTY);
};

///

let autoSaveInterval = 0;

on('change', autoSaveCheck, e => {
  saveBtn.classList.toggle(GONE);

  if (autoSaveCheck.checked) autoSaveInterval = setInterval(autoSave, 2000);
  else {
    clearInterval(autoSaveInterval);
    saveStatus('');
  }
});

[titleEl, contentEl, categoryEl].forEach(el =>
  on('input', el, e => {
    isUpdated = true;

    if (el == contentEl) updateEmptyClass();
  })
);

on('submit', form, e => {
  e.preventDefault();
  save();
});
