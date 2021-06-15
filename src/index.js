const debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
const { defaults } = require('@pnotify/core');
const { error} = require('@pnotify/core');

import css from './css/style.css';
import countryCard from './template/country-card.hbs';
import countryList from './template/country-list.hbs';
import API from './fetchCountries.js';


const refs = {
    inputEl: document.querySelector('.search-input'),
    divOneCountryEl: document.querySelector('.single-country'),
    divListEl: document.querySelector('.country-list'),
};

refs.inputEl.addEventListener('input', debounce(onInputChange, 500));

clearMarkup();

function onInputChange(e) {

    if (!e.target.value) return;

    const data = API.fetchCountries(e.target.value);

    data.then(result => renderMarkup(result))
        .catch(err=>onFetchError(err))
        .finally(() => refs.inputEl.value ='')
}

function getMarkupOfSingleCountry(country) {
    const countryMarkup = countryCard(country);

    refs.divOneCountryEl.insertAdjacentHTML('afterbegin', countryMarkup);
};

function getMarkupListOfCountries(countries) {
    const listMarkup = countryList(countries);
    refs.divListEl.insertAdjacentHTML('afterbegin', listMarkup);

}

function alertError() {
    const myError = error({
        text: "Too many matches found. Please enter a more specific query!"
    });

}

function clearMarkup() {
    refs.divListEl.innerHTML='';
    refs.divOneCountryEl.innerHTML='';
}

function onFetchError(err) {
    const myErrorSecond = error({
        text: "No results were found for your request !!! Check the name is entered correctly!"
    });
    // alert("No results were found for your request !!! Check the name is entered correctly!")

}


function renderMarkup(result) {
if (result.length > 10) {
            alertError();
        } else if (result.length > 2 && result.length <= 10) {
            const arrayOfCountries = result;
            getMarkupListOfCountries(arrayOfCountries);
        } else if (result.length === 1){getMarkupOfSingleCountry(result)}
}