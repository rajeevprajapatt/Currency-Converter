// const URL = "https://cat-fact.herokuapp.com/facts";


const btn = document.getElementById("btn");
const message = document.querySelector(".message");
const currCode = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const getdata = async () => {
    let promise = await fetch(URL);

    let data = await promise.json();

}

const dropdowns = document.querySelectorAll(".dropdown select");
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }
        if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }

    select.addEventListener('change', (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    console.log(element.value);
    let flagvalue = element.value;
    let currcode = countryList[flagvalue];
    let newsrc = `https://flagsapi.com/${currcode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

    const URL = `https://open.er-api.com/v6/latest/${currCode.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let val = toCurr.value;
    let rate = data.rates[val];
    let finalRate = amountVal * rate;
    message.innerText = `${amountVal} ${currCode.value} = ${finalRate} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})

