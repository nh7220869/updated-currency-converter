var convertButton = document.getElementById("convert");
var amountInput = document.getElementById("amount");
var fromCurrencySelect = document.getElementById("from");
var toCurrencySelect = document.getElementById("to");
var output = document.getElementById("output");
convertButton.addEventListener("click", function () {
    var amount = parseFloat(amountInput.value);
    var fromCurrency = fromCurrencySelect.value;
    var toCurrency = toCurrencySelect.value;
    if (isNaN(amount) || amount <= 0) {
        output.innerText = "Please enter a valid amount greater than zero.";
        return;
    }
    var apiUrl = "https://api.exchangerate-api.com/v4/latest/".concat(fromCurrency);
    fetch(apiUrl)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
        .then(function (data) {
        var exchangeRate = data.rates[toCurrency];
        if (exchangeRate) {
            var convertedAmount = (amount * exchangeRate).toFixed(2);
            output.innerText = "".concat(amount, " ").concat(fromCurrency, " is equal to ").concat(convertedAmount, " ").concat(toCurrency);
        }
        else {
            output.innerText = "Conversion rate not available.";
        }
    })
        .catch(function (error) {
        output.innerText = "Error fetching exchange rates: " + error.message;
        console.error("Error:", error);
    });
});
