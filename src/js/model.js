//import { search } from 'core-js/fn/symbol';
import { async } from 'regenerator-runtime';
import {API_URL, PAGE_NO} from './config.js';
import {getJson} from './helpers.js';
export const state = {
    recipe: {},
    search: {
      query: '',
      results: [],
      page:1,
      resultPerPage: PAGE_NO,
    },
  };

  export const loadRecipe = async function(id){
    try{
    const data = await getJson(`${API_URL}${id}`)
       
    let {recipe} = data.data;  //see this after change the name.

      state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients    
        };

        console.log(state.recipe);

    }catch(err){
     console.error(`${err} ***`)
     throw err;
    }
  }

  export const loadSearch = async function(query){
   try{
     state.search.query = query;

    const data = await getJson(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    })
   } catch(err){
    console.error(`${err} ***`)
    throw err;
   }
  }

  state.search.page = page;
  export const getSearchResultsPage = function(page = state.search.page){

  const start = (page - 1) * PAGE_NO;
  const end = page * PAGE_NO;
 return state.search.results.slice(start, end)
}

export const updateServings = function(newServings){
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings
    //newQTy = oldQt * newServings / oldServings
  });

  state.recipe.servings = newServings;
}