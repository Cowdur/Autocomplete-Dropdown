// storing the name of the contries from fetchCountries function in a global array
let countries = [];

// load the data into the drop down section of the html page
// function .querySelector allows us to select the element that we want to manipulate
const countryListElement = document.querySelector('#country-list');


const countryInputElement = document.querySelector('#country-input');


// Function: fetch countries name from API
// fetch the url
// .then(response => response.json()) converts the response to json
// .then(data => console.log(data)) using the data

// countries =  data.map((x) => x.name.common); 
// takes the array of objects from the json called "data"
// uses map function to map over "data" extract the value of "name.common" 
// name.common is the how the json stores the name of the country
// returns that to the array called "countries"

//countries.sort(); this function sorts the array of countries in alphabetical order

function fetchCountries() {
    fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
       countries =  data.map((x) => x.name.common);
       countries.sort();
       loadData(countries, countryListElement);
    });
}



function loadData(data, element) {
    if (data) {
        element.innerHTML = " ";
        let innerElement = " ";
        data.forEach((item) => {
            innerElement += `
            <li>${item}</li>`;
        });

        element.innerHTML = innerElement;
    }
}

function filterData(data, searchText) {
    return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase())); 
}


fetchCountries();


countryInputElement.addEventListener('input', function() {
    const filteredData = filterData(countries, countryInputElement.value);
    loadData(filteredData, countryListElement);
});
