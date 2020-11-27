import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './recipe';

const App = () => {

  const APP_ID = '2cdaf609';
  const APP_KEY = '4c9609bcb5be207ed0fabfbebbfd6f24';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    fetchData();
  },[query]);

  const fetchData = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }


  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button type="submit" className="search-button">Search</button>
      </form>
     <div className="recipies">
     {
        recipes.map((recipe)=>(
          <Recipe title={recipe.recipe.label}  image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} calories ={recipe.recipe.calories} />
        ))
      }
     </div>
    </div>
  )
}


export default App;
