//utils/convertCurrency.ts

import axios from 'axios';

const API_KEY = 'ENTER YOUR API'; // Replace with your real API key

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number | null> {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/ENTER YOUR API/latest/USD`
    );

    const rate = response.data.conversion_rates[toCurrency];
    if (!rate) return null;

    return parseFloat((amount * rate).toFixed(4));
  } catch (error) {
    console.error('Currency conversion failed:', error);
    return null;
  }
}
