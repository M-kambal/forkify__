import View from './views.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View{
  constructor(){
    super();
    this._parentElement = document.querySelector('.pagination');
  }

  addHandlerClick(handler){
    this._parentElement.addEventListener('click', function(e){
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if(!btn) return;

      const gotopage = +btn.dataset.goto; 
      console.log(gotopage);

      handler(gotopage);
    })
  }
  _generateMarkup(){
    const curPage = this._data.page;
    const numpages = Math.ceil(this._data.results.length / this._data.resultPerPage);
    console.log(numpages);

    // page 1, and there are other pages 
    if(curPage === 1 && numpages > 1){
    return `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
    `;
    }

    // last page
    if(curPage === numpages && numpages > 1){
      return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      `;
    }
    // other page
    if(curPage < numpages){
      return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `; 
    }

    // page 1, and there are no other pages 
    return ''; 
  }
}

export default new paginationView();
