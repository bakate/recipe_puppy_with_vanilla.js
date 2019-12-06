/* eslint-disable no-use-before-define */
const endpoint = 'http://www.recipepuppy.com/api';
const proxy = `https://cors-anywhere.herokuapp.com/`;
window.$ = document.querySelector.bind(document); // same thing than queryselector
// eslint-disable-next-line no-multi-assign
Node.prototype.on = window.on = function(name, fn) {
  this.addEventListener(name, fn);
};
/* instead of
document.querySelector('.search').addEventListener('click', handleClick)
 */
const form = $('.search');
const recipesGrid = $('.recipes');

async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${endpoint}?q=${query}`);
  const data = await res.json();
  return data;
}
async function handleSubmit(e) {
  e.preventDefault();
  fetchAndDisplay(form.query.value);
}

async function fetchAndDisplay(query) {
  // turn the form off
  form.submit.disabled = true;
  // submit the search
  const recipes = await fetchRecipes(query);
  // turn the form on again
  form.submit.disabled = false;
  displayRecipes(recipes.results);
}

function displayRecipes(recipes) {
  console.log('Fetching data and cooking it to HTML');
  const html = recipes.map(
    recipe => `<div class="recipe">
<h2>${recipe.title}</h2>
<p>${recipe.ingredients}</p>
${recipe.thumbnail && `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
<a href="${recipe.href}">View Recipe 🥣🍖</a>
</div>`
  );
  recipesGrid.innerHTML = html.join('');
}

form.on('submit', handleSubmit);
fetchAndDisplay('beef');
