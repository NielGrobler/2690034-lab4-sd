(function () {
    const button = document.getElementById("submitButton");
    button.addEventListener('click', () => loadData());
})();

function loadData() {
    var mainCountryInfo = document.getElementById("country-info");
    var otherCountriesInfo = document.getElementById("bordering-countries");
    
    const input = document.getElementById("country");
    //ERROR HANDLING!!
    const url = new URL(input.value, "https://restcountries.com/v3.1/name/"); //better url parsing needed
    requestData(url).then(function (result) {

        try { 
        
            const jsonMain = result[0]; // Converting promise into 
            console.log(jsonMain)
            
            const name = jsonMain.name.official;
            const capital = jsonMain.capital;
            const population = jsonMain.population;
            const region = jsonMain.region;
            const flag = jsonMain.flags.png; 
            const neighbours = jsonMain.borders;
            
            //mainCountryInfo.innerHTML = name + capital + population + region + flag;

            mainCountryInfo.innerHTML = "";

            var pName = document.createElement("h3");
            pName.appendChild(document.createTextNode(name));
            mainCountryInfo.appendChild(pName);

            var pInfo1= document.createElement("p");
            var pInfo2= document.createElement("p");
            var pInfo3= document.createElement("p");
            pInfo1.appendChild(document.createTextNode(`Capital: ${capital}`));
            pInfo2.appendChild(document.createTextNode(`Population: ${population}`));
            pInfo3.appendChild(document.createTextNode(`Region: ${region}`));
            mainCountryInfo.appendChild(pInfo1);
            mainCountryInfo.appendChild(pInfo2);
            mainCountryInfo.appendChild(pInfo3);

            var img = document.createElement("img");
            img.src = flag;
            mainCountryInfo.appendChild(img);

            otherCountriesInfo.innerHTML = "";
            if (!neighbours) {
                otherCountriesInfo.innerHTML = "No bordering countries.";
            } else {
                for (const code of neighbours) { 
                    requestData(new URL(code, "https://restcountries.com/v3.1/alpha/")).then(function (result2) {
                        const jsonListSec = result2[0];
                        console.log(jsonListSec);
                        const name = jsonListSec.name.official;
                        const flag = jsonListSec.flags.png;
        
        
                        //otherCountriesInfo.innerHTML += name + " " + flag + "\n";
        
                        var pName = document.createElement("p");
                        pName.appendChild(document.createTextNode(""+name));
                        otherCountriesInfo.appendChild(pName);
        
                        var img = document.createElement("img");
                        img.src = flag;
                        otherCountriesInfo.appendChild(img);
        
                    });
                }
            }
            
        } catch (error) { 
            console.log(error)
            mainCountryInfo.innerHTML = "An error occurred, make sure you entered a valid country or spelled it correctly.";
            otherCountriesInfo.innerHTML = "";
        }

    });
    
    
}

//Async function, url is customisable, hopefully prepared in advance to not cause errors.
//Currently just throws errors to console. :/
async function requestData(url) {
    const request1 = new Request(url, {
        method: "POST"
    });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  }