const debounce = require('lodash.debounce');


const refs = {
    inputEl: document.querySelector('.search-input')
};

refs.inputEl.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(params) {
console.log(123);
}

