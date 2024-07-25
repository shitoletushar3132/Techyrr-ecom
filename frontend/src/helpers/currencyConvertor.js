const supportedCurrencies = [
  "USD",
  "CNY",
  "JPY",
  "EUR",
  "INR",
  "GBP",
  "BRL",
  "CAD",
];

async function currencyConvertor() {
  try {
    var toCurrency = "";

    toCurrency = localStorage.getItem("toCountry");
    toCurrency = toCurrency.toUpperCase();
    if (!supportedCurrencies.includes(toCurrency)) {
      throw new Error("Unsupported currency");
    }
    const conversionRate = await getConversionRate(toCurrency);

    if (conversionRate === null) {
      throw new Error("Conversion rate not found");
    }
    localStorage.setItem("rate", conversionRate);
    return conversionRate;
  } catch (error) {
    console.error("Error in currency conversion:", error.message);
    return null;
  }
}

async function getConversionRate(toCurrency) {
  try {
    const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/inr.json`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Error fetching conversion rates from API: ${response.statusText}`
      );
    }
    const data = await response.json();
    const conversionRates = data.inr;
    const conversionRate = conversionRates[toCurrency.toLowerCase()];
    return conversionRate || null;
  } catch (error) {
    console.error("Error in fetching conversion rates:", error.message);
    return null;
  }
}
export default currencyConvertor;
