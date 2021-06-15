const debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
const { defaults } = require('@pnotify/core');
const { error} = require('@pnotify/core');

import countryCard from './template/country-card.hbs';
import countryList from './template/country-list.hbs';
import API from './fetchCountries.js';

// const fetchData = fetchCountries();


const refs = {
    inputEl: document.querySelector('.search-input'),
    divOneCountryEl: document.querySelector('.single-country'),
    divListEl: document.querySelector('.country-list'),
    // divBoxEl: document.querySelector('.searching-countries')
};

refs.inputEl.addEventListener('input', debounce(onInputChange, 1500));

function onInputChange(e) {
    clearMarkup();
    console.log(123);
    const inputValue = e.target.value;
    console.log(inputValue);
    if (!inputValue) return;
    const data = API.fetchCountries(inputValue);
    console.log(data);
    // if (data.length > 2){console.log('many');}
    data.then(result => {
        if (result.length > 10) {
            alert();
        } else if (result.length > 2 && result.length <= 10) {
            const arrayOfCountries = result;
            // const arrayOfCountries = JSON.stringify(result);
            // console.log(JSON.parse(arrayOfCountries));
            getMarkupListOfCountries(arrayOfCountries);
            // getMarkupListOfCountries(JSON.parse(arrayOfCountries));
        } else {getMarkupOfSingleCountry(result)}
    })



}

function getMarkupOfSingleCountry(country) {
    const countryMarkup = countryCard(country);
    console.log(countryMarkup);
    refs.divOneCountryEl.insertAdjacentHTML('afterbegin', countryMarkup);
};

function getMarkupListOfCountries(countries) {
    const listMarkup = countryList(countries);
    // console.log();
    refs.divListEl.insertAdjacentHTML('afterbegin', listMarkup);

}

function alert() {
    const myError = error({
        text: "Too many matches found. Please enter a more specific query!"
    });

}

function clearMarkup() {
    refs.divListEl.innerHTML='';
    refs.divOneCountryEl.innerHTML='';


}
// fetchData.then(getMarkupOfSingleCountry);

// fetch('https://restcountries.eu/rest/v2/name/colombia')
//     .then(r => r.json())
//     .then(getMarkupOfSingleCountry)

