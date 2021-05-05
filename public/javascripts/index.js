const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const category = document.getElementById('category');
const BASE_URL = 'http://localhost:3000/api/search/';

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  let searchValue = searchInput.value;
  let searchCategory = category.value;
  let searchUrl = `${BASE_URL}${searchCategory}?search=${searchValue}`;
  let result = await fetch(searchUrl);
  // result = await result.text();
  console.log(await result.json());
});
