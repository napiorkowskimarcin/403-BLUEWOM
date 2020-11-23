const btnAdd = document.getElementById("btnAdd");
let currencyInput = document.getElementById("currencyName");
const API_URL = "http://api.nbp.pl/api/exchangerates/tables/a/";
const API_RATE_URL = "http://api.nbp.pl/api/exchangerates/rates/a/";

let currencyWatched = [];

rmRate = (e) => {
  e.target.parentNode.remove();
  console.log("removing");
};

async function addRate() {
  console.log(API_RATE_URL + currencyInput.value);

  let currencyArray = await fetch(API_RATE_URL + currencyInput.value);
  currencyArray = await currencyArray.json();

  let appendName = currencyArray.currency;
  let appendCode = currencyArray.code;
  let appendRate = currencyArray.rates[0].mid;

  console.log({ appendName });
  console.log({ appendCode });
  console.log({ appendRate });

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

  currencyInput = "";

  trAppend.appendChild(tdAppendName);
  trAppend.appendChild(tdAppendCode);
  trAppend.appendChild(tdAppendRate);
  tdBtnRemove.appendChild(btnRemove);
  trAppend.appendChild(tdBtnRemove);
  document.getElementById("table").appendChild(trAppend);
}

btnAdd.addEventListener("click", addRate);
