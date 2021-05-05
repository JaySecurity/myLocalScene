const addArtistBtn = document.getElementById('add-artist');
const artistSelect = document.getElementById('artist-select');
const artistList = document.getElementById('artist-list');
let artistIds = [];
let artists = [];
const artistsInput = document.getElementById('artists');

if (artistsInput.value) {
  artistIds.push(...JSON.parse(artistsInput.value));
  const liELs = document.querySelectorAll('.artist-li');
  liELs.forEach((el) => {
    artists.push(el.textContent.slice(4));
  });
}

function handleAdd(e) {
  e.preventDefault();
  if (artistSelect.value === 'none') return;
  artistIds.push(artistSelect.value);
  artists.push(artistSelect.selectedOptions[0].textContent);
  let html = artistList.innerHTML;
  html += `<li class="artist-li"><span class="del-btn" id="${artistSelect.value}">X &nbsp;&nbsp;</span>${artistSelect.selectedOptions[0].textContent}</li>`;

  let options = document.querySelectorAll('.opts');
  options.forEach((option) => {
    if (option.value == artistIds[artistIds.length - 1]) {
      option.remove();
    }
  });

  artistList.innerHTML = html;
  artistsInput.value = JSON.stringify(artistIds);
}

function handleDelete(e) {
  if (!e.target.classList.contains('del-btn')) return;
  const newOption = document.createElement('option');
  newOption.classList.add('opts');
  newOption.value = e.target.id;
  artistIds = artistIds.filter((id) => id !== newOption.value);
  newOption.textContent = e.target.parentNode.textContent.slice(4);
  artists = artists.filter((a) => a !== newOption.textContent);
  artistSelect.appendChild(newOption);
  e.target.parentNode.remove();
  artistsInput.value = JSON.stringify(artistIds);
}

addArtistBtn.addEventListener('click', handleAdd);
artistList.addEventListener('click', handleDelete);
