const recipesList = document.getElementById('recipes-list');
const searchInput = document.getElementById('search-input');

const recipes = [
  { name: 'List Files', command: process.platform === 'win32' ? 'dir' : 'ls -la' },
  { name: 'Current Directory', command: 'pwd' },
  { name: 'Node Version', command: 'node -v' },
  { name: 'NPM Version', command: 'npm -v' }
];

function loadRecipes(list) {
  recipesList.innerHTML = '';
  list.forEach(r => {
    const li = document.createElement('li');
    li.textContent = r.name;
    li.addEventListener('click', () => {
      window.electronAPI.runCommand(r.command);
    });
    recipesList.appendChild(li);
  });
}

searchInput.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  loadRecipes(recipes.filter(r => r.name.toLowerCase().includes(term)));
});

loadRecipes(recipes);
