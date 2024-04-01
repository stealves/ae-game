export const pricesAddCurrency = (prices) => {
    if (prices.length > 0) {
        prices.forEach(priceElement => {
            // Extract the text content of the element
            let priceText = priceElement.textContent;

            // Remove non-numeric characters and convert to a number
            let priceNumber = parseFloat(priceText.replace(/[^\d\.]/g, ''));

            // Format the number as USD currency
            let formattedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(priceNumber);

            priceElement.textContent = formattedPrice;
        });
    }
}