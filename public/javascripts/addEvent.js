const addArtistBtn = document.getElementById('add-artist');
const artistSelect = document.getElementById('artist-select');
const artistList = document.getElementById('artist-list');
const artistIds = [];
const artists = [];
const artistsInput = document.getElementById('artists');

function handleAdd(e) {
  e.preventDefault();
  if (artistSelect.value === 'none') return;
  artistIds.push(artistSelect.value);
  artists.push(artistSelect.selectedOptions[0].textContent);
  let html = artists.reduce(
    (html, artist) => `<li> ${artist} </li>` + html,
    ''
  );
  let options = document.querySelectorAll('.opts');
  options.forEach((option) => {
    if (option.value === artistIds[artistIds.length - 1]) {
      option.remove();
    }
  });

  artistList.innerHTML = html;
  artistsInput.value = JSON.stringify(artistIds);
}

addArtistBtn.addEventListener('click', handleAdd);
