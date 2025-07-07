
import { postRequestBuilder, putRequestBuilder, talesApi } from "../_utils/api/base.js";
import { getTaleById } from "../_utils/api/tales_service.js"
import { USER_ID_KEY } from "../_utils/api/users_service.js";



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
const userId = localStorage.getItem(USER_ID_KEY)

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
    categoryEl.value = tale.category;

    updateEmptyClass();
  });
}

///

const save = (
  beforeSave = () => { },
  onSuccess = tale => location.replace('../my-tales/'),
  onFailure = err
) => {
  let title = titleEl.value.trim();
  let content = contentEl.innerText.trim();
  let category = categoryEl.value.trim();
  let color = rndHexColor();

  if (!title || !content || !category) return;

  beforeSave();

  let curTale = { ...tale };

  if (isEditMode)
    Object.assign(curTale, {
      title,
      content,
      category
    })
  else
    curTale = {
      author_id: userId,
      title,
      content,
      category,
      color
    }

  if (isEditMode)
    putRequestBuilder(talesApi('/', tId), curTale, () => history.back(), onFailure)
  else
    postRequestBuilder(talesApi(), curTale, onSuccess, onFailure)

}

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
