import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import 'regenerator-runtime/runtime'; // for polyfiling async/await
import 'core-js/stable'; // for everything else
import { async } from 'regenerator-runtime/runtime';
import searchView from './Views/searchView.js';
import resultView from './Views/resultView.js';
import paginationView from './Views/paginationView.js';

//https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
/* 
if(module.hot){
  module.hot.accept();
}
 */
const controlRecipes = async function(){
  try{    
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();


//0. update reuslt view with mark when select recipe.
   // resultView.update(model.getSearchResultsPage());

//1. load recipe
  await model.loadRecipe(id);  

//2. rendering recipe
  recipeView.render(model.state.recipe);
  
  }catch (err){ 
    recipeView.renderError();
  }
};

const controlSearch = async function(){
  try{
    resultView.renderSpinner();

// 1. get search query
    const query = searchView.getQuery();
    if(!query) return;

// 2. load search results
    await model.loadSearch(query);

// 3. render results
    //console.log(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

// 4. render initial pagination buttons
    paginationView.render(model.state.search)
  } catch(err){
    console.log(err);
  }
}
const controlPagination = function(gotopage){
// 1. render new results
  resultView.render(model.getSearchResultsPage(gotopage))

// 2. render new pagination buttons
  paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  //update the recipe servings (in state)
  model.updateServings(newServings)

  //update the recipe view
  recipeView.update(model.state.recipe)
}
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination)
};

init();