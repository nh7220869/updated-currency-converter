const convertButton = document.getElementById("convert") as HTMLButtonElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const fromCurrencySelect = document.getElementById("from") as HTMLSelectElement;
const toCurrencySelect = document.getElementById("to") as HTMLSelectElement;
const output = document.getElementById("output") as HTMLParagraphElement;

convertButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        output.innerText = "Please enter a valid amount greater than zero.";
        return;
    }

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            if (exchangeRate) {
                const convertedAmount = (amount * exchangeRate).toFixed(2);
                output.innerText = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
            } else {
                output.innerText = "Conversion rate not available.";
            }
        })
        .catch(error => {
            output.innerText = "Error fetching exchange rates: " + error.message;
            console.error("Error:", error);
        });
});
