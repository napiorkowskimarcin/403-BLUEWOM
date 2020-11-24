//MAIN VARIABLES, LOAD BUTTON (MAY BE WITHOUT BEEING ASSIGNED, BUT IN THAT WAY IT IS CLEAR, I BELIEVE) AND INPUT
const btnAdd = document.getElementById("btnAdd");
let currencyInput = document.getElementById("currencyName");
const API_URL = "https://api.nbp.pl/api/exchangerates/tables/a/";
//STARTING - EMPTY ARRAY FOR KEEPING ALL OF THE RESULTS
let arrayOfCurrencies = [];
//CREATE A FLAG - FETCH OR NOT TO FETCH :-)
let firstLoad = true;

//CLEAR STORAGE BUTTON - TO REFRESH DATA
const btnClear = document.getElementById("btnClear");

//CLEAR STORAGE FUNCTION
storageClear = () => localStorage.removeItem("ApiNBP");

//REMOVE ELEMENT FROM THE TABLE
rmElement = (e) => {
  elementToRemove = e.target.parentNode.parentNode.querySelector(".codeID")
    .textContent;

  //find index of element to remove
  let indexToRemove = arrayOfCurrencies.findIndex(
    (element) => element === elementToRemove
  );

  //remove currency from the list
  arrayOfCurrencies.splice(indexToRemove, 1);

  //remove HTML element
  e.target.parentNode.parentNode.remove();
};

//MAIN FUNCTION - FETCH, FIND ELEMENT, APPEND DATA ON TABLE.
async function addRate() {
  //CHECK LOCAL STORAGE TO AVOID DATA FETCH
  let dataStorage = localStorage.getItem("ApiNBP");
  if (dataStorage && firstLoad) {
    currencyArray = JSON.parse(dataStorage);
    firstLoad = false;
    console.log("localStorage");
  }
  //CHECK IF FIRST LOAD IS TRUE - TO FETCH DATA
  else if (firstLoad) {
    currencyArray = await fetch(API_URL);
    currencyArray = await currencyArray.json();
    currencyArray = currencyArray[0].rates;
    firstLoad = false;
    localStorage.setItem("ApiNBP", JSON.stringify(currencyArray));
    console.log("ApiNBP");
  } else {
    console.log("current session");
  }
  //CHECK IF USER HAS PUT A VALUE
  if (!currencyInput.value) {
    return alert("you did not put any currency");
  }
  //ENSURE INPUT STRING IS UPPERCASE AS IN API.CODE
  let inputValue = currencyInput.value.toUpperCase();
  // ELEMENT BY API.CODE
  const findElement = currencyArray.find((item) => item.code === inputValue);

  //CHECK IF ELEMENT IS MATCHING ANY POSITION ON THE NBP LIST
  if (!findElement) {
    currencyInput.value = "";
    return alert(
      `Check the code that you passed in, please. There is no element like '${inputValue}' in the supported list of NBP. Please check the list of correct codes`
    );
  }

  //UPDATE ARRAY OF SELECTED CURRENCIES

  const checkIfAlreadyUse = arrayOfCurrencies.includes(inputValue);
  if (checkIfAlreadyUse) {
    currencyInput.value = "";
    return alert("You have already checked rate of that currency");
  }
  arrayOfCurrencies.push(inputValue);

  //CREATE VARIABLES FOR DATA PARAMETERS
  let appendName = findElement.currency;
  let appendCode = findElement.code;
  let appendRate = findElement.mid;

  //ensure data structure
  //   console.log({ appendName });
  //   console.log({ appendCode });
  //   console.log({ appendRate });

  //CREATE HTML ELEMENTS
  let trAppend = document.createElement("tr");
  let tdAppendName = document.createElement("td");
  tdAppendName.textContent = appendName;
  let tdAppendCode = document.createElement("td");
  tdAppendCode.textContent = appendCode;
  tdAppendCode.classList.add("codeID");
  let tdAppendRate = document.createElement("td");
  tdAppendRate.textContent = appendRate;
  let tdBtnRemove = document.createElement("td");
  let btnRemove = document.createElement("button");
  btnRemove.textContent = "REMOVE";
  btnRemove.classList.add("removeCurrency", "btn", "btn-primary");
  //CLEAR INPUT
  currencyInput.value = "";

  //APPEND ELEMENTS AND ASSIGN CLASS FOR BUTTON
  trAppend.appendChild(tdAppendName);
  trAppend.appendChild(tdAppendCode);
  trAppend.appendChild(tdAppendRate);
  tdBtnRemove.appendChild(btnRemove);
  trAppend.appendChild(tdBtnRemove);
  document.getElementById("table").appendChild(trAppend);

  //ATTACH FUNCTION TO REMOVE ELEMENT TO THE BUTTON
  trAppend.querySelector("button").addEventListener("click", rmElement);
}
//EVENT LISTENERS FOR 'CLICK'
btnAdd.addEventListener("click", addRate);
btnClear.addEventListener("click", storageClear);
