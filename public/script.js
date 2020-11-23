//MAIN VARIABLES, LOAD BUTTON (MAY BE WITHOUT BEEING ASSIGNED, BUT IN THAT WAY IT IS CLEAR, I BELIEVE)
const btnAdd = document.getElementById("btnAdd");
let currencyInput = document.getElementById("currencyName");
const API_URL = "http://api.nbp.pl/api/exchangerates/tables/a/";

//CREATE A FLAG - FETCH OR NOT TO FETCH :-)
let firstLoad = true;
//REMOVE ELEMENT FROM THE TABLE
rmElement = (e) => {
  e.target.parentNode.parentNode.remove();
};

//MAIN FUNCTION - FETCH, FIND ELEMENT, APPEND DATA ON TABLE.
async function addRate() {
  //CHECK IF FIRST LOAD IS TRUE - TO FETCH DATA
  if (firstLoad) {
    currencyArray = await fetch(API_URL);
    currencyArray = await currencyArray.json();
    currencyArray = currencyArray[0].rates;
    firstLoad = false;
  }
  //CHECK IF USER HAS PUT A VALUE
  if (!currencyInput.value) {
    return alert("you did not put any currency");
  }
  //ENSURE INPUT STRING IS UPPERCASE AS IN API.CODE
  let inputValue = currencyInput.value.toUpperCase();
  //BY ELEMENT BY API.CODE
  const findElement = currencyArray.find((item) => item.code === inputValue);

  //CHECK IF ELEMENT IS MATCHING ANY POSITION ON THE NBP LIST
  if (!findElement) {
    currencyInput.value = "";
    return alert(
      `Check the code that you passed in, please. There is no element like '${inputValue}' in the supported list of NBP. Please check the list of correct codes`
    );
  }

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

btnAdd.addEventListener("click", addRate);
