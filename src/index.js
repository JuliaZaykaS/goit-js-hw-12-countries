const debounce = require('lodash.debounce');
import countryCard from './template/country-card.hbs';


const refs = {
    inputEl: document.querySelector('.search-input'),
    divOneCountryEl: document.querySelector('.single-country'),
    divListEl: document.querySelector('.country-list')
};

refs.inputEl.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(params) {
console.log(123);
}

function getMarkupOfSingleCountry(country) {
    const countryMarkup = countryCard(country);
    console.log(countryMarkup);
    refs.divOneCountryEl.insertAdjacentHTML('afterend', countryMarkup);
};

fetch('https://restcountries.eu/rest/v2/name/colombia')
    .then(r => r.json())
    .then(getMarkupOfSingleCountry)

