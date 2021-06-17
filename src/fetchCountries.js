const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}${searchQuery}`)
        .then(r => {
           if (!r.ok) return null;

            return r.json()
        })
}

export default { fetchCountries };