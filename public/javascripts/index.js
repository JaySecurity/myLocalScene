const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const category = document.getElementById('category');
const BASE_URL = 'api/search/';
const mainEl = document.getElementById('main-content');

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  let searchValue = searchInput.value;
  let searchCategory = category.value;
  let searchUrl = `${BASE_URL}${searchCategory}?search=${searchValue}`;
  let result = await fetch(searchUrl);
  let results = await result.json();

  let html = results.reduce(
    (html, listing) =>
      html +
      `<div class="card">
        <div class="card-header">
          <h1>${listing.name}  ${
        listing?.venue?.name ? ' @ ' + listing.venue.name : ''
      }</h1> 
          <a class="more-btn btn" href="/${category.value}/${
        listing._id
      }">More Info</a> 
        </div>
        <div class="content">
          <p>${listing.description}</p>
        </div>
      </div>`,
    ''
  );
  mainEl.innerHTML = html;
});
