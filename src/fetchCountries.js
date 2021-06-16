const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}${searchQuery}`)
        .then(r => {
            console.dir(r);

            console.log(r);
            console.log(!r.ok);
            if (!r.ok) return null;

            return r.json()
        })
        // .catch()
}

export default { fetchCountries };