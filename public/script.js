const btnAdd = document.getElementById("btnAdd");
let currencyName = document.getElementById("currencyName");
const API_URL = "http://api.nbp.pl/api/exchangerates/tables/a/";

let currencyWatched = [];

async function addRate() {
  console.log("added");
  console.log(currencyName.value);
  let currencyArray = await fetch(API_URL);
  currencyArray = await currencyArray.json();
  currencyArray = currencyArray[0].rates;
  console.log(currencyArray);
}

btnAdd.addEventListener("click", addRate);
