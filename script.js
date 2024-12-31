let From = document.querySelector("#From");
let To = document.querySelector("#To");
let fromImg = document.querySelector("#from-img");
let toImg = document.querySelector("#to-img");
let convert = document.querySelector("#convert");
let amount = document.querySelector("#Amount");
let msg = document.querySelector("#msg");
let rateMsg = document.querySelector("#rate");
let exchange = document.querySelector("#exchange");

const date = new Date();
let noTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${noTime}/v1/currencies.min.json`;

(async function getCurrency() {
    try {
        let response = await fetch(URL);
        let countries = await response.json();

        let countriesArr = Object.values(countries);
        let keys = Object.keys(countries);
        for(let i = 0; i < countriesArr.length; i++) {
            let option = document.createElement("option");
            option.text = countriesArr[i];
            option.value = keys[i];
            From.add(option);
        }
        for(let i = 0; i < keys.length; i++) {
            let option = document.createElement("option");
            option.text = countriesArr[i];
            option.value = keys[i];
            To.add(option);
        }

        From.addEventListener("change", () => {
            let flag = From.value.toUpperCase().slice(0, 2);
            fromImg.src = `https://flagsapi.com/${flag}/flat/32.png`;
        })

        To.addEventListener("change", () => {
            let flag = To.value.toUpperCase().slice(0, 2);
            toImg.src = `https://flagsapi.com/${flag}/flat/32.png`;
        })
    } catch(error) {
        rateMsg.innerText = `Failed to fetch Data. Please try again later.`;
    }
    
})();

convert.addEventListener("click", async () => {
    try {
        let key = "inr";
        key = From.value;
        let RATE = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${noTime}/v1/currencies/${key}.json`;
        let val = await fetch(RATE);
        let rate = await val.json();
        let rateArr = Object.values(rate);

        let exchangeAmount = (amount.value*rateArr[1][To.value]).toFixed(5);

        msg.innerText = `${amount.value} ${From.value.toUpperCase()} = ${exchangeAmount} ${To.value.toUpperCase()}`;
        rateMsg.innerText = `1 ${From.value} = ${rateArr[1][To.value]} ${To.value}\n1 ${To.value} = ${1/rateArr[1][To.value]} ${From.value}`;

    } catch {
        rateMsg.innerText = `Failed to fetch data. Please try again later.`;
    }

})

exchange.addEventListener("click", () => {
    let selectedOption = From.value;
    From.value = To.value;
    To.value = selectedOption;
    let image = fromImg.src;
    fromImg.src = toImg.src;
    toImg.src = image;
})