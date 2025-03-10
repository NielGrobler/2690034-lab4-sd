(function () {
    const input = document.getElementById("country");
    const button = document.getElementById("submitButton");
    button.addEventListener('click', () => loadData());
})();

function loadData() {
    var mainCountryInfo = document.getElementById("country-info");
    var otherCountriesInfo = document.getElementById("bordering-countries");
    
    getData("South Africa").then(function (result) {
        const jsonMain = result; // Converting promise into 
        console.log(jsonMain)

        
        
        const mainList = document.createElement("ul");
        const newContent = document.createTextNode("Hi there and greetings!");
        mainList.appendChild(newContent)
        mainCountryInfo.innerHTML = mainList
    });
    
    //error handling here
    //const countryInfo = JSON.parse(jsonMain);
    
}

function format(json) {
    
}

async function getData(country) {
    const url = new URL(country, "https://restcountries.com/v3.1/name/"); //better url parsing needed
    const request1 = new Request(url, {method: "POST"});
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
        //console.error(error.message)
      return error.message;
    }
  }
  